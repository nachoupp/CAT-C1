/**
 * Ruta Parla C1: 18 unitats. Cada unitat té 5 passos (descobreix, practica, escriu, parla, examen).
 * Les unitats 1-6 (fase 1) tenen el contingut complet; la resta mostra el pla i es van omplint.
 */

import { MORE } from "./units-more";
import { U7, U8, U9 } from "./units-c";
import { EXTRA } from "./units-extra";
import { U4, U5, U6 } from "./units-b";

export type StepKey = "descobreix" | "practica" | "escriu" | "parla" | "examen";

export interface ChoiceItem { type: "choice"; q: string; options: string[]; answer: string; e: string }
export interface TypedItem { type: "gap" | "fix" | "transform"; q: string; answers: string[]; e: string }
export type PracticeItem = ChoiceItem | TypedItem;

export interface UnitContent {
  lessons: string[];
  examples?: { ca: string; note: string }[];
  extra?: PracticeItem[];
  pretest: ChoiceItem[];
  model: { title: string; genre: string; text: string; notes: { quote: string; note: string }[] };
  practice: PracticeItem[];
  skeleton: { brief: string; template: string; tips: string[] };
  oral: { reading: string; topic: string; phrases: string[]; bot: string };
  exam: { brief: string; words: 170 | 250; minutes: number; focus: string[]; checklist: string[] };
}

export interface Unit {
  id: string;
  n: number;
  phase: 1 | 2 | 3 | 4;
  title: string;
  grammar: string;
  genre: string;
  oralTask: string;
  content?: UnitContent;
}

export interface Checkpoint { id: string; afterUnit: number; title: string; units: number[] }

export const PHASES = [
  { n: 1, title: "Base B2", when: "nov.–gen." },
  { n: 2, title: "Pont al C1", when: "gen.–febr." },
  { n: 3, title: "C1", when: "març–jul." },
  { n: 4, title: "Consolidació", when: "jul.–set." }
] as const;

export const STEPS: { key: StepKey; label: string; detail: string; minutes: number; xp: number }[] = [
  { key: "descobreix", label: "Descobreix", detail: "Test previ, píndola i text model", minutes: 25, xp: 20 },
  { key: "practica", label: "Practica", detail: "20 exercicis guiats", minutes: 25, xp: 20 },
  { key: "escriu", label: "Escriu guiat", detail: "Completa l'esquelet del text", minutes: 25, xp: 30 },
  { key: "parla", label: "Parla", detail: "Lectura amb model i exposició 4/3/2", minutes: 25, xp: 40 },
  { key: "examen", label: "Examen de la unitat", detail: "Text lliure tipus GOIB, correcció i reescriptura", minutes: 25, xp: 50 }
];

