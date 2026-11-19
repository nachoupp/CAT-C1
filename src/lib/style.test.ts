import { describe, it, expect } from "vitest";
import { analyseStyle, guessGenre } from "./style";
import { genreById } from "../content/textTypes";

const formal = genreById("carta-formal")!;

describe("anàlisi d'estil", () => {
  it("detecta connectors usats i pendents", () => {
    const r = analyseStyle("En primer lloc, vull dir que tanmateix no estic d'acord.", formal);
    expect(r.used).toEqual(expect.arrayContaining(["en primer lloc", "tanmateix"]));
    expect(r.missing).not.toContain("tanmateix");
  });
  it("avisa del tu en un text formal i no en un d'informal", () => {
    expect(analyseStyle("Et escric perquè tu ets molt amable.", formal).warnings.join(" ")).toMatch(/tu/);
    expect(analyseStyle("Et escric perquè tu ets molt amable.", genreById("correu-informal")!).warnings.join(" ")).not.toMatch(/«tu»/);
  });
  it("avisa de frases massa llargues i de repeticions", () => {
    const long = Array(40).fill("paraula").join(" ") + ".";
    expect(analyseStyle(long, formal).warnings.join(" ")).toMatch(/35 paraules/);
    expect(analyseStyle("projecte projecte projecte projecte", formal).repeated[0]).toEqual({ w: "projecte", n: 4 });
  });
  it("endevina el tipus de text", () => {
    expect(guessGenre("Senyor director, em dirigeixo a vostè")).toBe("carta-director");
    expect(guessGenre("Hola, Marta! Com va tot?")).toBe("correu-informal");
    expect(guessGenre("Estimat senyor, li escric per")).toBe("carta-formal");
    expect(guessGenre("ok")).toBeNull();
  });
});
