import { useEffect, useState } from "react";
import { Card, Btn, Segmented, ExtLink } from "../../components/ui";
import { askJSON, AiError } from "../../lib/ai";
import { playText } from "../../lib/audio";
import { LINKS } from "../../content";
import { toast } from "../../lib/toast";
import { useStore, setState, award } from "../../lib/store";
import { addWord, removeWord, reviewWord, dueWords, hasWord } from "../../lib/vocab";
import { isoDate } from "../../lib/dates";
import type { VocabEntry } from "../../lib/types";

type Dir = "ca-es" | "es-ca";
type Tool = "dicc" | "sin" | "conj";
type Tab = "cerca" | "paraules";

interface DictRes {
  paraula?: string; categoria?: string; registre?: string; definicio?: string; balear?: string;
  traduccions?: { text: string; nota?: string }[];
  exemples?: { ca: string; es: string }[];
  familia?: { paraula: string; es?: string }[];
  locucions?: { ca: string; es?: string }[];
  evita?: string;
}
interface SinRes {
  paraula?: string;
  sinonims?: { paraula: string; matis?: string; registre?: string; exemple?: string }[];
  antonims?: string[]; confusions?: string; nota?: string;
}
interface ConjRes { infinitiu?: string; gerundi?: string; participi?: string; temps?: { nom: string; formes: string[] }[]; balear?: string; nota?: string }

const PERSONES = ["jo", "tu", "ell/ella/vostè", "nosaltres", "vosaltres", "ells/elles/vostès"];
const HIST_KEY = "parla-c1:dict-hist";
const CACHE_KEY = "parla-c1:dict-cache";

const readLS = <T,>(k: string, d: T): T => { try { const r = localStorage.getItem(k); return r ? (JSON.parse(r) as T) : d; } catch { return d; } };
const writeLS = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sense emmagatzematge */ } };

// Memòria de consultes: les repetides són instantànies i no gasten quota d'IA.
const cache = new Map<string, unknown>(Object.entries(readLS<Record<string, unknown>>(CACHE_KEY, {})));
const saveCache = () => {
  const entries = [...cache.entries()].slice(-120);
  writeLS(CACHE_KEY, Object.fromEntries(entries));
};

const BASE = "Ets un lexicògraf expert en català normatiu (IEC), amb atenció a les formes balears i a les trampes d'un parlant de castellà. Respon NOMÉS amb JSON vàlid.";

function prompt(tool: Tool, dir: Dir, w: string): string {
  if (tool === "dicc" && dir === "ca-es") return `${BASE}
Paraula o expressió catalana: «${w}». Si està mal escrita o és un barbarisme, posa a "evita" la forma correcta i per què.
JSON: {"paraula":"forma correcta","categoria":"nom m. / verb / adj. / loc. ...","registre":"formal / neutre / col·loquial / literari / balear (si escau)","definicio":"definició breu en català","traduccions":[{"text":"equivalent castellà","nota":"accepció o matís"}],"exemples":[{"ca":"frase de nivell B2-C1","es":"traducció"}],"familia":[{"paraula":"paraula de la mateixa família (derivats, verb/nom/adjectiu relacionats)","es":"significat breu"}],"locucions":[{"ca":"locució o expressió habitual amb aquesta paraula","es":"equivalent castellà"}],"balear":"variant o ús balear si és diferent, si no, buit","evita":"fals amic o calc del castellà relacionat, si n'hi ha"}
Màxim 4 traduccions, 2 exemples, 4 de família i 3 locucions. Si la consulta és una locució, explica-la sencera.`;
  if (tool === "dicc") return `${BASE}
Paraula o expressió castellana: «${w}».
JSON: {"paraula":"${w}","categoria":"categoria gramatical","definicio":"què vol dir, breu, en català","traduccions":[{"text":"equivalent català normatiu","nota":"registre (formal/col·loquial/balear) o accepció"}],"exemples":[{"ca":"frase en català de nivell B2-C1","es":"frase en castellà"}],"familia":[{"paraula":"paraula catalana relacionada","es":"significat"}],"locucions":[{"ca":"locució catalana equivalent","es":"expressió castellana"}],"evita":"barbarisme, calc o fals amic que cal evitar en català, si n'hi ha"}
Màxim 4 traduccions, 2 exemples, 3 de família i 3 locucions.`;
  if (tool === "sin") return `${BASE}
${dir === "es-ca" ? `Tradueix primer al català la paraula castellana «${w}» i dona sinònims de la traducció.` : `Paraula catalana: «${w}».`}
JSON: {"paraula":"paraula catalana","sinonims":[{"paraula":"sinònim","matis":"diferència d'ús o d'intensitat, molt breu","registre":"formal / neutre / col·loquial","exemple":"frase curta amb aquest sinònim"}],"antonims":["..."],"confusions":"paraules que se solen confondre amb aquesta i com distingir-les, si n'hi ha","nota":"consell per triar-ne un en un text formal de nivell C1"}
Entre 5 i 10 sinònims, del més habitual al menys, mesclant registres. Només formes normatives.`;
  return `${BASE}
${dir === "es-ca" ? `Verb castellà «${w}»: conjuga el verb català equivalent.` : `Verb català: «${w}» (si no és infinitiu, troba'n l'infinitiu).`}
Conjugació normativa estàndard (central/general). Formes en l'ordre: jo, tu, ell, nosaltres, vosaltres, ells.
JSON: {"infinitiu":"...","gerundi":"...","participi":"masculí, femení","temps":[{"nom":"Present d'indicatiu","formes":[6 formes]},{"nom":"Imperfet d'indicatiu","formes":[6]},{"nom":"Passat perifràstic","formes":[6]},{"nom":"Pretèrit perfet d'indicatiu","formes":[6]},{"nom":"Futur","formes":[6]},{"nom":"Condicional","formes":[6]},{"nom":"Present de subjuntiu","formes":[6]},{"nom":"Imperfet de subjuntiu","formes":[6]},{"nom":"Imperatiu","formes":["-", "tu", "ell", "nosaltres", "vosaltres", "ells"]}],"balear":"present d'indicatiu en forma balear (jo …, tu …), si és diferent","nota":"irregularitats o trampes freqüents (què és irregular i per què)"}`;
}

