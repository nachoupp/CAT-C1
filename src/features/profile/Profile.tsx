import { useEffect, useState } from "react";
import { Page, Section, Card, Btn, List, Row, Icon, Pill } from "../../components/ui";
import { useStore, getState, setState, exportCode, importCode } from "../../lib/store";
import { level, totalXp, medals, weekStreak, weekStart, activeDays, WEEK_GOAL, LEVELS } from "../../lib/game";
import { readiness } from "../../lib/readiness";
import { addDays, isoDate } from "../../lib/dates";
import { toast } from "../../lib/toast";
import { AccountCard } from "../account/Account";
import { VOICES, playText, serverVoices, type VoiceInfo } from "../../lib/audio";
import { Segmented } from "../../components/ui";

export default function Profile() {
  const s = useStore((x) => x);
  const today = isoDate();
  const lv = level(s);
  const st = weekStreak(s, today);
  const ms = medals(s);
  const weeks = Array.from({ length: 8 }, (_, i) => { const m = addDays(weekStart(today), -7 * (7 - i)); return { m, n: activeDays(s, m).length }; });
  const r = readiness(s);
  return (
    <Page title="Perfil" subtitle={`Nivell ${lv.name} · ${totalXp(s)} XP · ratxa de ${st.weeks} ${st.weeks === 1 ? "setmana" : "setmanes"}`}>
      <AccountCard />
      <Card className="mt-3 p-4">
        <div className="flex items-end justify-between gap-1.5">
          {LEVELS.map((l, i) => (
            <div key={l.name} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-md ${i <= lv.index ? "bg-gold" : "bg-line"}`} style={{ height: 14 + i * 10 }} />
              <span className={`text-[12px] font-semibold ${i === lv.index ? "text-fg" : "text-muted"}`}>{l.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[13.5px] text-muted">Els nivells es pugen amb punts i superant els controls de cada fase.</p>
      </Card>

      <Section title="Sessions per setmana">
        <Card className="p-4">
          <div className="flex h-28 items-end gap-2" role="img" aria-label="Sessions de les últimes 8 setmanes">
            {weeks.map((w) => (
              <div key={w.m} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-[11px] text-muted tabular">{w.n}</span>
                <div className={`w-full rounded-md ${w.n >= WEEK_GOAL ? "bg-good" : w.n > 0 ? "bg-accent/50" : "bg-line"}`} style={{ height: `${Math.max(6, (w.n / 7) * 80)}px` }} />
                <span className="text-[10px] text-muted">{new Date(w.m + "T00:00:00").toLocaleDateString("ca-ES", { day: "numeric", month: "numeric" })}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[13px] text-muted">En verd, les setmanes amb {WEEK_GOAL} sessions o més. Tens un comodí al mes per a una setmana fluixa.</p>
        </Card>
      </Section>

      <Section title="Estimació per àrees">
        <List>{r.map((a) => <Row key={a.area} title={a.label} detail={a.evidence} right={a.score === null ? <Pill tone="muted">Sense dades</Pill> : <Pill tone={a.score >= 60 ? "good" : "warn"}>{a.score}</Pill>} />)}</List>
      </Section>

      <Section title={`Medalles · ${ms.filter((m) => m.earned).length} de ${ms.length}`}>
        <div className="grid grid-cols-3 gap-2">
          {ms.map((m) => (
            <Card key={m.id} className={`p-3 text-center ${m.earned ? "" : "opacity-45"}`}>
              <div className={`mx-auto grid size-11 place-items-center rounded-full text-[20px] ${m.earned ? "bg-gold/20" : "bg-line"}`} aria-hidden>{m.earned ? "★" : "☆"}</div>
              <div className="mt-1.5 text-[13px] font-semibold leading-tight">{m.title}</div>
              <div className="text-[11.5px] leading-tight text-muted">{m.detail}</div>
            </Card>
          ))}
        </div>
      </Section>

      <VoiceSection />

      <Section title="Organització">
        <List>
          <Row left={<Icon tone="accent">⚑</Icon>} title="Calendari d'exàmens" detail="Inscripcions, exàmens i avisos al teu calendari" to="calendari" />
          <Row left={<Icon tone="comp">♪</Icon>} title="Àudios oficials" detail="Comprensió oral del GOIB" to="audios" />
        </List>
      </Section>
      <Backup />
    </Page>
  );
}

function Backup() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const copy = async () => {
    const c = exportCode(getState());
    try { await navigator.clipboard.writeText(c); toast("Codi copiat"); } catch { setCode(c); setOpen(true); toast("Selecciona i copia el codi"); }
  };
  const doImport = () => {
    try { const next = importCode(code); setState(() => next); toast("Progrés importat"); setOpen(false); }
    catch { toast("El codi no és vàlid"); }
  };
  return (
    <Section title="Les teves dades">
      <Card className="space-y-3 p-4 text-[14px]">
        <p className="text-muted">Sense compte, el progrés es desa en aquest dispositiu. També pots passar-lo a un altre amb aquest codi.</p>
        <div className="flex flex-wrap gap-2"><Btn variant="soft" onClick={copy}>Copia el codi</Btn><Btn variant="soft" onClick={() => setOpen(true)}>Enganxa un codi</Btn></div>
        {open && (
          <div className="space-y-2">
            <textarea id="backup-code" aria-label="Codi de progrés" rows={3} value={code} onChange={(e) => setCode(e.target.value)} className="w-full rounded-xl bg-bg p-3 font-mono text-xs" />
            <Btn onClick={doImport}>Importa</Btn>
          </div>
        )}
      </Card>
    </Section>
  );
}

const VOICE_NOTE: Record<string, string> = {
  aina: "Veus del Projecte Aina (BSC). Olga i Quim tenen accent balear, el que sentiràs a l'examen de la GOIB; Èlia i Grau, central.",
  azure: "Veus neuronals de Microsoft Azure en català central.",
  elevenlabs: "Veu d'ElevenLabs (model v3) en català."
};

function VoiceSection() {
  const saved = useStore((x) => x.settings.voice);
  const [info, setInfo] = useState<VoiceInfo | null>(null);
  useEffect(() => { void serverVoices().then(setInfo); }, []);
  const options = info?.voices.length ? info.voices : [...VOICES];
  const value = options.some((o) => o.id === saved) ? (saved as string) : options[0].id;
  const pick = (v: string) => setState((x) => ({ ...x, settings: { ...x.settings, voice: v } }));
  return (
    <Section title="Veu">
      <Card className="space-y-3 p-4">
        {info?.provider !== "elevenlabs" && <Segmented value={value} onChange={pick} options={options.map((o) => ({ value: o.id, label: o.label.split(" · ")[0] }))} />}
        <Btn variant="soft" onClick={() => void playText("Bon dia! Aquesta és la veu que sentiràs als exemples, a les lectures i a les converses.")}>Prova la veu</Btn>
        <p className="text-[13px] text-muted">
          {info?.provider ? VOICE_NOTE[info.provider] : "Encara no hi ha veu natural configurada al servidor: ara sona la veu del dispositiu."}
        </p>
      </Card>
    </Section>
  );
}
