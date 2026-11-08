import { Page, Section, List, Row, Icon, Pill } from "../../components/ui";
import { useStore } from "../../lib/store";
import { BANK, EXAMS, CONNECTORS } from "../../content";
import { dueCount, mastered } from "../../lib/srs";
import { isoDate } from "../../lib/dates";

export default function Practice() {
  const s = useStore((x) => x);
  const ids = BANK.map((b) => b.id);
  const today = isoDate();
  const due = dueCount(ids, s.cards, today);
  const recent = s.quizzes.slice(-5).reverse();
  return (
    <Page title="Practica" subtitle="Àrea 2 del GOIB: 30 preguntes en 40 minuts; cal encertar-ne 18.">
      <List>
        <Row left={<Icon>A2</Icon>} title="Repàs espaiat · 10 preguntes" detail={`${due} et toquen avui · ${mastered(ids, s.cards)} de ${ids.length} dominades`} to="test" />
        <Row left={<Icon tone="fg">IA</Icon>} title="Preguntes noves amb IA" detail="10 preguntes inèdites sobre els teus punts febles" to="test-ia" />
        <Row left={<Icon tone="bad">⏱</Icon>} title="Simulacre de l'Àrea 2" detail="15 o 30 preguntes amb rellotge, com a l'examen" to="simulacre" />
      </List>
      <Section title="Jocs">
        <List>
          <Row left={<Icon tone="good">FF</Icon>} title="Emparella frases fetes" detail={s.games.match !== undefined ? `Rècord: ${s.games.match} errors` : "Expressió ↔ significat"} to="joc-frases" />
          <Row left={<Icon tone="bad">✕</Icon>} title="Correcte o barbarisme?" detail={s.games.barb !== undefined ? `Rècord: ${s.games.barb}/10` : "Decideix ràpid"} to="joc-barbarismes" />
          <Row left={<Icon tone="warn">→</Icon>} title="Targetes de connectors" detail={`${CONNECTORS.length} connectors per a la redacció i l'oral`} to="connectors" />
        </List>
      </Section>
      <Section title="Comprensió oral">
        <List><Row left={<Icon tone="warn">♪</Icon>} title="Àudios oficials del GOIB" detail={`${Object.keys(s.audios).length} de ${EXAMS.length} convocatòries fetes`} to="audios" /></List>
      </Section>
      {recent.length > 0 && (
        <Section title="Últims resultats">
          <List>
            {recent.map((q) => (
              <Row key={q.at} title={<span className="tabular">{q.ok} de {q.n}</span>}
                detail={`${q.kind === "exam" ? "Simulacre" : q.kind === "ai" ? "Preguntes IA" : "Repàs"} · ${new Date(q.at).toLocaleDateString("ca-ES", { day: "numeric", month: "short" })}`}
                right={<Pill tone={q.ok / q.n >= 0.6 ? "good" : "warn"}>{Math.round((q.ok / q.n) * 100)} %</Pill>} />
            ))}
          </List>
        </Section>
      )}
    </Page>
  );
}
