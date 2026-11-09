import { describe, expect, it } from "vitest";
import { detect, applyHit, isCorrect, RULES } from "./errors";
import { level, weekStreak, weekStart, medals, XP } from "./game";
import { addError, reviewError, alive, dueErrors } from "./notebook";
import { initialState, migrate } from "./store";
import { UNITS, CHECKPOINTS, STEPS, unitPool } from "../content/units";
import { MOCKS } from "../content/mocks";
import { markStep, nextStep, unitUnlocked } from "../features/route/progress";

describe("detector d'errors en directe", () => {
  it("troba castellanismes típics i en suggereix la correcció", () => {
    const hits = detect("Desde ahir tinc que estudiar a nivell de gramàtica, sin embargo estic content.");
    expect(hits.map((h) => h.rule.id)).toEqual(["desde", "tenir-que", "a-nivell", "sin-embargo"]);
    expect(applyHit("Desde ahir", hits[0], "des de")).toBe("Des de ahir");
  });
  it("no marca formes correctes", () => {
    const ok = "Des que vaig arribar, he d'estudiar. Tinc gana i ganes de parlar. L'illa és bonica i l'hora arriba. Han hagut de marxar. El que vull és aprovar; això és tot, però també cal estudiar.";
    expect(detect(ok)).toEqual([]);
  });
  it("detecta apòstrof incorrecte i el corregeix", () => {
    const [h] = detect("Vaig a l'universitat");
    expect(h.rule.id).toBe("apos-univ");
    expect(applyHit("Vaig a l'universitat", h, "la ")).toBe("Vaig a la universitat");
  });
  it("totes les regles compilen i tenen correcció", () => {
    for (const r of RULES) { expect(r.fixes.length).toBeGreaterThan(0); expect(() => new RegExp(r.pattern, "u")).not.toThrow(); }
  });
  it("compara respostes escrites amb tolerància", () => {
    expect(isCorrect("  La vaig conèixer a l’institut. ", ["La vaig conèixer a l'institut"])).toBe(true);
    expect(isCorrect("la conec", ["La vaig conèixer"])).toBe(false);
  });
});

describe("gamificació", () => {
  it("el nivell depèn dels punts i dels controls", () => {
    const s = { ...initialState(), xp: [{ at: 1, kind: "exam", xp: 1500 }] };
    expect(level(s).name).toBe("B1+");
    expect(level(s).blockedByCheckpoint).toBe(true);
    const s2 = { ...s, checkpoints: { c1: { passed: true, score: 70, at: 1 } } };
    expect(level(s2).name).toBe("B2");
  });
  it("la ratxa compta setmanes amb 4 sessions", () => {
    const log: Record<string, Record<string, true>> = {};
    for (const d of ["2026-11-02", "2026-11-03", "2026-11-04", "2026-11-05", "2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12"]) log[d] = { x: true };
    const r = weekStreak({ ...initialState(), log }, "2026-11-13");
    expect(r.thisWeek).toBe(4);
    expect(r.weeks).toBe(2);
    expect(weekStart("2026-11-08")).toBe("2026-11-02");
  });
  it("les medalles comencen sense guanyar", () => {
    expect(medals(initialState()).every((m) => !m.earned)).toBe(true);
    expect(XP.exam).toBeGreaterThan(XP.quiz);
  });
});

describe("quadern d'errors", () => {
  it("afegeix, compta repeticions i es domina amb el repàs", () => {
    let s = addError(initialState(), { wrong: "desde", right: "des de", note: "", source: "test" }, "2026-11-08");
    s = addError(s, { wrong: "desde", right: "des de", note: "", source: "ia" }, "2026-11-08");
    expect(s.notebook).toHaveLength(1);
    expect(s.notebook[0].count).toBe(2);
    expect(dueErrors(s, "2026-11-08")).toHaveLength(1);
    s = reviewError(s, s.notebook[0].id, true, "2026-11-08");
    s = reviewError(s, s.notebook[0].id, true, "2026-11-09");
    s = reviewError(s, s.notebook[0].id, true, "2026-11-11");
    expect(alive(s)).toHaveLength(0);
  });
  it("ignora entrades buides o iguals", () => {
    expect(addError(initialState(), { wrong: "hola", right: "Hola", note: "", source: "test" }, "2026-11-08").notebook).toHaveLength(0);
  });
});

