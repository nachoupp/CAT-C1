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
    // Si el model configurat ja no existeix (Google en retira de vells), es prova l'àlies estable.
    const models = [env.GEMINI_MODEL || "gemini-2.5-flash", "gemini-flash-latest"];
    let lastErr = "gemini";
    for (const model of models) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
        body: JSON.stringify({ contents, generationConfig: body.json ? { responseMimeType: "application/json" } : {} })
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok) return (d.candidates?.[0]?.content?.parts || []).map(p => p.text || "").join("");
      lastErr = d?.error?.message || `gemini ${r.status}`;
      if (r.status !== 404) break;
    }
    throw Object.assign(new Error(lastErr), { status: 502 });
  }

  throw Object.assign(new Error("Falta GEMINI_API_KEY o ANTHROPIC_API_KEY"), { status: 404 });
}
