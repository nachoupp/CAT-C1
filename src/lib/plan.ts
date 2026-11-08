import type { AreaKey } from "./types";
import { daysBetween, weekday } from "./dates";

export interface Task { key: string; title: string; detail: string; to: string; minutes: number }

const BLOCK: Record<AreaKey | "rest", Task> = {
  escrita: { key: "escrita", title: "Redacció tipus examen", detail: "Escriu i corregeix amb la rúbrica, o fes-la en paper i envia'n la foto", to: "escriu", minutes: 12 },
  oral: { key: "oral", title: "Conversa d'examen", detail: "Interacció amb l'interlocutor virtual o exposició amb rellotge", to: "parla", minutes: 12 },
  comprensio: { key: "comprensio", title: "Comprensió oral oficial", detail: "Un àudio del GOIB amb les preguntes del PDF", to: "audios", minutes: 12 },
  sistema: { key: "sim", title: "Minisimulacre de l'Àrea 2", detail: "15 preguntes amb rellotge", to: "simulacre", minutes: 12 },
  rest: { key: "joc", title: "Repàs suau amb jocs", detail: "Frases fetes o barbarismes", to: "practica", minutes: 10 }
};

/**
 * Pla de 25 minuts. Alterna escrita (dl, dc, dv), oral (dt, dj) i comprensió (ds).
 * El diumenge reforça l'àrea més feble. A 21 dies o menys de l'examen, prioritza simulacres.
 */
export function dailyPlan(today: string, examDate: string, weakest: AreaKey, dueReviews: number): Task[] {
  const tasks: Task[] = [
    { key: "repas", title: "Repàs espaiat", detail: dueReviews > 0 ? `${dueReviews} preguntes et toquen avui` : "10 preguntes noves de l'Àrea 2", to: "test", minutes: 8 }
  ];
  const left = daysBetween(today, examDate);
  const wd = weekday(today);
  let block: Task;
  if (left >= 0 && left <= 21 && wd !== 0) block = wd % 2 === 0 ? BLOCK.escrita : BLOCK.sistema;
  else if (wd === 1 || wd === 3 || wd === 5) block = BLOCK.escrita;
  else if (wd === 2 || wd === 4) block = BLOCK.oral;
  else if (wd === 6) block = BLOCK.comprensio;
  else block = weakest === "comprensio" ? BLOCK.comprensio : BLOCK[weakest] ?? BLOCK.rest;
  tasks.push(block);
  tasks.push({ key: "pindola", title: "Píndola del dia", detail: "2 minuts de teoria amb exemple", to: "apren", minutes: 3 });
  return tasks;
}
