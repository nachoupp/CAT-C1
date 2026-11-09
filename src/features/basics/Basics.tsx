import { useState } from "react";
import { Page, Section, Card, Btn, Pill, Segmented, Note } from "../../components/ui";
import { AudioPlayer } from "../../components/AudioPlayer";
import { ItemQuiz } from "../../components/ItemQuiz";
import { DictationRunner } from "../practice/Listen";
import { BASICS, type Basic } from "../../content/basics";
import { useStore, setState, award, getState } from "../../lib/store";
import type { AppState } from "../../lib/types";
import { isoDate } from "../../lib/dates";
import { playText } from "../../lib/audio";
import { go } from "../../lib/router";

export const basicDone = (s: AppState, id: string) => !!s.lessons[`fon-${id}`];
export const basicsSkipped = (s: AppState) => !!s.lessons["fon-skip"];
/** Primera lliçó de Fonaments pendent (o null si s'han fet o saltat). */
export function nextBasic(s: AppState): Basic | null {
  if (basicsSkipped(s)) return null;
  return BASICS.find((b) => !basicDone(s, b.id)) ?? null;
}

/** Fase 0 a la pantalla de ruta. */
export function BasicsPhase() {
  const s = useStore((x) => x);
  const done = BASICS.filter((b) => basicDone(s, b.id)).length;
  const skipped = basicsSkipped(s);
  const nb = nextBasic(s);
  return (
    <section className="mt-7">
      <h2 className="mx-1 mb-3 flex items-baseline justify-between text-[13px] font-semibold uppercase tracking-wider text-muted">
        <span>Fase 0 · Fonaments</span><span className="normal-case tracking-normal">{done}/{BASICS.length} fetes</span>
      </h2>
      <ol className="relative ml-5 border-l-2 border-line pl-7">
        {BASICS.map((b) => {
          const ok = basicDone(s, b.id);
          const cur = nb?.id === b.id;
          return (
            <li key={b.id} className="relative mb-3">
              <span className={`absolute -left-[45px] top-2.5 grid size-9 place-items-center rounded-full border-4 border-bg text-[13px] font-bold ${ok ? "bg-good text-white" : cur ? "bg-accent text-white" : "bg-line text-muted"}`}>{ok ? "✓" : `F${b.n}`}</span>
              <button onClick={() => go(`fon-${b.id}`)} className={`w-full rounded-2xl bg-card px-4 py-3 text-left ${cur ? "ring-2 ring-accent" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0"><div className="font-semibold">{b.title}</div><div className="text-[13px] text-muted">{b.goal}</div></div>
                  {ok ? <Pill tone="good">Feta</Pill> : cur ? <Pill tone="accent">Ara</Pill> : null}
                </div>
              </button>
            </li>
          );
        })}
      </ol>
      {!skipped && done < BASICS.length && (
        <button onClick={() => setState((x) => ({ ...x, lessons: { ...x.lessons, "fon-skip": isoDate() } }))} className="ml-5 mt-1 text-[13px] font-medium text-muted underline">
          Ja domino els fonaments: comença directament per la unitat 1
        </button>
      )}
      {skipped && done < BASICS.length && (
        <button onClick={() => setState((x) => { const l = { ...x.lessons }; delete l["fon-skip"]; return { ...x, lessons: l }; })} className="ml-5 mt-1 text-[13px] font-medium text-accent underline">
          Torna a posar els fonaments a la sessió d'avui
        </button>
      )}
    </section>
  );
}

type Tab = "apren" | "practica" | "dictat";

/** Una lliçó de Fonaments: explicació i vocabulari amb àudio → pràctica → dictat. */
export function BasicLesson({ id }: { id: string }) {
  const i = BASICS.findIndex((b) => b.id === id);
  const b = BASICS[i];
  const [tab, setTab] = useState<Tab>("apren");
  const [score, setScore] = useState<number | null>(null);
  const [run, setRun] = useState(0);
  const done = useStore((s) => (b ? basicDone(s, b.id) : false));
  if (!b) return <Page title="No trobada" back={{ to: "ruta", label: "Ruta" }}><Note>Aquesta lliçó no existeix.</Note></Page>;
  const next = BASICS[i + 1];

  function finish(ok: number, total: number) {
    const pct = Math.round((ok / total) * 100);
    setScore(pct);
    award("quiz", "fonaments");
    if (pct >= 80 && !basicDone(getState(), b.id)) setState((s) => ({ ...s, lessons: { ...s.lessons, [`fon-${b.id}`]: isoDate() } }));
  }

  return (
    <Page title={`F${b.n} · ${b.title}`} subtitle={b.goal} back={{ to: "ruta", label: "Ruta" }}>
      <Segmented value={tab} onChange={(v) => setTab(v as Tab)} options={[{ value: "apren", label: "1 · Aprèn" }, { value: "practica", label: "2 · Practica" }, { value: "dictat", label: "3 · Dictat" }]} />
      {done && <div className="mt-3"><Pill tone="good">Lliçó feta</Pill></div>}

      {tab === "apren" && (
        <>
          {b.cards.map((c) => (
            <Section key={c.title} title={c.title}>
              {/* Contingut propi de l'app */}
              <Card className="prose-lesson p-4 text-[16.5px] leading-relaxed"><div dangerouslySetInnerHTML={{ __html: c.html }} /></Card>
            </Section>
          ))}
          <Section title={`Vocabulari · ${b.vocab.length} paraules`}>
            <Card className="mb-2 p-3"><AudioPlayer text={b.vocab.map((v) => v.ca).join(". ")} label="Escolta tota la llista i repeteix" /></Card>
            <Card className="divide-y divide-line">
              {b.vocab.map((v) => (
                <button key={v.ca} onClick={() => void playText(v.ca)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left active:bg-bg">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/10 text-[12px] text-accent">▶</span>
                  <span className="min-w-0 flex-1"><span className="block text-[16px] font-semibold">{v.ca}</span><span className="text-[13px] text-muted">{v.es}{v.note ? ` · ${v.note}` : ""}</span></span>
                </button>
              ))}
            </Card>
          </Section>
          <div className="mt-5"><Btn block onClick={() => setTab("practica")}>Ara practica ›</Btn></div>
        </>
      )}

      {tab === "practica" && (
        <div className="mt-4">
          {score === null ? (
            <ItemQuiz key={run} items={b.items} live title={b.title} onFinish={(r) => finish(r.filter((x) => x.ok).length, r.length)} />
          ) : (
            <Card className="space-y-3 p-4 text-center">
              <div className="text-[40px] font-bold tabular">{score}%</div>
              <div className="text-[15px]">{score >= 80 ? "Molt bé! Lliçó superada." : "Necessites un 80 % per superar-la. Repassa l'explicació i torna-hi."}</div>
              <div className="grid grid-cols-2 gap-2">
                <Btn variant="soft" onClick={() => { setScore(null); setRun((x) => x + 1); }}>Torna-hi</Btn>
                <Btn onClick={() => setTab("dictat")}>Fes el dictat ›</Btn>
              </div>
            </Card>
          )}
        </div>
      )}

      {tab === "dictat" && (
        <div className="mt-4 space-y-4">
          <DictationRunner key={b.id} sentences={b.dictation} shuffle={false} />
          {next ? <Btn block variant="soft" onClick={() => { setTab("apren"); setScore(null); go(`fon-${next.id}`); }}>Següent lliçó: F{next.n} · {next.title} ›</Btn>
            : <Btn block variant="soft" onClick={() => go("ruta")}>Has acabat els Fonaments: torna a la ruta ›</Btn>}
        </div>
      )}
    </Page>
  );
}
