import { useState } from "react";
import { Card, Btn, Segmented, ExtLink } from "../../components/ui";
import { askJSON, AiError } from "../../lib/ai";
import { playText } from "../../lib/audio";
import { LINKS } from "../../content";
import { toast } from "../../lib/toast";

type Dir = "ca-es" | "es-ca";
type Tool = "dicc" | "sin" | "conj";

interface DictRes { paraula?: string; categoria?: string; definicio?: string; traduccions?: { text: string; nota?: string }[]; exemples?: { ca: string; es: string }[]; evita?: string }
interface SinRes { paraula?: string; sinonims?: { paraula: string; matis?: string }[]; antonims?: string[]; nota?: string }
interface ConjRes { infinitiu?: string; gerundi?: string; participi?: string; temps?: { nom: string; formes: string[] }[]; balear?: string; nota?: string }

const PERSONES = ["jo", "tu", "ell/ella/vostè", "nosaltres", "vosaltres", "ells/elles/vostès"];
const cache = new Map<string, unknown>();

const BASE = "Ets un lexicògraf expert en català normatiu (IEC), amb atenció a les formes balears. Respon NOMÉS amb JSON vàlid.";

function prompt(tool: Tool, dir: Dir, w: string): string {
  if (tool === "dicc" && dir === "ca-es") return `${BASE}
Paraula o expressió catalana: «${w}». Si està mal escrita o és un barbarisme, posa a "evita" la forma correcta i per què.
JSON: {"paraula":"forma correcta","categoria":"nom m. / verb / adj. / loc. ...","definicio":"definició breu en català","traduccions":[{"text":"equivalent castellà","nota":"accepció o matís"}],"exemples":[{"ca":"frase","es":"traducció"}],"evita":""}
Màxim 4 traduccions i 2 exemples.`;
  if (tool === "dicc") return `${BASE}
Paraula o expressió castellana: «${w}».
JSON: {"paraula":"${w}","categoria":"categoria gramatical","definicio":"què vol dir, breu, en català","traduccions":[{"text":"equivalent català normatiu","nota":"registre (formal/col·loquial/balear) o accepció"}],"exemples":[{"ca":"frase en català","es":"frase en castellà"}],"evita":"barbarisme o fals amic que cal evitar en català, si n'hi ha"}
Màxim 4 traduccions i 2 exemples.`;
  if (tool === "sin") return `${BASE}
${dir === "es-ca" ? `Tradueix primer al català la paraula castellana «${w}» i dona sinònims de la traducció.` : `Paraula catalana: «${w}».`}
JSON: {"paraula":"paraula catalana","sinonims":[{"paraula":"sinònim","matis":"diferència d'ús o registre, molt breu"}],"antonims":["..."],"nota":"consell d'ús per a un text formal de nivell C1"}
Entre 4 i 10 sinònims, del més habitual al menys. Només formes normatives.`;
  return `${BASE}
${dir === "es-ca" ? `Verb castellà «${w}»: conjuga el verb català equivalent.` : `Verb català: «${w}» (si no és infinitiu, troba'n l'infinitiu).`}
Conjugació normativa estàndard (central/general). Formes en l'ordre: jo, tu, ell, nosaltres, vosaltres, ells.
JSON: {"infinitiu":"...","gerundi":"...","participi":"masculí, femení","temps":[{"nom":"Present d'indicatiu","formes":[6 formes]},{"nom":"Imperfet d'indicatiu","formes":[6]},{"nom":"Passat perifràstic","formes":[6]},{"nom":"Futur","formes":[6]},{"nom":"Condicional","formes":[6]},{"nom":"Present de subjuntiu","formes":[6]},{"nom":"Imperfet de subjuntiu","formes":[6]},{"nom":"Imperatiu","formes":["-", "tu", "ell", "nosaltres", "vosaltres", "ells"]}],"balear":"present d'indicatiu en forma balear (jo …, tu …), si és diferent","nota":"irregularitats o trampes freqüents"}`;
}

