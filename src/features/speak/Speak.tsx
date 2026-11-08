import { useEffect, useRef, useState } from "react";
import { Page, Section, List, Row, Icon, Card, Btn, Note } from "../../components/ui";
import { ROLEPLAYS } from "../../content";
import { askAI, askJSON, AiError, type Turn } from "../../lib/ai";
import { canSpeak, speak, stopSpeaking, listen, recognizerCtor } from "../../lib/speech";
import { useStore, setState, award } from "../../lib/store";
import type { Roleplay } from "../../lib/types";
import { UNITS } from "../../content/units";
import { toast } from "../../lib/toast";

const rules = (r: Roleplay) => `${r.brief}
Normes: parla sempre en català estàndard (formes balears permeses), nivell C1 però clar. Respostes curtes: 2-4 frases, i acaba amb una pregunta o una proposta. No corregeixis l'alumne durant la conversa ni facis de professor. Sense llistes ni format. Comença tu amb la primera intervenció.`;

interface Evaluation { nota: number; punts_forts: string[]; errors: { original: string; correccio: string }[]; expressions: string[]; consell: string }

export function UnitSpeak({ unitId }: { unitId: string }) {
  const u = UNITS.find((x) => x.id === unitId);
  if (!u?.content) return <Speak />;
  const role: Roleplay = { id: `unit-${u.id}`, title: `Conversa · Unitat ${u.n}`, subtitle: u.oralTask, brief: u.content.oral.bot };
  return <Chat role={role} onExit={() => { stopSpeaking(); history.back(); }} />;
}

export default function Speak() {
  const [role, setRole] = useState<Roleplay | null>(null);
  if (!role) {
    return (
      <Page title="Parla" subtitle="Practica l'Àrea 4 amb un interlocutor virtual i rep una avaluació al final.">
        <List>{ROLEPLAYS.map((r, i) => <Row key={r.id} left={<Icon>{i + 1}</Icon>} title={r.title} detail={r.subtitle} onClick={() => setRole(r)} />)}</List>
        <Section title="Sense IA">
          <List><Row left={<Icon tone="good">▶</Icon>} title="Lectura i exposició amb rellotge" detail="Àrea 4 · exercicis 1 i 3" to="oral" /></List>
        </Section>
      </Page>
    );
  }
  return <Chat role={role} onExit={() => { stopSpeaking(); setRole(null); }} />;
}

