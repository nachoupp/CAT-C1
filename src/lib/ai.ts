import { compressImage } from "./image";
import { accessToken } from "./supabase";
import { fetchStatus } from "./status";

/** Client de la funció /api/ia (Gemini o Claude al servidor; la clau no surt mai del servidor). */
export interface Turn { role: "user" | "assistant"; content: string }

export class AiError extends Error {
  constructor(public code: "no_endpoint" | "rate_limited" | "upstream" | "invalid_json", message: string) { super(message); }
}

const ENDPOINT = (import.meta.env.VITE_AI_ENDPOINT as string | undefined) ?? "/api/ia";

export async function askAI(input: string | Turn[], opts: { image?: Blob; json?: boolean; signal?: AbortSignal; timeoutMs?: number } = {}): Promise<string> {
  const messages: Turn[] = typeof input === "string" ? [{ role: "user", content: input }] : input;
  if (ENDPOINT === "/api/ia") {
    // Abans d'esperar, comprova que hi ha servidor i clau (al visor de Claude no n'hi ha).
    const st = await fetchStatus();
    if (st === null) throw new AiError("no_endpoint", "Aquí no hi ha servidor d'IA (per exemple, al visor de Claude o sense connexió). Obre l'app des de la teva adreça de Vercel.");
    if (!st.ai) throw new AiError("no_endpoint", "El profe IA no està configurat: falta GEMINI_API_KEY (o ANTHROPIC_API_KEY) a Vercel. Ho pots comprovar a Perfil → Serveis.");
  }
  const body: Record<string, unknown> = { messages, json: !!opts.json };
  if (opts.image) { const img = await compressImage(opts.image); body.image = { mime: img.type || "image/jpeg", data: await toBase64(img) }; }
  let res: Response;
  try {
    const token = await accessToken();
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? 60000);
    opts.signal?.addEventListener("abort", () => ctrl.abort());
    try {
      res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body), signal: ctrl.signal });
    } finally { clearTimeout(timer); }
  } catch (e) {
    if (opts.signal?.aborted) throw new AiError("upstream", "Cancel·lat.");
    if ((e as Error)?.name === "AbortError") throw new AiError("upstream", "La IA ha trigat massa a respondre. Torna-ho a provar d'aquí a un moment.");
    throw new AiError("no_endpoint", "No hi ha connexió amb el servei d'IA.");
  }
  if (res.status === 504) throw new AiError("upstream", "La IA ha trigat massa a respondre. Torna-ho a provar.");
  if (res.status === 404) throw new AiError("no_endpoint", "La IA no està configurada en aquest servidor. Mira el README.");
  if (res.status === 401) throw new AiError("upstream", "Entra al teu compte (Perfil) per fer servir la IA.");
  if (res.status === 429) throw new AiError("rate_limited", "Massa peticions seguides. Espera uns minuts.");
  if (!res.ok) {
    const detail = await res.json().then((d: { error?: string }) => d?.error).catch(() => undefined);
    throw new AiError("upstream", `El servei d'IA ha fallat${detail ? `: ${String(detail).slice(0, 220)}` : ". Torna-ho a provar."}`);
  }
  const data = (await res.json()) as { text?: string };
  return data.text ?? "";
}

export async function askJSON<T>(input: string | Turn[], opts: { image?: Blob; signal?: AbortSignal; timeoutMs?: number } = {}): Promise<T> {
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
