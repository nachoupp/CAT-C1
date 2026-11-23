import { useEffect, useMemo, useState } from "react";
import { Page, Card, Btn, Bar, Segmented } from "../../components/ui";
import { CONNECTORS, CONNECTOR_CATS } from "../../content";
import type { Connector } from "../../lib/types";
import { award } from "../../lib/store";
import { shuffle } from "../../lib/text";
import { TapText } from "../../components/TapText";

const back = { to: "practica", label: "Practica" };
const REG = { F: "formal", N: "neutre", O: "oral" } as const;
type Mode = "llista" | "targetes" | "practica";

/** Connectors del discurs: consulta per funció, targetes i pràctica amb frases amb el buit. */
export function Connectors() {
  const [mode, setMode] = useState<Mode>("llista");
  const [cat, setCat] = useState<string>("totes");
  const [q, setQ] = useState("");
  const list = useMemo(() => CONNECTORS.filter((c) => (cat === "totes" || c.cat === cat) && (!q.trim() || (c.term + " " + c.use + " " + c.example).toLowerCase().includes(q.trim().toLowerCase()))), [cat, q]);
  return (
    <Page title="Connectors" subtitle={`${CONNECTORS.length} connectors per a la redacció i l'oral, ordenats per funció`} back={back}>
      <Segmented value={mode} onChange={(v) => setMode(v as Mode)} options={[{ value: "llista", label: "Consulta" }, { value: "targetes", label: "Targetes" }, { value: "practica", label: "Pràctica" }]} />
      <div className="mt-3 flex gap-1.5 overflow-x-auto pb-1">
        {["totes", ...Object.keys(CONNECTOR_CATS)].map((k) => (
          <button key={k} onClick={() => setCat(k)} className={`flex-none rounded-full px-3 py-1.5 text-[13.5px] font-medium ${cat === k ? "bg-accent text-white" : "bg-card"}`}>{k === "totes" ? "Tots" : CONNECTOR_CATS[k]}</button>
        ))}
      </div>
      {mode === "llista" && (
        <div className="mt-3 space-y-2">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cerca un connector o una funció…" aria-label="Cerca" className="w-full rounded-xl bg-card px-3.5 py-3 text-[16px]" />
          {list.map((c, i) => <Row key={c.term + i} c={c} />)}
          {!list.length && <p className="px-1 text-muted">Cap resultat.</p>}
        </div>
      )}
      {mode === "targetes" && <Cards list={list} />}
      {mode === "practica" && <Practice list={CONNECTORS.filter((c) => (cat === "totes" || c.cat === cat) && c.blank)} />}
    </Page>
  );
}

function RegTag({ r }: { r?: Connector["reg"] }) {
  if (!r) return null;
  return <span className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${r === "F" ? "bg-accent/10 text-accent" : r === "O" ? "bg-warn/15 text-warn" : "bg-line text-muted"}`}>{REG[r]}</span>;
}

function Row({ c }: { c: Connector }) {
  return (
    <Card className="space-y-1 p-3.5">
      <div className="flex flex-wrap items-center gap-2"><b className="text-[17px]">{c.term}</b><RegTag r={c.reg} />{c.cat && <span className="text-[12px] text-muted">{CONNECTOR_CATS[c.cat]}</span>}</div>
      <div className="text-[13.5px] text-muted">{c.use}</div>
      <div className="text-[15.5px]"><TapText text={c.example} /></div>
      {c.note && <div className="text-[13px] text-muted">{c.note}</div>}
    </Card>
  );
}

function Cards({ list }: { list: Connector[] }) {
  const [k, setK] = useState(0);
  const [flip, setFlip] = useState(false);
  if (!list.length) return <p className="mt-3 px-1 text-muted">Cap connector.</p>;
  const c = list[k % list.length];
  const move = (d: number) => { setK((k + d + list.length) % list.length); setFlip(false); };
  return (
    <div className="mt-3">
      <div className="mb-2 px-1 text-[13px] text-muted">{(k % list.length) + 1} de {list.length} · toca la targeta per girar-la</div>
      <button onClick={() => setFlip(!flip)} className="flex min-h-52 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-card p-6 text-center">
        {flip ? (<><div className="text-[13.5px] text-muted">{c.use}</div><div className="text-[19px] font-medium">{c.example}</div>{c.note && <div className="text-[13px] text-muted">{c.note}</div>}</>)
          : (<><div className="text-[30px] font-bold tracking-tight">{c.term}</div><RegTag r={c.reg} /><div className="text-[13.5px] text-muted">Per a què serveix?</div></>)}
      </button>
      <div className="mt-3 grid grid-cols-2 gap-2"><Btn variant="soft" onClick={() => move(-1)}>Anterior</Btn><Btn onClick={() => move(1)}>Següent</Btn></div>
    </div>
  );
}

function Practice({ list }: { list: Connector[] }) {
  const [round, setRound] = useState(0);
  const set = useMemo(() => shuffle(list).slice(0, 10), [round, list]); // eslint-disable-line react-hooks/exhaustive-deps
  const [k, setK] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const item = set[k];
  const options = useMemo(() => {
    if (!item) return [];
    const others = shuffle(CONNECTORS.filter((c) => c.cat !== item.cat && c.term !== item.term && c.blank)).filter((c, i, a) => a.findIndex((x) => x.term === c.term) === i).slice(0, 3).map((c) => c.term);
    return shuffle([item.term, ...others]);
  }, [item]);
  const finished = !item;
  useEffect(() => { if (finished && list.length >= 4) award("practice", "connectors"); }, [finished]); // eslint-disable-line react-hooks/exhaustive-deps
  if (list.length < 4) return <p className="mt-3 px-1 text-muted">Cal triar una categoria amb més connectors o «Tots».</p>;
  if (!item) {
    return (
      <Card className="pop mt-3 space-y-3 p-6 text-center">
        <div className="text-[44px] font-bold tabular">{score}/{set.length}</div>
        <Btn onClick={() => { setRound(round + 1); setK(0); setPick(null); setScore(0); }}>Una altra ronda</Btn>
      </Card>
    );
  }
  const sentence = item.example.replace(item.blank!, "_____");
  const done = pick !== null;
  return (
    <div className="mt-3 space-y-3">
      <Bar value={(k / set.length) * 100} />
      <Card className="space-y-3 p-5">
        <div className="text-[13px] text-muted">Quin connector encaixa aquí? ({item.use})</div>
        <div className="text-[19px] font-medium leading-snug">{sentence}</div>
        <div className="grid gap-2">
          {options.map((o) => (
            <button key={o} disabled={done} onClick={() => { setPick(o); if (o === item.term) setScore(score + 1); }}
              className={`rounded-xl px-4 py-3 text-left text-[16px] font-medium ${!done ? "bg-bg" : o === item.term ? "bg-good/15 text-good" : o === pick ? "bg-bad/10 text-bad" : "bg-bg opacity-50"}`}>{o}</button>
          ))}
        </div>
        {done && <div className="rounded-xl bg-accent/10 px-3.5 py-3 text-[14.5px]"><b>{item.term}</b>: {item.use}. {item.note}</div>}
        {done && <Btn block onClick={() => { setK(k + 1); setPick(null); }}>{k + 1 >= set.length ? "Veure el resultat" : "Continua"}</Btn>}
      </Card>
    </div>
  );
}
