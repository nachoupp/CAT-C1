import { useMemo, useState } from "react";
import { Page, Card, Btn, Bar } from "../../components/ui";
import { IDIOMS, BARBARISMS, CONNECTORS } from "../../content";
import { setState, award } from "../../lib/store";
import { shuffle } from "../../lib/text";
import { go } from "../../lib/router";

const back = { to: "practica", label: "Practica" };

export function MatchGame() {
  const [round, setRound] = useState(0);
  const set = useMemo(() => shuffle(IDIOMS).slice(0, 5), [round]);
  const right = useMemo(() => shuffle(set.map((x) => x.meaning)), [set]);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [sel, setSel] = useState<{ side: "L" | "R"; v: string } | null>(null);
  const [bad, setBad] = useState<string[]>([]);
  const [err, setErr] = useState(0);

  const pick = (side: "L" | "R", v: string) => {
    setBad([]);
    if (!sel || sel.side === side) { setSel({ side, v }); return; }
    const expr = side === "L" ? v : sel.v;
    const meaning = side === "R" ? v : sel.v;
    const pair = set.find((x) => x.expr === expr);
    setSel(null);
    if (pair && pair.meaning === meaning) {
      const nd = new Set(done); nd.add(expr); setDone(nd);
      if (nd.size === set.length) {
        setState((s) => ({ ...s, games: { ...s.games, match: s.games.match === undefined ? err : Math.min(s.games.match, err) } }));
        award("quiz", "joc");
      }
    } else { setErr(err + 1); setBad([expr, meaning]); }
  };
  const finished = done.size === set.length;
  const tile = (side: "L" | "R", v: string, isDone: boolean) => (
    <button key={v} disabled={isDone} onClick={() => pick(side, v)}
      className={`min-h-16 w-full rounded-xl px-3 py-3 text-center text-[15px] ${isDone ? "bg-good/15 text-good" : sel?.v === v ? "bg-accent/15 font-semibold text-accent" : bad.includes(v) ? "bg-bad/10" : "bg-card"}`}>{v}</button>
  );
  return (
    <Page title="Frases fetes" subtitle={`Toca una expressió i després el seu significat · errors: ${err}`} back={back}>
      {finished ? (
        <Card className="space-y-3 p-6 text-center">
          <div className="text-[44px] font-bold tabular">{err}</div><div className="text-muted">errors</div>
          <Btn onClick={() => { setRound(round + 1); setDone(new Set()); setErr(0); }}>Una altra ronda</Btn>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">{set.map((x) => tile("L", x.expr, done.has(x.expr)))}</div>
          <div className="space-y-2">{right.map((m) => tile("R", m, set.some((x) => x.meaning === m && done.has(x.expr))))}</div>
        </div>
      )}
    </Page>
  );
}

export function BarbGame() {
  const [round, setRound] = useState(0);
  const items = useMemo(() => shuffle(BARBARISMS).slice(0, 10), [round]);
  const [k, setK] = useState(0);
  const [ok, setOk] = useState(0);
  const [ans, setAns] = useState<boolean | null>(null);
  if (k >= items.length) {
    return (
      <Page title="Resultat" back={back}>
        <Card className="space-y-3 p-6 text-center">
          <div className="text-[48px] font-bold tabular">{ok}/10</div>
          <div className="flex justify-center gap-2"><Btn onClick={() => { setRound(round + 1); setK(0); setOk(0); }}>Tornar a jugar</Btn><Btn variant="soft" onClick={() => go("practica")}>Sortir</Btn></div>
        </Card>
      </Page>
    );
  }
  const it = items[k];
  const answer = (v: boolean) => { setAns(v); if (v === it.correct) setOk(ok + 1); };
  const next = () => {
    if (k + 1 >= items.length) {
      const total = ok;
      setState((s) => ({ ...s, games: { ...s.games, barb: Math.max(s.games.barb ?? 0, total) } }));
      award("quiz", "joc");
    }
    setK(k + 1); setAns(null);
  };
  return (
    <Page title="Correcte o barbarisme?" back={back}>
      <div className="mb-2 text-[13.5px] text-muted tabular">{k + 1} de 10 · encerts {ok}</div>
      <Bar value={(k / 10) * 100} />
      <Card className="mt-4 p-6 text-center">
        <div className="text-[13.5px] text-muted">És correcte en català?</div>
        <div className="my-6 text-[40px] font-bold tracking-tight">{it.form}</div>
        {ans === null ? (
          <div className="grid grid-cols-2 gap-2"><Btn variant="good" onClick={() => answer(true)}>Correcte</Btn><Btn variant="bad" onClick={() => answer(false)}>Barbarisme</Btn></div>
        ) : (
          <div className="space-y-3 text-left">
            <div className="rounded-xl bg-accent/10 px-3.5 py-3"><b>{ans === it.correct ? "Encert." : "No."}</b> {it.correct ? "És una forma correcta." : <>És un barbarisme. Digues: <b>{it.fix}</b>.</>}</div>
            <Btn block onClick={next}>Continua</Btn>
          </div>
        )}
      </Card>
    </Page>
  );
}

export function Flashcards() {
  const [k, setK] = useState(0);
  const [flip, setFlip] = useState(false);
  const c = CONNECTORS[k];
  const move = (d: number) => { setK((k + d + CONNECTORS.length) % CONNECTORS.length); setFlip(false); };
  return (
    <Page title="Connectors" subtitle={`${k + 1} de ${CONNECTORS.length} · toca la targeta per girar-la`} back={back}>
      <button onClick={() => setFlip(!flip)} className="flex min-h-52 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-card p-6 text-center">
        {flip ? (<><div className="text-[13.5px] text-muted">{c.use}</div><div className="text-[19px] font-medium">{c.example}</div></>)
          : (<><div className="text-[30px] font-bold tracking-tight">{c.term}</div><div className="text-[13.5px] text-muted">Per a què serveix?</div></>)}
      </button>
      <div className="mt-3 grid grid-cols-2 gap-2"><Btn variant="soft" onClick={() => move(-1)}>Anterior</Btn><Btn onClick={() => move(1)}>Següent</Btn></div>
    </Page>
  );
}
