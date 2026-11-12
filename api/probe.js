// Parla C1 · diagnòstic: GET /api/probe fa una petició mínima al model i retorna l'error exacte (màx. 1 cada 20 s).
import { askModel } from "./_model.js";

let last = 0;
export default async function handler(req, res) {
  const e = process.env;
  res.setHeader("Cache-Control", "no-store");
  if (!e.ANTHROPIC_API_KEY && !e.GEMINI_API_KEY) return res.status(200).json({ ok: false, error: "Sense clau d'IA" });
  if (Date.now() - last < 20000) return res.status(200).json({ ok: false, error: "Espera uns segons abans de tornar a provar." });
  last = Date.now();
  const t0 = Date.now();
  try {
    const text = await askModel({ messages: [{ role: "user", content: "Respon només: D'acord" }] }, e);
    res.status(200).json({ ok: true, ms: Date.now() - t0, model: e.GEMINI_MODEL || "gemini-flash-latest", text: String(text).slice(0, 80) });
  } catch (err) {
    res.status(200).json({ ok: false, ms: Date.now() - t0, model: e.GEMINI_MODEL || "gemini-flash-latest", error: String(err.message || err).replace(/AIza[0-9A-Za-z_-]+/g, "[clau]").slice(0, 500) });
  }
}
