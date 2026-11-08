import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "./ui";
import { detect, applyHit, type Hit } from "../lib/errors";
import { checkText, applyFix, type LtMatch } from "../lib/languagetool";
import { setState } from "../lib/store";
import { addError } from "../lib/notebook";
import { isoDate } from "../lib/dates";
import { countWords } from "../lib/text";
import { go } from "../lib/router";

/**
 * Editor amb píndoles correctores en directe:
 * 1) detector propi a cada tecla (sense connexió), 2) LanguageTool quan pares 2 segons.
 * Quan acceptes una correcció, l'error passa al quadern.
 */
export function LiveEditor({ id, value, onChange, rows = 12, target, placeholder }: {
  id: string; value: string; onChange: (v: string) => void; rows?: number; target?: number; placeholder?: string;
}) {
  const hits = useMemo(() => detect(value), [value]);
  const [lt, setLt] = useState<LtMatch[]>([]);
  const [ltState, setLtState] = useState<"idle" | "busy" | "off">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastChecked = useRef("");

  useEffect(() => {
    clearTimeout(timer.current);
    if (countWords(value) < 4 || value === lastChecked.current) return;
    timer.current = setTimeout(async () => {
      setLtState("busy");
      try {
        const m = await checkText(value);
        lastChecked.current = value;
        // No dupliquem el que ja detecta el detector propi.
        setLt(m.filter((x) => !hits.some((h) => h.index < x.offset + x.length && x.offset < h.index + h.length)));
        setLtState("idle");
      } catch { setLtState("off"); }
    }, 2000);
    return () => clearTimeout(timer.current);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const logError = (wrong: string, right: string, note: string, link?: string) =>
    setState((s) => addError(s, { wrong, right, note, source: "escriptura", link }, isoDate()));

  const fixHit = (h: Hit, fix: string) => {
    logError(h.match, h.rule.id === "apos-univ" ? "la " + h.match.slice(2) : fix, h.rule.msg, h.rule.link);
    onChange(applyHit(value, h, fix));
    setLt([]);
  };
  const fixLt = (i: number, rep: string) => {
    const m = lt[i];
    logError(value.slice(m.offset, m.offset + m.length), rep, m.message);
    const r = applyFix(value, lt, i, rep);
    onChange(r.text); setLt(r.matches);
  };

  const n = countWords(value);
  const total = hits.length + lt.length;
  return (
    <div className="space-y-3">
      <textarea id={id} aria-label="El teu text" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? "Escriu aquí…"}
        spellCheck={false} className="w-full resize-y rounded-xl bg-bg p-3 text-[17px] leading-relaxed" />
      <div className="flex items-center justify-between text-[13.5px] text-muted tabular">
        <span>{target ? <><b className={n >= target * 0.9 && n <= target * 1.15 ? "text-good" : "text-fg"}>{n}</b> / {target} paraules</> : `${n} paraules`}</span>
        <span>{ltState === "busy" ? "Revisant…" : ltState === "off" ? "Corrector en línia no disponible" : total ? `${total} ${total === 1 ? "suggeriment" : "suggeriments"}` : n > 3 ? "Cap error detectat" : ""}</span>
      </div>
      {total > 0 && (
        <div className="space-y-2" aria-live="polite">
          {hits.map((h, i) => (
            <Card key={`h${i}-${h.index}`} className="pop border-l-4 border-escr px-3.5 py-2.5 text-[14.5px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <s className="text-bad">{h.match}</s><span className="text-muted">→</span>
                {h.rule.fixes.map((f) => (
                  <button key={f} onClick={() => fixHit(h, f)} className="rounded-full bg-good/15 px-2.5 py-0.5 text-[13px] font-semibold text-good">{h.rule.id === "apos-univ" ? "la " + h.match.slice(2) : f}</button>
                ))}
              </div>
              <div className="mt-1">{h.rule.msg}{h.rule.ex && <i className="text-muted"> {h.rule.ex}</i>}</div>
              {h.rule.link && <button className="mt-0.5 text-[13px] font-medium text-accent" onClick={() => go(h.rule.link!.startsWith("u") ? `unit-${h.rule.link}` : `lesson-${h.rule.link}`)}>Repassa-ho ›</button>}
            </Card>
          ))}
          {lt.slice(0, 12).map((m, i) => (
            <Card key={`l${m.offset}-${m.rule.id}`} className="pop border-l-4 border-sist px-3.5 py-2.5 text-[14.5px]">
              <div className="flex flex-wrap items-center gap-1.5">
                <s className="text-bad">{value.slice(m.offset, m.offset + m.length)}</s>
                {m.replacements.length > 0 && <span className="text-muted">→</span>}
                {m.replacements.slice(0, 3).map((r) => (
                  <button key={r.value} onClick={() => fixLt(i, r.value)} className="rounded-full bg-good/15 px-2.5 py-0.5 text-[13px] font-semibold text-good">{r.value}</button>
                ))}
              </div>
              <div className="mt-1">{m.message}</div>
            </Card>
          ))}
          {lt.length > 0 && <p className="text-[12.5px] text-muted">Suggeriments blaus: LanguageTool (languagetool.org). El text s'hi envia per revisar-lo.</p>}
        </div>
      )}
    </div>
  );
}