/** Diccionari català ⇄ castellà, sinònims i conjugador, amb historial i paraules pròpies per repassar. */
export function Dictionary() {
  const [tab, setTab] = useState<Tab>("cerca");
  const n = useStore((s) => s.vocab.length);
  const due = useStore((s) => dueWords(s, isoDate()).length);
  return (
    <div className="space-y-3">
      <Segmented value={tab} onChange={(v) => setTab(v as Tab)} options={[{ value: "cerca", label: "Cerca" }, { value: "paraules", label: `Les meves paraules${n ? ` (${n}${due ? ` · ${due} per repassar` : ""})` : ""}` }]} />
      {tab === "cerca" ? <Search /> : <MyWords />}
    </div>
  );
}

function Search() {
  const [w, setW] = useState("");
  const [dir, setDir] = useState<Dir>("ca-es");
  const [tool, setTool] = useState<Tool | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ tool: Tool; data: unknown; word: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [hist, setHist] = useState<string[]>(() => readLS<string[]>(HIST_KEY, []));

  async function run(t: Tool, word0?: string, d: Dir = dir) {
    const word = (word0 ?? w).trim();
    if (!word) { toast("Escriu una paraula"); return; }
    if (word0) setW(word0);
    setTool(t); setErr(null);
    const h = [word, ...hist.filter((x) => x.toLowerCase() !== word.toLowerCase())].slice(0, 12);
    setHist(h); writeLS(HIST_KEY, h);
    const key = `${t}|${d}|${word.toLowerCase()}`;
    if (cache.has(key)) { setRes({ tool: t, data: cache.get(key), word }); return; }
    setBusy(true); setRes(null);
    try {
      const data = await askJSON<unknown>(prompt(t, d, word));
      cache.set(key, data); saveCache();
      setRes({ tool: t, data, word });
    } catch (e) {
      setErr(e instanceof AiError ? e.message : "No s'ha pogut consultar. Comprova la connexió.");
    } finally { setBusy(false); }
  }
  // Tocar una paraula d'un resultat la busca en català.
  const again = (word: string, t: Tool = "dicc") => { setDir("ca-es"); void run(t, word, "ca-es"); };

  return (
    <Card className="space-y-3 p-4">
      <Segmented value={dir} onChange={(v) => { setDir(v as Dir); setRes(null); }} options={[{ value: "ca-es", label: "Català → castellà" }, { value: "es-ca", label: "Castellà → català" }]} />
      <input type="search" value={w} onChange={(e) => setW(e.target.value)} aria-label="Paraula"
        placeholder={dir === "ca-es" ? "p. ex. malbaratar, enyorar, fer l'orni" : "p. ex. llevar a cabo, desperdiciar, echar de menos"}
        autoCapitalize="none" autoComplete="off" className="w-full rounded-xl bg-bg px-3.5 py-3 text-[17px]"
        onKeyDown={(e) => { if (e.key === "Enter") void run(tool ?? "dicc"); }} />
      <div className="grid grid-cols-3 gap-2">
        {([["dicc", "Diccionari"], ["sin", "Sinònims"], ["conj", "Conjugar"]] as const).map(([t, label]) => (
          <Btn key={t} variant={tool === t ? "primary" : "soft"} onClick={() => void run(t)} disabled={busy}>{busy && tool === t ? "…" : label}</Btn>
        ))}
      </div>
      {hist.length > 0 && !res && !busy && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] text-muted">Recents:</span>
          {hist.slice(0, 8).map((h) => <button key={h} onClick={() => { setW(h); void run(tool ?? "dicc", h); }} className="rounded-full bg-bg px-2.5 py-1 text-[13px]">{h}</button>)}
        </div>
      )}

      {busy && <div className="rounded-xl bg-accent/10 p-3 text-[14px] text-accent">Consultant el professor…</div>}
      {err && <div className="rounded-xl bg-bad/10 p-3 text-[14px] text-bad">{err} <button className="font-semibold underline" onClick={() => void run(tool ?? "dicc")}>Reintenta</button></div>}
      {res?.tool === "dicc" && <DictView d={res.data as DictRes} dir={dir} onWord={again} />}
      {res?.tool === "sin" && <SinView d={res.data as SinRes} onWord={again} />}
      {res?.tool === "conj" && <ConjView d={res.data as ConjRes} />}
      {res && <div className="text-[12px] text-muted">Resposta del profe IA: toca qualsevol paraula en blau per consultar-la. En cas de dubte, confirma-ho al <ExtLink href={LINKS.diec}>DIEC</ExtLink> o al <ExtLink href="https://dcvb.iec.cat/inici.asp">DCVB</ExtLink>.</div>}
    </Card>
  );
}

