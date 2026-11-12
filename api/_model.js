// Lògica compartida: envia la conversa al model triat i retorna el text.
// body = { messages: [{role:"user"|"assistant", content}], json?: bool, image?: {mime, data(base64)} }
export async function askModel(body, env) {
  const msgs = (body?.messages || []).filter(m => m && m.content).slice(-30);
  if (!msgs.length) throw Object.assign(new Error("messages buits"), { status: 400 });
  const total = msgs.reduce((n, m) => n + String(m.content).length, 0);
  if (total > 60000) throw Object.assign(new Error("massa text"), { status: 413 });
  const img = body.image && body.image.data ? body.image : null;
  if (img && img.data.length > 8_000_000) throw Object.assign(new Error("imatge massa gran"), { status: 413 });

  if (env.ANTHROPIC_API_KEY) {
    const merged = [];
    for (const m of msgs) {
      const role = m.role === "assistant" ? "assistant" : "user";
      if (merged.length && merged[merged.length - 1].role === role) merged[merged.length - 1].text += "\n\n" + m.content;
      else merged.push({ role, text: String(m.content) });
    }
    const messages = merged.map((m, i) => {
      const last = i === merged.length - 1;
      const content = [{ type: "text", text: m.text }];
      if (last && img) content.unshift({ type: "image", source: { type: "base64", media_type: img.mime || "image/jpeg", data: img.data } });
      return { role: m.role, content };
    });
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: env.ANTHROPIC_MODEL || "claude-haiku-5-5", max_tokens: 2500, messages })
    });
    const d = await r.json();
    if (!r.ok) throw Object.assign(new Error(d?.error?.message || "anthropic"), { status: 502 });
    return (d.content || []).filter(c => c.type === "text").map(c => c.text).join("");
  }

  if (env.GEMINI_API_KEY) {
    const contents = msgs.map((m, i) => {
      const parts = [{ text: String(m.content) }];
      if (i === msgs.length - 1 && img) parts.push({ inline_data: { mime_type: img.mime || "image/jpeg", data: img.data } });
      return { role: m.role === "assistant" ? "model" : "user", parts };
    });
    // Gemini va saturat o amb quota esgotada a estones: es proven diversos models (cadascun té la seva quota) i, si cal, dues voltes.
    const models = [...new Set([env.GEMINI_MODEL, "gemini-2.5-flash", "gemini-flash-lite-latest", "gemini-2.5-flash-lite", "gemini-flash-latest"].filter(Boolean))];
    const t0 = Date.now();
    const errs = [];
    for (let round = 0; round < 2; round++) {
      for (const model of models) {
        if (Date.now() - t0 > 48000) break;
        for (const fast of [true, false]) {
          const generationConfig = { ...(body.json ? { responseMimeType: "application/json" } : {}), ...(fast ? { thinkingConfig: { thinkingBudget: 0 } } : {}) };
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), 14000);
          let r, d;
          try {
            r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
              method: "POST", signal: ctrl.signal,
              headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
              body: JSON.stringify({ contents, generationConfig })
            });
            d = await r.json().catch(() => ({}));
          } catch (err) {
            errs.push(`${model}: ${err?.name === "AbortError" ? "no respon" : err?.message || "xarxa"}`);
            break;
          } finally { clearTimeout(timer); }
          if (r.ok) {
            const out = (d.candidates?.[0]?.content?.parts || []).filter(p => !p.thought).map(p => p.text || "").join("");
            if (out) return out;
            errs.push(`${model}: resposta buida`);
            break;
          }
          errs.push(`${model}: ${r.status} ${(d?.error?.message || "").slice(0, 70)}`);
          if (!(fast && r.status === 400)) break; // 400 amb thinking → es reintenta sense
        }
      }
      if (round === 0) await new Promise((res) => setTimeout(res, 1500));
    }
    const quota = errs.some((e) => / 429 /.test(e));
    throw Object.assign(new Error(`${quota ? "Quota de Gemini esgotada o " : ""}Gemini saturat. ${errs.slice(-3).join(" | ")}`), { status: 502 });
  }

  throw Object.assign(new Error("Falta GEMINI_API_KEY o ANTHROPIC_API_KEY"), { status: 404 });
}
