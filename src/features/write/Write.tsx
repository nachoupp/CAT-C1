import { useEffect, useRef, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Bar, Note, ExtLink } from "../../components/ui";
import { WRITING_PROMPTS, LINKS } from "../../content";
import { useStore, setState, markDone } from "../../lib/store";
import { countWords, fmtClock } from "../../lib/text";
import { checkText, applyFix, type LtMatch } from "../../lib/languagetool";
import { askJSON, AiError } from "../../lib/ai";
import { toast } from "../../lib/toast";
import { rubricPrompt, normalize, CRITERIA, type Correction } from "./rubric";

export default function Write() {
  const [pid, setPid] = useState(WRITING_PROMPTS[0].id);
  const p = WRITING_PROMPTS.find((x) => x.id === pid)!;
  const draft = useStore((s) => s.drafts[pid] ?? "");
  const history = useStore((s) => s.writings);
  const [lt, setLt] = useState<LtMatch[] | null>(null);
  const [ltErr, setLtErr] = useState<string | null>(null);
  const [res, setRes] = useState<Correction | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [left, setLeft] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const n = countWords(draft);

  useEffect(() => { setLt(null); setRes(null); setLtErr(null); setLeft(null); }, [pid]);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { toast("Temps d'examen exhaurit"); setLeft(null); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const setDraft = (v: string) => setState((s) => ({ ...s, drafts: { ...s.drafts, [pid]: v } }));

  const runLt = async () => {
    if (n < 5) { toast("Escriu una mica més"); return; }
    setBusy("Revisant l'ortografia…"); setLtErr(null);
    try { setLt(await checkText(draft)); } catch { setLtErr("El corrector no respon ara mateix. Prova-ho d'aquí a un minut."); }
    finally { setBusy(null); }
  };

  const save = (c: Correction, words: number) => {
    setState((s) => ({ ...s, writings: [...s.writings, { at: Date.now(), promptId: pid, score: Math.round(c.nota), words }].slice(-100) }));
    markDone("escrita");
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
    <Page title="Escriu" subtitle="Redacció tipus Àrea 3: escriu-la aquí o fes-la en paper i envia'n la foto.">
      <Card className="space-y-3 p-4">
        <label htmlFor="prompt" className="text-[13px] text-muted">Consigna</label>
        <select id="prompt" value={pid} onChange={(e) => setPid(e.target.value)} className="w-full rounded-xl bg-bg px-3 py-2.5">
          {WRITING_PROMPTS.map((w) => <option key={w.id} value={w.id}>{w.title} · {w.words} paraules</option>)}
        </select>
        <div className="flex flex-wrap gap-1.5"><Pill>{p.exercise}</Pill><Pill tone="muted">{p.words} paraules · {p.minutes} min</Pill>{best && <Pill tone={best.score >= 60 ? "good" : "warn"}>Última nota: {best.score}</Pill>}</div>
        <p>{p.brief}</p>
      </Card>

      <Card className="mt-3 space-y-3 p-4">
        <textarea id="draft" aria-label="La teva redacció" rows={12} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Escriu el teu text aquí…"
          className="w-full resize-y rounded-xl bg-bg p-3 text-[17px] leading-relaxed" spellCheck={false} />
        <div className="flex items-center justify-between text-[14px] tabular">
          <span><b className={n >= p.words * 0.9 ? "text-good" : ""}>{n}</b> / {p.words} paraules</span>
          <span className={left !== null && left < 300 ? "font-semibold text-bad" : "text-muted"}>{left === null ? `${p.minutes}:00` : fmtClock(left)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn variant="soft" onClick={() => setLeft(left === null ? p.minutes * 60 : null)}>{left === null ? "Rellotge d'examen" : "Atura el rellotge"}</Btn>
          <Btn variant="soft" onClick={runLt} disabled={!!busy}>Revisa l'ortografia</Btn>
          <Btn onClick={runAi} disabled={!!busy}>Corregeix amb la rúbrica</Btn>
        </div>
        <div className="text-[14px] text-muted">
          O fes-la a mà:{" "}
          <label className="cursor-pointer font-medium text-accent">
            <input ref={fileRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) void runPhoto(f); }} />
            envia'n una foto
          </label>{" "}i la IA la transcriu i la corregeix.
        </div>
      </Card>

      {busy && <Card className="mt-3 p-4 text-muted">{busy}</Card>}

      {(lt || ltErr) && (
        <Section title="Ortografia i gramàtica">
          <List>
            {ltErr && <Row title={ltErr} />}
            {lt && lt.length === 0 && <Row title="No s'ha trobat cap error" detail="Ara prova la correcció amb rúbrica." />}
            {lt?.slice(0, 30).map((m, i) => (
              <Row key={`${m.offset}-${m.rule.id}`} chevron={false}
                title={<span className="text-bad">«{draft.slice(m.offset, m.offset + m.length)}»</span>}
                detail={<>
                  {m.message}
                  {m.replacements.length > 0 && (
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {m.replacements.slice(0, 3).map((r) => (
                        <button key={r.value} className="rounded-full bg-good/15 px-2.5 py-0.5 text-xs font-semibold text-good"
                          onClick={() => { const x = applyFix(draft, lt, i, r.value); setDraft(x.text); setLt(x.matches); }}>{r.value}</button>
                      ))}
                    </span>
                  )}
                </>} />
            ))}
          </List>
          <Note>Corrector: <ExtLink href={LINKS.languagetool}>LanguageTool</ExtLink>. El text s'envia al seu servei per revisar-lo.</Note>
        </Section>
      )}

      {res && <CorrectionView c={res} />}

      <Section title="Fitxes en paper"><List><Row title="Diagnòstic i fitxes de reforç" detail="Per fer a mà i enviar-ne la foto" to="fitxes" /></List></Section>
    </Page>
  );
}