describe("ruta", () => {
  it("les unitats 1-6 tenen contingut complet, molts exemples i molts exercicis", () => {
    for (const u of UNITS.slice(0, 6)) {
      const c = u.content!;
      expect(c.pretest).toHaveLength(5);
      expect(c.practice.length).toBeGreaterThanOrEqual(20);
      expect(unitPool(c).length).toBeGreaterThanOrEqual(35);
      expect(c.examples!.length).toBeGreaterThanOrEqual(12);
      expect(new Set(unitPool(c).map((x) => x.q + "|" + (x.type === "choice" ? x.answer : x.answers[0]))).size).toBe(unitPool(c).length);
      for (const it of [...c.pretest, ...unitPool(c)]) {
        if (it.type === "choice") expect(it.options).toContain(it.answer);
        else expect(it.answers.length).toBeGreaterThan(0);
      }
      for (const n of c.model.notes) expect(c.model.text).toContain(n.quote);
      expect(c.skeleton.template).toContain("___");
    }
    expect(UNITS).toHaveLength(18);
    expect(CHECKPOINTS.every((cp) => cp.afterUnit % 3 === 0)).toBe(true);
  });
  it("la unitat se supera amb els 5 passos i un 60 a l'examen", () => {
    let s = initialState();
    expect(nextStep(s)).toMatchObject({ unit: { id: "u1" }, step: { key: "descobreix" } });
    for (const st of STEPS) s = markStep(s, "u1", st.key, st.key === "examen" ? 55 : undefined);
    expect(s.units.u1.passed).toBe(false);
    s = markStep(s, "u1", "examen", 72);
    expect(s.units.u1.passed).toBe(true);
    expect(unitUnlocked(s, UNITS[1])).toBe(true);
  });
  it("després de la unitat 3 cal el control", () => {
    let s = initialState();
    for (const id of ["u1", "u2", "u3"]) for (const st of STEPS) s = markStep(s, id, st.key, 80);
    expect(nextStep(s)).toMatchObject({ checkpoint: { id: "c1" } });
    expect(unitUnlocked(s, UNITS[3])).toBe(false);
  });
});

describe("exàmens i migració", () => {
  it("l'examen Parla és coherent", () => {
    for (const m of MOCKS) {
      for (const it of [...m.listening, ...m.reading].flatMap((x) => x.items)) expect(it.options).toContain(it.answer);
      expect(m.writing.reduce((a, w) => a + w.weight, 0)).toBe(100);
    }
  });
  it("migra l'estat v4 sense perdre dades", () => {
    const s = migrate({ version: 4, drafts: { w1: "hola" }, settings: { tts: false } });
    expect(s.version).toBe(5);
    expect(s.drafts.w1).toBe("hola");
    expect(s.notebook).toEqual([]);
    expect(s.settings.tts).toBe(false);
    expect(s.settings.goalExam).toBe("2027-10-02");
  });
});

import { RULES_BY_UNIT, ruleFor, whyNot } from "../content/rules";
describe("professor interactiu", () => {
  it("cada unitat disponible té regles", () => {
    for (const u of UNITS.slice(0, 6)) expect(RULES_BY_UNIT[u.id]?.length).toBeGreaterThanOrEqual(4);
  });
  it("explica per què una opció és incorrecta", () => {
    const r = RULES_BY_UNIT.u2;
    expect(whyNot("en", "hi", r)).toContain("de");
    expect(whyNot("anglés", "anglès", RULES_BY_UNIT.u5)).toContain("accent");
    expect(whyNot("plassa", "plaça", RULES_BY_UNIT.u5)).toContain("essa");
    expect(ruleFor(r, "hi", "Lloc → hi.")?.id).toBe("hi");
  });
  it("la majoria de distractors de les unitats tenen explicació automàtica", () => {
    let total = 0, ok = 0;
    for (const u of UNITS.slice(0, 6)) for (const it of [...u.content!.pretest, ...unitPool(u.content!)]) {
      if (it.type !== "choice") continue;
      for (const o of it.options) if (o !== it.answer) { total++; if (whyNot(o, it.answer, RULES_BY_UNIT[u.id])) ok++; }
    }
    expect(ok / total).toBeGreaterThan(0.5);
  });
});

import { isCorrectItem } from "./errors";
import { UNITS as ALL_UNITS, unitPool as poolOf } from "../content/units";
describe("correcció d'exercicis escrits", () => {
  it("accepta la paraula o la frase sencera", () => {
    const fix = { type: "fix", q: "Corregeix la paraula incorrecta: «Lo que vull és aprovar.»", answers: ["el", "allò"] };
    expect(isCorrectItem("el", fix)).toBe(true);
    expect(isCorrectItem("El que vull és aprovar.", fix)).toBe(true);
    expect(isCorrectItem("Allò que vull és aprovar", fix)).toBe(true);
    expect(isCorrectItem("Lo que vull és aprovar.", fix)).toBe(false);
    expect(isCorrectItem("El que vull és suspendre.", fix)).toBe(false);
    const multi = { type: "fix", q: "Corregeix l'expressió incorrecta: «Tinc que parlar-li avui.»", answers: ["he de"] };
    expect(isCorrectItem("He de parlar-li avui.", multi)).toBe(true);
    const gap = { type: "gap", q: "Passarem ___ (per + el) centre.", answers: ["pel"] };
    expect(isCorrectItem("pel", gap)).toBe(true);
    expect(isCorrectItem("Passarem pel centre.", gap)).toBe(true);
    expect(isCorrectItem("Passarem per el centre.", gap)).toBe(false);
  });
  it("cada exercici fix accepta la seva frase corregida", () => {
    for (const u of ALL_UNITS) {
      if (!u.content) continue;
      for (const it of poolOf(u.content)) {
        if (it.type !== "fix") continue;
        const m = it.q.match(/«([^»]+)»/);
        if (!m) continue;
        expect(isCorrectItem(it.answers[0], it)).toBe(true);
      }
    }
  });
});
