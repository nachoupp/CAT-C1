/** Unitats 7-9 (fase 2): tecnologia (subjuntiu i condicionals), cultura (combinació de pronoms), educació (connectors i cohesió). */
import type { FullUnit } from "./units-b";

const ok = "Quina frase és correcta?";

export const U7: FullUnit = {
  lessons: ["p10"],
  pretest: [
    { type: "choice", q: "Vull que ___ a la reunió.", options: ["vinguis", "véns", "vindràs"], answer: "vinguis", e: "Voler que + subjuntiu quan els subjectes són diferents." },
    { type: "choice", q: "Quan ___ a casa, truca'm.", options: ["arribis", "arribaràs", "arribes"], answer: "arribis", e: "Quan amb valor de futur → subjuntiu." },
    { type: "choice", q: "Si ___ temps, aprendria a programar.", options: ["tingués", "tindria", "tinc"], answer: "tingués", e: "Hipòtesi: si + imperfet de subjuntiu + condicional." },
    { type: "choice", q: "No crec que la tecnologia ___ la solució.", options: ["sigui", "és", "serà"], answer: "sigui", e: "Opinió negada → subjuntiu." },
    { type: "choice", q: "Crec que la tecnologia ___ útil.", options: ["és", "sigui", "fos"], answer: "és", e: "Opinió afirmativa → indicatiu." }
  ],
  model: {
    title: "Mòbils a l'aula: prohibir o educar?",
    genre: "Article d'opinió (Àrea 3, exercici 2 · 250 paraules)",
    text: `Fa uns mesos que es debat si s'han de prohibir els telèfons mòbils als centres educatius. Algunes comunitats ja ho han fet i n'hi ha que demanen que la mesura s'estengui a totes les etapes. Al meu parer, prohibir-los pot ser útil a primària, però a secundària seria més eficaç que els alumnes aprenguessin a fer-ne un ús responsable.

En primer lloc, és evident que el mòbil distreu. Diversos estudis indiquen que els alumnes que el tenen a sobre es concentren menys, encara que no el facin servir. Per tant, és lògic que els centres en limitin l'ús durant les classes.

Ara bé, no crec que la prohibició total sigui la solució. Els adolescents passaran moltes hores davant d'una pantalla al llarg de la seva vida i necessiten que algú els ensenyi a protegir les seves dades, a contrastar informacions i a desconnectar. Si l'escola renuncia a aquesta tasca, qui se n'encarregarà?

Hi ha qui argumenta que les famílies són les responsables d'aquesta educació. Tanmateix, no totes tenen els coneixements ni el temps necessaris, i l'escola ha de garantir la igualtat d'oportunitats.

En definitiva, caldria que les normes fossin clares i que anessin acompanyades de formació. Si els joves entenguessin per què han de desar el mòbil, segurament ho farien de més bon grat. Prohibir és fàcil; educar és més difícil, però també més necessari.`,
    notes: [
      { quote: "Al meu parer", note: "Fórmula formal per presentar l'opinió (també: des del meu punt de vista, considero que)." },
      { quote: "seria més eficaç que els alumnes aprenguessin", note: "Condicional + que + imperfet de subjuntiu." },
      { quote: "encara que no el facin servir", note: "Concessiva amb subjuntiu." },
      { quote: "és lògic que els centres en limitin l'ús", note: "Expressió valorativa + que + subjuntiu. En = del mòbil." },
      { quote: "no crec que la prohibició total sigui", note: "Opinió negada → subjuntiu." },
      { quote: "Ara bé", note: "Connector de contrast que obre la teva tesi." },
      { quote: "necessiten que algú els ensenyi", note: "Necessitar que + subjuntiu." },
      { quote: "Hi ha qui argumenta que", note: "Introdueix el contraargument per rebatre'l." },
      { quote: "Tanmateix", note: "Refuta el contraargument." },
      { quote: "caldria que les normes fossin clares", note: "Caldria que + imperfet de subjuntiu: proposta." },
      { quote: "Si els joves entenguessin", note: "Hipòtesi: si + imperfet de subjuntiu … farien." }
    ]
  },
  examples: [
    { ca: "Vull que m'expliquis com funciona l'aplicació.", note: "Voler que + subjuntiu (subjectes diferents)." },
    { ca: "Vull aprendre a programar.", note: "Mateix subjecte → infinitiu, no subjuntiu." },
    { ca: "Quan tinguis un moment, mira el correu.", note: "Quan amb valor de futur → subjuntiu." },
    { ca: "No crec que la intel·ligència artificial substitueixi els mestres.", note: "Opinió negada → subjuntiu." },
    { ca: "Crec que la tecnologia pot ajudar a aprendre.", note: "Opinió afirmativa → indicatiu." },
    { ca: "És imprescindible que protegim les nostres dades.", note: "Expressió impersonal de necessitat + subjuntiu." },
    { ca: "Busquem algú que sàpiga programar.", note: "Antecedent desconegut → subjuntiu." },
    { ca: "T'ho envio perquè ho revisis.", note: "Perquè de finalitat → subjuntiu." },
    { ca: "Encara que la connexió sigui lenta, la reunió es farà.", note: "Concessiva hipotètica → subjuntiu." },
    { ca: "Si tingués més temps, faria un curs de disseny.", note: "Si + imperfet de subjuntiu + condicional." },
    { ca: "Si ho hagués sabut, t'hauria avisat.", note: "Hipòtesi en passat: si + plusquamperfet de subjuntiu + condicional perfet." },
    { ca: "Hauríem de limitar l'ús de pantalles abans de dormir.", note: "Condicional d'haver de per recomanar." },
    { ca: "M'agradaria que l'escola oferís formació digital.", note: "Condicional + que + imperfet de subjuntiu." }
  ],
  practice: [
    { type: "choice", q: "Espero que ___ bé l'examen.", options: ["et vagi", "et va", "t'anirà"], answer: "et vagi", e: "Esperar que + subjuntiu." },
    { type: "choice", q: "M'agradaria que ___ més temps per estudiar.", options: ["tingués", "tingui", "tinc"], answer: "tingués", e: "Verb principal en condicional → imperfet de subjuntiu." },
    { type: "choice", q: "Dubto que ___ a temps.", options: ["arribin", "arriben", "arribaran"], answer: "arribin", e: "Dubtar que + subjuntiu." },
    { type: "choice", q: "Sé que ___ a temps.", options: ["arribaran", "arribin", "arribessin"], answer: "arribaran", e: "Saber que (certesa) + indicatiu." },
    { type: "choice", q: "Busco una aplicació que ___ en català.", options: ["funcioni", "funciona", "funcionarà"], answer: "funcioni", e: "Encara no sé si existeix → subjuntiu." },
    { type: "choice", q: "Tinc una aplicació que ___ en català.", options: ["funciona", "funcioni"], answer: "funciona", e: "Antecedent conegut → indicatiu." },
    { type: "choice", q: "És important que els joves ___ un ús responsable del mòbil.", options: ["facin", "fan", "faran"], answer: "facin", e: "És important que + subjuntiu." },
    { type: "choice", q: "T'ho explico perquè ho ___.", options: ["entenguis", "entens", "entendràs"], answer: "entenguis", e: "Perquè de finalitat (= a fi que) → subjuntiu." },
    { type: "choice", q: "Abans que ___ fosc, tornarem.", options: ["es faci", "es fa", "es farà"], answer: "es faci", e: "Abans que + subjuntiu." },
    { type: "choice", q: "Si ho hagués sabut, no ___ vingut.", options: ["hauria", "hagués", "he"], answer: "hauria", e: "Si hagués + participi … hauria + participi." },
    { type: "choice", q: "Si demà fa sol, ___ a la platja.", options: ["anirem", "aniríem", "anéssim"], answer: "anirem", e: "Condició possible: si + present … futur." },
    { type: "choice", q: ok, options: ["Si tingués diners, compraria un ordinador nou.", "Si tindria diners, compraria un ordinador nou.", "Si tindrà diners, compraria un ordinador nou."], answer: "Si tingués diners, compraria un ordinador nou.", e: "Mai condicional darrere de si: si tingués." },
    { type: "choice", q: "Tria la forma: «Hauries ___ apagar el mòbil a classe.»", options: ["d'", "de", "que"], answer: "d'", e: "Haver de + infinitiu; davant de vocal: hauries d'apagar." },
    { type: "choice", q: "Condicional de cortesia: «___ ajudar-me amb aquest formulari?»", options: ["Podria", "Podrà", "Pogués"], answer: "Podria", e: "El condicional suavitza la petició." },
    { type: "choice", q: "Article d'opinió: quina frase expressa l'opinió amb registre formal?", options: ["Al meu parer, l'ús del mòbil a l'aula s'hauria de regular.", "Jo flipo amb els mòbils a l'aula.", "Els mòbils són una passada."], answer: "Al meu parer, l'ús del mòbil a l'aula s'hauria de regular.", e: "Fórmula d'opinió i lèxic neutre." },
    { type: "choice", q: "Quina frase introdueix bé un contraargument?", options: ["Hi ha qui pensa que la prohibició és la millor opció; tanmateix…", "Bueno, és igual el que pensin.", "I punt."], answer: "Hi ha qui pensa que la prohibició és la millor opció; tanmateix…", e: "Presentes l'altra postura i la rebats." },
    { type: "choice", q: "Lèxic: forma correcta", options: ["descarregar", "descargar", "desgarregar"], answer: "descarregar", e: "Descarregar o baixar un fitxer." },
    { type: "choice", q: "Lèxic: forma correcta", options: ["contrasenya", "contrasenia", "contrasseña"], answer: "contrasenya", e: "Contrasenya." },
    { type: "choice", q: "Lèxic: forma correcta", options: ["xarxes socials", "redes socials", "xarses socials"], answer: "xarxes socials", e: "Xarxa, amb x." },
    { type: "choice", q: "Lèxic: forma correcta", options: ["ordinador", "ordenador", "computadora"], answer: "ordinador", e: "Ordinador." },
    { type: "gap", q: "Cal que tots ___ (fer, present de subjuntiu) un esforç.", answers: ["fem"], e: "Fer: que jo faci, que nosaltres fem." },
    { type: "gap", q: "Volia que ___ (venir, tu, imperfet de subjuntiu) a la xerrada.", answers: ["vinguessis", "vinguesses"], e: "Venir: vingués, vinguessis." },
    { type: "gap", q: "És possible que ___ (ploure) aquesta tarda.", answers: ["plogui"], e: "Ploure: que plogui." },
    { type: "gap", q: "Si ___ (poder, jo, imperfet de subjuntiu), treballaria des de casa.", answers: ["pogués"], e: "Poder: pogués." },
    { type: "gap", q: "No penso que ___ (ser) una bona idea.", answers: ["sigui"], e: "Opinió negada → subjuntiu: sigui." },
    { type: "gap", q: "Quan ___ (tenir, tu) els resultats, envia'ns-els.", answers: ["tinguis"], e: "Quan + futur → subjuntiu: tinguis." },
    { type: "gap", q: "Els he demanat que no ___ (fer) soroll.", answers: ["facin"], e: "Demanar que + subjuntiu." },
    { type: "gap", q: "Ens agradaria que l'ajuntament ___ (instal·lar) wifi gratuït.", answers: ["instal·lés"], e: "Condicional + que + imperfet de subjuntiu." },
    { type: "fix", q: "Corregeix: «Si tindria temps, ho faria.»", answers: ["tingués"], e: "Darrere de si no hi va mai condicional: si tingués." },
    { type: "fix", q: "Corregeix: «Quan arribaràs, avisa'm.»", answers: ["arribis"], e: "Quan amb valor de futur → subjuntiu." },
    { type: "fix", q: "Corregeix: «Vull que véns a la reunió.»", answers: ["vinguis"], e: "Voler que + subjuntiu." },
    { type: "fix", q: "Corregeix: «No crec que és necessari.»", answers: ["sigui"], e: "Opinió negada → subjuntiu." },
    { type: "fix", q: "Corregeix: «Espero que tens sort.»", answers: ["tinguis"], e: "Esperar que + subjuntiu." },
    { type: "transform", q: "Comença amb «Vull que»: «Tu estudies cada dia.»", answers: ["Vull que estudiïs cada dia"], e: "Estudiar: que estudiï, que estudiïs (amb dièresi)." },
    { type: "transform", q: "Fes-ho hipotètic (si + imperfet de subjuntiu): «Si tinc temps, aniré al curs.»", answers: ["Si tingués temps, aniria al curs"], e: "Hipòtesi: tingués … aniria." },
    { type: "transform", q: "Nega l'opinió: «Crec que és fàcil.»", answers: ["No crec que sigui fàcil"], e: "En negar l'opinió, el verb passa a subjuntiu." },
    { type: "transform", q: "Uneix amb «perquè» de finalitat: «Et deixo el portàtil. Pots treballar.»", answers: ["Et deixo el portàtil perquè puguis treballar"], e: "Finalitat → subjuntiu: puguis." },
    { type: "transform", q: "Passa al passat: «Si ho sé, t'ho dic.» (no ho sabia)", answers: ["Si ho hagués sabut, t'ho hauria dit"], e: "Hipòtesi no realitzada en passat." },
    { type: "choice", q: "Tria la forma: «Encara que ___ molt, no em convenceràs.»", options: ["insisteixis", "insistiràs", "insistiries"], answer: "insisteixis", e: "Concessiva hipotètica → subjuntiu." },
    { type: "choice", q: "Tria la forma: «Tan bon punt ___ la connexió, et truco.»", options: ["tingui", "tindré", "tenia"], answer: "tingui", e: "Temporal amb valor de futur → subjuntiu." },
    { type: "choice", q: "Tria la forma: «Caldria que el govern ___ més en recerca.»", options: ["invertís", "inverteix", "invertirà"], answer: "invertís", e: "Caldria que + imperfet de subjuntiu." }
  ],
  skeleton: {
    brief: "Article d'opinió per al diari digital de l'illa: «La intel·ligència artificial a l'escola: amenaça o oportunitat?» (250 paraules).",
    template: `Darrerament s'ha obert el debat sobre ___. Al meu parer, ___.

En primer lloc, ___. Per exemple, ___.

A més a més, és important que ___ (subjuntiu).

Hi ha qui argumenta que ___. Tanmateix, no crec que ___ (subjuntiu), ja que ___.

En definitiva, caldria que ___ (imperfet de subjuntiu). Si ___ (si + imperfet de subjuntiu), ___ (condicional).`,
    tips: ["Fes servir com a mínim tres subjuntius diferents (és important que, no crec que, caldria que).", "Inclou una oració amb si + imperfet de subjuntiu + condicional.", "Presenta i rebat un contraargument."]
  },
  oral: {
    reading: "Cada vegada més empreses ofereixen als treballadors el dret a desconnectar. Això vol dir que, fora de l'horari laboral, ningú no els pot exigir que responguin correus ni missatges. Els experts asseguren que aquesta mesura redueix l'estrès i millora la productivitat, tot i que encara hi ha sectors on és difícil d'aplicar.",
    topic: "Les xarxes socials: ens acosten o ens aïllen? Dona la teva opinió amb arguments i exemples.",
    phrases: ["Des del meu punt de vista…", "No crec que… (subjuntiu)", "És evident que…", "Si fos jo…", "Caldria que…"],
    bot: "Fes de company/a de debat a la ràdio local. L'alumne defensa una postura sobre l'ús de les xarxes socials entre els adolescents i tu defenses la contrària. Fes-li preguntes que l'obliguin a fer servir el subjuntiu i hipòtesis (què faries si…?) i rebat els seus arguments amb educació."
  },
  exam: {
    brief: "El consell escolar del teu centre vol prohibir els mòbils també durant l'esbarjo. Escriu un article d'opinió per a la revista del centre en què donis la teva opinió, aportis dos arguments i rebatis un contraargument.",
    words: 250,
    minutes: 60,
    focus: ["subjuntiu (voler que, no crec que, és important que)", "oracions condicionals (si + imperfet de subjuntiu)", "connectors d'opinió i de contrast"],
    checklist: ["He presentat la meva opinió al principi", "He desenvolupat dos arguments amb exemples", "He rebatut un contraargument", "He fet servir el subjuntiu almenys tres vegades", "He inclòs una hipòtesi amb si", "Té entre 230 i 270 paraules"]
  }
};

