import { useMemo, useState } from "react";
import { Page, Section, Card, Btn, Pill, Bar, Note } from "../../components/ui";
import { AudioPlayer } from "../../components/AudioPlayer";
import { useRecorder } from "../../lib/recorder";
import { transcribe, SttError } from "../../lib/stt";
import { analyse, highlight, oralPrompt, normalizeOral, type OralFeedback, type OralMetrics, type Transcript } from "../../lib/oral";
import { askJSON, AiError } from "../../lib/ai";
import { CONNECTORS, ORAL } from "../../content";
import { UNITS } from "../../content/units";
import { setState, award } from "../../lib/store";
import { addError } from "../../lib/notebook";
import { isoDate } from "../../lib/dates";
import { fmtClock } from "../../lib/text";
import { toast } from "../../lib/toast";

type Phase = "ready" | "listening" | "analysing" | "result";

/** Grava una exposició, la transcriu i la corregeix amb els criteris de l'oral del C1. */
export function OralCoach({ topic, phrases = [], minutes = 3, onDone }: { topic: string; phrases?: string[]; minutes?: number; onDone?: (score: number | null) => void }) {
  const rec = useRecorder(Math.min(240, minutes * 60 + 60));
  const [phase, setPhase] = useState<Phase>("ready");
  const [t, setT] = useState<Transcript | null>(null);
  const [m, setM] = useState<OralMetrics | null>(null);
  const [fb, setFb] = useState<OralFeedback | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [aiNote, setAiNote] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function analyseRec() {
    if (!rec.blob) return;
    setErr(null); setAiNote(null); setFb(null); setSaved(false);
    setPhase("analysing");
    try {
      const tr = await transcribe(rec.blob);
      const met = analyse(tr, CONNECTORS.map((c) => c.term));
      setT(tr); setM(met); setPhase("result");
      let score: number | null = null;
      try {
        const f = normalizeOral(await askJSON<unknown>(oralPrompt(topic, tr, met)));
        setFb(f);
        score = f.nota;
      } catch (e) {
        setAiNote(e instanceof AiError ? e.message : "La correcció amb IA no ha respost; tens les mètriques igualment.");
      }
      setState((s) => ({ ...s, speaking: [...s.speaking, { at: Date.now(), scenario: `oral:${topic.slice(0, 60)}`, score }].slice(-100) }));
      award("oral", undefined, isoDate());
      onDone?.(score);
    } catch (e) {
      setErr(e instanceof SttError ? e.message : "Alguna cosa ha fallat. Torna-ho a provar.");
      setPhase("listening");
    }
  }

  function saveErrors() {
    if (!fb) return;
    const today = isoDate();
    setState((s) => fb.errors.reduce((acc, e) => addError(acc, { wrong: e.dit, right: e.millor, note: e.per_que, source: "oral" }, today), s));
    setSaved(true);
    toast(`${fb.errors.length} errors desats al quadern`);
  }

  function again() {
    rec.reset(); setT(null); setM(null); setFb(null); setErr(null); setPhase("ready");
  }

  const limit = minutes * 60;
  return (
    <div className="space-y-4">
      <Card className="space-y-3 p-4">
        <div className="text-[13px] font-semibold uppercase tracking-wide text-oral">Tema</div>
        <div className="text-[19px] font-bold leading-snug">{topic}</div>
        {phrases.length > 0 && <div className="flex flex-wrap gap-1.5">{phrases.map((p) => <span key={p} className="rounded-full bg-oral/10 px-2.5 py-1 text-[13px] text-oral">{p}</span>)}</div>}
        <p className="text-[13.5px] text-muted">Parla uns {minutes} minuts: presenta el tema, dona dues o tres idees amb exemples i tanca amb una conclusió. Si et quedes en blanc, fes una pausa en silenci en lloc de dir «eh».</p>
      </Card>

      {rec.state === "unsupported" && <Note>Aquest navegador no permet gravar. Prova amb Chrome o Safari actualitzats.</Note>}
      {rec.state === "denied" && <Note>No hi ha permís per al micròfon. Activa'l a la configuració del navegador per a aquesta web i torna-ho a provar.</Note>}

      {phase !== "result" && rec.state !== "unsupported" && (
        <Card className="flex flex-col items-center gap-3 p-5">
          <div className={`text-[48px] font-bold tracking-tight tabular ${rec.seconds > limit ? "text-warn" : ""}`}>{fmtClock(rec.seconds)}</div>
          <div className="w-full"><Bar value={Math.min(1, rec.seconds / limit)} tone={rec.seconds > limit ? "warn" : "accent"} /></div>
          {rec.state === "recording" ? (
            <button onClick={() => { rec.stop(); setPhase("listening"); }} aria-label="Atura la gravació"
              className="grid h-20 w-20 place-items-center rounded-full bg-bad text-white shadow-lg active:scale-95">
              <span className="h-7 w-7 rounded-md bg-white" />
            </button>
          ) : rec.state === "done" ? null : (
            <button onClick={() => { void rec.start(); setPhase("ready"); }} aria-label="Comença a gravar" disabled={rec.state === "asking"}
              className="grid h-20 w-20 place-items-center rounded-full bg-oral text-white shadow-lg active:scale-95 disabled:opacity-50">
              <span className="h-7 w-7 rounded-full bg-white" />
            </button>
          )}
          <div className="text-[13px] text-muted">
            {rec.state === "recording" ? (rec.seconds > limit ? "Ja has passat del temps: tanca amb una conclusió." : "Gravant… toca per acabar.") : rec.state === "done" ? "Gravació feta." : "Toca per començar a gravar."}
          </div>
          {rec.state === "done" && rec.url && (
            <div className="w-full space-y-3">
              <AudioPlayer src={rec.url} label="Escolta't" />
              {err && <Note>{err}</Note>}
              <div className="grid grid-cols-2 gap-2">
                <Btn variant="soft" onClick={again}>Torna a gravar</Btn>
                <Btn onClick={() => void analyseRec()} disabled={phase === "analysing"}>{phase === "analysing" ? "Escoltant…" : "Corregeix-me"}</Btn>
              </div>
            </div>
          )}
        </Card>
      )}

      {phase === "result" && t && m && <Result t={t} m={m} fb={fb} aiNote={aiNote} url={rec.url} saved={saved} onSave={saveErrors} onAgain={again} />}
    </div>
  );
}

function Result({ t, m, fb, aiNote, url, saved, onSave, onAgain }: { t: Transcript; m: OralMetrics; fb: OralFeedback | null; aiNote: string | null; url: string | null; saved: boolean; onSave: () => void; onAgain: () => void }) {
  const spans = useMemo(() => highlight(t.text, m), [t.text, m]);
  const paceTip = m.pace === "lent" ? "Una mica lent: prepara frases fetes per enllaçar idees." : m.pace === "ràpid" ? "Massa ràpid: frena i marca les pauses entre idees." : "Bon ritme per a un examen.";
  return (
    <>
      {fb && (
        <Card className="space-y-3 p-4">
          <div className="flex items-end justify-between">
            <div><div className="text-[13px] text-muted">Nota orientativa</div><div className="text-[44px] font-bold leading-none tabular">{fb.nota}</div></div>
            <Pill tone={fb.nota >= 60 ? "good" : "warn"}>{fb.nota >= 60 ? "Apte" : "Encara no"}</Pill>
          </div>
          <div className="space-y-2.5">
            {fb.criteris.map((c) => (
              <div key={c.nom}>
                <div className="flex justify-between text-[14px]"><span className="font-semibold">{c.nom}</span><span className="tabular text-muted">{c.nota}/10</span></div>
                <Bar value={c.nota / 10} tone={c.nota >= 6 ? "good" : "warn"} />
                {c.comentari && <div className="mt-1 text-[13px] text-muted">{c.comentari}</div>}
              </div>
            ))}
          </div>
          {fb.consell && <div className="rounded-xl bg-oral/10 p-3 text-[14.5px]"><b>Per a la propera:</b> {fb.consell}</div>}
        </Card>
      )}
      {aiNote && <Note>{aiNote}</Note>}

      <Section title="Mètriques">
        <div className="grid grid-cols-2 gap-2">
          <Metric value={m.wpm} label="paraules/minut" tip={paceTip} />
          <Metric value={m.fillerTotal} label="crosses" tip={m.fillers.map((f) => `${f.label} ×${f.n}`).join(" · ") || "Cap. Molt bé!"} />
          <Metric value={m.pauses} label="pauses llargues" tip={m.pauses ? `La més llarga: ${m.longestPause} s` : "Sense bloquejos"} />
          <Metric value={`${Math.round(m.variety * 100)}%`} label="varietat lèxica" tip={m.variety >= 0.55 ? "Vocabulari variat" : "Repeteixes força paraules"} />
        </div>
        <Card className="mt-2 p-4 text-[14px]">
          <b>Connectors:</b> {m.connectors.length ? m.connectors.join(", ") : "no n'he detectat cap. Prova «en primer lloc», «a més a més», «per tant», «en definitiva»."}
        </Card>
      </Section>

      <Section title="El que has dit">
        <Card className="space-y-3 p-4">
          {url && <AudioPlayer src={url} label="La teva gravació" />}
          <p className="text-[16px] leading-relaxed">
            {spans.map((s, i) => s.kind ? <mark key={i} title={s.tip} className={`rounded px-0.5 ${s.kind === "error" ? "bg-bad/15 text-bad" : "bg-warn/20 text-warn"}`}>{s.text}</mark> : <span key={i}>{s.text}</span>)}
          </p>
          <div className="flex gap-3 text-[12px] text-muted"><span><mark className="rounded bg-bad/15 px-1 text-bad">vermell</mark> error</span><span><mark className="rounded bg-warn/20 px-1 text-warn">taronja</mark> crossa</span></div>
          <p className="text-[12px] text-muted">És una transcripció automàtica: si una paraula surt estranya, potser no s'ha entès bé com l'has pronunciada.</p>
        </Card>
      </Section>

      {fb && fb.errors.length > 0 && (
        <Section title="Errors i com dir-ho">
          <Card className="divide-y divide-line">
            {fb.errors.map((e, i) => (
              <div key={i} className="space-y-1 p-4">
                <div className="text-[15px]"><s className="text-bad">{e.dit}</s> → <b className="text-good">{e.millor}</b></div>
                {e.per_que && <div className="text-[13px] text-muted">{e.per_que}</div>}
              </div>
            ))}
          </Card>
          <div className="mt-2"><Btn block variant="soft" disabled={saved} onClick={onSave}>{saved ? "Desats al quadern" : "Desa'ls al quadern d'errors"}</Btn></div>
        </Section>
      )}

      {fb && fb.reformulacions.length > 0 && (
        <Section title="Com ho diria un C1">
          <Card className="divide-y divide-line">
            {fb.reformulacions.map((r, i) => (
              <div key={i} className="space-y-2 p-4">
                {r.original && <div className="text-[14px] text-muted">«{r.original}»</div>}
                <div className="text-[15.5px] font-semibold">«{r.millor}»</div>
                <AudioPlayer text={r.millor} label="Escolta i repeteix" />
              </div>
            ))}
          </Card>
        </Section>
      )}

      {fb && (fb.punts_forts.length > 0 || fb.pronuncia.length > 0) && (
        <Section title="Més detalls">
          <Card className="space-y-2 p-4 text-[14px]">
            {fb.punts_forts.length > 0 && <div><b>Punts forts:</b> {fb.punts_forts.join(" · ")}</div>}
            {fb.pronuncia.length > 0 && <div><b>Revisa la pronunciació:</b> {fb.pronuncia.map((p) => `${p.paraula}${p.nota ? ` (${p.nota})` : ""}`).join(" · ")}</div>}
          </Card>
        </Section>
      )}

      <div className="mt-4"><Btn block onClick={onAgain}>Torna-ho a provar</Btn></div>
    </>
  );
}

function Metric({ value, label, tip }: { value: string | number; label: string; tip: string }) {
  return (
    <Card className="p-3.5">
      <div className="text-[28px] font-bold leading-none tabular">{value}</div>
      <div className="mt-1 text-[12.5px] font-semibold">{label}</div>
      <div className="mt-1 text-[12px] leading-snug text-muted">{tip}</div>
    </Card>
  );
}

/** Pàgina lliure: tria un tema (de les unitats o del banc oral) i grava't. */
export default function OralCoachPage() {
  const topics = useMemo(() => {
    const fromUnits = UNITS.filter((u) => u.content).map((u) => ({ topic: u.content!.oral.topic, phrases: u.content!.oral.phrases, from: u.title }));
    const bank = ORAL.topics.map((t) => ({ topic: t, phrases: [] as string[], from: "Banc d'examen" }));
    return [...fromUnits, ...bank];
  }, []);
  const [i, setI] = useState(() => Math.floor(Math.random() * Math.max(1, topics.length)));
  const [key, setKey] = useState(0);
  const cur = topics[i % topics.length];
  return (
    <Page title="Grava't i et corregeixo" subtitle="L'app t'escolta, transcriu el que dius i et corregeix com a l'oral del C1." back={{ to: "practica", label: "Practica" }}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-[13px] text-muted">{cur.from}</span>
        <Btn variant="soft" onClick={() => { setI((x) => (x + 1) % topics.length); setKey((k) => k + 1); }}>Un altre tema</Btn>
      </div>
      <OralCoach key={key} topic={cur.topic} phrases={cur.phrases} />
    </Page>
  );
}
