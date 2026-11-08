import { useSyncExternalStore } from "react";
import type { AppState } from "./types";
import { isoDate } from "./dates";
import { XP, type XpKind } from "./game";

const KEY = "parla-c1:v5";
const OLD_KEY = "parla-c1:v4";

export const initialState = (): AppState => ({
  version: 5,
  xp: [],
  units: {},
  checkpoints: {},
  notebook: [],
  mocks: [],
  officialKeys: {},
  log: {},
  cards: {},
  quizzes: [],
  writings: [],
  speaking: [],
  audios: {},
  lessons: {},
  drafts: {},
  games: {},
  settings: { tts: true, nextExam: "2027-03-06", goalExam: "2027-10-02" }
});

/** Accepta estats antics (v4) i hi afegeix els camps nous. */
export function migrate(raw: unknown): AppState {
  const base = initialState();
  if (!raw || typeof raw !== "object") return base;
  const o = raw as Partial<AppState>;
  return { ...base, ...o, settings: { ...base.settings, ...(o.settings ?? {}) }, version: 5 };
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY) ?? localStorage.getItem(OLD_KEY);
    if (raw) return migrate(JSON.parse(raw));
  } catch { /* emmagatzematge no disponible */ }
  return initialState();
}

let state: AppState = typeof localStorage === "undefined" ? initialState() : load();
const listeners = new Set<() => void>();

export function getState(): AppState { return state; }

export function setState(fn: (s: AppState) => AppState): void {
  state = fn(state);
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* sense persistència */ }
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStore<T>(sel: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => sel(state), () => sel(state));
}

/** Marca una tasca del pla d'avui com a feta. */
export function markDone(task: string, day: string = isoDate()): void {
  setState((s) => ({ ...s, log: { ...s.log, [day]: { ...(s.log[day] ?? {}), [task]: true } } }));
}

export function toggleDone(task: string, day: string = isoDate()): void {
  setState((s) => {
    const d = { ...(s.log[day] ?? {}) };
    if (d[task]) delete d[task]; else d[task] = true;
    return { ...s, log: { ...s.log, [day]: d } };
  });
}

export function streak(log: AppState["log"], today: string): number {
  const d = new Date(today + "T00:00:00");
  const has = (x: Date) => Object.keys(log[isoDate(x)] ?? {}).length > 0;
  if (!has(d)) d.setDate(d.getDate() - 1);
  let n = 0;
  while (has(d)) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/** Codi portable per passar el progrés a un altre dispositiu. */
export function exportCode(s: AppState): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(s))));
}

export function importCode(code: string): AppState {
  const parsed: unknown = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
  if (typeof parsed !== "object" || parsed === null) throw new Error("codi no vàlid");
  return migrate(parsed);
}

/** Suma punts i marca el dia com a actiu. */
export function award(kind: XpKind, task?: string, day: string = isoDate()): void {
  setState((s) => ({
    ...s,
    xp: [...s.xp, { at: Date.now(), kind, xp: XP[kind] }].slice(-3000),
    log: { ...s.log, [day]: { ...(s.log[day] ?? {}), [task ?? kind]: true } }
  }));
}
