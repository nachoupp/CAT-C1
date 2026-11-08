import { useEffect, useMemo, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Icon, Note, Segmented, ExtLink, Check } from "../../components/ui";
import { ItemQuiz, ResultsList, type ItemResult } from "../../components/ItemQuiz";
import { LiveEditor } from "../../components/LiveEditor";
import { MOCKS, STRATEGY, type MockExam } from "../../content/mocks";
import { ALL_RULES } from "../../content/rules";
import { BANK, EXAMS, LINKS } from "../../content";
import type { ChoiceItem } from "../../content/units";
import { useStore, setState, award } from "../../lib/store";
import { isoDate } from "../../lib/dates";
import { countWords, fmtClock, shuffle } from "../../lib/text";
import { canSpeak, speak, stopSpeaking } from "../../lib/speech";
import { askJSON, AiError } from "../../lib/ai";
import { addError } from "../../lib/notebook";
import { go } from "../../lib/router";
import { toast } from "../../lib/toast";
import type { AreaKey } from "../../lib/types";
import { rubricPrompt, normalize, type Correction } from "../write/rubric";
import { CorrectionCard } from "../route/Unit";

export default function Exams() {
  const mocks = useStore((s) => s.mocks);
  const keys = useStore((s) => s.officialKeys);
  const today = isoDate();
  return (
    <Page title="Exàmens" subtitle="Simulacres complets dins l'app, amb correcció en directe o al final i informe de millora.">
      <Section title="Exàmens Parla · format GOIB">
        <List>
          {MOCKS.map((m) => {
            const last = mocks.filter((x) => x.examId === m.id).at(-1);
            return <Row key={m.id} left={<Icon tone="sist">P</Icon>} title={m.title} detail={last ? `Últim intent: ${new Date(last.at).toLocaleDateString("ca-ES")}` : "4 àrees · comprensió, gramàtica, escrit i oral"} to={`exam-${m.id}`} />;
          })}
          <Row left={<Icon tone="fg">+</Icon>} title="Examen Parla 2 i 3" detail="En preparació" right={<Pill tone="muted">Aviat</Pill>} chevron={false} />
        </List>
      </Section>
      <Section title="Exàmens oficials GOIB">
        <List>
          {EXAMS.map((e) => {
            const locked = e.reserved && today < "2027-09-01";
            return <Row key={e.id} left={<Icon tone={locked ? "fg" : "comp"}>{e.label.slice(-2)}</Icon>} title={e.label}
              detail={locked ? "Reservat per als simulacres de setembre" : keys[e.id] ? "Clau introduïda · correcció automàtica" : "Àudio, rellotge i full de respostes"}
              right={locked ? <Pill tone="muted">Setembre</Pill> : undefined} onClick={locked ? undefined : () => go(`official-${e.id}`)} chevron={!locked} />;
          })}
        </List>
        <Note>L'enunciat oficial s'obre en PDF al web del Govern; dins l'app hi tens l'àudio, el rellotge, el full de respostes i la correcció.</Note>
      </Section>
    </Page>
  );
}

/* ---------- Examen Parla ---------- */
type Mode = "live" | "exam";
const AREAS: { key: AreaKey; label: string; tone: "comp" | "sist" | "escr" | "oral"; minutes: number }[] = [
  { key: "comprensio", label: "Àrea 1 · Comprensió oral i lectora", tone: "comp", minutes: 80 },
  { key: "sistema", label: "Àrea 2 · Domini del sistema lingüístic", tone: "sist", minutes: 40 },
  { key: "escrita", label: "Àrea 3 · Expressió escrita", tone: "escr", minutes: 100 },
  { key: "oral", label: "Àrea 4 · Expressió oral", tone: "oral", minutes: 20 }
];

interface AreaOutcome { score: number; wrong: ItemResult[]; notes?: string[] }

