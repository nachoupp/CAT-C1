import { useEffect, useRef, useState, type ReactNode } from "react";
import { Page } from "../../components/ui";
import { askAI, AiError, type Turn } from "../../lib/ai";
import { useRecorder } from "../../lib/recorder";
import { transcribe, SttError } from "../../lib/stt";
import { playText } from "../../lib/audio";
import { getState, setState, award } from "../../lib/store";
import { alive } from "../../lib/notebook";
import { toast } from "../../lib/toast";

interface Msg extends Turn { photo?: boolean }

const instruction = () => {
  const s = getState();
  const errs = [...alive(s)].sort((a, b) => b.count - a.count).slice(0, 8).map((e) => `«${e.wrong}» → «${e.right}»`).join("; ");
  const last = s.writings.slice(-3).map((w) => w.score);
  return `Ets el profe de català personal d'una alumna que prepara el C1 del GOIB (Illes Balears). Ella és hispanoparlant, té un nivell real B1-B2 i fa servir l'app Parla C1.
Normes:
- Explica en castellà, clar i breu, i posa els exemples sempre en català (formes balears normatives acceptades).
- Respostes curtes (màxim ~150 paraules) llevat que demani més. Sense introduccions ni floritures.
- Quan expliquis una regla: regla en una frase, 2-3 exemples, i la trampa típica d'un hispanoparlant.
- Si et demana exercicis, proposa'n UN cada vegada, espera la resposta i corregeix-la explicant per què (si una opció incorrecta no existeix, s'usa en una altra estructura o és d'un altre temps verbal, digues-ho).
- Si t'envia una frase o un text, corregeix-lo: marca els errors, dona la forma correcta i explica el motiu.
- Pots fer servir **negreta** i llistes amb guionet. Res més de format.
${errs ? `Errors que més repeteix (quadern): ${errs}.` : "Encara no té errors al quadern."}
${last.length ? `Notes de les últimes redaccions: ${last.join(", ")}/100.` : ""}`;
};

const CHIPS = [
  "Explica'm una regla que em costi",
  "Posa'm exercicis dels meus errors",
  "Quina diferència hi ha entre «per què», «perquè», «per tal que» i «porqué»?",
  "Corregeix aquesta frase: ",
  "Fes-me una mini-conversa de pràctica",
  "Com preparo l'examen escrit?"
];

const inline = (t: string): ReactNode[] => t.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") && p.endsWith("**") && p.length > 4 ? <b key={i}>{p.slice(2, -2)}</b> : p));
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((l, i) => {
        const b = l.match(/^\s*[-*•]\s+(.*)/), n = l.match(/^\s*(\d+)[.)]\s+(.*)/);
        if (b) return <div key={i} className="flex gap-2 pl-1"><span>•</span><span>{inline(b[1])}</span></div>;
        if (n) return <div key={i} className="flex gap-2 pl-1"><span className="tabular">{n[1]}.</span><span>{inline(n[2])}</span></div>;
        return l.trim() ? <div key={i}>{inline(l)}</div> : <div key={i} className="h-2" />;
      })}
    </>
  );
}

