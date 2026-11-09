import { useState } from "react";
import { Card, Btn } from "../../components/ui";
import { useStatus } from "../../lib/status";
import { askAI, AiError } from "../../lib/ai";
import { playText } from "../../lib/audio";

const AI_NAME = { gemini: "Gemini (Google)", claude: "Claude (Anthropic)" } as const;
const TTS_NAME = { aina: "Projecte Aina", azure: "Azure", elevenlabs: "ElevenLabs" } as const;

function Line({ ok, title, detail }: { ok: boolean; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${ok ? "bg-good" : "bg-line"}`} aria-hidden />
      <div><div className="text-[15px] font-semibold">{title}</div><div className="text-[13px] text-muted">{detail}</div></div>
    </div>
  );
}

/** Què hi ha configurat al servidor i un botó per provar el profe IA. */
export function ServicesCard() {
  const s = useStatus();
  const [test, setTest] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function probe() {
    setBusy(true); setTest(null);
    try {
      const r = await askAI("Respon en una sola frase curta i en català: saluda una alumna que prepara el C1 i anima-la.");
      setTest(`✓ ${r.trim().slice(0, 200)}`);
    } catch (e) {
      setTest(`✗ ${e instanceof AiError ? e.message : "No respon."}`);
    } finally { setBusy(false); }
  }

  if (s === undefined) return <Card className="p-4 text-[14px] text-muted">Comprovant els serveis…</Card>;
  if (s === null) return <Card className="p-4 text-[14px] text-muted">No s'ha pogut contactar amb el servidor (en local o sense connexió). Les funcions sense IA funcionen igualment.</Card>;
  return (
    <Card className="space-y-2 p-4">
      <div className="divide-y divide-line">
        <Line ok={!!s.ai} title="Profe IA" detail={s.ai ? `Actiu amb ${AI_NAME[s.ai]}: correccions, preguntes noves, conversa i escàner.` : "Falta GEMINI_API_KEY o ANTHROPIC_API_KEY a Vercel."} />
        <Line ok={!!s.tts} title="Veu natural" detail={s.tts ? `Activa amb ${TTS_NAME[s.tts]}.` : "Sense configurar: sona la veu del dispositiu."} />
        <Line ok={s.stt} title="L'app t'escolta (oral)" detail={s.stt ? "Transcripció activa per a «Grava't i et corregeixo»." : "Falta ELEVENLABS_API_KEY a Vercel."} />
        <Line ok={s.auth} title="Comptes i sincronització" detail={s.auth ? (s.loginRequired ? "Actiu. La IA i la veu demanen iniciar sessió." : "Actiu.") : "Sense Supabase: el progrés es desa només en aquest dispositiu."} />
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1">
        <Btn variant="soft" disabled={!s.ai || busy} onClick={() => void probe()}>{busy ? "Provant…" : "Prova el profe IA"}</Btn>
        <Btn variant="soft" onClick={() => void playText("Bon dia! Aquesta és la veu de l'aplicació.")}>Prova la veu</Btn>
      </div>
      {test && <div className={`rounded-xl p-3 text-[14px] ${test.startsWith("✓") ? "bg-good/10" : "bg-bad/10 text-bad"}`}>{test}</div>}
    </Card>
  );
}
