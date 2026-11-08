/** Exemples i exercicis addicionals de les unitats 1-3 (s'afegeixen al banc de cada unitat). */
import type { PracticeItem } from "./units";

export interface Example { ca: string; note: string }

export const EXTRA: Record<string, { examples: Example[]; extra: PracticeItem[] }> = {
  u1: {
    examples: [
      { ca: "La vaig conèixer a la feina.", note: "La: complement directe femení davant consonant." },
      { ca: "L'he vista al mercat aquest matí.", note: "L' davant vocal; el participi concorda amb el pronom femení." },
      { ca: "Li he escrit un correu.", note: "Li: complement indirecte (a ell o a ella)." },
      { ca: "Els he explicat el problema.", note: "Els: complement indirecte plural, masculí o femení." },
      { ca: "No ho sé.", note: "Ho substitueix una idea o una frase sencera." },
      { ca: "Te l'envio demà.", note: "Combinació te + el: primer l'indirecte." },
      { ca: "Digues-li que l'esperem.", note: "Imperatiu + li amb guionet; l' és el complement directe d'esperar." },
      { ca: "La vull veure. / Vull veure-la.", note: "Amb perífrasis, el pronom pot anar davant o darrere." },
      { ca: "M'agrada molt llegir.", note: "Agradar porta complement indirecte: em, et, li…" },
      { ca: "T'agrada el cinema?", note: "Davant vocal, et s'apostrofa: t'." },
      { ca: "Quan era petita, anava sovint a la platja.", note: "Imperfet per a costums del passat." },
      { ca: "L'any 2010 em vaig traslladar a Eivissa.", note: "Passat perifràstic per a un fet puntual." }
    ],
    extra: [
      { type: "choice", q: "Coneixes la Marta? Sí, ___ conec des de fa anys.", options: ["la", "li", "l'"], answer: "la", e: "Conèixer algú: complement directe femení → la." },
      { type: "choice", q: "Has vist els teus cosins? Sí, ___ he vist.", options: ["els", "los", "les"], answer: "els", e: "Complement directe masculí plural: els." },
      { type: "choice", q: "Has parlat amb el director? Sí, ___ he dit que vindràs.", options: ["li", "el", "l'"], answer: "li", e: "Dir alguna cosa a algú: complement indirecte → li." },
      { type: "choice", q: "Saps on és la clau? No, no ___ sé.", options: ["ho", "la", "el"], answer: "ho", e: "Saber on és la clau = saber això → ho." },
      { type: "choice", q: "Vols el diari? Sí, dona-___.", options: ["me'l", "me el", "m'el"], answer: "me'l", e: "Em + el darrere de l'imperatiu: dona-me'l." },
      { type: "choice", q: "A tu, ___ agrada el cinema?", options: ["t'", "et", "te"], answer: "t'", e: "Davant vocal (agrada), et → t'." },
      { type: "choice", q: "Ahir ___ una carta a la meva àvia.", options: ["vaig escriure", "escrivia", "escriuré"], answer: "vaig escriure", e: "Fet puntual i acabat: passat perifràstic." },
      { type: "choice", q: "Quan tenia vint anys, ___ a Barcelona per estudiar.", options: ["me'n vaig anar", "me'n anava", "em vaig"], answer: "me'n vaig anar", e: "Anar-se'n en passat perifràstic: me'n vaig anar." },
      { type: "gap", q: "«Escolta la professora» → Escolta-___.", answers: ["la"], e: "Complement directe femení darrere de l'imperatiu." },
      { type: "gap", q: "«Porta els llibres» → Porta-___.", answers: ["els"], e: "Complement directe masculí plural." },
      { type: "transform", q: "Substitueix el complement: «Vaig trobar les claus al cotxe.»", answers: ["Les vaig trobar al cotxe", "Vaig trobar-les al cotxe"], e: "Les claus → les." },
      { type: "transform", q: "Substitueix el complement indirecte: «Diré la veritat a la jutgessa.»", answers: ["Li diré la veritat"], e: "A la jutgessa → li." },
      { type: "transform", q: "Substitueix el complement: «Hem convidat els veïns.»", answers: ["Els hem convidat"], e: "Els veïns → els." },
      { type: "fix", q: "Corregeix: «Les he dit que arribaré tard.» (a elles)", answers: ["els"], e: "El complement indirecte plural és els, també en femení." },
      { type: "fix", q: "Corregeix: «A la meva mare la encanta cuinar.»", answers: ["li"], e: "Encantar porta complement indirecte: li encanta." },
      { type: "fix", q: "Corregeix: «Desde que vaig arribar, parlo català.»", answers: ["des que"], e: "Davant de verb conjugat: des que." }
    ]
  },
  u2: {
    examples: [
      { ca: "Vas sovint a Formentera? Sí, hi vaig cada estiu.", note: "Hi substitueix un lloc." },
      { ca: "Del preu, ja en parlarem.", note: "En substitueix un complement introduït per de." },
      { ca: "Tens fills? Sí, en tinc dos.", note: "En + numeral." },
      { ca: "No n'hi ha prou amb disculpes.", note: "Expressió fixa: no és suficient." },
      { ca: "Hi penso cada dia.", note: "Pensar en → hi." },
      { ca: "Me'n vaig a casa.", note: "Anar-se'n: en forma part del verb." },
      { ca: "No hi confio gens.", note: "Confiar en → hi." },
      { ca: "En vinc ara mateix, de l'oficina.", note: "Venir d'un lloc → en." },
      { ca: "Hi ha molts pisos buits.", note: "Haver-hi existencial sempre en singular." },
      { ca: "Ves-hi demà, que avui és tancat.", note: "Imperatiu + hi amb guionet." },
      { ca: "Parla'n amb el propietari.", note: "Parlar de → en; darrere de vocal, 'n." },
      { ca: "No en sabia res.", note: "Saber res d'alguna cosa → en." }
    ],
    extra: [
      { type: "choice", q: "Has estat mai a Menorca? Sí, ___ he estat dues vegades.", options: ["hi", "en", "la"], answer: "hi", e: "Lloc → hi." },
      { type: "choice", q: "Quants anys fa que vius aquí? ___ fa deu.", options: ["En", "Hi", "Els"], answer: "En", e: "Quantitat (anys) → en." },
      { type: "choice", q: "Te'n recordes de la teva primera casa? Sí, ___ recordo molt bé.", options: ["me'n", "m'hi", "em"], answer: "me'n", e: "Recordar-se de → me'n recordo." },
      { type: "choice", q: "Pujaràs a la terrassa? Sí, ___ pujaré després.", options: ["hi", "en", "la"], answer: "hi", e: "Lloc → hi." },
      { type: "choice", q: "Has comprat pa? Sí, ___ he comprat una barra.", options: ["n'", "l'", "hi"], answer: "n'", e: "Nom sense article + quantitat → en." },
      { type: "gap", q: "Has pensat en el que et vaig dir? Sí, ___ he pensat.", answers: ["hi"], e: "Pensar en → hi." },
      { type: "gap", q: "Quantes cadires vols? ___ vull sis.", answers: ["en"], e: "En + numeral." },
      { type: "gap", q: "«Ves a la farmàcia» → Ves-___ ara.", answers: ["hi"], e: "Imperatiu + hi." },
      { type: "transform", q: "Substitueix el lloc: «Anirem al concert dissabte.»", answers: ["Hi anirem dissabte"], e: "Al concert → hi." },
      { type: "transform", q: "Substitueix el complement: «Vull tres entrades.»", answers: ["En vull tres"], e: "Numeral: en vull tres." },
      { type: "transform", q: "Substitueix el complement: «No sé res del contracte.»", answers: ["No en sé res"], e: "Del contracte → en." },
      { type: "transform", q: "Substitueix el lloc: «Viu a Sant Antoni des de fa anys.»", answers: ["Hi viu des de fa anys"], e: "A Sant Antoni → hi." },
      { type: "fix", q: "Corregeix: «Hi han problemes amb la caldera.»", answers: ["hi ha"], e: "Existencial en singular." },
      { type: "fix", q: "Corregeix: «Estic segura de que ho arreglaran.»", answers: ["que"], e: "La preposició cau davant de que." },
      { type: "fix", q: "Corregeix: «Han hagut moltes queixes aquest mes.»", answers: ["hi ha hagut"], e: "Existencial: hi ha hagut." },
      { type: "choice", q: "Quin tractament fas servir amb un administrador de finques que no coneixes?", options: ["vostè", "tu", "vosaltres"], answer: "vostè", e: "En una carta formal: vostè (o vós), sempre el mateix." },
      { type: "choice", q: "Com comences una queixa formal?", options: ["Em dirigeixo a vostè per…", "Ei, què tal?", "Escolta, que…"], answer: "Em dirigeixo a vostè per…", e: "Obertura formal." }
    ]
  },
  u3: {
    examples: [
      { ca: "El llibre que llegeixo és molt interessant.", note: "Que sense preposició i sense accent." },
      { ca: "L'empresa on treballo té cent empleats.", note: "On per a llocs." },
      { ca: "La persona amb qui vaig parlar era molt amable.", note: "Preposició + qui per a persones." },
      { ca: "El tema de què parlàvem és important.", note: "Preposició + què (amb accent) per a coses." },
      { ca: "Les raons per les quals m'interessa són clares.", note: "Relatiu compost, registre formal." },
      { ca: "La ciutat en què vaig néixer és petita.", note: "En què, equivalent a on." },
      { ca: "No sé què vols dir.", note: "Què interrogatiu en una pregunta indirecta." },
      { ca: "Això és el que necessito.", note: "El que (mai «lo que»)." },
      { ca: "La meva companya, que és de Menorca, parla tres llengües.", note: "Relativa explicativa entre comes." },
      { ca: "La sala a la qual es dirigeix és al primer pis.", note: "A + la qual." },
      { ca: "Tinc un amic el pare del qual és metge.", note: "Possessiu relatiu: el … del qual." },
      { ca: "És una feina amb la qual em sento realitzada.", note: "Amb + la qual." }
    ],
    extra: [
      { type: "choice", q: "La noia ___ t'he presentat és la meva cosina.", options: ["que", "qui", "la qual"], answer: "que", e: "Complement directe sense preposició → que." },
      { type: "choice", q: "És el company amb ___ sempre parlo.", options: ["qui", "que", "qual"], answer: "qui", e: "Preposició + persona → qui." },
      { type: "choice", q: "El projecte en ___ treballo és molt ambiciós.", options: ["què", "que", "qui"], answer: "què", e: "Preposició + cosa → què." },
      { type: "choice", q: "No entenc ___ ha passat.", options: ["què", "que", "qual"], answer: "què", e: "Interrogativa indirecta → què." },
      { type: "choice", q: "Aquest és el despatx ___ treballa la directora.", options: ["on", "que", "qui"], answer: "on", e: "Lloc → on." },
      { type: "choice", q: "Les persones ___ hi van anar estaven contentes.", options: ["que", "qui", "les quals"], answer: "que", e: "Subjecte en una relativa especificativa → que." },
      { type: "gap", q: "El curs ___ m'he apuntat comença dilluns. (apuntar-se a)", answers: ["a què", "al qual"], e: "Apuntar-se a → a què / al qual." },
      { type: "gap", q: "La persona de ___ et parlo és la meva cap.", answers: ["qui", "la qual"], e: "Persona amb preposició → qui o la qual." },
      { type: "gap", q: "Els motius pels ___ ho deixo són personals.", answers: ["quals"], e: "Pels quals." },
      { type: "transform", q: "Uneix: «Treballo en una empresa. L'empresa fabrica mobles.»", answers: ["Treballo en una empresa que fabrica mobles"], e: "Subjecte → que." },
      { type: "transform", q: "Uneix: «Aquesta és la companya. Et vaig parlar de la companya.»", answers: ["Aquesta és la companya de qui et vaig parlar", "Aquesta és la companya de la qual et vaig parlar"], e: "Parlar de + persona → de qui / de la qual." },
      { type: "fix", q: "Corregeix: «És una persona que la seva feina és molt important.»", answers: ["la feina de la qual"], e: "Possessiu relatiu: la feina de la qual." },
      { type: "fix", q: "Corregeix: «La raó per la que t'escric és…»", answers: ["per la qual", "per què"], e: "Mai «la que» darrere de preposició." },
      { type: "fix", q: "Corregeix: «El dia en que vaig començar, plovia.»", answers: ["en què"], e: "Relatiu amb preposició: en què, amb accent." },
      { type: "choice", q: "Quina expressió és correcta?", options: ["dur a terme una tasca", "portar a cap una tasca", "llevar a terme una tasca"], answer: "dur a terme una tasca", e: "Dur a terme." }
    ]
  }
};
