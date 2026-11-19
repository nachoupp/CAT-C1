/** Anàlisi d'estil en directe (sense IA): connectors, registre, frases llargues i repeticions. */
import type { Genre } from "../content/textTypes";

export interface StyleReport {
  words: number; sentences: number; avgLen: number; longSentences: number; paragraphs: number;
  used: string[]; missing: string[]; warnings: string[]; repeated: { w: string; n: number }[];
}

const FORMAL = new Set(["carta-formal", "correu-formal", "reclamacio", "carta-director", "opinio", "informe", "sollicitud"]);
const TU = /\b(tu|teu|teva|teus|teves|ets|vols|pots|tens|saps|vas|has)\b/i;
const VOSTE = /\b(vostè|vostès|vós)\b/i;
const COLLOQ: [RegExp, string][] = [
  [/\b(pq|xq|tb|q)\b/i, "abreviatures de xat (pq, xq, tb)"],
  [/\b(vale|pues|bueno|o sea)\b/i, "paraules castellanes (vale, pues, bueno…)"],
  [/\b(molt bé|una cosa|un munt de|guai)\b/i, "expressions massa col·loquials"],
  [/!/, "exclamacions (poc habituals en un text formal)"]
];
const STOP = new Set(["aquest", "aquesta", "aquests", "aquestes", "perquè", "també", "tanmateix", "només", "sempre", "ningú", "alguna", "algun", "aquell", "aquella", "després", "abans", "cosa", "coses", "molt", "molta", "molts", "moltes", "quan", "ells", "elles", "nosaltres", "vosaltres", "estan", "estat", "serà", "estar", "tenir", "poden", "fa", "més", "però"]);

export function analyseStyle(text: string, genre?: Genre): StyleReport {
  const clean = text.trim();
  const wordsArr = clean.match(/[\p{L}][\p{L}·'’-]*/gu) ?? [];
  const sentences = clean.split(/(?<=[.!?…])\s+|\n+/).filter((x) => /\p{L}/u.test(x));
  const lens = sentences.map((x) => (x.match(/[\p{L}][\p{L}·'’-]*/gu) ?? []).length);
  const low = clean.toLowerCase();
  const used = genre ? genre.connectors.filter((c) => low.includes(c.toLowerCase())) : [];
  const missing = genre ? genre.connectors.filter((c) => !used.includes(c)) : [];

  const warnings: string[] = [];
  if (genre && clean) {
    const formal = FORMAL.has(genre.id);
    if (formal) {
      if (TU.test(clean) && !VOSTE.test(clean) && genre.id !== "opinio" && genre.id !== "informe") warnings.push("Fas servir «tu»/«ets»: en aquest tipus de text el registre és formal (vostè).");
      for (const [re, msg] of COLLOQ) if (re.test(clean)) warnings.push(`Evita ${msg}.`);
    } else if (VOSTE.test(clean)) warnings.push("Fas servir «vostè» en un text informal: tracta de «tu».");
    if (wordsArr.length > 40 && used.length === 0) warnings.push("Encara no has fet servir cap connector de la llista: afegeix-n'hi per lligar les idees.");
  }
  const long = lens.filter((n) => n > 35).length;
  if (long) warnings.push(`${long} ${long === 1 ? "frase passa" : "frases passen"} de 35 paraules: divideix-${long === 1 ? "la" : "les"} amb un punt.`);
  if (sentences.length >= 4 && lens.filter((n) => n <= 6).length / sentences.length > 0.5) warnings.push("Moltes frases molt curtes: uneix-ne algunes amb connectors o subordinades.");
  const paragraphs = clean ? clean.split(/\n\s*\n|\n/).filter((x) => x.trim()).length : 0;
  if (wordsArr.length > 120 && paragraphs < 3) warnings.push("Separa el text en paràgrafs (introducció, desenvolupament, tancament).");

  const freq = new Map<string, number>();
  for (const w of wordsArr.map((x) => x.toLowerCase())) if (w.length > 5 && !STOP.has(w)) freq.set(w, (freq.get(w) ?? 0) + 1);
  const repeated = [...freq.entries()].filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([w, n]) => ({ w, n }));
  for (const r of repeated) warnings.push(`Repeteixes «${r.w}» (${r.n} vegades): busca'n un sinònim.`);

  return { words: wordsArr.length, sentences: sentences.length, avgLen: lens.length ? Math.round(lens.reduce((a, b) => a + b, 0) / lens.length) : 0, longSentences: long, paragraphs, used, missing, warnings, repeated };
}

/** Intenta endevinar el tipus de text pel que has escrit. */
export function guessGenre(text: string): string | null {
  const t = text.slice(0, 600).toLowerCase();
  if (t.length < 8) return null;
  if (/senyor director|al director/.test(t)) return "carta-director";
  if (/reclamaci|reclamo|atenci[oó] al client/.test(t)) return "reclamacio";
  if (/\bexposo\b|sol·licito/.test(t)) return "sollicitud";
  if (/^\s*(hola|ei|bon dia)[, !]/.test(t) && !/vost/.test(t)) return "correu-informal";
  if (/(l'objectiu d'aquest informe|aquest informe|s'observa que)/.test(t)) return "informe";
  if (/(estimat|estimada|benvolgut|senyores i senyors)/.test(t)) return "carta-formal";
  return null;
}
