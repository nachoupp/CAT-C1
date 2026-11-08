import { useState } from "react";
import { Card, Btn, Bar, Pill } from "./ui";
import { isCorrect } from "../lib/errors";
import type { PracticeItem } from "../content/units";

export interface ItemResult { item: PracticeItem; given: string; ok: boolean }

const correctText = (it: PracticeItem) => (it.type === "choice" ? it.answer : it.answers[0]);
const LABEL: Record<PracticeItem["type"], string> = { choice: "Tria", gap: "Completa", fix: "Corregeix", transform: "Transforma" };

/** Executa una sèrie d'exercicis. `live`: correcció i explicació després de cada resposta. */
export function ItemQuiz({ items, live = true, title, onFinish }: { items: PracticeItem[]; live?: boolean; title?: string; onFinish: (r: ItemResult[]) => void }) {
  const [k, setK] = useState(0);
  const [results, setResults] = useState<ItemResult[]>([]);
  const [given, setGiven] = useState("");
  const [checked, setChecked] = useState(false);
  const it = items[k];
  if (!it) return null;

  const submit = (value: string) => {
    if (!value.trim()) return;
    const ok = it.type === "choice" ? value === it.answer : isCorrect(value, it.answers);
    const r = [...results, { item: it, given: value, ok }];
    setResults(r); setGiven(value);
    if (live) setChecked(true); else advance(r);
  };
  const advance = (r: ItemResult[] = results) => {
    setChecked(false); setGiven("");
    if (k + 1 >= items.length) onFinish(r); else setK(k + 1);
  };
  const last = results[results.length - 1];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[13.5px] text-muted tabular">
        <span>{title ?? "Exercici"} {k + 1} de {items.length}</span>
        {live && <span>{results.filter((r) => r.ok).length} encerts</span>}
      </div>
      <Bar value={(k / items.length) * 100} />
      <Card className="mt-4 p-4">
        <div className="mb-1"><Pill tone="muted">{LABEL[it.type]}</Pill></div>
        <div className="mb-4 text-[19px] font-semibold leading-snug text-balance">{it.q}</div>
        {it.type === "choice" ? (
          <div className="space-y-2">
            {it.options.map((o) => {
              const st = !checked ? "bg-bg" : o === it.answer ? "bg-good/15 text-good font-semibold" : o === given ? "bg-bad/10 text-bad" : "bg-bg opacity-60";
              return <button key={o} disabled={checked} onClick={() => submit(o)} className={`block w-full rounded-xl px-4 py-3.5 text-left ${st}`}>{o}</button>;
            })}
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); submit(given); }} className="space-y-2">
            <input id={`item-${k}`} aria-label="La teva resposta" autoComplete="off" autoCapitalize="none" spellCheck={false} disabled={checked}
              value={given} onChange={(e) => setGiven(e.target.value)} placeholder="Escriu la resposta…"
              className={`w-full rounded-xl px-4 py-3.5 text-[17px] ${checked ? (last?.ok ? "bg-good/15 text-good" : "bg-bad/10 text-bad") : "bg-bg"}`} />
            {!checked && <Btn type="submit" block disabled={!given.trim()}>Comprova</Btn>}
          </form>
        )}
        {checked && last && (
          <div className="mt-4 space-y-1 rounded-xl bg-accent/10 px-3.5 py-3 text-[15px]">
            <div><b>{last.ok ? "Correcte." : "No del tot."}</b>{!last.ok && <> Resposta: <b>{correctText(it)}</b>.</>}</div>
            <div>{it.e}</div>
          </div>
        )}
      </Card>
      {checked && <div className="mt-4"><Btn block onClick={() => advance()}>Continua</Btn></div>}
    </div>
  );
}

export function ResultsList({ results }: { results: ItemResult[] }) {
  return (
    <Card className="divide-y divide-line">
      {results.map((r, i) => (
        <div key={i} className="px-4 py-3">
          <div className="font-medium">{r.item.q}</div>
          <div className={`text-[14px] ${r.ok ? "text-good" : "text-bad"}`}>{r.ok ? `✓ ${r.given}` : `✗ ${r.given || "En blanc"} · Correcta: ${correctText(r.item)}`}</div>
          {!r.ok && <div className="text-[13.5px] text-muted">{r.item.e}</div>}
        </div>
      ))}
    </Card>
  );
}