const U1: UnitContent = {
  lessons: ["p1", "p3"],
  pretest: [
    { type: "choice", q: "He vist en Joan → ___ he vist.", options: ["L'", "El", "Li"], answer: "L'", e: "«Veure algú» porta complement directe: en Joan → el, que davant vocal s'apostrofa (l'he vist)." },
    { type: "choice", q: "He escrit a la Marta → ___ he escrit.", options: ["Li", "L'", "La"], answer: "Li", e: "«Escriure a algú»: la persona és complement indirecte → li." },
    { type: "choice", q: "Ja saps que plourà? Sí, ja ___ sé.", options: ["ho", "el", "la"], answer: "ho", e: "Una frase sencera (que plourà) se substitueix pel pronom neutre ho." },
    { type: "choice", q: "Els llibres, ja ___ he tornat.", options: ["els", "les", "los"], answer: "els", e: "Complement directe masculí plural davant del verb: els." },
    { type: "choice", q: "Has trucat als teus pares? Sí, ___ he trucat.", options: ["els", "los", "li"], answer: "els", e: "«Trucar a algú»: complement indirecte plural → els." }
  ],
  model: {
    title: "La meva biografia lingüística",
    genre: "Biografia (Àrea 3, exercici 1 · 170 paraules)",
    text: `Vaig néixer a Saragossa l'any 1985 i, quan tenia deu anys, la meva família es va traslladar a Eivissa. Al principi, el català em semblava una llengua difícil: l'entenia a classe, però no el parlava mai fora de l'escola.

Tot va canviar a l'institut, quan vaig conèixer en Toni, un company de Sant Josep que només em parlava en català. Ell m'ho repetia sempre: «Si no t'equivoques, no aprendràs mai».

Més endavant vaig estudiar Magisteri a Palma i hi vaig viure cinc anys. Vaig fer les pràctiques en una escola de Manacor, on vaig descobrir que la llengua no és només una assignatura, sinó una manera d'entrar en la vida de la gent.

Actualment treballo de mestre a Vila i faig servir el català cada dia. Encara cometo errors, sobretot amb els pronoms, però ja no em fa por parlar-lo. El meu objectiu és aconseguir el certificat C1 enguany i, a més a més, animar els meus alumnes a viure en català.`,
    notes: [
      { quote: "Vaig néixer", note: "Passat perifràstic (vaig + infinitiu): el temps habitual per narrar fets acabats." },
      { quote: "quan tenia deu anys", note: "Imperfet per descriure la situació de fons." },
      { quote: "l'entenia", note: "Pronom de complement directe: el català → l' (davant vocal)." },
      { quote: "no el parlava", note: "El mateix complement directe davant consonant: el." },
      { quote: "m'ho repetia", note: "Combinació de pronoms: em (a mi) + ho (allò que deia)." },
      { quote: "hi vaig viure", note: "Hi substitueix el lloc: a Palma." },
      { quote: "Més endavant", note: "Marcador temporal que ordena la biografia." },
      { quote: "sinó", note: "Després d'una negació (no és només…, sinó…), s'escriu junt." },
      { quote: "parlar-lo", note: "Pronom darrere de l'infinitiu, amb guionet." },
      { quote: "a més a més", note: "Connector d'addició; dona riquesa al tancament." }
    ]
  },
  practice: [
    { type: "transform", q: "Substitueix el complement per un pronom: «Vaig conèixer la Joana a l'institut.»", answers: ["La vaig conèixer a l'institut", "Vaig conèixer-la a l'institut"], e: "La Joana és complement directe femení → la." },
    { type: "transform", q: "Substitueix el complement indirecte: «Escriuré un correu al director.»", answers: ["Li escriuré un correu"], e: "Al director (a qui?) → li." },
    { type: "transform", q: "Substitueix el complement: «Compraré els bitllets demà.»", answers: ["Els compraré demà"], e: "Els bitllets → els." },
    { type: "transform", q: "Substitueix el complement: «Has llegit les instruccions?»", answers: ["Les has llegides?", "Les has llegit?", "Les has llegides", "Les has llegit"], e: "Les instruccions → les. En registre formal, el participi concorda: les has llegides." },
    { type: "transform", q: "Substitueix la frase subratllada per un pronom: «No sé si vindrà.»", answers: ["No ho sé"], e: "Una oració sencera se substitueix per ho." },
    { type: "choice", q: "A la teva germana, ___ agrada molt viatjar.", options: ["li", "la", "l'"], answer: "li", e: "Agradar porta complement indirecte: a la teva germana → li." },
    { type: "choice", q: "Als alumnes, ___ he explicat la norma.", options: ["els", "los", "les"], answer: "els", e: "Complement indirecte plural (masculí o femení): els." },
    { type: "choice", q: "Aquesta pel·lícula, ja ___ he vista.", options: ["l'", "la", "li"], answer: "l'", e: "Davant vocal o h, la s'apostrofa: l'he vista." },
    { type: "choice", q: "Digues a en Pau que ___ esperem a la porta.", options: ["l'", "li", "el"], answer: "l'", e: "Esperar algú porta complement directe: l'esperem." },
    { type: "choice", q: "___ telefonaré aquesta tarda (a la Marta).", options: ["Li", "La", "L'"], answer: "Li", e: "Telefonar a algú: complement indirecte → li." },
    { type: "gap", q: "«Ajuda la teva mare» → Ajuda-___ ara mateix.", answers: ["la"], e: "Darrere de l'imperatiu el pronom va amb guionet: ajuda-la." },
    { type: "gap", q: "«Explica el problema al professor» → Explica-___ el problema.", answers: ["li"], e: "Al professor → li: explica-li." },
    { type: "gap", q: "«Dona'm el llibre» → Dona-___ (em + el).", answers: ["me'l"], e: "Em + el darrere del verb → -me'l." },
    { type: "gap", q: "Ho has entès? Sí, ___ he entès.", answers: ["ho"], e: "El pronom neutre es manté: ho he entès." },
    { type: "fix", q: "Corregeix la paraula incorrecta: «La vaig dir que vingués.»", answers: ["li"], e: "Dir alguna cosa a algú: complement indirecte → li vaig dir." },
    { type: "fix", q: "Corregeix la paraula incorrecta: «Lo que vull és aprovar.»", answers: ["el", "allò"], e: "«Lo» neutre no és normatiu: el que, allò que." },
    { type: "fix", q: "Corregeix la paraula incorrecta: «Desde petita m'agrada llegir.»", answers: ["des de"], e: "«Desde» és castellà: des de (o des que davant de verb)." },
    { type: "fix", q: "Corregeix l'expressió incorrecta: «Tinc que parlar-li avui.»", answers: ["he de"], e: "Obligació personal: haver de (he de parlar-li)." },
    { type: "choice", q: "Quina expressió ordena una biografia en el temps?", options: ["Més endavant", "Sin embargo", "A nivell de"], answer: "Més endavant", e: "Més endavant, al cap d'uns anys, actualment… són marcadors temporals." },
    { type: "choice", q: "«Quan era petit» és un exemple de…", options: ["imperfet per descriure el passat", "passat perifràstic", "futur"], answer: "imperfet per descriure el passat", e: "L'imperfet descriu situacions de fons; el perifràstic, fets puntuals." }
  ],
  skeleton: {
    brief: "Escriu la teva biografia lingüística completant l'esquelet. Substitueix cada ___ per contingut teu.",
    template: `Vaig néixer a ___ l'any ___. Quan tenia ___ anys, ___.

Al principi, el català ___: l'___, però ___.

Tot va canviar quan ___. Més endavant, ___.

Actualment ___. Encara ___, però ja no em fa por ___.

El meu objectiu és ___ i, a més a més, ___.`,
    tips: ["Fes servir almenys tres pronoms (l', el, li, ho, hi).", "Alterna passat perifràstic (fets) i imperfet (descripció).", "Ordena amb marcadors: al principi, més endavant, actualment."]
  },
  oral: {
    reading: "Vaig arribar a Eivissa un dia de setembre, amb una maleta i moltes ganes de començar. Al principi no entenia gaire res, però els veïns m'ajudaven cada dia. Avui el català forma part de la meva vida i el faig servir a la feina, al mercat i amb els amics.",
    topic: "Explica el teu recorregut vital i la teva relació amb el català.",
    phrases: ["Vaig néixer a… i em vaig criar a…", "Quan tenia… anys, vaig…", "Un moment clau va ser quan…", "Des d'aleshores…", "Actualment… i el meu objectiu és…"],
    bot: "Fes de periodista del programa de ràdio «Veus de l'illa». Entrevistes l'alumne sobre la seva trajectòria vital i la seva relació amb el català. Fes preguntes una a una, demana detalls i anècdotes."
  },
  exam: {
    brief: "La revista de la teva escola d'idiomes prepara un número sobre «Les nostres llengües». Escriu la teva biografia lingüística: on i com vas aprendre el català, un moment clau i quin paper té ara a la teva vida.",
    words: 170,
    minutes: 40,
    focus: ["pronoms febles de complement directe i indirecte", "passat perifràstic i imperfet", "marcadors temporals"],
    checklist: ["He fet servir almenys tres pronoms febles", "He narrat amb passat perifràstic i imperfet", "He ordenat el text amb marcadors temporals", "Té entre 150 i 190 paraules"]
  }
};

