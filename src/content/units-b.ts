/** Unitats 4-6 (fase 1): medi ambient, salut i serveis, mitjans de comunicació. */
import type { UnitContent } from "./units";
import type { Example } from "./units-extra";

export type FullUnit = UnitContent & { examples: Example[] };

export const U4: FullUnit = {
  lessons: ["p4"],
  pretest: [
    { type: "choice", q: "Aquest regal és ___ la teva mare.", options: ["per a", "per", "pera"], answer: "per a", e: "Destinatari → per a." },
    { type: "choice", q: "Vam passar ___ Santa Eulària.", options: ["per", "per a", "a per"], answer: "per", e: "Lloc de pas → per." },
    { type: "choice", q: "Eivissa té més habitants ___ Formentera.", options: ["que", "de", "com"], answer: "que", e: "Comparatiu de superioritat: més … que." },
    { type: "choice", q: "Avui fa ___ calor com ahir.", options: ["tanta", "tan", "tant"], answer: "tanta", e: "Tant + nom, concordat: calor és femení → tanta calor com." },
    { type: "choice", q: "___ més plàstic fem servir, més contaminem.", options: ["Com", "Contra", "Quant"], answer: "Com", e: "Comparació proporcional: com més… més…" }
  ],
  model: {
    title: "Els residus a Eivissa",
    genre: "Explicació d'un gràfic (Àrea 3, exercici 1 · 170 paraules) · dades d'exemple",
    text: `El gràfic mostra l'evolució dels residus urbans recollits a Eivissa entre el 2018 i el 2025, en milers de tones.

En primer lloc, s'observa que la quantitat total de residus va augmentar de manera constant fins al 2019, quan va assolir el màxim: 145.000 tones. El 2020, en canvi, va caure bruscament fins a 110.000 tones, a causa de la reducció del turisme. A partir del 2021, la xifra es va recuperar i, el 2025, ja era tan alta com abans de la pandèmia.

Pel que fa al reciclatge, la tendència és més positiva. La recollida selectiva ha passat del 16 % al 31 % del total, és a dir, gairebé s'ha duplicat. Tot i això, encara és molt més baixa que la mitjana europea.

En conclusió, les dades indiquen que com més visitants rep l'illa, més residus genera. Per això, caldrien campanyes específiques per als establiments turístics i més punts de recollida per a residents i visitants.`,
    notes: [
      { quote: "El gràfic mostra", note: "Obertura: què mostra, on i en quin període." },
      { quote: "va assolir el màxim", note: "Lèxic de dades: assolir el màxim / el mínim." },
      { quote: "va caure bruscament", note: "Verb de canvi + adverbi que n'indica la intensitat." },
      { quote: "a causa de", note: "Causa. Mai «degut a»." },
      { quote: "tan alta com", note: "Igualtat amb adjectiu: tan … com." },
      { quote: "Pel que fa al reciclatge", note: "Introdueix un aspecte nou del gràfic." },
      { quote: "és a dir", note: "Reformula la dada amb paraules." },
      { quote: "molt més baixa que", note: "Comparatiu: més … que, intensificat amb molt." },
      { quote: "com més visitants rep l'illa, més residus genera", note: "Comparació proporcional: com més…, més…" },
      { quote: "per als establiments turístics", note: "Per a + destinatari (per a + els = per als)." }
    ]
  },
  examples: [
    { ca: "Aquest projecte és per a les escoles de l'illa.", note: "Per a: destinatari." },
    { ca: "El pla es va aprovar per unanimitat.", note: "Per: manera." },
    { ca: "Vam arribar per la carretera de Sant Joan.", note: "Per: lloc de pas." },
    { ca: "L'estudi va ser elaborat per un equip de biòlegs.", note: "Per: agent de la passiva." },
    { ca: "No hi van anar per la vaga d'autobusos.", note: "Per: causa." },
    { ca: "Ens ho van enviar per missatgeria.", note: "Per: mitjà." },
    { ca: "Hi ha un carril per a bicicletes.", note: "Per a + nom: finalitat." },
    { ca: "Aquest estiu ha fet més calor que mai.", note: "Més … que." },
    { ca: "La platja no és tan neta com l'any passat.", note: "Tan + adjectiu + com." },
    { ca: "Hi ha tants turistes com residents.", note: "Tant + nom concordat + com." },
    { ca: "Com més plàstic reciclem, menys residus enviem a l'abocador.", note: "Comparació proporcional." },
    { ca: "El consum s'ha disparat un 30 %, però l'any passat es va mantenir estable.", note: "Lèxic de gràfics: disparar-se, mantenir-se estable." },
    { ca: "Les vendes s'han reduït a la meitat.", note: "Reduir-se a la meitat; duplicar-se, triplicar-se." }
  ],
  practice: [
    { type: "choice", q: "Ho he fet ___ tu, perquè no et preocupis.", options: ["per", "per a", "pera"], answer: "per", e: "Motiu (a causa teva, pensant en tu) → per." },
    { type: "choice", q: "Aquesta sala és ___ reunions.", options: ["per a", "per", "a per"], answer: "per a", e: "Finalitat + nom → per a." },
    { type: "choice", q: "L'informe va ser redactat ___ la directora.", options: ["per", "per a", "de"], answer: "per", e: "Agent de la passiva → per." },
    { type: "choice", q: "T'ho envio ___ correu electrònic.", options: ["per", "per a", "amb"], answer: "per", e: "Mitjà → per." },
    { type: "choice", q: "Ens veurem ___ Nadal.", options: ["per", "per a", "a"], answer: "per", e: "Temps aproximat → per Nadal." },
    { type: "choice", q: "Hem venut el cotxe ___ 3.000 euros.", options: ["per", "per a", "a"], answer: "per", e: "Preu → per." },
    { type: "choice", q: "Tenim un pressupost ___ la campanya de reciclatge.", options: ["per a", "per", "pera"], answer: "per a", e: "Destinació → per a." },
    { type: "choice", q: "No vam sortir ___ la pluja.", options: ["per", "per a", "de"], answer: "per", e: "Causa → per." },
    { type: "gap", q: "Hem comprat flors ___ (per a + els) avis.", answers: ["per als"], e: "Per a + els = per als." },
    { type: "gap", q: "Passarem ___ (per + el) centre.", answers: ["pel"], e: "Per + el = pel." },
    { type: "gap", q: "Eivissa és més petita ___ Mallorca.", answers: ["que"], e: "Més … que." },
    { type: "gap", q: "Formentera no és tan gran ___ Eivissa.", answers: ["com"], e: "Tan … com." },
    { type: "gap", q: "Aquest estiu hi ha hagut ___ turistes com l'any passat.", answers: ["tants"], e: "Tant + nom concordat: tants turistes." },
    { type: "gap", q: "___ més llegeixes, més vocabulari aprens.", answers: ["com"], e: "Com més…, més…" },
    { type: "fix", q: "Corregeix: «Contra més recicles, millor.»", answers: ["com més"], e: "«Contra més» és un calc: com més." },
    { type: "fix", q: "Corregeix: «Aquest any és més pitjor que l'anterior.»", answers: ["pitjor"], e: "Pitjor ja és comparatiu: no porta més." },
    { type: "fix", q: "Corregeix: «És tan important que l'aigua.»", answers: ["com"], e: "Tan … com, no tan … que." },
    { type: "transform", q: "Uneix amb un comparatiu: «L'aigua és cara. La llum ho és més.»", answers: ["La llum és més cara que l'aigua"], e: "Més … que." },
    { type: "choice", q: "Quan una xifra puja molt de cop, diem que…", options: ["ha augmentat bruscament", "s'ha mantingut estable", "ha disminuït lleugerament"], answer: "ha augmentat bruscament", e: "També: s'ha disparat." },
    { type: "choice", q: "Si una xifra passa de 10 a 30, s'ha…", options: ["triplicat", "duplicat", "reduït a la meitat"], answer: "triplicat", e: "×3 = triplicar-se." },
    { type: "choice", q: "Vaig entrar ___ la porta del darrere.", options: ["per", "per a", "a per"], answer: "per", e: "Lloc de pas → per." },
    { type: "choice", q: "Ho farem ___ telèfon.", options: ["per", "per a", "a"], answer: "per", e: "Mitjà → per telèfon." },
    { type: "choice", q: "Aquest any ha plogut ___ que l'any passat.", options: ["menys", "menys de", "menor"], answer: "menys", e: "Menys … que." },
    { type: "choice", q: "És la platja ___ bonica de l'illa.", options: ["més", "tan", "molt"], answer: "més", e: "Superlatiu: la més…" },
    { type: "choice", q: "Consumim el doble d'aigua ___ fa deu anys.", options: ["que", "de", "com"], answer: "que", e: "El doble … que." },
    { type: "gap", q: "No tinc ___ temps com tu.", answers: ["tant"], e: "Tant + nom masculí singular." },
    { type: "gap", q: "Ell no corre tant ___ jo.", answers: ["com"], e: "Tant com, amb verb." },
    { type: "gap", q: "Les emissions han baixat un 10 % respecte ___ (de + el) 2020.", answers: ["del"], e: "Respecte de + el = respecte del." },
    { type: "fix", q: "Corregeix: «Degut a la sequera, falta aigua.»", answers: ["a causa de"], e: "Causa: a causa de." },
    { type: "fix", q: "Corregeix: «Ho explico per a que ho entenguis.»", answers: ["perquè", "per tal que"], e: "Finalitat amb verb conjugat: perquè." },
    { type: "transform", q: "Reformula amb com més… més: «Si fa més calor, consumim més aigua.»", answers: ["Com més calor fa, més aigua consumim"], e: "Comparació proporcional." },
    { type: "choice", q: "Una xifra que no canvia…", options: ["s'ha mantingut estable", "ha fluctuat", "s'ha disparat"], answer: "s'ha mantingut estable", e: "Mantenir-se estable." },
    { type: "choice", q: "«Gairebé s'ha duplicat» vol dir que…", options: ["ha augmentat quasi el doble", "ha baixat a la meitat", "no ha canviat"], answer: "ha augmentat quasi el doble", e: "Duplicar-se: fer-se el doble." },
    { type: "choice", q: "Per presentar un gràfic comences amb…", options: ["El gràfic mostra…", "Bueno, doncs…", "Com que sí…"], answer: "El gràfic mostra…", e: "Obertura neutra i formal." },
    { type: "choice", q: "Quin connector introdueix un nou aspecte del gràfic?", options: ["Pel que fa a", "A nivell de", "En base a"], answer: "Pel que fa a", e: "Pel que fa a / quant a." }
  ],
  skeleton: {
    brief: "Explica aquestes dades (consum d'aigua per persona i dia, en litres): 2015: 160 · 2018: 175 · 2020: 150 · 2023: 190 · 2025: 200.",
    template: `El gràfic mostra ___ entre el ___ i el ___.

En primer lloc, s'observa que ___. El 2020, en canvi, ___, a causa de ___.

A partir del 2021, ___ i, el 2025, ___ (fes servir tan… com o més… que).

Pel que fa a ___, ___.

En conclusió, ___. Per això, caldria ___ per a ___.`,
    tips: ["Fes servir verbs de canvi: augmentar, disminuir, assolir el màxim, mantenir-se estable.", "Inclou almenys dos comparatius.", "Fes servir per i per a correctament almenys una vegada cadascun."]
  },
  oral: {
    reading: "Les praderies de posidònia que hi ha entre Eivissa i Formentera són Patrimoni de la Humanitat. Aquesta planta marina oxigena l'aigua, protegeix les platges de l'erosió i fa que el mar sigui tan transparent. Tanmateix, les àncores de les embarcacions en destrueixen una part cada estiu.",
    topic: "El canvi climàtic a les Illes: causes, conseqüències i què hi podem fer.",
    phrases: ["Una de les causes principals és…", "Això es deu a…", "Com a conseqüència…", "Si no hi posem remei…", "Per evitar-ho, caldria…"],
    bot: "Fes de regidor/a de Medi Ambient d'un ajuntament d'Eivissa. L'alumne és un veí que proposa mesures per reduir els residus a l'estiu. Discuteix la viabilitat de cada proposta, posa objeccions de pressupost i arribeu a un pla d'acció."
  },
  exam: {
    brief: "Dades d'arribada de turistes a una illa (milions): 2019: 3,2 · 2020: 0,9 · 2022: 3,0 · 2024: 3,5. Escriu un text per al butlletí de l'escola que expliqui l'evolució de les dades i en tregui una conclusió.",
    words: 170,
    minutes: 40,
    focus: ["lèxic per descriure dades (augmentar, disminuir, assolir el màxim)", "comparatius (més… que, tan… com, com més… més)", "per i per a"],
    checklist: ["He presentat què mostren les dades i el període", "He descrit els canvis amb verbs variats", "He fet servir almenys dos comparatius", "He tret una conclusió", "Té entre 150 i 190 paraules"]
  }
};

