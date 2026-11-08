import { useMemo, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Bar, Note, Icon } from "../../components/ui";
import { useStore, setState, award } from "../../lib/store";
import { alive, dueErrors, reviewError } from "../../lib/notebook";
import { isCorrect } from "../../lib/errors";
import { isoDate } from "../../lib/dates";
import { LESSONS } from "../../content";
import { go } from "../../lib/router";
import { Dictionary } from "../learn/Learn";

export default function Notebook() {
  const s = useStore((x) => x);
  const today = isoDate();
  const live = alive(s);
  const due = dueErrors(s, today);
  const total = s.notebook.length;
  const areas = [...new Set(LESSONS.map((l) => l.area))];
  return (
    <Page title="Quadern" subtitle="Els teus errors, les píndoles i el diccionari">
      <Card className="space-y-3 p-4">
        <div className="flex items-baseline justify-between"><span className="font-semibold">Errors vius</span><span className="text-[28px] font-bold tabular">{live.length}</span></div>
        <Bar value={total ? ((total - live.length) / total) * 100 : 0} tone="good" />
        <div className="text-[13.5px] text-muted">{total ? `${total - live.length} de ${total} errors dominats. Un error es considera dominat quan l'encertes tres vegades seguides en dies diferents.` : "Quan facis exercicis o escriguis, els errors s'hi aniran guardant."}</div>
        <Btn block disabled={!due.length} onClick={() => go("repas")}>{due.length ? `Repassa ${Math.min(due.length, 15)} errors` : "No tens errors per repassar avui"}</Btn>
      </Card>
      {live.length > 0 && (
        <Section title="Errors més freqüents">
          <List>{[...live].sort((a, b) => b.count - a.count).slice(0, 12).map((e) => (
            <Row key={e.id} title={<><s className="text-bad">{e.wrong}</s> → <b className="text-good">{e.right}</b></>} detail={e.note}
              right={<Pill tone={e.count > 2 ? "warn" : "muted"}>×{e.count}</Pill>} onClick={e.link ? () => go(e.link!.startsWith("u") ? `unit-${e.link}` : `lesson-${e.link}`) : undefined} chevron={!!e.link} />
          ))}</List>
        </Section>
      )}
      <Section title="Diccionari"><Dictionary /></Section>
      {areas.map((a) => (
        <Section key={a} title={`Píndoles · ${a}`}>
          <List>{LESSONS.filter((l) => l.area === a).map((l) => <Row key={l.id} left={<Icon tone={s.lessons[l.id] ? "good" : "sist"}>{s.lessons[l.id] ? "✓" : "i"}</Icon>} title={l.title} to={`lesson-${l.id}`} />)}</List>
        </Section>
      ))}
    </Page>
  );
}

export function Review() {
  const s = useStore((x) => x);
  const today = isoDate();
  const queue = useMemo(() => dueErrors(s, today).slice(0, 15), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [k, setK] = useState(0);
  const [given, setGiven] = useState("");
  const [res, setRes] = useState<boolean | null>(null);
  const [ok, setOk] = useState(0);
  const back = { to: "quadern", label: "Quadern" };
  if (!queue.length) return <Page title="Repàs d'errors" back={back}><Note>No tens errors pendents de repàs avui. Bona feina!</Note></Page>;
  if (k >= queue.length) {
    return (
      <Page title="Repàs fet" back={back}>
        <Card className="pop space-y-3 p-6 text-center"><div className="text-[44px] font-bold tabular">{ok}/{queue.length}</div><div className="text-muted">Els que has fallat tornaran demà.</div><Btn onClick={() => go("ruta")}>Torna a la ruta</Btn></Card>
      </Page>
    );
  }
  const e = queue[k];
  const check = () => {
    if (!given.trim()) return;
    const right = isCorrect(given, e.right.split(/\s*\/\s*/));
    setRes(right); if (right) setOk(ok + 1);
    setState((x) => reviewError(x, e.id, right, today));
  };
  const next = () => {
    if (k + 1 >= queue.length) award("review", "repas");
    setK(k + 1); setGiven(""); setRes(null);
  };
  return (
    <Page title="Repàs d'errors" subtitle={`${k + 1} de ${queue.length}`} back={back}>
      <Bar value={(k / queue.length) * 100} />
      <Card className="mt-4 space-y-4 p-5">
        <div className="text-[13.5px] text-muted">Vas escriure això. Com és correcte?</div>
        <div className="text-[26px] font-bold text-bad"><s>{e.wrong}</s></div>
        <form onSubmit={(ev) => { ev.preventDefault(); if (res === null) check(); else next(); }} className="space-y-2">
          <input id="review-answer" aria-label="Forma correcta" value={given} onChange={(ev) => setGiven(ev.target.value)} disabled={res !== null} autoComplete="off" autoCapitalize="none" spellCheck={false}
            className={`w-full rounded-xl px-4 py-3.5 text-[18px] ${res === null ? "bg-bg" : res ? "bg-good/15 text-good" : "bg-bad/10 text-bad"}`} placeholder="Forma correcta…" />
          {res !== null && <div className="rounded-xl bg-accent/10 px-3.5 py-3 text-[15px]"><b>{res ? "Correcte." : `Correcta: ${e.right}.`}</b> {e.note}</div>}
          <Btn type="submit" block disabled={!given.trim() && res === null}>{res === null ? "Comprova" : "Continua"}</Btn>
        </form>
      </Card>
    </Page>
  );
}