export const U8: FullUnit = {
  lessons: ["p3"],
  pretest: [
    { type: "choice", q: "Em deixes el llibre? — Sí, ___ deixo.", options: ["te'l", "et el", "t'el"], answer: "te'l", e: "Et + el = te'l." },
    { type: "choice", q: "M'ho expliques? — Sí, ___ explico.", options: ["t'ho", "et ho", "te ho"], answer: "t'ho", e: "Et + ho = t'ho." },
    { type: "choice", q: "Vols entrades? — Sí, compra-___ dues.", options: ["me'n", "m'en", "me les"], answer: "me'n", e: "Em + en darrere del verb: compra-me'n." },
    { type: "choice", q: "Darrere del verb, quina és correcta?", options: ["Dona-me'l.", "Dona'm-el.", "Dona-me-el."], answer: "Dona-me'l.", e: "Me + el = me'l: dona-me'l." },
    { type: "choice", q: "Te'n vas? — Sí, ___ vaig ara.", options: ["me'n", "m'en", "me"], answer: "me'n", e: "Anar-se'n: me'n vaig." }
  ],
  model: {
    title: "«La sal del vent»: Eivissa abans del turisme",
    genre: "Ressenya (Àrea 3, exercici 1 · 170-250 paraules) · obra inventada",
    text: `«La sal del vent», de la directora eivissenca Clara Marí, és una de les estrenes més esperades de la temporada. La pel·lícula està ambientada a l'Eivissa dels anys seixanta i narra la història de l'Antònia, una jove pagesa que veu com l'arribada del turisme transforma el seu poble.

El primer que crida l'atenció és la fotografia. Els paisatges de salines i camps d'ametllers estan filmats amb una llum tan càlida que l'espectador gairebé pot sentir l'olor de la sal. El repartiment, format majoritàriament per actors de les Illes, és un altre dels encerts: la protagonista transmet una barreja de curiositat i por que fa creïble cada escena.

Ara bé, la pel·lícula no és perfecta. Tot i que el ritme és àgil al principi, a la segona part decau i algunes trames secundàries queden sense resoldre. Hauria estat millor que el guió s'hagués centrat en el conflicte familiar, que és el més interessant.

Malgrat aquestes mancances, «La sal del vent» és una obra honesta que ens fa reflexionar sobre el preu del progrés. Si teniu ocasió de veure-la en versió original, no us la perdeu: els diàlegs en eivissenc li donen una autenticitat difícil de trobar. Jo ja l'he recomanada a tots els meus amics, i ara us la recomano a vosaltres.`,
    notes: [
      { quote: "està ambientada a", note: "Ressenya: on i quan passa l'obra." },
      { quote: "narra la història de", note: "Sinopsi breu, sense explicar el final." },
      { quote: "és un altre dels encerts", note: "Valoració positiva amb lèxic precís." },
      { quote: "Ara bé", note: "Canvi cap als aspectes negatius." },
      { quote: "Tot i que el ritme és àgil", note: "Valoració matisada amb concessiva." },
      { quote: "Hauria estat millor que el guió s'hagués centrat", note: "Crítica educada: condicional perfet + plusquamperfet de subjuntiu." },
      { quote: "Malgrat aquestes mancances", note: "Concessió amb nom per tancar la crítica." },
      { quote: "no us la perdeu", note: "Combinació us + la amb imperatiu negatiu." },
      { quote: "li donen una autenticitat", note: "Li: complement indirecte (a la pel·lícula)." },
      { quote: "Jo ja l'he recomanada", note: "Participi concordat amb el pronom la." },
      { quote: "us la recomano", note: "Us (a vosaltres) + la (la pel·lícula)." }
    ]
  },
  examples: [
    { ca: "Me'l deixes un parell de dies?", note: "Em + el = me'l." },
    { ca: "T'ho explicaré demà amb calma.", note: "Et + ho = t'ho." },
    { ca: "Us en recomano dues de molt bones.", note: "Us + en: quantitat." },
    { ca: "Ens la van ensenyar al museu.", note: "Ens + la." },
    { ca: "Als organitzadors, els ho vaig dir el primer dia.", note: "Els (complement indirecte) + ho." },
    { ca: "A la directora, li ho he explicat (o l'hi he explicat).", note: "Li + ho: dues formes correctes." },
    { ca: "Dona-me'l, si us plau.", note: "Darrere de l'imperatiu: dona-me'l." },
    { ca: "Explica-m'ho sense pressa.", note: "Darrere de verb acabat en vocal: -m'ho." },
    { ca: "Porta'ns-en una mica.", note: "Porta + ens + en." },
    { ca: "Se n'ha anat sense dir res.", note: "Es + en = se n' davant de vocal." },
    { ca: "Del títol, no me'n recordo.", note: "Recordar-se de → me'n." },
    { ca: "L'exposició, us la recomano de tot cor.", note: "El complement avançat es repeteix amb un pronom." },
    { ca: "La pel·lícula està ambientada a l'Eivissa dels anys seixanta.", note: "Lèxic de la ressenya: ambientació." }
  ],
  practice: [
    { type: "choice", q: "M'has portat les entrades? — Sí, ___ he portades.", options: ["te les", "t'les", "et les"], answer: "te les", e: "Et + les = te les." },
    { type: "choice", q: "Ens expliques la pel·lícula? — Sí, ___ explico.", options: ["us la", "us l'", "vos la"], answer: "us la", e: "Us + la davant de consonant: us la explico." },
    { type: "choice", q: "Has dit la veritat als teus pares? — Sí, ___ he dita.", options: ["els l'", "els la", "les hi"], answer: "els l'", e: "Els (CI) + la (CD) davant de vocal: els l'he dita." },
    { type: "choice", q: "Em dones les claus? — Ara mateix ___ dono.", options: ["te les", "te'ls", "et les"], answer: "te les", e: "Les claus: femení plural → te les." },
    { type: "choice", q: "Ens recomanes un museu? — Sí, ___ recomano un.", options: ["us en", "us n'", "vos en"], answer: "us en", e: "Quantitat (un) → en: us en recomano un." },
    { type: "choice", q: "Li has dit que vindràs? — Sí, ___ he dit.", options: ["li ho", "l'ho", "li l'"], answer: "li ho", e: "Li + ho = li ho (o l'hi)." },
    { type: "choice", q: "T'has adonat de l'error? — Sí, ___ he adonat.", options: ["me n'", "me'n", "m'en"], answer: "me n'", e: "Me + en davant de vocal: me n'he adonat." },
    { type: "choice", q: "Darrere del verb, quina és correcta?", options: ["Explica-m'ho.", "Explica'm-ho.", "Explica-me-ho."], answer: "Explica-m'ho.", e: "Verb acabat en vocal + em + ho = -m'ho." },
    { type: "choice", q: "Darrere del verb, quina és correcta?", options: ["Porta'ns-el.", "Porta-ns-el.", "Porta'ns'l."], answer: "Porta'ns-el.", e: "Porta + ens = porta'ns; + el = porta'ns-el." },
    { type: "choice", q: "Darrere del verb, quina és correcta?", options: ["Digues-li-ho.", "Digues-l'ho.", "Digues-li'ho."], answer: "Digues-li-ho.", e: "Li + ho darrere del verb: digues-li-ho (o digues-l'hi)." },
    { type: "choice", q: ok, options: ["Me l'han recomanada.", "Me la han recomanada.", "M'el han recomanat."], answer: "Me l'han recomanada.", e: "La s'apostrofa davant de vocal i el participi concorda: recomanada." },
    { type: "gap", q: "Les fotos? Envia-___ (a mi, les fotos) per correu.", answers: ["me-les"], e: "Darrere del verb: envia-me-les." },
    { type: "gap", q: "El catàleg? Ja ___ (a ell, això) he enviat.", answers: ["li ho", "l'hi"], e: "Li + ho = li ho o l'hi." },
    { type: "gap", q: "Si vols entrades, ___ (a tu, en) puc aconseguir dues.", answers: ["te'n"], e: "Et + en davant de consonant = te'n." },
    { type: "gap", q: "Aquesta cançó, ___ (a nosaltres, la cançó) cantava la meva àvia.", answers: ["ens la"], e: "Ens + la." },
    { type: "gap", q: "Vull regalar-___ (a ella, el llibre).", answers: ["li'l", "l'hi"], e: "Li + el darrere d'infinitiu: regalar-li'l o regalar-l'hi." },
    { type: "fix", q: "Corregeix: «Me lo va explicar ahir.»", answers: ["m'ho", "me'l"], e: "«Me lo» és castellà: m'ho (neutre) o me'l (masculí)." },
    { type: "fix", q: "Corregeix: «Se'l vaig donar a la directora.»", answers: ["l'hi", "li'l"], e: "«Se lo» castellà → li + el = l'hi (o li'l)." },
    { type: "fix", q: "Corregeix: «Dona-me-lo.»", answers: ["dona-me'l"], e: "Me + el = me'l: dona-me'l." },
    { type: "fix", q: "Corregeix: «T'el deixo demà.»", answers: ["te'l"], e: "Et + el = te'l." },
    { type: "fix", q: "Corregeix: «M'en vaig a casa.»", answers: ["me'n"], e: "Em + en = me'n." },
    { type: "transform", q: "Substitueix els complements per pronoms: «Dono el llibre a tu.»", answers: ["Te'l dono"], e: "A tu → et; el llibre → el: te'l." },
    { type: "transform", q: "Substitueix els complements per pronoms: «Expliquen la història als nens.»", answers: ["Els la expliquen"], e: "Als nens → els; la història → la." },
    { type: "transform", q: "Substitueix els complements per pronoms: «Hem portat flors a vosaltres.»", answers: ["Us n'hem portat"], e: "Flors sense article → en: us n'hem portat." },
    { type: "transform", q: "Substitueix els complements per pronoms: «Vull dir això a la Maria.»", answers: ["Li ho vull dir", "Vull dir-li-ho", "L'hi vull dir", "Vull dir-l'hi"], e: "Li + ho, davant o darrere del verb." },
    { type: "transform", q: "Substitueix per pronoms: «Compra pa per a mi.»", answers: ["Compra-me'n"], e: "Pa sense article → en: compra-me'n." },
    { type: "choice", q: "Ressenya: amb què comences?", options: ["Fitxa i presentació de l'obra", "La recomanació final", "Una anècdota personal llarga"], answer: "Fitxa i presentació de l'obra", e: "Títol, autor, gènere i de què tracta." },
    { type: "choice", q: "Ressenya: valoració amb registre adequat", options: ["L'obra destaca per una posada en escena molt original.", "L'obra està guai.", "L'obra mola molt."], answer: "L'obra destaca per una posada en escena molt original.", e: "Lèxic precís, sense col·loquialismes." },
    { type: "choice", q: "Ressenya: recomanació clara", options: ["No us la podeu perdre.", "Aneu-hi si voleu, a mi m'és igual.", "No sé si us agradarà."], answer: "No us la podeu perdre.", e: "Recomanació directa amb combinació us + la." },
    { type: "choice", q: "Ressenya: valoració matisada", options: ["Tot i que el ritme decau a la segona part, el final és brillant.", "El ritme decau però tant se val.", "És dolenta i ja està."], answer: "Tot i que el ritme decau a la segona part, el final és brillant.", e: "Concessiva: matisa la crítica." },
    { type: "choice", q: "Lèxic: persona que dirigeix una pel·lícula", options: ["director", "directiu", "dirigent"], answer: "director", e: "Director o directora." },
    { type: "choice", q: "Lèxic: conjunt d'actors d'una obra", options: ["repartiment", "repart", "reparto"], answer: "repartiment", e: "Repartiment." },
    { type: "choice", q: "Ortografia: quina és correcta?", options: ["pel·lícula", "pel.lícula", "película"], answer: "pel·lícula", e: "Pel·lícula, amb ela geminada." },
    { type: "choice", q: "Ortografia: quina és correcta?", options: ["exposició", "exposissió", "esposició"], answer: "exposició", e: "Exposició." },
    { type: "choice", q: "Lèxic: forma correcta", options: ["escenari", "escenario", "escenàri"], answer: "escenari", e: "Escenari." },
    { type: "choice", q: "Tria la forma: «L'obra ___ en una illa durant la postguerra.»", options: ["està ambientada", "està ambientat", "es ambienta"], answer: "està ambientada", e: "L'obra és femení: ambientada." },
    { type: "choice", q: "Vols que et deixi els apunts? — Sí, ___ deixes?", options: ["me'ls", "me les", "m'els"], answer: "me'ls", e: "Els apunts (masculí plural): em + els = me'ls." },
    { type: "choice", q: "Ja has enviat la invitació a l'Anna? — Sí, ja ___ he enviada.", options: ["la hi", "li la", "se la"], answer: "la hi", e: "Li + la = la hi (a les Balears també es diu li la)." },
    { type: "choice", q: "On has posat les claus? — ___ he posat a l'armari.", options: ["Les hi", "Els hi", "Li les"], answer: "Les hi", e: "Les (CD) + hi (lloc): les hi he posat." },
    { type: "choice", q: "Quants llibres t'han regalat? — ___ han regalat tres.", options: ["Me n'", "Me'n", "M'en"], answer: "Me n'", e: "Me + en davant de vocal (han): me n'han regalat tres." }
  ],
  skeleton: {
    brief: "Ressenya per a la revista cultural de l'illa d'una pel·lícula, una obra de teatre o una exposició que hagis vist (170 paraules).",
    template: `«___», de ___, és ___ (gènere). L'obra està ambientada ___ i narra ___.

El primer que crida l'atenció és ___. A més, ___.

Ara bé, ___. Tot i que ___, ___.

Malgrat ___, és una obra ___. Si teniu ocasió de ___, no us ___ perdeu.`,
    tips: ["Dona la fitxa (títol, autor) i una sinopsi sense explicar el final.", "Valora almenys dos aspectes positius i un de negatiu.", "Fes servir almenys dues combinacions de pronoms (us la, te'l, me'n…)."]
  },
  oral: {
    reading: "El Museu d'Art Contemporani d'Eivissa ocupa un dels edificis més emblemàtics de Dalt Vila. Les seves col·leccions mostren com l'illa va atreure, a partir dels anys cinquanta, artistes de tot el món que hi van trobar llum, llibertat i inspiració. L'entrada és gratuïta i, a més de l'exposició permanent, s'hi organitzen tallers per a famílies.",
    topic: "Recomana un llibre, una pel·lícula o una exposició que t'hagi marcat: de què tracta, què en destaques i a qui la recomanaries.",
    phrases: ["Us la recomano perquè…", "El que més m'ha agradat és…", "Tot i que…, …", "Si us agraden…, no us la perdeu.", "Me'n quedo amb…"],
    bot: "Fes d'amic/amiga escèptic que no té gaire ganes d'anar a l'exposició o la pel·lícula que l'alumne li recomana. Fes-li preguntes (de què va?, per què hauria d'anar-hi?, quant costa?) i posa objeccions perquè hagi d'argumentar i fer servir pronoms combinats."
  },
  exam: {
    brief: "La revista cultural del Consell convida els lectors a enviar ressenyes. Escriu-ne una sobre una pel·lícula, sèrie, llibre o exposició: presenta l'obra, valora'n els punts forts i febles i fes una recomanació.",
    words: 170,
    minutes: 40,
    focus: ["combinacions de pronoms (te'l, us la, me'n, li ho)", "valoració matisada (tot i que, malgrat)", "lèxic de la ressenya"],
    checklist: ["He presentat l'obra (títol, autor, de què tracta)", "He valorat aspectes positius i negatius", "He fet una recomanació clara", "He fet servir almenys dues combinacions de pronoms", "Té entre 150 i 190 paraules"]
  }
};

