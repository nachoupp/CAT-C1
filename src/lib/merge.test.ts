import { describe, expect, it } from "vitest";
import { mergeStates } from "./merge";
import { initialState } from "./store";

describe("fusió de progrés entre dispositius", () => {
  it("no perd activitat de cap dispositiu", () => {
    const a = { ...initialState(), updatedAt: 100, log: { "2026-11-08": { repas: true as const } }, xp: [{ at: 1, kind: "quiz", xp: 10 }], drafts: { w1: "A" },
      units: { u1: { steps: { descobreix: { at: 1 } }, passed: false } } };
    const b = { ...initialState(), updatedAt: 200, log: { "2026-11-08": { escrita: true as const }, "2026-11-09": { oral: true as const } }, xp: [{ at: 2, kind: "exam", xp: 50 }], drafts: { w1: "B" },
      units: { u1: { steps: { practica: { at: 2, score: 80 } }, passed: false, examScore: 70 } } };
    const m = mergeStates(a, b);
    expect(Object.keys(m.log["2026-11-08"]).sort()).toEqual(["escrita", "repas"]);
    expect(m.log["2026-11-09"]).toBeDefined();
    expect(m.xp).toHaveLength(2);
    expect(m.drafts.w1).toBe("B");
    expect(Object.keys(m.units.u1.steps).sort()).toEqual(["descobreix", "practica"]);
    expect(m.units.u1.examScore).toBe(70);
    expect(m.updatedAt).toBe(200);
  });
  it("conserva el millor resultat de controls i errors", () => {
    const card = (seen: number) => ({ box: seen, due: "2026-11-08", seen, wrong: 0 });
    const a = { ...initialState(), checkpoints: { c1: { passed: true, score: 70, at: 1 } }, notebook: [{ id: "x", wrong: "desde", right: "des de", note: "", source: "test" as const, count: 3, added: "2026-11-01", card: card(4) }] };
    const b = { ...initialState(), checkpoints: { c1: { passed: false, score: 50, at: 2 } }, notebook: [{ id: "x", wrong: "desde", right: "des de", note: "", source: "test" as const, count: 1, added: "2026-11-01", card: card(1) }] };
    const m = mergeStates(a, b);
    expect(m.checkpoints.c1).toMatchObject({ passed: true, score: 70 });
    expect(m.notebook[0].count).toBe(3);
    expect(m.notebook[0].card.seen).toBe(4);
  });
});
