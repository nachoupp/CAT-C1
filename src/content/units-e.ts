/** Unitats 13-15 (fase 3): paisatge i gastronomia (ser, estar, haver-hi; gerundi), humor i ironia (frases fetes i refranys), societat (concordança, prou, pas). */
import type { FullUnit } from "./units-b";

export const U13: FullUnit = {
  lessons: ["p7"],
  pretest: [
    { type: "choice", q: "La cala ___ a deu minuts del poble.", options: ["és", "està", "hi ha"], answer: "és", e: "Situació d'un lloc fix: és. Per a una persona o objecte que es pot moure, està." },
    { type: "choice", q: "Avui el mar ___ molt agitat.", options: ["està", "és", "hi ha"], answer: "està", e: "Estat transitori: està." },
    { type: "choice", q: "A la plaça ___ molts bars.", options: ["hi ha", "està", "són"], answer: "hi ha", e: "Existència: hi ha (invariable)." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Hi ha molts turistes.", "Hi han molts turistes.", "Hi ha molt turistes."], answer: "Hi ha molts turistes.", e: "Haver-hi no concorda en plural: hi ha molts." },
    { type: "choice", q: "«Va arribar caminant» expressa:", options: ["la manera", "la posterioritat", "la causa"], answer: "la manera", e: "Gerundi correcte: manera o simultaneïtat." }
  ],
  model: {
    title: "Ruta de la Talaia de Sant Josep",
    genre: "Fitxa i descripció (Àrea 3, exercici 1 · text descriptiu)",
    text: `RUTA DE LA TALAIA DE SANT JOSEP
Durada: 3 h · Dificultat: mitjana · Distància: 8 km

Aquesta ruta és ideal per als qui volen conèixer l'interior de l'illa sense massa pressa. Comença al poble de Sant Josep, que està a uns vint minuts d'Eivissa en cotxe, i puja suaument entre pinars i bancals de garrofers.

Al llarg del camí hi ha diverses fonts i algun mirador des d'on es veu el mar. Durant els primers quilòmetres el terreny és fàcil, però el darrer tram és més costerut, de manera que convé portar calçat adequat i aigua.

Un cop dalt, la vista és impressionant: l'illa de Formentera, els illots de ponent i, els dies clars, fins i tot la costa de la península. Tornant pel mateix camí, es pot fer una aturada al bar del poble, on serveixen un bon bullit de peix i flaó fresc.

Recomanem fer la ruta a primera hora del matí, quan encara no fa calor, i anar sempre caminant per les sendes marcades.`,
    notes: [
      { quote: "que està a uns vint minuts", note: "Estar + distància temporal des d'un punt de referència; també podria ser «és» si es presenta com a dada fixa." },
      { quote: "hi ha diverses fonts", note: "Haver-hi: existència; invariable (hi ha diverses fonts)." },
      { quote: "des d'on es veu el mar", note: "Relatiu amb preposició: des d'on, amb on com a antecedent de lloc." },
      { quote: "de manera que convé", note: "Locució consecutiva: de manera que + indicatiu." },
      { quote: "la vista és impressionant", note: "Ser per descriure una qualitat." },
      { quote: "fins i tot", note: "Locució adverbial d'èmfasi, més pròpia que «incluso»." },
      { quote: "Tornant pel mateix camí", note: "Gerundi de simultaneïtat o condició: correcte." },
      { quote: "bullit de peix", note: "Plat típic de les Illes: fitxa amb vocabulari local." },
      { quote: "quan encara no fa calor", note: "Fer + fenomen atmosfèric (repàs de la unitat 12)." },
      { quote: "anar sempre caminant", note: "Gerundi de manera, correcte." }
    ]
  },
  examples: [
    { ca: "La casa és gran i luminosa.", note: "Ser: descriure una qualitat permanent." },
    { ca: "La sopa està freda; l'has de tornar a escalfar.", note: "Estar: estat temporal." },
    { ca: "Sant Antoni és a la costa de ponent.", note: "Ser: localització d'un lloc fix." },
    { ca: "Els pagesos són a l'hort fins a les cinc.", note: "Ser/estar a + lloc; en català és habitual «ser a» per situar algú." },
    { ca: "Hi ha dues fonts a la serra.", note: "Haver-hi: existència." },
    { ca: "Ahir hi havia molta gent a la platja.", note: "Imperfet: hi havia; mai «hi havien»." },
    { ca: "Va arribar corrent al restaurant.", note: "Gerundi de manera." },
    { ca: "Estic cuinant un arròs de matances.", note: "Estar + gerundi: acció en curs." },
    { ca: "El menjar és boníssim, però el servei és lent.", note: "Ser + adjectiu: valoració." },
    { ca: "Aquest formatge és de Menorca.", note: "Ser de + origen." },
    { ca: "Parlant amb l'amo, vaig saber la recepta.", note: "Gerundi de simultaneïtat." },
    { ca: "No hi ha res com un bon sofregit.", note: "Haver-hi + res." },
    { ca: "Són les dues i encara estem esperant la taula.", note: "Ser: hora. Estar + gerundi: acció en curs." }
  ],
  practice: [
    { type: "choice", q: "La platja ___ a cinc quilòmetres.", options: ["és", "està", "hi ha"], answer: "és", e: "Situació d'un lloc fix." },
    { type: "choice", q: "Aquest camí ___ tancat per les obres.", options: ["està", "és", "hi ha"], answer: "està", e: "Estat transitori." },
    { type: "choice", q: "La paella ___ de pollastre i verdures.", options: ["és", "està", "hi ha"], answer: "és", e: "Ser de + ingredients o origen." },
    { type: "choice", q: "A la plaça ___ un mercat cada diumenge.", options: ["hi ha", "està", "és"], answer: "hi ha", e: "Existència." },
    { type: "choice", q: "Avui no ___ ningú a la cala.", options: ["hi ha", "és", "està"], answer: "hi ha", e: "No hi ha ningú." },
    { type: "choice", q: "Demà ___ molt de vent.", options: ["farà", "serà", "estarà"], answer: "farà", e: "Fenomen atmosfèric: fer." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Ahir hi havia moltes persones.", "Ahir hi havien moltes persones.", "Ahir hi va haver moltes persones."], answer: "Ahir hi havia moltes persones.", e: "Haver-hi és invariable: hi havia." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Hi ha hagut problemes.", "Hi han hagut problemes.", "Hi has hagut problemes."], answer: "Hi ha hagut problemes.", e: "Hi ha hagut (invariable)." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Hi haurà dues rutes.", "Hi hauran dues rutes.", "Hi haurem dues rutes."], answer: "Hi haurà dues rutes.", e: "Hi haurà: invariable." },
    { type: "choice", q: "Gerundi correcte (manera):", options: ["Va entrar cantant.", "Va entrar a cantar.", "Va entrar de cantar."], answer: "Va entrar cantant.", e: "Gerundi de manera." },
    { type: "choice", q: "Quin gerundi és incorrecte?", options: ["Es va aprovar una llei regulant els preus.", "Va arribar corrent.", "Tornant a casa, va ploure."], answer: "Es va aprovar una llei regulant els preus.", e: "Gerundi de posterioritat o adjectival: en català, «que regula»." },
    { type: "choice", q: "Millor: «una caixa ___ galetes»", options: ["que conté", "contenint", "que contenint"], answer: "que conté", e: "Gerundi adjectival no admès." },
    { type: "choice", q: "«Estic ___ la taula.» (parar)", options: ["parant", "parar", "parat de"], answer: "parant", e: "Estar + gerundi." },
    { type: "choice", q: "Gerundi de «dir»:", options: ["dient", "diguent", "dint"], answer: "dient", e: "Dir → dient." },
    { type: "choice", q: "Gerundi de «obrir»:", options: ["obrint", "obrent", "obrint-se-ho"], answer: "obrint", e: "Obrir → obrint." },
    { type: "choice", q: "Gerundi de «anar»:", options: ["anant", "anent", "anat"], answer: "anant", e: "Anar → anant." },
    { type: "choice", q: "«Hi ha molt de ___»", options: ["soroll", "sorolls", "sorollosa"], answer: "soroll", e: "Molt de + nom incomptable en singular." },
    { type: "choice", q: "Aquest plat ___ boníssim.", options: ["és", "està", "hi ha"], answer: "és", e: "Qualitat habitual." },
    { type: "choice", q: "La carn ___ crua encara.", options: ["està", "és", "hi ha"], answer: "està", e: "Estat transitori." },
    { type: "choice", q: "«Fins i tot» equival a:", options: ["incluso", "sobretodo", "mientras"], answer: "incluso", e: "Fins i tot = incluso." },
    { type: "choice", q: "Locució pròpia de ruta: «de manera ___»", options: ["que", "què", "qui"], answer: "que", e: "De manera que + indicatiu." },
    { type: "choice", q: "«Descripció»: quin recurs fa la fitxa més viva?", options: ["adjectius precisos i sensacions", "frases molt llargues sense punts", "només dades numèriques"], answer: "adjectius precisos i sensacions", e: "Combina dades i sensacions." },
    { type: "choice", q: "Quin és el lèxic de cuina correcte?", options: ["sofregit", "sofrit", "rehogado"], answer: "sofregit", e: "Sofregit." },
    { type: "choice", q: "Quin és el lèxic correcte?", options: ["bancal", "bancà", "bancalar"], answer: "bancal", e: "Bancal." },
    { type: "gap", q: "La cala ___ (ser) a dos quilòmetres del poble.", answers: ["és"], e: "Situació d'un lloc fix: és." },
    { type: "gap", q: "El forn ___ (estar) tancat avui.", answers: ["està"], e: "Estat transitori." },
    { type: "gap", q: "A la serra ___ (haver-hi, present) molts pins.", answers: ["hi ha"], e: "Hi ha molts pins." },
    { type: "gap", q: "Ahir ___ (haver-hi, imperfet) molta boira.", answers: ["hi havia"], e: "Hi havia." },
    { type: "gap", q: "Demà ___ (haver-hi, futur) activitats al port.", answers: ["hi haurà"], e: "Hi haurà." },
    { type: "gap", q: "Va entrar ___ (riure, gerundi).", answers: ["rient"], e: "Riure → rient." },
    { type: "gap", q: "___ (Pujar, gerundi) pel torrent, vam veure una font.", answers: ["Pujant"], e: "Pujar → pujant." },
    { type: "gap", q: "El peix ___ (ser) de la costa de Formentera.", answers: ["és"], e: "Ser de + origen." },
    { type: "gap", q: "Estic ___ (cuinar, gerundi) un arròs.", answers: ["cuinant"], e: "Estar + gerundi." },
    { type: "gap", q: "Hi ha molts ___ (turista, plural).", answers: ["turistes"], e: "Plural regular." },
    { type: "fix", q: "Corregeix: «Hi han molts pins a la serra.»", answers: ["ha"], e: "Hi ha: haver-hi no concorda." },
    { type: "fix", q: "Corregeix: «Ahir hi havien molts turistes.»", answers: ["havia"], e: "Hi havia." },
    { type: "fix", q: "Corregeix: «La cala està a cinc quilòmetres del poble.» (dada fixa)", answers: ["és"], e: "Lloc fix: és a." },
    { type: "fix", q: "Corregeix: «Es va aprovar una llei regulant els preus.»", answers: ["que regula"], e: "Gerundi adjectival: que regula." },
    { type: "fix", q: "Corregeix: «Va sortir de casa i va agafar el cotxe, arribant tard.»", answers: ["i va arribar"], e: "Gerundi de posterioritat: i va arribar." },
    { type: "fix", q: "Corregeix: «La sopa és freda, escalfa-la.»", answers: ["està"], e: "Estat temporal." },
    { type: "fix", q: "Corregeix: «Hi haurem molta gent diumenge.»", answers: ["haurà"], e: "Hi haurà." },
    { type: "transform", q: "Substitueix el gerundi adjectival: «Una caixa contenint verdures.»", answers: ["Una caixa que conté verdures"], e: "Que + present." },
    { type: "transform", q: "Passa a imperfet: «Hi ha molta gent al port.»", answers: ["Hi havia molta gent al port"], e: "Hi ha → hi havia." },
    { type: "transform", q: "Passa a futur: «Hi ha un concert.»", answers: ["Hi haurà un concert"], e: "Hi ha → hi haurà." },
    { type: "transform", q: "Fes-ho amb gerundi de manera: «Va arribar. Corria.»", answers: ["Va arribar corrent"], e: "Gerundi de manera." },
    { type: "transform", q: "Descriu amb estar + gerundi: «Ara cuino un arròs.»", answers: ["Ara estic cuinant un arròs"], e: "Estar + gerundi: acció en curs." }
  ],
  skeleton: {
    brief: "Escriu la fitxa descriptiva d'una ruta de senderisme (o d'un plat típic) del teu poble, amb dades pràctiques i una descripció viva (170 paraules).",
    template: `NOM DE LA RUTA (o del plat)
Durada: ___ · Dificultat: ___ · Distància: ___

Aquesta ruta és ideal per als qui ___ . Comença a ___ , que és/està a ___ , i ___ (verb de moviment) entre ___ .

Al llarg del camí hi ha ___ . Durant ___ el terreny és ___ , però ___ , de manera que convé ___ .

Un cop dalt/al final, ___ (descripció amb adjectius i sensacions).

Recomanem ___ (consell pràctic amb gerundi de manera).`,
    tips: ["Fes servir ser (qualitat), estar (estat) i hi ha (existència).", "Evita gerundis de posterioritat o adjectivals.", "Combina dades (km, hores) amb sensacions."]
  },
  oral: {
    reading: "La gastronomia local és una part essencial de la identitat d'un territori. Els plats tradicionals expliquen la història, el clima i la relació amb el mar i amb la terra. Tanmateix, el turisme massiu posa en perill la pervivència d'aquestes receptes: molts restaurants simplifiquen els plats per servir més ràpid. Per això, cal valorar els productes de proximitat i els cuiners que mantenen viva la cuina de sempre.",
    topic: "Explica una ruta o un plat típic de les Illes: què té d'especial, com s'arriba o com es fa, i per què el recomanaries.",
    phrases: ["Es tracta d'un plat que…", "Convé fer-ho quan…", "El que més destaca és…", "Hi ha un lloc des d'on…", "Un cop arribes…"],
    bot: "Fes de guia turístic/a. L'alumne t'explica una ruta o un plat. Fes-li preguntes de detall (com s'hi arriba, quant dura, què cal portar) i obliga'l a distingir ser, estar i hi ha i a evitar gerundis incorrectes."
  },
  exam: {
    brief: "Una associació turística et demana la fitxa d'una ruta o d'un plat de la teva comarca per a un fullet. Descriu-la (170 paraules) amb dades pràctiques i una descripció viva.",
    words: 170,
    minutes: 40,
    focus: ["ser / estar / haver-hi", "gerundi correcte", "lèxic de gastronomia i paisatge"],
    checklist: ["Tinc títol i dades pràctiques", "He distingit ser, estar i hi ha", "No he fet servir gerundis de posterioritat", "He inclòs descripció amb sensacions", "He acabat amb una recomanació", "Té entre 150 i 190 paraules"]
  }
};

export const U14: FullUnit = {
  lessons: ["p17"],
  pretest: [
    { type: "choice", q: "«Fer-se l'orni» vol dir:", options: ["fer veure que no s'ha adonat de res", "enfadar-se molt", "ballar sol"], answer: "fer veure que no s'ha adonat de res", e: "Fer-se l'orni = fer-se el desentès." },
    { type: "choice", q: "«Ploure a bots i barrals» vol dir:", options: ["ploure molt", "ploure poc", "ploure a estones"], answer: "ploure molt", e: "Ploure molt, amb força." },
    { type: "choice", q: "«No tenir pèls a la llengua» és:", options: ["dir les coses sense embuts", "parlar poc", "tenir mala veu"], answer: "dir les coses sense embuts", e: "Parlar clar, sense embolcalls." },
    { type: "choice", q: "«Qui dia passa, any empeny» vol dir:", options: ["que és millor no complicar-se la vida", "que cal córrer", "que els anys passen de pressa"], answer: "que és millor no complicar-se la vida", e: "Valora anar vivint sense preocupar-se massa." },
    { type: "choice", q: "La ironia consisteix a:", options: ["dir el contrari del que es vol dir", "dir sempre la veritat", "repetir una frase"], answer: "dir el contrari del que es vol dir", e: "Es nota pel to i pel context." }
  ],
  model: {
    title: "Crònica d'una revetlla de Sant Joan",
    genre: "Crònica (Àrea 3, exercici 1 · text narratiu amb humor)",
    text: `LA REVETLLA QUE VA PLOURE A BOTS I BARRALS

Tothom ho havia previst, menys l'organització: la revetlla de Sant Joan de la plaça Major va acabar abans d'hora quan, just en el moment de cremar la foguera, va començar a ploure a bots i barrals.

Els veïns, que havien arribat carregats de coques, vi i guitarres, es van quedar amb un pam de nas. L'alcalde, que havia assegurat feia tres dies que no plouria ni una gota, va intentar fer-se l'orni, però el micròfon el va delatar: «Sembla que alguna cosa ha fallat», va dir, mentre l'aigua li regalimava pel coll.

Cap al tard, la banda de música va decidir que el programa s'havia de seguir costés el que costés. Va ser així com els assistents, protegits sota els tendals de la fira, van acabar cantant havaneres entre cassoles i paraigües. Fins i tot els més escèptics van haver de reconèixer que, de vegades, el millor pla és el que no s'ha pensat.

A mitjanit, ningú no es va queixar. Com diu el refrany, qui dia passa, any empeny.`,
    notes: [
      { quote: "ploure a bots i barrals", note: "Frase feta: ploure molt." },
      { quote: "Tothom ho havia previst, menys l'organització", note: "Ironia lleu: l'organització va ser l'única que no ho va preveure." },
      { quote: "es van quedar amb un pam de nas", note: "Frase feta: quedar decebut o sorprès." },
      { quote: "fer-se l'orni", note: "Fer veure que no passa res." },
      { quote: "no plouria ni una gota", note: "Futur en el passat (condicional) dins de l'estil indirecte." },
      { quote: "el micròfon el va delatar", note: "Humor: el micròfon va fer sentir el que no hauria volgut." },
      { quote: "costés el que costés", note: "Subjuntiu repetit: sigui quin sigui el preu." },
      { quote: "Va ser així com", note: "Estructura de focalització: va ser així com + verb." },
      { quote: "Fins i tot els més escèptics", note: "Èmfasi amb fins i tot." },
      { quote: "qui dia passa, any empeny", note: "Refrany: no cal complicar-se la vida." }
    ]
  },
  examples: [
    { ca: "Quan va veure la factura, es va quedar de pedra.", note: "Quedar-se de pedra = quedar-se parat." },
    { ca: "No et facis l'orni: sé que ho has vist.", note: "Fer-se l'orni." },
    { ca: "Ploure a bots i barrals no va impedir la festa.", note: "Frase feta: ploure molt." },
    { ca: "No té pèls a la llengua: ho diu tot.", note: "Dir les coses clares." },
    { ca: "Va fer una muntanya d'un gra de sorra.", note: "Exagerar un problema petit." },
    { ca: "A cavall regalat no li miris el dentat.", note: "Refrany: no critiquis allò que et regalen." },
    { ca: "Qui dia passa, any empeny.", note: "Refrany: ves passant sense angoixar-te." },
    { ca: "Tal faràs, tal trobaràs.", note: "Refrany: reps el que fas." },
    { ca: "De mica en mica s'omple la pica.", note: "Refrany: la constància dona fruits." },
    { ca: "Quina sort! Just ara que no tinc paraigua!", note: "Ironia: vol dir quin mal moment." },
    { ca: "Ho va dir amb la boca petita.", note: "Dir una cosa per cortesia, sense ganes." },
    { ca: "Va tirar llenya al foc amb aquell comentari.", note: "Empitjorar una discussió." },
    { ca: "Em sembla que algú ha passat per aquí, no sé si m'entens…", note: "Sentit implícit: intenció que no es diu." }
  ],
  practice: [
    { type: "choice", q: "«Quedar-se amb un pam de nas» és:", options: ["quedar decebut", "tenir mal nas", "fer un favor"], answer: "quedar decebut", e: "Quedar decebut o sorprès." },
    { type: "choice", q: "«Tirar llenya al foc» és:", options: ["empitjorar una situació", "anar d'excursió", "escalfar la casa"], answer: "empitjorar una situació", e: "Atiar una discussió." },
    { type: "choice", q: "«Fer una muntanya d'un gra de sorra» és:", options: ["exagerar", "construir", "ser prudent"], answer: "exagerar", e: "Fer gran un problema petit." },
    { type: "choice", q: "«A cavall regalat no li miris el ___»", options: ["dentat", "peu", "ull"], answer: "dentat", e: "A cavall regalat no li miris el dentat." },
    { type: "choice", q: "«De mica en mica s'omple la ___»", options: ["pica", "casa", "taula"], answer: "pica", e: "De mica en mica s'omple la pica." },
    { type: "choice", q: "«Tal faràs, tal ___»", options: ["trobaràs", "diràs", "tindràs"], answer: "trobaràs", e: "Tal faràs, tal trobaràs." },
    { type: "choice", q: "«Qui no vol pols, que no vagi a l'___»", options: ["era", "hora", "eina"], answer: "era", e: "Qui no vol pols, que no vagi a l'era." },
    { type: "choice", q: "«Cada ovella amb la seva ___»", options: ["parella", "pastora", "lluna"], answer: "parella", e: "Cada ovella amb la seva parella." },
    { type: "choice", q: "«Ploure a bots i barrals» s'usa per:", options: ["ploure molt", "no ploure", "ploure poc"], answer: "ploure molt", e: "Ploure amb força." },
    { type: "choice", q: "«Quina sort!» dit amb mala cara és:", options: ["ironia", "agraïment", "sorpresa"], answer: "ironia", e: "Dir el contrari del que es pensa." },
    { type: "choice", q: "«Hacerse el sueco» en català:", options: ["fer-se l'orni", "fer-se el suec", "fer el tonto"], answer: "fer-se l'orni", e: "Fer-se l'orni o fer-se el desentès." },
    { type: "choice", q: "La crònica narra els fets en:", options: ["ordre cronològic i amb un to personal", "ordre alfabètic", "primera persona del plural obligatòria"], answer: "ordre cronològic i amb un to personal", e: "La crònica mescla fets i veu de l'autor." },
    { type: "choice", q: "Temps habitual per narrar fets passats en una crònica:", options: ["perfet perifràstic (va + infinitiu)", "present sempre", "futur"], answer: "perfet perifràstic (va + infinitiu)", e: "Va arribar, van dir, es va quedar…" },
    { type: "choice", q: "Quin és el temps de «havia previst»?", options: ["plusquamperfet", "futur", "perfet"], answer: "plusquamperfet", e: "Havia + participi." },
    { type: "choice", q: "«Va ser així com…» serveix per:", options: ["focalitzar un fet", "negar", "preguntar"], answer: "focalitzar un fet", e: "Estructura de relleu." },
    { type: "choice", q: "«Costés el que costés» és:", options: ["subjuntiu d'imperfet repetit", "futur", "condicional"], answer: "subjuntiu d'imperfet repetit", e: "Locució concessiva: sigui quin sigui el preu." },
    { type: "choice", q: "Quin refrany diu que cal esperar i ser constant?", options: ["De mica en mica s'omple la pica.", "Tal faràs, tal trobaràs.", "Qui no vol pols, que no vagi a l'era."], answer: "De mica en mica s'omple la pica.", e: "Constància." },
    { type: "choice", q: "Quin refrany diu que cadascú rep el que fa?", options: ["Tal faràs, tal trobaràs.", "A cavall regalat no li miris el dentat.", "Qui dia passa, any empeny."], answer: "Tal faràs, tal trobaràs.", e: "Causa i efecte." },
    { type: "choice", q: "Per explicar una vinyeta humorística, primer:", options: ["descriu què es veu i després explica el joc", "inventa una història", "explica l'autor"], answer: "descriu què es veu i després explica el joc", e: "Primer l'escena; després el doble sentit." },
    { type: "choice", q: "Un doble sentit juga amb:", options: ["dos significats d'una mateixa expressió", "dues llengües", "una sola frase llarga"], answer: "dos significats d'una mateixa expressió", e: "Literal i figurat." },
    { type: "choice", q: "«Fins i tot els més escèptics…» és:", options: ["èmfasi", "negació", "condició"], answer: "èmfasi", e: "Fins i tot reforça." },
    { type: "choice", q: "Frase correcta:", options: ["Es va quedar de pedra.", "Es va quedar de pedres.", "Va quedar-se pedra."], answer: "Es va quedar de pedra.", e: "Quedar-se de pedra." },
    { type: "choice", q: "«No tenir pèls a la llengua» s'aplica a una persona:", options: ["sincera", "tímida", "mentidera"], answer: "sincera", e: "Parla clar." },
    { type: "gap", q: "Ploure a ___ i barrals.", answers: ["bots"], e: "Ploure a bots i barrals." },
    { type: "gap", q: "Quedar-se amb un ___ de nas.", answers: ["pam"], e: "Un pam de nas." },
    { type: "gap", q: "Tal faràs, tal ___.", answers: ["trobaràs"], e: "Refrany." },
    { type: "gap", q: "A cavall regalat no li miris el ___.", answers: ["dentat"], e: "Refrany." },
    { type: "gap", q: "Qui dia passa, any ___.", answers: ["empeny"], e: "Refrany." },
    { type: "gap", q: "De mica en mica s'omple la ___.", answers: ["pica"], e: "Refrany." },
    { type: "gap", q: "Ho va fer ___ el que costés (costar, imperfet de subjuntiu).", answers: ["costés"], e: "Costés el que costés." },
    { type: "gap", q: "Es ___ (quedar, perfet perifràstic) de pedra.", answers: ["va quedar"], e: "Perfet perifràstic: va quedar." },
    { type: "gap", q: "No té ___ a la llengua.", answers: ["pèls"], e: "No tenir pèls a la llengua." },
    { type: "fix", q: "Corregeix: «No et facis el suec.»", answers: ["l'orni"], e: "Fer-se l'orni; i faci → facis." },
    { type: "fix", q: "Corregeix: «Va ploure a mansalva.»", answers: ["a bots i barrals"], e: "A bots i barrals." },
    { type: "fix", q: "Corregeix: «Tal faràs, tal trobes.»", answers: ["trobaràs"], e: "Refrany en futur." },
    { type: "fix", q: "Corregeix: «A cavall regalat no li miris el diente.»", answers: ["dentat"], e: "Dentat." },
    { type: "fix", q: "Corregeix: «Es va quedar sense paraules, tot i això, va dir res.»", answers: ["no va dir res"], e: "Falta la negació: no va dir res." },
    { type: "transform", q: "Fes-ho irònic: «Quin mal moment!» (sense paraigua i plovent)", answers: ["Quina sort!"], e: "Ironia: dir el contrari." },
    { type: "transform", q: "Fes-ho amb una frase feta: «Va quedar molt decebut.»", answers: ["Es va quedar amb un pam de nas"], e: "Quedar-se amb un pam de nas." },
    { type: "transform", q: "Fes-ho amb una frase feta: «Plovia molt.»", answers: ["Plovia a bots i barrals"], e: "Ploure a bots i barrals." },
    { type: "transform", q: "Escriu amb perfet perifràstic: «Arriben, saluden i marxen.»", answers: ["Van arribar, van saludar i van marxar"], e: "Va + infinitiu." },
    { type: "transform", q: "Fes-ho amb «va ser així com»: «Així vam descobrir la font.»", answers: ["Va ser així com vam descobrir la font"], e: "Estructura de relleu." }
  ],
  skeleton: {
    brief: "Escriu una crònica humorística d'un acte públic (una festa, una assemblea o un partit) amb ironia i almenys tres frases fetes o refranys (170 paraules).",
    template: `TÍTOL AMB FRASE FETA O JOC DE PARAULES

Tothom ___ (plusquamperfet), menys ___ : ___ (fet inicial amb perfet perifràstic).

Els assistents ___ (frase feta). ___ (cita irònica entre cometes).

Cap al tard, ___ (desenvolupament, amb costés el que costés / va ser així com).

___ (tancament amb refrany o ironia).`,
    tips: ["Narra amb perfet perifràstic i plusquamperfet.", "Fes servir almenys tres frases fetes o refranys.", "Posa ironia amb un to subtil, sense ridiculitzar persones."]
  },
  oral: {
    reading: "L'humor és una eina poderosa per criticar la realitat sense aixecar la veu. La ironia, en particular, diu una cosa i en vol dir una altra, i requereix que el receptor entengui el sentit implícit. Tanmateix, no tot el món comparteix el mateix sentit de l'humor: allò que fa riure a uns pot ofendre uns altres. Per això, qui fa humor ha de tenir en compte el públic i el context.",
    topic: "Explica una vinyeta humorística o un acudit: descriu l'escena, explica el doble sentit i valora si t'ha fet gràcia.",
    phrases: ["A la vinyeta es veu…", "El joc de paraules consisteix en…", "Vol dir exactament el contrari de…", "Em sembla un humor…", "El sentit implícit és que…"],
    bot: "Fes de company/a que no entén un acudit. L'alumne ha d'explicar-lo (escena, doble sentit, ironia). Fes-li preguntes (què vol dir exactament?, a qui va dirigit?) i demana-li una frase feta o un refrany relacionats."
  },
  exam: {
    brief: "Una revista cultural et demana una crònica humorística d'un acte públic (festa popular, partit o assemblea). Narra els fets en ordre amb ironia i fes servir almenys tres frases fetes o refranys.",
    words: 170,
    minutes: 40,
    focus: ["frases fetes i refranys", "ironia i sentit implícit", "temps verbals de la narració"],
    checklist: ["Tinc títol i fet inicial", "He narrat amb perfet perifràstic i plusquamperfet", "He inclòs tres frases fetes o refranys", "Hi ha ironia subtil", "He acabat amb un tancament amb gràcia", "Té entre 150 i 190 paraules"]
  }
};

export const U15: FullUnit = {
  lessons: ["p10"],
  pretest: [
    { type: "choice", q: "La majoria dels joves ___ de pressa.", options: ["viuen", "viu", "vivim"], answer: "viuen", e: "La majoria de + plural: es pot posar el verb en plural." },
    { type: "choice", q: "No ho sé ___.", options: ["pas", "mai", "gens"], answer: "pas", e: "Pas reforça una negació: No ho sé pas." },
    { type: "choice", q: "No tinc ___ diners per comprar-ho.", options: ["prou", "bastants", "gaires"], answer: "prou", e: "Prou = suficient." },
    { type: "choice", q: "Les cartes, les he ___.", options: ["escrites", "escrit", "escrites-les"], answer: "escrites", e: "Participi amb pronom d'objecte directe de 3a persona concorda: les he escrites." },
    { type: "choice", q: "Un editorial expressa:", options: ["l'opinió d'un mitjà o col·lectiu", "una notícia objectiva", "una carta personal"], answer: "l'opinió d'un mitjà o col·lectiu", e: "Editorial: veu del mitjà, amb to argumentatiu." }
  ],
  model: {
    title: "Editorial: dormir més, viure millor",
    genre: "Editorial (Àrea 3, exercici 1 · text argumentatiu)",
    text: `DORMIR MÉS, VIURE MILLOR

La majoria dels adults dormen menys de les hores recomanades i ningú no sembla escandalitzar-se'n. Hem convertit la son en una variable d'ajust: la primera cosa que sacrifiquem quan la feina o l'oci ho reclamen. Tanmateix, les dades són prou clares: dormir poc augmenta el risc de malalties, redueix la concentració i ens fa més irritables.

No es tracta només d'una qüestió individual. Una societat que no dorm prou és una societat que treballa pitjor, que condueix pitjor i que conviu pitjor. Per això creiem que les administracions i les empreses han d'actuar: horaris més racionals, menys reunions a darrera hora i més consciència sobre l'impacte de les pantalles nocturnes.

Algú dirà que ningú no pot obligar ningú a anar a dormir. Tampoc no ho pretenem pas. Allò que reclamem és que dormir deixi de ser un luxe i es converteixi en un dret reconegut.

En definitiva, la felicitat no es compra: es dorm. I cal començar a prendre-s'ho seriosament.`,
    notes: [
      { quote: "La majoria dels adults dormen", note: "Concordança: la majoria de + plural → verb en plural." },
      { quote: "ningú no sembla escandalitzar-se'n", note: "Ningú + no + verb: la negació es manté amb ningú darrere del verb." },
      { quote: "són prou clares", note: "Prou = suficientment." },
      { quote: "No es tracta només d'una qüestió individual", note: "No es tracta de + nom: introdueix un matís." },
      { quote: "Per això creiem que", note: "Primera persona del plural: veu col·lectiva de l'editorial." },
      { quote: "Algú dirà que", note: "Anticipar l'objecció i rebatre-la." },
      { quote: "Tampoc no ho pretenem pas", note: "Pas reforça la negació." },
      { quote: "Allò que reclamem", note: "Estructura de relleu: allò que + verb." },
      { quote: "deixi de ser un luxe", note: "Subjuntiu després de que dependent d'una exigència." },
      { quote: "la felicitat no es compra: es dorm", note: "Tancament amb joc de paraules o frase d'efecte." }
    ]
  },
  examples: [
    { ca: "La majoria dels veïns han votat a favor.", note: "Concordança en plural amb la majoria de + plural." },
    { ca: "Un grup de joves va organitzar la protesta.", note: "Un grup de + plural: el verb pot anar en singular." },
    { ca: "No ho sé pas: potser ho sap ella.", note: "Pas reforça la negació." },
    { ca: "Ningú no ha dit pas que sigui fàcil.", note: "Pas amb ningú i negació." },
    { ca: "Tinc prou feina amb la meva.", note: "Prou = suficient." },
    { ca: "No dormo prou, i m'ho noto.", note: "Prou com a adverbi." },
    { ca: "Les cartes, les he escrites aquest matí.", note: "Concordança del participi amb pronom directe." },
    { ca: "Aquesta decisió, l'han presa els veïns.", note: "Participi femení amb l'objecte avançat." },
    { ca: "La son i la felicitat són dues cares d'una mateixa moneda.", note: "Dos subjectes → verb en plural." },
    { ca: "Els avis, la gent gran en general, mereixen més atenció.", note: "Aposició: concorda amb el subjecte." },
    { ca: "Ni la salut ni la felicitat no s'aconsegueixen sense descans.", note: "Ni… ni + verb en plural." },
    { ca: "Cal que la societat valori la vellesa.", note: "Cal que + subjuntiu." },
    { ca: "Jo tampoc no ho veig pas clar.", note: "Tampoc + no + pas." }
  ],
  practice: [
    { type: "choice", q: "La majoria dels estudiants ___ aprovat.", options: ["han", "ha", "heu"], answer: "han", e: "La majoria de + plural → verb en plural." },
    { type: "choice", q: "Un grup de turistes ___ perdut.", options: ["s'ha", "s'han", "s'hem"], answer: "s'ha", e: "Un grup de + plural: verb en singular." },
    { type: "choice", q: "La gent ___ cansada.", options: ["està", "estan", "estàs"], answer: "està", e: "Gent és singular." },
    { type: "choice", q: "No tinc ___ temps per fer-ho.", options: ["prou", "poc", "gens"], answer: "prou", e: "Prou = suficient." },
    { type: "choice", q: "Aquesta casa és ___ gran per a tots.", options: ["prou", "poc", "gaire"], answer: "prou", e: "Prou gran = suficientment gran." },
    { type: "choice", q: "No m'ho ha dit ___.", options: ["pas", "mai", "ningú"], answer: "pas", e: "Pas reforça." },
    { type: "choice", q: "Pas s'usa només amb:", options: ["una negació (o pregunta/condició)", "sempre", "mai"], answer: "una negació (o pregunta/condició)", e: "No ho sé pas; Vols pas venir?" },
    { type: "choice", q: "Quina frase és correcta?", options: ["No ho vull pas.", "Ho vull pas.", "No pas ho vull."], answer: "No ho vull pas.", e: "Pas va al final de la negació." },
    { type: "choice", q: "Les notícies, les he ___.", options: ["llegides", "llegit", "llegida"], answer: "llegides", e: "Les (f. pl.) → llegides." },
    { type: "choice", q: "La carta, l'he ___.", options: ["escrita", "escrit", "escrites"], answer: "escrita", e: "La (f. sg.) → escrita." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Ni el sol ni la pluja m'aturen.", "Ni el sol ni la pluja m'atura.", "Ni el sol ni la pluja m'aturem."], answer: "Ni el sol ni la pluja m'aturen.", e: "Ni… ni amb verb en plural." },
    { type: "choice", q: "Quina frase és correcta?", options: ["La majoria d'ells no ho saben.", "La majoria d'ells no ho sap.", "La majoria d'ells no ho sabeu."], answer: "La majoria d'ells no ho saben.", e: "Majoria + plural." },
    { type: "choice", q: "L'estructura d'un editorial és:", options: ["tesi, arguments, contraarguments i conclusió", "descripció i dades", "diàleg"], answer: "tesi, arguments, contraarguments i conclusió", e: "Argumentatiu." },
    { type: "choice", q: "Un editorial parla habitualment en:", options: ["primera persona del plural", "primera persona del singular", "segona persona"], answer: "primera persona del plural", e: "Veu col·lectiva: creiem, reclamem." },
    { type: "choice", q: "Per anticipar una objecció:", options: ["Algú dirà que…", "Ho vaig fer.", "Mai no ho sabré."], answer: "Algú dirà que…", e: "Recurs argumentatiu." },
    { type: "choice", q: "Quin connector introdueix una concessió?", options: ["Tanmateix", "Per això", "Perquè"], answer: "Tanmateix", e: "Tanmateix = no obstant això." },
    { type: "choice", q: "Quin és el contrari de «vellesa»?", options: ["joventut", "infantesa", "maduresa"], answer: "joventut", e: "Vellesa ↔ joventut." },
    { type: "choice", q: "«Son» en català és:", options: ["la necessitat de dormir", "un tipus de música", "sonoritat"], answer: "la necessitat de dormir", e: "Tenir son; la son (femení en balear: sa son)." },
    { type: "choice", q: "«Felicitat» és:", options: ["un nom femení", "un nom masculí", "un adjectiu"], answer: "un nom femení", e: "La felicitat." },
    { type: "choice", q: "Quin és un sinònim de «gent gran»?", options: ["persones grans", "gent vella", "gent nova"], answer: "persones grans", e: "Més respectuós: gent gran, persones grans." },
    { type: "choice", q: "«Cal que» va amb:", options: ["subjuntiu", "indicatiu", "infinitiu"], answer: "subjuntiu", e: "Cal que + subjuntiu." },
    { type: "choice", q: "«Els avis i els néts ___ units.»", options: ["estan", "està", "estem"], answer: "estan", e: "Dos subjectes: plural." },
    { type: "choice", q: "Quina forma és correcta?", options: ["la majoria de gent", "la majoria de la gent", "la majoria de gents"], answer: "la majoria de la gent", e: "Davant de gent s'usa l'article: la majoria de la gent." },
    { type: "gap", q: "La majoria dels veïns ___ (estar, plural) d'acord.", answers: ["estan"], e: "Majoria + plural." },
    { type: "gap", q: "Un grup d'estudiants ___ (protestar, perfet perifràstic) davant l'escola.", answers: ["va protestar"], e: "Un grup de + plural: singular." },
    { type: "gap", q: "No ho sé ___.", answers: ["pas"], e: "No ho sé pas." },
    { type: "gap", q: "No tinc ___ diners.", answers: ["prou"], e: "Prou diners." },
    { type: "gap", q: "Les fotos, les he ___ (fer, participi).", answers: ["fetes"], e: "Les (f. pl.) → fetes." },
    { type: "gap", q: "La nota, l'he ___ (veure, participi).", answers: ["vista"], e: "La (f. sg.) → vista." },
    { type: "gap", q: "Ni la son ni la fam ens ___ (aturar) avui.", answers: ["aturen"], e: "Ni… ni + plural." },
    { type: "gap", q: "Cal que la societat ___ (valorar, present de subjuntiu) la gent gran.", answers: ["valori"], e: "Cal que + subjuntiu." },
    { type: "gap", q: "Tampoc ___ (jo, voler) anar-hi pas.", answers: ["vull"], e: "Tampoc no vull anar-hi pas." },
    { type: "gap", q: "La felicitat no es ___ (comprar).", answers: ["compra"], e: "Passiva reflexa." },
    { type: "fix", q: "Corregeix: «La majoria de la gent no saben res.»", answers: ["sap"], e: "Gent és singular: sap." },
    { type: "fix", q: "Corregeix: «Ningú ha dit pas això.»", answers: ["no ha dit"], e: "Ningú no + verb." },
    { type: "fix", q: "Corregeix: «Les cartes, les he escrit.»", answers: ["escrites"], e: "Concordança amb pronom directe." },
    { type: "fix", q: "Corregeix: «Ni el pare ni la mare em deixa sortir.»", answers: ["deixen"], e: "Ni… ni + plural." },
    { type: "fix", q: "Corregeix: «Es suficient per avui.»", answers: ["És"], e: "És (verb ser), amb accent." },
    { type: "transform", q: "Reforça la negació: «No m'ho ha dit.»", answers: ["No m'ho ha dit pas"], e: "Pas reforça." },
    { type: "transform", q: "Fes-ho amb prou: «Té els diners necessaris.»", answers: ["Té prou diners"], e: "Prou diners = els necessaris." },
    { type: "transform", q: "Fes concordar el participi: «He vist les notícies.» → «Les notícies, ___»", answers: ["les he vistes"], e: "Les + participi femení plural." },
    { type: "transform", q: "Passa a editorial (1a persona del plural): «Penso que cal més atenció a la gent gran.»", answers: ["Creiem que cal més atenció a la gent gran", "Pensem que cal més atenció a la gent gran"], e: "L'editorial parla en plural." }
  ],
  skeleton: {
    brief: "Escriu un editorial sobre la soledat de la gent gran o sobre el descans, amb tesi, dos arguments, una objecció rebatuda i una proposta (170 paraules).",
    template: `TÍTOL AMB FRASE D'EFECTE

La majoria de ___ (dada o fet que sorprèn) i ningú no ___ .

No es tracta només de ___ . Una societat que ___ és una societat que ___ .

Per això creiem que ___ (proposta amb cal que + subjuntiu).

Algú dirà que ___ . No ho pretenem pas: allò que reclamem és ___ .

En definitiva, ___ (frase de tancament).`,
    tips: ["Parla en primera persona del plural.", "Fes servir pas i prou amb naturalitat.", "Cuida la concordança del verb i dels participis."]
  },
  oral: {
    reading: "Les societats envelleixen i, amb això, creix la necessitat de repensar com cuidem les persones grans. L'allargament de la vida és un èxit col·lectiu, però també un repte: cal garantir pensions dignes, serveis de proximitat i, sobretot, evitar la soledat no desitjada. Tanmateix, el debat públic sovint se centra només en el cost econòmic i oblida la dimensió humana.",
    topic: "Defensa una proposta per millorar la vida de la gent gran del teu poble. Anticipa una objecció i rebat-la.",
    phrases: ["Proposo que…", "Algú podria dir que…, però…", "El que és evident és que…", "No ho veig pas com un problema, sinó com…", "Per tot això, cal que…"],
    bot: "Fes de regidor/a escèptic/a. L'alumne defensa una proposta per a la gent gran. Fes-li objeccions (cost, prioritats) i demana-li dades i exemples. Obliga'l a fer servir cal que + subjuntiu, pas i prou."
  },
  exam: {
    brief: "Un diari local publica una sèrie d'editorials sobre qüestions socials. Escriu l'editorial sobre el benestar i el descans (o la gent gran) amb tesi, arguments, una objecció rebatuda i una proposta.",
    words: 170,
    minutes: 40,
    focus: ["concordança del verb i del participi", "pas i prou", "estructura de l'editorial"],
    checklist: ["Tinc títol i tesi clara", "Parlo en primera persona del plural", "He rebatut una objecció", "He fet una proposta amb cal que + subjuntiu", "He cuidat la concordança", "Té entre 150 i 190 paraules"]
  }
};
