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
