import { Page, Section, List, Row, Pill, Btn, Note, ExtLink } from "../../components/ui";
import { MILESTONES, LINKS } from "../../content";
import { daysBetween, isoDate, parseIso } from "../../lib/dates";
import { buildIcs } from "../../lib/ics";
import type { Milestone } from "../../lib/types";

const TAG: Record<Milestone["kind"], { tone: "accent" | "warn" | "muted"; label: string }> = {
  exam: { tone: "accent", label: "Examen" }, registration: { tone: "warn", label: "Inscripció" }, admin: { tone: "muted", label: "Tràmit" }
};

export default function CalendarView() {
  const today = isoDate();
  const upcoming = MILESTONES.filter((m) => m.date >= today);
  const past = MILESTONES.filter((m) => m.date < today);
  const years = [...new Set(upcoming.map((m) => m.date.slice(0, 4)))];
  const download = () => {
    const url = URL.createObjectURL(new Blob([buildIcs(MILESTONES)], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url; a.download = "calendari-C1-catala.ics"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const row = (m: Milestone) => {
    const d = parseIso(m.date);
    return (
      <Row key={m.date + m.title}
        left={<div className="w-12 flex-none text-center"><div className="text-[22px] font-bold leading-none tabular">{d.getDate()}</div><div className="text-[11px] uppercase text-muted">{d.toLocaleDateString("ca-ES", { month: "short" })}</div></div>}
        title={m.title} detail={m.detail}
        right={<div className="text-right"><Pill tone={TAG[m.kind].tone}>{TAG[m.kind].label}</Pill><div className="mt-1 text-[13px] text-muted tabular">{daysBetween(today, m.date)} d</div></div>} />
    );
  };
  return (
    <Page title="Calendari" subtitle="Convocatòries amb seu a Eivissa. Dates del 2027 segons la previsió oficial." back={{ to: "avui", label: "Avui" }}>
      {years.map((y) => <Section key={y} title={y}><List>{upcoming.filter((m) => m.date.startsWith(y)).map(row)}</List></Section>)}
      {past.length > 0 && <Section title="Ja passat"><List>{past.map(row)}</List></Section>}
      <div className="mt-5"><Btn block onClick={download}>Afegeix-ho al meu calendari</Btn></div>
      <Note>Descarrega un fitxer .ics amb avisos i obre'l amb Google Calendar o el calendari del mòbil. Les dates de l'EOI són aproximades fins que es publiquin al BOIB. <ExtLink href={LINKS.goibCalendar}>Calendari GOIB</ExtLink></Note>
    </Page>
  );
}
