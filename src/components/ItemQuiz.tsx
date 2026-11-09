import { useEffect, useState } from "react";
import { Card, Btn, Bar, Pill } from "./ui";
import { isCorrectItem } from "../lib/errors";
import type { PracticeItem } from "../content/units";
import { ruleFor, whyNot, type TeachRule } from "../content/rules";
import { askJSON, AiError } from "../lib/ai";

export interface ItemResult { item: PracticeItem; given: string; ok: boolean }

const correctText = (it: PracticeItem) => (it.type === "choice" ? it.answer : it.answers[0]);
const LABEL: Record<PracticeItem["type"], string> = { choice: "Tria", gap: "Completa", fix: "Corregeix", transform: "Transforma" };

/** Executa una sèrie d'exercicis. `live`: correcció i explicació després de cada resposta. */
export function ItemQuiz({ items, live = true, title, onFinish, rules = [] }: { items: PracticeItem[]; live?: boolean; title?: string; onFinish: (r: ItemResult[]) => void; rules?: TeachRule[] }) {
  const [k, setK] = useState(0);
  const [ruleOpen, setRuleOpen] = useState<string | null>(null);
  const [results, setResults] = useState<ItemResult[]>([]);
  const [given, setGiven] = useState("");
  const [checked, setChecked] = useState(false);
  const it = items[k];
  if (!it) return null;

  const submit = (value: string) => {
    if (!value.trim()) return;
    const ok = it.type === "choice" ? value === it.answer : isCorrectItem(value, it);
    const r = [...results, { item: it, given: value, ok }];
    setResults(r); setGiven(value);
    if (live) { setChecked(true); const m = ruleFor(rules, correctText(it), it.e); if (m) setRuleOpen(m.id); } else advance(r);
  };
  const advance = (r: ItemResult[] = results) => {
    setChecked(false); setGiven(""); setRuleOpen(null);
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
      {rules.length > 0 && <RulesBar rules={rules} open={ruleOpen} setOpen={setRuleOpen} highlight={checked ? ruleFor(rules, correctText(it), it.e)?.id : undefined} />}
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
              value={given} onChange={(e) => setGiven(e.target.value)} placeholder="Escriu la paraula o la frase sencera…"
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
        {checked && it.type === "choice" && <WhyNot key={k} item={it} rules={rules} />}
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

/** Regles de la unitat sempre a la vista; després de respondre, s'obre la que s'aplica. */
export function RulesBar({ rules, open, setOpen, highlight }: { rules: TeachRule[]; open: string | null; setOpen: (id: string | null) => void; highlight?: string }) {
  const r = rules.find((x) => x.id === open);
  return (
    <div className="mt-3 rounded-2xl bg-card p-3">
      <div className="mb-2 flex items-center justify-between"><span className="text-[12.5px] font-semibold uppercase tracking-wider text-muted">Regles a la vista</span>{r && <button className="text-[13px] text-accent" onClick={() => setOpen(null)}>Amaga</button>}</div>
      <div className="flex flex-wrap gap-1.5">
        {rules.map((x) => (
          <button key={x.id} onClick={() => setOpen(open === x.id ? null : x.id)} aria-pressed={open === x.id}
            className={`rounded-full px-2.5 py-1 text-[12.5px] font-medium ${open === x.id ? "bg-sist text-white" : highlight === x.id ? "bg-sist/20 text-sist ring-2 ring-sist" : "bg-bg text-fg"}`}>{x.title}</button>
        ))}
      </div>
      {r && <div className="prose-lesson pop mt-3 rounded-xl bg-sist/10 p-3 text-[15px] leading-relaxed">{highlight === r.id && <div className="mb-1 text-[12.5px] font-semibold text-sist">La regla d'aquesta pregunta</div>}<div dangerouslySetInnerHTML={{ __html: r.body }} /></div>}
    </div>
  );
}

/** Per què no són correctes les altres opcions: explicació automàtica i, si cal, del professor IA. */
function WhyNot({ item, rules }: { item: Extract<PracticeItem, { type: "choice" }>; rules: TeachRule[] }) {
  const others = item.options.filter((o) => o !== item.answer);
  const auto = Object.fromEntries(others.map((o) => [o, whyNot(o, item.answer, rules)]));
  const [ai, setAi] = useState<Record<string, string> | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => { setAi(null); setErr(null); }, [item]);
  const ask = async () => {
    setBusy(true); setErr(null);
    try {
      const r = await askJSON<Record<string, string>>(`Ets un professor de català (nivell C1, examen del GOIB) que explica amb paciència a una alumna hispanoparlant.
Exercici: «${item.q}». Opcions: ${item.options.map((o) => `«${o}»`).join(", ")}. Correcta: «${item.answer}».
Explica, en català clar i breu (1-2 frases cadascuna), per què és correcta la bona i per què NO ho és cadascuna de les altres, amb la regla i un exemple curt.
Respon NOMÉS amb JSON on cada clau és l'opció exacta: {${item.options.map((o) => JSON.stringify(o) + ':"..."').join(",")}}`);
      setAi(r);
    } catch (e) { setErr(e instanceof AiError ? e.message : "No s'ha pogut consultar el professor."); }
    finally { setBusy(false); }
  };
  return (
    <div className="mt-3 rounded-xl border border-line px-3.5 py-3 text-[14.5px]">
      <div className="mb-1.5 text-[12.5px] font-semibold uppercase tracking-wider text-muted">Per què no les altres?</div>
      <ul className="space-y-1.5">
        {others.map((o) => (
          <li key={o}><span className="font-semibold text-bad">✗ {o}</span> — {ai?.[o] ?? auto[o]?.replace(`«${o}»: `, "") ?? "no és la forma adequada en aquesta frase. Consulta la regla destacada o demana-ho al professor."}</li>
        ))}
        {ai?.[item.answer] && <li><span className="font-semibold text-good">✓ {item.answer}</span> — {ai[item.answer]}</li>}
      </ul>
      {!ai && <button onClick={ask} disabled={busy} className="mt-2 text-[13.5px] font-semibold text-accent disabled:opacity-50">{busy ? "El professor està pensant…" : "Explica-m'ho com un professor"}</button>}
      {err && <div className="mt-1 text-[13px] text-muted">{err}</div>}
    </div>
  );
}
