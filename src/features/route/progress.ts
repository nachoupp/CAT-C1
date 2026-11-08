import type { AppState, StepKey } from "../../lib/types";
import { UNITS, CHECKPOINTS, STEPS, type Unit } from "../../content/units";

export const stepDone = (s: AppState, unitId: string, step: StepKey) => !!s.units[unitId]?.steps[step];
export const unitPassed = (s: AppState, unitId: string) => !!s.units[unitId]?.passed;

/** Una unitat s'obre quan l'anterior està superada i, si hi ha un control entremig, també el control. */
export function unitUnlocked(s: AppState, u: Unit): boolean {
  if (u.n === 1) return true;
  const prev = UNITS[u.n - 2];
  if (!unitPassed(s, prev.id)) return false;
  const cp = CHECKPOINTS.find((c) => c.afterUnit === prev.n);
  return cp ? !!s.checkpoints[cp.id]?.passed : true;
}

export function checkpointUnlocked(s: AppState, afterUnit: number): boolean {
  return unitPassed(s, UNITS[afterUnit - 1].id);
}

/** Següent pas que toca: la primera unitat oberta i no superada, i el primer pas pendent. */
export function nextStep(s: AppState): { unit: Unit; step: (typeof STEPS)[number] } | { checkpoint: (typeof CHECKPOINTS)[number] } | null {
  for (const u of UNITS) {
    const cp = CHECKPOINTS.find((c) => c.afterUnit === u.n - 1);
    if (cp && unitPassed(s, UNITS[cp.afterUnit - 1].id) && !s.checkpoints[cp.id]?.passed) return { checkpoint: cp };
    if (!unitPassed(s, u.id)) {
      if (!u.content || !unitUnlocked(s, u)) return null;
      const step = STEPS.find((x) => !stepDone(s, u.id, x.key)) ?? STEPS[STEPS.length - 1];
      return { unit: u, step };
    }
  }
  return null;
}

export function markStep(s: AppState, unitId: string, step: StepKey, score?: number): AppState {
  const cur = s.units[unitId] ?? { steps: {}, passed: false };
  const steps = { ...cur.steps, [step]: { at: Date.now(), score } };
  const examScore = step === "examen" && score !== undefined ? Math.max(score, cur.examScore ?? 0) : cur.examScore;
  const passed = STEPS.every((x) => steps[x.key]) && (examScore ?? 0) >= 60;
  return { ...s, units: { ...s.units, [unitId]: { ...cur, steps, examScore, passed: cur.passed || passed } } };
}
