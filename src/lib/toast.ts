import { useSyncExternalStore } from "react";

let msg: string | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
const ls = new Set<() => void>();
const emit = () => ls.forEach((l) => l());

export function toast(m: string): void {
  msg = m; emit();
  clearTimeout(timer);
  timer = setTimeout(() => { msg = null; emit(); }, 2600);
}

export function useToast(): string | null {
  return useSyncExternalStore((l) => { ls.add(l); return () => ls.delete(l); }, () => msg, () => null);
}
