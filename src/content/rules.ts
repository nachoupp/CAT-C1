/**
 * Regles de cada unitat, sempre visibles mentre es practica.
 * `forms`: opcions o formes que activen la regla (serveix per explicar per què una opció és incorrecta).
 */
export interface TeachRule {
  id: string;
  title: string;
  /** Una línia: què és i quan s'usa. */
  short: string;
  /** Explicació ampliada amb exemples (HTML senzill propi de l'app). */
  body: string;
  forms?: string[];
  keys?: string[];
}

export const RULES_BY_UNIT: Record<string, TeachRule[]> = {
  u1: [
    { id: "cd", title: "Complement directe: el, la, els, les", short: "substitueix el complement directe (què? qui?): el, la, els, les", body: "<p><b>el</b> (masc.), <b>la</b> (fem.), <b>els</b> (masc. pl.), <b>les</b> (fem. pl.).</p><p>Veig en Joan → <b>el</b> veig. Veig la Maria → <b>la</b> veig. Davant vocal o h: <b>l'</b>he vist.</p>", forms: ["el", "la", "les"], keys: ["complement directe", "cd"] },
    { id: "ci", title: "Complement indirecte: li, els", short: "substitueix la persona que rep l'acció (a qui?): li en singular, els en plural", body: "<p><b>li</b> = a ell, a ella, a vostè. <b>els</b> = a ells, a elles (també femení!).</p><p>Escric a la Marta → <b>li</b> escric. Dic als alumnes → <b>els</b> dic.</p><p>Verbs que porten indirecte: dir, escriure, telefonar, trucar, agradar, encantar.</p>", forms: ["li"], keys: ["indirecte", "a qui"] },
    { id: "els", title: "Els, los i 'ls", short: "davant del verb sempre els; los només darrere de verb acabat en consonant o u (veure-los), 'ls darrere de vocal (compra'ls)", body: "<p>Davant: <b>els</b> veig. Darrere: veure-<b>los</b>, fer-<b>los</b>, compra'<b>ls</b>.</p><p>«Los veig» és incorrecte.</p>", forms: ["els", "los"], keys: ["plural"] },
    { id: "ho", title: "Ho: el pronom neutre", short: "substitueix una frase sencera o una idea (això): ho sé, no ho entenc", body: "<p>Saps que plourà? Sí, <b>ho</b> sé. Diu que vindrà → <b>ho</b> diu.</p><p>No es fa servir per a persones ni noms concrets.</p>", forms: ["ho"], keys: ["neutre", "frase sencera"] },
    { id: "apos", title: "Apostrofació: l', m', t', n'", short: "davant de vocal o h, el, la, em, et, en s'apostrofen: l'he vist, m'agrada, t'estimo", body: "<p>Davant del verb: <b>l'</b>he vist, <b>m'</b>agrada, <b>t'</b>escric.</p><p>Davant consonant, forma plena: <b>el</b> veig, <b>em</b> diu, <b>et</b> truco.</p>", forms: ["l'", "m'", "t'", "et", "em", "te", "me"], keys: ["apostrof", "davant vocal"] },
    { id: "comb", title: "Combinacions i posició", short: "primer l'indirecte i després el directe: me'l, te la, li ho; darrere de l'imperatiu o l'infinitiu, amb guionet", body: "<p>em + el = <b>me'l</b> · et + ho = <b>t'ho</b> · li + ho = <b>li ho</b>.</p><p>Darrere del verb: dona-<b>me'l</b>, explica-<b>li-ho</b>, veure-<b>la</b>.</p>", forms: ["me'l", "me el", "m'el", "te l'", "t'ho", "te ho"], keys: ["combinació", "guionet", "imperatiu"] },
    { id: "temps", title: "Perifràstic o imperfet", short: "perifràstic (vaig fer) per a fets puntuals; imperfet (feia) per a descripcions i costums", body: "<p>Ahir <b>vaig escriure</b> una carta (fet). Quan <b>era</b> petit, <b>escrivia</b> molt (costum).</p>", forms: ["vaig escriure", "escrivia", "escriuré", "me'n vaig anar", "me'n anava", "em vaig"], keys: ["perifràstic", "imperfet"] }
  ],
  u2: [
    { id: "hi", title: "Hi: lloc i complements amb a, en, amb", short: "substitueix un lloc o un complement amb a, en, amb: hi vaig, hi penso, hi confio", body: "<p>Vaig a la platja → <b>hi</b> vaig. Penso en tu → <b>hi</b> penso. Confio en ell → <b>hi</b> confio.</p><p>Darrere del verb: ves-<b>hi</b>, anar-<b>hi</b>.</p>", forms: ["hi", "m'hi"], keys: ["lloc", "pensar en", "confiar en"] },
    { id: "en", title: "En: de, quantitats i noms sense article", short: "substitueix complements amb de, quantitats i noms sense article: en parlem, en tinc dos, no en vull", body: "<p>Parlem del viatge → <b>en</b> parlem. Tens fills? <b>En</b> tinc dos. Vols pa? No, no <b>en</b> vull.</p><p>Davant vocal <b>n'</b>: n'hem parlat. Darrere de vocal <b>'n</b>: parla'n.</p>", forms: ["en", "n'", "'n", "me'n", "d'"], keys: ["quantitat", "numeral", "parlar de", "venir de"] },
    { id: "nhi", title: "N'hi ha / hi ha", short: "hi ha és existencial i sempre va en singular; amb quantitat: n'hi ha", body: "<p><b>Hi ha</b> molts pisos (mai «hi han»). Quantes cadires hi ha? <b>N'hi ha</b> sis. No <b>n'hi ha</b> prou.</p>", forms: ["n'hi", "hi ha", "hi han"], keys: ["existencial"] },
    { id: "cd2", title: "Amb article: el, la, els, les", short: "si el nom porta article o és concret, és complement directe: el, la, els, les (no en)", body: "<p>Vols <u>el</u> llibre? Sí, <b>el</b> vull. Vols <u>llibres</u>? Sí, <b>en</b> vull.</p>", forms: ["el", "la", "les", "els", "l'"], keys: ["article"] },
    { id: "formal", title: "Carta formal", short: "salutació, tractament de vostè coherent, petició amb subjuntiu i comiat formal", body: "<p><b>Benvolgut senyor,</b> · Em dirigeixo a vostè per… · Per tot això, li sol·licito que… · <b>Atentament,</b></p>", forms: ["vostè", "tu", "vosaltres", "atentament,", "petons,", "fins aviat!"], keys: ["formal", "carta"] }
  ],
  u3: [
    { id: "que", title: "Que (sense preposició)", short: "relatiu sense preposició, per a persones i coses: el llibre que llegeixo, la noia que ve", body: "<p>Sense accent. Fa de subjecte o complement directe.</p><p>La feina <b>que</b> m'agrada · Els companys <b>que</b> hi van anar.</p>", forms: ["que"], keys: ["sense preposició"] },
    { id: "que2", title: "Què (amb preposició, coses)", short: "amb preposició i referit a coses porta accent: el tema de què parlem, la raó per què", body: "<p>El projecte <b>en què</b> treballo · El tema <b>de què</b> parlàvem.</p><p>També interrogatiu: no sé <b>què</b> vols.</p>", forms: ["què", "de què", "amb què", "en què", "a què"], keys: ["preposició", "cosa"] },
    { id: "qui", title: "Qui (amb preposició, persones)", short: "amb preposició i referit a persones: la persona amb qui parlo, a qui escric", body: "<p>La companya <b>amb qui</b> treballo · La persona <b>a qui</b> vaig escriure.</p><p>Sense preposició, en una relativa especificativa, no: la noia <b>que</b> ve (no «qui ve»).</p>", forms: ["qui", "amb qui", "a qui"], keys: ["persona"] },
    { id: "on", title: "On (llocs)", short: "per a llocs: l'empresa on treballo (= en què, en la qual)", body: "<p>La ciutat <b>on</b> vaig néixer · El despatx <b>on</b> treballa.</p>", forms: ["on"], keys: ["lloc"] },
    { id: "qual", title: "El qual, la qual (formal)", short: "relatiu compost formal: amb preposició (amb el qual) o entre comes; mai sense preposició en una especificativa", body: "<p>Les raons <b>per les quals</b>… · Un model <b>amb el qual</b> m'identifico.</p><p>Possessiu: l'oferta, els requisits <b>de la qual</b>…</p>", forms: ["el qual", "la qual", "els quals", "les quals", "quals", "qual"], keys: ["formal", "compost"] },
    { id: "laque", title: "«La que» darrere de preposició: no", short: "darrere de preposició no es diu «la que» ni «de que»: cal la qual o què", body: "<p>❌ la raó per la que → ✅ per la qual / per què.</p><p>«El que» sí que és correcte quan vol dir «allò que»: això és el que vull.</p>", forms: ["la que", "de que", "amb que", "en que", "que els seus requisits", "quins requisits"], keys: ["la que"] }
  ],
  u4: [
    { id: "per", title: "Per", short: "causa, mitjà, lloc de pas, temps aproximat, preu, agent i manera: per la pluja, per telèfon, per Nadal", body: "<p>Causa: <b>per</b> la vaga · Mitjà: <b>per</b> correu · Lloc de pas: <b>per</b> la porta · Temps: <b>per</b> Nadal · Preu: <b>per</b> 20 € · Agent: escrit <b>per</b> la directora.</p><p>Davant d'infinitiu, <b>per</b> sempre és correcte.</p>", forms: ["per", "pel", "pels"], keys: ["causa", "mitjà", "agent", "preu", "lloc de pas"] },
    { id: "pera", title: "Per a", short: "destinatari o finalitat davant d'un nom: un regal per a tu, una sala per a reunions", body: "<p><b>Per a</b> tu · <b>per a</b> les escoles · un carril <b>per a</b> bicicletes.</p><p>Contraccions: per a + el = <b>per al</b>, per a + els = <b>per als</b>.</p>", forms: ["per a", "per al", "per als"], keys: ["destinatari", "finalitat"] },
    { id: "nopera", title: "«Pera», «a per»: no", short: "no són preposicions catalanes (la pera és una fruita!)", body: "<p>❌ pera tu · ❌ vaig a per pa → ✅ per a tu · vaig a buscar pa.</p>", forms: ["pera", "a per"] },
    { id: "mes", title: "Més / menys … que", short: "superioritat i inferioritat: més petita que, menys aigua que; amb quantitats exactes, més de / menys de", body: "<p>Eivissa és <b>més</b> petita <b>que</b> Mallorca. Ha plogut <b>menys que</b> l'any passat.</p><p>Amb una xifra: <b>més de</b> 100 persones.</p><p>Millor, pitjor, major, menor ja són comparatius: ❌ més pitjor.</p>", forms: ["que", "més", "menys", "de", "menys de", "menor", "molt"], keys: ["superioritat", "més"] },
    { id: "tan", title: "Tan, tant … com", short: "tan + adjectiu o adverbi; tant (concordat) + nom; tant com amb verb", body: "<p><b>tan</b> gran <b>com</b> · <b>tanta</b> calor <b>com</b> · <b>tants</b> turistes <b>com</b> · corre <b>tant com</b> jo.</p>", forms: ["tan", "tant", "tanta", "tants", "tantes", "com"], keys: ["igualtat"] },
    { id: "prop", title: "Com més…, més…", short: "comparació proporcional: com més llegeixes, més aprens (mai «contra més»)", body: "<p><b>Com més</b> plàstic fem servir, <b>més</b> contaminem.</p>", forms: ["contra", "quant"], keys: ["proporcional"] },
    { id: "dades", title: "Lèxic per descriure dades", short: "augmentar, disminuir, disparar-se, mantenir-se estable, assolir el màxim, duplicar-se, reduir-se a la meitat", body: "<p>Ha <b>augmentat</b> un 20 % · ha <b>caigut bruscament</b> · s'ha <b>mantingut estable</b> · ha <b>assolit el màxim</b> · s'ha <b>duplicat</b>.</p>", keys: ["xifra", "gràfic", "duplic", "tripl"] }
  ],
  u5: [
    { id: "agudes", title: "Agudes (síl·laba tònica final)", short: "porten accent si acaben en vocal, -as, -es, -is, -os, -us, -en, -in: cafè, anglès, camí, també", body: "<p>caf<b>è</b> · angl<b>è</b>s · cam<b>í</b> · tamb<b>é</b> · atenci<b>ó</b>.</p><p>Sense accent: medicament, dimarts (acaben d'una altra manera).</p>", keys: ["aguda"] },
    { id: "planes", title: "Planes (penúltima síl·laba)", short: "porten accent si NO acaben en vocal, -as, -es, -is, -os, -us, -en, -in: càrrec, fàcil; examen no", body: "<p>c<b>à</b>rrec · f<b>à</b>cil · l<b>à</b>pis… però <b>examen</b>, <b>jove</b> sense accent.</p><p>Les acabades en -ia, -ie, -io, -ua… es tracten com a esdrúixoles: paci<b>è</b>ncia, hist<b>ò</b>ria.</p>", keys: ["plana"] },
    { id: "esdr", title: "Esdrúixoles", short: "sempre porten accent: telèfon, àrea, anàlisi, exàmens", body: "<p>tel<b>è</b>fon · <b>à</b>rea · an<b>à</b>lisi · ex<b>à</b>mens.</p>", keys: ["esdrúixola"] },
    { id: "obert", title: "Accent obert o tancat", short: "à sempre obert; è i ò obertes, é i ó tancades; í i ú sempre tancats", body: "<p>caf<b>è</b> (obert) · tamb<b>é</b> (tancat) · atenci<b>ó</b> (tancat) · hist<b>ò</b>ria (obert).</p>", keys: ["obert", "tancat"] },
    { id: "diacr", title: "Accents diacrítics (des del 2017)", short: "només en queden 15: bé, déu, és, mà, més, món, pèl, què, sé, sí, sòl, són, té, ús, vós", body: "<p><b>té</b> (tenir) / te (beguda) · <b>és</b> (ser) / es (pronom) · <b>sé</b> (saber) / se (pronom) · <b>són</b> (ser) / son (dormir).</p><p>Sense accent ara: soc, dona, adeu, net, vens, venen.</p>", forms: ["té", "te", "és", "es", "sé", "se", "són", "son", "soc", "sóc", "sòc", "adeu", "adéu", "adèu"], keys: ["diacrític", "2017"] },
    { id: "apos5", title: "Apòstrof", short: "el, la i de s'apostrofen davant de vocal o h; la no s'apostrofa davant de i/u àtones: la infermera, la universitat", body: "<p><b>l'</b>hospital · <b>l'</b>àvia · <b>d'</b>Eivissa · però <b>la</b> infermera, <b>la</b> universitat, <b>la</b> història.</p>", forms: ["l'hospital", "el hospital", "lo hospital", "la infermera", "l'infermera", "le infermera", "l'àvia", "la àvia", "d'eivissa", "de eivissa", "la universitat", "l'universitat", "le universitat"], keys: ["apostrof"] },
    { id: "essa", title: "S, ss, c, ç, z", short: "so sonor: s entre vocals (casa), z a principi o darrere de consonant (zero); so sord: ss entre vocals (pressa), ç davant a/o/u (plaça), c davant e/i", body: "<p>ca<b>s</b>a / ca<b>ss</b>a · <b>z</b>ero · pre<b>ss</b>ió · pla<b>ç</b>a · aten<b>c</b>ió.</p>", forms: ["zero", "sero", "cero", "pressió", "presió", "pressio", "plaça", "plassa", "plaza", "pressa", "presa", "preza", "atenció", "atensió", "atenciò"], keys: ["essa", "sonor", "sord"] },
    { id: "ll", title: "Ela geminada", short: "s'escriu l·l, amb punt volat: col·legi, intel·ligent, al·lèrgia", body: "<p>co<b>l·l</b>egi · inte<b>l·l</b>igent · a<b>l·l</b>èrgia · penici<b>l·l</b>ina.</p>", forms: ["col·legi", "colegi", "col.legi", "intel·ligent", "inteligent", "intelligent"], keys: ["geminada"] },
    { id: "inst", title: "La instància", short: "dades · EXPOSO (fets, «Que…») · SOL·LICITO («Que…» + subjuntiu) · lloc i data · destinatari al peu en majúscules", body: "<p><b>EXPOSO:</b> 1. Que… 2. Que…</p><p><b>SOL·LICITO:</b> Que em concedeixin…</p>", keys: ["exposo", "sol·licito", "instància"] }
  ],
  u6: [
    { id: "barb", title: "Castellanismes freqüents", short: "desde → des de · hasta → fins · tenir que → haver de · sin embargo → tanmateix · a nivell de → pel que fa a", body: "<p>desde → <b>des de</b> · hasta → <b>fins</b> · tenir que → <b>haver de</b> / <b>cal</b> · sin embargo → <b>tanmateix</b> · a nivell de → <b>pel que fa a</b> · degut a → <b>a causa de</b> · enterar-se → <b>assabentar-se</b> · lograr → <b>aconseguir</b> · llevar a cabo → <b>dur a terme</b>.</p>", forms: ["llevar a cap", "portar a cap", "plaç", "plaza", "apretar el botó", "apretar-se el botó", "hi ha que", "tenim que", "aconteixement", "acontesiment", "encuesta", "enquèsta", "la prensa", "el premsa", "els medis de comunicació", "els mitjos de comunicació", "eco", "ecos", "la tapa", "la coberta del dia"], keys: ["castellanisme", "barbarisme"] },
    { id: "registre", title: "Registre formal", short: "en un text formal no hi caben col·loquialismes (bueno, vale, escolta) ni exclamacions", body: "<p>❌ Bueno, vale… → ✅ Bé, d'acord…</p><p>Frases completes, tercera persona i lèxic precís.</p>", forms: ["vale, doncs…", "bueno…", "bueno, ja tenim pla de mobilitat!", "vale, l'ajuntament fa un pla"], keys: ["registre", "formal"] },
    { id: "noticia", title: "Estructura de la notícia", short: "titular breu en present · entradeta amb qui, què, on, quan i per què · cos amb detalls · del més al menys important", body: "<p><b>Piràmide invertida:</b> el més important al principi. La notícia informa, no opina.</p>", forms: ["la conclusió", "l'epíleg", "només qui", "com et sents", "al titular", "a l'entradeta"], keys: ["entradeta", "titular", "notícia"] },
    { id: "atrib", title: "Atribució i cites", short: "qui ho diu: segons…, ha explicat que…; paraules exactes entre cometes «»", body: "<p><b>Segons</b> la regidora, … · L'alcalde <b>ha explicat que</b>… · «Cita literal».</p><p>Verbs neutres: explicar, afirmar, assegurar. Evita confessar o admetre si no hi ha culpa.</p>", forms: ["parèntesis", "claudàtors", "ha confessat", "ha admès"], keys: ["cita", "atribució", "estil indirecte"] }
  ]
};

