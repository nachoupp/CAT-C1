import { useState } from "react";
import { Page, Section, List, Row, Check, Pill, Card, ExtLink, Note } from "../../components/ui";
import { AudioPlayer } from "../../components/AudioPlayer";
import { EXAMS, LINKS } from "../../content";
import { useStore, setState, award } from "../../lib/store";
import { isoDate } from "../../lib/dates";
import { ListeningList } from "./Listen";

export default function Audios() {
  const done = useStore((s) => s.audios);
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (id: string) => {
    const on = !done[id];
    setState((s) => { const a = { ...s.audios }; if (on) a[id] = isoDate(); else delete a[id]; return { ...s, audios: a }; });
    if (on) award("practice", "comprensio");
  };
  return (
    <Page title="Àudios" subtitle="Escoltes de pràctica, dictats i els àudios oficials, tot amb el reproductor de l'app." back={{ to: "practica", label: "Practica" }}>
      <Section title="Escoltes de pràctica (tipus Àrea 1)">
        <ListeningList />
      </Section>
      <Section title="Dictat">
        <List><Row title="Dictat amb veu natural" detail="Escolta, escriu i compara paraula per paraula" to="dictat" /></List>
      </Section>
      <Section title="Àudios oficials del GOIB">
        <Card className="mb-2 bg-accent/10 p-4 text-[14.5px]">Obre el PDF, llegeix les preguntes de l'Àrea 1, escolta l'àudio dues vegades i respon en paper. Comprova-ho amb el solucionari. Guarda les convocatòries 2025-2026 per als simulacres complets.</Card>
        <List>
          {EXAMS.map((e) => (
            <div key={e.id}>
              <Row chevron={false}
                left={<Check on={!!done[e.label]} onClick={() => toggle(e.label)} label={`Marca ${e.label} com a feta`} />}
                title={e.label}
                detail={<span className="flex flex-wrap gap-x-4 gap-y-1">{e.note}<ExtLink href={e.pdf}>PDF</ExtLink><button className="font-medium text-accent" onClick={() => setOpen(open === e.id ? null : e.id)}>{open === e.id ? "Amaga els àudios" : "▶ Escolta aquí"}</button></span>}
                right={e.reserved ? <Pill tone="warn">Simulacre</Pill> : undefined} />
              {open === e.id && (
                <div className="space-y-3 px-4 pb-4">
                  <AudioPlayer src={e.audio1} label="Àudio 1" maxPlays={2} />
                  <AudioPlayer src={e.audio2} label="Àudio 2" maxPlays={2} />
                </div>
              )}
            </div>
          ))}
        </List>
      </Section>
      <Note>Els àudios oficials es carreguen des de la web del Govern. <ExtLink href={LINKS.goibExams}>Totes les proves</ExtLink></Note>
    </Page>
  );
}
