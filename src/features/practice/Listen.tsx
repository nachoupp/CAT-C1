import { useMemo, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Note } from "../../components/ui";
import { AudioPlayer } from "../../components/AudioPlayer";
import { ItemQuiz } from "../../components/ItemQuiz";
import { LISTENINGS, DICTATIONS } from "../../content/listening";
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
              <p className="text-[15.5px] leading-relaxed">{l.text}</p>
              <AudioPlayer text={l.text} label="Torna-la a escoltar llegint" />
            </Card>
          </Section>
          <div className="mt-4"><Btn block variant="soft" onClick={() => { setScore(null); setRun((x) => x + 1); }}>Torna-hi</Btn></div>
        </>
      )}
    </Page>
  );
}

/** Dictat: escolta una frase, escriu-la i compara paraula per paraula. */
export function Dictation() {
  const order = useMemo(() => [...DICTATIONS].sort(() => Math.random() - 0.5), []);
  const [k, setK] = useState(0);
  const [given, setGiven] = useState("");
  const [res, setRes] = useState<Tok[] | null>(null);
  const [total, setTotal] = useState({ n: 0, sum: 0 });
  const target = order[k % order.length];

  function check() {
    if (!given.trim()) return;
    const d = diffWords(target, given);
    setRes(d);
    const sc = dictationScore(d);
    setTotal((t) => ({ n: t.n + 1, sum: t.sum + sc }));
    const wrong = d.filter((t) => t.status === "wrong" && t.given);
    if (wrong.length) {
      const today = isoDate();
      setState((s) => wrong.reduce((acc, t) => addError(acc, { wrong: t.given!, right: t.word, note: "Dictat", source: "dictat" }, today), s));
    }
    if (sc === 100) award("quiz", "dictat");
  }
  function next() { setK((x) => x + 1); setGiven(""); setRes(null); }

  return (
    <Page title="Dictat" subtitle="Escolta la frase (tantes vegades com vulguis), escriu-la i comprova-la paraula per paraula." back={{ to: "audios", label: "Àudios" }}>
      <Card className="space-y-3 p-4">
        <div className="text-[13px] text-muted">Frase {k + 1}{total.n ? ` · mitjana ${Math.round(total.sum / total.n)}%` : ""}</div>
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
            <Btn block onClick={next}>Següent frase</Btn>
          </>
        )}
      </Card>
      <Note>Els errors de dictat es desen al quadern perquè els repassis. Fixa't sobretot en accents, apòstrofs, ela geminada i s/ss/c/ç/z.</Note>
    </Page>
  );
}