export function MockRunner({ id }: { id: string }) {
  const m = MOCKS.find((x) => x.id === id);
  const [mode, setMode] = useState<Mode>("live");
  const [area, setArea] = useState<AreaKey | null>(null);
  const [out, setOut] = useState<Partial<Record<AreaKey, AreaOutcome>>>({});
  const [report, setReport] = useState(false);
  if (!m) return <Page title="No trobat" back={{ to: "examens", label: "Exàmens" }}><Note>Aquest examen no existeix.</Note></Page>;
  const back = { to: "examens", label: "Exàmens" };
  const finishArea = (k: AreaKey, o: AreaOutcome) => { setOut((x) => ({ ...x, [k]: o })); setArea(null); window.scrollTo({ top: 0 }); };

  if (area) {
    const a = AREAS.find((x) => x.key === area)!;
    return (
      <Page title={a.label} subtitle={`${m.title} · ${mode === "live" ? "correcció en directe" : "mode examen"}`} back={{ to: `exam-${m.id}`, label: m.title, onClick: () => setArea(null) }}>
        <AreaTimer minutes={a.minutes} />
        {area === "comprensio" && <Comprehension m={m} live={mode === "live"} onDone={(o) => finishArea("comprensio", o)} />}
        {area === "sistema" && <SystemArea live={mode === "live"} onDone={(o) => finishArea("sistema", o)} />}
        {area === "escrita" && <WritingArea m={m} onDone={(o) => finishArea("escrita", o)} />}
        {area === "oral" && <OralArea m={m} onDone={(o) => finishArea("oral", o)} />}
      </Page>
    );
  }

  if (report) {
    const scores = AREAS.map((a) => ({ ...a, o: out[a.key] }));
    return (
      <Page title="Informe" subtitle={m.title} back={{ to: "examens", label: "Exàmens" }}>
        <Card className="space-y-3 p-4">
          {scores.map((a) => (
            <div key={a.key} className="flex items-center justify-between gap-2">
              <span className="font-medium">{a.label.split(" · ")[1]}</span>
              {a.o ? <Pill tone={a.o.score >= 60 ? "good" : "warn"}>{a.o.score} / 100</Pill> : <Pill tone="muted">No feta</Pill>}
            </div>
          ))}
          <p className="text-[13.5px] text-muted">Cal un 60 a cada àrea. Les àrees no es compensen.</p>
        </Card>
        {scores.filter((a) => a.o && a.o.score < 60).length > 0 && (
          <Section title="Com millorar">
            <Card className="space-y-3 p-4 text-[15px]">
              {scores.filter((a) => a.o && a.o.score < 60).map((a) => (
                <div key={a.key}><b>{a.label.split(" · ")[1]}:</b> {STRATEGY[a.key === "comprensio" ? "listening" : a.key === "sistema" ? "system" : a.key === "escrita" ? "writing" : "oral"]}</div>
              ))}
            </Card>
          </Section>
        )}
        {scores.map((a) => a.o && a.o.wrong.length > 0 && (
          <Section key={a.key} title={`Fallades · ${a.label.split(" · ")[1]}`}><ResultsList results={a.o.wrong} /></Section>
        ))}
        <div className="mt-5"><Btn block variant="soft" onClick={() => { setOut({}); setReport(false); }}>Torna a començar</Btn></div>
      </Page>
    );
  }

  const done = AREAS.filter((a) => out[a.key]).length;
  return (
    <Page title={m.title} subtitle="Fes les àrees en l'ordre que vulguis. En acabar, reps l'informe." back={back}>
      <Card className="space-y-3 p-4">
        <div className="text-[14px] font-medium">Com vols corregir?</div>
        <Segmented value={mode} onChange={setMode} options={[{ value: "live", label: "En directe" }, { value: "exam", label: "En acabar" }]} />
        <p className="text-[13.5px] text-muted">{mode === "live" ? "Veus si encertes i per què després de cada resposta." : "Com a l'examen real: sense correccions fins al final."}</p>
      </Card>
      <Section title="Àrees">
        <List>
          {AREAS.map((a) => (
            <Row key={a.key} left={<Icon tone={out[a.key] ? "good" : a.tone}>{out[a.key] ? "✓" : a.label[5]}</Icon>} title={a.label} detail={`${a.minutes} min`}
              right={out[a.key] ? <Pill tone={out[a.key]!.score >= 60 ? "good" : "warn"}>{out[a.key]!.score}</Pill> : undefined} onClick={() => setArea(a.key)} />
          ))}
        </List>
      </Section>
      <div className="mt-5"><Btn block disabled={done === 0} onClick={() => {
        setState((s) => ({ ...s, mocks: [...s.mocks, { at: Date.now(), examId: m.id, areas: Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v!.score])) }] }));
        if (done === 4) award("mock", "simulacre");
        setReport(true);
      }}>Veure l'informe ({done}/4 àrees)</Btn></div>
    </Page>
  );
}

