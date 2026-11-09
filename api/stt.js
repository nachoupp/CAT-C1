// Parla C1 · veu a text en català (POST /api/stt, cos = àudio gravat)
// Variable d'entorn: ELEVENLABS_API_KEY (model Scribe v2; opcional ELEVENLABS_STT_MODEL)
import { requireUser } from "./_auth.js";

const MAX = 4 * 1024 * 1024; // límit del cos de Vercel ≈ 4,5 MB; 4 min d'Opus en són ~1 MB

async function readBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > MAX) throw Object.assign(new Error("massa llarg"), { status: 413 });
    chunks.push(c);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  if (!(await requireUser(req, process.env)).ok) return res.status(401).json({ error: "login" });
  const env = process.env;
  if (!env.ELEVENLABS_API_KEY) return res.status(404).json({ error: "Falta ELEVENLABS_API_KEY" });
  try {
    const audio = await readBody(req);
    if (audio.length < 2000) return res.status(400).json({ error: "àudio buit" });
    if (audio.length > MAX) return res.status(413).json({ error: "massa llarg" });
    const type = String(req.headers["content-type"] || "audio/webm").split(";")[0];
    const ext = type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : type.includes("wav") ? "wav" : "webm";
    const form = new FormData();
    form.append("file", new Blob([audio], { type }), `oral.${ext}`);
    form.append("model_id", env.ELEVENLABS_STT_MODEL || "scribe_v2");
    form.append("language_code", "ca");
    form.append("tag_audio_events", "true");
    form.append("timestamps_granularity", "word");
    const r = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
      method: "POST",
      headers: { "xi-api-key": env.ELEVENLABS_API_KEY },
      body: form
    });
    if (!r.ok) return res.status(502).json({ error: "elevenlabs " + r.status, detail: (await r.text()).slice(0, 300) });
    const data = await r.json();
    const words = (data.words || [])
      .filter((w) => w.type === "word" || w.type === "audio_event")
      .map((w) => ({ text: w.text, start: w.start, end: w.end, event: w.type === "audio_event" }));
    return res.status(200).json({ text: data.text || "", words, duration: data.audio_duration_secs ?? (words.length ? words[words.length - 1].end : 0) });
  } catch (e) {
    return res.status(e.status || 502).json({ error: String(e.message || e) });
  }
}
