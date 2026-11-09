/** Client de /api/stt: envia la gravació i rep la transcripció amb temps per paraula. */
import { accessToken } from "./supabase";
import type { Transcript } from "./oral";

export class SttError extends Error {
  constructor(public code: "off" | "login" | "big" | "fail", message: string) { super(message); }
}

export async function transcribe(blob: Blob): Promise<Transcript> {
  let r: Response;
  try {
    const token = await accessToken();
    r = await fetch("/api/stt", { method: "POST", headers: { "Content-Type": blob.type || "audio/webm", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: blob });
  } catch {
    throw new SttError("fail", "No hi ha connexió. Torna-ho a provar.");
  }
  if (r.status === 404) throw new SttError("off", "La transcripció no està activada: cal posar ELEVENLABS_API_KEY a Vercel.");
  if (r.status === 401) throw new SttError("login", "Entra al teu compte (Perfil) per fer servir la correcció oral.");
  if (r.status === 413) throw new SttError("big", "La gravació és massa llarga. Prova amb menys de 4 minuts.");
  if (!r.ok) throw new SttError("fail", "No s'ha pogut transcriure. Si passa sovint, pot ser que s'hagi acabat la quota del mes.");
  const t = (await r.json()) as Transcript;
  if (!t.text?.trim()) throw new SttError("fail", "No s'ha sentit res. Comprova el micròfon i parla una mica més a prop.");
  return t;
}
