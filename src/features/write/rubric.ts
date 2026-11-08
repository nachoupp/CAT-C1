import type { WritingPrompt } from "../../lib/types";

export interface Correction {
  transcripcio?: string;
  puntuacio: Record<"adequacio" | "coherencia" | "cohesio" | "repertori" | "correccio", number>;
  nota: number;
  punts_forts: string[];
  errors: { original: string; correccio: string; explicacio: string }[];
  consell: string;
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
Respon NOMÉS amb JSON: {"puntuacio":{"adequacio":n,"coherencia":n,"cohesio":n,"repertori":n,"correccio":n},"nota":0-100,"punts_forts":["..."],"errors":[{"original":"fragment","correccio":"forma correcta","explicacio":"explicació breu en castellà"}],"consell":"un consell concret en castellà","versio_millorada":"el text reescrit a nivell C1 mantenint les idees"}
Màxim 12 errors, els més importants primer.${f}`;
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
    errors: Array.isArray(o.errors) ? o.errors.filter((e) => e && e.original).slice(0, 12).map((e) => ({ original: String(e.original), correccio: String(e.correccio ?? ""), explicacio: String(e.explicacio ?? "") })) : [],
    consell: String(o.consell ?? ""),
    versio_millorada: String(o.versio_millorada ?? "")
  };
}
