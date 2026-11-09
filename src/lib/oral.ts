/**
 * Anàlisi de l'expressió oral a partir de la transcripció (Scribe): fluïdesa, crosses,
 * pauses, varietat lèxica, connectors i errors del detector. Funcions pures, sense xarxa.
 */
import { detect, type Hit } from "./errors";

export interface Word { text: string; start: number; end: number; event?: boolean }
export interface Transcript { text: string; words: Word[]; duration: number }

/** Crosses: sorolls de vacil·lació i castellanismes de farciment. */
export const FILLERS: { re: RegExp; label: string; hard: boolean }[] = [
  { re: /\b(e+h+|e+m+|m{2,}|hm+)\b/giu, label: "eh / mmm", hard: true },
  { re: /\beste\b/giu, label: "este", hard: true },
  { re: /\bbueno\b/giu, label: "bueno", hard: true },
  { re: /\bpues\b/giu, label: "pues", hard: true },
  { re: /\bvale\b/giu, label: "vale", hard: true },
  { re: /\bo sea\b/giu, label: "o sea", hard: true },
  { re: /\bo sigui\b/giu, label: "o sigui", hard: false },
  { re: /\bsaps\b/giu, label: "saps", hard: false },
  { re: /\bvull dir\b/giu, label: "vull dir", hard: false }
];

export interface OralMetrics {
  words: number;
  speakingSecs: number;
  wpm: number;
  pace: "lent" | "bo" | "ràpid";
  pauses: number;
  longestPause: number;
  fillers: { label: string; n: number; hard: boolean }[];
  fillerTotal: number;
  variety: number; // 0-1, paraules diferents / paraules (sobre les primeres 200)
  connectors: string[];
  hits: Hit[];
}

