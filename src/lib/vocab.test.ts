import { describe, it, expect } from "vitest";
import { initialState } from "./store";
import { addWord, dueWords, hasWord, removeWord, reviewWord } from "./vocab";
import { mergeStates } from "./merge";

describe("les meves paraules", () => {
  const today = "2026-11-19";
  it("desa sense duplicats i recorda la paraula", () => {
    let s = addWord(initialState(), { word: "Enyorar", es: "echar de menos" }, today);
    s = addWord(s, { word: "enyorar ", es: "otra" }, today);
    expect(s.vocab).toHaveLength(1);
    expect(hasWord(s, "ENYORAR")).toBe(true);
  });
  it("ignora entrades buides", () => {
    expect(addWord(initialState(), { word: "", es: "x" }, today).vocab).toHaveLength(0);
    expect(addWord(initialState(), { word: "x", es: " " }, today).vocab).toHaveLength(0);
  });
  it("repassa: encertar l'ajorna, fallar la fa venir avui", () => {
    let s = addWord(initialState(), { word: "tanmateix", es: "sin embargo" }, today);
    expect(dueWords(s, today)).toHaveLength(1);
    s = reviewWord(s, "tanmateix", true, today);
    expect(dueWords(s, today)).toHaveLength(0);
    s = reviewWord(s, "tanmateix", false, today);
    expect(dueWords(s, today)).toHaveLength(1);
    expect(removeWord(s, "tanmateix").vocab).toHaveLength(0);
  });
  it("la fusió entre dispositius conserva les paraules dels dos", () => {
    const a = addWord(initialState(), { word: "una", es: "a" }, today);
    const b = addWord(initialState(), { word: "altra", es: "b" }, today);
    expect(mergeStates(a, b).vocab.map((x) => x.id).sort()).toEqual(["altra", "una"]);
  });
});
