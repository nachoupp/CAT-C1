/**
 * Detector d'errors freqüents (castellanismes, barbarismes, apòstrof, accents, gènere).
 * Funciona sense connexió i mentre s'escriu. Cada regla té una correcció, una explicació breu
 * i, si escau, la unitat o píndola on es treballa.
 */

export interface Rule {
  id: string;
  /** Expressió regular sense límits de paraula: s'hi afegeixen automàticament. */
  pattern: string;
  fixes: string[];
  msg: string;
  ex?: string;
  link?: string; // "u2" (unitat) o "p6" (píndola)
}

const L = "\\p{L}";

export const RULES: Rule[] = [
  { id: "desde", pattern: "desde", fixes: ["des de", "des que"], msg: "Castellanisme. Des de + nom; des que + verb.", ex: "Des que vaig arribar, no para de ploure.", link: "p6" },
  { id: "hasta", pattern: "hasta", fixes: ["fins a", "fins"], msg: "Castellanisme.", ex: "Fins a demà.", link: "p6" },
  { id: "tenir-que", pattern: "(tenir|tinc|tens|té|tenim|teniu|tenen|tenia|tenies|teníem|teníeu|tenien|tindré|tindràs|tindrà|tindrem|tindreu|tindran|tindria|tingut) que", fixes: ["haver de", "cal"], msg: "Obligació: haver de (personal) o cal (impersonal). «Tenir que» no és correcte.", ex: "He d'acabar l'informe. Cal acabar-lo.", link: "p6" },
  { id: "hi-ha-que", pattern: "hi ha que", fixes: ["cal", "s'ha de"], msg: "Obligació impersonal: cal + infinitiu.", ex: "Cal omplir la sol·licitud.", link: "p6" },
  { id: "a-nivell", pattern: "a nivell d[e']", fixes: ["quant a", "pel que fa a", "en l'àmbit de"], msg: "Incorrecte si no hi ha nivells reals.", ex: "Pel que fa a l'ortografia, he millorat.", link: "p6" },
  { id: "en-quant", pattern: "en quant a", fixes: ["quant a", "pel que fa a"], msg: "La forma correcta és quant a.", link: "p6" },
  { id: "sin-embargo", pattern: "sin embargo", fixes: ["tanmateix", "no obstant això"], msg: "Castellanisme.", ex: "És car; tanmateix, val la pena.", link: "p6" },
  { id: "bueno", pattern: "bueno", fixes: ["bé", "bo"], msg: "Castellanisme.", link: "p6" },
  { id: "vale", pattern: "vale", fixes: ["d'acord", "val"], msg: "Castellanisme.", link: "p6" },
  { id: "pues", pattern: "pues", fixes: ["doncs", "idò"], msg: "Castellanisme. A les Illes també: idò.", link: "p6" },
  { id: "entonces", pattern: "entonces", fixes: ["aleshores", "llavors"], msg: "Castellanisme.", link: "p6" },
  { id: "ademes", pattern: "adem[ée]s", fixes: ["a més", "a més a més"], msg: "Castellanisme.", link: "p6" },
  { id: "todavia", pattern: "todav[ií]a", fixes: ["encara"], msg: "Castellanisme." },
  { id: "algo", pattern: "algo", fixes: ["alguna cosa", "quelcom"], msg: "Castellanisme." },
  { id: "pero", pattern: "pero", fixes: ["però"], msg: "Porta accent obert: però." },
  { id: "perque", pattern: "perque", fixes: ["perquè"], msg: "Porta accent: perquè." },
  { id: "tambe", pattern: "tambe|tambè", fixes: ["també"], msg: "Accent tancat: també." },
  { id: "es-a-dir", pattern: "es a dir", fixes: ["és a dir"], msg: "És (verb ser) porta accent." },
  { id: "aixo", pattern: "aixó", fixes: ["això"], msg: "Accent obert: això." },
  { id: "apretar", pattern: "apret(ar|a|o|es|em|eu|en)", fixes: ["prémer", "estrènyer"], msg: "Castellanisme.", link: "p6" },
  { id: "buzon", pattern: "buz[óo]n?", fixes: ["bústia"], msg: "Castellanisme.", link: "p6" },
  { id: "plac", pattern: "pla[çc]os?", fixes: ["termini"], msg: "El temps per fer un tràmit és el termini.", ex: "El termini acaba divendres.", link: "p6" },
  { id: "llevar-a-cap", pattern: "(portar|llevar) a (cap|cabo)", fixes: ["dur a terme"], msg: "La forma genuïna és dur a terme.", link: "p6" },
  { id: "averiguar", pattern: "averigu\\p{L}*", fixes: ["esbrinar"], msg: "Castellanisme." },
  { id: "enterar", pattern: "enterar-se|enterat|enterada", fixes: ["assabentar-se"], msg: "Castellanisme: assabentar-se." },
  { id: "disfrutar", pattern: "disfrut\\p{L}*", fixes: ["gaudir", "fruir"], msg: "Castellanisme." },
  { id: "lograr", pattern: "logr(ar|o|a|at|em|en)", fixes: ["aconseguir", "assolir"], msg: "Castellanisme." },
  { id: "conseguir", pattern: "consegu(ir|eixo|eix|it)", fixes: ["aconseguir"], msg: "En català: aconseguir." },
  { id: "jefe", pattern: "jef[ea]s?", fixes: ["cap"], msg: "El cap, la cap." },
  { id: "rato", pattern: "ratos?", fixes: ["estona"], msg: "Castellanisme: una estona." },
  { id: "vacacions", pattern: "vacacions", fixes: ["vacances"], msg: "Les vacances." },
  { id: "cumpleanys", pattern: "cumpleany?s", fixes: ["aniversari"], msg: "L'aniversari." },
  { id: "ganar", pattern: "ganar", fixes: ["guanyar"], msg: "Castellanisme." },
  { id: "donat-que", pattern: "donat que", fixes: ["atès que", "ja que"], msg: "Causa: atès que, ja que, com que." },
  { id: "degut-a", pattern: "degut a", fixes: ["a causa de", "per culpa de"], msg: "Causa: a causa de." },
  { id: "en-base-a", pattern: "en base a", fixes: ["a partir de", "sobre la base de"], msg: "Calc del castellà." },
  { id: "contra-mes", pattern: "contra més", fixes: ["com més"], msg: "Comparació proporcional: com més… més…", ex: "Com més llegeixes, més aprens." },
  { id: "en-relacio-a", pattern: "en relació a", fixes: ["en relació amb"], msg: "La forma correcta és en relació amb.", link: "u3" },
  { id: "de-que", pattern: "de que", fixes: ["que", "de què"], msg: "Davant de que conjunció, la preposició cau (estic segur que). Si és relatiu, de què o del qual.", link: "p5" },
  { id: "en-que", pattern: "en que", fixes: ["que", "en què"], msg: "Conjunció: la preposició cau (confio que). Relatiu: en què, amb accent.", link: "p5" },
  { id: "per-a-que", pattern: "per a que", fixes: ["perquè", "per tal que"], msg: "Finalitat amb verb conjugat: perquè o per tal que.", link: "p4" },
  { id: "lo-que", pattern: "lo (que|millor|pitjor|més|mateix)", fixes: ["el que", "allò que", "el millor"], msg: "L'article neutre «lo» no és normatiu.", ex: "El que vull és aprovar.", link: "u1" },
  { id: "hi-han", pattern: "hi han (molts|moltes|uns|unes|diversos|diverses|alguns|algunes|pocs|poques|massa|\\d+)", fixes: ["hi ha"], msg: "L'existencial va en singular: hi ha molts…", link: "u2" },
  { id: "han-hagut", pattern: "han hagut(?! d)", fixes: ["hi ha hagut"], msg: "Existencial: hi ha hagut.", link: "u2" },
  { id: "de-el", pattern: "de el", fixes: ["del"], msg: "Contracció obligatòria: del." },
  { id: "a-el", pattern: "a el", fixes: ["al"], msg: "Contracció obligatòria: al." },
  { id: "per-el", pattern: "per el", fixes: ["pel"], msg: "Contracció obligatòria: pel." },
  { id: "de-els", pattern: "de els", fixes: ["dels"], msg: "Contracció obligatòria: dels." },
  { id: "a-els", pattern: "a els", fixes: ["als"], msg: "Contracció obligatòria: als." },
  { id: "per-els", pattern: "per els", fixes: ["pels"], msg: "Contracció obligatòria: pels." },
  { id: "apos-univ", pattern: "l'(universitat|història|idea|imatge|unitat|informació)", fixes: ["la "], msg: "L'article femení no s'apostrofa davant i/u àtones: la universitat, la història… (però l'illa, l'hora).", link: "p9" },
  { id: "dubte", pattern: "(la|una) dubte", fixes: ["el dubte", "un dubte"], msg: "Dubte és masculí.", link: "p7" },
  { id: "senyal", pattern: "(la|una) senyal", fixes: ["el senyal", "un senyal"], msg: "Senyal és masculí.", link: "p7" },
  { id: "costum", pattern: "(la|una) costum", fixes: ["el costum", "un costum"], msg: "Costum és masculí.", link: "p7" },
  { id: "analisi", pattern: "(el|un) anàlisi", fixes: ["l'anàlisi", "una anàlisi"], msg: "Anàlisi és femení.", link: "p7" },
  { id: "soc-acc", pattern: "sóc", fixes: ["soc"], msg: "Des del 2017 no porta accent diacrític.", link: "p8" },
  { id: "dona-acc", pattern: "dón(a|es)", fixes: ["dona", "dones"], msg: "Des del 2017 no porta accent diacrític.", link: "p8" },
  { id: "adeu-acc", pattern: "adéu", fixes: ["adeu"], msg: "Des del 2017 no porta accent.", link: "p8" },
  { id: "vens-acc", pattern: "vén(s|en)", fixes: ["vens", "venen"], msg: "Des del 2017 no porta accent diacrític.", link: "p8" },
  { id: "net-acc", pattern: "nét(a|s|es)?", fixes: ["net", "neta"], msg: "Des del 2017 no porta accent diacrític.", link: "p8" }
];