function CorrectionView({ c }: { c: Correction }) {
  return (
    <>
      <Section title="Correcció amb rúbrica GOIB">
        <Card className="space-y-3.5 p-4">
          {c.transcripcio && <div><div className="text-[13px] text-muted">Transcripció de la foto</div><div className="whitespace-pre-wrap">{c.transcripcio}</div></div>}
          <div className="flex items-center justify-between">
            <div><div className="text-[44px] font-bold leading-none tabular">{Math.round(c.nota)}</div><div className="mt-1 text-[13px] text-muted">nota orientativa / 100</div></div>
            <Pill tone={c.nota >= 60 ? "good" : "warn"}>{c.nota >= 60 ? "Aprovaria" : "Encara no"}</Pill>
          </div>
          {CRITERIA.map((k) => (
            <div key={k.key}>
              <div className="mb-1 flex justify-between text-[14px]"><span>{k.label}</span><span className="tabular">{c.puntuacio[k.key]}/10</span></div>
              <Bar value={c.puntuacio[k.key] * 10} tone={c.puntuacio[k.key] >= 6 ? "good" : "warn"} />
            </div>
          ))}
        </Card>
      </Section>
      {c.punts_forts.length > 0 && <Section title="Punts forts"><Card className="space-y-1.5 p-4 text-[15px]">{c.punts_forts.map((x) => <div key={x}>✓ {x}</div>)}</Card></Section>}
      {c.errors.length > 0 && (
        <Section title="Errors">
          <List>{c.errors.map((e, i) => <Row key={i} title={<><s className="text-bad">{e.original}</s> → <b className="text-good">{e.correccio}</b></>} detail={e.explicacio} />)}</List>
        </Section>
      )}
      {c.consell && <Section title="Consell"><Card className="p-4">{c.consell}</Card></Section>}
      {c.versio_millorada && <Section title="Versió millorada"><Card className="whitespace-pre-wrap p-4 leading-relaxed">{c.versio_millorada}</Card></Section>}
      <Note>Nota orientativa feta per IA. La nota oficial la decideix el tribunal.</Note>
    </>
  );
}
