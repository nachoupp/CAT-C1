// Parla C1 · veu neuronal en català (/api/tts?t=text&v=veu&r=velocitat)
// Variables d'entorn (posa'n un; si n'hi ha diversos, Aina té prioritat i els altres fan de reserva):
//   AINA_TTS_URL (+ opcional AINA_TTS_TOKEN)                      → servidor propi projecteaina/tts-api (Matxa, gratuït, accent balear)
//   AZURE_SPEECH_KEY + AZURE_SPEECH_REGION (p. ex. westeurope)  → veus ca-ES-JoanaNeural, ca-ES-EnricNeural, ca-ES-AlbaNeural
//   ELEVENLABS_API_KEY (+ opcional ELEVENLABS_VOICE_ID)           → model eleven_v3 (admet català)
import { requireUser } from "./_auth.js";

const VOICES = { joana: "ca-ES-JoanaNeural", enric: "ca-ES-EnricNeural", alba: "ca-ES-AlbaNeural" };
// Aina / Matxa: veu → codi d'accent
const AINA = { quim: "ca-ba", olga: "ca-ba", grau: "ca-es", elia: "ca-es", pere: "ca-nw", emma: "ca-nw", lluc: "ca-va", gina: "ca-va" };
const LISTS = {
  aina: [["olga", "Olga · balear"], ["quim", "Quim · balear"], ["elia", "Èlia · central"], ["grau", "Grau · central"]],
  azure: [["joana", "Joana"], ["enric", "Enric"], ["alba", "Alba"]],
  elevenlabs: [["eleven", "ElevenLabs"]]
};

function providers(env) {
  const p = [];
  if (env.AINA_TTS_URL) p.push("aina");
  if (env.AZURE_SPEECH_KEY && env.AZURE_SPEECH_REGION) p.push("azure");
  if (env.ELEVENLABS_API_KEY) p.push("elevenlabs");
  return p;
}

async function aina(env, text, v) {
  const voice = AINA[v] ? v : "olga";
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 45000); // un Space adormit pot trigar a despertar
  try {
    const r = await fetch(env.AINA_TTS_URL.replace(/\/$/, "") + "/api/tts", {
      method: "POST",
      signal: ctrl.signal,
      headers: { "Content-Type": "application/json", ...(env.AINA_TTS_TOKEN ? { Authorization: `Bearer ${env.AINA_TTS_TOKEN}` } : {}) },
      body: JSON.stringify({ voice, type: "text", text, language: AINA[voice] })
    });
    if (!r.ok) throw new Error("aina " + r.status);
    return { audio: Buffer.from(await r.arrayBuffer()), type: "audio/wav" };
  } finally { clearTimeout(timer); }
}
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  if (!(await requireUser(req, process.env)).ok) return res.status(401).json({ error: "login" });
  const env = process.env;
  const list = providers(env);
  if (req.query.list) {
    const voices = list.length ? LISTS[list[0]].map(([id, label]) => ({ id, label })) : [];
    return res.status(200).json({ provider: list[0] || null, voices });
  }
  const text = String(req.query.t || "").slice(0, 2500).trim();
  if (!text) return res.status(400).json({ error: "text buit" });
  const rate = Math.max(0.6, Math.min(1.4, Number(req.query.r) || 1));
  if (!list.length) return res.status(404).json({ error: "Falta AINA_TTS_URL, AZURE_SPEECH_KEY o ELEVENLABS_API_KEY" });
  const v = String(req.query.v || "");
  const errors = [];
  for (const p of list) {
    try {
      let out;
      if (p === "aina") out = await aina(env, text, v);
      else if (p === "azure") out = await azure(env, text, VOICES[v] || VOICES.joana, rate);
      else out = await eleven(env, text);
      res.setHeader("Content-Type", out.type);
      res.setHeader("X-Voice-Provider", p);
      res.setHeader("Cache-Control", "private, max-age=31536000, immutable");
      return res.status(200).send(out.audio);
    } catch (e) { errors.push(String(e.message || e)); }
  }
  return res.status(502).json({ error: errors.join("; ") });
}

async function azure(env, text, voice, rate) {
  const ssml = `<speak version="1.0" xml:lang="ca-ES"><voice name="${voice}"><prosody rate="${Math.round((rate - 1) * 100)}%">${esc(text)}</prosody></voice></speak>`;
  const r = await fetch(`https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: { "Ocp-Apim-Subscription-Key": env.AZURE_SPEECH_KEY, "Content-Type": "application/ssml+xml", "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3", "User-Agent": "parla-c1" },
    body: ssml
  });
  if (!r.ok) throw new Error("azure " + r.status);
  return { audio: Buffer.from(await r.arrayBuffer()), type: "audio/mpeg" };
}

// Models que admeten català: eleven_v4 i eleven_v3 (els multilingual/flash no).
async function eleven(env, text) {
  const id = env.ELEVENLABS_VOICE_ID || "JBFqnCBsd6RMkjVDRZzb";
  const models = env.ELEVENLABS_MODEL ? [env.ELEVENLABS_MODEL] : ["eleven_v4", "eleven_v3"];
  let last = 0;
  for (const model_id of models) {
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_64`, {
      method: "POST",
      headers: { "xi-api-key": env.ELEVENLABS_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id, language_code: "ca" })
    });
    if (r.ok) return { audio: Buffer.from(await r.arrayBuffer()), type: "audio/mpeg" };
    last = r.status;
    if (r.status === 401 || r.status === 429) break; // clau o quota: no té sentit provar un altre model
  }
  throw new Error("elevenlabs " + last);
}
