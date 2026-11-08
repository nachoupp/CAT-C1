import { Page, Section, List, Row, Pill, Card, Btn } from "../../components/ui";
import { DIAGNOSTIC } from "../../content";

const SHEETS = [
  { n: 1, t: "Carta formal a l'Administració", s: "170 paraules · Àrea 3, exercici 1" },
  { n: 2, t: "Pronoms febles", s: "Reforç a partir dels teus errors" },
  { n: 3, t: "Article d'opinió a partir d'una notícia", s: "250 paraules · Àrea 3, exercici 2" },
  { n: 4, t: "Preposicions i barbarismes", s: "Reforç" },
  { n: 5, t: "Guió d'exposició oral", s: "Plantilla per a l'Àrea 4" }
];

export function PaperList() {
  return (
    <Page title="Fitxes en paper" subtitle="L'examen escrit és a mà. Fes la fitxa en paper i corregeix-la des d'Escriu amb una foto." back={{ to: "escriu", label: "Escriu" }}>
      <List>
        <Row title="Fitxa 0 · Diagnòstic inicial" detail="Gramàtica, redacció breu i oral · 45 min" to="fitxa0" />
        {SHEETS.map((x) => <Row key={x.n} title={`Fitxa ${x.n} · ${x.t}`} detail={x.s} right={<Pill tone="muted">Aviat</Pill>} chevron={false} />)}
      </List>
    </Page>
  );
}

export function Diagnostic() {
  return (
    <Page title="Fitxa 0 · Diagnòstic" subtitle="45 minuts, en paper i sense diccionari." back={{ to: "fitxes", label: "Fitxes" }}>
      <Btn variant="soft" onClick={() => window.print()} className="print:hidden">Imprimeix la fitxa</Btn>
      <Section title="Part A · Gramàtica i lèxic (15 min)">
        <Card className="space-y-3.5 p-4">
          {DIAGNOSTIC.map((q, i) => (
            <div key={i}><b className="tabular">{i + 1}.</b> {q.prompt}<div className="mt-0.5 text-muted">a) {q.options[0]} · b) {q.options[1]} · c) {q.options[2]}</div></div>
          ))}
        </Card>
      </Section>
      <Section title="Part B · Redacció (20 min)">
        <Card className="space-y-2 p-4">
          <p>Escriu un text de <b>120-150 paraules</b>. Fa setmanes que al teu barri d'Eivissa hi ha molt de soroll de nit per l'oci nocturn. Escriu un correu formal a l'Ajuntament per explicar el problema, proposar dues solucions i demanar una resposta.</p>
          <p className="text-[14px] text-muted">Salutació i comiat formals, paràgrafs clars i connectors.</p>
        </Card>
      </Section>
      <Section title="Part C · Oral (5 min)">
        <Card className="space-y-2 p-4">
          <p><b>1.</b> Llegeix en veu alta el paràgraf de la Part B (1 min).</p>
          <p><b>2.</b> Parla 2-3 minuts: «Quin paper ha de tenir el català a Eivissa en els propers anys?» Grava-ho amb el mòbil.</p>
        </Card>
      </Section>
    </Page>
  );
}
