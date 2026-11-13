import { useEffect, useRef, useState } from "react";
import { Page, Section, Card, Btn, Note, List, Row } from "../../components/ui";
import { ROLEPLAYS } from "../../content";
import { askAI, askJSON, AiError, type Turn } from "../../lib/ai";
import { useRecorder } from "../../lib/recorder";
import { transcribe, SttError } from "../../lib/stt";
import { speakAndWait, stopAll, playText } from "../../lib/audio";
import { setState, award } from "../../lib/store";
import { addError } from "../../lib/notebook";
import { isoDate } from "../../lib/dates";
import { toast } from "../../lib/toast";

interface Scenario { id: string; title: string; brief: string }
const FREE: Scenario = { id: "lliure", title: "Conversa lliure", brief: "Conversa informal però correcta sobre la vida quotidiana, la feina, l'actualitat o qualsevol tema que proposi l'alumna. Si no en proposa cap, comença tu amb una pregunta sobre la seva setmana." };
const SCENARIOS: Scenario[] = [FREE, ...ROLEPLAYS.map((r) => ({ id: r.id, title: r.title, brief: r.brief }))];

const instruction = (sc: Scenario) => `Ets l'interlocutor de la prova oral del C1 de català (GOIB, Illes Balears) i parles amb una alumna hispanoparlant.
Escenari: ${sc.brief}
Normes:
- Respon SEMPRE en català natural, en 1-3 frases curtes (és una conversa parlada, es llegirà en veu alta).
- En cada torn fes UNA sola pregunta o aporta UNA sola idea perquè la conversa avanci; si l'alumna diu poc, demana-li que ho justifiqui o posi un exemple.
- NO la corregeixis durant la conversa: la correcció es farà al final.
- Si parla en castellà, continua tu en català amb naturalitat.
- Sense llistes, emojis, negretes ni cap format.
Comença tu la conversa amb la primera intervenció.`;

interface Report {
  valoracio?: string; nivell?: string; punts_forts?: string[];
  errors?: { dit: string; correcte: string; tipus?: string; explicacio?: string }[];
  mes_natural?: { dit: string; millor: string; per_que?: string }[];
  vocabulari?: { paraula: string; es?: string }[]; consell?: string;
}
type Phase = "idle" | "listening" | "transcribing" | "thinking" | "speaking" | "analysing";
const STATUS: Record<Phase, string> = { idle: "Toca el micro i parla", listening: "T'estic escoltant…", transcribing: "Transcrivint…", thinking: "L'interlocutor pensa…", speaking: "L'interlocutor parla…", analysing: "Preparant la correcció…" };