export const U9: FullUnit = {
  lessons: ["p13", "p5"],
  pretest: [
    { type: "choice", q: "Connector de contrast:", options: ["en canvi", "a més", "així doncs"], answer: "en canvi", e: "En canvi, tanmateix, ara bé: contrast." },
    { type: "choice", q: "Connector de conseqüència:", options: ["per tant", "malgrat això", "és a dir"], answer: "per tant", e: "Per tant, en conseqüència, per consegüent." },
    { type: "choice", q: "«___ hi ha més recursos, l'abandonament escolar no baixa.»", options: ["Tot i que", "Ja que", "Per tant"], answer: "Tot i que", e: "Concessió: tot i que, encara que, malgrat que." },
    { type: "choice", q: "Quina forma és correcta?", options: ["No obstant això", "No obstant", "Sin embargo"], answer: "No obstant això", e: "No obstant, sol, no és connector correcte." },
    { type: "choice", q: "Quina està ben puntuada?", options: ["Tanmateix, cal més inversió.", "Tanmateix cal més inversió.", "Tanmateix: cal més inversió."], answer: "Tanmateix, cal més inversió.", e: "Els connectors a principi de frase van seguits de coma." }
  ],
  model: {
    title: "Les ràtios també eduquen",
    genre: "Carta al director (Àrea 3, exercici 2 · 250 paraules)",
    text: `Senyor director:

Us escric arran de la notícia publicada dijous sobre l'augment d'alumnes per aula als instituts de l'illa. Com a docent, voldria aportar-hi el punt de vista de qui viu aquesta realitat cada dia.

En primer lloc, cal recordar que una aula amb trenta alumnes no és només una aula plena: és una aula on és gairebé impossible atendre la diversitat. D'una banda, els alumnes amb més dificultats no reben l'ajuda que necessiten; de l'altra, els que avancen més ràpidament s'avorreixen. Per tant, tothom hi perd.

Es diu sovint que reduir les ràtios és massa car. Ara bé, quant ens costa l'abandonament escolar? Les dades indiquen que les Illes tenen una de les taxes més altes de l'Estat i, per consegüent, la inversió en educació no és una despesa, sinó una necessitat.

A més a més, la situació afecta també el professorat. Tot i que la majoria de docents fem tot el possible, el cansament i les baixes augmenten cada curs. És a dir, el problema no és la manca de vocació, sinó la manca de mitjans.

En definitiva, demano a l'Administració que escolti la comunitat educativa i que planifiqui amb temps les places necessàries. Si volem una societat més justa, hem de començar per les aules.

Atentament,

Marta Torres Planells
Professora de secundària`,
    notes: [
      { quote: "Us escric arran de", note: "Obertura: motiu de la carta (arran de = a causa de, a partir de)." },
      { quote: "En primer lloc", note: "Ordena els arguments." },
      { quote: "D'una banda", note: "Parella d'ordenació: d'una banda … de l'altra." },
      { quote: "Per tant", note: "Conseqüència." },
      { quote: "Es diu sovint que", note: "Presenta el contraargument." },
      { quote: "Ara bé", note: "Contrast: comença la refutació." },
      { quote: "per consegüent", note: "Conseqüència, registre formal." },
      { quote: "no és una despesa, sinó una necessitat", note: "No… sinó: corregeix una idea. Sinó va junt i amb accent." },
      { quote: "A més a més", note: "Addició: nou argument." },
      { quote: "Tot i que", note: "Concessió." },
      { quote: "És a dir", note: "Reformulació." },
      { quote: "En definitiva", note: "Conclusió." },
      { quote: "que escolti la comunitat educativa i que planifiqui", note: "Demanar que + subjuntiu." }
    ]
  },
  examples: [
    { ca: "En primer lloc, analitzarem les causes; en segon lloc, les conseqüències.", note: "Ordenació." },
    { ca: "D'una banda, l'horari és flexible; de l'altra, és massa llarg.", note: "Parella d'ordenació i contrast." },
    { ca: "A més a més, cal tenir en compte el cost.", note: "Addició." },
    { ca: "El projecte és bo; tanmateix, arriba tard.", note: "Contrast: tanmateix, no obstant això, ara bé." },
    { ca: "Tot i que hi ha pocs recursos, els resultats milloren.", note: "Concessió: tot i que, encara que, malgrat que." },
    { ca: "Malgrat les dificultats, el curs ha anat bé.", note: "Malgrat + nom." },
    { ca: "Atès que no hi ha quòrum, la reunió s'ajorna.", note: "Causa formal: atès que, ja que." },
    { ca: "Les aules són petites; per consegüent, cal reduir les ràtios.", note: "Conseqüència formal." },
    { ca: "Volem una escola inclusiva, és a dir, que atengui tothom.", note: "Reformulació." },
    { ca: "A fi que tothom hi pugui participar, la reunió serà en línia.", note: "Finalitat + subjuntiu." },
    { ca: "No es tracta de gastar més, sinó de gastar millor.", note: "No… sinó: correcció." },
    { ca: "En definitiva, l'educació és responsabilitat de tots.", note: "Conclusió." },
    { ca: "Els alumnes i els docents van votar; aquests, a favor, i aquells, en contra.", note: "Cohesió: aquests (el més proper), aquells (el més llunyà)." }
  ],
  practice: [
    { type: "choice", q: "Connector d'addició:", options: ["a més a més", "tanmateix", "per tant"], answer: "a més a més", e: "Addició: a més (a més), també, així mateix." },
    { type: "choice", q: "Connector de concessió:", options: ["tot i que", "ja que", "a fi que"], answer: "tot i que", e: "Concessió: tot i que, encara que, malgrat que." },
    { type: "choice", q: "Connector de finalitat:", options: ["a fi que", "atès que", "en canvi"], answer: "a fi que", e: "Finalitat: a fi que, perquè (+ subjuntiu)." },
    { type: "choice", q: "Connector de reformulació:", options: ["és a dir", "no obstant això", "a causa de"], answer: "és a dir", e: "Reformulació: és a dir, o sigui, en altres paraules." },
    { type: "choice", q: "Connector de conclusió:", options: ["en definitiva", "en primer lloc", "d'una banda"], answer: "en definitiva", e: "Conclusió: en definitiva, en conclusió, en resum." },
    { type: "choice", q: "Completa: «Les ràtios són altes; ___, els resultats milloren.»", options: ["tanmateix", "per tant", "a més"], answer: "tanmateix", e: "Les dues idees s'oposen → contrast." },
    { type: "choice", q: "Completa: «No hi ha prou professorat; ___, les classes estan massificades.»", options: ["per consegüent", "tot i això", "en canvi"], answer: "per consegüent", e: "La segona idea és conseqüència de la primera." },
    { type: "choice", q: "Completa: «L'escola ha de ser inclusiva, ___, ha d'atendre la diversitat de tot l'alumnat.»", options: ["és a dir", "en canvi", "malgrat que"], answer: "és a dir", e: "Explica amb altres paraules → reformulació." },
    { type: "choice", q: "Completa: «___ els alumnes llegeixin més, la biblioteca obrirà a la tarda.»", options: ["Perquè", "Ja que", "Malgrat que"], answer: "Perquè", e: "Finalitat → perquè + subjuntiu." },
    { type: "choice", q: "Completa: «D'una banda, l'horari és flexible; ___, és massa llarg.»", options: ["de l'altra", "a més", "per tant"], answer: "de l'altra", e: "D'una banda … de l'altra (o per altra banda)." },
    { type: "choice", q: "Quina forma és correcta?", options: ["Malgrat això", "Malgrat de això", "Malgrat a això"], answer: "Malgrat això", e: "Malgrat + nom o pronom, sense preposició." },
    { type: "choice", q: "Quina forma és correcta?", options: ["per tant", "por lo tant", "pel tant"], answer: "per tant", e: "Per tant." },
    { type: "choice", q: "Quina forma és correcta?", options: ["a més a més", "ademés", "a més de més"], answer: "a més a més", e: "A més a més (o a més)." },
    { type: "choice", q: "Quina forma és correcta?", options: ["atès que", "dado que", "atés que"], answer: "atès que", e: "Atès que: causa, registre formal." },
    { type: "choice", q: "Quina forma és correcta?", options: ["en primer lloc", "en primer lugar", "primer de tot lloc"], answer: "en primer lloc", e: "En primer lloc, en segon lloc…" },
    { type: "choice", q: "Quina està ben puntuada?", options: ["Per tant, hem de canviar el model.", "Per tant hem, de canviar el model.", "Per, tant hem de canviar el model."], answer: "Per tant, hem de canviar el model.", e: "Connector + coma a principi de frase." },
    { type: "choice", q: "Cohesió: «Els alumnes i els professors van votar; aquests van votar a favor.» Qui són «aquests»?", options: ["els professors", "els alumnes", "tots"], answer: "els professors", e: "Aquests remet al més proper; aquells, al més llunyà." },
    { type: "choice", q: "Cohesió: per no repetir «els docents», quin sinònim va bé?", options: ["el professorat", "els discents", "l'alumnat"], answer: "el professorat", e: "Professorat = conjunt de docents." },
    { type: "choice", q: "Carta al director: salutació habitual", options: ["Senyor director:", "Hola director!", "Estimat amic:"], answer: "Senyor director:", e: "Senyor director, / Senyora directora, seguit de dos punts o coma." },
    { type: "choice", q: "Carta al director: quin és l'objectiu?", options: ["Expressar una opinió sobre un tema d'actualitat", "Demanar feina", "Explicar un viatge"], answer: "Expressar una opinió sobre un tema d'actualitat", e: "És un text argumentatiu breu, publicat al diari." },
    { type: "choice", q: "Quina frase rebat bé un argument?", options: ["Es diu sovint que és car. Ara bé, les dades demostren el contrari.", "Això és mentida i prou.", "No m'agrada aquesta idea."], answer: "Es diu sovint que és car. Ara bé, les dades demostren el contrari.", e: "Presentes l'argument contrari i el refutes amb dades." },
    { type: "choice", q: "Carta al director: tancament adequat", options: ["Esperant que aquestes reflexions serveixin per obrir un debat necessari.", "Res més, adeu.", "I això és tot, bon dia."], answer: "Esperant que aquestes reflexions serveixin per obrir un debat necessari.", e: "Tancament formal que reprèn l'objectiu." },
    { type: "choice", q: "Lèxic: deixar els estudis abans d'acabar-los", options: ["abandonament escolar", "fracàs familiar", "absentisme laboral"], answer: "abandonament escolar", e: "Abandonament escolar prematur." },
    { type: "choice", q: "Lèxic: nombre d'alumnes per grup", options: ["ràtio", "quota", "índex"], answer: "ràtio", e: "La ràtio (femení), amb accent." },
    { type: "fix", q: "Corregeix el connector: «Sin embargo, la proposta no convenç.»", answers: ["tanmateix", "no obstant això"], e: "Tanmateix o no obstant això." },
    { type: "fix", q: "Corregeix: «Ademés, cal reduir les ràtios.»", answers: ["a més", "a més a més"], e: "«Ademés» és castellanisme." },
    { type: "fix", q: "Corregeix: «Aixís doncs, la mesura és necessària.»", answers: ["així"], e: "Així doncs." },
    { type: "fix", q: "Corregeix l'expressió: «A nivell educatiu, la mesura és un error.»", answers: ["en l'àmbit educatiu", "pel que fa a l'educació", "des del punt de vista educatiu"], e: "«A nivell de» només és correcte amb sentit d'altura real: millor en l'àmbit de, pel que fa a." },
    { type: "fix", q: "Corregeix: «Contra més llegeixes, més aprens.»", answers: ["com"], e: "Com més…, més… (mai «contra més»)." },
    { type: "fix", q: "Corregeix: «El projecte és bo, pues té el suport de les famílies.»", answers: ["ja que", "perquè", "atès que"], e: "«Pues» és castellà: ja que, perquè." },
    { type: "transform", q: "Uneix amb «tot i que»: «Fa poc que hi treballa. Coneix bé l'escola.»", answers: ["Tot i que fa poc que hi treballa, coneix bé l'escola", "Coneix bé l'escola tot i que fa poc que hi treballa"], e: "Concessió." },
    { type: "transform", q: "Uneix amb «per tant»: «Les aules són petites. Cal reduir les ràtios.»", answers: ["Les aules són petites, per tant, cal reduir les ràtios"], e: "Conseqüència." },
    { type: "transform", q: "Evita la repetició amb un pronom: «Vaig llegir l'informe i després vaig enviar l'informe al director.»", answers: ["Vaig llegir l'informe i després el vaig enviar al director", "Vaig llegir l'informe i després vaig enviar-lo al director"], e: "Cohesió: el pronom evita repetir el nom." },
    { type: "transform", q: "Reformula amb «malgrat»: «Encara que plovia, vam fer l'excursió.»", answers: ["Malgrat la pluja, vam fer l'excursió", "Malgrat que plovia, vam fer l'excursió"], e: "Malgrat + nom o malgrat que + verb." },
    { type: "transform", q: "Uneix amb «no… sinó»: «El problema no és la vocació. El problema és la manca de mitjans.»", answers: ["El problema no és la vocació, sinó la manca de mitjans"], e: "No… sinó corregeix la primera idea." },
    { type: "gap", q: "No es tracta de gastar més, ___ de gastar millor.", answers: ["sinó"], e: "No… sinó (amb accent)." },
    { type: "gap", q: "___ que no hi ha quòrum, s'ajorna la reunió. (causa, registre formal)", answers: ["Atès"], e: "Atès que." },
    { type: "gap", q: "Hem obert la sala a la tarda ___ que tothom hi pugui estudiar. (finalitat)", answers: ["a fi"], e: "A fi que + subjuntiu." },
    { type: "gap", q: "En primer lloc, parlarem de l'horari; en ___ lloc, del pressupost.", answers: ["segon"], e: "En primer lloc, en segon lloc, finalment." },
    { type: "choice", q: "Quina és correcta?", options: ["No és car, sinó barat.", "No és car, si no barat.", "No és car, sino barat."], answer: "No és car, sinó barat.", e: "Sinó (junt i amb accent) després d'una negació. Si no = condició." }
  ],
  skeleton: {
    brief: "Carta al director del diari local en resposta a la notícia «El Govern estudia allargar el calendari escolar fins a finals de juny» (250 paraules).",
    template: `Senyor director:

Us escric arran de ___. Com a ___, voldria ___.

En primer lloc, ___. D'una banda, ___; de l'altra, ___. Per tant, ___.

Es diu sovint que ___. Ara bé, ___; per consegüent, ___.

A més a més, ___. És a dir, ___.

En definitiva, demano que ___ (subjuntiu).

Atentament,
___`,
    tips: ["Fes servir almenys vuit connectors diferents (ordenació, addició, contrast, conseqüència, reformulació, conclusió).", "Rebat un argument contrari amb una dada o un exemple.", "Evita repeticions amb pronoms i sinònims."]
  },
  oral: {
    reading: "Diversos estudis recents indiquen que l'alumnat que llegeix per plaer almenys trenta minuts al dia obté millors resultats en totes les matèries, no només en llengua. Per això, cada vegada més centres dediquen un temps diari a la lectura silenciosa. Tanmateix, els experts recorden que l'exemple de la família continua essent decisiu.",
    topic: "Deures a casa: s'haurien d'eliminar? Argumenta la teva postura i rebat la contrària.",
    phrases: ["D'una banda…; de l'altra…", "Es diu sovint que… Ara bé…", "Per consegüent…", "No es tracta de… sinó de…", "En definitiva…"],
    bot: "Fes de pare/mare que defensa que els deures són imprescindibles. L'alumne és un docent que proposa reduir-los. Discutiu amb respecte: demana-li arguments, dades i exemples, i posa-li objeccions perquè hagi de rebatre fent servir connectors."
  },
  exam: {
    brief: "El diari de l'illa ha publicat que el Govern vol reduir les hores de llengua estrangera a primària per augmentar les de matemàtiques. Escriu una carta al director en què donis la teva opinió, la defensis amb arguments i rebatis un argument contrari.",
    words: 250,
    minutes: 60,
    focus: ["connectors variats (ordenació, contrast, conseqüència, reformulació, conclusió)", "cohesió: pronoms i sinònims per evitar repeticions", "estructura de la carta al director"],
    checklist: ["He fet servir la salutació i el comiat adequats", "He explicat el motiu de la carta al principi", "He fet servir almenys vuit connectors diferents", "He rebatut un argument contrari", "He evitat repeticions", "Té entre 230 i 270 paraules"]
  }
};
