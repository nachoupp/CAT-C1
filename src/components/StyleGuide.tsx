import { useMemo, useState } from "react";
import { Card } from "./ui";
import { GENRES, genreById } from "../content/textTypes";
import { askJSON, AiError } from "../lib/ai";

interface Next { falta?: string; propostes?: { inici: string; motiu?: string }[] }

/** Guia d'estil i ajuda predictiva: tria el tipus de text, veus l'estructura (amb els passos que ja has fet) i, si et bloqueges, demanes com continuar. */
export function StyleGuide({ value, onInsert }: { value: string; onInsert: (t: string) => void }) {
  const [open, setOpen] = useState(false);
  const [gid, setGid] = useState<string>(() => { try { return localStorage.getItem("parla-c1:genre") ?? ""; } catch { return ""; } });
  const g = genreById(gid);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [next, setNext] = useState<Next | null>(null);

  const pick = (id: string) => { setGid(id); setNext(null); try { localStorage.setItem("parla-c1:genre", id); } catch { /* sense emmagatzematge */ } };
  const done = useMemo(() => (g ? g.steps.map((s) => s.detect.test(value)) : []), [g, value]);
  const nextStep = g ? g.steps[done.findIndex((d) => !d)] : undefined;

  async function ask() {
    if (!g) return;
    setBusy(true); setErr(null); setNext(null);
    try {
      const r = await askJSON<Next>(`Ets un professor de català (nivell C1, examen del GOIB) que ajuda una alumna a escriure un text de tipus «${g.name}» (registre: ${g.register}).
Estructura esperada: ${g.steps.map((s, i) => `${i + 1}. ${s.label}`).join("; ")}.
Text escrit fins ara${value.trim() ? `:\n"""${value.slice(-1800)}"""` : ": (encara no ha escrit res)"}
Digues quin és el pas de l'estructura que toca ara i proposa 3 inicis de frase DIFERENTS per continuar (no escriguis el text sencer: només l'inici, d'uns 6-12 paraules, acabat en «…», amb connectors o fórmules adequats al registre). 
Respon NOMÉS amb JSON: {"falta":"pas que toca i què hi ha de dir, en castellà, una frase","propostes":[{"inici":"inici de frase en català…","motiu":"per què encaixa, molt breu, en castellà"}]}`, { timeoutMs: 40000 });
      setNext(r);
    } catch (e) { setErr(e instanceof AiError ? e.message : "No s'ha pogut consultar el professor."); }
    finally { setBusy(false); }
  }
  const insert = (t: string) => onInsert(t.replace(/…+$/, ""));

  return (
    <div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between rounded-xl bg-card px-3.5 py-2.5 text-left text-[14.5px] font-semibold">
        <span>✍️ Guia d'estil{g ? ` · ${g.name}` : ""}</span><span className="text-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <Card className="mt-2 space-y-3 p-3.5">
          <div className="flex flex-wrap gap-1.5">
            {GENRES.map((x) => (
              <button key={x.id} onClick={() => pick(x.id)} aria-pressed={gid === x.id}
                className={`rounded-full px-2.5 py-1 text-[12.5px] font-medium ${gid === x.id ? "bg-escr text-white" : "bg-bg"}`}>{x.name}</button>
            ))}
          </div>
          {!g && <p className="text-[14px] text-muted">Tria quin tipus de text escrius i et mostraré l'estructura, el registre i les fórmules típiques.</p>}
          {g && (
            <>
              <div className="text-[13.5px]"><b>{g.register}.</b> {g.summary}</div>
              <ol className="space-y-2">
                {g.steps.map((s, i) => (
                  <li key={s.id} className={`rounded-xl p-2.5 ${done[i] ? "bg-good/10" : nextStep?.id === s.id ? "bg-accent/10 ring-1 ring-accent/40" : "bg-bg"}`}>
                    <div className="flex items-center gap-2 text-[14px] font-semibold"><span aria-hidden>{done[i] ? "✓" : i + 1}</span>{s.label}{nextStep?.id === s.id && <span className="text-[11.5px] font-semibold text-accent">ara toca</span>}</div>
                    <div className="text-[13px] text-muted">{s.hint}</div>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {s.openers.map((o) => (
                        <button key={o} onClick={() => insert(o)} className="rounded-lg bg-card px-2 py-1 text-left text-[12.5px] ring-1 ring-line">{o}</button>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
              <div className="text-[13px]"><b>Connectors:</b> {g.connectors.join(" · ")}</div>
              <div className="text-[13px] text-bad"><b>Evita:</b> {g.avoid.join(" · ")}</div>
              <button onClick={() => void ask()} disabled={busy} className="w-full rounded-xl bg-accent px-4 py-3 text-[15px] font-semibold text-white disabled:opacity-50">{busy ? "Pensant…" : "Com continuo?"}</button>
              {err && <div className="text-[13px] text-bad">{err}</div>}
              {next && (
                <div className="space-y-2 rounded-xl bg-accent/10 p-3">
                  {next.falta && <div className="text-[14px]"><b>Ara:</b> {next.falta}</div>}
                  {(next.propostes ?? []).filter((p) => p?.inici).map((p, i) => (
                    <button key={i} onClick={() => insert(p.inici)} className="block w-full rounded-lg bg-card p-2.5 text-left ring-1 ring-line">
                      <div className="text-[14.5px] font-medium">{p.inici}</div>
                      {p.motiu && <div className="text-[12.5px] text-muted">{p.motiu}</div>}
                    </button>
                  ))}
                  <div className="text-[12px] text-muted">Toca una proposta per afegir-la al text i continua tu.</div>
                </div>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
}
