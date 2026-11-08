import { useEffect, useState } from "react";
import { Page, Section, Card, Btn, Segmented } from "../../components/ui";
import { ORAL, ofTheDay } from "../../content";
import { isoDate } from "../../lib/dates";
import { fmtClock } from "../../lib/text";
import { canSpeak, speak } from "../../lib/speech";
import { award } from "../../lib/store";
import { toast } from "../../lib/toast";

type Dur = "120" | "180" | "300";

export default function OralTimer() {
  const today = isoDate();
  const topic = ofTheDay(ORAL.topics, today);
  const text = ofTheDay(ORAL.readings, today, 1);
  const [dur, setDur] = useState<Dur>("180");
  const [left, setLeft] = useState(180);
  const [run, setRun] = useState(false);
  useEffect(() => { setLeft(+dur); setRun(false); }, [dur]);
  useEffect(() => {
    if (!run) return;
    if (left <= 0) { setRun(false); toast("Temps!"); award("practice", "exposicio"); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [run, left]);
  return (
    <Page title="Lectura i exposició" subtitle="Grava't amb el mòbil per escoltar-te després." back={{ to: "parla", label: "Parla" }}>
      <Section title="1 · Lectura en veu alta · 1 min">
        <Card className="space-y-3 p-4">
          <p className="text-[18px] leading-relaxed">{text}</p>
          {canSpeak() && <Btn variant="soft" onClick={() => speak(text)}>Escolta el model</Btn>}
        </Card>
      </Section>
      <Section title="2 · Intervenció individual">
        <Card className="space-y-4 p-4">
          <div className="text-[22px] font-bold tracking-tight">{topic}</div>
          <p className="text-[14px] text-muted">Introducció amb la teva opinió → 2 arguments amb exemples → contraargument → conclusió. Fes servir: en primer lloc, a més a més, ara bé, en definitiva.</p>
          <div className="text-center text-[56px] font-bold tracking-tight tabular">{fmtClock(left)}</div>
          <Segmented value={dur} onChange={setDur} options={[{ value: "120", label: "2 min" }, { value: "180", label: "3 min" }, { value: "300", label: "5 min" }]} />
          <div className="grid grid-cols-2 gap-2">
            <Btn onClick={() => setRun(!run)}>{run ? "Pausa" : "Comença"}</Btn>
            <Btn variant="soft" onClick={() => { setRun(false); setLeft(+dur); }}>Reinicia</Btn>
          </div>
        </Card>
      </Section>
    </Page>
  );
}