export const U5: FullUnit = {
  lessons: ["p8", "p9"],
  pretest: [
    { type: "choice", q: "Quina paraula porta accent?", options: ["cafè", "examen", "jove"], answer: "cafè", e: "Aguda acabada en vocal → accent." },
    { type: "choice", q: "Com s'escriu?", options: ["la universitat", "l'universitat", "le universitat"], answer: "la universitat", e: "Davant de u àtona, l'article femení no s'apostrofa." },
    { type: "choice", q: "Tinc molta ___: arribo tard.", options: ["pressa", "presa", "preza"], answer: "pressa", e: "Pressa (urgència) amb ss; presa és «agafada» o una resclosa." },
    { type: "choice", q: "Quina forma és correcta des del 2017?", options: ["soc", "sóc", "sòc"], answer: "soc", e: "Soc ja no porta accent diacrític." },
    { type: "choice", q: "Com s'escriu?", options: ["col·legi", "colegi", "col.legi"], answer: "col·legi", e: "Ela geminada amb punt volat: l·l." }
  ],
  model: {
    title: "Sol·licitud de menú adaptat",
    genre: "Instància (Àrea 3, exercici 1 · 170 paraules)",
    text: `Dades de la persona sol·licitant
Nom i cognoms: Pere Marí Torres
Adreça: carrer d'Aragó, 23, 3r 1a, 07800 Eivissa
Telèfon: 600 000 000

EXPOSO:
1. Que el meu fill, Jan Marí Ribas, de cinc anys, té una al·lèrgia greu a la fruita seca, diagnosticada a l'hospital.
2. Que l'escola on està matriculat ofereix servei de menjador, però el menú actual no garanteix que no hi hagi aquest aliment.
3. Que adjunto l'informe mèdic que acredita la situació.

SOL·LICITO:
Que el servei de menjador proporcioni al meu fill un menú adaptat i que el personal rebi la informació necessària per actuar en cas de reacció al·lèrgica.

Eivissa, 25 de gener de 2027

[Signatura]

SRA. DIRECTORA DE L'ESCOLA`,
    notes: [
      { quote: "Dades de la persona sol·licitant", note: "Primer apartat: qui fa la petició i com contactar-hi." },
      { quote: "EXPOSO:", note: "Fets que justifiquen la petició, numerats i introduïts per «Que…»." },
      { quote: "al·lèrgia", note: "Ela geminada; porta accent perquè acaba en -ia i es considera esdrúixola." },
      { quote: "l'escola", note: "Article apostrofat davant de vocal." },
      { quote: "no hi hagi", note: "Subjuntiu després de garantir que en negatiu." },
      { quote: "Que adjunto l'informe mèdic", note: "Esment dels documents que s'hi afegeixen." },
      { quote: "SOL·LICITO:", note: "La petició, també amb «Que…» i el verb en subjuntiu." },
      { quote: "proporcioni", note: "Subjuntiu: que proporcioni, que rebi." },
      { quote: "SRA. DIRECTORA DE L'ESCOLA", note: "El destinatari va al peu, en majúscules." }
    ]
  },
  examples: [
    { ca: "Avui tinc hora amb la metgessa a les nou.", note: "Metgessa: femení de metge." },
    { ca: "M'han fet una anàlisi de sang.", note: "Anàlisi és femení i porta accent (esdrúixola)." },
    { ca: "L'infermer m'ha pres la pressió.", note: "L' davant de i en masculí; pressió amb ss." },
    { ca: "La infermera és molt amable.", note: "La davant de i àtona en femení." },
    { ca: "És important seguir el tractament.", note: "És (verb ser) amb accent diacrític." },
    { ca: "Té febre des d'ahir.", note: "Té (tenir) amb accent; d'ahir apostrofat." },
    { ca: "Vols un te calent?", note: "Te (beguda) sense accent." },
    { ca: "La farmàcia és a la plaça del mercat.", note: "Ç davant de a: plaça." },
    { ca: "He d'anar al col·legi a buscar la nena.", note: "Ela geminada amb punt volat." },
    { ca: "Tinc pressa, no puc esperar.", note: "Pressa amb ss: so de essa sorda entre vocals." },
    { ca: "Soc al·lèrgica a la penicil·lina.", note: "Soc sense accent; dues eles geminades." },
    { ca: "Dimarts que ve tinc revisió a l'ambulatori.", note: "Dimarts no porta accent: és aguda i acaba en -rts." }
  ],
  practice: [
    { type: "choice", q: "Quina està ben escrita?", options: ["anglès", "anglés", "angles"], answer: "anglès", e: "Aguda acabada en -es → accent obert." },
    { type: "choice", q: "Quina està ben escrita?", options: ["càrrec", "carréc", "carrec"], answer: "càrrec", e: "Les planes porten accent quan no acaben en vocal, -as, -es, -is, -os, -us, -en o -in." },
    { type: "choice", q: "Quina NO porta accent?", options: ["examen", "cafè", "també"], answer: "examen", e: "Plana acabada en -en → sense accent." },
    { type: "choice", q: "Ell ___ dos fills.", options: ["té", "te"], answer: "té", e: "Té (tenir) porta accent diacrític." },
    { type: "choice", q: "Vull una tassa de ___.", options: ["te", "té"], answer: "te", e: "Te (beguda) sense accent." },
    { type: "choice", q: "Això ___ meu.", options: ["és", "es"], answer: "és", e: "És (ser) amb accent." },
    { type: "choice", q: "No ___ si vindrà.", options: ["sé", "se"], answer: "sé", e: "Sé (saber) amb accent." },
    { type: "choice", q: "Com s'escriu?", options: ["l'hospital", "el hospital", "lo hospital"], answer: "l'hospital", e: "Davant de h + vocal s'apostrofa." },
    { type: "choice", q: "Com s'escriu?", options: ["la infermera", "l'infermera", "le infermera"], answer: "la infermera", e: "Femení davant de i àtona: no s'apostrofa." },
    { type: "choice", q: "Com s'escriu?", options: ["l'àvia", "la àvia"], answer: "l'àvia", e: "Davant de a sí que s'apostrofa." },
    { type: "choice", q: "Com s'escriu?", options: ["d'Eivissa", "de Eivissa"], answer: "d'Eivissa", e: "De s'apostrofa davant de vocal." },
    { type: "choice", q: "Com s'escriu?", options: ["zero", "sero", "cero"], answer: "zero", e: "So sonor a principi de paraula → z." },
    { type: "choice", q: "Com s'escriu?", options: ["pressió", "presió", "pressio"], answer: "pressió", e: "Ss entre vocals; aguda acabada en -o → accent." },
    { type: "choice", q: "Com s'escriu?", options: ["atenció", "atensió", "atenciò"], answer: "atenció", e: "-ció amb c i accent tancat." },
    { type: "choice", q: "Com s'escriu?", options: ["plaça", "plassa", "plaza"], answer: "plaça", e: "Ç davant de a." },
    { type: "choice", q: "Com s'escriu?", options: ["intel·ligent", "inteligent", "intelligent"], answer: "intel·ligent", e: "Ela geminada." },
    { type: "gap", q: "Escriu correctament: «telefon»", answers: ["telèfon"], e: "Esdrúixola → sempre accent." },
    { type: "gap", q: "Escriu correctament: «area»", answers: ["àrea"], e: "Esdrúixola → accent obert." },
    { type: "gap", q: "Escriu correctament: «paciencia»", answers: ["paciència"], e: "Acabada en -ia: es considera esdrúixola i porta accent." },
    { type: "gap", q: "Escriu correctament: «examens»", answers: ["exàmens"], e: "En plural és esdrúixola: exàmens." },
    { type: "gap", q: "Escriu correctament: «cami»", answers: ["camí"], e: "Aguda acabada en vocal." },
    { type: "gap", q: "Escriu correctament (pot ser que ja ho estigui): «medicament»", answers: ["medicament"], e: "Aguda acabada en -nt: no porta accent." },
    { type: "fix", q: "Corregeix: «L'universitat obre a les vuit.»", answers: ["la universitat"], e: "La universitat." },
    { type: "fix", q: "Corregeix: «Em fa mal el cap des de ahir.»", answers: ["des d'ahir", "d'ahir"], e: "De s'apostrofa: des d'ahir." },
    { type: "fix", q: "Corregeix: «Sóc infermera.»", answers: ["soc"], e: "Des del 2017: soc." },
    { type: "fix", q: "Corregeix: «Ha arribat la meva analisi.»", answers: ["anàlisi"], e: "Esdrúixola: anàlisi." },
    { type: "fix", q: "Corregeix: «Tinc una cita amb la pediatre.»", answers: ["la pediatra"], e: "Pediatre / pediatra; en femení, la pediatra." },
    { type: "choice", q: "En una instància, la part on expliques els fets es diu…", options: ["EXPOSO", "SOL·LICITO", "ATENTAMENT"], answer: "EXPOSO", e: "Exposo: fets. Sol·licito: petició." },
    { type: "choice", q: "La petició d'una instància comença amb…", options: ["SOL·LICITO: Que…", "Hola, vull…", "Necessito urgent…"], answer: "SOL·LICITO: Que…", e: "Fórmula fixa." },
    { type: "choice", q: "A la petició, el verb va en…", options: ["subjuntiu (que em concedeixin)", "infinitiu (concedir)", "futur (concediran)"], answer: "subjuntiu (que em concedeixin)", e: "Que + subjuntiu." },
    { type: "choice", q: "On va el destinatari d'una instància?", options: ["Al peu, en majúscules", "Al principi, amb «Hola»", "No hi va"], answer: "Al peu, en majúscules", e: "Ex.: SR. ALCALDE DE L'AJUNTAMENT D'EIVISSA." },
    { type: "choice", q: "Per indicar que hi afegeixes documents, escrius…", options: ["Que adjunto…", "Que enganxo…", "Que poso…"], answer: "Que adjunto…", e: "Adjuntar." },
    { type: "choice", q: "La sala d'espera és ___ planta baixa.", options: ["a la", "en la", "a"], answer: "a la", e: "Lloc amb article: a la planta baixa." },
    { type: "choice", q: "Quina forma és correcta?", options: ["adeu", "adéu", "adèu"], answer: "adeu", e: "Des del 2017, sense accent." },
    { type: "choice", q: "«Ells ___ de Maó.» (verb ser)", options: ["són", "son"], answer: "són", e: "Són (ser) conserva l'accent; son = dormir." }
  ],
  skeleton: {
    brief: "Redacta una instància a l'Ajuntament per sol·licitar la targeta d'aparcament per a persones amb mobilitat reduïda per a un familiar.",
    template: `Dades de la persona sol·licitant
Nom i cognoms: ___
Adreça: ___
Telèfon: ___

EXPOSO:
1. Que ___.
2. Que ___.
3. Que adjunto ___.

SOL·LICITO:
Que ___.

___, ___ de ___ de 20__

[Signatura]

SR. / SRA. ___`,
    tips: ["Revisa cada accent i cada apòstrof abans d'acabar.", "Els punts de l'EXPOSO comencen per «Que…».", "La petició va en subjuntiu: que em concedeixin, que em facin…"]
  },
  oral: {
    reading: "El centre de salut obre de dilluns a divendres, de vuit del matí a nou del vespre. Per demanar cita prèvia, podeu trucar al telèfon d'atenció a la ciutadania o fer servir l'aplicació mòbil. En cas d'urgència, adreceu-vos directament al servei d'urgències de l'hospital.",
    topic: "Explica com funciona la sanitat on vius i què milloraries.",
    phrases: ["Per demanar hora, cal…", "El que funciona millor és…", "El que caldria millorar és…", "Per exemple, l'altre dia…", "Proposaria que…"],
    bot: "Fes de funcionari/ària d'atenció a la ciutadania d'un centre de salut. L'alumne vol canviar de metge de família i demanar cita amb un especialista. Demana-li dades, explica el procediment i els documents necessaris, i posa alguna dificultat realista."
  },
  exam: {
    brief: "T'has traslladat fa poc a l'illa i vols sol·licitar a l'Ajuntament una plaça a l'escoleta municipal per al teu fill o la teva filla, fora de termini. Redacta la instància completa (dades, EXPOSO, SOL·LICITO, data i destinatari).",
    words: 170,
    minutes: 40,
    focus: ["accents i accents diacrítics", "apòstrof i ela geminada", "estructura de la instància (EXPOSO / SOL·LICITO, subjuntiu)"],
    checklist: ["Té totes les parts de la instància", "Els fets van numerats amb «Que…»", "La petició va en subjuntiu", "He revisat accents, apòstrofs i eles geminades", "Té entre 150 i 190 paraules"]
  }
};

