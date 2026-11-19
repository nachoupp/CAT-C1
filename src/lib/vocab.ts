/** Les meves paraules: vocabulari que desaràs del diccionari i dels globus, amb repàs espaiat. */
import type { AppState, VocabEntry } from "./types";
import { grade } from "./srs";

export const vocabId = (w: string): string => w.toLowerCase().trim().replace(/\s+/g, " ");

export function addWord(s: AppState, e: { word: string; es: string; note?: string; ex?: string }, today: string): AppState {
  const word = e.word.trim(), es = e.es.trim();
  if (!word || !es) return s;
  const id = vocabId(word);
  if (s.vocab.some((x) => x.id === id)) return s;
  const entry: VocabEntry = { id, word, es, note: e.note?.trim() || undefined, ex: e.ex?.trim() || undefined, added: today, card: { box: 0, due: today, seen: 0, wrong: 0 } };
  return { ...s, vocab: [...s.vocab, entry].slice(-1000) };
}

export const removeWord = (s: AppState, id: string): AppState => ({ ...s, vocab: s.vocab.filter((x) => x.id !== id) });
export const reviewWord = (s: AppState, id: string, ok: boolean, today: string): AppState => ({ ...s, vocab: s.vocab.map((x) => (x.id === id ? { ...x, card: grade(x.card, ok, today) } : x)) });
export const dueWords = (s: AppState, today: string): VocabEntry[] => s.vocab.filter((x) => x.card.due <= today);
export const hasWord = (s: AppState, word: string): boolean => s.vocab.some((x) => x.id === vocabId(word));