function Chat({ role, onExit }: { role: Roleplay; onExit: () => void }) {
  const tts = useStore((s) => s.settings.tts);
  const [turns, setTurns] = useState<Turn[]>([{ role: "user", content: rules(role) }]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [stop, setStop] = useState<(() => void) | null>(null);
  const [ev, setEv] = useState<Evaluation | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const canListen = !!recognizerCtor();

  const reply = async (next: Turn[]) => {
    setBusy(true);
    try {
      const t = await askAI(next);
      setTurns([...next, { role: "assistant", content: t }]);
      if (tts && canSpeak()) speak(t);
    } catch (e) {
      toast(e instanceof AiError ? e.message : "No s'ha pogut continuar la conversa.");
      if (next.length <= 1) onExit();
    } finally { setBusy(false); }
  };

  useEffect(() => { if (!started.current) { started.current = true; void reply(turns); } }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [turns, busy, ev]);

  const send = () => {
    const v = msg.trim();
    if (!v || busy) return;
    stop?.(); setStop(null); setMsg("");
    void reply([...turns, { role: "user", content: v }]);
  };
  const mic = () => {
    if (stop) { stop(); setStop(null); return; }
    const base = msg;
    const s = listen((t) => setMsg((base ? base + " " : "") + t), () => setStop(null));
    if (s) setStop(() => s); else toast("El micròfon no està disponible. Fes servir el dictat del teclat.");
  };
  const userTurns = turns.slice(1).filter((t) => t.role === "user").length;
  const evaluate = async () => {
    setBusy(true);
    const tr = turns.slice(1).map((t) => (t.role === "user" ? "ALUMNE: " : "INTERLOCUTOR: ") + t.content).join("\n");
    try {
      const r = await askJSON<Evaluation>(`Ets examinador/a de l'expressió oral C1 del GOIB (exercici d'interacció, 30 punts). Avalua NOMÉS les intervencions de l'ALUMNE en aquesta conversa (${role.title}).
Respon NOMÉS amb JSON: {"nota":0-30,"punts_forts":["2 punts, en castellà"],"errors":[{"original":"...","correccio":"forma correcta en català"}],"expressions":["3 expressions C1 en català que podria haver fet servir"],"consell":"1 consell en castellà"}
Conversa:\n${tr}`);
      const nota = Math.max(0, Math.min(30, Number(r.nota) || 0));
      setEv({ ...r, nota });
      setState((s) => ({ ...s, speaking: [...s.speaking, { at: Date.now(), scenario: role.id, score: Math.round((nota / 30) * 100) }].slice(-100) }));
      award("oral", "conversa");
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut avaluar."); }
    finally { setBusy(false); }
  };

  return (
    <Page title={role.title} subtitle={role.subtitle} back={{ to: "parla", label: "Situacions", onClick: onExit }}>
      <div className="flex flex-col gap-2">
        {turns.slice(1).map((t, i) => (
          <div key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-[18px] px-3.5 py-2.5 leading-snug ${t.role === "user" ? "self-end bg-accent text-white" : "self-start bg-card"}`}>{t.content}</div>
        ))}
        {busy && <div className="self-start rounded-[18px] bg-card px-3.5 py-2.5 text-muted">…</div>}
      </div>
      {ev ? (
        <Section title="Avaluació">
          <Card className="space-y-3 p-4 text-[15px]">
            <div className="text-[40px] font-bold leading-none tabular">{ev.nota}<span className="text-[18px] text-muted"> / 30</span></div>
            {ev.punts_forts?.map((x) => <div key={x}>✓ {x}</div>)}
            {ev.errors?.length > 0 && <div className="space-y-1">{ev.errors.map((e, i) => <div key={i}><s className="text-bad">{e.original}</s> → <b className="text-good">{e.correccio}</b></div>)}</div>}
            {ev.expressions?.length > 0 && <div><div className="text-[13px] text-muted">Expressions per a la propera vegada</div>{ev.expressions.join(" · ")}</div>}
            {ev.consell && <div className="rounded-xl bg-accent/10 p-3">{ev.consell}</div>}
          </Card>
          <Note>Avaluació orientativa feta per IA.</Note>
        </Section>
      ) : (
        <Card className="mt-4 space-y-3 p-4">
          <textarea aria-label="La teva resposta" rows={2} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Escriu o dicta la teva resposta…"
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            className="w-full resize-none rounded-xl bg-bg px-3 py-2.5" />
          <div className="flex flex-wrap gap-2">
            {canListen && <Btn variant={stop ? "bad" : "soft"} onClick={mic}>{stop ? "Atura el micròfon" : "Parla"}</Btn>}
            <Btn onClick={send} disabled={busy || !msg.trim()}>Envia</Btn>
            <Btn variant="soft" onClick={() => setState((s) => ({ ...s, settings: { ...s.settings, tts: !s.settings.tts } }))}>{tts ? "Veu: sí" : "Veu: no"}</Btn>
            <Btn variant="soft" onClick={evaluate} disabled={busy || userTurns < 3}>Acaba i avalua'm</Btn>
          </div>
          {!canListen && <div className="text-[13px] text-muted">Per dictar, fes servir el micròfon del teclat del mòbil.</div>}
          {userTurns < 3 && <div className="text-[13px] text-muted">L'avaluació s'activa després de 3 intervencions teves.</div>}
        </Card>
      )}
      <div ref={endRef} />
    </Page>
  );
}
