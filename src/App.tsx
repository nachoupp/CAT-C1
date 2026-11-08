import type { ReactNode } from "react";
import { useRoute, go } from "./lib/router";
import { useToast } from "./lib/toast";
import Route from "./features/route/Route";
import { UnitHome, UnitStep } from "./features/route/Unit";
import Checkpoint from "./features/route/Checkpoint";
import Exams, { MockRunner, OfficialExam } from "./features/exams/Exams";
import Notebook, { Review } from "./features/notebook/Notebook";
import Profile from "./features/profile/Profile";
import CalendarView from "./features/calendar/Calendar";
import { LessonView } from "./features/learn/Learn";
import Practice from "./features/practice/Practice";
import Quiz from "./features/practice/Quiz";
import ExamSim from "./features/practice/ExamSim";
import { MatchGame, BarbGame, Flashcards } from "./features/practice/Games";
import Audios from "./features/practice/Audios";
import Write from "./features/write/Write";
import { PaperList, Diagnostic } from "./features/write/Paper";
import Speak, { UnitSpeak } from "./features/speak/Speak";
import OralTimer from "./features/speak/OralTimer";
import type { StepKey } from "./lib/types";

const TABS = [
  { id: "ruta", label: "Ruta", icon: <path d="M6 20c0-4 4-4 4-8s-4-4-4-8M18 4c0 4-4 4-4 8s4 4 4 8M6 4h.01M18 20h.01" /> },
  { id: "practica", label: "Practica", icon: <path d="M5 4.5h10l4 4v11H5zM9 12l2 2 4-4" /> },
  { id: "examens", label: "Exàmens", icon: <path d="M4 6.5A1.5 1.5 0 015.5 5H10l2 2h6.5A1.5 1.5 0 0120 8.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5z" /> },
  { id: "quadern", label: "Quadern", icon: <path d="M6 3.5h11a1 1 0 011 1v15a1 1 0 01-1 1H6a2 2 0 01-2-2v-13a2 2 0 012-2zM8 3.5v17M11 8h4M11 11.5h4" /> },
  { id: "perfil", label: "Perfil", icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c1-3.5 4-5 7.5-5s6.5 1.5 7.5 5" /> }
];

const STEP_KEYS: StepKey[] = ["descobreix", "practica", "escriu", "parla", "examen"];

function tabOf(route: string): string {
  if (/^(unit|checkpoint)-/.test(route) || route === "repas") return route === "repas" ? "quadern" : "ruta";
  if (/^(exam|official)-/.test(route)) return "examens";
  if (route.startsWith("lesson-")) return "quadern";
  if (route.startsWith("parla")) return "practica";
  if (["calendari", "audios"].includes(route)) return "perfil";
  if (["test", "test-ia", "simulacre", "joc-frases", "joc-barbarismes", "connectors", "escriu", "fitxes", "fitxa0", "parla", "oral"].includes(route)) return "practica";
  return TABS.some((t) => t.id === route) ? route : "ruta";
}

function screen(route: string): ReactNode {
  let m: RegExpMatchArray | null;
  if ((m = route.match(/^unit-(u\d+)-(\w+)$/)) && STEP_KEYS.includes(m[2] as StepKey)) return <UnitStep id={m[1]} step={m[2] as StepKey} />;
  if ((m = route.match(/^unit-(u\d+)$/))) return <UnitHome id={m[1]} />;
  if ((m = route.match(/^checkpoint-(\w+)$/))) return <Checkpoint id={m[1]} />;
  if ((m = route.match(/^exam-(\w+)$/))) return <MockRunner id={m[1]} />;
  if ((m = route.match(/^official-(\w+)$/))) return <OfficialExam id={m[1]} />;
  if ((m = route.match(/^parla-unit-(u\d+)$/))) return <UnitSpeak unitId={m[1]} />;
  if (route.startsWith("lesson-")) return <LessonView id={route.slice(7)} />;
  switch (route) {
    case "practica": return <Practice />;
    case "examens": return <Exams />;
    case "quadern": return <Notebook />;
    case "repas": return <Review />;
    case "perfil": return <Profile />;
    case "calendari": return <CalendarView />;
    case "test": return <Quiz />;
    case "test-ia": return <Quiz ai />;
    case "simulacre": return <ExamSim />;
    case "joc-frases": return <MatchGame />;
    case "joc-barbarismes": return <BarbGame />;
    case "connectors": return <Flashcards />;
    case "audios": return <Audios />;
    case "escriu": return <Write />;
    case "fitxes": return <PaperList />;
    case "fitxa0": return <Diagnostic />;
    case "parla": return <Speak />;
    case "oral": return <OralTimer />;
    default: return <Route />;
  }
}

export default function App() {
  const route = useRoute();
  const toast = useToast();
  const tab = tabOf(route);
  return (
    <div className="min-h-dvh pt-[env(safe-area-inset-top)]">
      <div key={route}>{screen(route)}</div>
      {toast && (
        <div role="status" className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg">{toast}</div>
      )}
      <nav aria-label="Seccions" className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-[var(--bar)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 print:hidden">
        <div className="mx-auto grid max-w-[680px] grid-cols-5">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => go(t.id)} aria-current={tab === t.id ? "page" : undefined}
              className={`flex flex-col items-center gap-0.5 pt-2 pb-1.5 text-[11px] font-medium ${tab === t.id ? "text-accent" : "text-muted"}`}>
              <svg viewBox="0 0 24 24" className="size-6 fill-none stroke-current" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{t.icon}</svg>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
