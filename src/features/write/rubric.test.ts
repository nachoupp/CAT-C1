import { describe, expect, it } from "vitest";
import { normalize, rubricPrompt } from "./rubric";
import { WRITING_PROMPTS } from "../../content";

describe("correcció amb rúbrica", () => {
  it("normalitza i limita els valors", () => {
    const c = normalize({ nota: 140, puntuacio: { adequacio: 12, coherencia: "7" }, errors: [{ original: "desde", correccio: "des de" }, { foo: 1 }] });
    expect(c?.nota).toBe(100);
    expect(c?.puntuacio.adequacio).toBe(10);
    expect(c?.puntuacio.coherencia).toBe(7);
    expect(c?.puntuacio.cohesio).toBe(0);
    expect(c?.errors).toHaveLength(1);
  });
  it("rebutja respostes buides", () => {
    expect(normalize(null)).toBeNull();
    expect(normalize({ nota: "x" })).toBeNull();
  });
  it("el prompt inclou la consigna i l'extensió", () => {
    const p = WRITING_PROMPTS[0];
    expect(rubricPrompt(p)).toContain(String(p.words));
  });
});

import { markText } from "./rubric";
describe("markText", () => {
  it("marca la primera aparició de cada error sense solapar", () => {
    const segs = markText("No va venir perquè estava malalt. Ell va venir perquè sí.", [{ original: "No va venir" }, { original: "perquè" }]);
    expect(segs.filter((x) => x.err !== undefined).map((x) => x.text)).toEqual(["No va venir", "perquè"]);
    expect(segs.map((x) => x.text).join("")).toBe("No va venir perquè estava malalt. Ell va venir perquè sí.");
  });
  it("ignora errors que no apareixen al text", () => {
    expect(markText("Hola", [{ original: "adéu" }]).every((x) => x.err === undefined)).toBe(true);
  });
});
