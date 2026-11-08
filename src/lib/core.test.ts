import { describe, expect, it } from "vitest";
import { addDays, daysBetween, isoDate, weekday } from "./dates";
import { grade, isDue, pickForSession, dueCount, INTERVALS } from "./srs";
import { dailyPlan } from "./plan";
import { readiness, weakestArea } from "./readiness";
import { buildIcs } from "./ics";
import { countWords, shuffle, fmtClock } from "./text";
import { applyFix } from "./languagetool";
import { parseJSON } from "./ai";
import { initialState, streak, exportCode, importCode } from "./store";
import { BANK, MILESTONES, LESSONS, WRITING_PROMPTS, ofTheDay } from "../content";

describe("dates", () => {
  it("compta dies i en suma", () => {
    expect(daysBetween("2026-11-08", "2027-03-06")).toBe(118);
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(isoDate(new Date(2027, 2, 6))).toBe("2027-03-06");
    expect(weekday("2026-11-08")).toBe(0);
  });
});

describe("repetició espaiada", () => {
  it("puja de caixa en encertar i torna a 0 en fallar", () => {
    const a = grade(undefined, true, "2026-11-08");
    expect(a.box).toBe(1);
    expect(a.due).toBe(addDays("2026-11-08", INTERVALS[1]));
    const b = grade(a, false, "2026-11-09");
    expect(b).toMatchObject({ box: 0, due: "2026-11-09", wrong: 1, seen: 2 });
    expect(isDue(b, "2026-11-09")).toBe(true);
  });
  it("prioritza els vençuts i fallats", () => {
    const cards = { a: { box: 0, due: "2026-11-01", seen: 3, wrong: 3 }, b: { box: 5, due: "2027-01-01", seen: 5, wrong: 0 } };
    const pick = pickForSession(["a", "b", "c"], cards, 2, "2026-11-08", () => 0);
    expect(pick).toEqual(["a", "c"]);
    expect(dueCount(["a", "b"], cards, "2026-11-08")).toBe(1);
  });
});

describe("pla diari", () => {
  it("dilluns toca redacció i hi ha sempre repàs i píndola", () => {
    const p = dailyPlan("2026-11-09", "2027-03-06", "oral", 4);
    expect(p.map((t) => t.key)).toEqual(["repas", "escrita", "pindola"]);
    expect(p[0].detail).toContain("4");
  });
  it("el diumenge reforça l'àrea més feble", () => {
    expect(dailyPlan("2026-11-08", "2027-03-06", "oral", 0)[1].key).toBe("oral");
  });
  it("a prop de l'examen prioritza simulacres", () => {
    expect(dailyPlan("2027-02-26", "2027-03-06", "oral", 0)[1].key).toBe("sim");
  });
});

describe("preparació per àrea", () => {
  it("sense dades, la més feble és la primera mesurable sense nota", () => {
    const r = readiness(initialState());
    expect(r.every((x) => x.score === null)).toBe(true);
    expect(weakestArea(r)).toBe("sistema");
  });
  it("els simulacres compten doble", () => {
    const s = { ...initialState(), quizzes: [{ at: 1, ok: 5, n: 10, kind: "practice" as const }, { at: 2, ok: 8, n: 10, kind: "exam" as const }],
      writings: [{ at: 1, promptId: "w1", score: 40, words: 170 }], speaking: [{ at: 1, scenario: "x", score: 70 }] };
    const r = readiness(s);
    expect(r.find((x) => x.area === "sistema")?.score).toBe(70);
    expect(weakestArea(r)).toBe("escrita");
  });
});

describe("utilitats", () => {
  it("ics vàlid amb un esdeveniment per fita", () => {
    const ics = buildIcs(MILESTONES);
    expect(ics.startsWith("BEGIN:VCALENDAR")).toBe(true);
    expect(ics.split("BEGIN:VEVENT").length - 1).toBe(MILESTONES.length);
  });
  it("compta paraules, barreja i formata el rellotge", () => {
    expect(countWords("  Bon dia,  com estàs? ")).toBe(4);
    expect(shuffle([1, 2, 3], () => 0).sort()).toEqual([1, 2, 3]);
    expect(fmtClock(125)).toBe("2:05");
  });
  it("aplica una correcció i desplaça la resta", () => {
    const m = [
      { message: "", offset: 0, length: 5, replacements: [], rule: { id: "a" } },
      { message: "", offset: 10, length: 2, replacements: [], rule: { id: "b" } }
    ];
    const r = applyFix("desde casa ok", m, 0, "des de");
    expect(r.text).toBe("des de casa ok");
    expect(r.matches[0].offset).toBe(11);
  });
  it("llegeix JSON envoltat de text", () => {
    expect(parseJSON<{ a: number }>("Aquí tens:\n```json\n{\"a\":1}\n```")).toEqual({ a: 1 });
    expect(parseJSON<number[]>("[1,2]")).toEqual([1, 2]);
  });
  it("ratxa i codi de progrés", () => {
    expect(streak({ "2026-11-07": { a: true }, "2026-11-06": { a: true } }, "2026-11-08")).toBe(2);
    const s = { ...initialState(), drafts: { w1: "Àrea amb accents" } };
    expect(importCode(exportCode(s)).drafts.w1).toBe("Àrea amb accents");
  });
});

describe("contingut", () => {
  it("cada pregunta té resposta, 2 distractors i explicació", () => {
    for (const b of BANK) {
      expect(b.distractors).toHaveLength(2);
      expect(b.distractors).not.toContain(b.answer);
      expect(b.explanation.length).toBeGreaterThan(5);
    }
    expect(new Set(BANK.map((b) => b.id)).size).toBe(BANK.length);
  });
  it("hi ha píndoles, consignes i fites", () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(18);
    expect(WRITING_PROMPTS.every((w) => w.words === 170 || w.words === 250)).toBe(true);
    expect(MILESTONES.length).toBeGreaterThan(5);
    expect(ofTheDay([1, 2, 3], "2026-11-08")).toBe(ofTheDay([1, 2, 3], "2026-11-08"));
  });
});