const Say = ({ t }: { t: string }) => (
  <button onClick={() => void playText(t)} aria-label={`Escolta «${t}»`} className="ml-1.5 inline-grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-[12px] text-accent align-middle">▶</button>
);

/** Paraula catalana que es pot tocar per consultar-la. */
const Link = ({ w, onWord, bold }: { w: string; onWord: (w: string) => void; bold?: boolean }) => (
  <button onClick={() => onWord(w)} className={`text-left text-accent underline decoration-accent/30 underline-offset-4 ${bold ? "font-bold" : ""}`}>{w}</button>
);

function SaveBtn({ word, es, note, ex }: { word?: string; es?: string; note?: string; ex?: string }) {
  const saved = useStore((s) => (word ? hasWord(s, word) : false));
  if (!word || !es) return null;
  return (
    <button disabled={saved} onClick={() => { setState((s) => addWord(s, { word, es, note, ex }, isoDate())); toast("Desada a «Les meves paraules»"); }}
      className="rounded-full bg-good/15 px-3 py-1.5 text-[13px] font-semibold text-good disabled:opacity-60">{saved ? "✓ Desada" : "＋ Desa la paraula"}</button>
  );
}

const REG: Record<string, string> = { formal: "bg-accent/15 text-accent", neutre: "bg-bg text-muted", "col·loquial": "bg-warn/20 text-warn" };

