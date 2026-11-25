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
    <Page title="Practica" subtitle="Entrenes una habilitat quan vols, sense nota ni rellotge. Per examinar-te de debò, ves a Exàmens.">
      <List>
        <Row left={<Icon tone="sist">🎓</Icon>} title="Profe IA" detail="Pregunta un dubte, demana exercicis dels teus errors o fes-li corregir una frase" to="profe" />
      </List>

      <Section title="Gramàtica i vocabulari">
        <List>
          <Row left={<Icon>A2</Icon>} title="Repàs espaiat · 10 preguntes" detail={`${due} et toquen avui · ${mastered(ids, s.cards)} de ${ids.length} dominades`} to="test" />
          <Row left={<Icon tone="fg">IA</Icon>} title="Preguntes noves amb IA" detail="10 preguntes inèdites sobre els teus punts febles" to="test-ia" />
          <Row left={<Icon tone="good">FF</Icon>} title="Emparella frases fetes" detail={s.games.match !== undefined ? `Rècord: ${s.games.match} errors` : "Joc de parelles"} to="joc-frases" />
          <Row left={<Icon tone="bad">✕</Icon>} title="Correcte o barbarisme?" detail={s.games.barb !== undefined ? `Rècord: ${s.games.barb}/10` : "Decideix ràpid"} to="joc-barbarismes" />
          <Row left={<Icon tone="good">✎</Icon>} title="Gramàtica a fons" detail="Pronoms febles explicats pas a pas, amb exercicis" to="gramatica" />
        <Row left={<Icon tone="warn">→</Icon>} title="Targetes de connectors" detail={`${CONNECTORS.length} connectors per a la redacció i l'oral`} to="connectors" />
        </List>
      </Section>

      <Section title="Escriure">
        <List>
          <Row left={<Icon tone="escr">✎</Icon>} title="Escriu lliure" detail="Consignes tipus examen o la teva, amb guia d'estil i correcció en directe" to="escriu" />
          <Row left={<Icon tone="escr">⌗</Icon>} title="Escaneja i corregeix" detail="Foto d'un text a mà o imprès: el llegeixo i el corregeixo" to="escaneja" />
        </List>
      </Section>

      <Section title="Parlar">
        <List>
          <Row left={<Icon tone="oral">💬</Icon>} title="Conversa en veu" detail="Parles amb el micro, t'respon amb veu i al final et corregeix" to="conversa" />
          <Row left={<Icon tone="oral">🎙</Icon>} title="Grava't i et corregeixo" detail="L'app t'escolta i et corregeix l'oral com a l'examen" to="escolta" />
          <Row left={<Icon tone="oral">◉</Icon>} title="Parla amb l'interlocutor" detail="4 situacions d'examen amb avaluació" to="parla" />
          <Row left={<Icon tone="comp">▶</Icon>} title="Lectura i exposició amb rellotge" detail="Sense IA" to="oral" />
        </List>
      </Section>

      <Section title="Escoltar">
        <List>
          <Row left={<Icon tone="comp">♪</Icon>} title="Àudios i dictats" detail={`Escoltes amb preguntes, dictats i els àudios oficials del GOIB (${Object.keys(s.audios).length} de ${EXAMS.length} convocatòries fetes)`} to="audios" />
        </List>
      </Section>

      <Section title="Per imprimir">
        <List>
          <Row left={<Icon tone="fg">▤</Icon>} title="Fitxes en paper" detail="Diagnòstic inicial i fitxes per fer a mà" to="fitxes" />
        </List>
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