const U2: UnitContent = {
  lessons: ["p2", "p12"],
  pretest: [
    { type: "choice", q: "Vas a la platja? Sí, ___ vaig cada dia.", options: ["hi", "en", "la"], answer: "hi", e: "Complement de lloc (a la platja) → hi." },
    { type: "choice", q: "Vols més cafè? No, no ___ vull més.", options: ["en", "hi", "el"], answer: "en", e: "Quantitat indeterminada → en." },
    { type: "choice", q: "Parlareu del lloguer? Sí, ___ parlarem demà.", options: ["en", "hi", "el"], answer: "en", e: "Complement introduït per de (del lloguer) → en." },
    { type: "choice", q: "Penses en la reunió? Sí, ___ penso.", options: ["hi", "en", "la"], answer: "hi", e: "Pensar en alguna cosa → hi penso." },
    { type: "choice", q: "Quants pisos has vist? ___ he vist tres.", options: ["N'", "Hi", "Els"], answer: "N'", e: "Amb un numeral, el nom se substitueix per en: n'he vist tres." }
  ],
  model: {
    title: "Queixa a l'administrador de finques",
    genre: "Carta formal de queixa (Àrea 3, exercici 1 · 170 paraules)",
    text: `Sant Antoni de Portmany, 12 de novembre de 2026

Benvolguts senyors,

Em dirigeixo a vostès com a llogatera del pis 2n B del carrer de Ramon Llull, 14, per exposar-los un problema que dura des del mes de setembre.

En primer lloc, hi ha humitats greus al dormitori principal. Els ho vaig comunicar per telèfon el 3 d'octubre, però encara no he rebut cap resposta. Hi he posat un deshumidificador, però no n'hi ha prou. A més a més, la caldera s'atura cada dos o tres dies, de manera que sovint ens quedem sense aigua calenta.

Entenc que una reparació pot requerir temps; tanmateix, fa massa setmanes que vostès en tenen notícia i la situació afecta la salut de la família.

Per tot això, els sol·licito que enviïn un tècnic abans del 30 de novembre i que em confirmin per escrit la data de la visita. En cas contrari, em veuré obligada a presentar una reclamació a l'Oficina de Consum.

Atentament,

Laura Costa Ribas`,
    notes: [
      { quote: "Benvolguts senyors,", note: "Salutació formal; acaba amb coma." },
      { quote: "Em dirigeixo a vostès", note: "Obertura formal. Mantén el tractament de vostè en tota la carta." },
      { quote: "Els ho vaig comunicar", note: "Els (a vostès) + ho (el problema)." },
      { quote: "Hi he posat", note: "Hi = al dormitori (lloc)." },
      { quote: "no n'hi ha prou", note: "Expressió fixa amb en i hi: no és suficient." },
      { quote: "en tenen notícia", note: "En = del problema (complement amb de)." },
      { quote: "tanmateix", note: "Connector de contrast formal. Mai «sin embargo»." },
      { quote: "Per tot això, els sol·licito que", note: "Fórmula de petició + subjuntiu (enviïn, confirmin)." },
      { quote: "Atentament,", note: "Comiat formal coherent amb la salutació." }
    ]
  },
  practice: [
    { type: "choice", q: "M'agrada aquest barri: ___ visc des de fa anys.", options: ["hi", "en", "el"], answer: "hi", e: "Viure en un lloc → hi visc." },
    { type: "choice", q: "Del contracte, ja ___ hem parlat amb l'advocada.", options: ["n'", "hi", "l'"], answer: "n'", e: "Parlar de → en; davant vocal, n'." },
    { type: "choice", q: "Tens pomes? Sí, ___ tinc dues.", options: ["en", "hi", "les"], answer: "en", e: "Amb un numeral → en tinc dues." },
    { type: "choice", q: "Has pensat a pagar el rebut? Sí, ___ he pensat.", options: ["hi", "en", "ho"], answer: "hi", e: "Pensar a + infinitiu → hi he pensat." },
    { type: "choice", q: "Vens de la feina? Sí, ___ vinc ara.", options: ["en", "hi", "d'"], answer: "en", e: "Venir d'un lloc → en vinc." },
    { type: "choice", q: "Confies en el propietari? No, no ___ confio gens.", options: ["hi", "en", "el"], answer: "hi", e: "Confiar en → hi confio." },
    { type: "gap", q: "Hi ha prou cadires? No, no ___ ha prou.", answers: ["n'hi"], e: "No n'hi ha prou: en + hi davant de ha." },
    { type: "gap", q: "Vas al mercat? Ves-___ ara, que tanquen.", answers: ["hi"], e: "Imperatiu + hi amb guionet: ves-hi." },
    { type: "gap", q: "Quantes habitacions té el pis? ___ té tres.", answers: ["en"], e: "En té tres." },
    { type: "gap", q: "Escriu en una sola paraula: «Parla del problema» → ___", answers: ["parla'n"], e: "Darrere de verb acabat en vocal: parla'n." },
    { type: "transform", q: "Substitueix el lloc: «Hem estat a Formentera tot l'estiu.»", answers: ["Hi hem estat tot l'estiu"], e: "A Formentera → hi." },
    { type: "transform", q: "Substitueix el complement: «No tinc temps.»", answers: ["No en tinc"], e: "Nom sense article (temps) → en." },
    { type: "transform", q: "Substitueix el complement: «Penso en les vacances.»", answers: ["Hi penso"], e: "Pensar en → hi." },
    { type: "transform", q: "Substitueix el complement: «Hem parlat de la pujada del lloguer.»", answers: ["N'hem parlat"], e: "Parlar de → en; davant vocal, n'." },
    { type: "fix", q: "Corregeix: «Sin embargo, el pis és petit.»", answers: ["tanmateix", "no obstant això"], e: "Tanmateix o no obstant això." },
    { type: "fix", q: "Corregeix: «Hi han molts pisos buits.»", answers: ["hi ha"], e: "El verb existencial va en singular: hi ha molts pisos." },
    { type: "fix", q: "Corregeix: «Li escric per a que solucioni el problema.»", answers: ["perquè", "per tal que"], e: "Finalitat amb verb conjugat: perquè o per tal que." },
    { type: "choice", q: "Quina fórmula tanca una carta formal?", options: ["Atentament,", "Petons,", "Fins aviat!"], answer: "Atentament,", e: "També: Cordialment," },
    { type: "choice", q: "Quina frase és adequada en una queixa formal?", options: ["Us agrairia que ho solucionéssiu com més aviat millor.", "Arregleu-ho ja!", "Vale, espero."], answer: "Us agrairia que ho solucionéssiu com més aviat millor.", e: "Petició cortesa amb condicional + subjuntiu." },
    { type: "choice", q: "«No n'hi ha prou» vol dir…", options: ["no és suficient", "no n'hi ha cap", "és massa"], answer: "no és suficient", e: "Expressió molt útil a l'examen." }
  ],
  skeleton: {
    brief: "Escriu una carta de queixa a l'empresa que t'ha venut una rentadora defectuosa. Completa l'esquelet.",
    template: `[Lloc], [data]

Benvolgut senyor / Benvolguda senyora,

Em dirigeixo a vostè per ___.

En primer lloc, ___. A més a més, ___. Hi he ___, però no n'hi ha prou.

Entenc que ___; tanmateix, ___.

Per tot això, li sol·licito que ___. En cas contrari, ___.

Atentament,

[Nom i cognoms]`,
    tips: ["Mantén el tractament de vostè de principi a fi.", "Fes servir en i hi almenys tres vegades.", "La petició va amb subjuntiu: li sol·licito que m'envii…"]
  },
  oral: {
    reading: "Trobar un pis de lloguer a Eivissa s'ha convertit en una carrera d'obstacles. Els preus no paren de pujar i molts propietaris prefereixen el lloguer turístic, que els resulta més rendible. Mentrestant, mestres, metges i cambrers que hi arriben per treballar no en troben cap que puguin pagar.",
    topic: "El problema de l'habitatge a les Illes: descriu-lo i proposa dues solucions.",
    phrases: ["Un dels problemes més greus és…", "Això fa que…", "D'una banda… De l'altra…", "Una possible solució seria…", "Al meu parer, caldria…"],
    bot: "Fes de veí/veïna de la mateixa escala que l'alumne. Hi ha humitats que afecten els dos pisos i heu de decidir com reclamar a l'administrador de finques. Proposa una opció diferent de la seva, negocia i arribeu a un acord."
  },
  exam: {
    brief: "Fa un mes vas comprar per internet una rentadora a una botiga de Vila i va arribar espatllada. Has trucat dues vegades i no t'han donat cap solució. Escriu una carta formal de queixa: explica què ha passat, què has fet fins ara i què demanes.",
    words: 170,
    minutes: 40,
    focus: ["pronoms en i hi", "fórmules de la carta formal i tractament de vostè coherent", "connectors (en primer lloc, a més a més, tanmateix, per tot això)"],
    checklist: ["Salutació i comiat formals i coherents", "Tractament de vostè en tot el text", "He fet servir en i hi", "Petició clara amb subjuntiu", "Té entre 150 i 190 paraules"]
  }
};

