import { useEffect, useRef, useState } from "react";
import { neuralUrl, stopAll } from "../lib/audio";
import { speak as deviceSpeak, stopSpeaking, canSpeak } from "../lib/speech";
import { useStore, setState } from "../lib/store";
import { fmtClock } from "../lib/text";

const RATES = [0.75, 0.9, 1, 1.15];

/**
 * Reproductor d'àudio: per a un fitxer (src) o per a un text (veu neuronal o del dispositiu).
 * Velocitat, avançar/retrocedir 5 s, repetició i límit d'audicions (per als simulacres).
 */
export function AudioPlayer({ src, text, label, maxPlays }: { src?: string; text?: string; label?: string; maxPlays?: number }) {
  const rate = useStore((s) => s.settings.rate ?? 1);
  const ref = useRef<HTMLAudioElement>(null);
  const [url, setUrl] = useState<string | null>(src ?? null);
  const [mode, setMode] = useState<"loading" | "file" | "device" | "none">(src ? "file" : "loading");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [plays, setPlays] = useState(0);
  const [loop, setLoop] = useState(false);
  const exhausted = maxPlays !== undefined && plays >= maxPlays && !playing;

  useEffect(() => {
    let alive = true;
    if (src) { setUrl(src); setMode("file"); return; }
    if (!text) return;
    setMode("loading");
    void neuralUrl(text).then((u) => { if (!alive) return; if (u) { setUrl(u); setMode("file"); } else setMode(canSpeak() ? "device" : "none"); });
    return () => { alive = false; };
  }, [src, text]);
  useEffect(() => { if (ref.current) ref.current.playbackRate = rate; }, [rate, url]);
  useEffect(() => () => { ref.current?.pause(); stopSpeaking(); }, []);

  const toggle = async () => {
    if (exhausted) return;
    if (mode === "device" && text) {
      if (playing) { stopSpeaking(); setPlaying(false); return; }
      stopAll(); deviceSpeak(text); setPlaying(true); setPlays((p) => p + 1);
      const ms = Math.max(2500, text.length * 75 / rate);
      setTimeout(() => setPlaying(false), ms);
      return;
    }
    const a = ref.current; if (!a) return;
    if (playing) { a.pause(); return; }
    stopAll();
    if (a.ended || (dur && a.currentTime >= dur - 0.05)) a.currentTime = 0;
    if (a.currentTime === 0) setPlays((p) => p + 1);
    await a.play().catch(() => undefined);
  };
  const seek = (d: number) => { const a = ref.current; if (a) a.currentTime = Math.max(0, Math.min(dur, a.currentTime + d)); };
  const setRate = (r: number) => setState((s) => ({ ...s, settings: { ...s.settings, rate: r } }));

  if (mode === "none") return <div className="rounded-xl bg-bg px-3 py-2.5 text-[13.5px] text-muted">Aquest dispositiu no pot reproduir veu.</div>;
  return (
    <div className="rounded-2xl bg-bg p-3">
      {label && <div className="mb-1.5 text-[13px] font-medium">{label}</div>}
      {mode === "file" && url && (
        <audio ref={ref} src={url} preload="metadata" loop={loop}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onLoadedMetadata={(e) => setDur(e.currentTarget.duration || 0)} />
      )}
      <div className="flex items-center gap-3">
        <button onClick={toggle} disabled={mode === "loading" || exhausted} aria-label={playing ? "Pausa" : "Reprodueix"}
          className="grid size-11 flex-none place-items-center rounded-full bg-accent text-white disabled:opacity-40">
          {mode === "loading" ? <span className="text-xs">…</span> : playing
            ? <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-current" aria-hidden><path d="M8 5.5v13a1 1 0 001.5.86l10.5-6.5a1 1 0 000-1.72L9.5 4.64A1 1 0 008 5.5z" /></svg>}
        </button>
        <div className="min-w-0 flex-1">
          {mode === "file" ? (
            <>
              <input type="range" min={0} max={dur || 0} step={0.1} value={t} onChange={(e) => { if (ref.current) ref.current.currentTime = +e.target.value; }}
                aria-label="Posició" className="w-full accent-[var(--accent)]" disabled={!dur} />
              <div className="flex justify-between text-[11.5px] text-muted tabular"><span>{fmtClock(Math.floor(t))}</span><span>{dur ? fmtClock(Math.floor(dur)) : "--:--"}</span></div>
            </>
          ) : <div className="text-[12.5px] text-muted">{mode === "device" ? "Veu del dispositiu (configura la veu neuronal per a més qualitat)" : "Preparant l'àudio…"}</div>}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[12.5px]">
        {mode === "file" && <><button className="rounded-full bg-card px-2.5 py-1" onClick={() => seek(-5)} aria-label="Retrocedeix 5 segons">−5 s</button><button className="rounded-full bg-card px-2.5 py-1" onClick={() => seek(5)} aria-label="Avança 5 segons">+5 s</button></>}
        {RATES.map((r) => <button key={r} onClick={() => setRate(r)} aria-pressed={rate === r} className={`rounded-full px-2.5 py-1 tabular ${rate === r ? "bg-accent text-white" : "bg-card"}`}>{r}×</button>)}
        {mode === "file" && maxPlays === undefined && <button onClick={() => setLoop(!loop)} aria-pressed={loop} className={`rounded-full px-2.5 py-1 ${loop ? "bg-accent text-white" : "bg-card"}`}>Repeteix</button>}
        {maxPlays !== undefined && <span className="ml-auto text-muted tabular">Audicions: {Math.min(plays, maxPlays)}/{maxPlays}</span>}
      </div>
    </div>
  );
}