function loadHistory(): Msg[] {
  try { const r = JSON.parse(getState().drafts.tutor ?? "[]") as Msg[]; return Array.isArray(r) ? r.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string") : []; } catch { return []; }
}
const saveHistory = (m: Msg[]) => setState((s) => ({ ...s, drafts: { ...s.drafts, tutor: JSON.stringify(m.slice(-30)) } }), { silent: true });

/** Xat amb el profe IA: dubtes, exercicis a mida dels teus errors, correcció de frases i fotos. */
export default function Tutor() {
  const [msgs, setMsgs] = useState<Msg[]>(loadHistory);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const rec = useRecorder(60);
  const alone = useRef(true);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, busy]);
  useEffect(() => () => { alone.current = false; rec.reset(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Dictar amb el micro: la transcripció s'afegeix a la caixa de text.
  const handled = useRef(true);
  useEffect(() => {
    if (rec.state === "denied") { toast("No hi ha permís per al micròfon."); return; }
    if (rec.state !== "done" || !rec.blob || handled.current) return;
    handled.current = true;
    void transcribe(rec.blob).then((t) => setInput((v) => (v ? v + " " : "") + t.text.trim())).catch((e) => toast(e instanceof SttError ? e.message : "No s'ha pogut transcriure."));
  }, [rec.state, rec.blob]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(text0?: string) {
    const text = (text0 ?? input).trim();
    if ((!text && !photo) || busy) return;
    const user: Msg = { role: "user", content: text || "Mira aquesta foto i ajuda'm.", photo: !!photo };
    const next = [...msgs, user];
    setMsgs(next); setInput(""); setBusy(true);
    const img = photo ?? undefined; setPhoto(null);
    try {
      const turns: Turn[] = [{ role: "user", content: instruction() }, { role: "assistant", content: "Entesos. Digues, què vols treballar?" }, ...next.slice(-14).map(({ role, content }) => ({ role, content }))];
      const reply = (await askAI(turns, { image: img, timeoutMs: 55000 })).trim();
      const done = [...next, { role: "assistant", content: reply } as Msg];
      setMsgs(done); saveHistory(done);
      award("practice", "profe");
    } catch (e) {
      toast(e instanceof AiError ? e.message : "No s'ha pogut obtenir resposta.");
      setMsgs(msgs); setInput(text);
    } finally { setBusy(false); }
  }

  return (
    <Page title="Profe IA" subtitle="Pregunta dubtes, demana exercicis o fes-li corregir una frase." back={{ to: "practica", label: "Practica" }}>
      <div className="space-y-2.5 pb-52">
        {msgs.length === 0 && (
          <div className="space-y-2">
            <p className="text-[15px] text-muted">Té en compte els errors del teu quadern, així que et pot posar exercicis a mida. Prova:</p>
            <div className="flex flex-wrap gap-2">{CHIPS.map((c) => <button key={c} onClick={() => (c.endsWith(": ") ? setInput(c) : void send(c))} className="rounded-2xl bg-card px-3 py-2 text-left text-[14px] ring-1 ring-line">{c}</button>)}</div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[88%] space-y-1 rounded-2xl px-3.5 py-2.5 text-[15.5px] leading-snug ${m.role === "user" ? "bg-accent text-white" : "bg-card"}`}>
              {m.photo && <div className="text-[12px] opacity-80">📷 foto adjunta</div>}
              {m.role === "assistant" ? <Rich text={m.content} /> : <div className="whitespace-pre-wrap">{m.content}</div>}
              {m.role === "assistant" && <button onClick={() => void playText(m.content.replace(/\*\*/g, "").slice(0, 600))} aria-label="Escolta" className="text-[12px] opacity-60">▶ escolta</button>}
            </div>
          </div>
        ))}
        {busy && <div className="text-[14px] text-muted">El profe pensa…</div>}
        <div ref={endRef} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 px-4 pb-6 pt-3 backdrop-blur">
        <div className="mx-auto max-w-xl space-y-2">
          {msgs.length > 0 && !busy && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {["Més exemples", "Posa'm un exercici", "Explica-m'ho més fàcil"].map((c) => <button key={c} onClick={() => void send(c)} className="shrink-0 rounded-full bg-card px-3 py-1.5 text-[13px] ring-1 ring-line">{c}</button>)}
              <button onClick={() => { setMsgs([]); saveHistory([]); }} className="shrink-0 rounded-full px-3 py-1.5 text-[13px] text-muted underline">Xat nou</button>
            </div>
          )}
          {photo && <div className="text-[13px] text-accent">📷 {photo.name} <button className="underline" onClick={() => setPhoto(null)}>treu</button></div>}
          <input ref={file} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => { setPhoto(e.target.files?.[0] ?? null); e.target.value = ""; }} />
          <div className="flex items-end gap-2">
            <button onClick={() => file.current?.click()} aria-label="Adjunta una foto" className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-lg ring-1 ring-line">📷</button>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={1} placeholder="Escriu o dicta la teva pregunta…"
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-line bg-card px-3.5 py-2.5 text-[16px]" />
            <button onClick={() => { if (rec.state === "recording") rec.stop(); else { handled.current = false; void rec.start(); } }} aria-label={rec.state === "recording" ? "Acaba de dictar" : "Dicta"}
              className={`grid size-11 shrink-0 place-items-center rounded-full text-lg ring-1 ring-line ${rec.state === "recording" ? "animate-pulse bg-bad text-white" : "bg-card"}`}>{rec.state === "recording" ? "■" : "🎙"}</button>
            <button onClick={() => void send()} disabled={busy || (!input.trim() && !photo)} aria-label="Envia" className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-lg text-white disabled:opacity-40">➤</button>
          </div>
        </div>
      </div>
    </Page>
  );
}
