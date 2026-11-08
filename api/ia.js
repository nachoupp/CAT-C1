// Parla C1 · funció serverless de Vercel (/api/ia)
// Variables d'entorn (Vercel → Settings → Environment Variables), posa'n UNA:
//   GEMINI_API_KEY    (Google AI Studio)  · opcional GEMINI_MODEL   (per defecte gemini-2.5-flash)
//   ANTHROPIC_API_KEY (Claude API)        · opcional ANTHROPIC_MODEL (per defecte claude-haiku-5-5)
// Opcional: ALLOWED_ORIGIN = https://el-teu-domini.vercel.app (bloqueja altres webs)
import { askModel } from "./_model.js";

const hits = new Map(); // límit simple: 30 peticions / 10 min per IP (per instància)
export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN;
  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  if (origin && req.headers.origin && req.headers.origin !== origin) return res.status(403).json({ error: "origin" });
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0] || "x";
  const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (h.length >= 30) return res.status(429).json({ error: "rate_limited" });
  h.push(now); hits.set(ip, h);
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const text = await askModel(body, process.env);
    res.status(200).json({ text });
  } catch (e) {
    res.status(e.status || 500).json({ error: String(e.message || e) });
  }
}