function AreaTimer({ minutes }: { minutes: number }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { toast("S'ha acabat el temps de l'àrea"); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl bg-card px-4 py-2.5">
      <span className="text-[14px] text-muted">Temps de l'àrea</span>
      <button className={`font-semibold tabular ${left !== null && left < 300 ? "text-bad" : "text-accent"}`} onClick={() => setLeft(left === null ? minutes * 60 : null)}>{left === null ? `Inicia ${minutes}:00` : fmtClock(left)}</button>
    </div>
  );
}

function Comprehension({ m, live, onDone }: { m: MockExam; live: boolean; onDone: (o: AreaOutcome) => void }) {
  type Part = { kind: "l"; title: string; script: string; items: ChoiceItem[] } | { kind: "r"; title: string; text: string; items: ChoiceItem[] };
  const parts: Part[] = [...m.listening.map((l) => ({ kind: "l" as const, ...l })), ...m.reading.map((r) => ({ kind: "r" as const, ...r }))];
  const [i, setI] = useState(0);
  const [acc, setAcc] = useState<ItemResult[]>([]);
  const [plays, setPlays] = useState(0);
  const p = parts[i];
  const next = (r: ItemResult[]) => {
    const all = [...acc, ...r];
    stopSpeaking(); setPlays(0);
    if (i + 1 >= parts.length) onDone({ score: Math.round((all.filter((x) => x.ok).length / all.length) * 100), wrong: all.filter((x) => !x.ok) });
    else { setAcc(all); setI(i + 1); window.scrollTo({ top: 0 }); }
  };
  return (
    <>
      <div className="mb-2 text-[17px] font-semibold">{p.title}</div>
      {p.kind === "l" ? (
        <Card className="mb-4 space-y-2 p-4">
          <p className="text-[14.5px] text-muted">Llegeix les preguntes i escolta l'àudio. Tens dues audicions.</p>
          {canSpeak() ? (
            <Btn variant="soft" disabled={plays >= 2} onClick={() => { speak(p.script); setPlays(plays + 1); }}>{plays >= 2 ? "Audicions esgotades" : `Escolta (${2 - plays} restants)`}</Btn>
          ) : <details><summary className="cursor-pointer text-accent">El dispositiu no pot llegir en veu alta: mostra la transcripció</summary><p className="mt-2">{p.script}</p></details>}
        </Card>
      ) : (
        <Card className="mb-4 whitespace-pre-wrap p-4 text-[16px] leading-relaxed">{p.text}</Card>
      )}
      <ItemQuiz key={i} items={p.items} live={live} title="Pregunta" onFinish={next} />
    </>
  );
}

