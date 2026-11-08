import type { AppState, AreaKey } from "./types";

export interface AreaReadiness { area: AreaKey; label: string; score: number | null; evidence: string }

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/**
 * Estimació orientativa de la nota (0-100) per àrea, a partir de l'activitat recent.
 * Els simulacres compten el doble que els tests de pràctica.
 */
export function readiness(s: AppState): AreaReadiness[] {
  const qs = s.quizzes.slice(-8);
  const weighted = qs.flatMap((q) => {
    const pct = (q.ok / q.n) * 100;
    return q.kind === "exam" ? [pct, pct] : [pct];
  });
  const sistema = avg(weighted);
  const escrita = avg(s.writings.slice(-3).map((w) => w.score));
  const oral = avg(s.speaking.slice(-3).map((x) => x.score).filter((x): x is number => x !== null));
  const audios = Object.keys(s.audios).length;
  return [
    { area: "comprensio", label: "Comprensió", score: null, evidence: `${audios} àudios oficials fets` },
    { area: "sistema", label: "Gramàtica i lèxic", score: sistema === null ? null : Math.round(sistema), evidence: `${qs.length} tests recents` },
    { area: "escrita", label: "Expressió escrita", score: escrita === null ? null : Math.round(escrita), evidence: `${s.writings.length} redaccions corregides` },
    { area: "oral", label: "Expressió oral", score: oral === null ? null : Math.round(oral), evidence: `${s.speaking.length} converses avaluades` }
  ];
}

/** L'àrea amb menys nota (o sense dades) entre les que es poden mesurar. */
export function weakestArea(r: AreaReadiness[]): AreaKey {
  const measurable = r.filter((x) => x.area !== "comprensio");
  const noData = measurable.find((x) => x.score === null);
  if (noData) return noData.area;
  return measurable.reduce((a, b) => ((a.score ?? 0) <= (b.score ?? 0) ? a : b)).area;
}
