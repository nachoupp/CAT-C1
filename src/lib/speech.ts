/** Veu del dispositiu (síntesi) i dictat (reconeixement) en català, quan el navegador ho permet. */
export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string): boolean {
  if (!canSpeak()) return false;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "ca-ES";
  u.rate = 0.95;
  const voice = speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("ca"));
  if (voice) u.voice = voice;
  speechSynthesis.speak(u);
  return !!voice;
}

export function stopSpeaking(): void {
  if (canSpeak()) speechSynthesis.cancel();
}

interface Recognizer {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null; onerror: (() => void) | null;
  start(): void; stop(): void;
}
type RecognizerCtor = new () => Recognizer;

export function recognizerCtor(): RecognizerCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { SpeechRecognition?: RecognizerCtor; webkitSpeechRecognition?: RecognizerCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function listen(onText: (t: string) => void, onEnd: () => void): (() => void) | null {
  const Ctor = recognizerCtor();
  if (!Ctor) return null;
  const r = new Ctor();
  r.lang = "ca-ES"; r.interimResults = true; r.continuous = true;
  r.onresult = (e) => {
    let t = "";
    for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
    onText(t);
  };
  r.onend = onEnd; r.onerror = onEnd;
  r.start();
  return () => r.stop();
}
