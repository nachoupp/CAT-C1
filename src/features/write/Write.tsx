import { useEffect, useRef, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill } from "../../components/ui";
import { WRITING_PROMPTS } from "../../content";
import { useStore, setState, award } from "../../lib/store";
import { addError } from "../../lib/notebook";
import { isoDate } from "../../lib/dates";
import { LiveEditor } from "../../components/LiveEditor";
import { countWords, fmtClock } from "../../lib/text";
import { askJSON, AiError } from "../../lib/ai";
import { toast } from "../../lib/toast";
import { rubricPrompt, normalize, type Correction } from "./rubric";
import { CorrectionCard } from "../route/Unit";

export default function Write() {
  const [pid, setPid] = useState(WRITING_PROMPTS[0].id);
  const [custom, setCustom] = useState({ brief: "", words: 170 as 170 | 250 });
  const p = pid === "custom"
    ? { id: "custom", title: "Consigna pròpia", words: custom.words, minutes: custom.words === 170 ? 40 : 60, exercise: "Consigna pròpia", brief: custom.brief || "Enganxa aquí la consigna oficial." }
    : WRITING_PROMPTS.find((x) => x.id === pid)!;
  const draft = useStore((s) => s.drafts[pid] ?? "");
  const history = useStore((s) => s.writings);
  const [res, setRes] = useState<Correction | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const n = countWords(draft);

  useEffect(() => { setRes(null); setLeft(null); }, [pid]);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { toast("Temps d'examen exhaurit"); setLeft(null); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const setDraft = (v: string) => setState((s) => ({ ...s, drafts: { ...s.drafts, [pid]: v } }));

  const save = (c: Correction, words: number) => {
    const today = isoDate();
    setState((s) => c.errors.reduce((acc, e) => addError(acc, { wrong: e.original, right: e.correccio, note: e.explicacio, source: "ia" }, today), { ...s, writings: [...s.writings, { at: Date.now(), promptId: pid, score: Math.round(c.nota), words }].slice(-100) }));
    award("exam", "escriptura");
  };

  const runAi = async () => {
    if (n < 40) { toast("Escriu almenys 40 paraules"); return; }
    setBusy("Corregint amb la rúbrica oficial… pot trigar un minut."); setRes(null);
    try {
      const c = normalize(await askJSON(rubricPrompt(p) + `\n\nText de l'alumne (${n} paraules):\n"""${draft.slice(0, 6000)}"""`));
      if (!c) throw new AiError("invalid_json", "La correcció no ha sortit bé. Torna-ho a provar.");
      setRes(c); save(c, n);
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut corregir."); }
    finally { setBusy(null); }
  };

  const runPhoto = async (f: File) => {
    setBusy("Llegint la foto i corregint… pot trigar un minut."); setRes(null);
    try {
      const c = normalize(await askJSON(rubricPrompt(p) + "\nLa imatge és una redacció manuscrita de l'alumne. Primer transcriu-la exactament, sense corregir, al camp \"transcripcio\" del JSON, i després avalua-la.", { image: f }));
      if (!c) throw new AiError("invalid_json", "No s'ha pogut llegir la foto. Prova amb més llum i enquadrant només el text.");
      if (c.transcripcio) setDraft(c.transcripcio);
      setRes(c); save(c, countWords(c.transcripcio ?? ""));
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut enviar la foto."); }
    finally { setBusy(null); if (fileRef.current) fileRef.current.value = ""; }
  };

  const best = history.filter((h) => h.promptId === pid).at(-1);
  return (
    <Page title="Escriu lliure" subtitle="Redacció tipus Àrea 3 amb píndoles correctores en directe." back={{ to: "practica", label: "Practica" }}>
      <Card className="space-y-3 p-4">
        <label htmlFor="prompt" className="text-[13px] text-muted">Consigna</label>
        <select id="prompt" value={pid} onChange={(e) => setPid(e.target.value)} className="w-full rounded-xl bg-bg px-3 py-2.5">
          {WRITING_PROMPTS.map((w) => <option key={w.id} value={w.id}>{w.title} · {w.words} paraules</option>)}
          <option value="custom">Consigna pròpia (p. ex. d'un examen oficial)</option>
        </select>
        {pid === "custom" && (
          <div className="space-y-2">
            <textarea id="custom-brief" aria-label="Consigna" rows={3} value={custom.brief} onChange={(e) => setCustom({ ...custom, brief: e.target.value })} placeholder="Enganxa la consigna…" className="w-full rounded-xl bg-bg p-3" />
            <select aria-label="Extensió" value={custom.words} onChange={(e) => setCustom({ ...custom, words: +e.target.value as 170 | 250 })} className="rounded-xl bg-bg px-3 py-2"><option value={170}>170 paraules</option><option value={250}>250 paraules</option></select>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5"><Pill>{p.exercise}</Pill><Pill tone="muted">{p.words} paraules · {p.minutes} min</Pill>{best && <Pill tone={best.score >= 60 ? "good" : "warn"}>Última nota: {best.score}</Pill>}</div>
        <p>{p.brief}</p>
      </Card>

      <Card className="mt-3 space-y-3 p-4">
        <div className="flex items-center justify-between"><span className="font-medium">El teu text</span>
          <button className={`text-[14px] font-semibold tabular ${left !== null && left < 300 ? "text-bad" : "text-accent"}`} onClick={() => setLeft(left === null ? p.minutes * 60 : null)}>{left === null ? `Rellotge ${p.minutes}:00` : fmtClock(left)}</button>
        </div>
        <LiveEditor id="draft" value={draft} onChange={setDraft} target={p.words} placeholder="Escriu el teu text aquí…" />
        <Btn block onClick={runAi} disabled={!!busy}>Corregeix amb la rúbrica</Btn>
        <div className="text-[14px] text-muted">
          O fes-la a mà:{" "}
          <label className="cursor-pointer font-medium text-accent">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void runPhoto(f); }} />
            envia'n una foto
          </label>{" "}i la IA la transcriu i la corregeix.
        </div>
      </Card>

      {busy && <Card className="mt-3 p-4 text-muted">{busy}</Card>}

      {res && <CorrectionCard c={res} />}

      <Section title="Fitxes en paper"><List><Row title="Diagnòstic i fitxes de reforç" detail="Per fer a mà i enviar-ne la foto" to="fitxes" /></List></Section>
    </Page>
  );
}
