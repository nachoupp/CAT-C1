import { useEffect, useMemo, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Pill, Icon, Note, Bar, Check, type IconTone } from "../../components/ui";
import { ItemQuiz, ResultsList, type ItemResult } from "../../components/ItemQuiz";
import { LiveEditor } from "../../components/LiveEditor";
import { UNITS, STEPS, unitPool, type Unit, type UnitContent, type PracticeItem } from "../../content/units";
import { LESSONS } from "../../content";
import { RULES_BY_UNIT } from "../../content/rules";
import { RulesBar } from "../../components/ItemQuiz";
import { useStore, setState, award } from "../../lib/store";
import type { StepKey } from "../../lib/types";
import { isoDate } from "../../lib/dates";
import { countWords, fmtClock, shuffle } from "../../lib/text";
import { playText } from "../../lib/audio";
import { AudioPlayer } from "../../components/AudioPlayer";
import { askJSON, AiError } from "../../lib/ai";
import { addError } from "../../lib/notebook";
import { go } from "../../lib/router";
import { toast } from "../../lib/toast";
import { rubricPrompt, normalize, CRITERIA, type Correction } from "../write/rubric";
import { markStep, stepDone, unitUnlocked } from "./progress";

const TONE: Record<StepKey, IconTone> = { descobreix: "sist", practica: "accent", escriu: "escr", parla: "oral", examen: "good" };
const XP_KIND = { descobreix: "practice", practica: "practice", escriu: "guided", parla: "oral", examen: "exam" } as const;

function complete(u: Unit, step: StepKey, score?: number) {
  setState((s) => markStep(s, u.id, step, score));
  award(XP_KIND[step], step);
}