export interface Hit { rule: Rule; index: number; length: number; match: string }

const compiled = RULES.map((r) => ({ r, re: new RegExp(`(?<![${L}'’-])(?:${r.pattern})(?![${L}])`, "giu") }));

export function detect(text: string): Hit[] {
  const norm = text.replace(/’/g, "'");
  const out: Hit[] = [];
  for (const { r, re } of compiled) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(norm))) {
      out.push({ rule: r, index: m.index, length: m[0].length, match: text.slice(m.index, m.index + m[0].length) });
      if (m[0].length === 0) re.lastIndex++;
    }
  }
  return out.sort((a, b) => a.index - b.index);
}

/** Substitueix un encert respectant la majúscula inicial. */
export function applyHit(text: string, hit: Hit, fix: string): string {
  let rep = fix;
  if (hit.rule.id === "apos-univ") rep = "la " + hit.match.slice(2);
  if (/^\p{Lu}/u.test(hit.match)) rep = rep.charAt(0).toUpperCase() + rep.slice(1);
  return text.slice(0, hit.index) + rep + text.slice(hit.index + hit.length);
}

/** Normalitza una resposta escrita per comparar-la (majúscules, apòstrofs, puntuació, espais). */
export function normAnswer(s: string): string {
  return s.toLowerCase().replace(/[’`´]/g, "'").replace(/[.,;:!?¿¡«»"()]/g, "").replace(/\s+/g, " ").trim();
}

export function isCorrect(given: string, answers: string[]): boolean {
  const g = normAnswer(given);
  return answers.some((a) => normAnswer(a) === g);
}

/**
 * Corregeix un exercici escrit acceptant també la frase sencera:
 * - gap: «Passarem ___ (per + el) centre.» → «pel» o «Passarem pel centre».
 * - fix: «Lo que vull és aprovar.» → «el» o «El que vull és aprovar».
 */
export function isCorrectItem(given: string, item: { type: string; q: string; answers: string[] }): boolean {
  if (isCorrect(given, item.answers)) return true;
  const g = normAnswer(given);
  if (item.type === "gap" && item.q.includes("___")) {
    const base = item.q.replace(/\s*\([^)]*\)/g, "");
    return item.answers.some((a) => normAnswer(base.replace(/_{3,}/, a)) === g);
  }
  if (item.type === "fix") {
    const m = item.q.match(/«([^»]+)»/);
    if (!m) return false;
    const o = normAnswer(m[1]).split(" ");
    // Accepta la frase original amb qualsevol tros (no buit) substituït per una resposta vàlida.
    return item.answers.some((ans) => {
      const r = normAnswer(ans);
      for (let i = 0; i < o.length; i++) {
        for (let j = i + 1; j <= o.length; j++) {
          if (o.slice(i, j).join(" ") === r) continue;
          if ([...o.slice(0, i), r, ...o.slice(j)].join(" ") === g) return true;
        }
      }
      return false;
    });
  }
  return false;
}