/** Diccionari català ⇄ castellà, sinònims i conjugador, tot dins de l'app. */
export function Dictionary() {
  const [w, setW] = useState("");
  const [dir, setDir] = useState<Dir>("ca-es");
  const [tool, setTool] = useState<Tool | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<{ tool: Tool; data: unknown } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function run(t: Tool) {
    const word = w.trim();
    if (!word) { toast("Escriu una paraula"); return; }
    setTool(t); setErr(null);
    const key = `${t}|${dir}|${word.toLowerCase()}`;
    if (cache.has(key)) { setRes({ tool: t, data: cache.get(key) }); return; }
    setBusy(true); setRes(null);
    try {
      const data = await askJSON<unknown>(prompt(t, dir, word));
      cache.set(key, data);
      setRes({ tool: t, data });
    } catch (e) {
      setErr(e instanceof AiError ? e.message : "No s'ha pogut consultar. Comprova la connexió.");
    } finally { setBusy(false); }
  }

  return (
    <Card className="space-y-3 p-4">
      <Segmented value={dir} onChange={(v) => { setDir(v as Dir); setRes(null); }} options={[{ value: "ca-es", label: "Català → castellà" }, { value: "es-ca", label: "Castellà → català" }]} />
      <input type="search" value={w} onChange={(e) => setW(e.target.value)} aria-label="Paraula"
        placeholder={dir === "ca-es" ? "p. ex. malbaratar, enyorar, tanmateix" : "p. ex. llevar a cabo, desperdiciar, echar de menos"}
        autoCapitalize="none" autoComplete="off" className="w-full rounded-xl bg-bg px-3.5 py-3 text-[17px]"
        onKeyDown={(e) => { if (e.key === "Enter") void run(tool ?? "dicc"); }} />
      <div className="grid grid-cols-3 gap-2">
        {([["dicc", "Diccionari"], ["sin", "Sinònims"], ["conj", "Conjugar"]] as const).map(([t, label]) => (
          <Btn key={t} variant={tool === t ? "primary" : "soft"} onClick={() => void run(t)} disabled={busy}>{busy && tool === t ? "…" : label}</Btn>
        ))}
      </div>

      {err && <div className="rounded-xl bg-bad/10 p-3 text-[14px] text-bad">{err}</div>}
      {res?.tool === "dicc" && <DictView d={res.data as DictRes} dir={dir} />}
      {res?.tool === "sin" && <SinView d={res.data as SinRes} />}
      {res?.tool === "conj" && <ConjView d={res.data as ConjRes} />}
      {res && <div className="text-[12px] text-muted">Resposta del profe IA. En cas de dubte, confirma-ho al <ExtLink href={LINKS.diec}>DIEC</ExtLink>.</div>}
    </Card>
  );
}

const Say = ({ t }: { t: string }) => (
  <button onClick={() => void playText(t)} aria-label={`Escolta «${t}»`} className="ml-1.5 inline-grid h-7 w-7 place-items-center rounded-full bg-accent/10 text-[12px] text-accent align-middle">▶</button>
);

function DictView({ d, dir }: { d: DictRes; dir: Dir }) {
  const tr = (d.traduccions ?? []).filter((x) => x?.text);
  return (
    <div className="space-y-3 rounded-xl bg-bg p-3.5">
      <div>
        <span className="text-[20px] font-bold">{d.paraula}</span>
        {dir === "ca-es" && d.paraula && <Say t={d.paraula} />}
        {d.categoria && <span className="ml-2 text-[13px] italic text-muted">{d.categoria}</span>}
      </div>
      {d.definicio && <p className="text-[15px] leading-relaxed">{d.definicio}</p>}
      {tr.length > 0 && (
        <div className="space-y-1.5">
          <div className="text-[12px] font-semibold uppercase tracking-wide text-muted">{dir === "ca-es" ? "En castellà" : "En català"}</div>
          {tr.map((x, i) => (
            <div key={i} className="text-[16px]">
              <b>{x.text}</b>{dir === "es-ca" && <Say t={x.text} />}
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
      {d.evita && <div className="rounded-lg bg-warn/15 p-2.5 text-[14px]"><b>Evita:</b> {d.evita}</div>}
    </div>
  );
}

function SinView({ d }: { d: SinRes }) {
  const s = (d.sinonims ?? []).filter((x) => x?.paraula);
  return (
    <div className="space-y-3 rounded-xl bg-bg p-3.5">
      <div className="text-[20px] font-bold">{d.paraula}{d.paraula && <Say t={d.paraula} />}</div>
      <div className="flex flex-wrap gap-2">
        {s.map((x, i) => (
          <span key={i} className="rounded-xl bg-card px-3 py-1.5 text-[15px]">
            <b>{x.paraula}</b>{x.matis && <span className="ml-1.5 text-[12.5px] text-muted">{x.matis}</span>}
          </span>
        ))}
      </div>
      {(d.antonims ?? []).length > 0 && <div className="text-[14px]"><b>Antònims:</b> {d.antonims!.join(", ")}</div>}
      {d.nota && <div className="text-[14px] text-muted">{d.nota}</div>}
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
            <div className="mb-1.5 text-[13px] font-semibold text-accent">{t.nom}</div>
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
