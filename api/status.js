// Parla C1 · quins serveis estan configurats (sense revelar cap clau): GET /api/status
// GET /api/status?probe=1 fa una petició mínima al model i retorna l'error exacte si falla (màx. 1 cada 20 s).
import { askModel } from "./_model.js";

let lastProbe = 0;
export default async function handler(req, res) {
  const e = process.env;
  const ai = e.ANTHROPIC_API_KEY ? "claude" : e.GEMINI_API_KEY ? "gemini" : null;
  const tts = e.AINA_TTS_URL ? "aina" : e.AZURE_SPEECH_KEY && e.AZURE_SPEECH_REGION ? "azure" : e.ELEVENLABS_API_KEY ? "elevenlabs" : null;
  const auth = Boolean((e.SUPABASE_URL || e.VITE_SUPABASE_URL) && (e.SUPABASE_ANON_KEY || e.VITE_SUPABASE_ANON_KEY));
  const out = { ai, tts, stt: Boolean(e.ELEVENLABS_API_KEY), auth, loginRequired: auth && e.AI_PUBLIC !== "1", model: ai === "gemini" ? (e.GEMINI_MODEL || "gemini-2.5-flash") : ai === "claude" ? (e.ANTHROPIC_MODEL || "claude-haiku-5-5") : null };
  if (req.query?.probe && ai) {
    if (Date.now() - lastProbe < 20000) out.probe = { ok: false, error: "Espera uns segons abans de tornar a provar." };
    else {
      lastProbe = Date.now();
      const t0 = Date.now();
      try {
        const text = await askModel({ messages: [{ role: "user", content: "Respon només: D'acord" }] }, e);
        out.probe = { ok: true, ms: Date.now() - t0, text: String(text).slice(0, 80) };
      } catch (err) {
        out.probe = { ok: false, ms: Date.now() - t0, error: String(err.message || err).replace(/AIza[0-9A-Za-z_-]+/g, "[clau]").slice(0, 400) };
      }
    }
  }
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(out);
}
