/**
 * Escoltes de pràctica (tipus Àrea 1) i dictats. Es reprodueixen amb la veu natural del servidor
 * (o la del dispositiu) dins del reproductor de l'app. Textos originals de Parla C1.
 */
import type { ChoiceItem } from "./units";

export interface Listening { id: string; title: string; kind: string; text: string; items: ChoiceItem[] }

const c = (q: string, options: string[], answer: string, e: string): ChoiceItem => ({ type: "choice", q, options, answer, e });

export const LISTENINGS: Listening[] = [
  {
    id: "l1", title: "Avís a l'aeroport", kind: "Avís públic",
    text: "Atenció, si us plau. Informem els passatgers del vol amb destinació a Barcelona, amb sortida prevista a les set i vint, que l'embarcament es farà per la porta catorze en lloc de la porta nou. A causa de la boira, el vol acumula un retard aproximat de quaranta minuts. Recordem que cada passatger pot portar a cabina una sola maleta de mà i un objecte personal. Els passatgers que necessitin assistència poden adreçar-se al personal de terra. Disculpeu les molèsties.",
    items: [
      c("Què ha canviat?", ["La porta d'embarcament", "La destinació del vol", "L'aerolínia"], "La porta d'embarcament", "«…per la porta catorze en lloc de la porta nou»."),
      c("Per què hi ha retard?", ["Per la boira", "Per una vaga", "Per un problema tècnic"], "Per la boira", "«A causa de la boira…»."),
      c("Quant de retard hi ha?", ["Uns quaranta minuts", "Unes dues hores", "Vint minuts"], "Uns quaranta minuts", "«…un retard aproximat de quaranta minuts»."),
      c("Què es pot portar a cabina?", ["Una maleta de mà i un objecte personal", "Dues maletes de mà", "Només un objecte personal"], "Una maleta de mà i un objecte personal", "És el que diu l'avís.")
    ]
  },
  {
    id: "l2", title: "Notícia: el mercat de la Marina", kind: "Notícia de ràdio",
    text: "L'Ajuntament d'Eivissa ha anunciat que el mercat de la Marina tancarà durant tres mesos per fer-hi obres de rehabilitació. Les parades es traslladaran provisionalment a la plaça del Parc, on s'instal·larà una carpa amb capacitat per a vint comerciants. Segons la regidora de Comerç, l'objectiu és millorar l'accessibilitat de l'edifici i instal·lar plaques solars a la coberta. Alguns venedors, però, temen perdre clients durant l'estiu i demanen que les obres es facin a l'hivern. L'Ajuntament ha respost que el calendari depèn de les ajudes europees i que no es pot modificar.",
    items: [
      c("Quant de temps tancarà el mercat?", ["Tres mesos", "Tot l'estiu", "Un any"], "Tres mesos", "«…tancarà durant tres mesos»."),
      c("On aniran les parades?", ["A una carpa a la plaça del Parc", "A un altre mercat", "Al port"], "A una carpa a la plaça del Parc", "«…es traslladaran provisionalment a la plaça del Parc»."),
      c("Què volen alguns venedors?", ["Que les obres es facin a l'hivern", "Que no es facin obres", "Més parades a la carpa"], "Que les obres es facin a l'hivern", "Temen perdre clients a l'estiu."),
      c("Per què no es pot canviar el calendari?", ["Depèn de les ajudes europees", "Ja s'han començat les obres", "La regidora no vol"], "Depèn de les ajudes europees", "És la resposta de l'Ajuntament.")
    ]
  },
  {
    id: "l3", title: "Entrevista a una biòloga marina", kind: "Entrevista",
    text: "— Per què és tan important la posidònia? — Perquè és el pulmó del nostre mar. Una sola hectàrea de posidònia produeix més oxigen que una hectàrea de bosc, i a més fixa la sorra i evita que les platges desapareguin. — Quin és el principal perill? — Sens dubte, les àncores. Quan una embarcació ancora damunt la praderia, arrenca plantes que han trigat segles a créixer. — I què pot fer un turista? — Informar-se abans de sortir a navegar. Hi ha aplicacions que indiquen on es pot ancorar sense fer malbé el fons, i també boies ecològiques gratuïtes.",
    items: [
      c("Per què diu que la posidònia és el pulmó del mar?", ["Produeix molt d'oxigen", "Filtra els plàstics", "Hi viuen molts peixos"], "Produeix molt d'oxigen", "«…produeix més oxigen que una hectàrea de bosc»."),
      c("Quin altre benefici té?", ["Evita que les platges desapareguin", "Fa l'aigua més calenta", "Atreu turistes"], "Evita que les platges desapareguin", "«…fixa la sorra i evita que les platges desapareguin»."),
      c("Quin és el principal perill?", ["Les àncores", "La pesca", "Els banyistes"], "Les àncores", "«Sens dubte, les àncores»."),
      c("Què recomana als turistes?", ["Informar-se abans de navegar", "No banyar-se a l'estiu", "Llogar barques petites"], "Informar-se abans de navegar", "Hi ha aplicacions i boies ecològiques.")
    ]
  },
  {
    id: "l4", title: "Missatge al contestador", kind: "Missatge personal",
    text: "Hola, Marta, soc en Toni, de l'acadèmia. Et truco per la classe de dijous: la professora està malalta i l'hem hagut de passar a divendres a la mateixa hora, de sis a vuit. Si no hi pots venir, avisa'ns abans de dimecres i et reservarem plaça al grup de dissabte al matí. Ah, i recorda que has de portar la redacció que vau començar dimarts. Qualsevol cosa, truca'm al mòbil. Fins aviat!",
    items: [
      c("Per què es canvia la classe?", ["La professora està malalta", "És festiu", "Hi ha obres a l'acadèmia"], "La professora està malalta", "«…la professora està malalta»."),
      c("Quan serà la classe?", ["Divendres de sis a vuit", "Dijous de sis a vuit", "Dissabte al matí"], "Divendres de sis a vuit", "«…l'hem hagut de passar a divendres a la mateixa hora»."),
      c("Què ha de fer la Marta si no hi pot anar?", ["Avisar abans de dimecres", "Anar-hi dijous", "Enviar un correu a la professora"], "Avisar abans de dimecres", "Així li reservaran plaça dissabte."),
      c("Què ha de portar?", ["La redacció començada dimarts", "El llibre de text", "Un certificat"], "La redacció començada dimarts", "«…has de portar la redacció que vau començar dimarts».")
    ]
  },
  {
    id: "l5", title: "Opinió: la setmana de quatre dies", kind: "Tertúlia",
    text: "Jo no estic en contra de la setmana de quatre dies, però crec que no es pot aplicar igual a tots els sectors. En una oficina potser funciona: hi ha estudis que diuen que la gent és més productiva i que s'agafen menys baixes. Ara bé, en l'hostaleria, que és el motor de la nostra economia, seria molt difícil. Qui atendria els clients el divendres? Caldria contractar més personal, i moltes empreses petites no s'ho poden permetre. Per això proposo començar amb proves pilot voluntàries i avaluar-ne els resultats abans de fer cap llei.",
    items: [
      c("Quina és la postura de la persona que parla?", ["A favor amb matisos", "Totalment en contra", "Totalment a favor"], "A favor amb matisos", "«No estic en contra…, però…»."),
      c("On creu que seria difícil d'aplicar?", ["A l'hostaleria", "A les oficines", "A l'Administració"], "A l'hostaleria", "«…en l'hostaleria… seria molt difícil»."),
      c("Quin problema esmenta per a les empreses petites?", ["No poden contractar més personal", "No tenen oficines", "Tenen massa baixes"], "No poden contractar més personal", "«…moltes empreses petites no s'ho poden permetre»."),
      c("Què proposa?", ["Proves pilot voluntàries", "Una llei immediata", "Prohibir-la"], "Proves pilot voluntàries", "«…proposo començar amb proves pilot voluntàries».")
    ]
  },
  {
    id: "l6", title: "Instruccions: inscripció a la prova", kind: "Informació administrativa",
    text: "Per inscriure-vos a les proves de certificació de català heu d'emplenar el formulari en línia dins el termini establert a la convocatòria. Necessitareu el document d'identitat i, si sou funcionaris o teniu discapacitat, la documentació que ho acrediti per sol·licitar l'exempció de taxes. Una vegada fet el pagament, rebreu un correu de confirmació. Les llistes provisionals d'admesos es publicaran al web i tindreu deu dies hàbils per presentar-hi reclamacions. El dia de la prova heu de dur el document d'identitat original i un bolígraf blau o negre.",
    items: [
      c("Com es fa la inscripció?", ["Amb un formulari en línia", "Presencialment a l'escola", "Per telèfon"], "Amb un formulari en línia", "«…emplenar el formulari en línia»."),
      c("Qui pot demanar l'exempció de taxes?", ["Funcionaris i persones amb discapacitat (acreditant-ho)", "Tothom", "Només els estudiants"], "Funcionaris i persones amb discapacitat (acreditant-ho)", "Cal la documentació que ho acrediti."),
      c("Quant de temps hi ha per reclamar?", ["Deu dies hàbils", "Un mes", "Quinze dies naturals"], "Deu dies hàbils", "«…deu dies hàbils per presentar-hi reclamacions»."),
      c("Què cal portar el dia de la prova?", ["El document d'identitat original i un bolígraf blau o negre", "Una fotocòpia del DNI i un llapis", "El justificant de pagament imprès"], "El document d'identitat original i un bolígraf blau o negre", "És el que indiquen les instruccions.")
    ]
  },
  {
    id: "l7", title: "Reportatge: tornar a viure al camp", kind: "Reportatge",
    text: "Fa cinc anys, la Neus i el seu company van deixar la feina a Barcelona i van venir a viure a una casa pagesa de Sant Mateu. Ara cultiven verdura ecològica i la venen per encàrrec a una cinquantena de famílies. Reconeixen que els inicis van ser durs: la casa no tenia aigua corrent i el primer hivern van haver de viure amb una estufa de llenya. Però diuen que no tornarien enrere. El que més valoren és el temps: abans passaven dues hores al dia al cotxe i ara poden dinar cada dia amb la seva filla. L'any que ve volen obrir un petit obrador per fer conserves.",
    items: [
      c("D'on venien la Neus i el seu company?", ["De Barcelona", "De Palma", "De València"], "De Barcelona", "«…van deixar la feina a Barcelona»."),
      c("A què es dediquen ara?", ["A cultivar i vendre verdura ecològica", "A llogar habitacions", "A fer conserves"], "A cultivar i vendre verdura ecològica", "Les conserves són un projecte de futur."),
      c("Quina dificultat van tenir al principi?", ["La casa no tenia aigua corrent", "No trobaven clients", "No sabien català"], "La casa no tenia aigua corrent", "«…la casa no tenia aigua corrent»."),
      c("Què és el que més valoren?", ["Tenir més temps", "Guanyar més diners", "Viure a prop de la platja"], "Tenir més temps", "«El que més valoren és el temps».")
    ]
  },
  {
    id: "l8", title: "Conferència: llegir en paper o en pantalla", kind: "Conferència",
    text: "Durant molt de temps vam pensar que llegir en paper o en pantalla era el mateix. Tanmateix, les investigacions dels darrers anys indiquen que, quan es tracta de textos llargs i complexos, comprenem millor el que llegim en paper. Una de les explicacions és que a la pantalla tendim a llegir més de pressa i en diagonal, buscant paraules clau. Això no vol dir que hàgim de renunciar a la tecnologia, sinó que hem d'aprendre a llegir-hi amb calma. Els experts recomanen, per exemple, desactivar les notificacions i fer pauses per resumir mentalment el que acabem de llegir.",
    items: [
      c("Què indiquen les investigacions?", ["Els textos llargs s'entenen millor en paper", "Es llegeix més ràpid en paper", "No hi ha cap diferència"], "Els textos llargs s'entenen millor en paper", "«…comprenem millor el que llegim en paper»."),
      c("Per què es comprèn pitjor en pantalla?", ["Llegim més de pressa i en diagonal", "La lletra és més petita", "Ens cansem la vista"], "Llegim més de pressa i en diagonal", "És l'explicació que dona."),
      c("Què conclou la persona que parla?", ["Cal aprendre a llegir amb calma en pantalla", "Cal abandonar les pantalles", "Només s'ha de llegir en paper"], "Cal aprendre a llegir amb calma en pantalla", "«…no vol dir que hàgim de renunciar a la tecnologia, sinó…»."),
      c("Quin consell dona?", ["Desactivar les notificacions", "Llegir de nit", "Fer servir tauletes grans"], "Desactivar les notificacions", "També fer pauses per resumir.")
    ]
  }
  ,
  {
    id: "l9", title: "Previsió del temps", kind: "Ràdio",
    text: "Bon dia. Per avui, a les Pitiüses, el cel estarà ennuvolat durant el matí i no es descarten ruixats dèbils a l'interior d'Eivissa. A partir del migdia, el vent de tramuntana anirà netejant el cel i la tarda serà assolellada. Les temperatures baixaran lleugerament: les màximes no passaran dels disset graus i les mínimes rondaran els nou. La mar estarà maregassa al nord, amb onades de fins a dos metres, de manera que es recomana precaució a les embarcacions petites. Per al cap de setmana, temps estable i més calor.",
    items: [
      c("Com serà el matí?", ["Ennuvolat amb possibles ruixats", "Assolellat", "Amb neu"], "Ennuvolat amb possibles ruixats", "«…ennuvolat durant el matí i no es descarten ruixats»."),
      c("Què passarà a la tarda?", ["El cel s'aclarirà", "Plourà més", "Hi haurà boira"], "El cel s'aclarirà", "La tramuntana netejarà el cel."),
      c("Quina serà la temperatura màxima?", ["Uns disset graus", "Uns nou graus", "Uns vint-i-cinc graus"], "Uns disset graus", "Nou graus és la mínima."),
      c("Què es recomana?", ["Precaució a les embarcacions petites", "No sortir de casa", "Anar a la platja"], "Precaució a les embarcacions petites", "Per les onades al nord.")
    ]
  },
  {
    id: "l10", title: "A la farmàcia", kind: "Diàleg",
    text: "— Bon dia. Tenen alguna cosa per al mal de coll? — Sí, és clar. Té febre o tos? — Una mica de tos, sobretot a la nit, però febre no. — D'acord. Li puc donar aquestes pastilles per xuclar: en pot prendre una cada quatre hores, però no més de sis al dia. Si d'aquí a tres dies no millora, hauria d'anar al metge. — Molt bé. I per a la tos? — Prengui aquest xarop abans d'anar a dormir. Són dotze euros amb quaranta en total. — Puc pagar amb targeta? — I tant.",
    items: [
      c("Què li passa a la clienta?", ["Té mal de coll i una mica de tos", "Té febre alta", "Té mal d'esquena"], "Té mal de coll i una mica de tos", "No té febre."),
      c("Cada quant pot prendre les pastilles?", ["Cada quatre hores", "Cada sis hores", "Una vegada al dia"], "Cada quatre hores", "I no més de sis al dia."),
      c("Quan ha d'anar al metge?", ["Si en tres dies no millora", "Immediatament", "Si li puja la febre demà"], "Si en tres dies no millora", "És el consell de la farmacèutica."),
      c("Quan s'ha de prendre el xarop?", ["Abans d'anar a dormir", "Després de dinar", "En llevar-se"], "Abans d'anar a dormir", "«…abans d'anar a dormir».")
    ]
  },
  {
    id: "l11", title: "Anunci: curs de cuina eivissenca", kind: "Anunci",
    text: "Vols aprendre a fer el sofrit pagès, la borrida de ratjada o el flaó com ho feien les nostres àvies? L'Escola d'Hostaleria organitza un curs de cuina tradicional eivissenca els dimecres de vuit a deu del vespre, del quinze de gener al dinou de març. El curs té un preu de cent vint euros, ingredients inclosos, i les places són limitades a quinze persones. Els aturats i els majors de seixanta-cinc anys tenen un descompte del cinquanta per cent. Inscripcions al web de l'escola o per telèfon fins al deu de gener.",
    items: [
      c("Quin dia de la setmana és el curs?", ["Dimecres", "Dilluns", "Dissabte"], "Dimecres", "«…els dimecres de vuit a deu del vespre»."),
      c("Què inclou el preu?", ["Els ingredients", "El sopar", "Un llibre de receptes"], "Els ingredients", "«…cent vint euros, ingredients inclosos»."),
      c("Quantes places hi ha?", ["Quinze", "Cinquanta", "Vint"], "Quinze", "Places limitades a quinze persones."),
      c("Qui té descompte?", ["Aturats i majors de 65 anys", "Estudiants", "Tothom que s'inscrigui aviat"], "Aturats i majors de 65 anys", "Un 50 % de descompte.")
    ]
  },
  {
    id: "l12", title: "Entrevista: una mestra jubilada", kind: "Entrevista",
    text: "— Quants anys va fer de mestra? — Quaranta-dos, sempre a la mateixa escola de Sant Joan. Vaig començar quan encara hi havia una sola aula per a nens de totes les edats. — Què ha canviat més? — Sens dubte, la diversitat. Ara a una classe hi pot haver alumnes de deu països diferents, i això és una riquesa, però també un repte. — I què troba a faltar? — El contacte amb els nens, la seva curiositat. Encara hi vaig un dia a la setmana a llegir contes als més petits. — Quin consell donaria als mestres joves? — Que escoltin molt i que no perdin mai la paciència: cada nen té el seu ritme.",
    items: [
      c("Quants anys va treballar de mestra?", ["Quaranta-dos", "Vint-i-quatre", "Trenta-dos"], "Quaranta-dos", "«Quaranta-dos, sempre a la mateixa escola»."),
      c("Què diu que ha canviat més?", ["La diversitat de l'alumnat", "Els horaris", "Els llibres"], "La diversitat de l'alumnat", "Alumnes de molts països."),
      c("Què fa ara un dia a la setmana?", ["Llegeix contes als petits", "Fa classes de repàs", "Treballa a la biblioteca"], "Llegeix contes als petits", "«…a llegir contes als més petits»."),
      c("Quin consell dona?", ["Escoltar molt i tenir paciència", "Ser molt exigent", "Fer servir més tecnologia"], "Escoltar molt i tenir paciència", "Cada nen té el seu ritme.")
    ]
  },
  {
    id: "l13", title: "Notícia: nou carril bici", kind: "Notícia",
    text: "El Consell d'Eivissa ha inaugurat aquest dissabte el nou carril bici que uneix Vila amb Sant Jordi. El recorregut té set quilòmetres i passa pel costat de ses Salines, cosa que permetrà als ciclistes gaudir del paisatge sense compartir la carretera amb els cotxes. Les obres han costat un milió i mig d'euros i s'han finançat en part amb fons europeus. Les associacions de ciclistes celebren la iniciativa, però recorden que encara falten aparcaments per a bicicletes a la ciutat i demanen que el carril s'allargui fins a l'aeroport.",
    items: [
      c("Quins llocs uneix el carril?", ["Vila i Sant Jordi", "Vila i Santa Eulària", "Sant Antoni i l'aeroport"], "Vila i Sant Jordi", "Ho diu al principi."),
      c("Quant fa el recorregut?", ["Set quilòmetres", "Setze quilòmetres", "Un quilòmetre i mig"], "Set quilòmetres", "«El recorregut té set quilòmetres»."),
      c("Com s'han finançat les obres?", ["En part amb fons europeus", "Només amb diners del Consell", "Amb donacions"], "En part amb fons europeus", "«…en part amb fons europeus»."),
      c("Què demanen els ciclistes?", ["Allargar-lo fins a l'aeroport i més aparcaments", "Tancar la carretera", "Fer-lo de pagament"], "Allargar-lo fins a l'aeroport i més aparcaments", "És el que reclamen.")
    ]
  },
  {
    id: "l14", title: "Missatge de la tutora", kind: "Missatge",
    text: "Bona tarda, famílies. Us escric per recordar-vos que dijous que ve farem la sortida al Museu Puget. Els alumnes han de ser a l'escola a les vuit i mitja, perquè l'autobús surt a les nou en punt. Cal que portin l'esmorzar, aigua i roba còmoda. Tornarem cap a la una i mitja. Si algú té alguna al·lèrgia alimentària o necessita prendre algun medicament, digueu-m'ho abans de dimarts. Recordeu també que l'autorització signada és imprescindible: sense autorització, l'alumne s'haurà de quedar a l'escola amb un altre grup. Moltes gràcies.",
    items: [
      c("A quina hora han de ser a l'escola?", ["A les vuit i mitja", "A les nou en punt", "A la una i mitja"], "A les vuit i mitja", "L'autobús surt a les nou."),
      c("Què han de portar els alumnes?", ["Esmorzar, aigua i roba còmoda", "Diners per a l'entrada", "Una llibreta"], "Esmorzar, aigua i roba còmoda", "Ho diu el missatge."),
      c("Què cal comunicar abans de dimarts?", ["Al·lèrgies o medicaments", "Si l'alumne no hi va", "El telèfon dels pares"], "Al·lèrgies o medicaments", "«…digueu-m'ho abans de dimarts»."),
      c("Què passa si no porten l'autorització?", ["Es queden a l'escola amb un altre grup", "No passa res", "Han de pagar més"], "Es queden a l'escola amb un altre grup", "L'autorització és imprescindible.")
    ]
  }
];

