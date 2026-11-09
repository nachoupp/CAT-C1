/** Mantenir la pantalla encesa (Screen Wake Lock API: Chrome/Android, Safari iOS 16.4+). */
import { useState, useSyncExternalStore } from "react";

type Sentinel = { released: boolean; release: () => Promise<void>; addEventListener: (t: "release", f: () => void) => void };
let sentinel: Sentinel | null = null;
let wanted = false;
const subs = new Set<() => void>();
const emit = () => subs.forEach((f) => f());

export const wakeSupported = () => typeof navigator !== "undefined" && "wakeLock" in navigator;

async function acquire() {
  try {
    const wl = (navigator as unknown as { wakeLock: { request: (t: "screen") => Promise<Sentinel> } }).wakeLock;
    sentinel = await wl.request("screen");
    sentinel.addEventListener("release", () => { sentinel = null; emit(); });
  } catch {
    sentinel = null;
    wanted = false;
  }
  emit();
}

export async function setWake(on: boolean) {
  wanted = on;
  if (on) await acquire();
  else { await sentinel?.release().catch(() => {}); sentinel = null; emit(); }
}

if (typeof document !== "undefined") {
  // El navegador allibera el bloqueig en canviar de pestanya: el recuperem en tornar.
  document.addEventListener("visibilitychange", () => { if (wanted && !sentinel && document.visibilityState === "visible") void acquire(); });
}

export function useWake() {
  const on = useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => wanted && !!sentinel);
  const [supported] = useState(wakeSupported);
  return { on, supported, toggle: () => void setWake(!wanted) };
}
