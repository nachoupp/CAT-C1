import { describe, it, expect } from "vitest";
import { analyse, highlight, normalizeOral, oralPrompt, ORAL_CRITERIA } from "./oral";

const words = (s: string, step = 0.4) => s.split(" ").map((w, i) => ({ text: w, start: i * step, end: i * step + 0.3 }));

describe("anàlisi oral", () => {
  it("mesura ritme, crosses, pauses i connectors", () => {
    const text = "Bueno en primer lloc eh tinc que dir que a més a més el turisme és important";
    const w = words(text);
    w[8] = { ...w[8], start: w[7].end + 3, end: w[7].end + 3.3 }; // una pausa llarga
    for (let i = 9; i < w.length; i++) { w[i] = { ...w[i], start: w[i].start + 3, end: w[i].end + 3 }; }
    const m = analyse({ text, words: w, duration: 10 }, ["En primer lloc", "A més a més", "Per tant"]);
    expect(m.words).toBe(17);
    expect(m.fillerTotal).toBe(2);
    expect(m.pauses).toBe(1);
    expect(m.connectors).toEqual(["En primer lloc", "A més a més"]);
    expect(m.hits.some((h) => h.rule.id === "tenir-que")).toBe(true);
    expect(m.wpm).toBeGreaterThan(50);
  });

  it("ressalta errors i crosses sense solapaments i conserva el text", () => {
    const text = "Eh jo tinc que anar-hi, pues";
    const m = analyse({ text, words: words(text), duration: 3 });
    const spans = highlight(text, m);
    expect(spans.map((s) => s.text).join("")).toBe(text);
    expect(spans.find((s) => s.kind === "filler")?.text).toBe("Eh");
    expect(spans.find((s) => s.text === "pues")?.kind).toBeDefined();
    expect(spans.find((s) => s.kind === "error")?.text).toBe("tinc que");
  });

  it("normalitza respostes incompletes de la IA", () => {
    const f = normalizeOral({ nota: 140, criteris: [{ nom: "Fluïdesa", nota: 7 }], errors: [{ dit: "tinc que", millor: "he de" }, { dit: "x" }] });
    expect(f.nota).toBe(100);
    expect(f.criteris.map((c) => c.nom)).toEqual(ORAL_CRITERIA);
    expect(f.criteris.find((c) => c.nom === "Fluïdesa")?.nota).toBe(7);
    expect(f.errors).toHaveLength(1);
    expect(normalizeOral(null).criteris).toHaveLength(5);
  });

  it("el prompt inclou el tema i les mètriques", () => {
    const text = "Hola a tothom";
    const p = oralPrompt("El turisme", { text, words: words(text), duration: 2 }, analyse({ text, words: words(text), duration: 2 }));
    expect(p).toContain("El turisme");
    expect(p).toContain("paraules/minut");
  });
});
