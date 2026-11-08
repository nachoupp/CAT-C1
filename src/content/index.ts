import type { BankItem, Barbarism, Connector, DiagnosticItem, Exam, Idiom, Lesson, Milestone, Roleplay, WritingPrompt } from "../lib/types";
import milestonesJson from "./milestones.json";
import bankJson from "./area2-bank.json";
import idiomsJson from "./idioms.json";
import barbJson from "./barbarisms.json";
import connJson from "./connectors.json";
import oralJson from "./oral.json";
import examsJson from "./exams.json";
import lessonsJson from "./lessons.json";
import promptsJson from "./writing-prompts.json";
import roleplaysJson from "./roleplays.json";
import diagJson from "./diagnostic.json";

export const MILESTONES = (milestonesJson as Milestone[]).slice().sort((a, b) => a.date.localeCompare(b.date));
export const BANK = bankJson as BankItem[];
export const IDIOMS = idiomsJson as Idiom[];
export const BARBARISMS = barbJson as Barbarism[];
export const CONNECTORS = connJson as Connector[];
export const ORAL = oralJson as { topics: string[]; readings: string[] };
export const EXAMS = examsJson as Exam[];
export const LESSONS = lessonsJson as Lesson[];
export const WRITING_PROMPTS = promptsJson as WritingPrompt[];
export const ROLEPLAYS = roleplaysJson as Roleplay[];
export const DIAGNOSTIC = diagJson as DiagnosticItem[];

export const LINKS = {
  goibExams: "https://www.caib.es/webgoib/es/w/nivell-b2.-proves-de-convocat%C3%B2ries-anteriors-des-del-2020-1",
  goibCalendar: "https://www.caib.es/webgoib/ca/-/proves-de-llengua-catalana-de-2027-previsi%C3%B3",
  diec: "https://dlc.iec.cat/",
  dcvb: "https://dcvb.iec.cat/",
  languagetool: "https://languagetool.org"
} as const;

/** Element del dia: el mateix durant tot el dia, diferent l'endemà. */
export function ofTheDay<T>(arr: readonly T[], today: string, salt = 0): T {
  const n = Math.floor(Date.UTC(+today.slice(0, 4), +today.slice(5, 7) - 1, +today.slice(8, 10)) / 86_400_000) + salt;
  return arr[((n % arr.length) + arr.length) % arr.length];
}
