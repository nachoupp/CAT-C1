/** Gamificació: punts per esforç, nivells amb controls, ratxa setmanal i medalles. */
import type { AppState } from "./types";
import { addDays, isoDate, parseIso } from "./dates";

export type XpKind = "quiz" | "practice" | "guided" | "oral" | "exam" | "rewrite" | "lesson" | "review" | "mock" | "checkpoint";

export const XP: Record<XpKind, number> = {
  quiz: 10, lesson: 5, review: 10, practice: 20, guided: 30, oral: 40, exam: 50, rewrite: 20, mock: 80, checkpoint: 60
};

export const LEVELS = [
  { name: "B1", xp: 0, checkpoints: 0 },
  { name: "B1+", xp: 400, checkpoints: 0 },
  { name: "B2", xp: 1200, checkpoints: 1 },
  { name: "B2+", xp: 2600, checkpoints: 3 },
  { name: "C1", xp: 4500, checkpoints: 5 }
] as const;

export function totalXp(s: AppState): number {
  return s.xp.reduce((a, e) => a + e.xp, 0);
}

export function level(s: AppState): { name: string; index: number; next: (typeof LEVELS)[number] | null; progress: number; blockedByCheckpoint: boolean } {
  const xp = totalXp(s);
  const passed = Object.values(s.checkpoints).filter((c) => c.passed).length;
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp && passed >= LEVELS[i].checkpoints) index = i;
  const next = LEVELS[index + 1] ?? null;
  const cur = LEVELS[index];
  const progress = next ? Math.min(1, (xp - cur.xp) / (next.xp - cur.xp)) : 1;
  return { name: cur.name, index, next, progress, blockedByCheckpoint: !!next && xp >= next.xp && passed < next.checkpoints };
}

/** Dilluns de la setmana d'una data (AAAA-MM-DD). */
export function weekStart(day: string): string {
  const d = parseIso(day);
  const wd = (d.getDay() + 6) % 7;
  return addDays(day, -wd);
}

export const WEEK_GOAL = 4;

/** Dies actius (amb alguna activitat) d'una setmana. */
export function activeDays(s: AppState, monday: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < 7; i++) { const d = addDays(monday, i); if (Object.keys(s.log[d] ?? {}).length) out.push(d); }
  return out;
}

/** Setmanes seguides complint l'objectiu (la setmana actual compta si ja s'ha complert). Un comodí per mes salva una setmana. */
export function weekStreak(s: AppState, today: string = isoDate()): { weeks: number; thisWeek: number; freezesUsed: number } {
  let monday = weekStart(today);
  const thisWeek = activeDays(s, monday).length;
  let weeks = thisWeek >= WEEK_GOAL ? 1 : 0;
  const usedMonths = new Set<string>();
  for (let i = 0; i < 60; i++) {
    monday = addDays(monday, -7);
    if (activeDays(s, monday).length >= WEEK_GOAL) { weeks++; continue; }
    const month = monday.slice(0, 7);
    if (!usedMonths.has(month) && activeDays(s, monday).length > 0) { usedMonths.add(month); weeks++; continue; }
    break;
  }
  return { weeks, thisWeek, freezesUsed: usedMonths.size };
}

export interface Medal { id: string; title: string; detail: string; earned: boolean }

export function medals(s: AppState): Medal[] {
  const unitsDone = Object.values(s.units).filter((u) => u.passed).length;
  const examPass = s.writings.some((w) => w.score >= 60);
  const fixed = s.notebook.filter((e) => e.card.box >= 3).length;
  const mock = s.mocks.length > 0;
  const oral = s.speaking.length > 0;
  const cps = Object.values(s.checkpoints).filter((c) => c.passed).length;
  return [
    { id: "first-step", title: "Primer pas", detail: "Completa una sessió", earned: Object.keys(s.log).length > 0 },
    { id: "unit1", title: "Unitat superada", detail: "Supera la primera unitat", earned: unitsDone >= 1 },
    { id: "phase1", title: "Base sòlida", detail: "Supera 6 unitats", earned: unitsDone >= 6 },
    { id: "text60", title: "Text aprovat", detail: "Treu un 60 en una redacció", earned: examPass },
    { id: "voice", title: "Primera veu", detail: "Fes una conversa avaluada", earned: oral },
    { id: "errors10", title: "Caçaerrors", detail: "Domina 10 errors del quadern", earned: fixed >= 10 },
    { id: "boss1", title: "Cap de fase", detail: "Supera un control", earned: cps >= 1 },
    { id: "mock", title: "Simulacre fet", detail: "Acaba un examen complet", earned: mock },
    { id: "streak4", title: "Constància", detail: "4 setmanes seguides complint l'objectiu", earned: weekStreak(s).weeks >= 4 }
  ];
}