const U3: UnitContent = {
  lessons: ["p11", "p13"],
  pretest: [
    { type: "choice", q: "L'empresa ___ treballo és a Vila.", options: ["on", "que", "qui"], answer: "on", e: "Relatiu de lloc: on (o en què)." },
    { type: "choice", q: "La companya amb ___ comparteixo despatx és de Menorca.", options: ["qui", "que", "la que"], answer: "qui", e: "Preposició + persona → qui (o la qual)." },
    { type: "choice", q: "El projecte ___ et vaig parlar ja ha començat.", options: ["de què", "de que", "que"], answer: "de què", e: "Preposició + cosa → què, amb accent (o del qual)." },
    { type: "choice", q: "El curs ___ faig és en línia.", options: ["que", "què", "qual"], answer: "que", e: "Sense preposició: que, sense accent." },
    { type: "choice", q: "Les raons per les ___ vull canviar de feina són clares.", options: ["quals", "que", "qui"], answer: "quals", e: "Article + preposició → les quals." }
  ],
  model: {
    title: "Carta de presentació",
    genre: "Carta de presentació (Àrea 3, exercici 1 · 170 paraules)",
    text: `Eivissa, 20 de novembre de 2026

Benvolguda senyora Marí,

Em poso en contacte amb vostè en relació amb l'oferta de recepcionista que el seu hotel va publicar en un portal d'ocupació el dia 15 d'aquest mes.

Soc diplomada en Turisme i fa sis anys que treballo en el sector. Actualment soc responsable del torn de matí d'un hotel de Santa Eulària des Riu, on coordino un equip de cinc persones i gestiono les reserves de grups. L'experiència que he adquirit en aquesta feina m'ha permès atendre clients en quatre llengües, entre les quals hi ha el català, que faig servir cada dia.

M'interessa especialment la seva empresa perquè aposta per un turisme sostenible, un model amb el qual m'identifico plenament.

Li adjunto el currículum i quedo a la seva disposició per ampliar-li la informació en una entrevista.

Atentament,

Marta Torres Planells`,
    notes: [
      { quote: "en relació amb", note: "Forma correcta: en relació amb (no «en relació a»)." },
      { quote: "on coordino", note: "Relatiu de lloc." },
      { quote: "L'experiència que he adquirit", note: "Que sense preposició i sense accent." },
      { quote: "entre les quals", note: "Preposició + relatiu compost: registre formal." },
      { quote: "amb el qual m'identifico", note: "Preposició + el qual, concordat amb el nom (model)." },
      { quote: "Li adjunto", note: "Li = a vostè." },
      { quote: "quedo a la seva disposició", note: "Fórmula de tancament per oferir més informació." }
    ]
  },
  practice: [
    { type: "choice", q: "La ciutat ___ vaig néixer és petita.", options: ["on", "que", "què"], answer: "on", e: "Lloc → on." },
    { type: "choice", q: "El cap ___ vaig parlar és molt amable.", options: ["amb qui", "amb que", "que"], answer: "amb qui", e: "Preposició + persona → qui." },
    { type: "choice", q: "És una feina ___ m'agrada molt.", options: ["que", "qui", "la qual"], answer: "que", e: "Sense preposició, en una relativa especificativa: que." },
    { type: "choice", q: "No sé ___ vols dir.", options: ["què", "que", "qual"], answer: "què", e: "Interrogativa indirecta: què (o el que)." },
    { type: "choice", q: "Hi ha coses ___ no estic d'acord.", options: ["amb què", "que", "amb que"], answer: "amb què", e: "Estar d'acord amb → amb què." },
    { type: "choice", q: "L'oferta, ___ són molt exigents, tanca demà.", options: ["els requisits de la qual", "que els seus requisits", "quins requisits"], answer: "els requisits de la qual", e: "Possessiu relatiu formal: el … del qual / de la qual." },
    { type: "gap", q: "La raó per ___ m'interessa aquesta feina és l'horari.", answers: ["la qual", "què"], e: "Per la qual o per què." },
    { type: "gap", q: "L'empresa ___ treballa la meva germana ha obert una seu a Palma.", answers: ["on", "en què", "en la qual"], e: "Lloc: on, en què, en la qual." },
    { type: "gap", q: "Els companys amb ___ treballo són molt joves.", answers: ["qui", "els quals"], e: "Persones: amb qui o amb els quals." },
    { type: "gap", q: "Aquest és el tema ___ vull parlar a l'entrevista.", answers: ["de què", "del qual"], e: "Parlar de → de què / del qual." },
    { type: "fix", q: "Corregeix el relatiu: «És la persona que li vaig enviar el currículum.»", answers: ["a qui", "a la qual"], e: "Enviar a algú → a qui (sense el pronom li)." },
    { type: "fix", q: "Corregeix: «En relació a l'oferta, li escric…»", answers: ["en relació amb"], e: "En relació amb." },
    { type: "fix", q: "Corregeix: «Estic interessada en que em truquin.»", answers: ["que"], e: "Davant de que, la preposició cau: interessada que." },
    { type: "fix", q: "Corregeix: «Tinc experiència a nivell de vendes.»", answers: ["en", "pel que fa a"], e: "«A nivell de» és incorrecte si no hi ha nivells: experiència en vendes." },
    { type: "choice", q: "«Puesto de trabajo» en català és…", options: ["lloc de feina", "puest de treball", "posat de feina"], answer: "lloc de feina", e: "Lloc de feina o lloc de treball." },
    { type: "choice", q: "Com demanes una entrevista en registre formal?", options: ["Li agrairia poder ampliar-li la informació en una entrevista.", "A veure si quedem i en parlem.", "Truca'm quan vulguis."], answer: "Li agrairia poder ampliar-li la informació en una entrevista.", e: "Condicional de cortesia i tractament de vostè." },
    { type: "choice", q: "«Contratar» en català és…", options: ["contractar", "contratar", "contraure"], answer: "contractar", e: "Contractar, contracte." },
    { type: "choice", q: "Una «plaça vacant» és…", options: ["un lloc de feina lliure", "una plaça del poble", "un dia de vacances"], answer: "un lloc de feina lliure", e: "Vacant: sense ocupar." },
    { type: "transform", q: "Uneix amb un relatiu: «Tinc una amiga. La meva amiga treballa a l'hotel.»", answers: ["Tinc una amiga que treballa a l'hotel"], e: "Subjecte → que." },
    { type: "transform", q: "Uneix amb un relatiu: «Visc en un poble. El poble és a prop de Vila.»", answers: ["Visc en un poble que és a prop de Vila"], e: "Subjecte → que." }
  ],
  skeleton: {
    brief: "Escriu una carta de presentació per a la feina de coordinador/a de l'escola d'estiu de l'Ajuntament de Sant Josep.",
    template: `[Lloc], [data]

Benvolgut senyor / Benvolguda senyora,

Em poso en contacte amb vostè en relació amb ___.

Soc ___ i fa ___ anys que ___. Actualment ___, on ___. L'experiència que ___ m'ha permès ___.

M'interessa especialment aquesta feina perquè ___, un projecte amb el qual ___.

Li adjunto el currículum i quedo a la seva disposició per ___.

Atentament,

[Nom i cognoms]`,
    tips: ["Fes servir almenys quatre relatius diferents (que, on, el qual, qui).", "Explica què saps fer amb fets concrets, no adjectius.", "Tracta la persona de vostè."]
  },
  oral: {
    reading: "Cada estiu, l'illa necessita milers de treballadors per atendre els visitants. Molts arriben amb un contracte de temporada i se'n tornen a l'octubre. Les empreses que aposten per contractes estables, en canvi, aconsegueixen equips amb més experiència i un servei de més qualitat.",
    topic: "Explica la teva trajectòria professional i per què ets la persona ideal per a la feina dels teus somnis.",
    phrases: ["He treballat com a… durant…", "Una de les tasques de què estic més orgullosa és…", "L'empresa on treballo…", "El que m'agradaria aportar és…", "Em considero una persona…"],
    bot: "Fes d'entrevistador/a de recursos humans d'un hotel d'Eivissa que busca una persona responsable de recepció. Fes preguntes una a una sobre experiència, punts forts i febles i situacions difícils, i reacciona a les respostes."
  },
  exam: {
    brief: "Has vist una oferta de feina com a coordinador/a de l'escola d'estiu de l'Ajuntament de Sant Josep de sa Talaia. Escriu la carta de presentació: qui ets, quina experiència tens, per què t'interessa la feina i com t'hi poden contactar.",
    words: 170,
    minutes: 40,
    focus: ["relatius (que, què, qui, on, el qual)", "fórmules de la carta formal", "repertori lèxic del món laboral"],
    checklist: ["Obertura i tancament formals", "Almenys quatre relatius ben usats", "Experiència explicada amb fets concrets", "Té entre 150 i 190 paraules"]
  }
};

