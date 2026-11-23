import { useEffect, useState } from "react";
import { Dictionary } from "../features/learn/Dictionary";
import { useStore, setState } from "../lib/store";
import { toast } from "../lib/toast";

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
  const [pinned, setPinned] = useState(() => { try { return localStorage.getItem("parla-c1:dict-pin") === "1"; } catch { return false; } });
  const eye = useStore((x) => x.settings.gloss === true);
  const togglePin = () => setPinned((p) => { const v = !p; try { localStorage.setItem("parla-c1:dict-pin", v ? "1" : "0"); } catch { /* sense emmagatzematge */ } return v; });
  const toggleEye = () => { setState((x) => ({ ...x, settings: { ...x.settings, gloss: !eye } })); toast(eye ? "Traducció en passar per sobre: desactivada" : "Traducció activada: toca (o deixa el ratolí sobre) una paraula"); };
  const [word, setWord] = useState("");
  const [n, setN] = useState(0);
  const show = (w = "") => { setWord(w); setN((x) => x + 1); setOpen(true); };

  useEffect(() => {
    const on = (e: Event) => show(String((e as CustomEvent).detail ?? ""));
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j") { e.preventDefault(); show(selected()); }
      else if (e.key === "Escape" && !pinned) setOpen(false);
    };
    window.addEventListener(OPEN_DICT, on);
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener(OPEN_DICT, on); window.removeEventListener("keydown", key); };
  }, [pinned]);

  return (
    <div data-nogloss className="print:hidden">
      {!(open && !pinned) && (
        <div className={`fixed right-3 z-20 flex flex-col gap-2 ${open ? "bottom-[calc(58vh+1rem)] sm:bottom-[calc(5rem+env(safe-area-inset-bottom))]" : "bottom-[calc(5rem+env(safe-area-inset-bottom))]"}`}>
          <button onClick={toggleEye} aria-pressed={eye} aria-label="Traducció en passar per sobre d'una paraula" title={eye ? "Traducció activada" : "Activa la traducció de paraules"}
            className={`grid size-12 place-items-center rounded-full text-[22px] shadow-lg active:scale-95 ${eye ? "bg-accent text-white" : "bg-card text-muted"}`}>{eye ? "👁" : "🙈"}</button>
          {!open && <button onPointerDown={() => setWord(selected())} onClick={() => show(word)} aria-label="Obre el diccionari" title="Diccionari (Ctrl+J)"
            className="grid size-12 place-items-center rounded-full bg-accent text-[22px] text-white shadow-lg active:scale-95">📖</button>}
        </div>
      )}
      {open && (
        <>
          {!pinned && <div className="fixed inset-0 z-40 bg-black/30" onClick={() => setOpen(false)} />}
          <section role="dialog" aria-label="Diccionari" className={`fixed inset-x-0 bottom-0 z-40 mx-auto flex ${pinned ? "max-h-[58vh]" : "max-h-[88vh]"} w-full max-w-xl flex-col rounded-t-3xl border border-line bg-bg shadow-2xl sm:inset-x-auto sm:bottom-4 sm:right-4 sm:mx-0 sm:rounded-3xl`}>
            <header className="flex items-center justify-between px-4 pt-3 pb-1">
              <b className="text-[17px]">📖 Diccionari</b>
              <span className="flex gap-1.5">
                <button onClick={togglePin} aria-pressed={pinned} title="Fixa el diccionari perquè quedi obert mentre estudies" className={`rounded-full px-3 py-1.5 text-[14px] font-semibold ${pinned ? "bg-accent text-white" : "bg-card"}`}>📌 {pinned ? "Fixat" : "Fixa"}</button>
                <button onClick={() => setOpen(false)} className="rounded-full bg-card px-3 py-1.5 text-[14px] font-semibold">Tanca</button>
              </span>
            </header>
            <div className="overflow-y-auto px-3 pb-6 pt-2"><Dictionary key={n} initial={word} /></div>
          </section>
        </>
      )}
    </div>
  );
}
