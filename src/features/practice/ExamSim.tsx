import { useEffect, useMemo, useState } from "react";
import { Page, Card, Btn, Bar, Pill, Segmented, List, Row } from "../../components/ui";
import { BANK } from "../../content";
import { setState, award } from "../../lib/store";
import { grade } from "../../lib/srs";
import { isoDate } from "../../lib/dates";
import { shuffle, fmtClock } from "../../lib/text";
import { fromBank, type QuizItem } from "./items";

type Len = "15" | "30";

export default function ExamSim() {
  const [len, setLen] = useState<Len>("15");
  const [started, setStarted] = useState(false);
  if (!started) {
    return (
      <Page title="Simulacre Àrea 2" subtitle="Sense correccions fins al final, amb el temps de l'examen." back={{ to: "practica", label: "Practica" }}>
        <Card className="space-y-4 p-4">
          <Segmented value={len} onChange={setLen} options={[{ value: "15", label: "15 preguntes · 20 min" }, { value: "30", label: "30 preguntes · 40 min" }]} />
          <p className="text-[15px] text-muted">Per aprovar l'àrea cal un 60 % (18 de 30). Fes primer les que saps i torna als dubtes al final.</p>
          <Btn block onClick={() => setStarted(true)}>Comença</Btn>
        </Card>
      </Page>
    );
  }
  return <Run n={+len} />;
}

function Run({ n }: { n: number }) {
  const items = useMemo<QuizItem[]>(() => shuffle(BANK).slice(0, n).map(fromBank), [n]);
  const [answers, setAnswers] = useState<(string | null)[]>(() => items.map(() => null));
  const [k, setK] = useState(0);
  const [left, setLeft] = useState(n * 80);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setLeft((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [done]);

  const finish = () => {
    if (done) return;
    setDone(true);
    const ok = items.filter((it, i) => answers[i] === it.answer).length;
    const today = isoDate();
    setState((s) => {
      const cards = { ...s.cards };
      items.forEach((it, i) => { if (it.id && answers[i] !== null) cards[it.id] = grade(cards[it.id], answers[i] === it.answer, today); });
      return { ...s, cards, quizzes: [...s.quizzes, { at: Date.now(), ok, n, kind: "exam" as const }].slice(-200) };
    });
    award("quiz", "simulacre-a2");
  };
  useEffect(() => { if (left <= 0) finish(); });

  const back = { to: "practica", label: "Practica" };
  if (done) {
    const ok = items.filter((it, i) => answers[i] === it.answer).length;
    const pct = ok / n;
    return (
      <Page title="Resultat del simulacre" back={back}>
        <Card className="space-y-2 p-6 text-center">
          <div className="text-[48px] font-bold tabular">{ok}/{n}</div>
          <Pill tone={pct >= 0.6 ? "good" : "warn"}>{pct >= 0.6 ? "Aprovaries l'àrea" : `Et falten ${Math.ceil(n * 0.6) - ok} encerts`}</Pill>
        </Card>
        <div className="mt-6"><List>
          {items.map((it, i) => (
            <Row key={i} title={it.prompt}
              detail={answers[i] === it.answer ? `✓ ${it.answer}` : `${answers[i] ? "✗ " + answers[i] + " · " : "En blanc · "}Correcta: ${it.answer}. ${it.explanation}`} />
          ))}
        </List></div>
      </Page>
    );
  }
  const answered = answers.filter((a) => a !== null).length;
  return (
    <Page title="Simulacre" back={back}>
      <div className="mb-2 flex items-center justify-between text-[14px] tabular">
        <span className="text-muted">Pregunta {k + 1} de {n} · {answered} respostes</span>
        <span className={`font-semibold ${left < 120 ? "text-bad" : ""}`}>{fmtClock(left)}</span>
      </div>
      <Bar value={(answered / n) * 100} />
      <Card className="mt-4 p-4">
        <div className="mb-4 text-[19px] font-semibold leading-snug">{items[k].prompt}</div>
        <div className="space-y-2">
          {items[k].options.map((o) => (
            <button key={o} onClick={() => setAnswers((a) => a.map((x, i) => (i === k ? o : x)))}
              className={`block w-full rounded-xl px-4 py-3.5 text-left ${answers[k] === o ? "bg-accent/15 font-semibold text-accent" : "bg-bg"}`}>{o}</button>
          ))}
        </div>
      </Card>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Btn variant="soft" disabled={k === 0} onClick={() => setK(k - 1)}>Anterior</Btn>
        {k + 1 < n ? <Btn onClick={() => setK(k + 1)}>Següent</Btn> : <Btn variant="good" onClick={finish}>Lliura</Btn>}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Navegació de preguntes">
        {items.map((_, i) => (
          <button key={i} onClick={() => setK(i)} aria-label={`Pregunta ${i + 1}`}
            className={`size-8 rounded-lg text-xs font-semibold tabular ${i === k ? "bg-accent text-white" : answers[i] ? "bg-accent/15 text-accent" : "bg-card text-muted"}`}>{i + 1}</button>
        ))}
      </div>
    </Page>
  );
}