function DictView({ d, dir, onWord }: { d: DictRes; dir: Dir; onWord: (w: string) => void }) {
  const tr = (d.traduccions ?? []).filter((x) => x?.text);
  const catWord = dir === "ca-es" ? d.paraula : tr[0]?.text;
  const es = dir === "ca-es" ? tr.map((x) => x.text).slice(0, 2).join(" / ") : d.paraula;
  return (
    <div className="space-y-3 rounded-xl bg-bg p-3.5">
      <div>
        <span className="text-[20px] font-bold">{d.paraula}</span>
        {dir === "ca-es" && d.paraula && <Say t={d.paraula} />}
        {d.categoria && <span className="ml-2 text-[13px] italic text-muted">{d.categoria}</span>}
        {d.registre && <span className="ml-2 rounded-full bg-card px-2 py-0.5 text-[11.5px] font-semibold text-muted">{d.registre}</span>}
      </div>
      {d.definicio && <p className="text-[15px] leading-relaxed">{d.definicio}</p>}
      {tr.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-muted">{dir === "ca-es" ? "En castellà" : "En català"}</div>
          {tr.map((x, i) => (
            <div key={i} className="text-[16px]">
              {dir === "es-ca" ? <Link w={x.text} onWord={onWord} bold /> : <b>{x.text}</b>}{dir === "es-ca" && <Say t={x.text} />}
              {x.nota && <span className="ml-2 text-[13px] text-muted">{x.nota}</span>}
            </div>
          ))}
        </div>
      )}
      {(d.exemples ?? []).filter((x) => x?.ca).map((x, i) => (
        <div key={i} className="border-l-2 border-accent/40 pl-3 text-[14.5px]">
          <div>{x.ca}<Say t={x.ca} /></div>
          <div className="text-muted">{x.es}</div>
        </div>
      ))}
      {(d.locucions ?? []).filter((x) => x?.ca).length > 0 && (
        <div className="space-y-1">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-muted">Locucions i expressions</div>
          {d.locucions!.filter((x) => x?.ca).map((x, i) => <div key={i} className="text-[14.5px]"><b>{x.ca}</b><Say t={x.ca} />{x.es && <span className="text-muted"> · {x.es}</span>}</div>)}
        </div>
      )}
      {(d.familia ?? []).filter((x) => x?.paraula).length > 0 && (
        <div className="space-y-1">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-muted">Mateixa família</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[14.5px]">
            {d.familia!.filter((x) => x?.paraula).map((x, i) => <span key={i}><Link w={x.paraula} onWord={onWord} />{x.es && <span className="text-[13px] text-muted"> · {x.es}</span>}</span>)}
          </div>
        </div>
      )}
      {d.balear && <div className="rounded-lg bg-card p-2.5 text-[14px]"><b>Balear:</b> {d.balear}</div>}
      {d.evita && <div className="rounded-lg bg-warn/15 p-2.5 text-[14px]"><b>Evita:</b> {d.evita}</div>}
      <SaveBtn word={catWord} es={es} note={d.categoria} ex={d.exemples?.[0]?.ca} />
    </div>
  );
}

