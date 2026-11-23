import { useEffect, useState } from "react";
import { Dictionary } from "../features/learn/Dictionary";

export const OPEN_DICT = "parla:dict";
/** Obre el diccionari flotant des de qualsevol lloc (opcionalment amb una paraula). */
export const openDictionary = (word?: string) => window.dispatchEvent(new CustomEvent(OPEN_DICT, { detail: word ?? "" }));

function selected(): string {
  const t = window.getSelection()?.toString().trim() ?? "";
  return t && t.length <= 40 && !t.includes("\n") ? t : "";
}

/** Botó flotant 📖 + panell de diccionari (cerca, sinònims, conjugació, les meves paraules) disponible a tota l'app. Drecera: Ctrl/⌘+J. */
export function FloatingDictionary() {
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [n, setN] = useState(0);
  const show = (w = "") => { setWord(w); setN((x) => x + 1); setOpen(true); };

  useEffect(() => {
    const on = (e: Event) => show(String((e as CustomEvent).detail ?? ""));
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); show(selected()); }
      else if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_DICT, on);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener(OPEN_DICT, on); window.removeEventListener("keydown", key); };
  }, []);

  return (
    <div data-nogloss className="print:hidden">
      {!open && (
        <button onPointerDown={() => setWord(selected())} onClick={() => show(word)} aria-label="Obre el diccionari" title="Diccionari (Ctrl+J)"
          className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-3 z-20 grid size-12 place-items-center rounded-full bg-accent text-[22px] text-white shadow-lg active:scale-95">📖</button>
      )}
      {open && (
        <>
          <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />
          <section role="dialog" aria-label="Diccionari" className="fixed inset-x-0 bottom-0 z-40 mx-auto flex max-h-[88vh] w-full max-w-xl flex-col rounded-t-3xl border border-line bg-bg shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:mx-0 sm:rounded-3xl">
            <header className="flex items-center justify-between px-4 pt-3 pb-1">
              <b className="text-[17px]">📖 Diccionari</b>
              <button onClick={() => setOpen(false)} className="rounded-full bg-card px-3 py-1.5 text-[14px] font-semibold">Tanca</button>
            </header>
            <div className="overflow-y-auto px-3 pb-6 pt-2"><Dictionary key={n} initial={word} /></div>
          </section>
        </>
      )}
    </div>
  );
}
