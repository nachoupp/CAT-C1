/** Quadern d'errors: cada error que comets s'hi guarda i torna en el repàs fins que el domines. */
import type { AppState, NotebookEntry } from "./types";
import { grade } from "./srs";

export function entryId(wrong: string, right: string): string {
  return (wrong + "→" + right).toLowerCase().replace(/\s+/g, " ").trim();
}

export function addError(s: AppState, e: { wrong: string; right: string; note: string; source: NotebookEntry["source"]; link?: string }, today: string): AppState {
  const wrong = e.wrong.trim(), right = e.right.trim();
  if (!wrong || !right || wrong.toLowerCase() === right.toLowerCase()) return s;
  const id = entryId(wrong, right);
  const existing = s.notebook.find((x) => x.id === id);
  const notebook = existing
    ? s.notebook.map((x) => (x.id === id ? { ...x, count: x.count + 1, card: { ...x.card, box: 0, due: today } } : x))
    : [...s.notebook, { id, wrong, right, note: e.note, source: e.source, link: e.link, count: 1, added: today, card: { box: 0, due: today, seen: 0, wrong: 0 } }];
  return { ...s, notebook: notebook.slice(-400) };
}

export function reviewError(s: AppState, id: string, correct: boolean, today: string): AppState {
  return { ...s, notebook: s.notebook.map((x) => (x.id === id ? { ...x, card: grade(x.card, correct, today) } : x)) };
}

export const alive = (s: AppState) => s.notebook.filter((x) => x.card.box < 3);
export const dueErrors = (s: AppState, today: string) => s.notebook.filter((x) => x.card.due <= today && x.card.box < 5);
