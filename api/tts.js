// Parla C1 · veu neuronal en català (/api/tts?t=text&v=veu&r=velocitat)
// Variables d'entorn (posa'n un dels dos proveïdors):
//   AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (p. ex. westeurope)  → veus ca-ES-JoanaNeural, ca-ES-EnricNeural, ca-ES-AlbaNeural
//   ELEVENLABS_API_KEY (+ opcional ELEVENLABS_VOICE_ID)           → model eleven_v3 (admet català)
import { requireUser } from "./_auth.js";

const VOICES = { joana: "ca-ES-JoanaNeural", enric: "ca-ES-EnricNeural", alba: "ca-ES-AlbaNeural" };
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  if (!(await requireUser(req, process.env)).ok) return res.status(401).json({ error: "login" });
  const text = String(req.query.t || "").slice(0, 2500).trim();
  if (!text) return res.status(400).json({ error: "text buit" });
  const voice = VOICES[String(req.query.v || "joana")] || VOICES.joana;
  const rate = Math.max(0.6, Math.min(1.4, Number(req.query.r) || 1));
  const env = process.env;
  try {
    let audio;
    if (env.AZURE_SPEECH_KEY && env.AZURE_SPEECH_REGION) {
      const ssml = `<speak version="1.0" xml:lang="ca-ES"><voice name="${voice}"><prosody rate="${Math.round((rate - 1) * 100)}%">${esc(text)}</prosody></voice></speak>`;
      const r = await fetch(`https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: "POST",
        headers: { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "parla-c1" },
        body: ssml
      });
      if (!r.ok) throw new Error("azure " + r.status);
      audio = Buffer.from(await r.arrayBuffer());
    } else if (env.ELEVENLABS_API_KEY) {
      const id = env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_64`, {
        method: "POST",
        headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ text, model_id: "eleven_v3", language_code: "ca" })
      });
      if (!r.ok) throw new Error("elevenlabs " + r.status);
      audio = Buffer.from(await r.arrayBuffer());
    } else {
      return res.status(404).json({ error: "Falta AZURE_SPEECH_KEY o ELEVENLABS_API_KEY" });
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "private, max-age=31536000, immutable");
    return res.status(200).send(audio);
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
}