/** Frases de dictat centrades en les trampes ortogràfiques de l'examen. */
export const DICTATIONS: string[] = [
  "L'any passat vaig començar a estudiar català a l'escola d'adults.",
  "La infermera em va dir que l'anàlisi estaria a punt dimecres.",
  "Hem d'organitzar una reunió per parlar del pressupost.",
  "Aquesta il·lusió no la perdré mai, encara que sigui difícil.",
  "Els veïns es queixen del soroll que fan les obres del carrer.",
  "Tanmateix, la majoria de les persones enquestades no hi està d'acord.",
  "El col·legi ha organitzat una exposició sobre la història de l'illa.",
  "Si tingués més temps, faria un curs d'informàtica.",
  "No crec que el govern aprovi la llei abans de l'estiu.",
  "Vaig rebre la teva sol·licitud ahir a la tarda.",
  "Els joves fan servir les xarxes socials per informar-se.",
  "A l'hivern, les platges d'Eivissa estan gairebé buides.",
  "Me'n vaig a casa perquè ja és molt tard.",
  "El metge m'ha receptat unes pastilles per al mal de cap.",
  "Hi ha massa cotxes aparcats davant de l'escola.",
  "Malgrat la pluja, l'excursió es va fer igualment.",
  "La conferència començarà a les set en punt a la sala gran.",
  "Cal que tothom porti el document d'identitat original.",
  "Els aqüífers de l'illa es troben en una situació delicada.",
  "Vull que m'expliquis com has aconseguit aprovar l'examen.",
  "La pel·lícula està ambientada a l'Eivissa dels anys seixanta.",
  "El professorat reclama una reducció de les ràtios.",
  "Atès que no hi ha quòrum, la reunió s'ajorna fins dijous.",
  "És imprescindible que protegim la posidònia de les àncores.",
  "En definitiva, l'educació és una responsabilitat compartida."
];