/** Conversa en veu: parles, l'app et transcriu, la IA respon amb veu natural i al final et dóna les correccions. */
export default function Conversa() {
  const [sc, setSc] = useState<Scenario | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const turnsRef = useRef<Turn[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [hands, setHands] = useState(false);
  const handsRef = useRef(false);
  const [report, setReport] = useState<Report | null>(null);
  const ignore = useRef(false);
  const handled = useRef(true);
  const alive = useRef(true);
  const scRef = useRef<Scenario | null>(null);
  const rec = useRecorder(120, hands ? 1800 : 0);
  const endRef = useRef<HTMLDivElement>(null);

  handsRef.current = hands;
  const push = (t: Turn) => { turnsRef.current = [...turnsRef.current, t]; setTurns(turnsRef.current); };
  const api = (): Turn[] => [{ role: "user", content: instruction(scRef.current ?? FREE) }, ...turnsRef.current];

  useEffect(() => { alive.current = true; return () => { alive.current = false; ignore.current = true; stopAll(); rec.reset(); }; }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [turns, phase]);

  function listen() {
    ignore.current = false; handled.current = false;
    setPhase("listening");
    void rec.start();
  }

  async function aiTurn() {
    setPhase("thinking");
    try {
      const text = (await askAI(api(), { timeoutMs: 45000 })).replace(/[*_#`]/g, "").trim();
      if (!alive.current) return;
      push({ role: "assistant", content: text });
      setPhase("speaking");
      await speakAndWait(text);
      if (!alive.current || ignore.current) return;
      if (handsRef.current) listen(); else setPhase("idle");
    } catch (e) {
      toast(e instanceof AiError ? e.message : "No s'ha pogut obtenir resposta.");
      if (alive.current) setPhase("idle");
    }
  }

  async function begin(s: Scenario) {
    scRef.current = s; setSc(s); turnsRef.current = []; setTurns([]); setReport(null);
    await aiTurn();
  }

  // Quan acaba la gravació: transcriu → afegeix el teu torn → respon la IA.
  useEffect(() => {
    if (rec.state === "denied") { toast("No hi ha permís per al micròfon. Activa'l als ajustos del navegador."); setPhase("idle"); return; }
    if (rec.state !== "done" || !rec.blob || handled.current || ignore.current) return;
    handled.current = true;
    const blob = rec.blob;
    void (async () => {
      setPhase("transcribing");
      try {
        const t = await transcribe(blob);
        if (!alive.current || ignore.current) return;
        push({ role: "user", content: t.text.trim() });
        await aiTurn();
      } catch (e) {
        toast(e instanceof SttError ? e.message : "No s'ha pogut transcriure.");
        if (alive.current) { if (handsRef.current && e instanceof SttError && /No s'ha sentit/.test(e.message)) listen(); else setPhase("idle"); }
      }
    })();
  }, [rec.state, rec.blob]); // eslint-disable-line react-hooks/exhaustive-deps

  function stopTalking() { ignore.current = true; stopAll(); if (rec.state === "recording") { ignore.current = false; rec.stop(); } else setPhase("idle"); }

  async function finish() {
    ignore.current = true; stopAll(); rec.reset();
    const mine = turnsRef.current.filter((t) => t.role === "user");
    if (mine.length < 2) { toast("Parla una mica més abans de demanar la correcció (almenys 2 intervencions)."); setPhase("idle"); return; }
    setPhase("analysing");
    const dialog = turnsRef.current.map((t) => `${t.role === "user" ? "ALUMNA" : "INTERLOCUTOR"}: ${t.content}`).join("\n");
    try {
      const r = await askJSON<Report>(`Ets professor de català (nivell C1, examen oral del GOIB, Illes Balears; accepta les formes balears normatives) i corregeixes una conversa oral transcrita automàticament. La transcripció pot haver "arreglat" errors: no t'inventis errors que no es vegin al text; i no comptis la puntuació com a error oral.
Només avalua les intervencions de l'ALUMNA, tenint en compte el context de l'INTERLOCUTOR.
${dialog.slice(-6000)}
Respon NOMÉS amb JSON: {"valoracio":"2-3 frases en castellà sobre com ho ha fet","nivell":"nivell orientatiu (B1, B2, C1…)","punts_forts":["2-3 coses que ha fet bé, en castellà"],"errors":[{"dit":"fragment exacte que ha dit","correcte":"forma correcta","tipus":"gramàtica / lèxic / castellanisme / pronom / preposició / verb…","explicacio":"per què és incorrecte, en castellà, indicant si la forma no existeix o s'usa en una altra estructura o temps"}],"mes_natural":[{"dit":"frase correcta però poc natural o gens C1","millor":"alternativa més idiomàtica o de nivell C1","per_que":"breu, en castellà"}],"vocabulari":[{"paraula":"paraula o locució útil que podria haver usat","es":"significat"}],"consell":"un únic consell per a la propera conversa, en castellà"}
Màxim 8 errors, 4 millores de naturalitat i 5 paraules.`, { timeoutMs: 60000 });
      setReport(r);
      const today = isoDate();
      const errs = (r.errors ?? []).filter((e) => e?.dit && e?.correcte);
      setState((s) => errs.reduce((acc, e) => addError(acc, { wrong: e.dit, right: e.correcte, note: e.explicacio ?? "", source: "oral" }, today), s));
      award("practice", "oral");
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut fer la correcció."); }
    finally { if (alive.current) setPhase("idle"); }
  }

  if (!sc) {
    return (
      <Page title="Conversa en veu" subtitle="Parla amb el micro; l'interlocutor et respon amb veu i, al final, et corregeix." back={{ to: "practica", label: "Practica" }}>
        <Note>Cal que el navegador et deixi usar el micròfon. L'interlocutor no et corregeix mentre parles: ho fa al final, amb els errors, frases més naturals i vocabulari nou.</Note>
        <Section title="Tria una situació">
          <List>{SCENARIOS.map((s) => <Row key={s.id} title={s.title} detail={s.brief.length > 110 ? s.brief.slice(0, 107) + "…" : s.brief} onClick={() => void begin(s)} />)}</List>
        </Section>
      </Page>
    );
  }

  const busy = phase !== "idle" && phase !== "listening";
  return (
    <Page title={sc.title} subtitle="Conversa en veu" back={{ to: "practica", label: "Practica" }}>
      <div className="space-y-2.5 pb-44">
        {turns.map((t, i) => (
          <div key={i} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[15.5px] leading-snug ${t.role === "user" ? "bg-accent text-white" : "bg-card"}`}>
              {t.content}
              {t.role === "assistant" && <button onClick={() => void playText(t.content)} aria-label="Torna-ho a escoltar" className="ml-2 text-[12px] opacity-70">▶</button>}
            </div>
          </div>
        ))}
        {report && <ReportView r={report} />}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pb-6 pt-3 backdrop-blur">
        <div className="mx-auto max-w-xl space-y-2">
          <div className="text-center text-[13.5px] text-muted tabular">{STATUS[phase]}{phase === "listening" ? ` · ${rec.seconds} s` : ""}</div>
          <div className="flex items-center justify-center gap-3">
            {!report && (
              <button onClick={() => (phase === "listening" ? rec.stop() : phase === "speaking" ? stopTalking() : listen())} disabled={busy && phase !== "speaking"}
                aria-label={phase === "listening" ? "Acaba de parlar" : "Parla"}
                className={`grid size-16 place-items-center rounded-full text-2xl text-white shadow-lg disabled:opacity-40 ${phase === "listening" ? "animate-pulse bg-bad" : "bg-accent"}`}>
                {phase === "listening" ? "■" : phase === "speaking" ? "⏭" : "🎙"}
              </button>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 text-[13.5px]">
            <label className="flex items-center gap-2"><input type="checkbox" checked={hands} onChange={(e) => setHands(e.target.checked)} /> Micròfon obert (mans lliures)</label>
            {report
              ? <Btn variant="soft" onClick={() => { setSc(null); setTurns([]); turnsRef.current = []; setReport(null); }}>Nova conversa</Btn>
              : <Btn variant="soft" onClick={() => void finish()} disabled={phase === "analysing" || phase === "transcribing" || phase === "thinking"}>Acaba i corregeix</Btn>}
          </div>
        </div>
      </div>
    </Page>
  );
}

function ReportView({ r }: { r: Report }) {
  const errs = (r.errors ?? []).filter((e) => e?.dit && e?.correcte);
  const nat = (r.mes_natural ?? []).filter((e) => e?.dit && e?.millor);
  return (
    <div className="space-y-3 pt-2">
      <Card className="space-y-1.5 p-4">
        <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Valoració{r.nivell ? ` · ${r.nivell}` : ""}</div>
        <div className="text-[15.5px]">{r.valoracio}</div>
        {(r.punts_forts ?? []).length > 0 && <ul className="list-disc pl-5 text-[14.5px] text-good">{r.punts_forts!.map((p) => <li key={p}>{p}</li>)}</ul>}
      </Card>
      <Card className="divide-y divide-line">
        <div className="px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-muted">{errs.length ? `${errs.length} errors (desats al quadern)` : "Cap error clar. Molt bé!"}</div>
        {errs.map((e, i) => (
          <div key={i} className="space-y-1 px-4 py-3">
            <div className="text-[15px]"><s className="text-bad">{e.dit}</s> → <b className="text-good">{e.correcte}</b> <button className="text-[12px] text-accent" onClick={() => void playText(e.correcte)} aria-label="Escolta la forma correcta">▶</button></div>
            {e.tipus && <div className="inline-block rounded-full bg-bad/10 px-2 py-0.5 text-[11.5px] font-semibold text-bad">{e.tipus}</div>}
            {e.explicacio && <div className="text-[13.5px] text-muted">{e.explicacio}</div>}
          </div>
        ))}
      </Card>
      {nat.length > 0 && (
        <Card className="divide-y divide-line">
          <div className="px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-muted">Més natural, més C1</div>
          {nat.map((e, i) => (
            <div key={i} className="space-y-0.5 px-4 py-3 text-[14.5px]">
              <div className="text-muted">Has dit: {e.dit}</div>
              <div><b>Millor:</b> {e.millor} <button className="text-[12px] text-accent" onClick={() => void playText(e.millor)} aria-label="Escolta">▶</button></div>
              {e.per_que && <div className="text-[13px] text-muted">{e.per_que}</div>}
            </div>
          ))}
        </Card>
      )}
      {(r.vocabulari ?? []).length > 0 && (
        <Card className="space-y-1 p-4 text-[14.5px]">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Vocabulari per a la propera</div>
          {r.vocabulari!.filter((v) => v?.paraula).map((v) => <div key={v.paraula}><b>{v.paraula}</b>{v.es && <span className="text-muted"> · {v.es}</span>}</div>)}
        </Card>
      )}
      {r.consell && <Card className="bg-accent/10 p-4 text-[15px]"><b>Per a la propera:</b> {r.consell}</Card>}
    </div>
  );
}
