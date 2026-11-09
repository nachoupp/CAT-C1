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
  },
  {
    id: "parla2",
    title: "Examen Parla 2",
    listening: [
      {
        title: "Exercici 1 · Entrevista a la ràdio: el futur del camp eivissenc",
        script: "— Avui parlam amb en Vicent Ribas, president d'una cooperativa agrària de Santa Gertrudis. Vicent, com està el camp a Eivissa? — Doncs, sincerament, en un moment delicat. Fa trenta anys hi havia gairebé dues mil explotacions i ara no n'arriben a cinc-centes. El problema principal no és la falta de gent jove interessada, sinó el preu de la terra: una finca agrícola es ven molt més cara si s'hi pot construir una casa. — I què proposau des de la cooperativa? — Tres coses. Primer, que l'Administració compri terrenys i els llogui a preus assequibles a joves pagesos. Segon, que els hotels i restaurants comprin producte local, i en això ja hem avançat: una vintena d'establiments ja tenen un segell de quilòmetre zero. I tercer, que es valori la feina del pagès com el que és: la persona que manté el paisatge que ve a veure el turista. — Sou optimistes? — Moderadament. Aquest any s'han incorporat dotze joves a la cooperativa, i això fa deu anys era impensable.",
        items: [
          { type: "choice", q: "Quantes explotacions agràries hi ha ara aproximadament?", options: ["Menys de cinc-centes", "Unes dues mil", "Unes mil"], answer: "Menys de cinc-centes", e: "«…ara no n'arriben a cinc-centes»." },
          { type: "choice", q: "Quin és el problema principal segons en Vicent?", options: ["El preu de la terra", "La falta de joves interessats", "La manca d'aigua"], answer: "El preu de la terra", e: "«El problema principal no és la falta de gent jove…, sinó el preu de la terra»." },
          { type: "choice", q: "Què proposa que faci l'Administració?", options: ["Comprar terrenys i llogar-los barats a joves", "Prohibir la construcció de cases", "Donar subvencions als hotels"], answer: "Comprar terrenys i llogar-los barats a joves", e: "És la primera proposta." },
          { type: "choice", q: "Què tenen una vintena d'establiments?", options: ["Un segell de quilòmetre zero", "Un hort propi", "Un premi de turisme"], answer: "Un segell de quilòmetre zero", e: "«…ja tenen un segell de quilòmetre zero»." },
          { type: "choice", q: "Per què és moderadament optimista?", options: ["S'hi han incorporat dotze joves aquest any", "Han baixat els preus de la terra", "Ha plogut molt"], answer: "S'hi han incorporat dotze joves aquest any", e: "«…fa deu anys era impensable»." }
        ]
      },
      {
        title: "Exercici 2 · Avís de l'Ajuntament",
        script: "L'Ajuntament de Sant Antoni informa que, a causa de les obres de renovació de la xarxa d'aigua, el passeig de la Mar romandrà tancat al trànsit des del dilluns tres fins al divendres vint-i-un. Durant aquests dies, les línies d'autobús tres i set modificaran el recorregut i tindran la parada provisional al carrer de Ramón y Cajal. Els veïns amb plaça de garatge al passeig podran accedir-hi de les set a les nou del matí i de les vuit a les deu del vespre, presentant el justificant que es pot recollir a l'Oficina d'Atenció Ciutadana. Els comerços continuaran oberts amb normalitat. Per a qualsevol dubte, podeu telefonar al zero-zero-deu o consultar el web municipal.",
        items: [
          { type: "choice", q: "Per què es tanca el passeig?", options: ["Per obres a la xarxa d'aigua", "Per unes festes", "Per una cursa"], answer: "Per obres a la xarxa d'aigua", e: "«…a causa de les obres de renovació de la xarxa d'aigua»." },
          { type: "choice", q: "Quant de temps estarà tancat?", options: ["Unes tres setmanes", "Un mes i mig", "Un cap de setmana"], answer: "Unes tres setmanes", e: "Del dilluns 3 al divendres 21." },
          { type: "choice", q: "Què passarà amb els autobusos 3 i 7?", options: ["Canviaran el recorregut i la parada", "Deixaran de circular", "Seran gratuïts"], answer: "Canviaran el recorregut i la parada", e: "Tindran una parada provisional." },
          { type: "choice", q: "Què necessiten els veïns amb garatge?", options: ["Un justificant de l'Oficina d'Atenció Ciutadana", "Una targeta d'autobús", "Res, poden entrar sempre"], answer: "Un justificant de l'Oficina d'Atenció Ciutadana", e: "I només en dues franges horàries." },
          { type: "choice", q: "Què passa amb els comerços?", options: ["Continuen oberts", "Tanquen a la tarda", "Es traslladen"], answer: "Continuen oberts", e: "«Els comerços continuaran oberts amb normalitat»." }
        ]
      }
    ],
    reading: [
      {
        title: "Exercici 3 · El silenci, un bé escàs",
        text: `Vivim envoltats de soroll. El trànsit, les obres, la música dels locals i, sobretot, les notificacions constants dels telèfons fan que el silenci s'hagi convertit en un bé escàs. L'Organització Mundial de la Salut fa anys que adverteix que la contaminació acústica no és només una molèstia: està relacionada amb trastorns del son, estrès i, fins i tot, malalties cardiovasculars.

A les illes, el problema té una cara estacional. Durant l'estiu, alguns barris costaners superen de llarg els límits de soroll nocturn que estableix la normativa, i els veïns denuncien que és impossible descansar. Els ajuntaments responen amb mapes de soroll i sancions, però molts residents consideren que les mesures arriben tard i que els interessos econòmics hi pesen massa.

Paradoxalment, cada vegada hi ha més gent disposada a pagar per trobar silenci. Els retirs sense mòbil, les rutes de senderisme per indrets aïllats o els allotjaments que prometen «desconnexió total» s'han convertit en un negoci en expansió. El silenci, que abans era gratuït, ara es ven.

Potser el repte no és fugir del soroll, sinó aprendre a conviure-hi de manera més saludable: reduir el que depèn de nosaltres, exigir que es compleixin les normes i reservar cada dia uns minuts per a la calma.`,
        items: [
          { type: "choice", q: "Segons el text, la contaminació acústica…", options: ["pot afectar la salut", "només és una molèstia", "ha desaparegut a les ciutats"], answer: "pot afectar la salut", e: "Trastorns del son, estrès i malalties cardiovasculars." },
          { type: "choice", q: "Què vol dir que el problema té «una cara estacional»?", options: ["Que s'agreuja en una època concreta de l'any", "Que només afecta les estacions de tren", "Que canvia cada dia"], answer: "Que s'agreuja en una època concreta de l'any", e: "A l'estiu, en alguns barris costaners." },
          { type: "choice", q: "Què pensen molts residents de les mesures municipals?", options: ["Que arriben tard", "Que són massa dures", "Que són innecessàries"], answer: "Que arriben tard", e: "«…consideren que les mesures arriben tard»." },
          { type: "choice", q: "Quina és la paradoxa que s'esmenta?", options: ["Hi ha gent que paga per tenir silenci", "El silenci fa més soroll", "Els turistes prefereixen el soroll"], answer: "Hi ha gent que paga per tenir silenci", e: "«El silenci, que abans era gratuït, ara es ven»." },
          { type: "choice", q: "Quina proposta fa l'autor al final?", options: ["Aprendre a conviure amb el soroll de manera més saludable", "Prohibir els mòbils", "Anar a viure al camp"], answer: "Aprendre a conviure amb el soroll de manera més saludable", e: "Últim paràgraf." }
        ]
      },
      {
        title: "Exercici 4 · Connectors: un nou centre de salut",
        text: `El nou centre de salut de Sant Jordi obrirà les portes el mes que ve. (1) ___ les obres s'han allargat més del previst, el resultat ha convençut els veïns. L'edifici disposarà de dotze consultes i d'un servei d'urgències obert les vint-i-quatre hores; (2) ___, es descongestionarà l'hospital de referència. (3) ___ de la plantilla, s'hi incorporaran quaranta professionals, (4) ___ la meitat ja han estat contractats. (5) ___, l'Associació de Veïns demana que es reforci el transport públic fins al centre.`,
        items: [
          { type: "choice", q: "(1)", options: ["Tot i que", "Ja que", "Per tant"], answer: "Tot i que", e: "Concessió: tot i que s'han allargat, ha convençut." },
          { type: "choice", q: "(2)", options: ["d'aquesta manera", "en canvi", "malgrat això"], answer: "d'aquesta manera", e: "Conseqüència." },
          { type: "choice", q: "(3)", options: ["Pel que fa a", "A nivell", "Degut a"], answer: "Pel que fa a", e: "Introdueix un tema. «A nivell» i «degut a» són incorrectes aquí." },
          { type: "choice", q: "(4)", options: ["dels quals", "que", "dels que"], answer: "dels quals", e: "Relatiu amb preposició: la meitat dels quals." },
          { type: "choice", q: "(5)", options: ["No obstant això", "Per exemple", "És a dir"], answer: "No obstant això", e: "Contrast: tot i les bones notícies, demanen més." }
        ]
      }
    ],
    writing: [
      { id: "parla2-w1", brief: "Ets la presidenta de l'AMIPA de l'escola. Escriu una carta a l'Ajuntament per queixar-te de l'estat del pati (sense ombra, paviment trencat) i proposar-hi millores concretes.", words: 170, weight: 40 },
      { id: "parla2-w2", brief: "Un diari digital obre un debat: «S'hauria de limitar el nombre de turistes que arriben a les Illes cada estiu?» Escriu un article d'opinió en què defensis la teva postura, aportis dos arguments i rebatis un argument contrari.", words: 250, weight: 60 }
    ],
    oral: {
      reading: "El Consell d'Eivissa posa en marxa una campanya per recuperar les varietats tradicionals d'ametller i garrover. Els pagesos interessats podran demanar arbres de manera gratuïta i rebran assessorament tècnic durant els dos primers anys. L'objectiu és mantenir el paisatge agrari i reduir el risc d'incendis.",
      interaction: "Amb un company/a, heu de decidir com gastar un pressupost de 5.000 euros per millorar la biblioteca del vostre barri. Proposau idees, justificau-les i arribau a un acord.",
      talk: "El teletreball: avantatges i inconvenients. Explica la teva experiència o la de persones que coneguis i dona la teva opinió (3-5 minuts)."
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
