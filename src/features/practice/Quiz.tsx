import { useEffect, useMemo, useState } from "react";
import { Page, Card, Btn, Bar, Pill, Note } from "../../components/ui";
import { BANK } from "../../content";
import { getState, setState, markDone } from "../../lib/store";
import { grade, pickForSession } from "../../lib/srs";
import { isoDate } from "../../lib/dates";
import { askJSON, AiError } from "../../lib/ai";
import { go } from "../../lib/router";
import { fromBank, fromGenerated, type GeneratedQ, type QuizItem } from "./items";

export function QuestionCard({ item, chosen, onChoose }: { item: QuizItem; chosen: string | null; onChoose: (o: string) => void }) {
  return (
    <Card className="p-4">
      <div className="mb-4 text-[19px] font-semibold leading-snug text-balance">{item.prompt}</div>
      <div className="space-y-2">
        {item.options.map((o) => {
          const state = chosen === null ? "" : o === item.answer ? "bg-good/15 text-good font-semibold" : o === chosen ? "bg-bad/10 text-bad" : "opacity-60";
          return (
            <button key={o} disabled={chosen !== null} onClick={() => onChoose(o)} className={`block w-full rounded-xl bg-bg px-4 py-3.5 text-left ${state}`}>{o}</button>
          );
        })}
      </div>
      {chosen !== null && item.explanation && <div className="mt-4 rounded-xl bg-accent/10 px-3.5 py-3 text-[15px]">{item.explanation}</div>}
    </Card>
  );
}

function weakTopics(): string[] {
  const s = getState();
  return Object.entries(s.cards).filter(([, c]) => c.wrong > 0).sort((a, b) => b[1].wrong - a[1].wrong).slice(0, 6)
    .map(([id]) => BANK.find((b) => b.id === id)?.explanation).filter((x): x is string => !!x);
}

export default function Quiz({ ai = false }: { ai?: boolean }) {
  const initial = useMemo<QuizItem[] | null>(() => {
    if (ai) return null;
    const s = getState();
    return pickForSession(BANK.map((b) => b.id), s.cards, 10, isoDate()).map((id) => fromBank(BANK.find((b) => b.id === id)!));
  }, [ai]);
  const [items, setItems] = useState<QuizItem[] | null>(initial);
  const [err, setErr] = useState<string | null>(null);
  const [k, setK] = useState(0);
  const [ok, setOk] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    if (!ai) return;
    let alive = true;
    const topics = weakTopics();
    askJSON<GeneratedQ[]>(`Crea 10 preguntes noves de tria múltiple per a l'Àrea 2 (domini pràctic del sistema lingüístic) del certificat C1 de català del Govern de les Illes Balears.
Temes a reforçar: ${topics.length ? topics.join(" | ") : "pronoms febles, preposicions, barbarismes, ortografia, lèxic i frases fetes, registre"}.
Cada pregunta: una frase amb un buit (___) o una pregunta breu, 3 opcions i només una de correcta segons la normativa de l'IEC (formes balears acceptades), més una explicació breu en castellà.
Respon NOMÉS amb un array JSON: [{"q":"...","ok":"opció correcta","no":["distractor","distractor"],"e":"explicació"}]`)
      .then((arr) => {
        const qs = (Array.isArray(arr) ? arr : []).map(fromGenerated).filter((x): x is QuizItem => !!x).slice(0, 10);
        if (!alive) return;
        if (qs.length < 3) setErr("La IA no ha generat prou preguntes vàlides. Torna-ho a provar.");
        else setItems(qs);
      })
      .catch((e) => { if (alive) setErr(e instanceof AiError ? e.message : "No s'ha pogut generar el test."); });
    return () => { alive = false; };
  }, [ai]);

  const back = { to: "practica", label: "Practica" };
  if (err) return <Page title="Preguntes amb IA" back={back}><Card className="p-4">{err}</Card></Page>;
  if (!items) return <Page title="Preguntes amb IA" back={back}><Card className="p-4 text-muted">Creant 10 preguntes sobre els teus punts febles… pot trigar uns segons.</Card></Page>;

  if (k >= items.length) {
    const pct = ok / items.length;
    return (
      <Page title="Resultat" back={back}>
        <Card className="space-y-3 p-6 text-center">
          <div className="text-[48px] font-bold tabular">{ok}/{items.length}</div>
          <Pill tone={pct >= 0.6 ? "good" : "warn"}>{pct >= 0.6 ? "Per sobre del 60 %" : "Per sota del 60 %"}</Pill>
          <p className="text-muted">{ai ? "Les preguntes d'IA no entren al repàs espaiat." : "Les que has fallat tornaran demà; les encertades, més endavant."}</p>
          <div className="flex justify-center gap-2"><Btn onClick={() => location.reload()}>Un altre</Btn><Btn variant="soft" onClick={() => go("practica")}>Tornar</Btn></div>
        </Card>
      </Page>
    );
  }

  const item = items[k];
  const choose = (o: string) => {
    const right = o === item.answer;
    setChosen(o);
    if (right) setOk((x) => x + 1);
    if (item.id) { const id = item.id; setState((s) => ({ ...s, cards: { ...s.cards, [id]: grade(s.cards[id], right, isoDate()) } })); }
  };
  const next = () => {
    const last = k + 1 >= items.length;
    if (last) {
      const total = ok;
      setState((s) => ({ ...s, quizzes: [...s.quizzes, { at: Date.now(), ok: total, n: items.length, kind: ai ? ("ai" as const) : ("practice" as const) }].slice(-200) }));
      markDone("repas");
    }
    setK(k + 1); setChosen(null);
  };
  return (
    <Page title={ai ? "Preguntes amb IA" : "Repàs espaiat"} back={back}>
      <div className="mb-2 text-[13.5px] text-muted tabular">Pregunta {k + 1} de {items.length}</div>
      <Bar value={(k / items.length) * 100} />
      <div className="mt-4"><QuestionCard item={item} chosen={chosen} onChoose={choose} /></div>
      {chosen !== null && <div className="mt-4"><Btn block onClick={next}>Continua</Btn></div>}
      {ai && <Note>Preguntes generades per IA: si en veus una de dubtosa, consulta-la al DIEC.</Note>}
    </Page>
  );
}
