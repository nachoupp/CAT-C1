import { describe, it, expect } from "vitest";
import { GENRES } from "./textTypes";

describe("guies d'estil", () => {
  it("cada tipus té passos, connectors i identificadors únics", () => {
    expect(new Set(GENRES.map((g) => g.id)).size).toBe(GENRES.length);
    for (const g of GENRES) {
      expect(g.steps.length).toBeGreaterThanOrEqual(3);
      expect(g.connectors.length).toBeGreaterThan(2);
      expect(new Set(g.steps.map((s) => s.id)).size).toBe(g.steps.length);
    }
  });
  it("el detector reconeix almenys una de les fórmules suggerides de cada pas (sense la fórmula de data)", () => {
    for (const g of GENRES) for (const s of g.steps) {
      if (s.id === "signatura") continue;
      const hit = s.openers.some((o) => s.detect.test(o.replace(/…/g, "").trim()));
      expect(hit, `${g.id}/${s.id}`).toBe(true);
    }
  });
});
