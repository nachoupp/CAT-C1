import type { WritingPrompt } from "../../lib/types";

export interface Correction {
  transcripcio?: string;
  puntuacio: Record<"adequacio" | "coherencia" | "cohesio" | "repertori" | "correccio", number>;
  nota: number;
  punts_forts: string[];
  errors: { original: string; correccio: string; explicacio: string; tipus?: string }[];
  consell: string;
  per_criteri?: Partial<Record<keyof Correction["puntuacio"], string>>;
  frases_millorables?: { original: string; millor: string; per_que: string }[];
  estructura?: { tipus_text?: string; passos: { pas: string; present: boolean; comentari?: string }[] };
  versio_millorada: string;
}

export const CRITERIA: { key: keyof Correction["puntuacio"]; label: string }[] = [
  { key: "adequacio", label: "Adequació" }, { key: "coherencia", label: "Coherència" }, { key: "cohesio", label: "Cohesió" },
  { key: "repertori", label: "Repertori" }, { key: "correccio", label: "Correcció" }
];

export function rubricPrompt(p: WritingPrompt, focus: string[] = []): string {
  const f = focus.length ? `\nCorrecció focalitzada: posa primer els errors relacionats amb ${focus.join("; ")}. El consell ha d'explicar com plantejar millor el text (estructura, idees, registre) en 2-3 frases.` : "\nEl consell ha d'explicar com plantejar millor el text (estructura, idees, registre) en 2-3 frases.";
  return `Ets un corrector expert de les proves oficials de català del Govern de les Illes Balears (nivell C1). L'alumne té un nivell real B1-B2.
Consigna (${p.exercise}, ${p.words} paraules): ${p.brief}
Avalua amb els 5 criteris del GOIB (0-10 cadascun): adequació (tipus de text, registre, consigna, extensió), coherència, cohesió (connectors, puntuació), repertori (lèxic i estructures C1), correcció (ortografia, morfosintaxi, barbarismes). Accepta les formes balears normatives. Sigues exigent però just: nota 60 = aprovat just.
Respon NOMÉS amb JSON: {"puntuacio":{"adequacio":n,"coherencia":n,"cohesio":n,"repertori":n,"correccio":n},"nota":0-100,"punts_forts":["..."],"errors":[{"original":"fragment EXACTE del text de l'alumne","correccio":"forma correcta","tipus":"un de: ortografia, accentuació, gramàtica, pronoms, preposicions, verbs, lèxic, castellanisme, connectors, registre, puntuació","explicacio":"explicació breu en castellà: digues si la forma no existeix, si s'usa en una altra estructura o si és un altre temps verbal"}],"per_criteri":{"adequacio":"com pujar aquest criteri, 1 frase en castellà","coherencia":"…","cohesio":"…","repertori":"…","correccio":"…"},"frases_millorables":[{"original":"frase correcta però pobra o poc C1","millor":"alternativa de nivell C1","per_que":"breu, en castellà"}],"estructura":{"tipus_text":"tipus de text que has detectat","passos":[{"pas":"part de l'estructura esperada (salutació, motiu, arguments, tancament…)","present":true,"comentari":"què hi falta o com millorar-ho, breu"}]},"consell":"un consell concret en castellà","versio_millorada":"el text reescrit a nivell C1 mantenint les idees"}
Màxim 12 errors, els més importants primer; 3 frases millorables com a molt. El camp "original" dels errors ha de ser un fragment que apareix literalment al text.${f}`;
}

/** Valida i normalitza la resposta del model. */
export function normalize(x: unknown): Correction | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Partial<Correction>;
  if (typeof o.nota !== "number" || !o.puntuacio) return null;
  const clamp = (n: unknown, max: number) => Math.max(0, Math.min(max, Number(n) || 0));
  return {
    transcripcio: typeof o.transcripcio === "string" ? o.transcripcio : undefined,
    puntuacio: Object.fromEntries(CRITERIA.map((c) => [c.key, clamp(o.puntuacio?.[c.key], 10)])) as Correction["puntuacio"],
    nota: clamp(o.nota, 100),
    punts_forts: Array.isArray(o.punts_forts) ? o.punts_forts.map(String).slice(0, 4) : [],
    errors: Array.isArray(o.errors) ? o.errors.filter((e) => e && e.original).slice(0, 12).map((e) => ({ original: String(e.original), correccio: String(e.correccio ?? ""), explicacio: String(e.explicacio ?? ""), tipus: e.tipus ? String(e.tipus) : undefined })) : [],
    per_criteri: o.per_criteri && typeof o.per_criteri === "object" ? Object.fromEntries(CRITERIA.filter((c) => o.per_criteri?.[c.key]).map((c) => [c.key, String(o.per_criteri![c.key])])) : undefined,
    frases_millorables: Array.isArray(o.frases_millorables) ? o.frases_millorables.filter((f) => f && f.original && f.millor).slice(0, 4).map((f) => ({ original: String(f.original), millor: String(f.millor), per_que: String(f.per_que ?? "") })) : undefined,
    estructura: o.estructura && Array.isArray(o.estructura.passos) ? { tipus_text: o.estructura.tipus_text ? String(o.estructura.tipus_text) : undefined, passos: o.estructura.passos.filter((p) => p && p.pas).slice(0, 8).map((p) => ({ pas: String(p.pas), present: Boolean(p.present), comentari: p.comentari ? String(p.comentari) : undefined })) } : undefined,
    consell: String(o.consell ?? ""),
    versio_millorada: String(o.versio_millorada ?? "")
  };
}

export type Seg = { text: string; err?: number };

/** Parteix el text en trossos, marcant (la primera aparició de) cada error perquè es pugui ressaltar. */
export function markText(text: string, errors: { original: string }[]): Seg[] {
  const spans: { start: number; end: number; err: number }[] = [];
  errors.forEach((e, err) => {
    const o = e.original.trim();
    if (!o) return;
    let from = 0, i = -1;
    while ((i = text.indexOf(o, from)) >= 0) {
      if (!spans.some((x) => i < x.end && x.start < i + o.length)) { spans.push({ start: i, end: i + o.length, err }); break; }
      from = i + 1;
    }
  });
  spans.sort((a, b) => a.start - b.start);
  const out: Seg[] = [];
  let pos = 0;
  for (const sp of spans) {
    if (sp.start > pos) out.push({ text: text.slice(pos, sp.start) });
    out.push({ text: text.slice(sp.start, sp.end), err: sp.err });
    pos = sp.end;
  }
  if (pos < text.length) out.push({ text: text.slice(pos) });
  return out;
}
