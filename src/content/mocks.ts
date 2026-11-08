import type { ChoiceItem } from "./units";

export interface MockExam {
  id: string;
  title: string;
  listening: { title: string; script: string; items: ChoiceItem[] }[];
  reading: { title: string; text: string; items: ChoiceItem[] }[];
  writing: { id: string; brief: string; words: 170 | 250; weight: number }[];
  oral: { reading: string; interaction: string; talk: string };
}

const vf = (q: string, ok: boolean, e: string): ChoiceItem => ({ type: "choice", q, options: ["Vertader", "Fals"], answer: ok ? "Vertader" : "Fals", e });

export const MOCKS: MockExam[] = [
  {
    id: "parla1",
    title: "Examen Parla 1",
    listening: [
      {
        title: "Exercici 1 · Notícia de ràdio",
        script: "Bon dia. El Consell d'Eivissa ha presentat aquest matí el Pla de l'Aigua 2027, que vol reduir un vint per cent el consum durant els mesos d'estiu. La mesura principal és la reutilització de les aigües depurades per regar camps i jardins públics. A més, els hotels que instal·lin sistemes d'estalvi podran rebre ajuts de fins a quinze mil euros. La presidenta ha recordat que els aqüífers de l'illa es troben en una situació delicada i que, sense canvis, alguns pous podrien salinitzar-se en pocs anys. Les associacions ecologistes valoren positivament el pla, però consideren que arriba tard i demanen limitar la construcció de noves piscines. El pla es podrà consultar a partir de dilluns al web del Consell, i els ciutadans hi podran presentar propostes fins al quinze de febrer.",
        items: [
          { type: "choice", q: "Quin objectiu té el pla?", options: ["Reduir un 20 % el consum d'aigua a l'estiu", "Construir una dessalinitzadora nova", "Prohibir les piscines"], answer: "Reduir un 20 % el consum d'aigua a l'estiu", e: "«…vol reduir un vint per cent el consum durant els mesos d'estiu»." },
          { type: "choice", q: "Què podran rebre els hotels?", options: ["Ajuts si instal·len sistemes d'estalvi", "Aigua depurada gratuïta", "Una multa si consumeixen massa"], answer: "Ajuts si instal·len sistemes d'estalvi", e: "«…podran rebre ajuts de fins a quinze mil euros»." },
          { type: "choice", q: "Per què està preocupada la presidenta?", options: ["Alguns pous es podrien salinitzar", "Ha plogut massa", "Falten hotels"], answer: "Alguns pous es podrien salinitzar", e: "«…alguns pous podrien salinitzar-se en pocs anys»." },
          { type: "choice", q: "Què opinen les associacions ecologistes?", options: ["Que és positiu però arriba tard", "Que és innecessari", "Que és massa car"], answer: "Que és positiu però arriba tard", e: "«…valoren positivament el pla, però consideren que arriba tard»." },
          { type: "choice", q: "Fins quan es poden presentar propostes?", options: ["Fins al 15 de febrer", "Fins dilluns", "Fins a l'estiu"], answer: "Fins al 15 de febrer", e: "Dilluns és quan es podrà consultar el pla." }
        ]
      },
      {
        title: "Exercici 2 · Entrevista",
        script: "Avui parlem amb na Joana Riera, que fa vint anys que ensenya català a adults. Joana, què és el més difícil per als alumnes? Sobretot, perdre la por. Molts entenen perfectament el català, però quan l'han de parlar es bloquegen perquè tenen por de fer errors. I com els ajudes? A classe parlem molt més del que escrivim. Fem debats curts, juguem amb frases fetes i, sobretot, practiquem situacions reals: anar al metge, queixar-se a una botiga. La gramàtica hi és, és clar, però com a eina, no com a objectiu. Quins consells donaries a qui prepara el C1? Que escrigui una redacció cada setmana i que la faci corregir. I que no estudiï llistes de paraules soltes: és millor aprendre expressions senceres, en context. Moltes gràcies, Joana.",
        items: [
          vf("Molts alumnes entenen el català però tenen por de parlar-lo.", true, "«Molts entenen perfectament el català, però… es bloquegen»."),
          vf("A les seves classes es dedica més temps a escriure que a parlar.", false, "«A classe parlem molt més del que escrivim»."),
          vf("La gramàtica és l'objectiu principal de les classes.", false, "«…com a eina, no com a objectiu»."),
          vf("Recomana escriure una redacció cada setmana i fer-la corregir.", true, "És el primer consell que dona."),
          vf("Aconsella estudiar llistes de paraules soltes.", false, "Diu que és millor aprendre expressions senceres, en context.")
        ]
      }
    ],
    reading: [
      {
        title: "Exercici 3 · El teletreball a les illes",
        text: `El teletreball, que fa uns anys semblava una moda passatgera, s'ha instal·lat definitivament en moltes empreses de les Illes. Segons una enquesta recent, gairebé un de cada cinc treballadors fa almenys un dia de feina a casa cada setmana. Els avantatges són coneguts: menys temps al cotxe, més flexibilitat i, sovint, més concentració. Tanmateix, els experts adverteixen que no tot són flors i violes.

D'una banda, la frontera entre la vida laboral i la personal es difumina: molts teletreballadors reconeixen que contesten correus a qualsevol hora. De l'altra, l'aïllament pot afectar la motivació i la creativitat, que sovint neixen de les converses informals entre companys.

A les illes, a més, el teletreball té una dimensió particular. Alguns professionals de fora s'hi han instal·lat atrets pel clima i la qualitat de vida, cosa que ha contribuït a fer pujar el preu de l'habitatge en determinades zones. Per això, hi ha qui demana que les administracions planifiquin aquest fenomen en lloc de limitar-se a celebrar-lo.

La majoria d'especialistes coincideixen que la fórmula més equilibrada és la mixta: dos o tres dies a casa i la resta a l'oficina. Així, diuen, es combinen els avantatges de tots dos models sense renunciar al contacte humà.`,
        items: [
          { type: "choice", q: "Segons el text, el teletreball…", options: ["s'ha consolidat en moltes empreses", "ha desaparegut després de la pandèmia", "només el fan els funcionaris"], answer: "s'ha consolidat en moltes empreses", e: "«…s'ha instal·lat definitivament en moltes empreses»." },
          { type: "choice", q: "Què vol dir «no tot són flors i violes»?", options: ["Que també hi ha inconvenients", "Que és una moda", "Que fa bon temps"], answer: "Que també hi ha inconvenients", e: "Frase feta: no tot és positiu." },
          { type: "choice", q: "Quin risc s'esmenta?", options: ["Que es barregin la vida laboral i la personal", "Que es cobri menys", "Que es perdi la feina"], answer: "Que es barregin la vida laboral i la personal", e: "«…la frontera entre la vida laboral i la personal es difumina»." },
          { type: "choice", q: "Quina conseqüència ha tingut l'arribada de professionals de fora?", options: ["Ha contribuït a l'augment del preu de l'habitatge en algunes zones", "Ha reduït el turisme", "Ha creat nous hospitals"], answer: "Ha contribuït a l'augment del preu de l'habitatge en algunes zones", e: "Ho diu el tercer paràgraf." },
          { type: "choice", q: "Quina és la conclusió dels especialistes?", options: ["La fórmula mixta és la més equilibrada", "Cal prohibir el teletreball", "Tothom hauria de treballar a casa"], answer: "La fórmula mixta és la més equilibrada", e: "Últim paràgraf." }
        ]
      },
      {
        title: "Exercici 4 · Connectors: la Fira del Llibre",
        text: `La Fira del Llibre de Vila tanca avui les portes amb un èxit de públic. (1) ___ la pluja de dissabte, més de vint mil persones han passat per les parades del passeig de Vara de Rey. Els organitzadors estan satisfets, (2) ___ les vendes han augmentat un quinze per cent respecte de l'any passat. (3) ___, els llibreters demanen més suport institucional: (4) ___ asseguren, el sector continua sent fràgil fora d'aquestes dates. (5) ___, la fira ha demostrat que la lectura en català té un públic fidel a l'illa.`,
        items: [
          { type: "choice", q: "(1)", options: ["Malgrat", "Perquè", "Per tant"], answer: "Malgrat", e: "Concessió + nom: malgrat la pluja." },
          { type: "choice", q: "(2)", options: ["ja que", "tot i que", "encara que"], answer: "ja que", e: "Causa: estan satisfets ja que les vendes han augmentat." },
          { type: "choice", q: "(3)", options: ["No obstant això", "Per exemple", "És a dir"], answer: "No obstant això", e: "Contrast amb l'èxit anterior." },
          { type: "choice", q: "(4)", options: ["segons", "perquè", "mentre"], answer: "segons", e: "Segons asseguren: atribueix l'opinió." },
          { type: "choice", q: "(5)", options: ["En definitiva", "En canvi", "Fins i tot"], answer: "En definitiva", e: "Connector de conclusió." }
        ]
      }
    ],
    writing: [
      { id: "parla1-w1", brief: "Escriu un correu a l'Escola Oficial d'Idiomes per demanar informació sobre un curs intensiu de català d'estiu: horaris, preu, requisits i si hi ha places per a persones que treballen.", words: 170, weight: 40 },
      { id: "parla1-w2", brief: "Has llegit la notícia «El Consell estudia limitar l'entrada de cotxes a Formentera a l'estiu». Escriu un article d'opinió per al diari local: valora la mesura, aporta arguments i respon un contraargument.", words: 250, weight: 60 }
    ],
    oral: {
      reading: "La biblioteca municipal amplia l'horari durant el període d'exàmens. A partir del dia quinze, les sales d'estudi obriran de vuit del matí a deu del vespre, de dilluns a dissabte. Els usuaris hauran de reservar la plaça per mitjà del web i presentar el carnet a l'entrada.",
      interaction: "Amb un company/a, heu d'organitzar una jornada de portes obertes per donar a conèixer el català als nous residents del vostre poble. Decidiu les activitats, el lloc i com ho fareu saber.",
      talk: "Les xarxes socials, ens acosten o ens aïllen? Exposa la teva opinió amb arguments i exemples (3-5 minuts)."
    }
  }
];

/** Consells d'estratègia per tipus d'exercici, per a l'informe final. */
export const STRATEGY: Record<string, string> = {
  listening: "Llegeix les preguntes abans d'escoltar i subratlla'n les paraules clau. A la primera audició, respon el que tinguis clar; a la segona, confirma i omple els buits. Les opcions que repeteixen paraules exactes de l'àudio sovint són trampes.",
  reading: "Llegeix primer les preguntes, després el text. Busca la resposta al paràgraf i comprova que diu el mateix amb altres paraules. Als connectors, decideix primer la relació lògica (causa, contrast, conclusió) i després tria la forma.",
  system: "Fes primer les preguntes que saps segur i marca els dubtes. Desconfia de la forma que «sona» com el castellà. Repassa al quadern els temes on falles més.",
  writing: "Planifica 5 minuts: tesi, dos arguments, contraargument i conclusió. Compta les paraules i deixa 5 minuts per revisar pronoms, accents i barbarismes.",
  oral: "Fes un esquema, no un guió. Obre amb la teva opinió, desenvolupa dos arguments amb exemples i tanca. Si et quedes en blanc, fes servir frases per guanyar temps."
};
