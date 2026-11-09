/** Compara un dictat paraula per paraula (alineació LCS). Ignora majúscules i puntuació, però no accents ni apòstrofs. */
export type Tok = { word: string; status: "ok" | "wrong" | "missing" | "extra"; given?: string };

const tokens = (s: string) => s.replace(/[’`´]/g, "'").split(/\s+/).map((w) => w.replace(/^[^\p{L}\p{N}'·-]+|[^\p{L}\p{N}'·-]+$/gu, "")).filter(Boolean);
const key = (w: string) => w.toLowerCase();

export function diffWords(target: string, given: string): Tok[] {
  const a = tokens(target), b = tokens(given);
  const n = a.length, m = b.length;
  const L = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = key(a[i]) === key(b[j]) ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const raw: Tok[] = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (key(a[i]) === key(b[j])) { raw.push({ word: a[i], status: "ok" }); i++; j++; }
    else if (L[i + 1][j] >= L[i][j + 1]) { raw.push({ word: a[i], status: "missing" }); i++; }
    else { raw.push({ word: b[j], status: "extra" }); j++; }
  }
  while (i < n) raw.push({ word: a[i++], status: "missing" });
  while (j < m) raw.push({ word: b[j++], status: "extra" });
  // Dins de cada bloc de diferències, aparella cada paraula sobrera amb la que falta més semblant = paraula mal escrita.
  const out: Tok[] = [];
  for (let k = 0; k < raw.length; ) {
    if (raw[k].status === "ok") { out.push(raw[k++]); continue; }
    const block: Tok[] = [];
    while (k < raw.length && raw[k].status !== "ok") block.push(raw[k++]);
    const miss = block.filter((t) => t.status === "missing");
    const extra = block.filter((t) => t.status === "extra");
    const pair = new Map<Tok, Tok>();
    for (const e of extra) {
      let best: Tok | null = null, bd = Infinity;
      for (const m of miss) {
        if (pair.has(m)) continue;
        const d = lev(key(m.word), key(e.word));
        if (d < bd) { bd = d; best = m; }
      }
      if (best && (bd <= Math.max(2, Math.ceil(best.word.length / 2)) || miss.length === 1 && extra.length === 1)) pair.set(best, e);
    }
    const used = new Set(pair.values());
    for (const m of miss) { const e = pair.get(m); out.push(e ? { word: m.word, status: "wrong", given: e.word } : m); }
    for (const e of extra) if (!used.has(e)) out.push(e);
  }
  return out;
}

export const dictationScore = (d: Tok[]) => {
  const total = d.filter((t) => t.status !== "extra").length;
  return total ? Math.round((d.filter((t) => t.status === "ok").length / total) * 100) : 0;
};

function lev(a: string, b: string): number {
  const d = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return d[b.length];
}