function SinView({ d, onWord }: { d: SinRes; onWord: (w: string, t?: Tool) => void }) {
  const s = (d.sinonims ?? []).filter((x) => x?.paraula);
  return (
    <div className="space-y-3 rounded-xl bg-bg p-3.5">
      <div className="text-[20px] font-bold">{d.paraula}{d.paraula && <Say t={d.paraula} />}</div>
      <div className="space-y-2">
        {s.map((x, i) => (
          <div key={i} className="rounded-xl bg-card p-3">
            <div className="flex flex-wrap items-center gap-2">
              <Link w={x.paraula} onWord={(w) => onWord(w)} bold /><Say t={x.paraula} />
              {x.registre && <span className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${REG[x.registre.toLowerCase()] ?? "bg-bg text-muted"}`}>{x.registre}</span>}
            </div>
            {x.matis && <div className="text-[13.5px] text-muted">{x.matis}</div>}
            {x.exemple && <div className="mt-1 border-l-2 border-accent/40 pl-2.5 text-[14px]">{x.exemple}</div>}
          </div>
        ))}
      </div>
      {(d.antonims ?? []).length > 0 && <div className="text-[14px]"><b>Antònims:</b> {d.antonims!.map((a, i) => <span key={a}>{i > 0 && ", "}<Link w={a} onWord={(w) => onWord(w, "sin")} /></span>)}</div>}
      {d.confusions && <div className="rounded-lg bg-warn/15 p-2.5 text-[14px]"><b>No les confonguis:</b> {d.confusions}</div>}
      {d.nota && <div className="text-[14px] text-muted"><b>Per a l'examen:</b> {d.nota}</div>}
    </div>
  );
}

function ConjView({ d }: { d: ConjRes }) {
  const temps = (d.temps ?? []).filter((t) => t?.nom && Array.isArray(t.formes));
  return (
    <div className="space-y-3 rounded-xl bg-bg p-3.5">
      <div>
        <span className="text-[20px] font-bold">{d.infinitiu}</span>{d.infinitiu && <Say t={d.infinitiu} />}
        <div className="text-[13.5px] text-muted">Gerundi: {d.gerundi} · Participi: {d.participi}</div>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {temps.map((t) => (
          <div key={t.nom} className="rounded-xl bg-card p-3">
            <div className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-accent">{t.nom}
              <button onClick={() => void playText(t.formes.slice(0, 6).filter((f) => f && f !== "-").join(". "))} aria-label={`Escolta ${t.nom}`} className="grid size-6 place-items-center rounded-full bg-accent/10 text-[11px]">▶</button>
            </div>
            <table className="w-full text-[14.5px]">
              <tbody>
                {t.formes.slice(0, 6).map((f, i) => (
                  <tr key={i}><td className="w-[46%] py-0.5 pr-2 text-[12.5px] text-muted">{PERSONES[i]}</td><td className="font-medium">{f}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {d.balear && <div className="text-[14px]"><b>Forma balear:</b> {d.balear}</div>}
      {d.nota && <div className="rounded-lg bg-warn/15 p-2.5 text-[14px]">{d.nota}</div>}
    </div>
  );
}

/** Llista de paraules desades i repàs espaiat (mostra el significat i recordes la paraula, o a l'inrevés). */
function MyWords() {
  const vocab = useStore((s) => s.vocab);
  const [reviewing, setReviewing] = useState<string[] | null>(null);
  const today = isoDate();
  const due = vocab.filter((x) => x.card.due <= today);

  if (reviewing) return <Review ids={reviewing} onClose={() => setReviewing(null)} />;
  if (!vocab.length) return <Card className="p-4 text-[15px] text-muted">Encara no tens paraules. Quan consultis una paraula al diccionari, o la toquis en un text, prem «Desa la paraula» i apareixerà aquí per repassar-la.</Card>;
  return (
    <div className="space-y-3">
      <Btn block disabled={!due.length} onClick={() => setReviewing(due.slice(0, 15).map((x) => x.id))}>{due.length ? `Repassa ${Math.min(due.length, 15)} paraules` : "Res per repassar avui"}</Btn>
      <Card className="divide-y divide-line">
        {[...vocab].reverse().map((v) => (
          <div key={v.id} className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="text-[16px] font-semibold">{v.word}<Say t={v.word} /></div>
              <div className="text-[14px] text-muted">{v.es}</div>
              {v.ex && <div className="mt-0.5 text-[13px] text-muted">{v.ex}</div>}
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="rounded-full bg-bg px-2 py-0.5 text-[11.5px] text-muted">{v.card.box >= 3 ? "dominada" : v.card.due <= today ? "per repassar" : `el ${v.card.due.slice(5)}`}</span>
              <button onClick={() => setState((s) => removeWord(s, v.id))} aria-label={`Esborra ${v.word}`} className="text-[12px] text-muted underline">Esborra</button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Review({ ids, onClose }: { ids: string[]; onClose: () => void }) {
  const vocab = useStore((s) => s.vocab);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [ok, setOk] = useState(0);
  const cards = ids.map((id) => vocab.find((v) => v.id === id)).filter((x): x is VocabEntry => !!x);
  const done = i >= cards.length;
  useEffect(() => { if (done && cards.length) award("practice", "vocab"); }, [done]); // eslint-disable-line react-hooks/exhaustive-deps
  if (done) return <Card className="space-y-3 p-5 text-center"><div className="text-[20px] font-bold">{ok} de {cards.length} sabudes</div><Btn block onClick={onClose}>Torna a les meves paraules</Btn></Card>;
  const c = cards[i];
  const askEs = i % 2 === 0; // alterna: veus la catalana i recordes el significat, o a l'inrevés
  const answer = (good: boolean) => { setState((s) => reviewWord(s, c.id, good, isoDate())); if (good) setOk((n) => n + 1); setShown(false); setI(i + 1); };
  return (
    <Card className="space-y-4 p-5">
      <div className="text-[12.5px] text-muted">{i + 1} de {cards.length}</div>
      <div className="text-center">
        <div className="text-[13px] text-muted">{askEs ? "Què vol dir?" : "Com es diu en català?"}</div>
        <div className="mt-1 text-[24px] font-bold">{askEs ? c.word : c.es}{askEs && <Say t={c.word} />}</div>
        {shown && <div className="mt-3 space-y-1"><div className="text-[20px] font-semibold text-accent">{askEs ? c.es : c.word}{!askEs && <Say t={c.word} />}</div>{c.ex && <div className="text-[14px] text-muted">{c.ex}</div>}</div>}
      </div>
      {!shown ? <Btn block onClick={() => setShown(true)}>Mostra la resposta</Btn> : (
        <div className="grid grid-cols-2 gap-2"><Btn variant="soft" onClick={() => answer(false)}>Encara no</Btn><Btn onClick={() => answer(true)}>Ho sabia</Btn></div>
      )}
    </Card>
  );
}
