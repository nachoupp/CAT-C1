import { Page, Card, Btn, Pill } from "../../components/ui";
import { useStore } from "../../lib/store";
import { UNITS, CHECKPOINTS, PHASES, STEPS } from "../../content/units";
import { level, totalXp, weekStreak, weekStart, activeDays, WEEK_GOAL } from "../../lib/game";
import { addDays, isoDate } from "../../lib/dates";
import { dueErrors } from "../../lib/notebook";
import { go } from "../../lib/router";
import { nextStep, stepDone, unitPassed, unitUnlocked, checkpointUnlocked } from "./progress";

const DAYS = ["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"];

export default function Route() {
  const s = useStore((x) => x);
  const today = isoDate();
  const lv = level(s);
  const xp = totalXp(s);
  const st = weekStreak(s, today);
  const monday = weekStart(today);
  const active = new Set(activeDays(s, monday));
  const nx = nextStep(s);
  const due = dueErrors(s, today).length;

  return (
    <Page title="La teva ruta" subtitle="Una unitat per setmana · 5 sessions de 25 minuts">
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative grid size-16 flex-none place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--line)" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--gold)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray={`${lv.progress * 97.4} 97.4`} />
            </svg>
            <span className="text-[17px] font-bold">{lv.name}</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold tabular">{xp} XP</div>
            <div className="text-[13.5px] text-muted">
              {lv.next ? (lv.blockedByCheckpoint ? `Supera el proper control per pujar a ${lv.next.name}` : `${lv.next.xp - xp} XP per arribar a ${lv.next.name}`) : "Nivell màxim"}
            </div>
            <div className="mt-2 flex gap-1.5" aria-label={`Aquesta setmana: ${st.thisWeek} de ${WEEK_GOAL} sessions`}>
              {DAYS.map((d, i) => {
                const day = addDays(monday, i);
                const on = active.has(day);
                return (
                  <div key={d} className="flex flex-col items-center gap-0.5">
                    <span className={`grid size-6 place-items-center rounded-full text-[10px] font-bold ${on ? "bg-good text-white" : day === today ? "ring-2 ring-accent" : "bg-line text-muted"}`}>{on ? "✓" : ""}</span>
                    <span className="text-[10px] text-muted">{d}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-3 text-[13.5px] text-muted">Objectiu: {WEEK_GOAL} sessions per setmana · {st.thisWeek}/{WEEK_GOAL} fetes · ratxa de {st.weeks} {st.weeks === 1 ? "setmana" : "setmanes"}</div>
      </Card>

      {nx && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-sist p-5 text-white">
          {"unit" in nx ? (
            <>
              <div className="text-[13px] font-semibold uppercase tracking-wider opacity-85">Sessió d'avui · Unitat {nx.unit.n}</div>
              <div className="mt-1 text-[24px] font-bold leading-tight">{nx.step.label}</div>
              <div className="mt-0.5 opacity-90">{nx.unit.title} · {nx.step.detail}</div>
              <button onClick={() => go(`unit-${nx.unit.id}-${nx.step.key}`)} className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-accent">Comença · 25 min</button>
            </>
          ) : (
            <>
              <div className="text-[13px] font-semibold uppercase tracking-wider opacity-85">Cap de fase</div>
              <div className="mt-1 text-[24px] font-bold leading-tight">{nx.checkpoint.title}</div>
              <div className="mt-0.5 opacity-90">15 preguntes de les unitats {nx.checkpoint.units.join(", ")}. Cal un 60 % per continuar.</div>
              <button onClick={() => go(`checkpoint-${nx.checkpoint.id}`)} className="mt-4 rounded-xl bg-white px-5 py-3 font-semibold text-accent">Fes el control</button>
            </>
          )}
        </div>
      )}
      {!nx && (
        <Card className="mt-4 p-4">
          <div className="font-semibold">Has completat totes les unitats disponibles</div>
          <p className="text-[14.5px] text-muted">La unitat següent s'està preparant. Mentrestant, repassa el quadern d'errors o fes un simulacre.</p>
          <div className="mt-3 flex flex-wrap gap-2"><Btn variant="soft" onClick={() => go("quadern")}>Quadern</Btn><Btn variant="soft" onClick={() => go("examens")}>Exàmens</Btn></div>
        </Card>
      )}

      {due > 0 && (
        <button onClick={() => go("repas")} className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-3 text-left">
          <span className="grid size-8 place-items-center rounded-lg bg-escr text-sm font-bold text-white">!</span>
          <span className="flex-1"><span className="font-medium">Repàs d'errors</span><span className="block text-[13.5px] text-muted">{due} errors teus per repassar · 5 min</span></span>
          <span className="text-xl text-muted">›</span>
        </button>
      )}

      {PHASES.map((ph) => (
        <section key={ph.n} className="mt-7">
          <h2 className="mx-1 mb-3 flex items-baseline justify-between text-[13px] font-semibold uppercase tracking-wider text-muted">
            <span>Fase {ph.n} · {ph.title}</span><span className="normal-case tracking-normal">{ph.when}</span>
          </h2>
          <ol className="relative ml-5 border-l-2 border-line pl-7">
            {UNITS.filter((u) => u.phase === ph.n).map((u) => {
              const passed = unitPassed(s, u.id);
              const open = unitUnlocked(s, u);
              const ready = !!u.content;
              const cp = CHECKPOINTS.find((c) => c.afterUnit === u.n);
              return (
                <li key={u.id} className="relative mb-4">
                  <span className={`absolute -left-[45px] top-3 grid size-9 place-items-center rounded-full border-4 border-bg text-[13px] font-bold ${passed ? "bg-good text-white" : open && ready ? "bg-accent text-white" : "bg-line text-muted"}`}>
                    {passed ? "✓" : u.n}
                  </span>
                  <button disabled={!open || !ready} onClick={() => go(`unit-${u.id}`)} className="w-full rounded-2xl bg-card px-4 py-3 text-left disabled:opacity-60">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="font-semibold">{u.title}</div>
                        <div className="text-[13px] text-muted">{u.grammar} · {u.genre}</div>
                      </div>
                      {!ready ? <Pill tone="muted">Aviat</Pill> : !open ? <Pill tone="muted">Bloquejada</Pill> : passed ? <Pill tone="good">Superada</Pill> : null}
                    </div>
                    {ready && open && (
                      <div className="mt-2 flex gap-1.5" aria-hidden>
                        {STEPS.map((x) => <span key={x.key} className={`h-1.5 flex-1 rounded-full ${stepDone(s, u.id, x.key) ? "bg-good" : "bg-line"}`} />)}
                      </div>
                    )}
                  </button>
                  {cp && (
                    <div className="relative mt-4">
                      <span className={`absolute -left-[45px] top-2 grid size-9 place-items-center rounded-full border-4 border-bg text-[15px] ${s.checkpoints[cp.id]?.passed ? "bg-good text-white" : "bg-gold text-white"}`}>★</span>
                      <button disabled={!checkpointUnlocked(s, cp.afterUnit)} onClick={() => go(`checkpoint-${cp.id}`)}
                        className="w-full rounded-2xl border-2 border-dashed border-gold/60 px-4 py-2.5 text-left disabled:opacity-50">
                        <div className="font-semibold">{cp.title}</div>
                        <div className="text-[13px] text-muted">{s.checkpoints[cp.id] ? `Millor nota: ${s.checkpoints[cp.id].score} %` : "Desbloqueja la fase següent"}</div>
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          {ph.n === 2 && <Milestone text="Examen GOIB · 6 de març (assaig real)" />}
          {ph.n === 3 && <Milestone text="EOI Eivissa · maig-juny (opcional)" />}
          {ph.n === 4 && <Milestone text="Examen GOIB · 2 d'octubre (objectiu)" />}
        </section>
      ))}
    </Page>
  );
}

function Milestone({ text }: { text: string }) {
  return (
    <button onClick={() => go("calendari")} className="ml-5 mt-1 flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[13px] font-semibold text-accent">
      <span aria-hidden>⚑</span>{text}
    </button>
  );
}
