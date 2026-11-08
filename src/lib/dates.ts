export const DAY = 86_400_000;

/** Data local en format AAAA-MM-DD. */
export function isoDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function parseIso(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Dies naturals des de `from` fins a `to` (negatiu si `to` ja ha passat). */
export function daysBetween(from: string, to: string): number {
  return Math.round((parseIso(to).getTime() - parseIso(from).getTime()) / DAY);
}

export function addDays(s: string, n: number): string {
  const d = parseIso(s);
  d.setDate(d.getDate() + n);
  return isoDate(d);
}

export function fmtLong(s: string): string {
  return parseIso(s).toLocaleDateString("ca-ES", { day: "numeric", month: "long", year: "numeric" });
}

export function fmtShort(s: string): string {
  return parseIso(s).toLocaleDateString("ca-ES", { day: "numeric", month: "short" });
}

export function weekday(s: string): number {
  return parseIso(s).getDay();
}
