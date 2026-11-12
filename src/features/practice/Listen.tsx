import { useMemo, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Note } from "../../components/ui";
import { AudioPlayer } from "../../components/AudioPlayer";
import { ItemQuiz } from "../../components/ItemQuiz";
import { TapText } from "../../components/TapText";
import { LISTENINGS, DICTATIONS } from "../../content/listening";
import { BASICS } from "../../content/basics";
import { useStore, setState, award } from "../../lib/store";
import { addError } from "../../lib/notebook";
import { isoDate } from "../../lib/dates";
import { diffWords, dictationScore, type Tok } from "../../lib/dictation";

/** Llista d'escoltes de pràctica, per incrustar a la pàgina d'àudios. */
export function ListeningList() {
  const done = useStore((s) => s.audios);
  return (
    <List>
      {LISTENINGS.map((l) => (
        <Row key={l.id} to={`audio-${l.id}`} title={l.title} detail={`${l.kind} · ${l.items.length} preguntes`}
          left={<span aria-label={done[l.id] ? "Feta" : "Pendent"} className={`grid h-7 w-7 place-items-center rounded-full text-[14px] ${done[l.id] ? "bg-good text-white" : "border-2 border-line"}`}>{done[l.id] ? "✓" : ""}</span>} />
      ))}
    </List>
  );
}

/** Una escolta: dues audicions amb el reproductor, preguntes amb correcció i transcripció final. */
export function ListeningRun({ id }: { id: string }) {
  const l = LISTENINGS.find((x) => x.id === id);
  const [score, setScore] = useState<number | null>(null);
  const [run, setRun] = useState(0);
  if (!l) return <Page title="No trobat" back={{ to: "audios", label: "Àudios" }}><Note>Aquesta escolta no existeix.</Note></Page>;
  return (
    <Page title={l.title} subtitle={`${l.kind} · com a l'Àrea 1: llegeix les preguntes, escolta dues vegades i respon.`} back={{ to: "audios", label: "Àudios" }}>
      <Card className="p-4"><AudioPlayer key={run} text={l.text} label="Àudio" maxPlays={2} /></Card>
      <Section title="Preguntes">
        <ItemQuiz key={run} items={l.items} live={false} title={l.title} onFinish={(r) => {
          const ok = r.filter((x) => x.ok).length;
          setScore(ok);
          setState((s) => ({ ...s, audios: { ...s.audios, [l.id]: isoDate() } }));
          award("practice", "comprensio");
        }} />
      </Section>
      {score !== null && (
        <>
          <Card className="mt-4 flex items-center justify-between p-4">
            <span className="text-[17px] font-semibold">{score} de {l.items.length} encerts</span>
            <Pill tone={score >= l.items.length * 0.6 ? "good" : "warn"}>{score >= l.items.length * 0.6 ? "Aprovat" : "A repassar"}</Pill>
          </Card>
          <Section title="Transcripció">
            <Card className="space-y-3 p-4">
              <p className="text-[15.5px] leading-relaxed"><TapText text={l.text} /></p>
              <AudioPlayer text={l.text} label="Torna-la a escoltar llegint" />
            </Card>
          </Section>
          <div className="mt-4"><Btn block variant="soft" onClick={() => { setScore(null); setRun((x) => x + 1); }}>Torna-hi</Btn></div>
        </>
      )}
    </Page>
  );
}

