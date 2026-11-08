import { useState } from "react";
import { Page, Section, Stat, List, Row, Check, Card, Bar, Pill, Btn, Icon, ExtLink } from "../../components/ui";
import { useStore, toggleDone, streak, exportCode, importCode, getState, setState } from "../../lib/store";
import { daysBetween, fmtShort, isoDate } from "../../lib/dates";
import { BANK, CONNECTORS, IDIOMS, LESSONS, LINKS, MILESTONES, ofTheDay } from "../../content";
import { dailyPlan } from "../../lib/plan";
import { readiness, weakestArea } from "../../lib/readiness";
import { dueCount } from "../../lib/srs";
import { go } from "../../lib/router";
import { toast } from "../../lib/toast";

export default function Today() {
  const today = isoDate();
  const s = useStore((x) => x);
  const r = readiness(s);
  const due = dueCount(BANK.map((b) => b.id), s.cards, today);
  const plan = dailyPlan(today, s.settings.nextExam, weakestArea(r), due);
  const doneToday = s.log[today] ?? {};
  const nextExam = MILESTONES.find((m) => m.kind === "exam" && m.date >= today);
  const regs = MILESTONES.filter((m) => m.kind === "registration" && daysBetween(today, m.date) <= 30 && daysBetween(today, m.date) >= -14);
  const lesson = ofTheDay(LESSONS, today);
  const conn = ofTheDay(CONNECTORS, today, 3);
  const idiom = ofTheDay(IDIOMS, today, 7);
  const st = streak(s.log, today);
  const dateLabel = new Date().toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "long" });

  return (
    <Page title="Bon dia" subtitle={<span className="capitalize">{dateLabel} · ratxa de {st} {st === 1 ? "dia" : "dies"}</span>}>
      <div className="grid grid-cols-2 gap-3">
        <Stat value={nextExam ? daysBetween(today, nextExam.date) : "—"} label={nextExam ? `dies per a ${nextExam.title.toLowerCase().includes("oral") ? "l'oral" : "l'escrit"} del ${fmtShort(nextExam.date)}` : "sense exàmens"} />
        <Stat value={daysBetween(today, s.settings.goalExam)} label="dies per a l'objectiu: 2 d'octubre" />
      </div>
      {regs.map((m) => {
        const d = daysBetween(today, m.date);
        return (
          <div key={m.date + m.title} className="mt-3 rounded-2xl bg-warn/15 px-4 py-3.5">
            <b className="text-warn">{d > 0 ? `D'aquí a ${d} dies` : d === 0 ? "Avui" : `Des del ${fmtShort(m.date)}`}:</b> {m.title}.{" "}
            <ExtLink href={LINKS.goibCalendar}>Informació oficial</ExtLink>
          </div>
        );
      })}
      <div className="mt-3"><List><Row title="Calendari complet" detail="Inscripcions, exàmens i avisos al teu calendari" to="calendari" /></List></div>

      <Section title={`Sessió d'avui · ${plan.reduce((a, t) => a + t.minutes, 0)} min`}>
        <List>
          {plan.map((t) => (
            <Row key={t.key} title={t.title} detail={`${t.minutes} min · ${t.detail}`}
              left={<Check on={!!doneToday[t.key]} onClick={() => toggleDone(t.key, today)} label={`Marca «${t.title}» com a fet`} />}
              right={<button className="font-medium text-accent" onClick={() => go(t.key === "pindola" ? `lesson-${lesson.id}` : t.to)}>Obre</button>}
              chevron={false} />
          ))}
        </List>
      </Section>

      <Section title="Com vas per àrees">
        <Card className="space-y-3.5 p-4">
          {r.map((a) => (
            <div key={a.area}>
              <div className="mb-1 flex items-baseline justify-between gap-2 text-[15px]">
                <span className="font-medium">{a.label}</span>
                {a.score === null ? <Pill tone="muted">Sense dades</Pill> : <Pill tone={a.score >= 60 ? "good" : "warn"}>{a.score} / 100</Pill>}
              </div>
              <Bar value={a.score ?? 0} tone={a.score !== null && a.score >= 60 ? "good" : "warn"} />
              <div className="mt-1 text-[12.5px] text-muted">{a.evidence}</div>
            </div>
          ))}
          <p className="text-[13px] text-muted">Cal un 60 a cada àrea. Estimació orientativa feta amb la teva activitat recent.</p>
        </Card>
      </Section>

      <Section title="Píndola del dia">
        <List><Row left={<Icon>{lesson.area[0]}</Icon>} title={lesson.title} detail={`${lesson.area} · 2 minuts`} to={`lesson-${lesson.id}`} /></List>
      </Section>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Connector del dia</div>
          <div className="mt-2 text-[22px] font-bold tracking-tight">{conn.term}</div>
          <div className="text-[13.5px] text-muted">{conn.use}</div>
          <div className="mt-1.5">{conn.example}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[13px] font-semibold uppercase tracking-wider text-muted">Frase feta del dia</div>
          <div className="mt-2 text-[22px] font-bold tracking-tight">{idiom.expr}</div>
          <div className="text-muted">{idiom.meaning}</div>
        </Card>
      </div>

      <Backup />
    </Page>
  );
}

function Backup() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const copy = async () => {
    const c = exportCode(getState());
    try { await navigator.clipboard.writeText(c); toast("Codi copiat"); } catch { setCode(c); setOpen(true); toast("Selecciona i copia el codi"); }
  };
  const doImport = () => {
    try { const next = importCode(code); setState(() => next); toast("Progrés importat"); setOpen(false); }
    catch { toast("El codi no és vàlid"); }
  };
  return (
    <Section title="Les teves dades">
      <Card className="space-y-3 p-4 text-[14px]">
        <p className="text-muted">El progrés es desa en aquest dispositiu. Per continuar en un altre, copia el codi aquí i enganxa'l allà.</p>
        <div className="flex flex-wrap gap-2">
          <Btn variant="soft" onClick={copy}>Copia el codi de progrés</Btn>
          <Btn variant="soft" onClick={() => setOpen(true)}>Enganxa un codi</Btn>
        </div>
        {open && (
          <div className="space-y-2">
            <textarea id="backup-code" aria-label="Codi de progrés" rows={3} value={code} onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl bg-bg p-3 font-mono text-xs" />
            <Btn onClick={doImport}>Importa</Btn>
          </div>
        )}
      </Card>
    </Section>
  );
}
