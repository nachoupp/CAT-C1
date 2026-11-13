import { useEffect, useState, type ReactNode } from "react";
import { askJSON, AiError } from "../lib/ai";
import { playText } from "../lib/audio";

interface Gloss { relacionades?: string[]; lema?: string; categoria?: string; es?: string; definicio?: string; exemple?: string }
const cache = new Map<string, Gloss>();
const WORD = /[\p{L}][\p{L}·'’-]*/gu;

const prompt = (w: string, ctx: string) => `Ets un lexicògraf expert en català (IEC, amb atenció a les formes balears). Explica la paraula «${w}» tal com es fa servir en aquesta frase: «${ctx.slice(0, 220)}».
Respon NOMÉS amb JSON: {"lema":"forma de diccionari (infinitiu si és verb)","categoria":"nom m. / verb / adj. / loc. ...","es":"traducció al castellà en aquest context","definicio":"definició molt breu en català","exemple":"una frase d'exemple curta","relacionades":["3-5 paraules, locucions o expressions de la mateixa família o camp, útils per ampliar vocabulari, cadascuna amb el seu significat breu en castellà entre parèntesis"]}
Si la paraula forma part d'una locució (p. ex. «fer l'orni»), explica la locució sencera a "definicio" i "es".`;

function sentenceAround(text: string, at: number): string {
  const s = Math.max(text.lastIndexOf(".", at - 1), text.lastIndexOf("?", at - 1), text.lastIndexOf("!", at - 1), text.lastIndexOf("\n", at - 1)) + 1;
  const ends = [".", "?", "!", "\n"].map((c) => text.indexOf(c, at)).filter((i) => i >= 0);
  return text.slice(s, ends.length ? Math.min(...ends) + 1 : text.length).trim();
}

/** Text amb paraules tocables: en tocar-ne una surt un globo amb traducció, definició i àudio. */
export function TapText({ text }: { text: string }) {
  const [sel, setSel] = useState<{ w: string; ctx: string } | null>(null);
  const out: ReactNode[] = [];
  let pos = 0;
  for (const m of text.matchAll(WORD)) {
    const i = m.index ?? 0;
    if (i > pos) out.push(text.slice(pos, i));
    const w = m[0];
    out.push(
      <span key={i} role="button" tabIndex={0} onClick={() => setSel({ w, ctx: sentenceAround(text, i) })}
        onKeyDown={(e) => { if (e.key === "Enter") setSel({ w, ctx: sentenceAround(text, i) }); }}
        className="cursor-pointer rounded-sm decoration-accent/30 underline-offset-4 hover:bg-accent/10 hover:underline">{w}</span>
    );
    pos = i + w.length;
  }
  if (pos < text.length) out.push(text.slice(pos));
  return <>{out}{sel && <GlossSheet key={sel.w + sel.ctx} w={sel.w} ctx={sel.ctx} onClose={() => setSel(null)} />}</>;
}

function GlossSheet({ w, ctx, onClose }: { w: string; ctx: string; onClose: () => void }) {
  const key = `${w.toLowerCase()}|${ctx}`;
  const [g, setG] = useState<Gloss | null>(cache.get(key) ?? null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(!cache.has(key));
  useEffect(() => {
    if (cache.has(key)) return;
    let alive = true;
    askJSON<Gloss>(prompt(w, ctx), { timeoutMs: 30000 })
      .then((d) => { cache.set(key, d); if (alive) setG(d); })
      .catch((e) => { if (alive) setErr(e instanceof AiError ? e.message : "No s'ha pogut consultar."); })
      .finally(() => { if (alive) setBusy(false); });
    return () => { alive = false; };
  }, [key, w, ctx]);
  return (
    <span className="fixed inset-x-0 bottom-0 z-50 block" role="dialog" aria-label={`Paraula ${w}`}>
      <span className="mx-auto block max-w-xl space-y-2 rounded-t-3xl border border-line bg-card p-4 pb-6 text-left font-sans text-[15px] leading-normal shadow-2xl">
        <span className="flex items-center justify-between gap-2">
          <span className="text-[20px] font-bold">{g?.lema && g.lema.toLowerCase() !== w.toLowerCase() ? `${w} → ${g.lema}` : w}
            {g?.categoria && <i className="ml-2 text-[13px] font-normal text-muted">{g.categoria}</i>}</span>
          <span className="flex gap-2">
            <button onClick={() => void playText(g?.lema ?? w)} aria-label="Escolta" className="grid size-9 place-items-center rounded-full bg-accent/10 text-accent">▶</button>
            <button onClick={onClose} aria-label="Tanca" className="grid size-9 place-items-center rounded-full bg-bg">✕</button>
          </span>
        </span>
        {busy && <span className="block text-muted">Buscant…</span>}
        {err && <span className="block text-bad">{err}</span>}
        {g?.es && <span className="block"><b>{g.es}</b></span>}
        {g?.definicio && <span className="block">{g.definicio}</span>}
        {(g?.relacionades ?? []).length > 0 && <span className="block text-[13.5px]"><b>Per ampliar:</b> {g!.relacionades!.join(" · ")}</span>}
        <span className="flex gap-2 pt-1 text-[13px]">
          <a className="font-semibold text-accent" target="_blank" rel="noreferrer" href={`https://dlc.iec.cat/Results?DecEntradaText=${encodeURIComponent((g?.lema ?? w).toLowerCase())}`}>Cerca al DIEC ↗</a>
          <a className="font-semibold text-accent" target="_blank" rel="noreferrer" href="https://dcvb.iec.cat/inici.asp" onClick={() => void navigator.clipboard?.writeText(g?.lema ?? w).catch(() => undefined)}>DCVB ↗ (copia la paraula)</a>
        </span>
        {g?.exemple && <span className="block border-l-2 border-accent/40 pl-3 text-muted">{g.exemple}</span>}
      </span>
    </span>
  );
}
