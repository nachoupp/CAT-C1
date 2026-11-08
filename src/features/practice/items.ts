import type { BankItem } from "../../lib/types";
import { shuffle } from "../../lib/text";

export interface QuizItem { id: string | null; prompt: string; options: string[]; answer: string; explanation: string }

export const fromBank = (b: BankItem): QuizItem => ({ id: b.id, prompt: b.prompt, answer: b.answer, explanation: b.explanation, options: shuffle([b.answer, ...b.distractors]) });

export interface GeneratedQ { q: string; ok: string; no: string[]; e: string }

export function fromGenerated(x: GeneratedQ): QuizItem | null {
  if (!x || typeof x.q !== "string" || typeof x.ok !== "string" || !Array.isArray(x.no) || x.no.length < 2) return null;
  const no = x.no.slice(0, 2).map(String);
  if (no.includes(x.ok)) return null;
  return { id: null, prompt: x.q, answer: x.ok, explanation: String(x.e ?? ""), options: shuffle([x.ok, ...no]) };
}
