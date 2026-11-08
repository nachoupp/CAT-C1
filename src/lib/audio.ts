/**
 * Àudio en català: primer la veu neuronal del servidor (/api/tts: Aina/Matxa, Azure o ElevenLabs);
 * si no està configurada, la veu del dispositiu.
 */
import { accessToken } from "./supabase";
import { getState } from "./store";
import { speak as deviceSpeak, stopSpeaking } from "./speech";

const cache = new Map<string, string>();
let neuralOff = false;
let current: HTMLAudioElement | null = null;

export const VOICES = [
  { id: "joana", label: "Joana" },
  { id: "enric", label: "Enric" },
  { id: "alba", label: "Alba" }
] as const;

export type Voice = { id: string; label: string };
export type VoiceInfo = { provider: string | null; voices: Voice[] };
let voicesP: Promise<VoiceInfo> | null = null;

/** Veus que ofereix el servidor (depèn del proveïdor configurat a Vercel). */
export function serverVoices(): Promise<VoiceInfo> {
  voicesP ??= (async () => {
    try {
      const token = await accessToken();
      const r = await fetch("/api/tts?list=1", { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!r.ok) return { provider: null, voices: [] };
      return (await r.json()) as VoiceInfo;
    } catch { return { provider: null, voices: [] }; }
  })();
  return voicesP;
}

/** URL d'àudio neuronal per a un text, o null si el servidor no en té. */
export async function neuralUrl(text: string, rate = 1): Promise<string | null> {
  if (neuralOff) return null;
  const voice = getState().settings.voice ?? "";
  const key = `${voice}|${rate}|${text}`;
  const hit = cache.get(key);
  if (hit) return hit;
  try {
    const token = await accessToken();
    const r = await fetch(`/api/tts?v=${voice}&r=${rate}&t=${encodeURIComponent(text)}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
    if (r.status === 404) { neuralOff = true; return null; }
    if (!r.ok || !(r.headers.get("content-type") ?? "").includes("audio")) return null;
    const url = URL.createObjectURL(await r.blob());
    cache.set(key, url);
    return url;
  } catch { return null; }
}

export function stopAll(): void {
  current?.pause(); current = null; stopSpeaking();
}

/** Reprodueix un text. Retorna quina veu s'ha fet servir. */
export async function playText(text: string): Promise<"neural" | "device" | "none"> {
  stopAll();
  const url = await neuralUrl(text);
  if (url) {
    current = new Audio(url);
    current.playbackRate = getState().settings.rate ?? 1;
    await current.play().catch(() => undefined);
    return "neural";
  }
  return deviceSpeak(text) ? "device" : "none";
}
