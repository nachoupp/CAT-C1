import { useEffect, useState } from "react";
import { Page, Section, List, Row, Check, Card, Btn, ExtLink, Note } from "../../components/ui";
import { LESSONS, LINKS } from "../../content";
import { useStore, setState } from "../../lib/store";
import { isoDate } from "../../lib/dates";
import { askAI, AiError } from "../../lib/ai";
import { AudioPlayer } from "../../components/AudioPlayer";
import { go } from "../../lib/router";
import { toast } from "../../lib/toast";

const softcatala = {
  sinonims: (w: string) => `https://www.softcatala.org/diccionari-de-sinonims/paraula/${encodeURIComponent(w)}/`,
  conjugar: (w: string) => `https://www.softcatala.org/conjugador-de-verbs/verb/${encodeURIComponent(w)}/`
};

export default function Learn() {
  const read = useStore((s) => s.lessons);
  const areas = [...new Set(LESSONS.map((l) => l.area))];
  return (
    <Page title="Aprèn" subtitle={`Píndoles de 2 minuts · ${Object.keys(read).length} de ${LESSONS.length} llegides`}>
      <Dictionary />
      {areas.map((a) => (
        <Section key={a} title={a}>
          <List>
            {LESSONS.filter((l) => l.area === a).map((l) => (
              <Row key={l.id} left={<Check on={!!read[l.id]} label={read[l.id] ? "Llegida" : "Pendent"} />} title={l.title} to={`lesson-${l.id}`} />
            ))}
          </List>
        </Section>
      ))}
    </Page>
  );
}

export function Dictionary() {
  const [w, setW] = useState("");
  const [out, setOut] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const word = w.trim().toLowerCase();
  const open = (url: string) => { if (!word) { toast("Escriu una paraula"); return; } window.open(url, "_blank", "noopener"); };
  const translate = async () => {
    if (!word) { toast("Escriu una paraula en castellà"); return; }
    setBusy(true); setOut(null);
    try {
      setOut(await askAI(`Paraula o expressió castellana: «${word}».
Dona els equivalents catalans normatius (1-3), indicant registre si cal (formal / col·loquial / balear), una frase d'exemple en català i, si n'hi ha, el barbarisme o fals amic que cal evitar. Molt breu, sense títols ni markdown, màxim 5 línies.`));
    } catch (e) {
      setOut(e instanceof AiError ? e.message : "No s'ha pogut consultar.");
    } finally { setBusy(false); }
  };
  return (
    <Card className="space-y-3 p-4">
      <label htmlFor="dict-word" className="font-medium">Consulta una paraula</label>
      <input id="dict-word" type="search" value={w} onChange={(e) => setW(e.target.value)} placeholder="p. ex. malbaratar o «llevar a cabo»"
        autoCapitalize="none" autoComplete="off" className="w-full rounded-xl bg-bg px-3.5 py-3" onKeyDown={(e) => { if (e.key === "Enter") void translate(); }} />
      <div className="flex flex-wrap gap-2 text-[15px]">
        <Btn variant="soft" onClick={() => open(softcatala.sinonims(word))}>Sinònims</Btn>
        <Btn variant="soft" onClick={() => open(softcatala.conjugar(word))}>Conjugar</Btn>
        <Btn variant="soft" onClick={translate} disabled={busy}>{busy ? "Buscant…" : "Castellà → català"}</Btn>
      </div>
      {out && <div className="whitespace-pre-wrap rounded-xl bg-bg p-3 text-[14.5px] leading-relaxed">{out}<div className="mt-1.5 text-[12.5px] text-muted">Resposta orientativa d'IA. Confirma-la al DIEC.</div></div>}
      <div className="text-[13px] text-muted">Referència: <ExtLink href={LINKS.diec}>DIEC (IEC)</ExtLink> · <ExtLink href={LINKS.dcvb}>Alcover-Moll</ExtLink> · sinònims i conjugador de Softcatalà</div>
    </Card>
  );
}

export function LessonView({ id }: { id: string }) {
  const i = LESSONS.findIndex((l) => l.id === id);
  const l = LESSONS[i];
  useEffect(() => {
    if (l) setState((s) => (s.lessons[l.id] ? s : { ...s, lessons: { ...s.lessons, [l.id]: isoDate() } }));
  }, [l]);
  if (!l) return <Page title="No trobada" back={{ to: "quadern", label: "Quadern" }}><Note>Aquesta píndola no existeix.</Note></Page>;
  const next = LESSONS[(i + 1) % LESSONS.length];
  return (
    <Page title={l.title} subtitle={l.area} back={{ to: "quadern", label: "Quadern" }}>
      {/* Contingut propi de l'app (no prové de l'usuari) */}
      <Card className="prose-lesson p-4 text-[17px] leading-relaxed"><div dangerouslySetInnerHTML={{ __html: l.html }} /></Card>
      {l.example && (
        <Section title="Exemple">
          <Card className="space-y-3 p-4">
            <div className="text-[19px] font-bold tracking-tight">{l.example}</div>
            <AudioPlayer text={l.example} />
          </Card>
        </Section>
      )}
      <div className="mt-5"><Btn block onClick={() => go(`lesson-${next.id}`)}>Següent: {next.title}</Btn></div>
    </Page>
  );
}