/** Dictat reutilitzable: escolta una frase, escriu-la i compara paraula per paraula. */
export function DictationRunner({ sentences, shuffle = true, onDone }: { sentences: string[]; shuffle?: boolean; onDone?: (avg: number) => void }) {
  const order = useMemo(() => (shuffle ? [...sentences].sort(() => Math.random() - 0.5) : sentences), [sentences, shuffle]);
  const [k, setK] = useState(0);
  const [given, setGiven] = useState("");
  const [res, setRes] = useState<Tok[] | null>(null);
  const [total, setTotal] = useState({ n: 0, sum: 0 });
  const target = order[k % order.length];
  const finished = !shuffle && k >= order.length;

  function check() {
    if (!given.trim()) return;
    const d = diffWords(target, given);
    setRes(d);
    const sc = dictationScore(d);
    const t = { n: total.n + 1, sum: total.sum + sc };
    setTotal(t);
    const wrong = d.filter((x) => x.status === "wrong" && x.given);
    if (wrong.length) {
      const today = isoDate();
      setState((s) => wrong.reduce((acc, x) => addError(acc, { wrong: x.given!, right: x.word, note: "Dictat", source: "dictat" }, today), s));
    }
    if (sc === 100) award("quiz", "dictat");
    if (!shuffle && k + 1 >= order.length) onDone?.(Math.round(t.sum / t.n));
  }
  function next() { setK((x) => x + 1); setGiven(""); setRes(null); }

  if (finished) return (
    <Card className="space-y-3 p-4 text-center">
      <div className="text-[17px] font-semibold">Dictat acabat · mitjana {total.n ? Math.round(total.sum / total.n) : 0}%</div>
      <Btn variant="soft" onClick={() => { setK(0); setTotal({ n: 0, sum: 0 }); setGiven(""); setRes(null); }}>Torna-hi</Btn>
    </Card>
  );
  return (
    <Card className="space-y-3 p-4">
      <div className="text-[13px] text-muted">Frase {k + 1}{!shuffle ? ` de ${order.length}` : ""}{total.n ? ` · mitjana ${Math.round(total.sum / total.n)}%` : ""}</div>
      <AudioPlayer key={k} text={target} label="Dictat" />
      <textarea value={given} onChange={(e) => setGiven(e.target.value)} disabled={!!res} rows={3} autoCapitalize="sentences" spellCheck={false}
        placeholder="Escriu aquí el que sents…" className="w-full rounded-xl border border-line bg-bg p-3 text-[17px]" />
      {!res ? <Btn block onClick={check} disabled={!given.trim()}>Comprova</Btn> : (
        <>
          <div className="rounded-xl bg-bg p-3 text-[17px] leading-relaxed">
            {res.map((t, i) => (
              <span key={i} className="mr-1.5 inline-block">
                {t.status === "ok" && <span className="text-good">{t.word}</span>}
                {t.status === "wrong" && <><s className="text-bad">{t.given}</s> <b className="text-good">{t.word}</b></>}
                {t.status === "missing" && <b className="rounded bg-warn/20 px-1 text-warn">{t.word}</b>}
                {t.status === "extra" && <s className="text-muted">{t.word}</s>}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <Pill tone={dictationScore(res) === 100 ? "good" : "warn"}>{dictationScore(res)}%</Pill>
            <span className="text-[12px] text-muted">verd: bé · vermell: mal escrit · taronja: falta</span>
          </div>
          <div className="text-[15px]"><b>Correcta:</b> {target}</div>
          <Btn block onClick={next}>{!shuffle && k + 1 >= order.length ? "Acaba" : "Següent frase"}</Btn>
        </>
      )}
    </Card>
  );
}

/** Pàgina de dictats: frases d'examen o les de cada lliçó de Fonaments. */
export function Dictation() {
  const sets = useMemo(() => [{ id: "examen", label: "Frases d'examen", list: DICTATIONS }, ...BASICS.map((b) => ({ id: b.id, label: `${b.n}. ${b.title}`, list: b.dictation }))], []);
  const all = useMemo(() => sets.flatMap((x) => x.list), [sets]);
  const [set, setSet] = useState("tot");
  const list = set === "tot" ? all : sets.find((x) => x.id === set)!.list;
  return (
    <Page title="Dictat" subtitle={`${all.length} frases amb veu natural. Escolta tantes vegades com vulguis, escriu i comprova paraula per paraula.`} back={{ to: "audios", label: "Àudios" }}>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
        {[{ id: "tot", label: "Totes barrejades" }, ...sets].map((x) => (
          <button key={x.id} onClick={() => setSet(x.id)} className={`shrink-0 rounded-full px-3 py-1.5 text-[13.5px] font-semibold ${set === x.id ? "bg-accent text-white" : "bg-card text-muted"}`}>{x.label}</button>
        ))}
      </div>
      <DictationRunner key={set} sentences={list} />
      <Note>Els errors de dictat es desen al quadern perquè els repassis. Fixa't sobretot en accents, apòstrofs, ela geminada i s/ss/c/ç/z.</Note>
    </Page>
  );
}
