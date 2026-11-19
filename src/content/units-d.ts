/** Unitats 10-12 (fase 3): burocràcia (tractament i fórmules), economia i consum (com / com a, derivació), disseny i publicitat (locucions amb fer, tenir, anar). */
import type { FullUnit } from "./units-b";

export const U10: FullUnit = {
  lessons: ["p12"],
  pretest: [
    { type: "choice", q: "Vostè ___ passar quan vulgui.", options: ["pot", "pots", "podeu"], answer: "pot", e: "Amb vostè el verb va en tercera persona del singular." },
    { type: "choice", q: "Hem rebut ___ sol·licitud, senyora Puig.", options: ["la seva", "la teva", "la vostra"], answer: "la seva", e: "Vostè → el seu, la seva. La teva és per a «tu»; la vostra, per a «vosaltres»." },
    { type: "choice", q: "Comiat formal d'una carta:", options: ["Atentament,", "Un petó,", "Fins aviat!"], answer: "Atentament,", e: "Atentament, cordialment o salutacions cordials tanquen un escrit formal." },
    { type: "choice", q: "Amb tractament formal en plural, diem:", options: ["vostès", "vosaltres", "tu"], answer: "vostès", e: "Vostès + verb en tercera persona del plural: vostès poden." },
    { type: "choice", q: "La part d'una convocatòria que enumera els temes és:", options: ["l'ordre del dia", "l'acta", "la signatura"], answer: "l'ordre del dia", e: "L'ordre del dia llista els punts que es tractaran." }
  ],
  model: {
    title: "Convocatòria i acta d'una junta de veïns",
    genre: "Convocatòria i acta (Àrea 3, exercici 1 · text oficial breu)",
    text: `CONVOCATÒRIA
Comunitat de propietaris del carrer de la Mar, 14 (Eivissa)

Estimats veïns i veïnes:

Us convoquem a la junta ordinària que tindrà lloc el dijous 12 de març de 2027, a les 20.00 h en primera convocatòria i a les 20.30 h en segona, a la sala de la planta baixa.

Ordre del dia:
1. Lectura i aprovació, si escau, de l'acta anterior.
2. Estat de comptes i pressupost de l'any vinent.
3. Obres de reparació de la façana.
4. Precs i preguntes.

Us recordem que, si no hi podeu assistir, podeu delegar el vot per escrit en una altra persona. Us agrairíem que confirmessiu l'assistència abans del dia 9.

Eivissa, 2 de març de 2027
La presidenta, Marta Ribas

ACTA DE LA JUNTA ORDINÀRIA
Assistents: catorze propietaris, presents o representats. Presideix Marta Ribas i actua com a secretari Joan Torres.
S'inicia la sessió a les 20.35 h.
1. S'aprova per unanimitat l'acta anterior.
2. La tresorera presenta els comptes. S'aproven amb dotze vots a favor i dos en contra.
3. S'acorda contractar l'empresa que ha presentat el pressupost més baix per reparar la façana.
4. No hi ha precs ni preguntes.
Sense més assumptes a tractar, s'aixeca la sessió a les 21.40 h.`,
    notes: [
      { quote: "Us convoquem a la junta ordinària", note: "Convocatòria: verb en primera persona del plural i la reunió amb nom propi (junta ordinària)." },
      { quote: "tindrà lloc", note: "Fórmula fixa per anunciar quan i on se celebra: tenir lloc." },
      { quote: "en primera convocatòria i a les 20.30 h en segona", note: "Es donen sempre les dues hores." },
      { quote: "Ordre del dia", note: "Llista numerada dels punts a tractar." },
      { quote: "si escau", note: "Fórmula administrativa: si és pertinent." },
      { quote: "Precs i preguntes", note: "Últim punt, obert a les intervencions dels assistents." },
      { quote: "Us agrairíem que confirmessiu", note: "Condicional de cortesia + que + imperfet de subjuntiu." },
      { quote: "Presideix Marta Ribas", note: "Acta: verbs en present d'indicatiu i en tercera persona." },
      { quote: "S'aprova per unanimitat", note: "Passiva reflexa: s'aprova (un acord), s'aproven (diversos)." },
      { quote: "Sense més assumptes a tractar, s'aixeca la sessió", note: "Fórmula de tancament de l'acta." }
    ]
  },
  examples: [
    { ca: "Vostè pot recollir el certificat a l'oficina.", note: "Tractament formal: tercera persona del singular." },
    { ca: "Si vostè ho desitja, li enviarem la documentació.", note: "Li = a vostè. No barregis amb «te»: tractament coherent." },
    { ca: "Vostès han de presentar el DNI original.", note: "Vostès + tercera persona del plural." },
    { ca: "Em dirigeixo a vostè per sol·licitar-li una cita.", note: "Fórmula d'inici d'una carta formal." },
    { ca: "Li agrairia que em confirmés l'assistència.", note: "Condicional de cortesia + imperfet de subjuntiu." },
    { ca: "Hem rebut la seva sol·licitud i l'estem tramitant.", note: "La seva: possessiu de vostè." },
    { ca: "Per la present, els comunico que s'ha aprovat l'ajuda.", note: "Per la present: fórmula administrativa." },
    { ca: "Sol·licito que se'm concedeixi una pròrroga.", note: "Sol·licitar que + present de subjuntiu." },
    { ca: "Quedo a la seva disposició per a qualsevol aclariment.", note: "Fórmula de comiat habitual." },
    { ca: "Vós sabeu que aquest tràmit no és senzill.", note: "Vós: tractament molt solemne; verb en segona persona del plural (poc habitual avui)." },
    { ca: "Es prega que guardin silenci durant l'acte.", note: "Avís impersonal + subjuntiu (que guardin)." },
    { ca: "S'acorda ajornar la reunió fins a la setmana vinent.", note: "Acta: s'acorda + infinitiu." },
    { ca: "El president dóna la paraula al secretari.", note: "Acta: present d'indicatiu i tercera persona." }
  ],
  practice: [
    { type: "choice", q: "Vostè ___ omplir el formulari abans de dilluns.", options: ["ha d'", "has d'", "heu d'"], answer: "ha d'", e: "Vostè porta el verb en tercera persona: vostè ha d'omplir." },
    { type: "choice", q: "Li agrairia que ___ la sol·licitud abans del 15.", options: ["tramités", "tramitaria", "tramita"], answer: "tramités", e: "Condicional de cortesia + que + imperfet de subjuntiu." },
    { type: "choice", q: "Quina frase té el registre adequat per a una carta a l'Administració?", options: ["Em dirigeixo a vostè per sol·licitar-li informació.", "Et dic això per demanar-te informació.", "Hola, volia saber una cosa."], answer: "Em dirigeixo a vostè per sol·licitar-li informació.", e: "Tractament de vostè i fórmula d'inici formal." },
    { type: "choice", q: "Tractament molt solemne, amb el verb en segona persona del plural:", options: ["vós", "vostè", "tu"], answer: "vós", e: "Vós sabeu: tractament de respecte molt formal, poc habitual avui." },
    { type: "choice", q: "Quina frase és coherent amb el tractament de vostè?", options: ["Si vostè ho desitja, li enviarem la documentació.", "Si vostè ho desitja, te l'enviarem la documentació.", "Si vostè vol, t'enviarem la documentació."], answer: "Si vostè ho desitja, li enviarem la documentació.", e: "No es barregen «vostè» i «tu»: li, la seva…" },
    { type: "choice", q: "Hem rebut ___ sol·licitud, senyor Pons.", options: ["la seva", "la teva", "la vostra"], answer: "la seva", e: "Vostè → la seva." },
    { type: "choice", q: "«Sense més assumptes a tractar, ___ la sessió a les 21.30 h.»", options: ["s'aixeca", "aixeca", "s'aixequen"], answer: "s'aixeca", e: "Passiva reflexa: s'aixeca la sessió." },
    { type: "choice", q: "Acta: «La junta ___ per unanimitat aprovar el pressupost.»", options: ["acorda", "acordem", "acordaràs"], answer: "acorda", e: "Acta: tercera persona i present." },
    { type: "choice", q: "«Us convoquem a la reunió que ___ lloc el dijous.»", options: ["tindrà", "té", "tindria"], answer: "tindrà", e: "Tenir lloc en futur per anunciar la reunió." },
    { type: "choice", q: "«Es prega que ___ silenci.»", options: ["guardin", "guarden", "guardaran"], answer: "guardin", e: "Es prega que + subjuntiu." },
    { type: "choice", q: "«Per la present, ___ comunico que s'ha aprovat l'ajuda.»", options: ["li", "le", "lo"], answer: "li", e: "Li = a vostè. «Le» i «lo» són castellanismes." },
    { type: "choice", q: "Fórmula d'inici: «Em ___ a vostè per sol·licitar…»", options: ["dirigeixo", "dirigixo", "dirigeix"], answer: "dirigeixo", e: "Dirigir: jo dirigeixo." },
    { type: "choice", q: "Salutació si no coneixes la persona:", options: ["Benvolgut senyor / Benvolguda senyora,", "Hola,", "Estimat amic,"], answer: "Benvolgut senyor / Benvolguda senyora,", e: "Salutació formal i neutra." },
    { type: "choice", q: "L'últim punt habitual d'un ordre del dia és:", options: ["Precs i preguntes", "Lectura de l'acta", "Signatura"], answer: "Precs i preguntes", e: "Hi tenen cabuda les intervencions lliures." },
    { type: "choice", q: "«Lectura i aprovació, ___ escau, de l'acta anterior.»", options: ["si", "sí", "sinó"], answer: "si", e: "Si escau = si és pertinent: sense accent." },
    { type: "choice", q: "Amb «vosaltres» el verb és «podeu». Amb «vostès» és:", options: ["poden", "podeu", "pots"], answer: "poden", e: "Vostès → tercera persona del plural." },
    { type: "choice", q: "La convocatòria dóna dues hores perquè:", options: ["hi ha primera i segona convocatòria", "es fa dues vegades", "és opcional"], answer: "hi ha primera i segona convocatòria", e: "En segona convocatòria la reunió es fa amb els assistents que hi hagi." },
    { type: "choice", q: "Acta: quina frase és correcta?", options: ["S'aproven els comptes per majoria.", "S'aprova els comptes per majoria.", "Se aproven els comptes per majoria."], answer: "S'aproven els comptes per majoria.", e: "Passiva reflexa: els comptes (plural) → s'aproven." },
    { type: "choice", q: "Quin verb porta «delegar»?", options: ["delegar el vot en una altra persona", "delegar el vot a una altra persona", "delegar el vot de una altra persona"], answer: "delegar el vot en una altra persona", e: "Delegar alguna cosa en algú." },
    { type: "choice", q: "«Us agrairíem que ___ l'assistència.»", options: ["confirmessiu", "confirmeu", "confirmareu"], answer: "confirmessiu", e: "Condicional + que + imperfet de subjuntiu." },
    { type: "choice", q: "Tractament coherent: «Vostè ___ presentar la factura.»", options: ["ha de", "has de", "heu de"], answer: "ha de", e: "Haver de en tercera persona." },
    { type: "gap", q: "Vostè ___ (poder) recollir el certificat demà.", answers: ["pot"], e: "Vostè pot." },
    { type: "gap", q: "Li agrairia que em ___ (confirmar, imperfet de subjuntiu) l'assistència.", answers: ["confirmés"], e: "Que + imperfet de subjuntiu: confirmés." },
    { type: "gap", q: "Es ___ (convocar, present) la junta de veïns.", answers: ["convoca"], e: "Passiva reflexa singular: es convoca la junta." },
    { type: "gap", q: "Vós ___ (saber) que no és fàcil.", answers: ["sabeu"], e: "Vós + segona persona del plural." },
    { type: "gap", q: "Vostès ___ (haver de) presentar el DNI.", answers: ["han de"], e: "Vostès + tercera persona del plural." },
    { type: "gap", q: "Em dirigeixo a vostè ___ comunicar-li un canvi.", answers: ["per"], e: "Finalitat + infinitiu: per." },
    { type: "gap", q: "Sol·licito que se m'___ (concedir, present de subjuntiu) una pròrroga.", answers: ["concedeixi"], e: "Sol·licitar que + subjuntiu." },
    { type: "gap", q: "S'___ (aprovar) per unanimitat l'acta anterior.", answers: ["aprova"], e: "L'acta (singular): s'aprova." },
    { type: "gap", q: "Quedo a la seva ___.", answers: ["disposició"], e: "Quedo a la seva disposició." },
    { type: "gap", q: "Els ___ (agrair, present) per endavant la seva atenció.", answers: ["agraeixo"], e: "Agrair: jo agraeixo." },
    { type: "fix", q: "Corregeix: «Vostè pots passar a les deu.»", answers: ["pot"], e: "Vostè va amb tercera persona: pot." },
    { type: "fix", q: "Corregeix: «Li enviem la teva documentació, senyor Pons.»", answers: ["la seva"], e: "Vostè → la seva." },
    { type: "fix", q: "Corregeix: «Cordials saludos,»", answers: ["Salutacions cordials", "Cordialment"], e: "«Saludos» és castellà: salutacions cordials o cordialment." },
    { type: "fix", q: "Corregeix: «L'ordre del dia és el següents.»", answers: ["següent"], e: "L'adjectiu següent no varia en plural ni en singular: el següent." },
    { type: "fix", q: "Corregeix: «Sense mes assumptes a tractar, s'aixeca la sessió.»", answers: ["més"], e: "Més (quantitat) porta accent." },
    { type: "fix", q: "Corregeix: «Es convoquen la reunió.»", answers: ["convoca"], e: "El subjecte és la reunió (singular): es convoca." },
    { type: "fix", q: "Corregeix: «Els sol·licito que em doni una cita.» (a vostès)", answers: ["donin"], e: "Si es dirigeix a vostès, el verb va en plural: que em donin." },
    { type: "transform", q: "Passa a vostè: «Pots passar demà si vols.»", answers: ["Pot passar demà si vol"], e: "Vostè → pot, vol." },
    { type: "transform", q: "Passa a vostès: «Heu d'omplir aquest formulari.»", answers: ["Han d'omplir aquest formulari"], e: "Vostès → han d'omplir." },
    { type: "transform", q: "Fes-ho més cortès: «Vull que em doni una cita.»", answers: ["Voldria que em donés una cita", "M'agradaria que em donés una cita", "Li agrairia que em donés una cita"], e: "Condicional de cortesia + imperfet de subjuntiu." },
    { type: "transform", q: "Escriu-ho com un acord d'acta: «Decidim ajornar la reunió.»", answers: ["S'acorda ajornar la reunió", "Es va acordar ajornar la reunió"], e: "Acta: s'acorda + infinitiu, en tercera persona." },
    { type: "transform", q: "Fes-ho impersonal, com un avís: «Heu de portar el DNI.»", answers: ["Cal portar el DNI", "Cal que porteu el DNI"], e: "Cal + infinitiu o cal que + subjuntiu." },
    { type: "transform", q: "Passa a vostè: «Et trucarem demà.» (a un home)", answers: ["El trucarem demà"], e: "Vostè (home) → el." }
  ],
  skeleton: {
    brief: "Escriu la convocatòria d'una reunió de veïns per tractar el soroll d'un local d'oci del barri (170 paraules).",
    template: `CONVOCATÒRIA
Associació de veïns de ___

Estimats veïns i veïnes:

Us convoquem a la reunió extraordinària que tindrà lloc el ___ (dia i hora), a ___ (lloc).

Ordre del dia:
1. ___
2. ___
3. Precs i preguntes.

Us recordem que ___. Us agrairíem que ___ (imperfet de subjuntiu) l'assistència abans de ___.

___ (lloc i data)
___ (càrrec i signatura)`,
    tips: ["Dona hora, dia i lloc concrets.", "Numera els punts de l'ordre del dia i acaba amb precs i preguntes.", "Fes servir una fórmula de cortesia amb condicional + imperfet de subjuntiu."]
  },
  oral: {
    reading: "Una de les queixes més freqüents dels ciutadans és la complexitat dels tràmits administratius. Per això, diversos ajuntaments han simplificat els formularis i han habilitat finestretes úniques perquè les persones no hagin de fer cua en diferents oficines. Tanmateix, encara queda feina per fer: cal que el llenguatge sigui clar i que l'Administració expliqui, en termes comprensibles, què s'espera de cada persona.",
    topic: "Una reunió de veïns: un veí proposa tancar el pati interior a la nit. Exposa'n els avantatges i els inconvenients i intenta arribar a un acord.",
    phrases: ["Voldria proposar que…", "Hi estic d'acord, però…", "Podríem arribar a un acord si…", "Em sembla raonable que…", "Si no ho veig malament…"],
    bot: "Fes de president/a d'una reunió de veïns. L'alumne ha de defensar una proposta i tu fas objeccions educades i preguntes (què passaria si…?). Fes servir el tractament de vostè quan et dirigeixis a veïns que no coneix i obliga'l a usar fórmules de cortesia i el subjuntiu."
  },
  exam: {
    brief: "Ets el secretari/ària de la comunitat de veïns del teu edifici. Escriu la convocatòria de la junta ordinària, amb ordre del dia de quatre punts, i afegeix una frase en què demanis confirmar l'assistència.",
    words: 170,
    minutes: 40,
    focus: ["tractament i fórmules formals", "estructura de la convocatòria", "condicional de cortesia + subjuntiu"],
    checklist: ["Tinc títol, salutació i comiat", "He indicat dia, hora i lloc", "L'ordre del dia està numerat i acaba amb precs i preguntes", "He fet servir una fórmula de cortesia amb subjuntiu", "He mantingut el mateix tractament tot el text", "Té entre 150 i 190 paraules"]
  }
};

