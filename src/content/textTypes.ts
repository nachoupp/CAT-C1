/** Guies d'estil per tipus de text (Àrea 3 del C1): estructura, registre, fórmules i connectors. */
export interface GenreStep { id: string; label: string; hint: string; openers: string[]; detect: RegExp }
export interface Genre {
  id: string; name: string; register: string; summary: string;
  steps: GenreStep[]; connectors: string[]; avoid: string[];
}


export const GENRES: Genre[] = [
  {
    id: "carta-formal", name: "Carta formal", register: "Formal · «vostè»",
    summary: "Carta a una persona o entitat que no coneixes: cortesia, to neutre i petició clara.",
    steps: [
      { id: "salut", label: "Salutació", hint: "Cortès i sense nom si no el saps.", openers: ["Estimat senyor, / Estimada senyora,", "Senyores i senyors,", "Benvolgut senyor Soler,"], detect: /^\s*(estimad|benvolgud|senyor|senyora)/i },
      { id: "motiu", label: "Presentació i motiu", hint: "Qui ets i per què escrius, en una frase.", openers: ["Em dirigeixo a vostè/vostès per…", "Li escric amb la finalitat de…", "Arran de l'anunci publicat a…, voldria…"], detect: /(em dirigeixo|li escric|us escric|amb motiu|arran de|en relació amb)/i },
      { id: "desenv", label: "Desenvolupament", hint: "Detalls i arguments, ordenats en un o dos paràgrafs.", openers: ["En primer lloc, …", "D'altra banda, …", "A més a més, …"], detect: /(en primer lloc|d'una banda|d'altra banda|a més|així mateix)/i },
      { id: "peticio", label: "Petició o proposta", hint: "Què demanes exactament; amb condicional de cortesia.", openers: ["Per això, els agrairia que…", "Per tant, voldria sol·licitar-los…", "Em plauria que…"], detect: /(agrairia|voldria|sol·licit|em plauria|els demano|us demano)/i },
      { id: "tancament", label: "Comiat", hint: "Agraïment i fórmula de tancament.", openers: ["Quedo a la seva disposició per a qualsevol aclariment.", "Els agraeixo per endavant l'atenció prestada.", "Atentament,", "Cordialment,"], detect: /(atentament|cordialment|salutacions|a la seva disposició|agraeixo)/i }
    ],
    connectors: ["en primer lloc", "a més a més", "tanmateix", "per tant", "així doncs", "en conseqüència", "pel que fa a"],
    avoid: ["col·loquialismes", "abreviatures (pq, xq)", "«tu» i «vosaltres» sense motiu", "frases massa llargues sense punt"]
  },
  {
    id: "correu-formal", name: "Correu electrònic formal", register: "Formal · més directe",
    summary: "Correu professional: assumpte clar, missatge breu i acció final.",
    steps: [
      { id: "salut", label: "Salutació", hint: "«Bon dia,» o «Estimat/ada + nom».", openers: ["Bon dia,", "Estimada senyora Puig,", "Benvolgut senyor,"], detect: /^\s*(bon dia|bona tarda|estimad|benvolgud|hola)/i },
      { id: "motiu", label: "Motiu", hint: "La primera frase diu per què escrius.", openers: ["Us escric per…", "Em poso en contacte amb vostès per…", "Voldria informar-los que…"], detect: /(us escric|li escric|em poso en contacte|voldria informar|en relació amb)/i },
      { id: "detall", label: "Detalls", hint: "Dades concretes: dates, xifres, noms.", openers: ["Concretament, …", "Com ja vam comentar, …", "Adjunto…"], detect: /(concretament|com ja|adjunt|el proper|a partir)/i },
      { id: "accio", label: "Acció que esperes", hint: "Què cal que facin i quan.", openers: ["Els agrairia que em confirmessin…", "Podrien fer-me arribar…?", "Quedo a l'espera de la seva resposta."], detect: /(agrairia|a l'espera|podrien|confirm|resposta)/i },
      { id: "tancament", label: "Comiat", hint: "Breu i cordial.", openers: ["Cordialment,", "Rebeu una salutació cordial,", "Gràcies per endavant."], detect: /(cordialment|salutació|salutacions|gràcies per endavant|atentament)/i }
    ],
    connectors: ["a més", "per això", "per tant", "en canvi", "en tot cas", "pel que fa a"],
    avoid: ["emojis", "majúscules sostingudes", "«xq», «tb»", "assumptes buits"]
  },
  {
    id: "reclamacio", name: "Carta de reclamació", register: "Formal · ferm i educat",
    summary: "Expliques el problema, el que n'esperes i el termini: ferm però sense insults.",
    steps: [
      { id: "salut", label: "Salutació", hint: "Adreça't a l'empresa o a l'atenció al client.", openers: ["A l'atenció del Servei d'Atenció al Client,", "Estimats senyors,"], detect: /^\s*(a l'atenció|estimad|senyor|benvolgud)/i },
      { id: "motiu", label: "Motiu de la reclamació", hint: "Digues què reclames i quan va passar.", openers: ["Em dirigeixo a vostès per presentar una reclamació sobre…", "El passat dia … vaig contractar/adquirir…"], detect: /(reclamaci|el passat|vaig (contractar|comprar|adquirir)|en data)/i },
      { id: "fets", label: "Exposició dels fets", hint: "Cronologia clara: què va fallar i què vas fer.", openers: ["Malgrat que…, …", "Tot i haver contactat amb…, …", "Com a conseqüència, …"], detect: /(malgrat|tot i|com a conseqüència|des de llavors|fins ara)/i },
      { id: "peticio", label: "Què demanes", hint: "Solució concreta: reemborsament, reparació, indemnització.", openers: ["Per tot això, sol·licito…", "Exigeixo, per tant, que…", "Els demano que, en un termini de 15 dies, …"], detect: /(sol·licito|exigeixo|demano|reemborsament|indemnitz|termini)/i },
      { id: "tancament", label: "Advertència i comiat", hint: "Pots esmentar les accions següents, amb cortesia.", openers: ["En cas contrari, em veuré obligat/ada a emprendre accions legals.", "A l'espera de la seva resposta, els saludo atentament."], detect: /(en cas contrari|accions|a l'espera|atentament|cordialment)/i }
    ],
    connectors: ["malgrat que", "tanmateix", "a causa de", "per aquest motiu", "en conseqüència", "tot i que"],
    avoid: ["insults o ironia", "to emocional exagerat", "reclamar sense dades (dates, imports)"]
  },
  {
    id: "carta-director", name: "Carta al director", register: "Formal · opinió pública",
    summary: "Opinió breu sobre un tema d'actualitat, amb un argument central i un tancament que convenci.",
    steps: [
      { id: "salut", label: "Capçalera", hint: "«Senyor director,» o «Al director:».", openers: ["Senyor director,", "Estimat director,"], detect: /^\s*(senyor director|estimat director|al director)/i },
      { id: "context", label: "Context i tesi", hint: "A què respons i quina és la teva postura.", openers: ["En relació amb la notícia publicada el dia…, voldria manifestar…", "Em sembla preocupant que…", "No puc estar-hi més d'acord/en desacord amb…"], detect: /(en relació amb|notícia|em sembla|voldria manifestar|crec que|considero)/i },
      { id: "arguments", label: "Arguments", hint: "Dos arguments amb exemple o dada.", openers: ["En primer lloc, …", "Cal tenir en compte que…", "Per exemple, …"], detect: /(en primer lloc|cal tenir en compte|per exemple|d'una banda|d'altra banda)/i },
      { id: "conclusio", label: "Conclusió", hint: "Una frase final que tanqui amb força.", openers: ["En definitiva, …", "Per tot això, cal que…", "Esperem que les autoritats…"], detect: /(en definitiva|en resum|per tot això|esperem|és hora)/i },
      { id: "signatura", label: "Signatura", hint: "Nom i localitat.", openers: ["Maria Ferrer, Eivissa"], detect: /(\n|^)\s*[A-ZÀ-Ú][\wà-ú.' -]+,\s*[A-ZÀ-Ú]/ }
    ],
    connectors: ["en definitiva", "cal tenir en compte que", "malgrat tot", "és evident que", "en canvi", "per això"],
    avoid: ["atacs personals", "generalitzacions sense dades", "to massa col·loquial"]
  },
  {
    id: "opinio", name: "Article d'opinió / text argumentatiu", register: "Formal · persuasiu",
    summary: "Tesi clara, arguments ordenats, contraarguments i conclusió.",
    steps: [
      { id: "intro", label: "Introducció i tesi", hint: "Enganxa el lector i digues què defensaràs.", openers: ["Cada vegada és més habitual que…", "Ningú no dubta que…, però…", "Aquest article defensa que…"], detect: /(cada vegada|ningú no dubta|defensa|és innegable|sembla que)/i },
      { id: "arg1", label: "Primer argument", hint: "Idea + explicació + exemple.", openers: ["En primer lloc, …", "Un dels principals motius és que…"], detect: /(en primer lloc|un dels motius|principal)/i },
      { id: "arg2", label: "Segon argument", hint: "Aporta un punt de vista diferent.", openers: ["D'altra banda, …", "A més, …", "Així mateix, …"], detect: /(d'altra banda|a més|així mateix|també cal)/i },
      { id: "contra", label: "Contraargument", hint: "Reconeix l'altra postura i respon-hi.", openers: ["Tot i que hi ha qui pensa que…, …", "Els detractors d'aquesta idea afirmen que…, però…"], detect: /(tot i que hi ha|hi ha qui|detractors|alguns defensen|és cert que)/i },
      { id: "conclusio", label: "Conclusió", hint: "Recull la tesi i tanca amb una proposta.", openers: ["En conclusió, …", "Per tot això, cal…", "En definitiva, …"], detect: /(en conclusi|en definitiva|en resum|per tot això)/i }
    ],
    connectors: ["en primer lloc", "a més a més", "d'altra banda", "no obstant això", "tanmateix", "és per això que", "en definitiva", "cal destacar que"],
    avoid: ["«jo penso que» repetit", "frases curtes en cadena", "opinions sense arguments"]
  },
  {
    id: "informe", name: "Informe", register: "Formal · objectiu",
    summary: "Presenta dades i conclusions sense opinió personal: ordre, claredat i neutralitat.",
    steps: [
      { id: "objecte", label: "Objecte de l'informe", hint: "Què s'analitza i per què.", openers: ["L'objectiu d'aquest informe és…", "Aquest document analitza…"], detect: /(objectiu|aquest (informe|document)|té per finalitat)/i },
      { id: "analisi", label: "Anàlisi / dades", hint: "Dades i fets; passiva reflexa («s'observa que»).", openers: ["S'observa que…", "Segons les dades…", "Cal destacar que…"], detect: /(s'observa|segons les dades|s'ha constatat|es pot veure|cal destacar)/i },
      { id: "valoracio", label: "Valoració", hint: "Punts forts i febles, amb criteri.", openers: ["Pel que fa als aspectes positius…", "En canvi, …"], detect: /(aspectes positius|punts forts|punts febles|en canvi|pel que fa)/i },
      { id: "conclusions", label: "Conclusions i propostes", hint: "Què se'n deriva i què es recomana.", openers: ["Per tant, es recomana…", "En conclusió, …", "Se suggereix que…"], detect: /(es recomana|se suggereix|en conclusi|per tant|proposta)/i }
    ],
    connectors: ["segons", "així mateix", "per contra", "en conseqüència", "cal destacar que", "pel que fa a"],
    avoid: ["primera persona", "adjectius subjectius", "frases amb massa subordinades"]
  },
  {
    id: "sollicitud", name: "Sol·licitud / instància", register: "Formal · administratiu",
    summary: "Escrit a una administració: dades, exposició, petició (sol·licito) i data.",
    steps: [
      { id: "exposa", label: "Exposo", hint: "Els fets que justifiquen la petició.", openers: ["Exposo: que…", "Que, en data…, …"], detect: /(exposo|que, en data|^\s*que\b)/i },
      { id: "sollicita", label: "Sol·licito", hint: "La petició concreta, en una frase.", openers: ["Sol·licito: que se m'atorgui…", "Per tot això, sol·licito que…"], detect: /(sol·licito|solꞏlicito)/i },
      { id: "tancament", label: "Data, lloc i signatura", hint: "Tanca amb el lloc, la data i el teu nom.", openers: ["Eivissa, 12 de març de 2027", "Atentament,"], detect: /(\d{1,2} de [a-zà-ú]+ de \d{4}|atentament)/i }
    ],
    connectors: ["en conseqüència", "atès que", "per tot això", "d'acord amb", "en virtut de"],
    avoid: ["to col·loquial", "frases llargues sense verb", "informació irrellevant"]
  },
  {
    id: "correu-informal", name: "Carta o correu informal", register: "Informal · «tu»",
    summary: "A algú proper: to natural, però sense errors ni castellanismes.",
    steps: [
      { id: "salut", label: "Salutació", hint: "Natural i càlida.", openers: ["Hola, Marta!", "Estimat Joan,", "Ei, com va tot?"], detect: /^\s*(hola|estimad|ei|bon dia|benvolgud)/i },
      { id: "motiu", label: "Motiu", hint: "Per què escrius avui.", openers: ["Et escric per explicar-te…", "Fa temps que volia dir-te…", "Com et va tot per allà?"], detect: /(t'escric|fa temps|com et va|volia dir-te)/i },
      { id: "cos", label: "Cos", hint: "Explica-ho amb detalls i emoció.", openers: ["Resulta que…", "El millor de tot és que…", "Et puc assegurar que…"], detect: /(resulta que|el millor|et puc assegurar|la veritat és que)/i },
      { id: "tancament", label: "Comiat", hint: "Afectuós.", openers: ["Una abraçada!", "Ja m'explicaràs.", "Fins aviat!"], detect: /(abraçada|petons|fins aviat|ja m'explicaràs|records)/i }
    ],
    connectors: ["a més", "per cert", "per això", "de fet", "en canvi"],
    avoid: ["calcs del castellà", "abreviatures de xat", "«pues», «bueno»"]
  }
];

export const genreById = (id: string): Genre | undefined => GENRES.find((g) => g.id === id);