const withExtra = (c: UnitContent, id: string): UnitContent => ({ ...c, examples: [...(c.examples ?? []), ...(EXTRA[id]?.examples ?? [])], extra: [...(c.extra ?? []), ...(EXTRA[id]?.extra ?? [])] });

/** Banc complet d'exercicis d'una unitat (bàsics + addicionals). */
export const unitPool = (c: UnitContent): PracticeItem[] => [...c.practice, ...(c.extra ?? [])];
const withMore = (c: UnitContent, id: string): UnitContent => ({ ...c, extra: [...(c.extra ?? []), ...(MORE[id] ?? [])] });

export const UNITS: Unit[] = [
  { id: "u1", n: 1, phase: 1, title: "Qui soc: trajectòria", grammar: "Pronoms febles I (el, la, li, els, ho)", genre: "Biografia breu", oralTask: "Presentar-te i explicar el teu recorregut", content: withMore(withExtra(U1, "u1"), "u1") },
  { id: "u2", n: 2, phase: 1, title: "Viure a l'illa: l'habitatge", grammar: "En i hi", genre: "Carta formal de queixa", oralTask: "Descriure un problema i proposar solucions", content: withMore(withExtra(U2, "u2"), "u2") },
  { id: "u3", n: 3, phase: 1, title: "Feina i formació", grammar: "Relatius (que, què, qui, on, el qual)", genre: "Carta de presentació", oralTask: "Entrevista de feina", content: withMore(withExtra(U3, "u3"), "u3") },
  { id: "u4", n: 4, phase: 1, title: "Medi ambient", grammar: "Per / per a, comparatius", genre: "Explicar un gràfic", oralTask: "Causes i conseqüències", content: withMore(U4, "u4") },
  { id: "u5", n: 5, phase: 1, title: "Salut i serveis", grammar: "Accents, s/z, apòstrof", genre: "Instància i sol·licitud", oralTask: "Demanar informació a l'Administració", content: withMore(U5, "u5") },
  { id: "u6", n: 6, phase: 1, title: "Mitjans de comunicació", grammar: "Barbarismes i registre", genre: "Notícia", oralTask: "Resumir una notícia", content: withMore(U6, "u6") },
  { id: "u7", n: 7, phase: 2, title: "Tecnologia", grammar: "Subjuntiu i condicionals", genre: "Article d'opinió (250)", oralTask: "Debat", content: U7 },
  { id: "u8", n: 8, phase: 2, title: "Cultura i art", grammar: "Combinació de pronoms", genre: "Ressenya", oralTask: "Recomanar i valorar", content: U8 },
  { id: "u9", n: 9, phase: 2, title: "Educació", grammar: "Connectors i cohesió", genre: "Carta al director", oralTask: "Argumentar i rebatre", content: U9 },
  { id: "u10", n: 10, phase: 3, title: "Burocràcia", grammar: "Tractament (vostè, vós) i fórmules", genre: "Convocatòria i acta", oralTask: "Reunió de veïns" },
  { id: "u11", n: 11, phase: 3, title: "Economia i consum", grammar: "Com / com a, derivació", genre: "Reclamació", oralTask: "Negociar un acord" },
  { id: "u12", n: 12, phase: 3, title: "Disseny i publicitat", grammar: "Locucions amb fer, tenir, anar", genre: "Text publicitari", oralTask: "Analitzar un eslògan amb doble sentit" },
  { id: "u13", n: 13, phase: 3, title: "Paisatge i gastronomia", grammar: "Ser, estar, haver-hi; gerundi", genre: "Fitxa i descripció", oralTask: "Explicar una ruta o un plat" },
  { id: "u14", n: 14, phase: 3, title: "Humor i ironia", grammar: "Frases fetes, refranys, sentit implícit", genre: "Crònica", oralTask: "Explicar un acudit o una vinyeta" },
  { id: "u15", n: 15, phase: 3, title: "Societat: son, felicitat, vellesa", grammar: "Concordança, prou, pas", genre: "Editorial", oralTask: "Defensar una proposta" },
  { id: "u16", n: 16, phase: 4, title: "Opinió a partir d'una notícia", grammar: "Repertori C1", genre: "Article d'opinió", oralTask: "—" },
  { id: "u17", n: 17, phase: 4, title: "L'oral d'examen", grammar: "Estratègies per guanyar temps", genre: "—", oralTask: "Interacció i exposició completes" },
  { id: "u18", n: 18, phase: 4, title: "Àrea 2 intensiva", grammar: "Repàs intercalat de tot", genre: "—", oralTask: "—" }
];

export const CHECKPOINTS: Checkpoint[] = [
  { id: "c1", afterUnit: 3, title: "Control 1", units: [1, 2, 3] },
  { id: "c2", afterUnit: 6, title: "Control 2", units: [1, 2, 3, 4, 5, 6] },
  { id: "c3", afterUnit: 9, title: "Control 3 + simulacre", units: [7, 8, 9] },
  { id: "c4", afterUnit: 12, title: "Control 4", units: [7, 8, 9, 10, 11, 12] },
  { id: "c5", afterUnit: 15, title: "Control 5", units: [10, 11, 12, 13, 14, 15] }
];