export const U11: FullUnit = {
  lessons: ["p6"],
  pretest: [
    { type: "choice", q: "Treballo ___ dissenyadora en una agència.", options: ["com a", "com", "de com"], answer: "com a", e: "Com a = en qualitat de." },
    { type: "choice", q: "Fes-ho ___ vulguis.", options: ["com", "com a", "tan"], answer: "com", e: "Com = de la manera que." },
    { type: "choice", q: "Del verb reclamar, el nom és:", options: ["reclamació", "reclamo", "reclamança"], answer: "reclamació", e: "Verb en -ar + -ació: reclamació." },
    { type: "choice", q: "«Gasto» en català és:", options: ["despesa", "gasto", "gast"], answer: "despesa", e: "Gasto és castellà; en català, despesa." },
    { type: "choice", q: "Del verb pagar, el nom és:", options: ["pagament", "pago", "pagació"], answer: "pagament", e: "Pagar → pagament." }
  ],
  model: {
    title: "Una reclamació per una compra defectuosa",
    genre: "Reclamació (Àrea 3, exercici 1 · 170 paraules)",
    text: `Estimats senyors:

Em dirigeixo a vostès, com a client de la seva botiga en línia, per presentar una reclamació sobre la comanda número 48215.

El passat 3 de març vaig comprar un televisor amb el qual no estic satisfet. L'aparell va arribar amb la pantalla esquerdada i, tot i que vaig informar-los l'endemà per correu electrònic, no n'he rebut cap resposta.

Com que el producte no es correspon amb el que vaig contractar, els demano que, en un termini de quinze dies, em retornin l'import íntegre o m'enviïn un aparell nou. Si ho preferissin, també estaria disposat a rebre un descompte raonable.

Els adjunto la factura, el comprovant del pagament i unes fotografies de l'estat del televisor. Els recordo que la llei em garanteix el dret de devolució en cas de producte defectuós.

Confio que resoldran la qüestió amb la rapidesa que mereix. Quedo a l'espera de la seva resposta.

Atentament,
Pere Ferrer`,
    notes: [
      { quote: "com a client", note: "Com a = en qualitat de (no «com client»)." },
      { quote: "presentar una reclamació", note: "Reclamar → reclamació (verb + -ació)." },
      { quote: "El passat 3 de març", note: "Data concreta per situar els fets." },
      { quote: "tot i que vaig informar-los", note: "Concessiva + indicatiu quan el fet és real." },
      { quote: "Com que el producte no es correspon", note: "Com que = causa (ja que). No és el mateix que com a." },
      { quote: "els demano que, en un termini de quinze dies, em retornin", note: "Demanar que + subjuntiu; termini concret." },
      { quote: "l'import íntegre", note: "Import = quantitat de diners; íntegre = complet." },
      { quote: "Si ho preferissin", note: "Condicional amb si + imperfet de subjuntiu: oferta alternativa." },
      { quote: "Els adjunto la factura", note: "Adjuntar documents: factura, comprovant." },
      { quote: "Quedo a l'espera de la seva resposta", note: "Tancament formal." }
    ]
  },
  examples: [
    { ca: "Treballo com a dissenyadora per a una cooperativa.", note: "Com a + professió o càrrec (qualitat)." },
    { ca: "Ho va fer com a favor, no com a obligació.", note: "Com a = en concepte de." },
    { ca: "Fes-ho com et vagi millor.", note: "Com + manera (sense a)." },
    { ca: "És tan car com el del mes passat.", note: "Comparació d'igualtat: tan… com." },
    { ca: "Com que no va arribar a temps, vam anul·lar la comanda.", note: "Com que = causa, al principi de frase." },
    { ca: "Com a mínim, ens haurien d'haver avisat.", note: "Loc. com a mínim / com a màxim / com a molt." },
    { ca: "Han presentat una reclamació per l'import de la factura.", note: "Reclamar → reclamació." },
    { ca: "El pagament es pot fer en tres terminis.", note: "Pagar → pagament; termini = període fixat." },
    { ca: "El lliurament de la comanda es va endarrerir una setmana.", note: "Lliurar → lliurament." },
    { ca: "Vam comparar els preus abans de comprar.", note: "Comprar → comprador, compra." },
    { ca: "Em van retornar els diners íntegrament.", note: "Íntegre → íntegrament (adjectiu + -ment)." },
    { ca: "Hem de reduir la despesa mensual.", note: "Despesa, no «gasto»." },
    { ca: "Estalviar és més fàcil si fixes una quantitat cada mes.", note: "Estalviar → estalvi, estalviador." }
  ],
  practice: [
    { type: "choice", q: "Treballo ___ cambrera a l'estiu.", options: ["com a", "com", "de com"], answer: "com a", e: "Com a + professió." },
    { type: "choice", q: "Fes-ho ___ vulguis.", options: ["com", "com a", "com que"], answer: "com", e: "Com + manera." },
    { type: "choice", q: "___ no tenia diners, no va comprar el sofà.", options: ["Com que", "Com a", "Tan com"], answer: "Com que", e: "Com que + causa." },
    { type: "choice", q: "És tan car ___ l'altre.", options: ["com", "que", "com a"], answer: "com", e: "Tan… com." },
    { type: "choice", q: "Parla ___ si fos el cap.", options: ["com", "com a", "tan"], answer: "com", e: "Com si = com a comparació irreal." },
    { type: "choice", q: "___ màxim, hi aniran cent persones.", options: ["Com a", "Com", "Tan"], answer: "Com a", e: "Com a màxim, com a mínim, com a molt." },
    { type: "choice", q: "Ha vingut ___ representant de l'empresa.", options: ["com a", "com", "de com"], answer: "com a", e: "Com a + càrrec." },
    { type: "choice", q: "Del verb lliurar, el nom és:", options: ["lliurament", "lliuració", "lliuro"], answer: "lliurament", e: "-ar + -ament." },
    { type: "choice", q: "Del verb comparar, el nom és:", options: ["comparació", "comparament", "comparança"], answer: "comparació", e: "-ar + -ació." },
    { type: "choice", q: "Quina forma és catalana?", options: ["estalvi", "ahorro", "ahorri"], answer: "estalvi", e: "Estalviar → estalvi." },
    { type: "choice", q: "Quina forma és catalana?", options: ["rebut", "recibo", "recibut"], answer: "rebut", e: "Rebut (justificant de pagament)." },
    { type: "choice", q: "«Plazo» en català és:", options: ["termini", "plaç", "plaza"], answer: "termini", e: "Termini." },
    { type: "choice", q: "«Pedido» en català és:", options: ["comanda", "pedit", "petició"], answer: "comanda", e: "Fer una comanda." },
    { type: "choice", q: "«Envío» en un context de comerç és:", options: ["enviament", "envio", "enviació"], answer: "enviament", e: "Enviar → enviament." },
    { type: "choice", q: "«Devolver» el producte és:", options: ["retornar", "devolver", "tornar enrere"], answer: "retornar", e: "Retornar un producte; també tornar." },
    { type: "choice", q: "L'adverbi de «ràpid» és:", options: ["ràpidament", "ràpidement", "ràpidamente"], answer: "ràpidament", e: "Adjectiu femení + -ment: ràpida + ment." },
    { type: "choice", q: "L'adverbi de «íntegre» és:", options: ["íntegrament", "íntegreament", "íntegre ment"], answer: "íntegrament", e: "Íntegre → íntegrament (acabat en -e, només s'afegeix -ment)." },
    { type: "choice", q: "Quin és el contrari de «possible»?", options: ["impossible", "inpossible", "dispossible"], answer: "impossible", e: "Davant de p, in- passa a im-: impossible." },
    { type: "choice", q: "Quin és el contrari de «content»?", options: ["descontent", "incontent", "nocontent"], answer: "descontent", e: "Prefix des- per formar contraris." },
    { type: "choice", q: "Reclamació: quina fórmula és adequada?", options: ["Em dirigeixo a vostès per presentar una reclamació sobre…", "Estic fart del seu servei i vull els meus diners.", "Escric per dir-los que és un desastre."], answer: "Em dirigeixo a vostès per presentar una reclamació sobre…", e: "To formal, sense insults." },
    { type: "choice", q: "Quin connector introdueix causa?", options: ["Com que", "Tanmateix", "Per tant"], answer: "Com que", e: "Com que = ja que." },
    { type: "choice", q: "«Els demano que em ___ l'import.»", options: ["retornin", "retornen", "retornaran"], answer: "retornin", e: "Demanar que + subjuntiu." },
    { type: "choice", q: "Quin és el nom del verb «garantir»?", options: ["garantia", "garantiment", "garantició"], answer: "garantia", e: "Garantir → garantia." },
    { type: "choice", q: "Un acord s'aconsegueix quan:", options: ["les dues parts hi cedeixen una mica", "una part ho imposa tot", "ningú no parla"], answer: "les dues parts hi cedeixen una mica", e: "Negociar és cedir i demanar." },
    { type: "gap", q: "Treballa ___ guia turística.", answers: ["com a"], e: "Com a + professió." },
    { type: "gap", q: "Fes-ho ___ millor et vagi.", answers: ["com"], e: "Com + manera." },
    { type: "gap", q: "___ que no hi havia estoc, ens van retornar els diners.", answers: ["com"], e: "Com que + causa." },
    { type: "gap", q: "Han presentat una ___ (reclamar) formal.", answers: ["reclamació"], e: "Reclamar → reclamació." },
    { type: "gap", q: "El ___ (pagar) es farà en dos terminis.", answers: ["pagament"], e: "Pagar → pagament." },
    { type: "gap", q: "Em van retornar l'import ___ (íntegre).", answers: ["íntegrament"], e: "Íntegre + ment." },
    { type: "gap", q: "Hem de reduir la ___ (en castellà, gasto) mensual.", answers: ["despesa"], e: "Despesa." },
    { type: "gap", q: "És ___ (possible) arribar a un acord.", answers: ["possible"], e: "Possible; el contrari és impossible." },
    { type: "gap", q: "___ mínim, ens haurien d'haver avisat.", answers: ["com a"], e: "Com a mínim." },
    { type: "gap", q: "Els ___ (adjuntar, present) la factura.", answers: ["adjunto"], e: "Adjuntar: jo adjunto." },
    { type: "fix", q: "Corregeix: «Treballo com professora d'anglès.»", answers: ["com a"], e: "En qualitat de → com a." },
    { type: "fix", q: "Corregeix: «Com a no tenia diners, no ho vaig comprar.»", answers: ["com que"], e: "Causa → com que." },
    { type: "fix", q: "Corregeix: «Hem de reduir el gasto.»", answers: ["despesa"], e: "Gasto és castellà." },
    { type: "fix", q: "Corregeix: «Vull devolver el producte.»", answers: ["retornar"], e: "Retornar (o tornar)." },
    { type: "fix", q: "Corregeix: «Inpossible, no arribarem a temps.»", answers: ["impossible"], e: "Davant de p: im-." },
    { type: "fix", q: "Corregeix: «Es va fer la comanda ràpidement.»", answers: ["ràpidament"], e: "Ràpid + -ment: ràpidament." },
    { type: "fix", q: "Corregeix: «El plazo acaba divendres.»", answers: ["termini"], e: "Plazo és castellà." },
    { type: "transform", q: "Uneix amb «com que»: «No ha arribat el paquet. Anul·lem la comanda.»", answers: ["Com que no ha arribat el paquet, anul·lem la comanda"], e: "Com que + causa, coma, conseqüència." },
    { type: "transform", q: "Fes-ho més cortès: «Torneu-me els diners.»", answers: ["Els agrairia que em retornessin els diners", "Voldria que em retornessin els diners", "Els demano que em retornin els diners"], e: "Cortesia: condicional + subjuntiu o demanar que + subjuntiu." },
    { type: "transform", q: "Substitueix el verb pel nom: «Reclamem perquè no han lliurat la comanda.»", answers: ["Fem una reclamació perquè no han lliurat la comanda", "Presentem una reclamació perquè no han lliurat la comanda"], e: "Reclamar → fer o presentar una reclamació." },
    { type: "transform", q: "Escriu el contrari amb des-: «Estic content amb el servei.»", answers: ["Estic descontent amb el servei"], e: "Content → descontent." },
    { type: "transform", q: "Forma l'adverbi: «Va respondre de manera ràpida.»", answers: ["Va respondre ràpidament"], e: "Ràpida + ment." }
  ],
  skeleton: {
    brief: "Escriu una reclamació a una companyia de subministraments perquè t'han cobrat dues vegades la mateixa factura (170 paraules).",
    template: `Estimats senyors:

Em dirigeixo a vostès, com a ___ (titular, client), per presentar una reclamació sobre ___.

El passat ___ (data) ___ (què va passar). ___ (què vas fer i què no han respost).

Com que ___ (causa), els demano que, en un termini de ___, ___ (subjuntiu: retornin, corregeixin…).

Els adjunto ___. Quedo a l'espera de la seva resposta.

Atentament,
___`,
    tips: ["Fes servir com a una vegada i com que una altra.", "Posa una data, un import i un termini concret.", "Demana una solució clara amb que + subjuntiu."]
  },
  oral: {
    reading: "Cada vegada més persones compren per internet perquè és còmode i, sovint, més barat. Tanmateix, no sempre és fàcil retornar un producte o reclamar quan alguna cosa surt malament. Per això, convé conservar la factura, fer fotografies del problema i guardar totes les comunicacions amb l'empresa. Així, si cal presentar una reclamació, hi haurà proves clares.",
    topic: "Has comprat una bicicleta elèctrica i el motor falla. Negocia amb el venedor una solució (reparació, canvi o devolució).",
    phrases: ["Estaria disposat/ada a…", "Podríem arribar a un acord si…", "Em sembla raonable que…", "Per la meva banda, …", "Com que el producte no funciona, …"],
    bot: "Fes de venedor/a d'una botiga de bicicletes. L'alumne reclama perquè el producte falla i vol una solució. Posa'n dificultats (garantia, termini, preu) i accepta una solució només si l'alumne proposa un compromís raonable. Fes servir el tractament de vostè."
  },
  exam: {
    brief: "Has contractat un servei de fibra òptica que no funciona des de fa tres setmanes. Escriu una reclamació a l'operadora: explica els fets, indica què has fet i demana una solució amb un termini.",
    words: 170,
    minutes: 40,
    focus: ["com / com a / com que", "derivació (verb → nom, adverbis en -ment)", "lèxic de consum sense castellanismes"],
    checklist: ["Tinc salutació i comiat formals", "He explicat els fets amb dates", "He fet servir «com a» i «com que» correctament", "He demanat una solució amb termini i subjuntiu", "He adjuntat o esmentat proves", "Té entre 150 i 190 paraules"]
  }
};