export const U6: FullUnit = {
  lessons: ["p6"],
  pretest: [
    { type: "choice", q: "En registre formal, «Bueno, doncs…» es diu…", options: ["Bé, doncs…", "Vale, doncs…", "Bueno…"], answer: "Bé, doncs…", e: "Bueno i vale són castellanismes." },
    { type: "choice", q: "«Llevar a cabo» en català és…", options: ["dur a terme", "portar a cap", "llevar a cap"], answer: "dur a terme", e: "Dur a terme." },
    { type: "choice", q: "«El ___ acaba demà» (plazo)", options: ["termini", "plaç", "plaza"], answer: "termini", e: "Termini." },
    { type: "choice", q: "«Apretar el botó» en català és…", options: ["prémer el botó", "apretar el botó", "apretar-se el botó"], answer: "prémer el botó", e: "Prémer (o pitjar)." },
    { type: "choice", q: "«Hay que» en català és…", options: ["cal", "hi ha que", "tenim que"], answer: "cal", e: "Cal + infinitiu." }
  ],
  model: {
    title: "Sant Joan obre una biblioteca de llavors",
    genre: "Notícia (Àrea 3, exercici 1 · 170 paraules) · notícia d'exemple",
    text: `Sant Joan obre la primera biblioteca de llavors de l'illa

L'Ajuntament de Sant Joan de Labritja ha inaugurat aquest dissabte un espai on els veïns poden intercanviar llavors de varietats locals, amb l'objectiu de recuperar cultius tradicionals que estaven a punt de desaparèixer.

La biblioteca, situada a l'antic edifici de les escoles, compta amb més de tres-centes varietats de tomàtigues, faves, mongetes i cereals cedides per pagesos de l'illa. Qualsevol persona empadronada a Eivissa en pot agafar un sobre gratuïtament, amb el compromís de retornar-ne una part després de la collita.

Segons la regidora d'Agricultura, la iniciativa vol «evitar que es perdi un patrimoni que ha passat de pares a fills durant segles». Els promotors també preveuen organitzar tallers de sembra per a escoles i associacions de veïns a partir de la primavera.

L'espai obrirà els dissabtes de deu a dues i, de moment, ja s'hi han inscrit una vuitantena de famílies.`,
    notes: [
      { quote: "Sant Joan obre la primera biblioteca de llavors de l'illa", note: "Titular: breu, verb en present, sense punt final." },
      { quote: "ha inaugurat aquest dissabte", note: "Entradeta: qui, què, quan i on, en una sola frase." },
      { quote: "amb l'objectiu de recuperar", note: "L'entradeta també diu per què." },
      { quote: "compta amb", note: "Verb formal: compta amb, disposa de." },
      { quote: "en pot agafar un sobre", note: "En partitiu: d'aquestes llavors." },
      { quote: "retornar-ne una part", note: "En darrere de l'infinitiu." },
      { quote: "Segons la regidora d'Agricultura", note: "Atribució: qui ho diu." },
      { quote: "«evitar que es perdi un patrimoni", note: "Cita literal entre cometes baixes." },
      { quote: "una vuitantena", note: "Numeral col·lectiu: unes vuitanta." }
    ]
  },
  examples: [
    { ca: "Des de dilluns, la biblioteca obre més hores.", note: "Des de (mai «desde»)." },
    { ca: "Fins ara no s'havia fet res semblant.", note: "Fins (mai «hasta»)." },
    { ca: "Cal contrastar sempre la informació.", note: "Cal + infinitiu (mai «hi ha que»)." },
    { ca: "Tanmateix, l'oposició critica la mesura.", note: "Tanmateix / no obstant això (mai «sin embargo»)." },
    { ca: "Pel que fa al pressupost, el projecte és viable.", note: "Pel que fa a (mai «a nivell de»)." },
    { ca: "Els veïns se n'han assabentat per la ràdio.", note: "Assabentar-se (mai «enterar-se»)." },
    { ca: "El programa ha aconseguit una gran audiència.", note: "Aconseguir (mai «lograr»)." },
    { ca: "A causa de la pluja, s'ha ajornat la fira.", note: "A causa de (mai «degut a»)." },
    { ca: "El portaveu ho ha anunciat en roda de premsa.", note: "Roda de premsa (calc a evitar: «rueda de prensa»)." },
    { ca: "Segons fonts municipals, l'obra costarà dos milions.", note: "Atribució de la informació." },
    { ca: "L'alcaldessa ha explicat que obriran el centre a l'abril.", note: "Estil indirecte: canvi de persona i temps." },
    { ca: "La notícia ha tingut molt de ressò a les xarxes.", note: "Ressò: repercussió." }
  ],
  practice: [
    { type: "fix", q: "Corregeix: «Desde dilluns, la biblioteca obre més hores.»", answers: ["des de"], e: "Des de." },
    { type: "fix", q: "Corregeix: «Hasta ara no s'havia fet res semblant.»", answers: ["fins", "fins ara"], e: "Fins." },
    { type: "fix", q: "Corregeix: «Tenim que informar-ne els lectors.»", answers: ["hem d'", "hem de"], e: "Hem d'informar-ne." },
    { type: "fix", q: "Corregeix: «Sin embargo, l'oposició critica la mesura.»", answers: ["tanmateix", "no obstant això"], e: "Tanmateix." },
    { type: "fix", q: "Corregeix: «A nivell de pressupost, és viable.»", answers: ["pel que fa al", "quant al"], e: "Pel que fa al pressupost." },
    { type: "fix", q: "Corregeix: «Els veïns s'han enterat per la ràdio.»", answers: ["assabentat", "se n'han assabentat"], e: "Assabentar-se." },
    { type: "fix", q: "Corregeix: «El programa ha lograt una gran audiència.»", answers: ["aconseguit", "assolit"], e: "Aconseguir, assolir." },
    { type: "fix", q: "Corregeix: «Degut a la pluja, s'ha ajornat la fira.»", answers: ["a causa de"], e: "A causa de." },
    { type: "fix", q: "Corregeix: «Contra més audiència, més publicitat.»", answers: ["com més"], e: "Com més…, més…" },
    { type: "fix", q: "Corregeix: «Bueno, passem a la notícia següent.»", answers: ["bé"], e: "Bé." },
    { type: "choice", q: "Quin titular té el registre adequat?", options: ["L'Ajuntament aprova el nou pla de mobilitat", "Bueno, ja tenim pla de mobilitat!", "Vale, l'Ajuntament fa un pla"], answer: "L'Ajuntament aprova el nou pla de mobilitat", e: "Titular neutre, en present." },
    { type: "choice", q: "El primer paràgraf que resumeix el més important és…", options: ["l'entradeta", "la conclusió", "l'epíleg"], answer: "l'entradeta", e: "Entradeta o lead." },
    { type: "choice", q: "Quines preguntes respon l'entradeta?", options: ["Qui, què, on, quan i per què", "Només qui", "Com et sents"], answer: "Qui, què, on, quan i per què", e: "Les 5 W." },
    { type: "choice", q: "Per reproduir les paraules exactes d'algú fem servir…", options: ["cometes", "parèntesis", "claudàtors"], answer: "cometes", e: "Cometes baixes «»." },
    { type: "choice", q: "Quin verb d'atribució és neutre?", options: ["ha explicat", "ha confessat", "ha admès"], answer: "ha explicat", e: "Explicar, afirmar, assegurar són neutres; confessar i admetre insinuen culpa." },
    { type: "choice", q: "La notícia ha tingut molt de…", options: ["ressò", "eco", "ecos"], answer: "ressò", e: "Ressò." },
    { type: "choice", q: "Quina paraula és correcta?", options: ["esdeveniment", "aconteixement", "acontesiment"], answer: "esdeveniment", e: "Esdeveniment." },
    { type: "choice", q: "Quina paraula és correcta?", options: ["enquesta", "encuesta", "enquèsta"], answer: "enquesta", e: "Enquesta." },
    { type: "choice", q: "Com es diu «la prensa»?", options: ["la premsa", "la prensa", "el premsa"], answer: "la premsa", e: "La premsa." },
    { type: "choice", q: "Com es diu «los medios de comunicación»?", options: ["els mitjans de comunicació", "els medis de comunicació", "els mitjos de comunicació"], answer: "els mitjans de comunicació", e: "Mitjans." },
    { type: "choice", q: "La primera pàgina d'un diari és…", options: ["la portada", "la tapa", "la coberta del dia"], answer: "la portada", e: "Portada." },
    { type: "choice", q: "Quina forma és correcta?", options: ["l'audiència", "la audiència"], answer: "l'audiència", e: "Davant de a s'apostrofa." },
    { type: "gap", q: "La notícia es va difondre ___ les xarxes socials. (mitjà)", answers: ["per", "a través de"], e: "Per o a través de." },
    { type: "gap", q: "___ fonts municipals, l'obra costarà dos milions.", answers: ["segons"], e: "Segons + font." },
    { type: "gap", q: "El diari ha publicat una ___ (encuesta) sobre l'habitatge.", answers: ["enquesta"], e: "Enquesta." },
    { type: "gap", q: "Ho ha anunciat el portaveu en ___ (rueda de prensa).", answers: ["roda de premsa"], e: "Roda de premsa." },
    { type: "gap", q: "Els periodistes ___ (tienen que) contrastar la informació.", answers: ["han de"], e: "Haver de." },
    { type: "fix", q: "Corregeix: «Lo més important és la veracitat.»", answers: ["el més", "el"], e: "El més important." },
    { type: "fix", q: "Corregeix: «Ademés, la televisió local ho emetrà en directe.»", answers: ["a més"], e: "A més." },
    { type: "fix", q: "Corregeix: «Ho han portat a cap en un temps rècord.»", answers: ["dut a terme"], e: "Ho han dut a terme." },
    { type: "transform", q: "Passa a estil indirecte: L'alcaldessa diu: «Obrirem la biblioteca dissabte.»", answers: ["L'alcaldessa diu que obriran la biblioteca dissabte"], e: "Primera persona → tercera: obriran." },
    { type: "transform", q: "Passa a estil indirecte: El director va dir: «Estic molt content.»", answers: ["El director va dir que estava molt content"], e: "Present → imperfet en passat: estava." },
    { type: "choice", q: "Quina frase és d'una notícia (no d'opinió)?", options: ["El ple ha aprovat el pressupost amb 12 vots a favor.", "És vergonyós que hagin aprovat això.", "Crec que el pressupost és dolent."], answer: "El ple ha aprovat el pressupost amb 12 vots a favor.", e: "La notícia informa amb fets i dades; no opina." },
    { type: "choice", q: "On va la informació menys important en una notícia?", options: ["Al final", "Al titular", "A l'entradeta"], answer: "Al final", e: "Piràmide invertida: del més al menys important." },
    { type: "fix", q: "Corregeix: «Hi ha que contrastar les fonts.»", answers: ["cal"], e: "Obligació impersonal: cal contrastar les fonts." },
    { type: "choice", q: "Quina frase és correcta?", options: ["Fins a demà no sabrem el resultat.", "Hasta demà no sabrem el resultat.", "Fins demà a no sabrem el resultat."], answer: "Fins a demà no sabrem el resultat.", e: "Fins a + temps." }
  ],
  skeleton: {
    brief: "Escriu una notícia sobre la nova línia d'autobús nocturn entre Vila i Sant Antoni que comença a funcionar el mes que ve.",
    template: `[Titular: breu, verb en present]
___

[Entradeta: qui, què, on, quan i per què]
___ ha anunciat ___ que, a partir de ___, ___, amb l'objectiu de ___.

[Cos: detalls i dades]
La nova línia ___. Segons ___, «___».

A més, ___.

[Tancament: informació pràctica]
___.`,
    tips: ["Escriu en tercera persona i sense opinar.", "Inclou una cita literal entre cometes i atribueix-la.", "Revisa que no hi hagi cap barbarisme (desde, hasta, tenir que, degut a…)."]
  },
  oral: {
    reading: "Més de dos-cents voluntaris van participar dissabte en la jornada de neteja dels fons marins de la badia de Portmany. Els submarinistes van retirar gairebé una tona de residus, sobretot plàstics, xarxes de pesca abandonades i llaunes. Els organitzadors preveuen repetir l'activitat a la tardor.",
    topic: "Resumeix una notícia que hagis llegit o sentit aquesta setmana: què ha passat, per què és important i què en penses.",
    phrases: ["Segons he llegit a…", "La notícia explica que…", "El més rellevant és que…", "Això és important perquè…", "Personalment, crec que…"],
    bot: "Fes de company/a de feina. L'alumne t'explica una notícia de l'illa. Fes-li preguntes per aclarir detalls (qui, quan, on, per què) i, al final, demana-li la seva opinió i dona la teva."
  },
  exam: {
    brief: "Escriu una notícia per al web de l'Ajuntament sobre la jornada de neteja de la platja de Cala Llonga que van fer dissabte uns dos-cents voluntaris. Inclou-hi dades, una declaració d'una persona organitzadora i les properes activitats previstes.",
    words: 170,
    minutes: 40,
    focus: ["barbarismes i registre formal", "estructura de la notícia (titular, entradeta, cos)", "atribució de la informació i cites"],
    checklist: ["Té titular i entradeta amb qui, què, on, quan i per què", "Inclou una cita literal atribuïda", "No opina: informa amb dades", "No hi ha barbarismes", "Té entre 150 i 190 paraules"]
  }
};
