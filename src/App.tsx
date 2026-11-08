import type { ReactNode } from "react";
import { useRoute, go } from "./lib/router";
import { useToast } from "./lib/toast";
import Today from "./features/today/Today";
import CalendarView from "./features/calendar/Calendar";
import Learn, { LessonView } from "./features/learn/Learn";
import Practice from "./features/practice/Practice";
import Quiz from "./features/practice/Quiz";
import ExamSim from "./features/practice/ExamSim";
import { MatchGame, BarbGame, Flashcards } from "./features/practice/Games";
import Audios from "./features/practice/Audios";
import Write from "./features/write/Write";
import { PaperList, Diagnostic } from "./features/write/Paper";
import Speak from "./features/speak/Speak";
import OralTimer from "./features/speak/OralTimer";

const TABS = [
  { id: "avui", label: "Avui", icon: <path d="M12 3.5a8.5 8.5 0 100 17 8.5 8.5 0 000-17zM12 7.5V12l3 2" /> },
  { id: "apren", label: "Aprèn", icon: <path d="M4 5.5c2.5-1.2 5.5-1.2 8 0v14c-2.5-1.2-5.5-1.2-8 0zM12 5.5c2.5-1.2 5.5-1.2 8 0v14c-2.5-1.2-5.5-1.2-8 0" /> },
  { id: "practica", label: "Practica", icon: <path d="M5 4.5h10l4 4v11H5zM9 12l2 2 4-4" /> },
  { id: "escriu", label: "Escriu", icon: <path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" /> },
  { id: "parla", label: "Parla", icon: <path d="M5 5.5h14A1.5 1.5 0 0120.5 7v8a1.5 1.5 0 01-1.5 1.5H10l-4.5 3.5v-3.5H5A1.5 1.5 0 013.5 15V7A1.5 1.5 0 015 5.5z" /> }
];

const TAB_OF: Record<string, string> = {
  calendari: "avui", test: "practica", "test-ia": "practica", simulacre: "practica", "joc-frases": "practica", "joc-barbarismes": "practica",
  connectors: "practica", audios: "practica", fitxes: "escriu", fitxa0: "escriu", oral: "parla"
};

function screen(route: string): ReactNode {
  if (route.startsWith("lesson-")) return <LessonView id={route.slice(7)} />;
  switch (route) {
    case "calendari": return <CalendarView />;
    case "apren": return <Learn />;
    case "practica": return <Practice />;
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
    default: return <Today />;
  }
}

export default function App() {
  const route = useRoute();
  const toast = useToast();
  const tab = route.startsWith("lesson-") ? "apren" : TAB_OF[route] ?? (TABS.some((t) => t.id === route) ? route : "avui");
  return (
    <div className="min-h-dvh pt-[env(safe-area-inset-top)]">
      <div key={route}>{screen(route)}</div>
      {toast && (
        <div role="status" className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 rounded-full bg-fg px-4 py-2.5 text-sm font-medium text-bg">{toast}</div>
      )}
      <nav aria-label="Seccions" className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-[var(--bar)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150">
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
