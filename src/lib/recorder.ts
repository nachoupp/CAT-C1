/** Gravació de veu al navegador (MediaRecorder). Opus/WebM a Chrome i Android, MP4/AAC a Safari i iOS. */
import { useEffect, useRef, useState } from "react";

export type RecState = "idle" | "asking" | "recording" | "done" | "denied" | "unsupported";

function pickMime(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return ["audio/webm;codecs=opus", "audio/mp4", "audio/ogg;codecs=opus", "audio/webm"].find((m) => MediaRecorder.isTypeSupported(m));
}

export function useRecorder(maxSeconds = 300) {
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
    timer.current = window.setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      setSeconds(s);
      if (s >= maxSeconds) stop();
    }, 250);
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
