/**
 * Repetició espaiada (sistema Leitner).
 * Cada element té una caixa 0-5; encertar el puja de caixa, fallar el torna a la 0.
 * L'interval en dies creix amb la caixa.
 */
import { addDays } from "./dates";

export interface Card {
  box: number;
  due: string;
  seen: number;
  wrong: number;
}

export const INTERVALS = [0, 1, 2, 4, 8, 16] as const;
export const MAX_BOX = INTERVALS.length - 1;

export function grade(card: Card | undefined, correct: boolean, today: string): Card {
  const c: Card = card ?? { box: 0, due: today, seen: 0, wrong: 0 };
  const box = correct ? Math.min(c.box + 1, MAX_BOX) : 0;
  return {
    box,
    due: correct ? addDays(today, INTERVALS[box]) : today,
    seen: c.seen + 1,
    wrong: c.wrong + (correct ? 0 : 1)
  };
}

export function isDue(card: Card | undefined, today: string): boolean {
  return !card || card.due <= today;
}

/**
 * Tria `n` elements: primer els vençuts que s'han fallat més, després els no vistos,
 * i per acabar la resta per data de venciment. `rand` permet tests deterministes.
 */
export function pickForSession(
  ids: string[],
  cards: Record<string, Card>,
  n: number,
  today: string,
  rand: () => number = Math.random
): string[] {
  const score = (id: string): number => {
    const c = cards[id];
    if (!c) return 50 + rand();
    if (c.due <= today) return 100 + c.wrong * 5 - c.box * 3 + rand();
    return -(c.box * 10) + rand();
  };
  return [...ids].sort((a, b) => score(b) - score(a)).slice(0, n);
}

export function dueCount(ids: string[], cards: Record<string, Card>, today: string): number {
  return ids.filter((id) => cards[id] && cards[id].due <= today).length;
}

export function mastered(ids: string[], cards: Record<string, Card>): number {
  return ids.filter((id) => (cards[id]?.box ?? 0) >= 3).length;
}
