// Parla C1 · diagnòstic: GET /api/probe prova els models de Gemini un per un i retorna el resultat de cada intent.
let last = 0;
export default async function handler(req, res) {
  const e = process.env;
  res.setHeader("Cache-Control", "no-store");
  if (!e.GEMINI_API_KEY) return res.status(200).json({ ok: false, error: "Sense GEMINI_API_KEY" });
  if (Date.now() - last < 15000) return res.status(200).json({ ok: false, error: "Espera uns segons abans de tornar a provar." });
  last = Date.now();
  const trace = [];
  for (const model of [e.GEMINI_MODEL || "gemini-flash-latest", "gemini-3.8-flash"]) {
    for (const cfg of [{ thinkingConfig: { thinkingBudget: 0 } }, { thinkingConfig: { thinkingLevel: "low" } }, {}]) {
      const t0 = Date.now();
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 8000);
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
          method: "POST", signal: ctrl.signal,
          headers: { "x-goog-api-key": e.GEMINI_API_KEY, "content-type": "application/json" },
          body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Respon només: D'acord" }] }], generationConfig: cfg })
        });
        const d = await r.json().catch(() => ({}));
        const text = (d.candidates?.[0]?.content?.parts || []).filter((p) => !p.thought).map((p) => p.text || "").join("");
        trace.push({ model, cfg: Object.keys(cfg.thinkingConfig || {}).join() || "cap", status: r.status, ms: Date.now() - t0, text: text.slice(0, 40), error: (d?.error?.message || "").slice(0, 160) });
        if (r.ok) return res.status(200).json({ ok: true, trace });
      } catch (err) {
        trace.push({ model, cfg: Object.keys(cfg.thinkingConfig || {}).join() || "cap", ms: Date.now() - t0, error: String(err.name === "AbortError" ? "timeout 8 s" : err.message).slice(0, 160) });
      } finally { clearTimeout(timer); }
      if (Date.now() - last > 40000) break;
    }
  }
  res.status(200).json({ ok: false, trace });
}
