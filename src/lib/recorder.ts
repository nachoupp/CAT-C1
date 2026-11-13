/** Gravació de veu al navegador (MediaRecorder). Opus/WebM a Chrome i Android, MP4/AAC a Safari i iOS. */
import { useEffect, useRef, useState } from "react";

export type RecState = "idle" | "asking" | "recording" | "done" | "denied" | "unsupported";

function pickMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus", "audio/webm"].find((m) => MediaRecorder.isTypeSupported(m));
}

/** silenceMs > 0: s'atura sola quan has parlat i fas una pausa d'aquest temps (micròfon obert / mans lliures). */
export function useRecorder(maxSeconds = 300, silenceMs = 0) {
  const silRef = useRef(silenceMs);
  silRef.current = silenceMs;
  const ctxRef = useRef<AudioContext | null>(null);
  const [state, setState] = useState<RecState>(() => (typeof navigator !== "undefined" && typeof navigator.mediaDevices?.getUserMedia === "function" && typeof MediaRecorder !== "undefined" ? "idle" : "unsupported"));
  const [seconds, setSeconds] = useState(0);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const timer = useRef<number | null>(null);

  const cleanup = () => {
    if (timer.current) { clearInterval(timer.current); timer.current = null; }
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    if (ctxRef.current) { void ctxRef.current.close().catch(() => undefined); ctxRef.current = null; }
  };

  useEffect(() => () => { cleanup(); if (url) URL.revokeObjectURL(url); }, [url]);

  async function start() {
    if (state === "unsupported") return;
    setState("asking");
    try {
      stream.current = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      setState("denied");
      return;
    }
    const mimeType = pickMime();
    const r = new MediaRecorder(stream.current, { ...(mimeType ? { mimeType } : {}), audioBitsPerSecond: 32000 });
    const chunks: Blob[] = [];
    r.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    r.onstop = () => {
      cleanup();
      const b = new Blob(chunks, { type: r.mimeType || mimeType || "audio/webm" });
      setBlob(b);
      setUrl((old) => { if (old) URL.revokeObjectURL(old); return URL.createObjectURL(b); });
      setState("done");
    };
    rec.current = r;
    r.start(1000);
    setSeconds(0);
    setBlob(null);
    setState("recording");
    const t0 = Date.now();
    // Detecció de pausa (VAD senzill): si no hi ha cap navegador compatible, simplement no s'activa.
    let analyser: AnalyserNode | null = null;
    const buf = new Uint8Array(1024);
    if (silRef.current > 0) {
      try {
        const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (AC) {
          const ctx = new AC();
          ctxRef.current = ctx;
          analyser = ctx.createAnalyser();
          analyser.fftSize = 1024;
          ctx.createMediaStreamSource(stream.current).connect(analyser);
        }
      } catch { analyser = null; }
    }
    let heard = false, lastVoice = Date.now();
    timer.current = window.setInterval(() => {
      const now = Date.now();
      const s = Math.floor((now - t0) / 1000);
      setSeconds(s);
      if (s >= maxSeconds) stop();
      if (analyser && silRef.current > 0) {
        analyser.getByteTimeDomainData(buf);
        let sum = 0;
        for (let i = 0; i < buf.length; i++) { const v = (buf[i] - 128) / 128; sum += v * v; }
        if (Math.sqrt(sum / buf.length) > 0.035) { heard = true; lastVoice = now; }
        if (heard && now - lastVoice > silRef.current) stop();
        else if (!heard && now - t0 > 15000) stop();
      }
    }, 150);
  }

  function stop() {
    if (rec.current && rec.current.state !== "inactive") rec.current.stop();
  }

  function reset() {
    stop();
    cleanup();
    setBlob(null);
    setSeconds(0);
    setState(typeof MediaRecorder === "undefined" ? "unsupported" : "idle");
  }

  return { state, seconds, blob, url, start, stop, reset };
}