function SystemArea({ live, onDone }: { live: boolean; onDone: (o: AreaOutcome) => void }) {
  const items = useMemo<ChoiceItem[]>(() => shuffle(BANK).slice(0, 30).map((b) => ({ type: "choice", q: b.prompt, options: shuffle([b.answer, ...b.distractors]), answer: b.answer, e: b.explanation })), []);
  return (
    <>
      <Card className="mb-4 p-4 text-[14.5px] text-muted">30 preguntes. Cal encertar-ne 18 (60 %).</Card>
      <ItemQuiz items={items} live={live} rules={live ? ALL_RULES.filter((r) => r.forms?.length) : []} title="Pregunta" onFinish={(r) => {
        const today = isoDate();
        setState((s) => r.filter((x) => !x.ok).reduce((acc, x) => addError(acc, { wrong: x.given, right: (x.item as ChoiceItem).answer, note: x.item.e, source: "examen" }, today), s));
        onDone({ score: Math.round((r.filter((x) => x.ok).length / r.length) * 100), wrong: r.filter((x) => !x.ok) });
      }} />
    </>
  );
}

function WritingArea({ m, onDone }: { m: MockExam; onDone: (o: AreaOutcome) => void }) {
  const drafts = useStore((s) => s.drafts);
  const [res, setRes] = useState<Record<string, Correction>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const correct = async (w: MockExam["writing"][number]) => {
    const text = drafts[w.id] ?? "";
    if (countWords(text) < 60) { toast("Escriu una mica més abans de corregir"); return; }
    setBusy(w.id);
    try {
      const r = normalize(await askJSON(rubricPrompt({ id: w.id, title: "Examen", words: w.words, minutes: 50, exercise: `Àrea 3 · ${w.words} paraules`, brief: w.brief }) + `\n\nText de l'alumne:\n"""${text.slice(0, 6000)}"""`));
      if (!r) throw new AiError("invalid_json", "La correcció no ha sortit bé. Torna-ho a provar.");
      setRes((x) => ({ ...x, [w.id]: r }));
      const today = isoDate();
      setState((s) => r.errors.reduce((acc, e) => addError(acc, { wrong: e.original, right: e.correccio, note: e.explicacio, source: "examen" }, today), { ...s, writings: [...s.writings, { at: Date.now(), promptId: w.id, score: Math.round(r.nota), words: countWords(text) }].slice(-100) }));
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut corregir."); }
    finally { setBusy(null); }
  };
  const all = m.writing.every((w) => res[w.id]);
  const score = Math.round(m.writing.reduce((a, w) => a + (res[w.id]?.nota ?? 0) * w.weight, 0) / 100);
  return (
    <>
      {m.writing.map((w, i) => (
        <Section key={w.id} title={`Exercici ${i + 1} · ${w.words} paraules · ${w.weight} punts`}>
          <Card className="space-y-3 p-4">
            <p>{w.brief}</p>
            <LiveEditor id={w.id} value={drafts[w.id] ?? ""} onChange={(v) => setState((s) => ({ ...s, drafts: { ...s.drafts, [w.id]: v } }))} target={w.words} />
            <Btn block disabled={busy !== null} onClick={() => correct(w)}>{busy === w.id ? "Corregint…" : res[w.id] ? "Torna a corregir" : "Corregeix"}</Btn>
          </Card>
          {res[w.id] && <CorrectionCard c={res[w.id]} />}
        </Section>
      ))}
      <div className="mt-5"><Btn block disabled={!all} onClick={() => onDone({ score, wrong: [] })}>{all ? `Tanca l'àrea (${score}/100)` : "Corregeix els dos textos per tancar l'àrea"}</Btn></div>
    </>
  );
}

const ORAL_CRITERIA = ["He llegit amb bona pronúncia i sense entrebancs", "He interactuat: he proposat, he respost i he arribat a un acord", "La meva exposició tenia introducció, arguments i conclusió", "He fet servir connectors i lèxic variat", "He parlat amb fluïdesa, sense pauses llargues"];
function OralArea({ m, onDone }: { m: MockExam; onDone: (o: AreaOutcome) => void }) {
  const [checks, setChecks] = useState(ORAL_CRITERIA.map(() => false));
  return (
    <>
      <Section title="Exercici 1 · Lectura en veu alta (20 punts)">
        <Card className="space-y-3 p-4"><p className="text-[17px] leading-relaxed">{m.oral.reading}</p>{canSpeak() && <Btn variant="soft" onClick={() => speak(m.oral.reading)}>Escolta el model després de llegir</Btn>}</Card>
      </Section>
      <Section title="Exercici 2 · Interacció (30 punts)">
        <Card className="space-y-3 p-4"><p>{m.oral.interaction}</p><Btn variant="soft" onClick={() => go("parla")}>Fes-la amb l'interlocutor virtual</Btn></Card>
      </Section>
      <Section title="Exercici 3 · Intervenció individual (50 punts)">
        <Card className="space-y-3 p-4"><p className="text-[18px] font-semibold">{m.oral.talk}</p><p className="text-[14px] text-muted">Prepara un esquema 5 minuts i parla entre 3 i 5 minuts. Grava't amb el mòbil.</p><Btn variant="soft" onClick={() => go("oral")}>Obre el rellotge d'exposició</Btn></Card>
      </Section>
      <Section title="Autoavaluació">
        <Card className="space-y-2.5 p-4">
          {ORAL_CRITERIA.map((t, i) => <label key={t} className="flex items-center gap-3"><Check on={checks[i]} onClick={() => setChecks(checks.map((x, j) => (j === i ? !x : x)))} label={t} /><span className="text-[15px]">{t}</span></label>)}
          <Btn block onClick={() => onDone({ score: checks.filter(Boolean).length * 20, wrong: [] })}>Tanca l'àrea</Btn>
        </Card>
      </Section>
    </>
  );
}

/* ---------- Examen oficial GOIB ---------- */
const A1_GROUPS = ["Exercici 1", "Exercici 2", "Exercici 3", "Exercici 4"];
export function OfficialExam({ id }: { id: string }) {
  const e = EXAMS.find((x) => x.id === id);
  const savedKey = useStore((s) => s.officialKeys[id]);
  const [mode, setMode] = useState<"answer" | "key">("answer");
  const [per, setPer] = useState(5);
  const [ans, setAns] = useState<Record<string, string>>({});
  const [key, setKey] = useState<Record<string, string>>(savedKey ?? {});
  const [checked, setChecked] = useState(false);
  if (!e) return <Page title="No trobat" back={{ to: "examens", label: "Exàmens" }}><Note>Aquest examen no existeix.</Note></Page>;
  const ids = [...A1_GROUPS.flatMap((_, g) => Array.from({ length: per }, (_, i) => `a1-${g + 1}-${i + 1}`)), ...Array.from({ length: 30 }, (_, i) => `a2-${i + 1}`)];
  const grid = mode === "answer" ? ans : key;
  const set = (k: string, v: string) => (mode === "answer" ? setAns : setKey)((x) => ({ ...x, [k]: v.trim().toLowerCase().slice(0, 12) }));
  const score = (prefix: string) => {
    const xs = ids.filter((k) => k.startsWith(prefix) && key[k]);
    return xs.length ? Math.round((xs.filter((k) => (ans[k] ?? "") === key[k]).length / xs.length) * 100) : null;
  };
  const input = (k: string, label: string) => {
    const wrong = checked && key[k] && ans[k] !== key[k];
    const right = checked && key[k] && ans[k] === key[k];
    return (
      <label key={k} className="flex flex-col items-center gap-0.5">
        <span className="text-[11px] text-muted tabular">{label}</span>
        <input aria-label={`Resposta ${label}`} value={grid[k] ?? ""} onChange={(ev) => set(k, ev.target.value)} autoCapitalize="none" autoComplete="off"
          className={`w-12 rounded-lg px-1 py-2 text-center text-[15px] font-semibold ${wrong ? "bg-bad/15 text-bad" : right ? "bg-good/15 text-good" : "bg-bg"}`} />
        {wrong && <span className="text-[11px] text-good">{key[k]}</span>}
      </label>
    );
  };
  const s1 = score("a1-"), s2 = score("a2-");
  return (
    <Page title={e.label} subtitle="Examen oficial del GOIB" back={{ to: "examens", label: "Exàmens" }}>
      <Card className="space-y-3 p-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1"><ExtLink href={e.pdf}>Obre l'enunciat (PDF)</ExtLink><ExtLink href={LINKS.goibExams}>Web oficial</ExtLink></div>
        <div className="space-y-2">
          <div className="text-[14px] font-medium">Àrea 1 · Àudios</div>
          <audio controls preload="none" src={e.audio1} className="w-full" />
          <audio controls preload="none" src={e.audio2} className="w-full" />
        </div>
      </Card>
      <AreaTimer minutes={80} />
      <Card className="space-y-3 p-4">
        <Segmented value={mode} onChange={(v) => { setMode(v); setChecked(false); }} options={[{ value: "answer", label: "Les meves respostes" }, { value: "key", label: "Clau del solucionari" }]} />
        <p className="text-[13.5px] text-muted">{mode === "answer" ? "Escriu la lletra o la paraula de cada resposta." : "Copia una sola vegada les respostes del solucionari oficial; es desaran per a la propera vegada."}</p>
        <label className="flex items-center justify-between text-[14px]"><span>Preguntes per exercici a l'Àrea 1</span>
          <select value={per} onChange={(ev) => setPer(+ev.target.value)} className="rounded-lg bg-bg px-2 py-1">{[4, 5, 6, 7, 8, 10].map((n) => <option key={n}>{n}</option>)}</select>
        </label>
      </Card>
      {A1_GROUPS.map((g, gi) => (
        <Section key={g} title={`Àrea 1 · ${g}`}><Card className="flex flex-wrap gap-2 p-4">{Array.from({ length: per }, (_, i) => input(`a1-${gi + 1}-${i + 1}`, `${i + 1}`))}</Card></Section>
      ))}
      <Section title="Àrea 2 · 30 preguntes"><Card className="flex flex-wrap gap-2 p-4">{Array.from({ length: 30 }, (_, i) => input(`a2-${i + 1}`, `${i + 1}`))}</Card></Section>
      <div className="mt-5 grid gap-2">
        {mode === "key" ? (
          <Btn onClick={() => { setState((s) => ({ ...s, officialKeys: { ...s.officialKeys, [id]: key } })); toast("Clau desada"); setMode("answer"); }}>Desa la clau</Btn>
        ) : (
          <Btn disabled={!Object.keys(key).length} onClick={() => { setChecked(true); award("mock", "simulacre"); window.scrollTo({ top: 0 }); }}>{Object.keys(key).length ? "Corregeix" : "Introdueix primer la clau del solucionari"}</Btn>
        )}
      </div>
      {checked && (
        <Section title="Resultat">
          <Card className="space-y-2 p-4">
            <div className="flex justify-between"><span>Àrea 1 · Comprensió</span>{s1 === null ? <Pill tone="muted">Sense clau</Pill> : <Pill tone={s1 >= 60 ? "good" : "warn"}>{s1} / 100</Pill>}</div>
            <div className="flex justify-between"><span>Àrea 2 · Sistema lingüístic</span>{s2 === null ? <Pill tone="muted">Sense clau</Pill> : <Pill tone={s2 >= 60 ? "good" : "warn"}>{s2} / 100</Pill>}</div>
            {s1 !== null && s1 < 60 && <p className="text-[14.5px]"><b>Comprensió:</b> {STRATEGY.listening}</p>}
            {s2 !== null && s2 < 60 && <p className="text-[14.5px]"><b>Sistema:</b> {STRATEGY.system}</p>}
          </Card>
          <Note>Per a l'Àrea 3, copia la consigna oficial a Escriu → «Consigna pròpia» i la IA et corregeix amb la rúbrica.</Note>
          <div className="mt-2"><Btn variant="soft" onClick={() => go("escriu")}>Corregeix les redaccions</Btn></div>
        </Section>
      )}
    </Page>
  );
}
