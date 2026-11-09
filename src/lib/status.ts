/** Estat dels serveis del servidor (/api/status): quins proveïdors estan configurats. */
import { useEffect, useState } from "react";

export interface ServerStatus { ai: "gemini" | "claude" | null; tts: "aina" | "azure" | "elevenlabs" | null; stt: boolean; auth: boolean; loginRequired: boolean }
let cache: Promise<ServerStatus | null> | null = null;

export function fetchStatus(force = false): Promise<ServerStatus | null> {
  if (!cache || force) {
    cache = fetch("/api/status", { cache: "no-store" })
      .then((r) => (r.ok && (r.headers.get("content-type") ?? "").includes("json") ? (r.json() as Promise<ServerStatus>) : null))
      .catch(() => null);
  }
  return cache;
}

export function useStatus() {
  const [s, setS] = useState<ServerStatus | null | undefined>(undefined);
  useEffect(() => { let live = true; void fetchStatus().then((x) => live && setS(x)); return () => { live = false; }; }, []);
  return s; // undefined = carregant, null = sense servidor (p. ex. en local)
}
