import { useEffect, useRef, useState } from "react";
import { GlossSheet } from "./TapText";
import { useStore } from "../lib/store";

const WORD = /[\p{L}][\p{L}·'’-]*/u;
const SKIP = "button,a,input,textarea,select,label,summary,[role=button],[contenteditable=true],[data-nogloss],nav,svg,audio";

interface Hit { w: string; ctx: string; x: number; y: number }

function caretAt(x: number, y: number): { node: Text; off: number } | null {
  const d = document as Document & { caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null; caretRangeFromPoint?: (x: number, y: number) => Range | null };
  let node: Node | null = null, off = 0;
  if (d.caretPositionFromPoint) { const p = d.caretPositionFromPoint(x, y); if (p) { node = p.offsetNode; off = p.offset; } }
  else if (d.caretRangeFromPoint) { const r = d.caretRangeFromPoint(x, y); if (r) { node = r.startContainer; off = r.startOffset; } }
  return node && node.nodeType === 3 ? { node: node as Text, off } : null;
}

function wordAt(x: number, y: number, target: EventTarget | null): Hit | null {
  if (!(target instanceof Element) || target.closest(SKIP)) return null;
  const c = caretAt(x, y);
  if (!c) return null;
  const text = c.node.data;
  // El cursor ha de caure realment sobre el text (no en l'espai buit del bloc).
  const r = document.createRange();
  let start = -1, end = -1;
  for (const m of text.matchAll(new RegExp(WORD.source, "gu"))) {
    const i = m.index ?? 0;
    if (c.off >= i && c.off <= i + m[0].length) { start = i; end = i + m[0].length; break; }
  }
  if (start < 0) return null;
  r.setStart(c.node, start); r.setEnd(c.node, end);
  const b = r.getBoundingClientRect();
  if (x < b.left - 2 || x > b.right + 2 || y < b.top - 2 || y > b.bottom + 2) return null;
  const block = c.node.parentElement?.closest("p,li,div,td,span") ?? c.node.parentElement;
  const full = (block?.textContent ?? text).replace(/\s+/g, " ");
  const w = text.slice(start, end);
  const at = Math.max(0, full.indexOf(w));
  const s = Math.max(full.lastIndexOf(". ", at), full.lastIndexOf("? ", at), full.lastIndexOf("! ", at)) + 1;
  const e = full.indexOf(". ", at);
  return { w, ctx: full.slice(s, e < 0 ? full.length : e + 1).trim(), x: b.left, y: b.bottom + 8 };
}

/** Qualsevol paraula de l'app és consultable: toca-la (mòbil) o deixa-hi el ratolí uns instants (ordinador). */
export function GlobalGloss() {
  const on = useStore((s) => s.settings.gloss === true);
  const [hit, setHit] = useState<(Hit & { sheet: boolean }) | null>(null);
  const timer = useRef<number>(0);
  const last = useRef("");

  useEffect(() => {
    if (!on) { setHit(null); return; }
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onClick = (e: MouseEvent) => {
      if (window.getSelection()?.toString()) return;
      const h = wordAt(e.clientX, e.clientY, e.target);
      if (h) setHit({ ...h, sheet: !fine });
      else if (!(e.target instanceof Element && e.target.closest("[data-nogloss]"))) setHit(null);
    };
    const onMove = (e: MouseEvent) => {
      window.clearTimeout(timer.current);
      const t = e.target;
      timer.current = window.setTimeout(() => {
        const h = wordAt(e.clientX, e.clientY, t);
        if (h && h.w + h.ctx !== last.current) { last.current = h.w + h.ctx; setHit({ ...h, sheet: false }); }
      }, 900);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setHit(null); };
    document.addEventListener("click", onClick);
    if (fine) document.addEventListener("mousemove", onMove);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onClick); document.removeEventListener("mousemove", onMove); document.removeEventListener("keydown", onKey); window.clearTimeout(timer.current); };
  }, [on]);

  if (!on || !hit) return null;
  return <GlossSheet key={hit.w + hit.ctx} w={hit.w} ctx={hit.ctx} anchor={hit.sheet ? undefined : { x: hit.x, y: hit.y }} onClose={() => { last.current = ""; setHit(null); }} />;
}
