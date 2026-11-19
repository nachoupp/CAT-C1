import { useEffect, useState } from "react";
import { useRecorder } from "../lib/recorder";
import { transcribe, SttError } from "../lib/stt";
import { diffWords, type Tok } from "../lib/dictation";
import { askAI, AiError } from "../lib/ai";
import { playText } from "../lib/audio";

const words = (t: Tok[]) => t.filter((x) => x.status !== "extra");
/** Percentatge de paraules del text objectiu que s'han reconegut tal com estan escrites. */
export function readScore(toks: Tok[]): number {
  const w = words(toks);
  return w.length ? Math.round((w.filter((x) => x.status === "ok").length / w.length) * 100) : 0;
}

const tipPrompt = (target: string, said: string, bad: string[]) => `Ets una logopeda i professora de fonètica catalana (varietat balear i estàndard). Una alumna hispanoparlant ha llegit en veu alta: «${target}». El reconeixedor de veu ha entès: «${said}». Paraules que no han sortit bé: ${bad.join(", ")}.
Dona 2-4 consells de pronunciació breus i concrets en castellà, només sobre aquestes paraules (p. ex. e/a neutres, o/u, l·l, ny, ll, ix, tx, v/b, r final muda, consonants finals, apòstrofs i enllaços). Indica com sonen amb una aproximació senzilla. Sense introduccions ni salutacions. Format: una línia per consell, començant amb «• ».`;

/** Llegeix en veu alta: grava, transcriu i compara amb el text per veure què s'ha dit bé. */
export function ReadAloud({ text, compact }: { text: string; compact?: boolean }) {
  const rec = useRecorder(60, 1600);
  const [phase, setPhase] = useState<"idle" | "busy" | "done">("idle");
  const [res, setRes] = useState<{ toks: Tok[]; said: string } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [tip, setTip] = useState<string | null>(null);
  const [tipBusy, setTipBusy] = useState(false);

  useEffect(() => { setPhase("idle"); setRes(null); setErr(null); setTip(null); rec.reset(); }, [text]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (rec.state !== "done" || !rec.blob || phase !== "idle") return;
    setPhase("busy"); setErr(null);
    let alive = true;
    transcribe(rec.blob)
      .then((t) => { if (!alive) return; setRes({ toks: diffWords(text, t.text), said: t.text }); setPhase("done"); })
      .catch((e) => { if (!alive) return; setErr(e instanceof SttError ? e.message : "No s'ha pogut transcriure."); setPhase("idle"); rec.reset(); });
    return () => { alive = false; };
  }, [rec.state, rec.blob]); // eslint-disable-line react-hooks/exhaustive-deps

  const retry = () => { rec.reset(); setRes(null); setTip(null); setErr(null); setPhase("idle"); };
  const bad = res ? res.toks.filter((t) => t.status === "wrong" || t.status === "missing").map((t) => t.word) : [];

  async function getTip() {
    if (!res) return;
    setTipBusy(true);
    try { setTip(await askAI(tipPrompt(text, res.said || "(res)", bad.slice(0, 8)), { timeoutMs: 30000 })); }
    catch (e) { setTip(e instanceof AiError ? e.message : "No s'ha pogut consultar la IA."); }
    finally { setTipBusy(false); }
  }

  if (rec.state === "unsupported") return null;
  const score = res ? readScore(res.toks) : 0;
  return (
    <div data-nogloss className={compact ? "space-y-2" : "space-y-2 rounded-2xl bg-bg p-3"}>
      <div className="flex flex-wrap items-center gap-2">
        {rec.state === "recording" ? (
          <button onClick={rec.stop} className="rounded-full bg-bad px-3.5 py-2 text-[13.5px] font-semibold text-white">■ Atura · {rec.seconds}s</button>
        ) : (
          <button onClick={phase === "done" ? retry : () => void rec.start()} disabled={phase === "busy" || rec.state === "asking"}
            className="rounded-full bg-accent/10 px-3.5 py-2 text-[13.5px] font-semibold text-accent disabled:opacity-50">
            {phase === "busy" ? "Escoltant-te…" : phase === "done" ? "↺ Torna-ho a provar" : "🎤 Llegeix-ho en veu alta"}
          </button>
        )}
        {phase === "done" && <button onClick={() => void playText(text)} className="rounded-full bg-bg px-3.5 py-2 text-[13.5px] font-semibold">▶ Escolta el model</button>}
      </div>
      {rec.state === "denied" && <p className="text-[13px] text-bad">No tinc permís per al micròfon. Activa'l als ajustos del navegador.</p>}
      {err && <p className="text-[13px] text-bad">{err}</p>}
      {res && (
        <div className="space-y-2 text-[15px] leading-relaxed">
          <div className="text-[13px] text-muted"><b className={score >= 85 ? "text-good" : score >= 60 ? "text-warn" : "text-bad"}>{score}%</b> de les paraules, ben dites. Verd = ben dita · groc = no s'ha entès.</div>
          <p>
            {res.toks.map((t, i) => (
              <span key={i}>
                {t.status === "ok" && <span className="text-good">{t.word}</span>}
                {(t.status === "wrong" || t.status === "missing") && <b className="rounded bg-warn/20 px-1 text-warn">{t.word}</b>}
                {t.status === "wrong" && t.given && <i className="text-[12px] text-muted"> (s'ha entès «{t.given}»)</i>}
                {" "}
              </span>
            ))}
          </p>
          {bad.length > 0 && !tip && <button disabled={tipBusy} onClick={() => void getTip()} className="rounded-full bg-accent px-3.5 py-2 text-[13.5px] font-semibold text-white disabled:opacity-60">{tipBusy ? "Pensant…" : "Com ho pronuncio millor?"}</button>}
          {tip && <p className="whitespace-pre-wrap rounded-xl bg-card p-3 text-[14px]">{tip}</p>}
          {bad.length === 0 && <p className="text-good">Perfecte! Tot s'ha entès bé.</p>}
          <p className="text-[12px] text-muted">El reconeixedor és una IA: si falla en una paraula, a vegades és un error seu i no teu. Repeteix-ho per assegurar-te'n.</p>
        </div>
      )}
    </div>
  );
}

/** Text llarg llegit frase per frase. */
export function ReadSentences({ text }: { text: string }) {
  const parts = text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter((s) => s.split(" ").length >= 2) ?? [];
  const [i, setI] = useState(0);
  if (!parts.length) return null;
  return (
    <div data-nogloss className="space-y-2 rounded-2xl bg-bg p-3">
      <div className="flex items-center justify-between text-[13px] text-muted">
        <b>Practica la lectura · frase {i + 1} de {parts.length}</b>
        <span className="flex gap-1">
          <button disabled={i === 0} onClick={() => setI(i - 1)} className="rounded-full bg-card px-2.5 py-1 disabled:opacity-30" aria-label="Frase anterior">←</button>
          <button disabled={i === parts.length - 1} onClick={() => setI(i + 1)} className="rounded-full bg-card px-2.5 py-1 disabled:opacity-30" aria-label="Frase següent">→</button>
        </span>
      </div>
      <p className="text-[16px] font-medium leading-relaxed">{parts[i]}</p>
      <ReadAloud compact text={parts[i]} />
    </div>
  );
}
