import { useRef, useState } from "react";
import { Page, Section, Card, Btn, Note, Segmented } from "../../components/ui";
import { LiveEditor } from "../../components/LiveEditor";
import { askAI, askJSON, AiError } from "../../lib/ai";
import { countWords } from "../../lib/text";
import { toast } from "../../lib/toast";
import { useStore, setState, award } from "../../lib/store";
import { addError } from "../../lib/notebook";
import { isoDate } from "../../lib/dates";
import { rubricPrompt, normalize, type Correction } from "./rubric";
import { CorrectionCard } from "../route/Unit";
import type { WritingPrompt } from "../../lib/types";

const OCR_PROMPT = `Transcriu EXACTAMENT el text en català que apareix a la imatge (pot ser manuscrit o imprès).
- No corregeixis res: conserva els errors d'ortografia, accents i puntuació tal com estan escrits.
- Respecta els salts de paràgraf.
- Si una paraula no es llegeix, escriu-la entre claudàtors amb la teva millor interpretació: [paraula?].
- Respon només amb el text transcrit, sense cap comentari.`;

type Mode = "redaccio" | "rapida";

/** Fotografia un text (redacció a mà, exercici, fitxa…), l'app el llegeix amb IA i el corregeix. */
export default function Scan() {
  const text = useStore((s) => s.drafts.scan ?? "");
  const setText = (v: string) => setState((s) => ({ ...s, drafts: { ...s.drafts, scan: v } }), { silent: true });
  const [busy, setBusy] = useState<string | null>(null);
  const [pages, setPages] = useState(0);
  const [mode, setMode] = useState<Mode>("redaccio");
  const [words, setWords] = useState<170 | 250>(170);
  const [brief, setBrief] = useState("");
  const [res, setRes] = useState<Correction | null>(null);
  const [quick, setQuick] = useState<{ original: string; correccio: string; explicacio: string }[] | null>(null);
  const cam = useRef<HTMLInputElement>(null);
  const gal = useRef<HTMLInputElement>(null);

  async function read(f: File | undefined, append: boolean) {
    if (!f) return;
    setBusy("Llegint el text de la foto…");
    try {
      const out = (await askAI(OCR_PROMPT, { image: f })).trim();
      if (!out) throw new AiError("upstream", "No s'ha trobat text. Prova amb més llum i enquadrant només el full.");
      setText(append && text ? `${text}\n\n${out}` : out);
      setPages((n) => (append ? n + 1 : 1));
      setRes(null); setQuick(null);
      toast("Text llegit. Revisa'l abans de corregir.");
    } catch (e) {
      toast(e instanceof AiError ? e.message : "No s'ha pogut llegir la foto.");
    } finally {
      setBusy(null);
      if (cam.current) cam.current.value = "";
      if (gal.current) gal.current.value = "";
    }
  }

  async function correct() {
    const n = countWords(text);
    if (n < 15) { toast("Hi ha massa poc text per corregir."); return; }
    setRes(null); setQuick(null);
    const today = isoDate();
    try {
      if (mode === "redaccio") {
        setBusy("Corregint amb la rúbrica del C1…");
        const p: WritingPrompt = { id: "scan", title: "Text escanejat", words, minutes: words === 170 ? 40 : 60, exercise: words === 170 ? "Àrea 3 · exercici 1" : "Àrea 3 · exercici 2", brief: brief.trim() || "Consigna no indicada: avalua el text segons el tipus de text que sembli." };
        const c = normalize(await askJSON(rubricPrompt(p) + `\n\nText de l'alumne (${n} paraules, transcrit d'una foto; si hi ha paraules entre [claudàtors], són dubtes de lectura: no les comptis com a errors):\n"""${text.slice(0, 6000)}"""`));
        if (!c) throw new AiError("invalid_json", "La correcció no ha sortit bé. Torna-ho a provar.");
        setRes(c);
        setState((s) => c.errors.reduce((acc, e) => addError(acc, { wrong: e.original, right: e.correccio, note: e.explicacio, source: "ia" }, today), { ...s, writings: [...s.writings, { at: Date.now(), promptId: "scan", score: Math.round(c.nota), words: n }].slice(-100) }));
        award("exam", "escriptura");
      } else {
        setBusy("Buscant errors…");
        const r = await askJSON<{ errors?: { original?: string; correccio?: string; explicacio?: string }[] }>(`Ets professor de català (nivell C1, Illes Balears; accepta les formes balears normatives). Troba tots els errors d'aquest text (ortografia, accents, apòstrofs, pronoms, barbarismes, concordances, puntuació). Les paraules entre [claudàtors] són dubtes de lectura: ignora-les.
Respon NOMÉS amb JSON: {"errors":[{"original":"fragment exacte","correccio":"forma correcta","explicacio":"explicació breu en castellà"}]}
Text:
"""${text.slice(0, 6000)}"""`);
        const list = (r.errors ?? []).filter((e) => e.original && e.correccio).map((e) => ({ original: e.original!, correccio: e.correccio!, explicacio: e.explicacio ?? "" })).slice(0, 25);
        setQuick(list);
        setState((s) => list.reduce((acc, e) => addError(acc, { wrong: e.original, right: e.correccio, note: e.explicacio, source: "ia" }, today), s));
        award("practice", "escriptura");
      }
    } catch (e) {
      toast(e instanceof AiError ? e.message : "No s'ha pogut corregir.");
    } finally {
      setBusy(null);
    }
  }

  const n = countWords(text);
  return (
    <Page title="Escaneja i corregeix" subtitle="Fes una foto d'una redacció a mà, una fitxa o qualsevol text: l'app el llegeix i el profe IA el corregeix." back={{ to: "practica", label: "Practica" }}>
      <input ref={cam} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => void read(e.target.files?.[0], pages > 0)} />
      <input ref={gal} type="file" accept="image/*" className="hidden" onChange={(e) => void read(e.target.files?.[0], pages > 0)} />

      <Card className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-2">
          <Btn onClick={() => cam.current?.click()} disabled={!!busy}>{pages ? "Afegeix una pàgina" : "Fes una foto"}</Btn>
          <Btn variant="soft" onClick={() => gal.current?.click()} disabled={!!busy}>Tria de la galeria</Btn>
        </div>
        <p className="text-[13px] text-muted">Consells: llum natural, el full pla i ocupant tota la foto, sense ombres. Si el text té diverses pàgines, fes-les d'una en una.</p>
        {busy && <div className="rounded-xl bg-accent/10 p-3 text-[14px] font-medium text-accent">{busy}</div>}
      </Card>

      {(text || pages > 0) && (
        <Section title={`Text llegit · ${n} paraules${pages > 1 ? ` · ${pages} pàgines` : ""}`}>
          <LiveEditor id="scan" value={text} onChange={(v) => { setText(v); setRes(null); setQuick(null); }} rows={10} placeholder="Aquí apareixerà el text de la foto…" />
          <Note>Revisa la lectura abans de corregir: si l'app ha llegit malament una paraula, canvia-la tal com la vas escriure (no la corregeixis tu!).</Note>
        </Section>
      )}

      {text && (
        <Section title="Correcció">
          <Card className="space-y-3 p-4">
            <Segmented value={mode} onChange={(v) => setMode(v as Mode)} options={[{ value: "redaccio", label: "Com a l'examen" }, { value: "rapida", label: "Només errors" }]} />
            {mode === "redaccio" && (
              <>
                <Segmented value={String(words)} onChange={(v) => setWords(Number(v) as 170 | 250)} options={[{ value: "170", label: "Exercici 1 · 170" }, { value: "250", label: "Exercici 2 · 250" }]} />
                <textarea value={brief} onChange={(e) => setBrief(e.target.value)} rows={2} placeholder="Consigna (opcional): enganxa-la o resumeix-la"
                  className="w-full rounded-xl border border-line bg-bg p-3 text-[15px]" />
              </>
            )}
            <Btn block onClick={() => void correct()} disabled={!!busy}>{mode === "redaccio" ? "Corregeix amb la rúbrica" : "Troba els errors"}</Btn>
          </Card>
        </Section>
      )}

      {res && <CorrectionCard c={res} />}
      {quick && (
        <Section title={quick.length ? `${quick.length} errors (desats al quadern)` : "Cap error trobat"}>
          {quick.length > 0 ? (
            <Card className="divide-y divide-line">
              {quick.map((e, i) => (
                <div key={i} className="space-y-1 p-4">
                  <div className="text-[15px]"><s className="text-bad">{e.original}</s> → <b className="text-good">{e.correccio}</b></div>
                  {e.explicacio && <div className="text-[13px] text-muted">{e.explicacio}</div>}
                </div>
              ))}
            </Card>
          ) : <Card className="p-4 text-[15px]">Molt bé! No hi he trobat errors.</Card>}
        </Section>
      )}
    </Page>
  );
}
