import { Page, Section, List, Row, Check, Pill, Card, ExtLink, Note } from "../../components/ui";
import { EXAMS, LINKS } from "../../content";
import { useStore, setState, markDone } from "../../lib/store";
import { isoDate } from "../../lib/dates";

export default function Audios() {
  const done = useStore((s) => s.audios);
  const toggle = (id: string) => {
    const on = !done[id];
    setState((s) => { const a = { ...s.audios }; if (on) a[id] = isoDate(); else delete a[id]; return { ...s, audios: a }; });
    if (on) markDone("comprensio");
  };
  return (
    <Page title="Àudios oficials" subtitle="Cada convocatòria té dos àudios de comprensió oral i el PDF amb les preguntes." back={{ to: "practica", label: "Practica" }}>
      <Card className="bg-accent/10 p-4 text-[14.5px]">Obre el PDF, llegeix les preguntes de l'Àrea 1, escolta l'àudio dues vegades i respon en paper. Comprova-ho amb el solucionari. Guarda les convocatòries 2025-2026 per als simulacres complets.</Card>
      <Section title="Convocatòries">
        <List>
          {EXAMS.map((e) => (
            <Row key={e.id} chevron={false}
              left={<Check on={!!done[e.label]} onClick={() => toggle(e.label)} label={`Marca ${e.label} com a feta`} />}
              title={e.label}
              detail={<span className="flex flex-wrap gap-x-4 gap-y-1">{e.note}<ExtLink href={e.pdf}>PDF</ExtLink><ExtLink href={e.audio1}>Àudio 1</ExtLink><ExtLink href={e.audio2}>Àudio 2</ExtLink></span>}
              right={e.reserved ? <Pill tone="warn">Simulacre</Pill> : undefined} />
          ))}
        </List>
      </Section>
      <Note>Els enllaços obren la web del Govern. <ExtLink href={LINKS.goibExams}>Totes les proves</ExtLink></Note>
    </Page>
  );
}