const norm = (w: string) => w.toLowerCase().replace(/[^\p{L}·'’-]/gu, "");

export function analyse(t: Transcript, connectorTerms: string[] = []): OralMetrics {
  const ws = t.words.filter((w) => !w.event && norm(w.text));
  const words = ws.length || (t.text.match(/\p{L}+/gu) ?? []).length;
  const speakingSecs = ws.length > 1 ? Math.max(1, ws[ws.length - 1].end - ws[0].start) : Math.max(1, t.duration);
  const wpm = Math.round(words / (speakingSecs / 60));
  let pauses = 0;
  let longestPause = 0;
  for (let i = 1; i < ws.length; i++) {
    const gap = ws[i].start - ws[i - 1].end;
    if (gap >= 2) pauses++;
    longestPause = Math.max(longestPause, gap);
  }
  const fillers = FILLERS.map((f) => ({ label: f.label, hard: f.hard, n: (t.text.match(f.re) ?? []).length })).filter((f) => f.n > 0);
  const sample = (t.text.match(/\p{L}[\p{L}·'’-]*/gu) ?? []).slice(0, 200).map(norm);
  const variety = sample.length ? new Set(sample).size / sample.length : 0;
  const low = t.text.toLowerCase();
  const connectors = connectorTerms.filter((c) => low.includes(c.toLowerCase()));
  return {
    words, speakingSecs, wpm,
    pace: wpm < 95 ? "lent" : wpm > 175 ? "ràpid" : "bo",
    pauses, longestPause: Math.round(longestPause * 10) / 10,
    fillers, fillerTotal: fillers.reduce((a, f) => a + f.n, 0),
    variety: Math.round(variety * 100) / 100,
    connectors, hits: detect(t.text)
  };
}

export interface Span { text: string; kind?: "filler" | "error"; tip?: string }

/** Divideix la transcripció en trossos per ressaltar crosses i errors. */
export function highlight(text: string, m: OralMetrics): Span[] {
  const ranges: { a: number; b: number; kind: "filler" | "error"; tip: string }[] = [];
  for (const h of m.hits) ranges.push({ a: h.index, b: h.index + h.length, kind: "error", tip: `${h.rule.fixes[0]} · ${h.rule.msg}` });
  for (const f of FILLERS) {
    for (const x of text.matchAll(f.re)) ranges.push({ a: x.index ?? 0, b: (x.index ?? 0) + x[0].length, kind: "filler", tip: f.hard ? "Crossa: fes una pausa en silenci" : "Crossa si la repeteixes gaire" });
  }
  ranges.sort((p, q) => p.a - q.a || q.b - p.b);
  const out: Span[] = [];
  let pos = 0;
  for (const r of ranges) {
    if (r.a < pos) continue;
    if (r.a > pos) out.push({ text: text.slice(pos, r.a) });
    out.push({ text: text.slice(r.a, r.b), kind: r.kind, tip: r.tip });
    pos = r.b;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}

export interface OralFeedback {
  nota: number;
  criteris: { nom: string; nota: number; comentari: string }[];
  punts_forts: string[];
  errors: { dit: string; millor: string; per_que: string }[];
  reformulacions: { original: string; millor: string }[];
  pronuncia: { paraula: string; nota: string }[];
  consell: string;
}

export const ORAL_CRITERIA = ["Adequació", "Coherència i cohesió", "Fluïdesa", "Correcció", "Riquesa lèxica"];

export function oralPrompt(topic: string, t: Transcript, m: OralMetrics): string {
  return `Ets examinador de l'expressió oral del certificat C1 de català (GOIB, Illes Balears). Avalua aquesta exposició d'una aprenent adulta (nivell actual B1-B2, objectiu C1).
Tema proposat: «${topic}»
Transcripció automàtica (pot tenir errors de reconeixement; si una paraula estranya sembla mal reconeguda, no la comptis com a error gramatical: posa-la a "pronuncia" com a possible problema de pronunciació):
"""${t.text.slice(0, 6000)}"""
Mètriques mesurades: ${m.words} paraules en ${Math.round(m.speakingSecs)} s (${m.wpm} paraules/minut), ${m.pauses} pauses de més de 2 s, crosses: ${m.fillers.map((f) => `${f.label}×${f.n}`).join(", ") || "cap"}, connectors detectats: ${m.connectors.join(", ") || "cap"}.
Respon NOMÉS amb JSON vàlid, en català, amb aquesta forma:
{"nota":0-100,"criteris":[{"nom":"Adequació","nota":0-10,"comentari":"..."},{"nom":"Coherència i cohesió",...},{"nom":"Fluïdesa",...},{"nom":"Correcció",...},{"nom":"Riquesa lèxica",...}],
"punts_forts":["..."],"errors":[{"dit":"text exacte dit","millor":"forma correcta","per_que":"explicació breu"}],
"reformulacions":[{"original":"frase dita","millor":"com ho diria un C1"}],"pronuncia":[{"paraula":"...","nota":"..."}],"consell":"una sola cosa concreta per a la propera gravació"}
Màxim 8 errors i 4 reformulacions, els més útils. Sigues exigent però amable, com un bon professor.`;
}

const clamp = (n: unknown, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(Number(n) || 0)));
const arr = <T,>(x: unknown): T[] => (Array.isArray(x) ? (x as T[]) : []);
const str = (x: unknown) => (typeof x === "string" ? x : "");

export function normalizeOral(raw: unknown): OralFeedback {
  const r = (raw ?? {}) as Record<string, unknown>;
  const crit = arr<Record<string, unknown>>(r.criteris);
  return {
    nota: clamp(r.nota, 0, 100),
    criteris: ORAL_CRITERIA.map((nom, i) => {
      const c = crit.find((x) => str(x.nom).toLowerCase().startsWith(nom.slice(0, 5).toLowerCase())) ?? crit[i] ?? {};
      return { nom, nota: clamp(c.nota, 0, 10), comentari: str(c.comentari) };
    }),
    punts_forts: arr<unknown>(r.punts_forts).map(str).filter(Boolean).slice(0, 4),
    errors: arr<Record<string, unknown>>(r.errors).map((e) => ({ dit: str(e.dit), millor: str(e.millor), per_que: str(e.per_que) })).filter((e) => e.dit && e.millor).slice(0, 8),
    reformulacions: arr<Record<string, unknown>>(r.reformulacions).map((e) => ({ original: str(e.original), millor: str(e.millor) })).filter((e) => e.millor).slice(0, 4),
    pronuncia: arr<Record<string, unknown>>(r.pronuncia).map((e) => ({ paraula: str(e.paraula), nota: str(e.nota) })).filter((e) => e.paraula).slice(0, 6),
    consell: str(r.consell)
  };
}
