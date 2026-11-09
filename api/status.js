// Parla C1 · quins serveis estan configurats (sense revelar cap clau): GET /api/status
export default function handler(req, res) {
  const e = process.env;
  const ai = e.ANTHROPIC_API_KEY ? "claude" : e.GEMINI_API_KEY ? "gemini" : null;
  const tts = e.AINA_TTS_URL ? "aina" : e.AZURE_SPEECH_KEY && e.AZURE_SPEECH_REGION ? "azure" : e.ELEVENLABS_API_KEY ? "elevenlabs" : null;
  const auth = Boolean((e.SUPABASE_URL || e.VITE_SUPABASE_URL) && (e.SUPABASE_ANON_KEY || e.VITE_SUPABASE_ANON_KEY));
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ ai, tts, stt: Boolean(e.ELEVENLABS_API_KEY), auth, loginRequired: auth && e.AI_PUBLIC !== "1" });
}
