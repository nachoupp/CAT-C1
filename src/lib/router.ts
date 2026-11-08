import { useSyncExternalStore } from "react";

const sub = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };
const get = () => (typeof location === "undefined" ? "avui" : location.hash.replace(/^#/, "") || "avui");

export function useRoute(): string { return useSyncExternalStore(sub, get, () => "avui"); }

export function go(route: string): void {
  if (get() === route) return;
  location.hash = route;
  window.scrollTo({ top: 0 });
}