export const U12: FullUnit = {
  lessons: ["p5"],
  pretest: [
    { type: "choice", q: "«Hace calor» en català és:", options: ["fa calor", "té calor", "va calor"], answer: "fa calor", e: "Temps atmosfèric: fer calor, fer fred, fer sol." },
    { type: "choice", q: "«Tengo sueño» és:", options: ["tinc son", "faig son", "estic son"], answer: "tinc son", e: "Sensacions: tenir son, gana, set, fred, calor." },
    { type: "choice", q: "«Hacer falta» és:", options: ["fer falta", "tenir falta", "fer faltes"], answer: "fer falta", e: "Fer falta = ser necessari." },
    { type: "choice", q: "«Tener razón» és:", options: ["tenir raó", "fer raó", "ser raó"], answer: "tenir raó", e: "Tenir raó." },
    { type: "choice", q: "«Ir bien» és:", options: ["anar bé", "ir bé", "fer bé"], answer: "anar bé", e: "Anar bé / anar malament." }
  ],
  model: {
    title: "Un anunci per a una cooperativa de bicicletes",
    genre: "Text publicitari (Àrea 3, exercici 1 · 170 paraules)",
    text: `FES CAMÍ, FES-NE EL TEU

A Eivissa, hi ha dies que fa tanta calor que no ve de gust ni sortir de casa. I hi ha dies en què l'illa et fa ganes d'anar-hi, de descobrir-la a poc a poc, sense pressa i sense motor.

A Pedals d'Es Vedrà, tenim una idea clara: la millor manera de conèixer un lloc és fer-ho a pedals. Per això posem a la teva disposició bicicletes elèctriques i de muntanya, amb casc i mapa inclosos.

Tens sis hores? Fes la ruta del far. Tens tot el cap de setmana? Pots anar de cala en cala sense preocupar-te del cotxe. I si algun dia et fa mandra pujar, la bateria t'ajudarà. No et farà falta res més que ganes.

Reserva ara i obtindràs un 15 % de descompte. Truca'ns, escriu-nos o passa per la botiga: t'estem esperant.

Pedals d'Es Vedrà. Perquè l'illa no s'ha de mirar, s'ha de viure.`,
    notes: [
      { quote: "FES CAMÍ, FES-NE EL TEU", note: "Eslògan: imperatiu + joc amb «fer camí» (avançar) i «fer-se el seu camí» (personalitzar). En = camí." },
      { quote: "fa tanta calor", note: "Fer + fenomen atmosfèric." },
      { quote: "no ve de gust", note: "Venir de gust = apetir." },
      { quote: "et fa ganes d'anar-hi", note: "Fer ganes (+ infinitiu) = apetir; hi = a l'illa." },
      { quote: "a poc a poc", note: "Locució adverbial: lentament." },
      { quote: "Tens sis hores?", note: "Pregunta directa: tractament de tu, propi de la publicitat." },
      { quote: "anar de cala en cala", note: "Anar de… en… (recorregut)." },
      { quote: "et fa mandra", note: "Fer mandra (+ infinitiu) = no tenir ganes." },
      { quote: "No et farà falta res més", note: "Fer falta = ser necessari." },
      { quote: "Perquè l'illa no s'ha de mirar, s'ha de viure", note: "Eslògan final: paral·lelisme i contrast." }
    ]
  },
  examples: [
    { ca: "Avui fa molt de vent a la costa.", note: "Fer + fenomen atmosfèric: fa vent, fa fred." },
    { ca: "Tinc molta gana; no he esmorzat.", note: "Tenir gana, set, son, fred, calor." },
    { ca: "Em fa por conduir de nit.", note: "Fer por (a algú) = ser temut." },
    { ca: "No et facis el desentès: ho saps perfectament.", note: "Fer-se el desentès / fer l'orni." },
    { ca: "Aquest cartell no fa gràcia a ningú.", note: "Fer gràcia = divertir." },
    { ca: "Fa falta una campanya més clara.", note: "Fer falta = ser necessari." },
    { ca: "Tens raó: l'eslògan és massa llarg.", note: "Tenir raó, tenir sort, tenir pressa." },
    { ca: "Cal tenir en compte el públic a qui va dirigit l'anunci.", note: "Tenir en compte = considerar." },
    { ca: "La presentació tindrà lloc dijous.", note: "Tenir lloc = celebrar-se." },
    { ca: "Tot va bé: el disseny ha agradat.", note: "Anar bé / anar malament." },
    { ca: "Aquests dies vaig de bòlit amb la campanya.", note: "Anar de bòlit = estar molt enfeinat." },
    { ca: "Si seguim així, anirem a parar al mateix error.", note: "Anar a parar = acabar en." },
    { ca: "Va ser un malentès, però va anar a la contra del client.", note: "Anar a la contra = oposar-se." }
  ],
  practice: [
    { type: "choice", q: "«Hace mucho frío» en català:", options: ["Fa molt de fred.", "Té molt de fred.", "Va molt de fred."], answer: "Fa molt de fred.", e: "Temps atmosfèric → fer." },
    { type: "choice", q: "«Tengo hambre»:", options: ["Tinc gana.", "Faig gana.", "Estic gana."], answer: "Tinc gana.", e: "Sensació → tenir." },
    { type: "choice", q: "«Me da miedo»:", options: ["Em fa por.", "Em té por.", "Em dona por."], answer: "Em fa por.", e: "Fer por." },
    { type: "choice", q: "«Hace falta una idea»:", options: ["Fa falta una idea.", "Té falta una idea.", "Hi ha falta una idea."], answer: "Fa falta una idea.", e: "Fer falta." },
    { type: "choice", q: "«Tener en cuenta»:", options: ["Tenir en compte.", "Tenir en conte.", "Tenir a compte."], answer: "Tenir en compte.", e: "Tenir en compte." },
    { type: "choice", q: "«Tener lugar»:", options: ["Tenir lloc.", "Tenir lloc de.", "Fer lloc."], answer: "Tenir lloc.", e: "Tenir lloc = celebrar-se." },
    { type: "choice", q: "«Tener prisa»:", options: ["Tenir pressa.", "Tenir prisa.", "Fer pressa."], answer: "Tenir pressa.", e: "Pressa amb ss." },
    { type: "choice", q: "«Hacerse el sueco» (fingir que no s'entén) és:", options: ["fer-se el desentès", "fer-se el suec", "fer el tonto de Suècia"], answer: "fer-se el desentès", e: "També fer l'orni." },
    { type: "choice", q: "«Ir de cabeza» (estar molt enfeinat):", options: ["anar de bòlit", "anar de cap", "anar de caps"], answer: "anar de bòlit", e: "Anar de bòlit." },
    { type: "choice", q: "«Ir a parar a»:", options: ["anar a parar", "anar a pararse", "anar de parar"], answer: "anar a parar", e: "Anar a parar a un lloc." },
    { type: "choice", q: "«Ir bien»:", options: ["anar bé", "ir bé", "fer bé"], answer: "anar bé", e: "Anar bé." },
    { type: "choice", q: "«Hacer gracia»:", options: ["fer gràcia", "fer gracia", "donar gràcia"], answer: "fer gràcia", e: "Fer gràcia." },
    { type: "choice", q: "«Hacer caso»:", options: ["fer cas", "fer caso", "fer casos"], answer: "fer cas", e: "Fer cas." },
    { type: "choice", q: "«Tener suerte»:", options: ["tenir sort", "tenir suerte", "fer sort"], answer: "tenir sort", e: "Tenir sort." },
    { type: "choice", q: "«Tener ganas de»:", options: ["tenir ganes de", "tenir gana de", "fer ganes de"], answer: "tenir ganes de", e: "Tenir ganes de + infinitiu." },
    { type: "choice", q: "«Me da pereza»:", options: ["Em fa mandra.", "Em dona mandra.", "Tinc mandra de."], answer: "Em fa mandra.", e: "Fer mandra (a algú)." },
    { type: "choice", q: "Un eslògan eficaç és:", options: ["breu, memorable i amb una crida a l'acció", "llarg i ple de dades", "sempre en passiva"], answer: "breu, memorable i amb una crida a l'acció", e: "Brevetat, ritme i acció." },
    { type: "choice", q: "L'imperatiu de «descobrir» (tu) és:", options: ["descobreix", "descobrís", "descobre"], answer: "descobreix", e: "Descobrir: descobreix tu." },
    { type: "choice", q: "L'imperatiu de «viure» (tu) és:", options: ["viu", "vius", "viva"], answer: "viu", e: "Viure: viu." },
    { type: "choice", q: "L'imperatiu de «provar-lo» és:", options: ["prova'l", "proba'l", "prova-lo"], answer: "prova'l", e: "Prova + el = prova'l." },
    { type: "choice", q: "«Descobreix-ho» conté el pronom:", options: ["ho (això)", "el (lloc)", "li (a ell)"], answer: "ho (això)", e: "Darrere de l'imperatiu: descobreix-ho." },
    { type: "choice", q: "Doble sentit: «Fes camí» pot voler dir:", options: ["avança i crea el teu propi camí", "només camina", "para"], answer: "avança i crea el teu propi camí", e: "Joc de paraules entre sentit literal i figurat." },
    { type: "choice", q: "Crida a l'acció típica d'un anunci:", options: ["Truca'ns avui.", "No ho sé.", "Potser demà."], answer: "Truca'ns avui.", e: "Verb en imperatiu." },
    { type: "choice", q: "Quina frase és correcta?", options: ["No et farà falta res més.", "No et farà falta cap res més.", "No et fa fals res més."], answer: "No et farà falta res més.", e: "Fer falta + res." },
    { type: "gap", q: "Avui ___ (fer) molta calor.", answers: ["fa"], e: "Fer + fenomen atmosfèric." },
    { type: "gap", q: "___ (tenir, jo) molta son.", answers: ["tinc"], e: "Tenir son." },
    { type: "gap", q: "Em ___ (fer) por parlar en públic.", answers: ["fa"], e: "Fer por." },
    { type: "gap", q: "Cal ___ (tenir) en compte el públic.", answers: ["tenir"], e: "Cal tenir en compte." },
    { type: "gap", q: "La presentació ___ (tenir, futur) lloc dijous.", answers: ["tindrà"], e: "Tenir lloc en futur: tindrà." },
    { type: "gap", q: "Tot ___ (anar, present) bé de moment.", answers: ["va"], e: "Anar bé." },
    { type: "gap", q: "Aquest estiu ___ (anar, nosaltres) de cala en cala.", answers: ["anirem"], e: "Anar: anirem." },
    { type: "gap", q: "No ___ (fer, tu) cas del que diuen.", answers: ["facis"], e: "Imperatiu negatiu: no facis." },
    { type: "gap", q: "___ (Descobrir, tu) l'illa a pedals.", answers: ["Descobreix"], e: "Imperatiu: descobreix." },
    { type: "fix", q: "Corregeix: «Hace calor avui.»", answers: ["fa"], e: "Hace és castellà." },
    { type: "fix", q: "Corregeix: «Tinc molta prisa.»", answers: ["pressa"], e: "Pressa amb ss." },
    { type: "fix", q: "Corregeix: «Em dona por conduir.»", answers: ["fa"], e: "Fer por." },
    { type: "fix", q: "Corregeix: «No faig cas de res.»", answers: ["cas"], e: "Fer cas: només cas, no caso." },
    { type: "transform", q: "Passa a imperatiu (tu): «Has de provar el nou gust.»", answers: ["Prova el nou gust"], e: "Provar: prova." },
    { type: "transform", q: "Substitueix el nom pel pronom: «Descobreix l'illa.»", answers: ["Descobreix-la"], e: "Imperatiu + la = descobreix-la." },
    { type: "transform", q: "Fes-ho més persuasiu amb una pregunta: «Tens ganes de viatjar.»", answers: ["Tens ganes de viatjar?"], e: "La pregunta directa implica el lector." },
    { type: "transform", q: "Escriu amb «fer falta»: «Necessitem una idea nova.»", answers: ["Ens fa falta una idea nova", "Fa falta una idea nova"], e: "Fer falta: ens fa falta." },
    { type: "transform", q: "Escriu amb «tenir lloc»: «El concert se celebrarà dissabte.»", answers: ["El concert tindrà lloc dissabte"], e: "Se celebrarà → tindrà lloc." }
  ],
  skeleton: {
    brief: "Escriu un text publicitari per a un restaurant de cuina tradicional d'Eivissa, amb eslògan, cos del text i crida a l'acció (170 paraules).",
    template: `___ (eslògan breu i amb joc de paraules)

___ (situació o sensació que connecta amb el lector: fa calor, tens gana…).

A ___ (nom), tenim una idea clara: ___ (proposta de valor).

___ (pregunta directa al lector). ___ (oferta concreta amb una locució: no et farà falta…, tindràs ganes de…).

___ (crida a l'acció en imperatiu: reserva, truca'ns, passa per…) ___ (oferta o dada pràctica).

___ (eslògan final)`,
    tips: ["Fes servir almenys tres locucions amb fer, tenir o anar.", "Inclou imperatius (tu) i un pronom darrere del verb.", "Acaba amb una crida a l'acció clara."]
  },
  oral: {
    reading: "La publicitat funciona perquè connecta amb les emocions abans que amb la raó. Un bon eslògan és curt, fàcil de recordar i, sovint, juga amb el doble sentit de les paraules. Tanmateix, no tot s'hi val: les campanyes han de ser honestes i no han d'enganyar el consumidor ni reforçar estereotips.",
    topic: "Analitza l'eslògan «Fes camí, fes-ne el teu»: quin joc de paraules té, a qui va dirigit i si t'hi sents identificat.",
    phrases: ["L'eslògan juga amb el doble sentit de…", "Va dirigit a un públic…", "Em sembla eficaç perquè…", "Tanmateix, es podria millorar…", "Jo no el canviaria perquè…"],
    bot: "Fes d'entrevistador/a d'un programa de publicitat. L'alumne ha d'analitzar un eslògan inventat (doble sentit, públic, eficàcia). Demana-li exemples i que proposi una alternativa. Obliga'l a fer servir locucions amb fer, tenir i anar."
  },
  exam: {
    brief: "Una cooperativa agrícola d'Eivissa vol llançar una campanya de promoció de les seves taronges. Escriu el text publicitari: eslògan, cos del text amb almenys tres locucions amb fer, tenir o anar i crida a l'acció.",
    words: 170,
    minutes: 40,
    focus: ["locucions amb fer, tenir i anar", "imperatiu amb pronoms", "estructura del text publicitari"],
    checklist: ["Tinc un eslògan breu", "He fet servir tres locucions (fer, tenir, anar)", "He inclòs imperatius i un pronom darrere del verb", "He interpel·lat el lector amb una pregunta", "Acabo amb una crida a l'acció", "Té entre 150 i 190 paraules"]
  }
};
