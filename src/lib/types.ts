export type AreaKey = "comprensio" | "sistema" | "escrita" | "oral";

export interface QuizResult { at: number; ok: number; n: number; kind: "practice" | "ai" | "exam" }
export interface WritingResult { at: number; promptId: string; score: number; words: number }
export interface SpeakingResult { at: number; scenario: string; score: number | null }

export interface AppState {
  version: 4;
  log: Record<string, Record<string, true>>;
  cards: Record<string, import("./srs").Card>;
  quizzes: QuizResult[];
  writings: WritingResult[];
  speaking: SpeakingResult[];
  audios: Record<string, string>;
  lessons: Record<string, string>;
  drafts: Record<string, string>;
  games: { match?: number; barb?: number };
  settings: { tts: boolean; nextExam: string; goalExam: string };
}

export interface Milestone { date: string; title: string; detail: string; kind: "registration" | "exam" | "admin" }
export interface BankItem { id: string; prompt: string; answer: string; distractors: string[]; explanation: string }
export interface Idiom { expr: string; meaning: string }
export interface Barbarism { form: string; correct: boolean; fix: string }
export interface Connector { term: string; use: string; example: string }
export interface Lesson { id: string; area: string; title: string; html: string; example: string }
export interface Exam { id: string; label: string; note: string; pdf: string; audio1: string; audio2: string; reserved: boolean }
export interface WritingPrompt { id: string; title: string; words: number; minutes: number; exercise: string; brief: string }
export interface Roleplay { id: string; title: string; subtitle: string; brief: string }
export interface DiagnosticItem { prompt: string; options: string[] }
