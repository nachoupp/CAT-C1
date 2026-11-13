/**
 * Àudio en català: primer la veu neuronal del servidor (/api/tts: Aina/Matxa, Azure o ElevenLabs);
 * si no està configurada, la veu del dispositiu.
 */
import { accessToken } from "./supabase";
import { getState } from "./store";
import { speak as deviceSpeak, stopSpeaking } from "./speech";
import { toast } from "./toast";

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

/** El servidor no té veu neuronal configurada (només llavors es fa servir la del dispositiu). */
export const neuralMissing = (): boolean => neuralOff;

// Cua: com a màxim 2 peticions alhora, perquè ElevenLabs rebutja les ràfegues (llistes amb molts àudios).
let active = 0;
const waiting: (() => void)[] = [];
async function slot<T>(fn: () => Promise<T>): Promise<T> {
  if (active >= 2) await new Promise<void>((r) => waiting.push(r));
  active++;
  try { return await fn(); } finally { active--; waiting.shift()?.(); }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** URL d'àudio neuronal per a un text, o null si falla (neuralMissing() diu si és que no hi ha servidor de veu). */
export async function neuralUrl(text: string, rate = 1): Promise<string | null> {
  if (neuralOff) return null;
  const voice = getState().settings.voice ?? "";
  const key = `${voice}|${rate}|${text}`;
  const hit = cache.get(key);
  if (hit) return hit;
  return slot(async () => {
    for (let i = 0; i < 3; i++) {
      try {
        const token = await accessToken();
        const r = await fetch(`/api/tts?v=${voice}&r=${rate}&t=${encodeURIComponent(text)}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        if (r.status === 404) { neuralOff = true; return null; }
        if (r.ok && (r.headers.get("content-type") ?? "").includes("audio")) {
          const url = URL.createObjectURL(await r.blob());
          cache.set(key, url);
          return url;
        }
        if (r.status === 401 || r.status === 400) return null;
      } catch { /* xarxa: es reintenta */ }
      await sleep(900 * (i + 1));
    }
    return null;
  });
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
  if (!neuralOff) { toast("La veu no ha respost. Torna-ho a provar."); return "none"; }
  return deviceSpeak(text) ? "device" : "none";
}

/** Diu un text i espera que acabi (per a converses). Si la veu neuronal falla, ho avisa en lloc de canviar de veu. */
export async function speakAndWait(text: string): Promise<void> {
  stopAll();
  const url = await neuralUrl(text);
  if (url) {
    const a = new Audio(url);
    current = a;
    a.playbackRate = getState().settings.rate ?? 1;
    await new Promise<void>((done) => {
      a.onended = () => done();
      a.onpause = () => done();
      a.onerror = () => done();
      a.play().catch(() => done());
    });
    return;
  }
  if (!neuralOff) { toast("La veu no ha respost. Pots llegir la resposta al text."); return; }
  if (deviceSpeak(text)) await sleep(Math.max(2000, text.length * 70));
}
