/** Client de la funció /api/ia (Gemini o Claude al servidor; la clau no surt mai del servidor). */
export interface Turn { role: "user" | "assistant"; content: string }

export class AiError extends Error {
  constructor(public code: "no_endpoint" | "rate_limited" | "upstream" | "invalid_json", message: string) { super(message); }
}

const ENDPOINT = (import.meta.env.VITE_AI_ENDPOINT as string | undefined) ?? "/api/ia";

export async function askAI(input: string | Turn[], opts: { image?: Blob; json?: boolean; signal?: AbortSignal } = {}): Promise<string> {
  const messages: Turn[] = typeof input === "string" ? [{ role: "user", content: input }] : input;
  const body: Record<string, unknown> = { messages, json: !!opts.json };
  if (opts.image) body.image = { mime: opts.image.type || "image/jpeg", data: await toBase64(opts.image) };
  let res: Response;
  try {
    res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: opts.signal });
  } catch {
    throw new AiError("no_endpoint", "No hi ha connexió amb el servei d'IA.");
  }
  if (res.status === 404) throw new AiError("no_endpoint", "La IA no està configurada en aquest servidor. Mira el README.");
  if (res.status === 429) throw new AiError("rate_limited", "Massa peticions seguides. Espera uns minuts.");
  if (!res.ok) throw new AiError("upstream", "El servei d'IA ha fallat. Torna-ho a provar.");
  const data = (await res.json()) as { text?: string };
  return data.text ?? "";
}

export async function askJSON<T>(input: string | Turn[], opts: { image?: Blob } = {}): Promise<T> {
  const text = await askAI(input, { ...opts, json: true });
  return parseJSON<T>(text);
}

export function parseJSON<T>(text: string): T {
  try { return JSON.parse(text) as T; } catch { /* busca el bloc JSON */ }
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) { try { return JSON.parse(fenced[1]) as T; } catch { /* continua */ } }
  const m = text.match(/[[{][\s\S]*[\]}]/);
  if (m) { try { return JSON.parse(m[0]) as T; } catch { /* continua */ } }
  throw new AiError("invalid_json", "La resposta no ha sortit bé. Torna-ho a provar.");
}

function toBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });
}
