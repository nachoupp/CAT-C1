import { useEffect } from "react";
import { Page, Section, List, Row, Check, Card, Btn, Note } from "../../components/ui";
import { LESSONS } from "../../content";
import { useStore, setState } from "../../lib/store";
import { isoDate } from "../../lib/dates";
import { AudioPlayer } from "../../components/AudioPlayer";
import { go } from "../../lib/router";
import { TIPS } from "../../content/tips";

export { Dictionary } from "./Dictionary";
import { Dictionary } from "./Dictionary";

export default function Learn() {
  const read = useStore((s) => s.lessons);
  const areas = [...new Set(LESSONS.map((l) => l.area))];
  return (
    <Page title="Aprèn" subtitle={`Píndoles de 2 minuts · ${Object.keys(read).length} de ${LESSONS.length} llegides`}>
      <Dictionary />
      <Section title="Trucs i mètodes d'estudi">
        <Card className="divide-y divide-line">
          {TIPS.map((t) => (
            <details key={t.title} className="group px-4 py-3">
              <summary className="cursor-pointer list-none text-[15.5px] font-semibold">{t.title}</summary>
              <p className="mt-1.5 text-[14.5px]">{t.why}</p>
              <ul className="mt-1.5 list-disc space-y-0.5 pl-5 text-[14px] text-muted">{t.how.map((h) => <li key={h}>{h}</li>)}</ul>
            </details>
          ))}
        </Card>
      </Section>
      {areas.map((a) => (
        <Section key={a} title={a}>
          <List>
            {LESSONS.filter((l) => l.area === a).map((l) => (
              <Row key={l.id} left={<Check on={!!read[l.id]} label={read[l.id] ? "Llegida" : "Pendent"} />} title={l.title} to={`lesson-${l.id}`} />
            ))}
          </List>
        </Section>
      ))}
    </Page>
  );
}

export function LessonView({ id }: { id: string }) {
  const i = LESSONS.findIndex((l) => l.id === id);
  const l = LESSONS[i];
  useEffect(() => {
    if (l) setState((s) => (s.lessons[l.id] ? s : { ...s, lessons: { ...s.lessons, [l.id]: isoDate() } }));
  }, [l]);
  if (!l) return <Page title="No trobada" back={{ to: "quadern", label: "Quadern" }}><Note>Aquesta píndola no existeix.</Note></Page>;
  const next = LESSONS[(i + 1) % LESSONS.length];
  return (
    <Page title={l.title} subtitle={l.area} back={{ to: "quadern", label: "Quadern" }}>
      {/* Contingut propi de l'app (no prové de l'usuari) */}
      <Card className="prose-lesson p-4 text-[17px] leading-relaxed"><div dangerouslySetInnerHTML={{ __html: l.html }} /></Card>
      {l.example && (
        <Section title="Exemple">
          <Card className="space-y-3 p-4">
            <div className="text-[19px] font-bold tracking-tight">{l.example}</div>
            <AudioPlayer text={l.example} />
          </Card>
        </Section>
      )}
      <div className="mt-5"><Btn block onClick={() => go(`lesson-${next.id}`)}>Següent: {next.title}</Btn></div>
    </Page>
  );
}