const norm = (s: string) => s.toLowerCase().replace(/[’]/g, "'").replace(/[.,;:!?«»"]/g, "").trim();
const strip = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Regla que explica la resposta correcta d'un exercici. */
export function ruleFor(rules: TeachRule[], answer: string, explanation: string): TeachRule | undefined {
  const a = norm(answer);
  const byForm = rules.find((r) => r.forms?.some((f) => norm(f) === a));
  if (byForm) return byForm;
  const e = explanation.toLowerCase();
  return rules.find((r) => r.keys?.some((k) => e.includes(k)));
}

/** Per què una opció és incorrecta, sense IA. Retorna null si no ho sap explicar. */
export function whyNot(option: string, answer: string, rules: TeachRule[]): string | null {
  const o = norm(option), a = norm(answer);
  const r = rules.find((x) => x.forms?.some((f) => norm(f) === o));
  if (r) return `«${option}»: ${r.short}.`;
  if (strip(o) === strip(a)) {
    const acc = rules.find((x) => x.id === "diacr" || x.id === "agudes");
    return `«${option}»: l'accent no és correcte.${acc ? " " + acc.short + "." : ""}`;
  }
  if (o.replace(/['\s]/g, "") === a.replace(/['\s]/g, "")) return `«${option}»: l'apostrofació no és correcta.`;
  if (o.replace(/ss|ç|z|c|s/g, "S") === a.replace(/ss|ç|z|c|s/g, "S")) return `«${option}»: la grafia del so de essa no és correcta.`;
  if (o.replace(/l·l|l\.l|ll/g, "L") === a.replace(/l·l|l\.l|ll/g, "L")) return `«${option}»: la ela geminada s'escriu amb punt volat (l·l).`;
  return null;
}

export const ALL_RULES: TeachRule[] = Object.values(RULES_BY_UNIT).flat();