export function UnitHome({ id }: { id: string }) {
  const s = useStore((x) => x);
  const u = UNITS.find((x) => x.id === id);
  if (!u || !u.content) return <Page title="Unitat no disponible" back={{ to: "ruta", label: "Ruta" }}><Note>Aquesta unitat encara s'està preparant.</Note></Page>;
  const p = s.units[u.id];
  return (
    <Page title={`Unitat ${u.n} · ${u.title}`} subtitle={`${u.grammar} · ${u.genre} · ${u.oralTask}`} back={{ to: "ruta", label: "Ruta" }}>
      {!unitUnlocked(s, u) && <Card className="mb-3 bg-warn/15 p-4">Aquesta unitat encara està bloquejada. Pots mirar-la, però et recomano acabar l'anterior.</Card>}
      <List>
        {STEPS.map((x, i) => (
          <Row key={x.key} to={`unit-${u.id}-${x.key}`}
            left={<Icon tone={stepDone(s, u.id, x.key) ? "good" : TONE[x.key]}>{stepDone(s, u.id, x.key) ? "✓" : i + 1}</Icon>}
            title={x.label} detail={`${x.detail} · +${x.xp} XP`}
            right={x.key === "examen" && p?.examScore !== undefined ? <Pill tone={p.examScore >= 60 ? "good" : "warn"}>{p.examScore}</Pill> : undefined} />
        ))}
      </List>
      <Note>La unitat queda superada quan completes els 5 passos i treus almenys un 60 a l'examen de la unitat. Té {u.content.examples?.length ?? 0} exemples i {unitPool(u.content).length} exercicis: cada vegada que practiques en surten de diferents.</Note>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Btn variant="soft" onClick={() => go(`unit-${u.id}-practica`)}>Practica més</Btn>
        <Btn variant="soft" onClick={() => go(`unit-${u.id}-descobreix`)}>Exemples</Btn>
      </div>
      <Section title="Píndoles de la unitat">
        <List>{u.content.lessons.map((lid) => { const l = LESSONS.find((x) => x.id === lid); return l ? <Row key={lid} title={l.title} detail={l.area} to={`lesson-${lid}`} /> : null; })}</List>
      </Section>
    </Page>
  );
}

export function UnitStep({ id, step }: { id: string; step: StepKey }) {
  const u = UNITS.find((x) => x.id === id);
  if (!u || !u.content) return <UnitHome id={id} />;
  const back = { to: `unit-${u.id}`, label: `Unitat ${u.n}` };
  const meta = STEPS.find((x) => x.key === step)!;
  const props = { u, c: u.content };
  return (
    <Page title={meta.label} subtitle={`Unitat ${u.n} · ${u.title}`} back={back}>
      {step === "descobreix" && <Discover {...props} />}
      {step === "practica" && <PracticeStep {...props} />}
      {step === "escriu" && <GuidedWrite {...props} />}
      {step === "parla" && <OralStep {...props} />}
      {step === "examen" && <UnitExam {...props} />}
    </Page>
  );
}

function Done({ u, text }: { u: Unit; text: string }) {
  const state = useStore((s) => s);
  const next = STEPS.find((x) => !stepDone(state, u.id, x.key));
  return (
    <Card className="pop mt-4 space-y-3 p-5 text-center">
      <div className="text-[34px]" aria-hidden>🎉</div>
      <div className="text-[18px] font-semibold">{text}</div>
      <div className="flex justify-center gap-2">
        {next ? <Btn onClick={() => go(`unit-${u.id}-${next.key}`)}>Següent: {next.label}</Btn> : <Btn onClick={() => go("ruta")}>Torna a la ruta</Btn>}
        <Btn variant="soft" onClick={() => go(`unit-${u.id}`)}>Unitat</Btn>
      </div>
    </Card>
  );
}

/* 1 · Descobreix: test previ → píndola → text model anotat */
function Discover({ u, c }: { u: Unit; c: UnitContent }) {
  const [phase, setPhase] = useState<"pre" | "learn" | "examples" | "model" | "done">("pre");
  const [pre, setPre] = useState<ItemResult[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const parts = useMemo(() => splitWithNotes(c.model.text, c.model.notes.map((n) => n.quote)), [c]);
  if (phase === "pre") {
    return (
      <>
        <Card className="mb-4 bg-sist/10 p-4 text-[15px]">Comencem amb 5 preguntes ràpides. No passa res si falles: posar-te a prova abans d'estudiar ajuda a recordar millor.</Card>
        <ItemQuiz items={c.pretest} rules={RULES_BY_UNIT[u.id]} title="Test previ" onFinish={(r) => { setPre(r); setPhase("learn"); }} />
      </>
    );
  }
  if (phase === "learn") {
    return (
      <>
        <Card className="mb-4 p-4"><b className="tabular">{pre.filter((r) => r.ok).length}/5</b> al test previ. Ara, la teoria clau en 2 minuts.</Card>
        <RulesExplorer rules={RULES_BY_UNIT[u.id] ?? []} />
        {c.lessons.map((lid) => {
          const l = LESSONS.find((x) => x.id === lid);
          return l ? (
            <Section key={lid} title={l.title}>
              <Card className="prose-lesson p-4 text-[16.5px] leading-relaxed"><div dangerouslySetInnerHTML={{ __html: l.html }} /></Card>
            </Section>
          ) : null;
        })}
        <div className="mt-5"><Btn block onClick={() => setPhase("examples")}>Veure exemples</Btn></div>
      </>
    );
  }
  if (phase === "examples") {
    return (
      <>
        <Examples u={u} c={c} />
        <div className="mt-5"><Btn block onClick={() => setPhase("model")}>Veure el text model</Btn></div>
      </>
    );
  }
  // Text model amb anotacions tocables
  return (
    <>
      <Card className="p-4">
        <div className="text-[13px] text-muted">{c.model.genre}</div>
        <div className="mt-1 text-[19px] font-bold">{c.model.title}</div>
        <div className="mt-3"><AudioPlayer text={c.model.text} label="Escolta el text model" /></div>
        <div className="mt-3 whitespace-pre-wrap text-[16.5px] leading-[1.7]">
          {parts.map((p, i) => p.note === null ? <span key={i}>{p.text}</span> : (
            <mark key={i} className="note" role="button" tabIndex={0} aria-pressed={open === p.note} onClick={() => setOpen(p.note)} onKeyDown={(e) => { if (e.key === "Enter") setOpen(p.note); }}>{p.text}</mark>
          ))}
        </div>
      </Card>
      <Card className="mt-3 min-h-16 bg-accent/10 p-4 text-[15px]">
        {open === null ? "Toca les parts marcades per veure per què funcionen." : <><b>«{c.model.notes[open].quote}»</b> · {c.model.notes[open].note}</>}
      </Card>
      <Section title="Claus del text"><List>{c.model.notes.map((n, i) => <Row key={i} title={`«${n.quote}»`} detail={n.note} />)}</List></Section>
      {phase === "model" ? (
        <div className="mt-5"><Btn block onClick={() => { complete(u, "descobreix", Math.round((pre.filter((r) => r.ok).length / 5) * 100)); setPhase("done"); }}>Ja ho tinc</Btn></div>
      ) : <Done u={u} text="Pas 1 completat · +20 XP" />}
    </>
  );
}

function RulesExplorer({ rules }: { rules: Parameters<typeof RulesBar>[0]["rules"] }) {
  const [open, setOpen] = useState<string | null>(rules[0]?.id ?? null);
  if (!rules.length) return null;
  return (
    <Section title="Les regles, una a una">
      <p className="mx-1 mb-1 text-[14px] text-muted">Toca cada regla. Les tindràs sempre a la vista quan facis els exercicis.</p>
      <RulesBar rules={rules} open={open} setOpen={setOpen} />
    </Section>
  );
}

function Examples({ u, c }: { u: Unit; c: UnitContent }) {
  const [more, setMore] = useState<{ ca: string; note: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const all = [...(c.examples ?? []), ...more];
  const gen = async () => {
    setBusy(true);
    try {
      const r = await askJSON<{ ca: string; note: string }[]>(`Escriu 6 frases d'exemple noves, variades i naturals, en català estàndard (formes balears permeses), per il·lustrar aquest tema de nivell B2-C1: «${u.grammar}». Context: ${u.title}. Cada frase ha d'anar amb una explicació molt breu (màxim 12 paraules) del fenomen gramatical. No repeteixis aquestes: ${all.map((x) => x.ca).join(" | ")}.
Respon NOMÉS amb JSON: [{"ca":"frase","note":"explicació"}]`);
      const ok = (Array.isArray(r) ? r : []).filter((x) => x && typeof x.ca === "string" && typeof x.note === "string").slice(0, 6);
      if (!ok.length) throw new AiError("invalid_json", "No s'han pogut generar exemples. Torna-ho a provar.");
      setMore((m) => [...m, ...ok]);
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'han pogut generar exemples."); }
    finally { setBusy(false); }
  };
  return (
    <>
      <Card className="mb-3 bg-sist/10 p-4 text-[15px]">Llegeix cada exemple en veu alta. Fixa't en la part que explica la nota i intenta dir una frase teva amb la mateixa estructura.</Card>
      <List>
        {all.map((x, i) => (
          <div key={i} className="flex items-start gap-3 px-4 py-3">
            <div className="min-w-0 flex-1"><div className="text-[16.5px] font-medium">{x.ca}</div><div className="text-[13.5px] text-muted">{x.note}</div></div>
            <button aria-label={`Escolta: ${x.ca}`} className="grid size-8 flex-none place-items-center rounded-full bg-accent/10 text-accent" onClick={() => void playText(x.ca)}>▶</button>
          </div>
        ))}
      </List>
      <div className="mt-3"><Btn variant="soft" block disabled={busy} onClick={gen}>{busy ? "Creant exemples…" : "Més exemples amb IA"}</Btn></div>
    </>
  );
}

function splitWithNotes(text: string, quotes: string[]): { text: string; note: number | null }[] {
  const marks: { start: number; end: number; note: number }[] = [];
  quotes.forEach((q, i) => {
    const at = text.indexOf(q);
    if (at >= 0 && !marks.some((m) => at < m.end && m.start < at + q.length)) marks.push({ start: at, end: at + q.length, note: i });
  });
  marks.sort((a, b) => a.start - b.start);
  const out: { text: string; note: number | null }[] = [];
  let pos = 0;
  for (const m of marks) { if (m.start > pos) out.push({ text: text.slice(pos, m.start), note: null }); out.push({ text: text.slice(m.start, m.end), note: m.note }); pos = m.end; }
  if (pos < text.length) out.push({ text: text.slice(pos), note: null });
  return out;
}

/* 2 · Practica: 20 exercicis sortejats del banc de la unitat (cada vegada, diferents) */
function validItem(x: unknown): PracticeItem | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  if (typeof o.q !== "string" || typeof o.e !== "string") return null;
  if (o.type === "choice" && Array.isArray(o.options) && typeof o.answer === "string" && o.options.includes(o.answer) && o.options.length >= 2)
    return { type: "choice", q: o.q, options: shuffle(o.options.map(String)).slice(0, 4), answer: o.answer, e: o.e };
  if ((o.type === "gap" || o.type === "fix") && Array.isArray(o.answers) && o.answers.length)
    return { type: o.type, q: o.q, answers: o.answers.map(String), e: o.e };
  return null;
}

function PracticeStep({ u, c }: { u: Unit; c: UnitContent }) {
  const [round, setRound] = useState(0);
  const [aiItems, setAiItems] = useState<PracticeItem[] | null>(null);
  const [busy, setBusy] = useState(false);
  const items = useMemo(() => aiItems ?? shuffle(unitPool(c)).slice(0, 20), [c, round, aiItems]);
  const [res, setRes] = useState<ItemResult[] | null>(null);
  const firstTime = !useStore((s) => s.units[u.id]?.steps.practica);

  const again = () => { setAiItems(null); setRes(null); setRound(round + 1); window.scrollTo({ top: 0 }); };
  const genAi = async () => {
    setBusy(true);
    try {
      const raw = await askJSON<unknown[]>(`Crea 10 exercicis nous per practicar aquest tema del català (nivell B2-C1, certificat del GOIB): «${u.grammar}». Context temàtic: ${u.title}.
Barreja tipus: 6 de tria múltiple (3 opcions, només una correcta) i 4 de completar un buit (___) amb una o dues paraules. Normativa de l'IEC, formes balears acceptades. Explicació breu en català.
Respon NOMÉS amb JSON: [{"type":"choice","q":"frase amb ___","options":["a","b","c"],"answer":"a","e":"explicació"},{"type":"gap","q":"frase amb ___","answers":["resposta","variant acceptada"],"e":"explicació"}]`);
      const ok = (Array.isArray(raw) ? raw : []).map(validItem).filter((x): x is PracticeItem => !!x);
      if (ok.length < 4) throw new AiError("invalid_json", "La IA no ha generat prou exercicis vàlids. Torna-ho a provar.");
      setAiItems(ok); setRes(null); window.scrollTo({ top: 0 });
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'han pogut generar exercicis."); }
    finally { setBusy(false); }
  };

  if (!res) {
    return (
      <>
        {aiItems && <Card className="mb-3 bg-accent/10 p-3 text-[14px]">Exercicis nous generats per IA. Si en veus algun de dubtós, consulta'l al DIEC.</Card>}
        <ItemQuiz key={`${round}-${aiItems ? "ia" : "b"}`} items={items} rules={RULES_BY_UNIT[u.id]} title="Exercici" onFinish={(r) => {
          const today = isoDate();
          setState((s) => r.filter((x) => !x.ok).reduce((acc, x) => addError(acc, { wrong: x.given, right: x.item.type === "choice" ? x.item.answer : x.item.answers[0], note: x.item.e, source: "test", link: u.id }, today), s));
          const score = Math.round((r.filter((x) => x.ok).length / r.length) * 100);
          if (firstTime) complete(u, "practica", score); else award("quiz", "practica");
          setRes(r);
        }} />
      </>
    );
  }
  const ok = res.filter((x) => x.ok).length;
  return (
    <>
      <Card className="space-y-2 p-5 text-center"><div className="text-[44px] font-bold tabular">{ok}/{res.length}</div><Pill tone={ok / res.length >= 0.6 ? "good" : "warn"}>{ok / res.length >= 0.6 ? "Bona base per escriure" : "Repassa les fallades abans d'escriure"}</Pill><div className="text-[14px] text-muted">Les fallades s'han desat al quadern d'errors.</div></Card>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Btn variant="soft" onClick={again}>20 exercicis més</Btn>
        <Btn variant="soft" disabled={busy} onClick={genAi}>{busy ? "Creant…" : "10 nous amb IA"}</Btn>
      </div>
      {firstTime ? null : <Note>Banc de la unitat: {unitPool(c).length} exercicis. Cada ronda en sorteja 20 de diferents.</Note>}
      <Done u={u} text="Pas 2 completat · +20 XP" />
      <Section title="Correcció"><ResultsList results={res} /></Section>
    </>
  );
}

/* 3 · Escriu guiat: esquelet amb buits + píndoles en directe */
function GuidedWrite({ u, c }: { u: Unit; c: UnitContent }) {
  const key = `${u.id}-guiat`;
  const draft = useStore((s) => s.drafts[key]) ?? c.skeleton.template;
  const [done, setDone] = useState(false);
  const set = (v: string) => setState((s) => ({ ...s, drafts: { ...s.drafts, [key]: v } }));
  const gaps = (draft.match(/___/g) ?? []).length;
  return (
    <>
      <Card className="space-y-2 p-4"><p>{c.skeleton.brief}</p><ul className="list-disc space-y-0.5 pl-5 text-[14.5px] text-muted">{c.skeleton.tips.map((t) => <li key={t}>{t}</li>)}</ul></Card>
      <RulesSticky rules={RULES_BY_UNIT[u.id] ?? []} />
      <Card className="mt-3 p-4"><LiveEditor id="guided" value={draft} onChange={set} rows={16} /></Card>
      <div className="mt-2 text-[13.5px] text-muted">{gaps > 0 ? `Et queden ${gaps} buits (___) per omplir.` : "Has omplert tots els buits."}</div>
      {!done ? (
        <div className="mt-4"><Btn block disabled={gaps > 0 || countWords(draft) < 80} onClick={() => { complete(u, "escriu"); setDone(true); }}>He acabat el text</Btn></div>
      ) : <Done u={u} text="Pas 3 completat · +30 XP" />}
    </>
  );
}

/* 4 · Parla: lectura amb model (shadowing) + exposició 4/3/2 + conversa */
const ROUNDS = [180, 120, 90];
function OralStep({ u, c }: { u: Unit; c: UnitContent }) {
  const [round, setRound] = useState(0);
  const [left, setLeft] = useState(ROUNDS[0]);
  const [run, setRun] = useState(false);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if (!run) return;
    if (left <= 0) {
      setRun(false);
      if (round + 1 < ROUNDS.length) { toast("Temps! Ara torna-ho a dir en menys temps."); setRound(round + 1); setLeft(ROUNDS[round + 1]); }
      else { toast("Molt bé! Tres rondes fetes."); }
      return;
    }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [run, left, round]);
  const allDone = round === ROUNDS.length - 1 && left <= 0;
  return (
    <>
      <Section title="1 · Llegeix amb el model">
        <Card className="space-y-3 p-4">
          <p className="text-[17.5px] leading-relaxed">{c.oral.reading}</p>
          <p className="text-[14px] text-muted">Escolta'l, després llegeix-lo en veu alta imitant el ritme i l'entonació. Repeteix-ho dues vegades.</p>
          <AudioPlayer text={c.oral.reading} label="Model de lectura" />
        </Card>
      </Section>
      <Section title="2 · Exposició 4/3/2">
        <Card className="space-y-4 p-4">
          <div className="text-[20px] font-bold leading-snug">{c.oral.topic}</div>
          <div className="text-[14px] text-muted">Digues el mateix tres vegades, cada cop amb menys temps: 3 minuts, 2 i 1,5. Grava't amb el mòbil per escoltar-te.</div>
          <div className="flex flex-wrap gap-1.5">{c.oral.phrases.map((p) => <span key={p} className="rounded-full bg-oral/10 px-2.5 py-1 text-[13px] text-oral">{p}</span>)}</div>
          <div className="flex items-center justify-center gap-2">{ROUNDS.map((r, i) => <span key={r} className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${i < round || (i === round && allDone) ? "bg-good/15 text-good" : i === round ? "bg-oral/15 text-oral" : "bg-line text-muted"}`}>Ronda {i + 1} · {fmtClock(r)}</span>)}</div>
          <div className="text-center text-[54px] font-bold tracking-tight tabular">{fmtClock(left)}</div>
          <Btn block variant={run ? "soft" : "primary"} disabled={allDone} onClick={() => setRun(!run)}>{run ? "Pausa" : left === ROUNDS[round] ? `Comença la ronda ${round + 1}` : "Continua"}</Btn>
        </Card>
      </Section>
      <Section title="3 · Conversa (opcional)">
        <List><Row left={<Icon tone="oral">IA</Icon>} title="Practica amb l'interlocutor" detail="Situació de la unitat, amb avaluació final" onClick={() => go(`parla-unit-${u.id}`)} /></List>
      </Section>
      {!finished ? (
        <div className="mt-5"><Btn block disabled={!allDone} onClick={() => { complete(u, "parla"); setFinished(true); }}>{allDone ? "Marca el pas com a fet" : "Fes les tres rondes per completar-lo"}</Btn></div>
      ) : <Done u={u} text="Pas 4 completat · +40 XP" />}
    </>
  );
}

/* 5 · Examen de la unitat: text lliure + correcció focalitzada + reescriptura */
function UnitExam({ u, c }: { u: Unit; c: UnitContent }) {
  const key1 = `${u.id}-examen`, key2 = `${u.id}-reescriptura`;
  const v1 = useStore((s) => s.drafts[key1]) ?? "";
  const v2 = useStore((s) => s.drafts[key2]);
  const best = useStore((s) => s.units[u.id]?.examScore);
  const [res, setRes] = useState<Correction | null>(null);
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const [self, setSelf] = useState<boolean[]>(c.exam.checklist.map(() => false));
  const prompt = { id: key1, title: u.genre, words: c.exam.words, minutes: c.exam.minutes, exercise: `Examen de la unitat ${u.n}`, brief: c.exam.brief };
  const n = countWords(v1);
  useEffect(() => {
    if (left === null) return;
    if (left <= 0) { toast("Temps exhaurit"); setLeft(null); return; }
    const t = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const setDraft = (k: string, v: string) => setState((s) => ({ ...s, drafts: { ...s.drafts, [k]: v } }));

  const correct = async (text: string, rewrite: boolean) => {
    setBusy(true);
    try {
      const r = normalize(await askJSON(rubricPrompt(prompt, c.exam.focus) + `\n\nText de l'alumne (${countWords(text)} paraules):\n"""${text.slice(0, 6000)}"""`));
      if (!r) throw new AiError("invalid_json", "La correcció no ha sortit bé. Torna-ho a provar.");
      setRes(r);
      const today = isoDate();
      setState((s) => {
        let x = r.errors.reduce((acc, e) => addError(acc, { wrong: e.original, right: e.correccio, note: e.explicacio, source: "ia", link: u.id }, today), s);
        x = markStep(x, u.id, "examen", Math.round(r.nota));
        x = { ...x, writings: [...x.writings, { at: Date.now(), promptId: key1, score: Math.round(r.nota), words: countWords(text) }].slice(-100) };
        if (rewrite) x = { ...x, units: { ...x.units, [u.id]: { ...x.units[u.id], rewritten: true } } };
        return x;
      });
      award(rewrite ? "rewrite" : "exam", "examen");
    } catch (e) { toast(e instanceof AiError ? e.message : "No s'ha pogut corregir."); }
    finally { setBusy(false); }
  };
  const selfPass = () => {
    const score = Math.round((self.filter(Boolean).length / self.length) * 100);
    setState((s) => markStep(s, u.id, "examen", score));
    award("exam", "examen");
    toast(score >= 60 ? "Pas completat amb autoavaluació" : "Encara no arriba al 60: revisa els punts pendents");
  };

  return (
    <>
      <Card className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1.5"><Pill>{u.genre}</Pill><Pill tone="muted">{c.exam.words} paraules · {c.exam.minutes} min</Pill>{best !== undefined && <Pill tone={best >= 60 ? "good" : "warn"}>Millor nota: {best}</Pill>}</div>
        <p>{c.exam.brief}</p>
        <div className="text-[13.5px] text-muted">S'avaluarà sobretot: {c.exam.focus.join(" · ")}.</div>
      </Card>
      <RulesSticky rules={RULES_BY_UNIT[u.id] ?? []} />
      <Card className="mt-3 space-y-3 p-4">
        <div className="flex items-center justify-between"><span className="font-medium">Primera versió</span>
          <button className={`text-[14px] font-semibold tabular ${left !== null && left < 300 ? "text-bad" : "text-accent"}`} onClick={() => setLeft(left === null ? c.exam.minutes * 60 : null)}>{left === null ? `Rellotge ${c.exam.minutes}:00` : fmtClock(left)}</button>
        </div>
        <LiveEditor id="exam1" value={v1} onChange={(v) => setDraft(key1, v)} target={c.exam.words} />
        <Btn block disabled={busy || n < 60} onClick={() => correct(v1, false)}>{busy ? "Corregint…" : "Lliura i corregeix"}</Btn>
      </Card>

      {res && <CorrectionCard c={res} />}

      {res && (
        <Section title="Reescriu-lo (+20 XP)">
          <Card className="space-y-3 p-4">
            <p className="text-[14.5px] text-muted">Reescriure amb les correccions és el que més fa millorar. No copiïs la versió millorada: corregeix el teu text.</p>
            <LiveEditor id="exam2" value={v2 ?? v1} onChange={(v) => setDraft(key2, v)} target={c.exam.words} />
            <Btn block disabled={busy} onClick={() => correct(v2 ?? v1, true)}>{busy ? "Corregint…" : "Corregeix la segona versió"}</Btn>
          </Card>
        </Section>
      )}

      <Section title="Sense IA? Autoavalua't">
        <Card className="space-y-2.5 p-4">
          {c.exam.checklist.map((t, i) => (
            <label key={t} className="flex items-center gap-3"><Check on={self[i]} onClick={() => setSelf(self.map((x, j) => (j === i ? !x : x)))} label={t} /><span>{t}</span></label>
          ))}
          <Btn variant="soft" onClick={selfPass} disabled={n < 100}>Completa amb autoavaluació</Btn>
        </Card>
      </Section>
      {best !== undefined && best >= 60 && <Done u={u} text={`Unitat ${u.n} superada!`} />}
    </>
  );
}

function RulesSticky({ rules }: { rules: Parameters<typeof RulesBar>[0]["rules"] }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!rules.length) return null;
  return <RulesBar rules={rules} open={open} setOpen={setOpen} />;
}

export function CorrectionCard({ c }: { c: Correction }) {
  return (
    <>
      <Section title="Correcció">
        <Card className="space-y-3.5 p-4">
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
      {c.consell && <Section title="Com plantejar-lo millor"><Card className="bg-accent/10 p-4">{c.consell}</Card></Section>}
      {c.errors.length > 0 && <Section title="Errors (desats al quadern)"><List>{c.errors.map((e, i) => <Row key={i} title={<><s className="text-bad">{e.original}</s> → <b className="text-good">{e.correccio}</b></>} detail={e.explicacio} />)}</List></Section>}
      {c.punts_forts.length > 0 && <Section title="Punts forts"><Card className="space-y-1.5 p-4 text-[15px]">{c.punts_forts.map((x) => <div key={x}>✓ {x}</div>)}</Card></Section>}
      {c.versio_millorada && (
        <Section title="Versió millorada">
          <details className="rounded-2xl bg-card p-4"><summary className="cursor-pointer font-medium text-accent">Mostra-la quan hagis reescrit el teu</summary><div className="mt-3 whitespace-pre-wrap leading-relaxed">{c.versio_millorada}</div></details>
        </Section>
      )}
      <Note>Nota orientativa feta per IA. La nota oficial la decideix el tribunal.</Note>
    </>
  );
}
