/**
 * Fase 0 · Fonaments: repàs des de zero, en ordre. Cada lliçó: explicació → vocabulari amb àudio →
 * pràctica → dictat. Es considera feta amb un 80 % a la pràctica.
 */
import type { PracticeItem } from "./units";

export interface Basic {
  id: string;
  n: number;
  title: string;
  goal: string;
  cards: { title: string; html: string }[];
  vocab: { ca: string; es: string; note?: string }[];
  items: PracticeItem[];
  dictation: string[];
}

const ok = "Quina és correcta?";

export const BASICS: Basic[] = [
  {
    id: "f1", n: 1, title: "Els nombres", goal: "Comptar de 0 a un milió i escriure bé els guionets i el femení (dues, dues-centes).",
    cards: [
      { title: "El truc D-U-C", html: "<p>Tres lletres per muntar qualsevol nombre, com fan els nens:</p><p><b>D-U</b> = <b>D</b>esena + <b>U</b>nitat: <b>trenta-dos</b> (30 + 2), <b>quaranta-cinc</b>. Només amb vint s'afegeix <b>-i-</b>: <b>vint-i-u</b>.</p><p><b>U-C</b> = <b>U</b>nitat + <b>C</b>entena: primer el multiplicador i després <b>-cents</b>: <b>dos-cents</b> (2 · cent), <b>tres-cents</b>, <b>set-cents</b>. Es llegeix en l'ordre en què s'escriu.</p><p>Junts, de gran a petit: <b>235 = dos-cents · trenta-cinc</b> (U-C + D-U). Els milers igual: <b>3.480 = tres mil · quatre-cents · vuitanta</b>.</p><p>Compte: <b>cent</b> (100) no porta «un», <b>mil</b> tampoc, però <b>dos mil</b>, <b>dos-cents</b>. Femení: <b>dues-centes</b>, <b>dues mil</b> persones.</p>" },
      { title: "De 0 a 20", html: "<p>zero · u (un, una) · <b>dos, dues</b> · tres · quatre · cinc · sis · set · vuit · nou · deu · onze · dotze · tretze · catorze · quinze · setze · disset · divuit · dinou · vint</p><p>A les Balears també es diu <b>desset, devuit, denou</b>: són correctes.</p>" },
      { title: "Desenes: el guionet", html: "<p>Desena + unitat amb guionet: <b>trenta-dos</b>, <b>quaranta-cinc</b>. Només amb vint hi ha <b>-i-</b>: <b>vint-i-u</b>, <b>vint-i-tres</b>.</p><p>trenta · quaranta · cinquanta · seixanta · setanta · vuitanta · <b>noranta</b></p>" },
      { title: "Centenars i milers", html: "<p>cent · cent u · <b>dos-cents</b> (masculí) / <b>dues-centes</b> (femení) · tres-cents · cinc-cents · mil (mai «un mil») · dos mil · un milió.</p><p>Concorden amb el nom: <b>dues-centes persones</b>, <b>dos-cents euros</b>.</p>" }
    ],
    vocab: [
      { ca: "u, un, una", es: "uno, un, una" }, { ca: "dos, dues", es: "dos (m./f.)" }, { ca: "quatre", es: "cuatro" }, { ca: "cinc", es: "cinco" },
      { ca: "set", es: "siete" }, { ca: "vuit", es: "ocho" }, { ca: "nou", es: "nueve" }, { ca: "quinze", es: "quince" },
      { ca: "disset", es: "diecisiete", note: "balear: desset" }, { ca: "divuit", es: "dieciocho", note: "balear: devuit" }, { ca: "dinou", es: "diecinueve", note: "balear: denou" },
      { ca: "vint-i-tres", es: "veintitrés" }, { ca: "trenta-quatre", es: "treinta y cuatro" }, { ca: "seixanta", es: "sesenta" }, { ca: "noranta", es: "noventa" },
      { ca: "dos-cents, dues-centes", es: "doscientos, doscientas" }, { ca: "cinc-cents", es: "quinientos" }, { ca: "mil", es: "mil" }, { ca: "un milió", es: "un millón" }
    ],
    items: [
      { type: "choice", q: "Com s'escriu 17?", options: ["disset", "dicisset", "dieciset"], answer: "disset", e: "Disset (a les Balears, desset)." },
      { type: "choice", q: "Com s'escriu 23?", options: ["vint-i-tres", "vint i tres", "vinti-tres"], answer: "vint-i-tres", e: "Amb vint: vint-i-tres, amb dos guionets." },
      { type: "choice", q: "Com s'escriu 34?", options: ["trenta-quatre", "trenta-i-quatre", "trentaquatre"], answer: "trenta-quatre", e: "Desena + unitat amb un guionet (la -i- només amb vint)." },
      { type: "choice", q: "200 cadires", options: ["dues-centes cadires", "dos-cents cadires", "dues-cents cadires"], answer: "dues-centes cadires", e: "Cadira és femení: dues-centes." },
      { type: "choice", q: "2 persones", options: ["dues persones", "dos persones"], answer: "dues persones", e: "Femení: dues." },
      { type: "choice", q: "Com s'escriu 90?", options: ["noranta", "novanta", "nonanta"], answer: "noranta", e: "Noranta." },
      { type: "choice", q: "Com s'escriu 70?", options: ["setanta", "setenta", "setanta-i"], answer: "setanta", e: "Setanta." },
      { type: "choice", q: "Com s'escriu 1.500?", options: ["mil cinc-cents", "un mil cinc-cents", "mil cincents"], answer: "mil cinc-cents", e: "Mai «un mil»; cinc-cents amb guionet." },
      { type: "choice", q: "Com es diu 0?", options: ["zero", "cero", "sero"], answer: "zero", e: "Zero." },
      { type: "choice", q: ok, options: ["Fa quinze anys.", "Fa quinçe anys.", "Fa quinse anys."], answer: "Fa quinze anys.", e: "Quinze, amb z." },
      { type: "choice", q: "Com s'escriu 300 (truc U-C)?", options: ["tres-cents", "trescents", "cent tres"], answer: "tres-cents", e: "U-C: unitat + cents, amb guionet: tres-cents." },
      { type: "choice", q: "Com es diu 457?", options: ["quatre-cents cinquanta-set", "quatre-cents i cinquanta-set", "quatre cents cinquanta set"], answer: "quatre-cents cinquanta-set", e: "U-C (quatre-cents) + D-U (cinquanta-set): sense -i- i amb guionets dins de cada bloc." },
      { type: "gap", q: "El llibre té ___ (326) pàgines.", answers: ["tres-centes vint-i-sis"], e: "Pàgines és femení: tres-centes; D-U de vint: vint-i-sis." },
      { type: "gap", q: "Tinc ___ (2) germanes.", answers: ["dues"], e: "Germanes és femení: dues." },
      { type: "gap", q: "A la classe hi ha ___ (21) alumnes.", answers: ["vint-i-un"], e: "Davant de nom masculí: vint-i-un." },
      { type: "gap", q: "La sala té ___ (500) seients.", answers: ["cinc-cents"], e: "Cinc-cents, amb guionet." },
      { type: "fix", q: "Corregeix: «Tinc dos filles.»", answers: ["dues"], e: "Filles és femení: dues filles." }
    ],
    dictation: ["Tinc dues germanes i un germà.", "La meva àvia té noranta-dos anys.", "A la classe hi ha vint-i-tres alumnes.", "El viatge costa dos-cents cinquanta euros.", "Visc al número disset del carrer Major.", "Hi van venir més de mil cinc-centes persones."]
  },
  {
    id: "f2", n: 2, title: "Ordinals, dies, mesos i hores", goal: "Dir el primer, el cinquè…, les dates, els dies de la setmana i l'hora.",
    cards: [
      { title: "Ordinals", html: "<p><b>primer/primera</b> (1r, 1a) · <b>segon/segona</b> (2n, 2a) · <b>tercer/tercera</b> (3r, 3a) · <b>quart/quarta</b> (4t, 4a) · <b>cinquè/cinquena</b> (5è, 5a) · sisè · setè · vuitè · novè · desè.</p><p>Visc al <b>cinquè</b> pis, porta <b>segona</b>.</p>" },
      { title: "Dies, mesos i estacions", html: "<p>dilluns · dimarts · dimecres · dijous · divendres · dissabte · diumenge (en minúscula).</p><p>gener · febrer · <b>març</b> · abril · maig · juny · <b>juliol</b> · agost · setembre · octubre · novembre · desembre.</p><p>Dates: el 6 <b>de</b> març, el 2 <b>d'</b>octubre (de s'apostrofa davant de vocal). Estacions: primavera, estiu, <b>tardor</b>, hivern.</p>" },
      { title: "L'hora", html: "<p><b>És la una</b> · <b>Són les dues</b>, les tres… · Són les cinc <b>i quart</b> · les cinc <b>i mitja</b> · <b>tres quarts de</b> sis (5.45).</p><p>Tradicional: <b>un quart de</b> sis (5.15), <b>dos quarts de</b> sis (5.30).</p>" }
    ],
    vocab: [
      { ca: "primer, primera", es: "primero, primera" }, { ca: "segon, segona", es: "segundo, segunda" }, { ca: "tercer, tercera", es: "tercero, tercera" },
      { ca: "quart, quarta", es: "cuarto, cuarta" }, { ca: "cinquè, cinquena", es: "quinto, quinta" }, { ca: "desè, desena", es: "décimo, décima" },
      { ca: "dilluns", es: "lunes" }, { ca: "dimecres", es: "miércoles" }, { ca: "dijous", es: "jueves" }, { ca: "diumenge", es: "domingo" },
      { ca: "gener", es: "enero" }, { ca: "març", es: "marzo" }, { ca: "maig", es: "mayo" }, { ca: "juliol", es: "julio" }, { ca: "agost", es: "agosto" },
      { ca: "la tardor", es: "el otoño" }, { ca: "l'hivern", es: "el invierno" }, { ca: "És la una i mitja.", es: "Es la una y media." }, { ca: "Són les set i quart.", es: "Son las siete y cuarto." }
    ],
    items: [
      { type: "choice", q: "el 5è pis", options: ["cinquè", "quint", "cinqué"], answer: "cinquè", e: "Cinquè, amb accent obert." },
      { type: "choice", q: "la 2a planta", options: ["segona", "secunda", "segon"], answer: "segona", e: "Femení: segona." },
      { type: "choice", q: "el 4t", options: ["quart", "quatrè", "cuart"], answer: "quart", e: "Quart, quarta." },
      { type: "choice", q: "Abreviatura de «tercera»", options: ["3a", "3ra", "3è"], answer: "3a", e: "1a, 2a, 3a (femení); 1r, 2n, 3r, 4t (masculí)." },
      { type: "choice", q: "Data correcta", options: ["el 2 d'octubre", "el 2 de octubre", "el 2 d'Octubre"], answer: "el 2 d'octubre", e: "D' davant de vocal i el mes en minúscula." },
      { type: "choice", q: "Completa: «Ens veiem ___.»", options: ["dilluns", "Dilluns", "dillúns"], answer: "dilluns", e: "Els dies de la setmana van en minúscula." },
      { type: "choice", q: "El mes 7", options: ["juliol", "juli", "julio"], answer: "juliol", e: "Juliol." },
      { type: "choice", q: "El mes 3", options: ["març", "mars", "marzo"], answer: "març", e: "Març, amb ç." },
      { type: "choice", q: "L'estació de setembre a desembre", options: ["tardor", "otony", "tardó"], answer: "tardor", e: "La tardor." },
      { type: "choice", q: "Després de dijous ve…", options: ["divendres", "dimecres", "dissabte"], answer: "divendres", e: "Dijous → divendres → dissabte." },
      { type: "choice", q: "13.30", options: ["És la una i mitja.", "Són les una i mitja.", "És les una i mitja."], answer: "És la una i mitja.", e: "Amb la una: és la una." },
      { type: "gap", q: "L'examen és el 6 ___ març.", answers: ["de"], e: "De davant de consonant." },
      { type: "gap", q: "Vaig néixer el 15 ___ abril.", answers: ["d'"], e: "D' davant de vocal: d'abril." },
      { type: "gap", q: "Visc al ___ (3r) pis.", answers: ["tercer"], e: "Tercer." }
    ],
    dictation: ["L'examen és el sis de març.", "El meu aniversari és el quinze d'agost.", "Visc al cinquè pis, porta segona.", "A la tardor plou més que a l'estiu.", "Els dimarts i els dijous tinc classe de català.", "Són les set i quart i encara no ha arribat."]
  },
  {
    id: "f3", n: 3, title: "Colors i descripció", goal: "Descriure persones i coses amb el gènere i el nombre correctes.",
    cards: [
      { title: "Els colors concorden", html: "<p>blanc, <b>blanca</b>, blancs, <b>blanques</b> · negre, negra · vermell, vermella · <b>groc, groga, grocs, grogues</b> · verd, verda · <b>blau, blava, blaus, blaves</b> · <b>gris, grisa, grisos, grises</b>.</p>" },
      { title: "Colors que no canvien", html: "<p><b>marró</b> (marrons en plural) · <b>rosa</b> · <b>lila</b> · <b>taronja</b>: una camisa taronja, uns pantalons rosa.</p><p>Amb clar o fosc no concorden: uns ulls <b>blau fosc</b>.</p>" },
      { title: "Descriure", html: "<p>alt / baix · prim / gros · jove / gran · nou / vell · llarg / curt · simpàtic / antipàtic.</p><p>Té els cabells <b>negres</b> i els ulls <b>verds</b>.</p>" }
    ],
    vocab: [
      { ca: "blanc, blanca", es: "blanco, blanca" }, { ca: "negre, negra", es: "negro, negra" }, { ca: "vermell, vermella", es: "rojo, roja" },
      { ca: "groc, groga", es: "amarillo, amarilla" }, { ca: "grocs, grogues", es: "amarillos, amarillas" }, { ca: "blau, blava", es: "azul" },
      { ca: "blaus, blaves", es: "azules" }, { ca: "verd, verda", es: "verde" }, { ca: "gris, grisa, grisos, grises", es: "gris, grises" },
      { ca: "marró, marrons", es: "marrón, marrones" }, { ca: "taronja", es: "naranja (color)" }, { ca: "alt, baix", es: "alto, bajo" },
      { ca: "prim, gros", es: "delgado, gordo" }, { ca: "jove, gran", es: "joven, mayor" }, { ca: "els cabells", es: "el pelo" }, { ca: "els ulls", es: "los ojos" }
    ],
    items: [
      { type: "choice", q: "una casa ___ (blanc)", options: ["blanca", "blanc", "blanques"], answer: "blanca", e: "Femení singular: blanca." },
      { type: "choice", q: "les cadires ___ (groc)", options: ["grogues", "grocs", "groques"], answer: "grogues", e: "Groc → groga → grogues (amb gu)." },
      { type: "choice", q: "uns ulls ___ (blau)", options: ["blaus", "blaves", "blavos"], answer: "blaus", e: "Masculí plural: blaus." },
      { type: "choice", q: "les faldilles ___ (blau)", options: ["blaves", "blaues", "blaus"], answer: "blaves", e: "Blau → blava → blaves." },
      { type: "choice", q: "els cotxes ___ (gris)", options: ["grisos", "grises", "gris"], answer: "grisos", e: "Masculí plural: grisos." },
      { type: "choice", q: "unes sabates ___ (marró)", options: ["marrons", "marrones", "marró"], answer: "marrons", e: "Marró no canvia de gènere; plural marrons." },
      { type: "choice", q: "una camisa ___ (taronja)", options: ["taronja", "taronjada", "naranja"], answer: "taronja", e: "Taronja és invariable." },
      { type: "choice", q: "Com es diu «amarillo»?", options: ["groc", "amarill", "gros"], answer: "groc", e: "Groc (gros vol dir gordo)." },
      { type: "choice", q: "la paret ___ (verd)", options: ["verda", "verd", "verde"], answer: "verda", e: "Femení: verda." },
      { type: "choice", q: "El contrari d'«alt»", options: ["baix", "prim", "curt"], answer: "baix", e: "Alt / baix." },
      { type: "choice", q: "El contrari de «nou»", options: ["vell", "jove", "curt"], answer: "vell", e: "Nou / vell." },
      { type: "gap", q: "La senyera té quatre barres ___ (vermell) sobre fons groc.", answers: ["vermelles"], e: "Barres és femení plural: vermelles." },
      { type: "fix", q: "Corregeix: «Té els ulls blaus foscos.»", answers: ["blau fosc"], e: "Color + clar/fosc no concorda: ulls blau fosc." }
    ],
    dictation: ["La meva germana porta una jaqueta blava i unes sabates grogues.", "Les cases d'Eivissa són blanques.", "El cotxe gris és del veí del tercer.", "Té els cabells negres i els ulls verds.", "Les flors vermelles són per a la mare.", "A l'estiu m'agraden els colors clars."]
  },
  {
    id: "f4", n: 4, title: "Persones, família i feines", goal: "Parlar de la família i de les professions.",
    cards: [
      { title: "La família", html: "<p>pare · mare · <b>pares</b> (padres) · fill/filla · germà/germana · avi/<b>àvia</b> · oncle/tia (tiet/tieta) · cosí/cosina · <b>nebot/neboda</b> · <b>nét/néta</b>.</p><p>Per matrimoni: marit · dona · sogre/sogra · <b>gendre</b> (yerno) · <b>nora</b> (nuera) · cunyat/cunyada.</p>" },
      { title: "Feines", html: "<p>mestre/mestra · metge/<b>metgessa</b> · infermer/infermera · advocat/advocada · cambrer/cambrera · cuiner/cuinera · <b>pagès/pagesa</b> · funcionari/funcionària.</p><p>Treballa <b>de</b> mestra.</p>" }
    ],
    vocab: [
      { ca: "els pares", es: "los padres" }, { ca: "el germà, la germana", es: "el hermano, la hermana" }, { ca: "l'avi, l'àvia", es: "el abuelo, la abuela" },
      { ca: "l'oncle, la tia", es: "el tío, la tía" }, { ca: "el cosí, la cosina", es: "el primo, la prima" }, { ca: "el nebot, la neboda", es: "el sobrino, la sobrina" },
      { ca: "el nét, la néta", es: "el nieto, la nieta" }, { ca: "el sogre, la sogra", es: "el suegro, la suegra" }, { ca: "el gendre", es: "el yerno" },
      { ca: "la nora", es: "la nuera" }, { ca: "el cunyat, la cunyada", es: "el cuñado, la cuñada" }, { ca: "el marit", es: "el marido" },
      { ca: "la metgessa", es: "la médica" }, { ca: "el pagès, la pagesa", es: "el campesino, la campesina" }, { ca: "el cambrer", es: "el camarero" }
    ],
    items: [
      { type: "choice", q: "El fill del meu germà és el meu…", options: ["nebot", "cosí", "nét"], answer: "nebot", e: "Nebot = sobrino." },
      { type: "choice", q: "La mare de la meva mare és la meva…", options: ["àvia", "tia", "sogra"], answer: "àvia", e: "Àvia." },
      { type: "choice", q: "El fill del meu fill és el meu…", options: ["nét", "nebot", "fillol"], answer: "nét", e: "Nét = nieto." },
      { type: "choice", q: "El germà del meu pare és el meu…", options: ["oncle", "cosí", "cunyat"], answer: "oncle", e: "Oncle (o tiet)." },
      { type: "choice", q: "El marit de la meva filla és el meu…", options: ["gendre", "cunyat", "sogre"], answer: "gendre", e: "Gendre = yerno." },
      { type: "choice", q: "La dona del meu fill és la meva…", options: ["nora", "cunyada", "neboda"], answer: "nora", e: "Nora = nuera." },
      { type: "choice", q: "Ortografia", options: ["àvia", "avia", "ávia"], answer: "àvia", e: "Àvia: accent obert." },
      { type: "choice", q: "Ortografia", options: ["germà", "germá", "germa"], answer: "germà", e: "Aguda acabada en vocal: germà." },
      { type: "choice", q: "El femení de «metge»", options: ["metgessa", "metgia", "metga"], answer: "metgessa", e: "Metgessa." },
      { type: "choice", q: "El femení de «pagès»", options: ["pagesa", "pagèssa", "pagesia"], answer: "pagesa", e: "Pagès → pagesa (sense accent)." },
      { type: "choice", q: "Completa: «Ella treballa ___ mestra.»", options: ["de", "en", "per"], answer: "de", e: "Treballar de + professió." },
      { type: "gap", q: "Els meus ___ (pare i mare) viuen a Sant Antoni.", answers: ["pares"], e: "Pares = padres." },
      { type: "gap", q: "La germana de la meva mare és la meva ___.", answers: ["tia", "tieta"], e: "Tia o tieta." }
    ],
    dictation: ["La meva àvia té quatre néts i dues nétes.", "El meu germà gran és metge a l'hospital.", "Els meus pares viuen a Sant Antoni des de fa trenta anys.", "La germana del meu pare és mestra.", "El meu nebot petit té cinc anys.", "La meva mare i jo anem al mercat cada dissabte."]
  },
  {
    id: "f5", n: 5, title: "Verbs bàsics I: ser, estar, tenir, haver-hi", goal: "Conjugar en present els quatre verbs que surten a cada frase.",
    cards: [
      { title: "Ser i estar", html: "<p><b>ser:</b> soc, ets, és, som, sou, són · <b>estar:</b> estic, estàs, està, estem, esteu, estan.</p><p>Ser: qui ets, d'on ets, la teva feina (<b>Soc</b> mestra). Estar: com estàs ara (<b>Estic</b> cansada). Per preguntar on és una cosa: <b>On és</b> la farmàcia?</p><p>Des del 2017, <b>soc</b> s'escriu sense accent.</p>" },
      { title: "Tenir i haver-hi", html: "<p><b>tenir:</b> tinc, tens, <b>té</b>, tenim, teniu, tenen.</p><p><b>haver-hi:</b> sempre <b>hi ha</b> (mai «hi han»): hi ha molta gent, hi ha dos cotxes.</p><p>A les Balears: jo <b>som</b> (soc), jo <b>tenc</b> (tinc).</p>" }
    ],
    vocab: [
      { ca: "jo soc", es: "yo soy" }, { ca: "tu ets", es: "tú eres" }, { ca: "ell és", es: "él es" }, { ca: "nosaltres som", es: "nosotros somos" },
      { ca: "ells són", es: "ellos son" }, { ca: "jo estic", es: "yo estoy" }, { ca: "tu estàs", es: "tú estás" }, { ca: "vosaltres esteu", es: "vosotros estáis" },
      { ca: "jo tinc", es: "yo tengo", note: "balear: tenc" }, { ca: "tu tens", es: "tú tienes" }, { ca: "ella té", es: "ella tiene" }, { ca: "ells tenen", es: "ellos tienen" },
      { ca: "hi ha", es: "hay" }, { ca: "Tinc trenta anys.", es: "Tengo treinta años." }, { ca: "On és el banc?", es: "¿Dónde está el banco?" }
    ],
    items: [
      { type: "choice", q: "Jo ___ de Vila.", options: ["soc", "sóc", "sò"], answer: "soc", e: "Des del 2017: soc, sense accent." },
      { type: "choice", q: "Nosaltres ___ mestres.", options: ["som", "sem", "són"], answer: "som", e: "Nosaltres som." },
      { type: "choice", q: "Ells ___ molt cansats.", options: ["estan", "estàn", "estén"], answer: "estan", e: "Ells estan (sense accent)." },
      { type: "choice", q: "Tu ___ molta paciència.", options: ["tens", "tenes", "tés"], answer: "tens", e: "Tu tens." },
      { type: "choice", q: "Ella ___ dos fills.", options: ["té", "te", "tè"], answer: "té", e: "Té (verb) porta accent; te és pronom." },
      { type: "choice", q: "A la plaça ___ molta gent.", options: ["hi ha", "hi han", "ha"], answer: "hi ha", e: "Sempre hi ha." },
      { type: "choice", q: ok, options: ["Tinc vint anys.", "Soc vint anys.", "Estic vint anys."], answer: "Tinc vint anys.", e: "L'edat amb tenir." },
      { type: "choice", q: "Jo ___ mestra d'escola.", options: ["soc", "estic", "tinc"], answer: "soc", e: "Professió → ser." },
      { type: "gap", q: "Jo ___ (tenir) trenta-vuit anys.", answers: ["tinc", "tenc"], e: "Tinc (balear: tenc)." },
      { type: "gap", q: "Com ___ (estar, tu)?", answers: ["estàs"], e: "Tu estàs." },
      { type: "gap", q: "La meva mare ___ (ser) de Formentera.", answers: ["és"], e: "Ella és." },
      { type: "gap", q: "Vosaltres ___ (tenir) cotxe?", answers: ["teniu"], e: "Vosaltres teniu." },
      { type: "fix", q: "Corregeix: «Hi han molts turistes a l'estiu.»", answers: ["hi ha"], e: "Haver-hi sempre en singular: hi ha." }
    ],
    dictation: ["Soc de Vila, però visc a Santa Eulària.", "Avui estic una mica cansada.", "Tinc trenta-vuit anys i dos fills.", "A la plaça hi ha molta gent.", "Els meus amics són molt simpàtics.", "On és la parada de l'autobús?"]
  },
  {
    id: "f6", n: 6, title: "Verbs bàsics II: anar, fer, poder, voler…", goal: "Els verbs irregulars del dia a dia i el passat amb «vaig + infinitiu».",
    cards: [
      { title: "Present", html: "<p><b>anar:</b> vaig, vas, va, anem, aneu, van · <b>fer:</b> faig, fas, fa, fem, feu, fan · <b>poder:</b> puc, pots, pot, podem, podeu, poden · <b>voler:</b> vull, vols, vol, volem, voleu, volen.</p><p><b>saber:</b> sé, saps, sap, sabem, sabeu, saben · <b>venir:</b> vinc, vens, ve, venim, veniu, venen · <b>dir:</b> dic, dius, diu, diem, dieu, diuen.</p><p>A les Balears: anam, anau; feim, feis.</p>" },
      { title: "Obligació i passat", html: "<p>Obligació: <b>haver de</b>: he de, has de, ha de, hem de, heu de, han de (mai «tinc que»).</p><p>Passat: <b>vaig</b> + infinitiu: ahir <b>vaig anar</b> al metge, <b>vam fer</b> un pastís.</p>" }
    ],
    vocab: [
      { ca: "jo vaig", es: "yo voy" }, { ca: "nosaltres anem", es: "nosotros vamos", note: "balear: anam" }, { ca: "jo faig", es: "yo hago" },
      { ca: "jo puc", es: "yo puedo" }, { ca: "jo vull", es: "yo quiero" }, { ca: "jo sé", es: "yo sé" }, { ca: "jo vinc", es: "yo vengo" },
      { ca: "ells venen", es: "ellos vienen" }, { ca: "jo dic", es: "yo digo" }, { ca: "tu dius", es: "tú dices" }, { ca: "he de treballar", es: "tengo que trabajar" },
      { ca: "vaig anar", es: "fui" }, { ca: "vam fer", es: "hicimos" }, { ca: "No ho sé.", es: "No lo sé." }
    ],
    items: [
      { type: "choice", q: "Demà ___ a la platja (jo).", options: ["vaig", "vac", "anem"], answer: "vaig", e: "Jo vaig." },
      { type: "choice", q: "Nosaltres ___ els deures.", options: ["fem", "femos", "fan"], answer: "fem", e: "Nosaltres fem (balear: feim)." },
      { type: "choice", q: "Jo no ___ venir demà.", options: ["puc", "podo", "pots"], answer: "puc", e: "Jo puc." },
      { type: "choice", q: "Jo ___ un cafè, si us plau.", options: ["vull", "volo", "vol"], answer: "vull", e: "Jo vull." },
      { type: "choice", q: "Jo no ho ___.", options: ["sé", "se", "sap"], answer: "sé", e: "Sé (saber) porta accent; se és pronom." },
      { type: "choice", q: "Ells ___ de Mallorca.", options: ["venen", "vénen", "vinen"], answer: "venen", e: "Des del 2017: venen, sense accent." },
      { type: "choice", q: "Què ___ (tu)?", options: ["dius", "dieus", "dicus"], answer: "dius", e: "Tu dius." },
      { type: "choice", q: "Obligació: «Demà ___ treballar.»", options: ["he de", "tinc que", "deu de"], answer: "he de", e: "Haver de + infinitiu." },
      { type: "gap", q: "Ahir ___ (anar, jo, passat) al metge.", answers: ["vaig anar"], e: "Passat perifràstic: vaig anar." },
      { type: "gap", q: "Ells no ___ (saber) on és.", answers: ["saben"], e: "Ells saben." },
      { type: "gap", q: "Tu ___ (fer) esport?", answers: ["fas"], e: "Tu fas." },
      { type: "fix", q: "Corregeix: «Tinc que estudiar més.»", answers: ["he de"], e: "Mai «tinc que»: he de estudiar." },
      { type: "transform", q: "Passa a passat: «Faig un pastís.»", answers: ["Vaig fer un pastís"], e: "Vaig + infinitiu." }
    ],
    dictation: ["Demà vaig a Palma amb el vaixell.", "No puc venir perquè he de treballar.", "Vull aprendre català per aprovar l'examen.", "Què fas aquest cap de setmana?", "No sé on he deixat les claus.", "Ahir vaig anar al cinema amb la meva germana."]
  },
  {
    id: "f7", n: 7, title: "Articles, possessius i demostratius", goal: "El, la, l', en; el meu, la meva; aquest, aquell, això.",
    cards: [
      { title: "Articles", html: "<p><b>el, la, els, les</b>. Davant de vocal o h: <b>l'</b>amic, <b>l'</b>hora (però <b>la</b> universitat, <b>la</b> història: i/u àtones).</p><p>Amb noms de persona: <b>en</b> Joan, <b>la</b> Maria, <b>l'</b>Anna. A les Balears: en Toni, <b>na</b> Maria.</p>" },
      { title: "Possessius", html: "<p>el meu, <b>la meva</b>, els meus, <b>les meves</b> · el teu, la teva · el seu, la seva · el nostre, la nostra, els nostres · el vostre, la vostra.</p><p>Amb família, a les Balears: <b>mon</b> pare, <b>ma</b> mare.</p>" },
      { title: "Demostratius", html: "<p>A prop: <b>aquest, aquesta, aquests, aquestes</b>. Lluny: <b>aquell, aquella, aquells, aquelles</b>.</p><p>Neutres: <b>això</b>, <b>allò</b> (mai «eso»).</p>" }
    ],
    vocab: [
      { ca: "l'amic, l'amiga", es: "el amigo, la amiga" }, { ca: "l'hora", es: "la hora" }, { ca: "la universitat", es: "la universidad" },
      { ca: "en Joan, la Maria", es: "Juan, María" }, { ca: "el meu, la meva", es: "mi (m./f.)" }, { ca: "els meus, les meves", es: "mis" },
      { ca: "el nostre, la nostra", es: "nuestro, nuestra" }, { ca: "el seu, la seva", es: "su" }, { ca: "aquest, aquesta", es: "este, esta" },
      { ca: "aquell, aquella", es: "aquel, aquella" }, { ca: "això", es: "esto, eso" }, { ca: "allò", es: "aquello" }
    ],
    items: [
      { type: "choice", q: "___ amic de la Maria", options: ["L'", "El", "Lo"], answer: "L'", e: "El davant de vocal: l'amic." },
      { type: "choice", q: "___ hora", options: ["L'", "La", "El"], answer: "L'", e: "Hora: la o és tònica → l'hora." },
      { type: "choice", q: "___ Joan", options: ["en", "el", "lo"], answer: "en", e: "Article personal: en Joan." },
      { type: "choice", q: "___ Anna", options: ["l'", "el", "lo"], answer: "l'", e: "Davant de vocal: l'Anna." },
      { type: "choice", q: "Aquesta és ___ germana.", options: ["la meva", "la mia", "meva"], answer: "la meva", e: "La meva." },
      { type: "choice", q: "Són ___ llibres (de nosaltres).", options: ["els nostres", "les nostres", "els nostros"], answer: "els nostres", e: "Els nostres." },
      { type: "choice", q: "M'agrada ___ casa (la que tinc a prop).", options: ["aquesta", "aquest", "aquests"], answer: "aquesta", e: "Casa, femení, a prop: aquesta." },
      { type: "choice", q: "___ muntanyes del fons", options: ["Aquelles", "Aquells", "Aquellas"], answer: "Aquelles", e: "Femení plural, lluny: aquelles." },
      { type: "choice", q: "No entenc ___.", options: ["això", "aquest", "eso"], answer: "això", e: "Neutre: això." },
      { type: "choice", q: ok, options: ["els seus fills", "les seves fills", "els seu fills"], answer: "els seus fills", e: "Masculí plural: els seus." },
      { type: "gap", q: "___ (article) meus pares són de Sant Josep.", answers: ["Els"], e: "Els meus pares." },
      { type: "gap", q: "On són les ___ (teu) claus?", answers: ["teves"], e: "Femení plural: les teves." },
      { type: "fix", q: "Corregeix: «La meva cotxe és vermell.»", answers: ["el meu"], e: "Cotxe és masculí: el meu cotxe." }
    ],
    dictation: ["Aquesta és la meva germana i aquell és el meu cosí.", "L'Anna i en Joan són els meus veïns.", "Els nostres fills van a la mateixa escola.", "No entenc això que dius.", "Aquelles cases blanques són molt antigues.", "La seva mare és infermera."]
  },
  {
    id: "f8", n: 8, title: "Accents I: la regla", goal: "Saber quina síl·laba sona més fort i quan porta accent.",
    cards: [
      { title: "1. Troba la síl·laba forta", html: "<p>Digues la paraula en veu alta: ca-<b>fè</b> (última) · <b>tau</b>-la (penúltima) · <b>mú</b>-si-ca (antepenúltima).</p>" },
      { title: "2. Aplica la regla", html: "<p><b>Agudes</b> (forta al final): accent si acaben en <b>vocal, -as, -es, -is, -os, -us, -en, -in</b>: caf<b>è</b>, sof<b>à</b>, franc<b>ès</b>, cam<b>í</b>, tamb<b>é</b>. No: salut, papers.</p><p><b>Planes</b> (penúltima): accent si <b>no</b> acaben així: f<b>à</b>cil, tel<b>è</b>fon, l<b>à</b>pis. Sense accent: examen, jove, taula.</p><p><b>Esdrúixoles</b> (antepenúltima): <b>sempre</b>: m<b>ú</b>sica, <b>à</b>via, hist<b>ò</b>ria.</p>" },
      { title: "3. Quin accent?", html: "<p><b>a</b> sempre à · <b>i, u</b> sempre í, ú · <b>e, o</b>: obert (è, ò) o tancat (é, ó): caf<b>è</b>, <b>ò</b>pera, tamb<b>é</b>, can<b>çó</b>.</p><p>Truc: si en castellà no hi ha accent, mira la regla catalana, no la castellana.</p>" }
    ],
    vocab: [
      { ca: "cafè", es: "café", note: "aguda en vocal" }, { ca: "francès", es: "francés", note: "aguda en -es" }, { ca: "camí", es: "camino", note: "aguda en vocal" },
      { ca: "salut", es: "salud", note: "aguda en -t: sense accent" }, { ca: "fàcil", es: "fácil", note: "plana en -l" }, { ca: "telèfon", es: "teléfono", note: "plana en -on" },
      { ca: "examen", es: "examen", note: "plana en -en: sense accent" }, { ca: "jove", es: "joven", note: "plana en vocal: sense accent" },
      { ca: "música", es: "música", note: "esdrúixola" }, { ca: "història", es: "historia", note: "es tracta com a esdrúixola" }, { ca: "cançó", es: "canción", note: "ó tancada" }
    ],
    items: [
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["cafè", "café", "cafe"], answer: "cafè", e: "Aguda acabada en vocal; e oberta: cafè." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["francès", "francés", "frances"], answer: "francès", e: "Aguda en -es; e oberta." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["també", "tambè", "tambe"], answer: "també", e: "Aguda en vocal; e tancada." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["salut", "salút"], answer: "salut", e: "Aguda en -t: sense accent." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["fàcil", "fácil", "facil"], answer: "fàcil", e: "Plana en -l: accent; a sempre greu." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["examen", "exàmen", "exámen"], answer: "examen", e: "Plana en -en: sense accent (però exàmens)." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["jove", "jóve", "jòve"], answer: "jove", e: "Plana en vocal: sense accent." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["música", "musica", "mùsica"], answer: "música", e: "Esdrúixola: sempre; u sempre ú." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["cançó", "cançò", "canço"], answer: "cançó", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["camí", "camì", "cami"], answer: "camí", e: "Aguda en vocal; i sempre í." },
      { type: "choice", q: "Accentuació: quina és correcta?", options: ["papers", "papèrs", "papérs"], answer: "papers", e: "Aguda en -rs: sense accent." },
      { type: "choice", q: "On és la síl·laba forta de «telèfon»?", options: ["te-LÈ-fon", "TE-lè-fon", "te-lè-FON"], answer: "te-LÈ-fon", e: "Plana: penúltima." },
      { type: "choice", q: "Les esdrúixoles…", options: ["sempre porten accent", "mai porten accent", "només si acaben en vocal"], answer: "sempre porten accent", e: "Totes, sense excepció." }
    ],
    dictation: ["Vull un cafè amb llet, si us plau.", "L'examen de música és fàcil.", "La meva àvia parla francès i català.", "Aquesta cançó també m'agrada.", "Truca'm al telèfon de casa.", "El camí és llarg, però val la pena."]
  },
  {
    id: "f9", n: 9, title: "Accents II: per temes", goal: "Fixar l'accent de les paraules de cada àmbit: menjar, escola, ciutat, casa, cos i feina.",
    cards: [
      { title: "Com estudiar-ho", html: "<p>Les paraules s'aprenen millor per temes. Escolta cada llista, digues-la en veu alta marcant la síl·laba forta i fes la pràctica: cada pregunta indica el tema.</p><p>Recorda: obert <b>à è ò</b>, tancat <b>é í ó ú</b>.</p>" },
      { title: "Trampes freqüents", html: "<p>examen però <b>exàmens</b> · <b>estómac</b> (ó tancada) · <b>préssec</b> · <b>síndria</b> · <b>pèsols</b> · <b>cèl·lula</b> · <b>reunió</b> · <b>autobús</b>.</p>" }
    ],
    vocab: [
      { ca: "el plàtan", es: "el plátano", note: "Menjar" }, { ca: "els pèsols", es: "los guisantes", note: "Menjar" }, { ca: "el préssec", es: "el melocotón", note: "Menjar" },
      { ca: "la síndria", es: "la sandía", note: "Menjar" }, { ca: "el meló", es: "el melón", note: "Menjar" }, { ca: "les matemàtiques", es: "las matemáticas", note: "Escola" },
      { ca: "el gimnàs", es: "el gimnasio", note: "Escola" }, { ca: "els exàmens", es: "los exámenes", note: "Escola" }, { ca: "l'autobús", es: "el autobús", note: "Ciutat" },
      { ca: "l'estació", es: "la estación", note: "Ciutat" }, { ca: "el semàfor", es: "el semáforo", note: "Ciutat" }, { ca: "l'avió", es: "el avión", note: "Ciutat" },
      { ca: "el sofà", es: "el sofá", note: "Casa" }, { ca: "el balcó", es: "el balcón", note: "Casa" }, { ca: "la làmpada", es: "la lámpara", note: "Casa" },
      { ca: "l'estómac", es: "el estómago", note: "Cos" }, { ca: "el múscul", es: "el músculo", note: "Cos" }, { ca: "la reunió", es: "la reunión", note: "Feina" },
      { ca: "electrònic", es: "electrónico", note: "Feina" }, { ca: "l'informàtic", es: "el informático", note: "Feina" }
    ],
    items: [
      { type: "choice", q: "Menjar: quina és correcta?", options: ["plàtan", "platan", "plátan"], answer: "plàtan", e: "Plana en -n (no -en/-in): accent." },
      { type: "choice", q: "Menjar: quina és correcta?", options: ["pèsols", "pésols", "pesols"], answer: "pèsols", e: "Plana en -ls: accent obert." },
      { type: "choice", q: "Menjar: quina és correcta?", options: ["préssec", "pressec", "prèssec"], answer: "préssec", e: "Plana en -c: accent tancat." },
      { type: "choice", q: "Menjar: quina és correcta?", options: ["síndria", "sindria", "sindría"], answer: "síndria", e: "Acabada en -ia: com una esdrúixola." },
      { type: "choice", q: "Menjar: quina és correcta?", options: ["meló", "melò", "melo"], answer: "meló", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Escola: quina és correcta?", options: ["matemàtiques", "matematiques", "matemátiques"], answer: "matemàtiques", e: "Esdrúixola." },
      { type: "choice", q: "Escola: quina és correcta?", options: ["gimnàs", "gimnas", "gimnás"], answer: "gimnàs", e: "Aguda en -as: accent." },
      { type: "choice", q: "Escola: quina és correcta?", options: ["exàmens", "examens", "exámens"], answer: "exàmens", e: "En plural és plana en -ns: accent (examen, sense)." },
      { type: "choice", q: "Escola: quina és correcta?", options: ["història", "historia", "histórià"], answer: "història", e: "Acabada en -ia: accent." },
      { type: "choice", q: "Ciutat: quina és correcta?", options: ["autobús", "autobus", "autobùs"], answer: "autobús", e: "Aguda en -us: accent." },
      { type: "choice", q: "Ciutat: quina és correcta?", options: ["estació", "estacio", "estaciò"], answer: "estació", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Ciutat: quina és correcta?", options: ["semàfor", "semafor", "semáfor"], answer: "semàfor", e: "Plana en -r: accent." },
      { type: "choice", q: "Ciutat: quina és correcta?", options: ["avió", "aviò", "avio"], answer: "avió", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Casa: quina és correcta?", options: ["sofà", "sofá", "sofa"], answer: "sofà", e: "Aguda en vocal: sofà." },
      { type: "choice", q: "Casa: quina és correcta?", options: ["balcó", "balcò", "balco"], answer: "balcó", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Casa: quina és correcta?", options: ["làmpada", "lampada", "lámpada"], answer: "làmpada", e: "Esdrúixola." },
      { type: "choice", q: "Cos: quina és correcta?", options: ["estómac", "estòmac", "estomac"], answer: "estómac", e: "Plana en -c; o tancada: estómac." },
      { type: "choice", q: "Cos: quina és correcta?", options: ["múscul", "muscul", "mùscul"], answer: "múscul", e: "Plana en -l: accent." },
      { type: "choice", q: "Cos: quina és correcta?", options: ["cèl·lula", "cél·lula", "cel·lula"], answer: "cèl·lula", e: "Esdrúixola; e oberta." },
      { type: "choice", q: "Feina: quina és correcta?", options: ["reunió", "reuniò", "reunio"], answer: "reunió", e: "Aguda en vocal; o tancada." },
      { type: "choice", q: "Feina: quina és correcta?", options: ["electrònic", "electrónic", "electronic"], answer: "electrònic", e: "Esdrúixola; o oberta." },
      { type: "choice", q: "Feina: quina és correcta?", options: ["informàtic", "informatic", "informátic"], answer: "informàtic", e: "Esdrúixola." }
    ],
    dictation: ["A l'estiu menjo síndria, meló i préssecs.", "Els exàmens de matemàtiques són dimarts.", "L'autobús surt de l'estació a les nou.", "Hem comprat un sofà i una làmpada per al balcó.", "Em fa mal l'estómac després de dinar.", "La reunió és a la sala d'informàtica."]
  },
  {
    id: "f10", n: 10, title: "Lletres i sons", goal: "S, ss, c, ç, z; g, j, tg, tj; ny, ll, l·l, x, ix, tx.",
    cards: [
      { title: "El so de la s", html: "<p>So fort (com en castellà): <b>s</b> a principi, <b>ss</b> entre vocals, <b>c</b> davant e/i, <b>ç</b> davant a/o/u o al final: <b>s</b>ol, pa<b>ss</b>ar, <b>c</b>inc, pla<b>ç</b>a, bra<b>ç</b>.</p><p>So suau (zumbat): <b>s</b> entre vocals, <b>z</b>: ca<b>s</b>a, <b>z</b>ero, onze.</p><p>Compte: ro<b>s</b>a (flor) / ro<b>ss</b>a (pèl).</p>" },
      { title: "G, j, tg, tj", html: "<p><b>j</b> davant a/o/u: <b>j</b>ove · <b>g</b> davant e/i: <b>g</b>ent · entre vocals, <b>tg</b> i <b>tj</b>: me<b>tg</b>e, pla<b>tj</b>a, vi<b>tg</b>e, mi<b>tj</b>a.</p>" },
      { title: "Ny, ll, l·l, x", html: "<p><b>ny</b> = ñ: a<b>ny</b>, Espa<b>ny</b>a · <b>ll</b>: <b>ll</b>ibre · <b>l·l</b> (dues l separades): co<b>l·l</b>egi, i<b>l·l</b>usió.</p><p><b>x</b>: <b>x</b>arxa, cai<b>x</b>a · <b>ix</b>: pe<b>ix</b> · <b>tx</b>: co<b>tx</b>e, despa<b>tx</b>.</p>" }
    ],
    vocab: [
      { ca: "la plaça", es: "la plaza" }, { ca: "passar", es: "pasar" }, { ca: "la casa", es: "la casa" }, { ca: "rosa / rossa", es: "rosa / rubia" },
      { ca: "zero", es: "cero" }, { ca: "el metge", es: "el médico" }, { ca: "la platja", es: "la playa" }, { ca: "el viatge", es: "el viaje" },
      { ca: "l'any", es: "el año" }, { ca: "el llibre", es: "el libro" }, { ca: "el col·legi", es: "el colegio" }, { ca: "la xarxa", es: "la red" },
      { ca: "el peix", es: "el pescado, el pez" }, { ca: "el cotxe", es: "el coche" }
    ],
    items: [
      { type: "choice", q: ok, options: ["plaça", "plasa", "plaza"], answer: "plaça", e: "Ç davant de a." },
      { type: "choice", q: ok, options: ["passar", "pasar", "paçar"], answer: "passar", e: "So fort entre vocals: ss." },
      { type: "choice", q: ok, options: ["metge", "mege", "medje"], answer: "metge", e: "Entre vocals davant de e: tg." },
      { type: "choice", q: ok, options: ["platja", "plaja", "platga"], answer: "platja", e: "Entre vocals davant de a: tj." },
      { type: "choice", q: ok, options: ["viatge", "viaje", "viatje"], answer: "viatge", e: "Davant de e: tg." },
      { type: "choice", q: ok, options: ["any", "añ", "anny"], answer: "any", e: "Ny = ñ." },
      { type: "choice", q: ok, options: ["col·legi", "colegi", "col.legi"], answer: "col·legi", e: "L·l amb punt volat." },
      { type: "choice", q: ok, options: ["xarxa", "charxa", "xarcha"], answer: "xarxa", e: "X a principi i rx." },
      { type: "choice", q: ok, options: ["peix", "pex", "peixe"], answer: "peix", e: "Ix al final." },
      { type: "choice", q: ok, options: ["cotxe", "coche", "cotche"], answer: "cotxe", e: "Tx." },
      { type: "choice", q: ok, options: ["zero", "sero", "cero"], answer: "zero", e: "So suau a principi: z." },
      { type: "choice", q: "Una persona de cabells clars és…", options: ["rossa", "rosa", "roça"], answer: "rossa", e: "Rossa (ss); rosa és la flor." },
      { type: "choice", q: ok, options: ["cinc", "sinc", "zinc"], answer: "cinc", e: "C davant de i." }
    ],
    dictation: ["Ens trobem a la plaça a les cinc.", "El metge diu que he de caminar per la platja.", "Aquest any farem un viatge a Menorca.", "El meu fill va al col·legi amb cotxe.", "Al mercat venen peix fresc cada dia.", "La meva cosina té els cabells rossos."]
  }
];
