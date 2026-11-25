/**
 * Gramàtica a fons: lliçons explicades pas a pas, com ho faria un professor, amb molts exemples i exercicis amb explicació.
 * Mateix format que Fonaments (cartes → vocabulari → pràctica → dictat). Es considera feta amb un 80 %.
 */
import type { Basic } from "./basics";
import type { PracticeItem } from "./units";

const c = (q: string, options: string[], answer: string, e: string): PracticeItem => ({ type: "choice", q, options, answer, e });
const g = (q: string, answers: string[], e: string): PracticeItem => ({ type: "gap", q, answers, e });
const f = (q: string, answers: string[], e: string): PracticeItem => ({ type: "fix", q, answers, e });
const t = (q: string, answers: string[], e: string): PracticeItem => ({ type: "transform", q, answers, e });

export const GRAMMAR_PRON: Basic[] = [
  {
    id: "g1", n: 1, title: "Pronoms febles: el mapa", goal: "Entendre què són, quins n'hi ha i on es posen, abans de practicar-los un per un.",
    cards: [
      { title: "Per a què serveixen", html: `<p>Els pronoms febles són <b>paraules petites i àtones</b> que substitueixen una cosa que ja s'ha dit, perquè no ens repetim.</p><p>Sense pronom: <i>He vist la Marta. He vist la Marta al mercat.</i> (pesat)<br>Amb pronom: <i>He vist la Marta. <b>L'</b>he vist al mercat.</i></p><p>Són «febles» perquè no tenen accent propi: s'<b>enganxen al verb</b>, davant o darrere, com si en fossin una part.</p><div class="tip"><b>Idea clau:</b> abans de triar un pronom, pregunta't <b>quina funció</b> fa la cosa que vols substituir. El pronom depèn de la funció, no del significat.</div>` },
      { title: "Els pronoms, un per un", html: `<table><tr><th>Pronom</th><th>Substitueix</th><th>Exemple</th></tr><tr><td><b>el, la, els, les</b> (l')</td><td>complement directe</td><td>La veig → <i>La veig</i></td></tr><tr><td><b>li, els</b></td><td>complement indirecte (a qui?)</td><td>Escric a la Marta → <i>Li escric</i></td></tr><tr><td><b>ho</b></td><td>una cosa neutra: això, tot, una frase, un atribut</td><td>Sé que ve → <i>Ho sé</i></td></tr><tr><td><b>en</b> (n')</td><td>de + cosa; una quantitat</td><td>Tinc tres cotxes → <i>En tinc tres</i></td></tr><tr><td><b>hi</b></td><td>un lloc; a, en + cosa</td><td>Vaig a Eivissa → <i>Hi vaig</i></td></tr><tr><td><b>em, et, ens, us</b></td><td>jo, tu, nosaltres, vosaltres (directe i indirecte)</td><td><i>M'ha vist / M'ha dit</i></td></tr><tr><td><b>es / se</b></td><td>reflexiu, passiu, impersonal</td><td><i>Es renta</i></td></tr></table>` },
      { title: "On es posen", html: `<p><b>Davant del verb conjugat</b> (proclisi): <i>La veig. Em truca. Hi anem.</i></p><p><b>Darrere</b> l'infinitiu, el gerundi i l'imperatiu afirmatiu (enclisi), <b>amb guionet</b>: <i>Vull veure-la. Veient-la. Mira-la.</i></p><p>Davant de vocal, o després de vocal, el pronom es redueix amb <b>apòstrof</b>: <i>L'he vist. Mira'l. M'ho dius.</i></p><p>Amb una perífrasi, els dos llocs són correctes: <i>La vull veure</i> = <i>Vull veure-la</i>.</p>` },
      { title: "Tres preguntes per triar", html: `<ul><li><b>Què? / A qui?</b> sense preposició → <b>directe</b>: el, la, els, les, ho.</li><li><b>A qui?</b> amb la preposició <i>a</i> → <b>indirecte</b>: li (un), els (molts).</li><li><b>De què? / Quanta quantitat? / A on?</b> → <b>en</b> (de, quantitat) o <b>hi</b> (a, en, lloc).</li></ul><p>Truc: <b>substitueix per «això»</b>. Si «això» queda sol, és directe: <i>He comprat això</i>. Si cal «a això / a ell», és indirecte: <i>Dic això a ell</i>.</p>` },
      { title: "Errors que cal evitar", html: `<ul><li>❌ <s>Els hi dic</s> (quan només hi ha un complement indirecte plural) → ✅ <b>Els dic</b>.</li><li>❌ <s>La vaig dir</s> / <s>Lo vaig veure</s> → ✅ <b>Li vaig dir</b> · <b>El vaig veure</b>.</li><li>❌ <s>He vist a la Marta</s> → ✅ <b>He vist la Marta</b> (el directe de persona no porta <i>a</i>).</li><li>❌ <s>Vull comprar-lo's</s> → ✅ cada pronom, una funció.</li></ul>` }
    ],
    vocab: [
      { ca: "el pronom feble", es: "el pronombre átono" }, { ca: "el complement directe", es: "el complemento directo" }, { ca: "el complement indirecte", es: "el complemento indirecto" },
      { ca: "substituir", es: "sustituir" }, { ca: "repetir", es: "repetir" }, { ca: "davant del verb", es: "delante del verbo" }, { ca: "darrere del verb", es: "detrás del verbo" },
      { ca: "el guionet", es: "el guion" }, { ca: "l'apòstrof", es: "el apóstrofo" }, { ca: "l'infinitiu", es: "el infinitivo" }, { ca: "el gerundi", es: "el gerundio" }, { ca: "l'imperatiu", es: "el imperativo" }
    ],
    items: [
      c("«He vist en Pere.» Substitueix el complement:", ["L'he vist.", "Li he vist.", "Hi he vist."], "L'he vist.", "En Pere és directe (què/qui he vist?): el → l'."),
      c("«Escric a la directora.» Substitueix:", ["Li escric.", "La escric.", "L'escric."], "Li escric.", "Hi ha la preposició a: indirecte → li."),
      c("«Tinc tres germans.» Substitueix:", ["En tinc tres.", "Els tinc tres.", "Hi tinc tres."], "En tinc tres.", "Quantitat: en."),
      c("«Vaig al mercat.» Substitueix:", ["Hi vaig.", "En vaig.", "Li vaig."], "Hi vaig.", "Lloc: hi."),
      c("«Sé que arribarà tard.» Substitueix:", ["Ho sé.", "El sé.", "En sé."], "Ho sé.", "Una oració sencera: ho."),
      c("«Truco als veïns.» Substitueix:", ["Els truco.", "Els hi truco.", "Les truco."], "Els truco.", "Indirecte plural: els (sense hi)."),
      c("«Mirem les notícies.» Substitueix:", ["Les mirem.", "Els mirem.", "Hi mirem."], "Les mirem.", "Directe femení plural: les."),
      c("«Parlo del problema.» Substitueix:", ["En parlo.", "Hi parlo.", "Ho parlo."], "En parlo.", "De + cosa: en."),
      c("«Penso en les vacances.» Substitueix:", ["Hi penso.", "En penso.", "Les penso."], "Hi penso.", "En + cosa: hi."),
      c("Quin és el complement directe de «Vaig comprar flors a la Clara»?", ["flors", "a la Clara", "Vaig comprar"], "flors", "Respon a «què vaig comprar?»."),
      c("«Explico la regla a ells.» Substitueix el complement indirecte:", ["Els explico la regla.", "Li explico la regla.", "Les explico la regla."], "Els explico la regla.", "A ells: els."),
      c("Com s'escriu correctament?", ["Vull veure-la.", "Vull veure la.", "Vull veure'la."], "Vull veure-la.", "Darrere de l'infinitiu, guionet: veure-la."),
      c("Com s'escriu correctament?", ["Mira'l.", "Mira-el.", "Mirael."], "Mira'l.", "Després de vocal, el s'apostrofa: mira'l."),
      c("Quin pronom substitueix «de la feina»?", ["en", "hi", "ho"], "en", "De + cosa: en."),
      c("Quin pronom substitueix «a la biblioteca» (lloc)?", ["hi", "en", "li"], "hi", "Lloc: hi."),
      c("Quin d'aquests NO és un pronom feble?", ["tothom", "em", "li"], "tothom", "Tothom és un indefinit tònic."),
      g("La Marta? ___ he vist ahir.", ["l'"], "Marta és directe: l' davant de vocal."),
      g("Els veïns? ___ truco demà.", ["els"], "Indirecte plural: els."),
      g("La Marta? ___ escric avui.", ["li"], "A la Marta: indirecte singular."),
      g("Vols pa? Sí, ___ vull.", ["en"], "Quantitat indeterminada: en."),
      g("Vas a casa? Sí, ___ vaig.", ["hi"], "Lloc: hi."),
      g("Que arribaràs tard? Ja ___ sabia.", ["ho"], "Una oració sencera: ho."),
      g("Les cartes? ___ escric ara.", ["les"], "Directe femení plural: les."),
      f("Corregeix: «Als nens els hi dono llibres.»", ["els dono"], "Només hi ha un indirecte (als nens): els, sense hi."),
      f("Corregeix: «La vaig dir la veritat a la Marta.»", ["li vaig dir"], "Indirecte: li (laísme: la)."),
      f("Corregeix: «He vist a la Marta.»", ["He vist la Marta"], "El directe de persona no porta a."),
      f("Corregeix: «El pa, no ho vull.»", ["el"], "El pa és concret i masculí: el, no ho."),
      f("Corregeix: «Lo vaig veure ahir.»", ["El vaig veure"], "Lo és castellà: el."),
      t("Substitueix per un pronom: «Veig la tele.»", ["La veig"], "Directe: la."),
      t("Substitueix per un pronom: «Escric als meus pares.»", ["Els escric"], "Indirecte plural: els."),
      t("Substitueix per un pronom: «Parlem de política.»", ["En parlem"], "De + cosa: en."),
      t("Substitueix per un pronom: «Anem a Eivissa.»", ["Hi anem"], "Lloc: hi."),
      t("Substitueix per un pronom: «Dic la veritat al jutge.»", ["Li dic la veritat"], "Indirecte singular: li.")
    ],
    dictation: ["La Marta? L'he vist ahir al mercat.", "Als veïns els truco demà.", "Vols pa? Sí, en vull.", "Hi penso cada dia.", "Mira'l, que ve!", "Vull veure-la abans de marxar."]
  },
  {
    id: "g2", n: 2, title: "El complement directe: el, la, els, les, ho", goal: "Dominar el pronom directe, la concordança del participi i la diferència entre «el» i «ho».",
    cards: [
      { title: "Què és el complement directe", html: `<p>El complement directe és <b>allò que rep l'acció</b> del verb, sense preposició. Pregunta: <b>què + verb?</b> o <b>qui + verb?</b></p><ul><li><i>Compro <b>pa</b></i> → què compro? pa.</li><li><i>Veig <b>la Marta</b></i> → qui veig? la Marta.</li></ul><p>En català, el directe de persona <b>no porta «a»</b>: <b>He vist la Marta</b> (no «He vist a la Marta», que és castellanisme).</p>` },
      { title: "Les formes: el, la, els, les", html: `<table><tr><th>Directe</th><th>Pronom</th><th>Exemple</th></tr><tr><td>masculí singular</td><td><b>el</b> (l')</td><td>Compro el pa → <i>El compro</i></td></tr><tr><td>femení singular</td><td><b>la</b> (l')</td><td>Veig la tele → <i>La veig</i></td></tr><tr><td>masculí plural</td><td><b>els</b></td><td>Llegeixo els diaris → <i>Els llegeixo</i></td></tr><tr><td>femení plural</td><td><b>les</b></td><td>Escric les cartes → <i>Les escric</i></td></tr></table><p>Davant d'una vocal o una <i>h</i>, <b>el</b> i <b>la</b> es redueixen a <b>l'</b>: <i>L'escolto. L'he trobat.</i></p>` },
      { title: "El participi concorda", html: `<p>Amb els temps compostos (<i>he, has, ha + participi</i>), si el pronom directe és de tercera persona (<b>el, la, els, les</b>), el participi <b>concorda en gènere i nombre</b>:</p><ul><li><i>El llibre? <b>L'</b>he llegit.</i></li><li><i>La carta? L'he escrit<b>a</b>.</i></li><li><i>Els llibres? Els he llegit<b>s</b>.</i></li><li><i>Les cartes? Les he escrit<b>es</b>.</i></li></ul><p>Amb el perfet perifràstic (<i>vaig + infinitiu</i>) no hi ha participi: <i>Les vaig escriure</i>.</p><div class="tip">Els participis irregulars també concorden: <b>fet, fetes · dit, dites · vist, vistes · obert, obertes · escrit, escrites</b>.</div>` },
      { title: "«Ho»: el pronom neutre", html: `<p><b>Ho</b> substitueix una cosa que no té gènere: <b>això, allò, tot, una frase</b> o un <b>atribut</b> (un adjectiu o un nom que descriu el subjecte).</p><ul><li><i>Sé que vindrà. → <b>Ho</b> sé.</i></li><li><i>Ets cansat? Sí, <b>ho</b> sóc.</i> (atribut: mai «el sóc»)</li><li><i>La Marta és professora i <b>ho</b> és des de fa deu anys.</i></li></ul><p><b>El / la</b> són per a coses concretes amb gènere: <i>El pa, el vull.</i> <b>Ho</b> és per a idees: <i>Això, ho vull.</i></p>` },
      { title: "Errors típics", html: `<ul><li>❌ <s>Lo vaig veure</s> → ✅ <b>El vaig veure</b>.</li><li>❌ <s>He vist a la Marta</s> → ✅ <b>He vist la Marta</b> / <b>L'he vista</b>.</li><li>❌ <s>Les cartes, les he escrit</s> → ✅ <b>les he escrites</b>.</li><li>❌ <s>Sóc cansada, i el sóc des d'ahir</s> → ✅ <b>ho sóc</b>.</li></ul>` }
    ],
    vocab: [
      { ca: "veure", es: "ver" }, { ca: "mirar", es: "mirar" }, { ca: "escoltar", es: "escuchar" }, { ca: "esperar", es: "esperar" }, { ca: "buscar", es: "buscar" },
      { ca: "conèixer", es: "conocer" }, { ca: "ajudar", es: "ayudar", note: "directe: l'ajudo" }, { ca: "avisar", es: "avisar" }, { ca: "convidar", es: "invitar" },
      { ca: "acompanyar", es: "acompañar" }, { ca: "entendre", es: "entender" }, { ca: "trobar", es: "encontrar" }
    ],
    items: [
      c("«Compro el pa.» Substitueix:", ["El compro.", "Li compro.", "Ho compro."], "El compro.", "Directe masculí: el."),
      c("«Escolto la ràdio.» Substitueix:", ["L'escolto.", "La escolto.", "Li escolto."], "L'escolto.", "La + vocal: l'."),
      c("«Llegeixo els diaris.» Substitueix:", ["Els llegeixo.", "Les llegeixo.", "En llegeixo."], "Els llegeixo.", "Masculí plural: els."),
      c("«Escric les cartes.» Substitueix:", ["Les escric.", "Els escric.", "Li escric."], "Les escric.", "Femení plural: les."),
      c("«Sé la resposta.» Substitueix:", ["La sé.", "Ho sé.", "En sé."], "La sé.", "Resposta és femení concret: la."),
      c("«Sé que és tard.» Substitueix:", ["Ho sé.", "El sé.", "La sé."], "Ho sé.", "Oració: ho."),
      c("Quina frase és correcta?", ["He vist la Marta.", "He vist a la Marta.", "He vist en la Marta."], "He vist la Marta.", "El directe de persona no porta a."),
      c("El llibre? ___", ["L'he llegit.", "L'he llegida.", "El he llegit."], "L'he llegit.", "Llibre és masculí: llegit. Davant de vocal, l'."),
      c("La carta? ___", ["L'he escrita.", "L'he escrit.", "La he escrit."], "L'he escrita.", "Carta és femení: escrita."),
      c("Els llibres? ___", ["Els he llegits.", "Els he llegit.", "Les he llegits."], "Els he llegits.", "Masculí plural: llegits."),
      c("Les cartes? ___", ["Les he escrites.", "Les he escrit.", "Les he escrits."], "Les he escrites.", "Femení plural: escrites."),
      c("Ets alt? Sí, ___ sóc.", ["ho", "el", "en"], "ho", "Atribut: ho."),
      c("Estàs cansada? Sí, ___ estic.", ["ho", "la", "hi"], "ho", "Atribut: ho."),
      c("Quina frase és correcta?", ["Les vaig veure ahir.", "Les vaig vistes ahir.", "Les vaig veures ahir."], "Les vaig veure ahir.", "Amb vaig + infinitiu no hi ha participi."),
      c("Quin participi és correcte? «Les fotos? Les he ___»", ["fetes", "fet", "fetas"], "fetes", "Concorda: fetes."),
      c("Quin participi és correcte? «La finestra? L'he ___»", ["oberta", "obert", "obrida"], "oberta", "Obrir → obert, oberta."),
      g("El cafè? ___ prenc sempre sol.", ["el"], "Cafè és masculí: el."),
      g("La Maria? ___ conec des de fa anys.", ["la"], "Directe femení davant de consonant: la."),
      g("Els meus amics? ___ espero a la porta.", ["els"], "Masculí plural: els."),
      g("Les claus? ___ he perdudes.", ["les"], "Femení plural: les… perdudes."),
      g("Sé que tens raó, però no ___ vull admetre.", ["ho"], "Una idea: ho."),
      g("Les cartes? Les he escrit___.", ["es"], "Participi femení plural: escrites."),
      f("Corregeix: «Lo busco des de ahir.»", ["El busco"], "Lo és castellà: el."),
      f("Corregeix: «Les cartes, les he escrit.»", ["les he escrites"], "El participi concorda amb les."),
      f("Corregeix: «Sóc cansada i el sóc des d'ahir.»", ["ho sóc"], "Atribut: ho."),
      f("Corregeix: «Vaig convidar a la Marta.»", ["Vaig convidar la Marta"], "Directe de persona: sense a."),
      f("Corregeix: «Els llibres, els he llegit.»", ["els he llegits"], "Els → llegits."),
      t("Substitueix per un pronom: «He llegit la notícia.»", ["L'he llegida"], "La notícia → l'he llegida."),
      t("Substitueix per un pronom: «He comprat els bitllets.»", ["Els he comprats"], "Masculí plural: els he comprats."),
      t("Substitueix per un pronom: «Hem rebut les invitacions.»", ["Les hem rebudes"], "Femení plural: rebudes."),
      t("Substitueix per un pronom: «Veig que tens son.»", ["Ho veig"], "Una oració: ho.")
    ],
    dictation: ["La carta? L'he escrita aquest matí.", "Els llibres, els he llegits tots.", "Les claus? Les he perdudes.", "He vist la Marta al mercat.", "Estàs cansat? Sí, ho estic.", "Això, ho sé des d'ahir."]
  },
  {
    id: "g3", n: 3, title: "El complement indirecte: li, els", goal: "Reconèixer el «a qui?», triar entre li i els, evitar «els hi» i el laísme.",
    cards: [
      { title: "Què és el complement indirecte", html: `<p>El complement indirecte és <b>qui rep el benefici o el dany</b> de l'acció, i porta la preposició <b>a</b>. Pregunta: <b>a qui?</b></p><ul><li><i>Dono el llibre <b>a la Marta</b></i> → a qui el dono? a la Marta.</li><li><i>Truco <b>als veïns</b></i> → a qui truco? als veïns.</li></ul><p>El pronom és <b>li</b> (un) i <b>els</b> (molts), <b>igual per al masculí i el femení</b>: <i>a ell / a ella → li</i> · <i>a ells / a elles → els</i>.</p>` },
      { title: "Verbs que porten indirecte", html: `<p>Aquests verbs demanen «a qui?» i, per tant, <b>li / els</b>:</p><ul><li><b>dir</b>: <i>Li dic la veritat.</i></li><li><b>donar, explicar, ensenyar, prometre</b>: <i>Els ensenyo la casa.</i></li><li><b>escriure, telefonar, respondre, preguntar, demanar</b>: <i>Li telefono demà. Li pregunto l'hora.</i></li><li><b>agradar, fer mal, semblar, anar bé</b>: <i>Li agrada el cinema. Els sembla bé.</i></li></ul><div class="tip">Compte amb <b>ajudar, avisar, convidar, conèixer</b>: són <b>directes</b> (l'ajudo, l'aviso).</div>` },
      { title: "«Els hi»: quan NO", html: `<p>Cada pronom representa <b>un sol complement</b>. Si només hi ha l'indirecte, només hi ha un pronom:</p><ul><li>❌ <s>Als nens els hi dono llibres</s> → ✅ <b>Als nens els dono llibres</b>.</li><li>❌ <s>Els hi he dit que vinguin</s> → ✅ <b>Els he dit que vinguin</b>.</li></ul><p>«Els hi» només és correcte quan hi ha <b>dos complements</b> (un directe plural masculí i un lloc o indirecte): <i>Els llibres, <b>els hi</b> porto.</i> Si hi ha un indirecte i un directe, la forma és una combinació (lliçó 5).</p>` },
      { title: "Laísme i leísme: la i el per a li", html: `<p>No confonguem el directe amb l'indirecte:</p><ul><li>❌ <s>La vaig dir que vingués</s> → ✅ <b>Li vaig dir</b> (a ella).</li><li>❌ <s>Li vaig veure</s> → ✅ <b>El vaig veure</b> (directe).</li><li>❌ <s>Les vaig explicar el problema</s> → ✅ <b>Els vaig explicar el problema</b> (a elles).</li></ul><p>Truc: <b>li / els</b> sempre porten «a» al darrere si hi poses el nom: <i>(a ella) li, (a elles) els</i>.</p>` },
      { title: "El complement de persona davant del verb", html: `<p>Si el complement indirecte va <b>davant del verb</b>, el pronom és <b>obligatori</b>:</p><ul><li><i>A la Marta <b>li</b> agrada el cinema.</i></li><li><i>Als alumnes <b>els</b> he explicat la regla.</i></li><li><i>A mi <b>em</b> fa mal el cap.</i></li></ul><p>Darrere del verb, el pronom és habitual però no sempre obligatori: <i>He donat el llibre a la Marta</i> o <i>Li he donat el llibre a la Marta</i>.</p>` }
    ],
    vocab: [
      { ca: "dir", es: "decir" }, { ca: "donar", es: "dar" }, { ca: "explicar", es: "explicar" }, { ca: "ensenyar", es: "enseñar" }, { ca: "prometre", es: "prometer" },
      { ca: "escriure", es: "escribir" }, { ca: "telefonar", es: "telefonear" }, { ca: "respondre", es: "responder" }, { ca: "preguntar", es: "preguntar" }, { ca: "demanar", es: "pedir" },
      { ca: "agradar", es: "agradar, gustar" }, { ca: "semblar", es: "parecer" }, { ca: "fer mal", es: "doler" }
    ],
    items: [
      c("«Dono el llibre a la Marta.» Substitueix l'indirecte:", ["Li dono el llibre.", "La dono el llibre.", "Els dono el llibre."], "Li dono el llibre.", "A la Marta → li."),
      c("«Truco als veïns.» Substitueix:", ["Els truco.", "Els hi truco.", "Li truco."], "Els truco.", "Un sol complement: els."),
      c("«Telefono a la meva germana.» Substitueix:", ["Li telefono.", "La telefono.", "Hi telefono."], "Li telefono.", "Telefonar porta indirecte: li."),
      c("«Pregunto l'hora a un senyor.» Substitueix l'indirecte:", ["Li pregunto l'hora.", "El pregunto l'hora.", "Hi pregunto l'hora."], "Li pregunto l'hora.", "A un senyor: li."),
      c("«Ensenyo la casa a les meves cosines.» Substitueix l'indirecte:", ["Els ensenyo la casa.", "Les ensenyo la casa.", "Li ensenyo la casa."], "Els ensenyo la casa.", "A elles → els (no «les»)."),
      c("Quina frase és correcta?", ["Li vaig dir que vingués.", "La vaig dir que vingués.", "Els hi vaig dir que vingués."], "Li vaig dir que vingués.", "A ella: li."),
      c("Quina frase és correcta?", ["Als nens els dono llibres.", "Als nens els hi dono llibres.", "Als nens los dono llibres."], "Als nens els dono llibres.", "Només hi ha un indirecte: els."),
      c("Quina frase és correcta?", ["El vaig veure ahir.", "Li vaig veure ahir.", "Lo vaig veure ahir."], "El vaig veure ahir.", "Veure és directe: el."),
      c("Quin verb és directe?", ["ajudar", "dir", "telefonar"], "ajudar", "L'ajudo (directe). Dir i telefonar porten li."),
      c("A la Marta ___ agrada el cinema.", ["li", "la", "els"], "li", "Agradar porta indirecte."),
      c("Als alumnes ___ he explicat la regla.", ["els", "els hi", "les"], "els", "Un indirecte plural: els."),
      c("A mi ___ fa mal el cap.", ["em", "me", "m'ho"], "em", "Indirecte de 1a persona: em."),
      c("Quin és l'indirecte de «a elles»?", ["els", "les", "li"], "els", "Plural, masculí o femení: els."),
      c("«Els vaig explicar el problema» vol dir que l'he explicat:", ["a ells o a elles", "només a ells", "només a elles"], "a ells o a elles", "Els serveix per als dos gèneres."),
      g("A la directora ___ escric una carta.", ["li"], "Indirecte singular."),
      g("Als clients ___ hem enviat el catàleg.", ["els"], "Indirecte plural."),
      g("A en Joan ___ van prometre un augment.", ["li"], "Indirecte singular."),
      g("A les alumnes ___ he dit que vinguin.", ["els"], "Plural: els."),
      g("A tu ___ sembla bé? (jo parlo de tu)", ["et"], "Indirecte de 2a persona: et."),
      g("Als veïns no ___ agrada el soroll.", ["els"], "Agradar: indirecte plural."),
      f("Corregeix: «La vaig dir que vingués a la Marta.»", ["li vaig dir"], "Laísme: li."),
      f("Corregeix: «Els hi he dit que vinguin.»", ["els he dit"], "Un sol indirecte: els."),
      f("Corregeix: «Les vaig explicar la regla a les alumnes.»", ["els vaig explicar"], "Indirecte plural: els."),
      f("Corregeix: «Li vaig veure al mercat.»", ["el vaig veure"], "Veure és directe."),
      f("Corregeix: «Als nens els hi agrada jugar.»", ["els agrada"], "Un sol indirecte: els."),
      t("Substitueix el complement indirecte: «Escric a l'ajuntament.»", ["Li escric"], "Un sol receptor: li."),
      t("Substitueix el complement indirecte: «Dic la veritat als meus pares.»", ["Els dic la veritat"], "Plural: els."),
      t("Substitueix el complement indirecte: «Prometo ajuda a la Marta.»", ["Li prometo ajuda"], "Singular: li."),
      t("Substitueix el complement indirecte: «Pregunto el preu a la dependenta.»", ["Li pregunto el preu"], "Singular: li."),
      t("Corregeix l'ordre: «A la Marta agrada el cinema.»", ["A la Marta li agrada el cinema"], "Davant del verb, el pronom és obligatori.")
    ],
    dictation: ["A la Marta li agrada el cinema.", "Als veïns els truco demà.", "Li vaig dir que no vingués.", "Els vaig explicar el problema.", "A mi em fa mal el cap.", "Telefona-li abans de les nou."]
  }
];

const GRAMMAR_PRON2: Basic[] = [
  {
    id: "g4", n: 4, title: "Els pronoms «hi» i «en»", goal: "Distingir quan una cosa es substitueix per hi (a, en + lloc o cosa) o per en (de + cosa, quantitat).",
    cards: [
      { title: "«Hi»: el lloc i la preposició a/en", html: `<p><b>Hi</b> substitueix un <b>lloc</b> o un complement introduït per <b>a, en, sobre, sota, per, amb</b> (quan és una cosa).</p><ul><li><i>Vaig <b>a Eivissa</b> → <b>Hi</b> vaig.</i></li><li><i>Visc <b>a Sant Antoni</b> → <b>Hi</b> visc.</i></li><li><i>Penso <b>en les vacances</b> → <b>Hi</b> penso.</i></li><li><i>Confio <b>en això</b> → <b>Hi</b> confio.</i></li><li><i>Es fixa <b>en els detalls</b> → <b>S'hi</b> fixa.</i></li></ul>` },
      { title: "«En»: de + cosa i quantitat", html: `<p><b>En</b> substitueix un complement amb <b>de</b> (quan parlem de coses) i <b>una quantitat</b> d'alguna cosa.</p><ul><li><i>Parlem <b>del viatge</b> → <b>En</b> parlem.</i></li><li><i>Vinc <b>de Palma</b> → <b>En</b> vinc.</i></li><li><i>Tinc <b>dos cotxes</b> → <b>En</b> tinc <b>dos</b>.</i></li><li><i>Vols <b>pa</b>? Sí, <b>en</b> vull.</i></li><li><i>No tinc <b>diners</b> → No <b>en</b> tinc.</i></li></ul><p>Quan el nombre acompanya el pronom, <b>en es manté</b>: <i>En vull tres.</i> (mai «vull tres» sense pronom quan el nom ja s'ha dit).</p>` },
      { title: "Davant de vocal: n'", html: `<p>Davant d'una vocal, <b>en</b> es redueix a <b>n'</b>: <i>N'he parlat. N'hi ha tres.</i></p><p>Darrere de vocal o consonant, <b>'n</b> o <b>-ne</b>: <i>Parla'n. Pren-ne dos.</i></p><p>No s'ha de confondre <b>en</b> (pronom) amb la preposició <b>en</b>: <i>Penso <u>en</u> això → <b>hi</b> penso</i>, però <i>Parlo <u>d'</u>això → <b>en</b> parlo</i>.</p>` },
      { title: "Hi ha, n'hi ha, hi havia", html: `<p><b>Haver-hi</b> és impersonal i <b>invariable</b>: <i>Hi ha un cotxe. Hi ha tres cotxes. Ahir hi havia molta gent.</i> ❌ <s>Hi han tres cotxes</s>.</p><p>Si el que hi ha és un nom ja conegut o una quantitat, apareix <b>en</b>: <i>Hi ha pa? Sí, <b>n'hi</b> ha. · No <b>n'hi</b> ha cap. · <b>N'hi</b> ha tres.</i></p>` },
      { title: "Verbs amb hi i en", html: `<table><tr><th>Verb</th><th>Amb pronom</th></tr><tr><td>pensar en</td><td><i>Hi penso.</i></td></tr><tr><td>fixar-se en</td><td><i>M'hi fixo.</i></td></tr><tr><td>parlar de</td><td><i>En parlo.</i></td></tr><tr><td>queixar-se de</td><td><i>Se'n queixa.</i></td></tr><tr><td>anar-se'n</td><td><i>Me'n vaig.</i></td></tr><tr><td>tornar-hi</td><td><i>Hi torno demà.</i></td></tr><tr><td>fer-hi</td><td><i>No hi fem res.</i></td></tr></table>` }
    ],
    vocab: [
      { ca: "pensar en", es: "pensar en" }, { ca: "parlar de", es: "hablar de" }, { ca: "dependre de", es: "depender de" }, { ca: "fixar-se en", es: "fijarse en" }, { ca: "queixar-se de", es: "quejarse de" },
      { ca: "confiar en", es: "confiar en" }, { ca: "tornar", es: "volver" }, { ca: "anar-se'n", es: "marcharse" }, { ca: "n'hi ha", es: "hay (de eso)" }, { ca: "cap", es: "ninguno" }, { ca: "alguns", es: "algunos" }, { ca: "gaires", es: "muchos (en negativa)" }
    ],
    items: [
      c("«Vaig a Palma cada setmana.» Substitueix el lloc:", ["Hi vaig cada setmana.", "En vaig cada setmana.", "Ho vaig cada setmana."], "Hi vaig cada setmana.", "Lloc: hi."),
      c("«Vinc de Palma.» Substitueix:", ["En vinc.", "Hi vinc.", "Ho vinc."], "En vinc.", "De + lloc d'origen: en."),
      c("«Penso en el futur.» Substitueix:", ["Hi penso.", "En penso.", "Ho penso."], "Hi penso.", "En + cosa: hi."),
      c("«Parlo del futur.» Substitueix:", ["En parlo.", "Hi parlo.", "Ho parlo."], "En parlo.", "De + cosa: en."),
      c("«Tinc dos cotxes.» Substitueix:", ["En tinc dos.", "Els tinc dos.", "Hi tinc dos."], "En tinc dos.", "Quantitat: en + dos."),
      c("«No tinc diners.» Substitueix:", ["No en tinc.", "No els tinc.", "No hi tinc."], "No en tinc.", "Diners és indeterminat: en."),
      c("Vols cafè? Sí, ___ vull.", ["en", "el", "hi"], "en", "Quantitat indeterminada: en."),
      c("Hi ha pa? Sí, ___ ha.", ["n'hi", "hi", "en"], "n'hi", "En + hi davant de ha: n'hi ha."),
      c("Quina frase és correcta?", ["Hi ha tres cotxes.", "Hi han tres cotxes.", "Hi ha tres cotxe."], "Hi ha tres cotxes.", "Haver-hi és invariable."),
      c("Quina frase és correcta?", ["Ahir hi havia molta gent.", "Ahir hi havien molta gent.", "Ahir hi va haver molta gents."], "Ahir hi havia molta gent.", "Hi havia: invariable."),
      c("Quina frase és correcta?", ["N'he parlat amb ell.", "En he parlat amb ell.", "Ne he parlat amb ell."], "N'he parlat amb ell.", "Davant de vocal: n'."),
      c("Quin pronom correspon a «Es queixa del soroll»?", ["Se'n queixa.", "S'hi queixa.", "Se'l queixa."], "Se'n queixa.", "Queixar-se de: en."),
      c("Quin pronom correspon a «Es fixa en els detalls»?", ["S'hi fixa.", "Se'n fixa.", "Se'ls fixa."], "S'hi fixa.", "Fixar-se en: hi."),
      c("«Quants germans tens?» — «___ tinc tres.»", ["En", "Hi", "Els"], "En", "Quantitat: en tinc tres."),
      c("Quina forma és correcta darrere d'un infinitiu?", ["Pren-ne dos.", "Pren-en dos.", "Pren-hi dos."], "Pren-ne dos.", "Darrere de consonant: -ne."),
      g("Vas al cinema? Sí, ___ vaig cada dissabte.", ["hi"], "Lloc: hi."),
      g("Parlem de la feina? Sí, ___ parlem.", ["en"], "De + cosa: en."),
      g("Tens germans? Sí, ___ tinc dos.", ["en"], "Quantitat: en."),
      g("Aquí ___ ha molta gent. (haver-hi)", ["hi"], "Hi ha."),
      g("Hi ha coses? No, no ___ ha cap.", ["n'hi"], "En + hi: n'hi ha."),
      g("Tornes a Menorca aquest estiu? Sí, ___ torno.", ["hi"], "Lloc: hi."),
      g("Pensem en les vacances? Sí, ___ pensem.", ["hi"], "En + cosa: hi."),
      f("Corregeix: «Hi han molts turistes a la platja.»", ["hi ha"], "Haver-hi és invariable."),
      f("Corregeix: «Parlem-hi del problema.»", ["Parlem-en"], "De + cosa: en."),
      f("Corregeix: «No tinc cap diners, no hi tinc.»", ["no en tinc"], "Quantitat: en."),
      f("Corregeix: «Ahir hi havien molts nens.»", ["hi havia"], "Invariable."),
      f("Corregeix: «Penso-ne cada dia.»", ["Hi penso"], "Pensar en: hi (i va davant del verb)."),
      t("Substitueix per un pronom: «Parlem de política.»", ["En parlem"], "De + cosa."),
      t("Substitueix per un pronom: «Visc a Sant Antoni.»", ["Hi visc"], "Lloc."),
      t("Substitueix per un pronom: «Tinc tres germans.»", ["En tinc tres"], "Quantitat."),
      t("Substitueix per un pronom: «Compro dues pomes.»", ["En compro dues"], "Quantitat."),
      t("Substitueix per un pronom: «Hi ha tres cadires a la sala.» (només la quantitat, en resposta a «n'hi ha?»)", ["N'hi ha tres"], "En + hi: n'hi ha tres.")
    ],
    dictation: ["Hi ha molta gent al port.", "Parlem-ne demà, si us va bé.", "Tens germans? Sí, en tinc dos.", "Hi penso cada vegada que passo per aquí.", "N'hi ha tres a la nevera.", "Ahir hi havia molta boira."]
  },
  {
    id: "g5", n: 5, title: "Combinacions de pronoms", goal: "Posar dos pronoms junts: m'ho, me'l, te la, l'hi, n'hi… amb l'ordre i les contraccions.",
    cards: [
      { title: "El principi: l'indirecte primer", html: `<p>Quan hi ha dos complements, hi ha <b>dos pronoms</b>, i van junts davant del verb (o darrere). L'ordre és: <b>indirecte + directe</b>.</p><ul><li><i>Em dona el llibre → <b>me'l</b> dona.</i></li><li><i>Et porto les claus → <b>te les</b> porto.</i></li><li><i>Ens explica la història → <b>ens la</b> explica.</i></li></ul><div class="tip">Pensa-ho com una cua: primer qui <b>rep</b> (em, et, ens, us, li) i després <b>allò que es dona</b> (el, la, els, les, ho, en).</div>` },
      { title: "Amb em, et, es, ens, us", html: `<table><tr><th></th><th>+ el</th><th>+ la</th><th>+ els</th><th>+ les</th><th>+ ho</th><th>+ en</th></tr><tr><td><b>em</b></td><td>me'l</td><td>me la</td><td>me'ls</td><td>me les</td><td>m'ho</td><td>me'n</td></tr><tr><td><b>et</b></td><td>te'l</td><td>te la</td><td>te'ls</td><td>te les</td><td>t'ho</td><td>te'n</td></tr><tr><td><b>es</b></td><td>se'l</td><td>se la</td><td>se'ls</td><td>se les</td><td>s'ho</td><td>se'n</td></tr><tr><td><b>ens</b></td><td>ens el</td><td>ens la</td><td>ens els</td><td>ens les</td><td>ens ho</td><td>ens en</td></tr><tr><td><b>us</b></td><td>us el</td><td>us la</td><td>us els</td><td>us les</td><td>us ho</td><td>us en</td></tr></table><p>Regla ràpida: <b>em, et, es</b> es redueixen amb <i>el, els, ho, en</i> (<b>me'l, te'ls, s'ho, me'n</b>); amb <i>la, les</i> es queden: <b>me la, te les</b>.</p>` },
      { title: "Amb li, els i hi", html: `<table><tr><th>Combinació</th><th>Forma</th><th>Exemple</th></tr><tr><td>li + el</td><td><b>l'hi</b></td><td>El llibre, <i>l'hi</i> dono.</td></tr><tr><td>li + la</td><td><b>la hi</b></td><td>La carta, <i>la hi</i> envio.</td></tr><tr><td>li + els</td><td><b>els hi</b></td><td>Els llibres, <i>els hi</i> porto.</td></tr><tr><td>li + les</td><td><b>les hi</b></td><td>Les claus, <i>les hi</i> torno.</td></tr><tr><td>li + ho</td><td><b>li ho</b></td><td><i>Li ho</i> explico.</td></tr><tr><td>li + en</td><td><b>n'hi</b></td><td>De cafè, <i>n'hi</i> dono.</td></tr><tr><td>hi + en</td><td><b>n'hi</b></td><td><i>N'hi</i> ha tres.</td></tr></table><p>Aquestes formes serveixen per a un indirecte <b>singular</b>. Amb un indirecte <b>plural</b> (els), es manté <b>els</b> + directe: <i>Els ho explico.</i></p>` },
      { title: "Com saber quin és quin", html: `<p>Mètode en tres passos:</p><ol><li><b>Subratlla</b> els dos complements: <i>Dono <u>el llibre</u> <u>a la Marta</u>.</i></li><li><b>Substitueix cadascun</b>: el llibre → <i>el</i>; a la Marta → <i>li</i>.</li><li><b>Posa'ls en ordre</b> (indirecte + directe) i <b>contreu</b>: li + el → <b>l'hi</b> → <i>L'hi dono.</i></li></ol><p>Per això <i>Li ho he dit</i> és correcte: <i>ho</i> (directe) + <i>li</i> (indirecte).</p>` },
      { title: "Errors i trampes", html: `<ul><li>❌ <s>Els hi he dit</s> (un sol indirecte) → ✅ <b>Els he dit</b>.</li><li>❌ <s>Me ho dones?</s> → ✅ <b>M'ho dones?</b> (me + ho s'apostrofa).</li><li>❌ <s>Te el dono</s> → ✅ <b>Te'l dono</b>.</li><li>❌ <s>Li la dono</s> → ✅ <b>La hi dono</b>.</li><li>❌ <s>Em el dones?</s> → ✅ <b>Me'l dones?</b></li></ul><div class="tip">En exàmens, si dubtes d'una combinació difícil, pots <b>reformular</b> la frase (repetint un nom) en lloc de fer-ne una de dubtosa: és preferible a equivocar-se.</div>` }
    ],
    vocab: [
      { ca: "donar", es: "dar" }, { ca: "portar", es: "llevar, traer" }, { ca: "enviar", es: "enviar" }, { ca: "tornar", es: "devolver" }, { ca: "deixar", es: "dejar, prestar" },
      { ca: "explicar", es: "explicar" }, { ca: "dir", es: "decir" }, { ca: "ensenyar", es: "enseñar" }, { ca: "comprar", es: "comprar" }, { ca: "regalar", es: "regalar" }, { ca: "recomanar", es: "recomendar" }, { ca: "demanar", es: "pedir" }
    ],
    items: [
      c("«Em dones el llibre?» Substitueix el llibre:", ["Me'l dones?", "Em el dones?", "Me ho dones?"], "Me'l dones?", "Em + el = me'l."),
      c("«Et porto les claus.» Substitueix les claus:", ["Te les porto.", "Te'ls porto.", "Et les porto."], "Te les porto.", "Et + les = te les."),
      c("«M'expliques la història?» Substitueix la història:", ["M'la expliques?", "Me la expliques?", "Me l'expliques?"], "Me l'expliques?", "Me la + verb amb vocal: me l'expliques."),
      c("«Dius això?» → «Em dius això?» Substitueix això:", ["M'ho dius?", "Me ho dius?", "Em ho dius?"], "M'ho dius?", "Em + ho = m'ho."),
      c("«Et dono els papers.» Substitueix els papers:", ["Te'ls dono.", "Et els dono.", "Te els dono."], "Te'ls dono.", "Et + els = te'ls."),
      c("«Dono el llibre a la Marta.» Substitueix tot:", ["L'hi dono.", "Li l'dono.", "Els hi dono."], "L'hi dono.", "Li + el = l'hi."),
      c("«Envio la carta a l'Anna.» Substitueix tot:", ["La hi envio.", "L'hi envio.", "Li la envio."], "La hi envio.", "Li + la = la hi."),
      c("«Porto els llibres a la Joana.» Substitueix tot:", ["Els hi porto.", "Li els porto.", "Els li porto."], "Els hi porto.", "Li + els = els hi."),
      c("«Torno les claus al veí.» Substitueix tot:", ["Les hi torno.", "Li les torno.", "Les li torno."], "Les hi torno.", "Li + les = les hi."),
      c("«Explico això a la Marta.» Substitueix tot:", ["Li ho explico.", "L'hi explico.", "Ho li explico."], "Li ho explico.", "Li + ho = li ho."),
      c("«Dono cafè a la veïna.» Substitueix tot:", ["N'hi dono.", "Li en dono.", "Hi en dono."], "N'hi dono.", "Li + en = n'hi."),
      c("Quina forma és correcta?", ["Te'l dono.", "Te el dono.", "Et l'dono."], "Te'l dono.", "Et + el = te'l."),
      c("Quina forma és correcta?", ["M'ho dius?", "Me ho dius?", "Em ho dius?"], "M'ho dius?", "Em + ho = m'ho."),
      c("Quina forma és correcta?", ["Ens ho diu.", "Ens l'ho diu.", "Ens-ho diu."], "Ens ho diu.", "Ens + ho = ens ho."),
      c("Quina forma és correcta?", ["Us la porto.", "Us l'a porto.", "Us-la porto."], "Us la porto.", "Us + la = us la."),
      c("«Els llibres? A la Marta ___ porto.»", ["els hi", "li els", "els li"], "els hi", "Li + els = els hi."),
      c("«Els explico això.» (a ells) Substitueix això:", ["Els ho explico.", "Els hi explico.", "Ho els explico."], "Els ho explico.", "Els + ho = els ho (no «els hi»)."),
      g("«Em dones el pa?» → «___ dones?»", ["me'l"], "Em + el = me'l."),
      g("«Et porto la bossa.» → «___ porto.»", ["te la"], "Et + la = te la."),
      g("«Us explico la regla.» → «___ explico.»", ["us la"], "Us + la = us la."),
      g("«Em dius la veritat?» → «___ dius?»", ["me la"], "Em + la = me la."),
      g("«Dono les claus a en Pere.» → «___ dono.»", ["les hi"], "Li + les = les hi."),
      g("«Dono això a en Pere.» → «___ dono.»", ["li ho"], "Li + ho = li ho."),
      g("«Porto tres a la Marta.» → «___ porto tres.»", ["n'hi"], "Li + en = n'hi."),
      f("Corregeix: «Me ho dones?»", ["m'ho dones"], "Em + ho = m'ho."),
      f("Corregeix: «Te el dono demà.»", ["te'l dono"], "Et + el = te'l."),
      f("Corregeix: «Li la envio avui.»", ["la hi envio"], "Li + la = la hi."),
      f("Corregeix: «Els hi he explicat la lliçó als alumnes.»", ["els he explicat"], "Un sol indirecte: els."),
      f("Corregeix: «Em el dones?»", ["me'l dones"], "Em + el = me'l."),
      t("Substitueix tots dos complements: «Dono el regal a la meva mare.»", ["L'hi dono"], "Li + el = l'hi."),
      t("Substitueix tots dos complements: «Porto les claus a en Joan.»", ["Les hi porto"], "Li + les = les hi."),
      t("Substitueix tots dos complements: «Em dius el teu nom?»", ["Me'l dius"], "Em + el = me'l."),
      t("Substitueix tots dos complements: «T'explico això.»", ["T'ho explico"], "Et + ho = t'ho."),
      t("Substitueix tots dos complements: «Recomano aquest llibre a la meva amiga.»", ["L'hi recomano"], "Li + el = l'hi.")
    ],
    dictation: ["Me'l dones, si us plau?", "Les claus? Te les porto demà.", "Li ho vaig explicar ahir.", "El llibre, l'hi he donat aquest matí.", "M'ho has de dir tot.", "De cafè, n'hi dono dos."]
  },
  {
    id: "g6", n: 6, title: "Pronoms darrere del verb: guionet i apòstrof", goal: "Escriure bé dóna'm, explica-li-ho, vull veure-la, pren-ne dos, ves-hi.",
    cards: [
      { title: "Quan van darrere", html: `<p>Els pronoms es posen <b>darrere del verb</b> (enclisi) i s'uneixen amb <b>guionet</b> en tres casos:</p><ul><li><b>Infinitiu</b>: <i>Vull veure-la. Cal dir-ho.</i></li><li><b>Gerundi</b>: <i>Veient-la. Dient-ho.</i></li><li><b>Imperatiu afirmatiu</b>: <i>Mira-la. Digue-m'ho.</i></li></ul><p>Amb la <b>negació</b> o amb el <b>subjuntiu</b> van davant: <i>No la miris. Que me'l donin.</i></p>` },
      { title: "Les formes: després de vocal i de consonant", html: `<table><tr><th>Pronom</th><th>Després de vocal</th><th>Després de consonant</th></tr><tr><td>jo</td><td><b>'m</b> · mira'm</td><td><b>-me</b> · digues-me</td></tr><tr><td>tu</td><td><b>'t</b> · mira't</td><td><b>-te</b> · pren-te</td></tr><tr><td>ell</td><td><b>'l</b> · mira'l</td><td><b>-lo</b> · dir-lo</td></tr><tr><td>ella</td><td><b>-la</b> · mira-la</td><td><b>-la</b> · dir-la</td></tr><tr><td>ells</td><td><b>'ls</b> · mira'ls</td><td><b>-los</b> · dir-los</td></tr><tr><td>elles</td><td><b>-les</b></td><td><b>-les</b></td></tr><tr><td>nosaltres</td><td><b>'ns</b> · mira'ns</td><td><b>-nos</b> · digues-nos</td></tr><tr><td>això</td><td><b>-ho</b> · mira-ho</td><td><b>-ho</b> · dir-ho</td></tr><tr><td>en</td><td><b>'n</b> · parla'n</td><td><b>-ne</b> · pren-ne</td></tr><tr><td>hi</td><td><b>-hi</b> · porta-hi</td><td><b>-hi</b> · ves-hi</td></tr></table>` },
      { title: "Dos pronoms darrere", html: `<p>L'ordre és el mateix (indirecte + directe), tot amb guionets i apòstrof:</p><ul><li><i>Dóna-<b>me'l</b>.</i> (em + el) · <i>Digue-<b>m'ho</b>.</i> (em + ho)</li><li><i>Explica-<b>li-ho</b>.</i> (li + ho) · <i>Porta-<b>n'hi</b> dos.</i> (li + en)</li><li><i>Vull dir-<b>te'l</b>.</i> (et + el)</li></ul><p>L'<b>accent del verb no canvia</b> en afegir pronoms: <i>escolta → escolta'm</i>.</p>` },
      { title: "Davant o darrere?", html: `<p>Amb una <b>perífrasi</b> (voler, poder, deure, haver de, anar a + infinitiu), tens dues possibilitats, totes dues bones:</p><ul><li><i><b>La</b> vull veure</i> = <i>Vull veure<b>-la</b></i></li><li><i><b>M'ho</b> pots explicar?</i> = <i>Pots explicar-<b>m'ho</b>?</i></li><li><i><b>L'hi</b> he de dir</i> = <i>He de dir-<b>l'hi</b></i></li></ul><p>No es posen dues vegades: ❌ <s>La vull veure-la</s>.</p>` },
      { title: "Errors típics", html: `<ul><li>❌ <s>Digues-me ho</s> → ✅ <b>Digues-m'ho</b> (me + ho s'apostrofa: m'ho).</li><li>❌ <s>Mira-el</s> → ✅ <b>Mira'l</b>.</li><li>❌ <s>Dir-ho li</s> → ✅ <b>Dir-li-ho</b>.</li><li>❌ <s>No ho diguis-me</s> → ✅ <b>No me'l diguis</b> (amb negació, davant).</li><li>❌ <s>Vull-ho dir</s> → ✅ <b>Ho vull dir</b> / <b>Vull dir-ho</b> (el pronom s'uneix a l'infinitiu o va davant del primer verb).</li></ul>` }
    ],
    vocab: [
      { ca: "digues", es: "di (tú)" }, { ca: "dóna", es: "da (tú)" }, { ca: "mira", es: "mira" }, { ca: "escolta", es: "escucha" }, { ca: "porta", es: "lleva, trae" },
      { ca: "pren", es: "toma" }, { ca: "ves", es: "ve" }, { ca: "explica", es: "explica" }, { ca: "envia", es: "envía" }, { ca: "torna", es: "devuelve, vuelve" }, { ca: "deixa", es: "deja" }, { ca: "obre", es: "abre" }
    ],
    items: [
      c("«Mira el cotxe.» Substitueix el cotxe:", ["Mira'l.", "Mira-el.", "Mirael."], "Mira'l.", "Després de vocal: 'l."),
      c("«Digues-me això» → amb ho:", ["Digues-m'ho.", "Digues-me ho.", "Digue-m'ho."], "Digues-m'ho.", "Digues acaba en consonant: -me + ho = m'ho."),
      c("«Dóna'm el llibre» → amb el:", ["Dóna-me'l.", "Dóna'm el.", "Dóna-m'el."], "Dóna-me'l.", "Em + el = me'l, darrere: -me'l."),
      c("«Explica això a la Marta» → amb pronoms:", ["Explica-li-ho.", "Explica-ho-li.", "Explica'ls-ho."], "Explica-li-ho.", "Indirecte + directe: li-ho."),
      c("«Vull veure la Marta» → amb la:", ["Vull veure-la.", "Vull veure'la.", "Vull-la veure."], "Vull veure-la.", "Darrere d'infinitiu, guionet."),
      c("«Cal dir això» → amb ho:", ["Cal dir-ho.", "Cal dir'ho.", "Cal dirho."], "Cal dir-ho.", "Infinitiu + ho: guionet."),
      c("«Pren dos» (de cafès) → amb en:", ["Pren-ne dos.", "Pren'n dos.", "Pren-en dos."], "Pren-ne dos.", "Darrere de consonant: -ne."),
      c("«Vés al banc» → amb hi:", ["Ves-hi.", "Vés-hi.", "Ves'hi."], "Ves-hi.", "Ves + hi: guionet; sense accent."),
      c("«Escolta el professor» → amb el:", ["Escolta'l.", "Escolta-lo.", "Escolta-el."], "Escolta'l.", "Després de vocal: 'l."),
      c("«No miris el mòbil» → amb el:", ["No el miris.", "No mira'l.", "No miris-lo."], "No el miris.", "Imperatiu negatiu: davant."),
      c("Quina forma és correcta?", ["Porta-me'l.", "Porta'm el.", "Porta-el-me."], "Porta-me'l.", "Em + el = me'l."),
      c("Quina frase és correcta?", ["Vull dir-ho.", "Vull-ho dir.", "Vull dirho."], "Vull dir-ho.", "Ho s'uneix a l'infinitiu."),
      c("Quina frase és correcta?", ["Ho vull dir.", "Ho vull dir-ho.", "Vull-ho dir."], "Ho vull dir.", "Només un pronom, davant del primer verb."),
      c("Quina forma és correcta? (gerundi)", ["Dient-ho.", "Dient'ho.", "Dientho."], "Dient-ho.", "Gerundi + pronom: guionet."),
      c("«Vull portar els llibres» → amb els:", ["Vull portar-los.", "Vull portar'ls.", "Vull portar-els."], "Vull portar-los.", "Després de consonant (portar): -los."),
      g("«Mira el cotxe!» → «Mira___!»", ["'l"], "Després de vocal: 'l."),
      g("«Digues això a mi» → «Digues-___.»", ["m'ho"], "Em + ho: m'ho."),
      g("«Explica això a ell» → «Explica-___.»", ["li-ho"], "Li + ho: li-ho."),
      g("«Vull veure la Marta» → «Vull veure-___.»", ["la"], "Femení: -la."),
      g("«Compra dos» (de pomes) → «Compra-___ dos.»", ["'n"], "Després de vocal: 'n."),
      g("«Dir això a la Marta» → «Dir-___.»", ["li-ho"], "Li + ho."),
      g("«Anar-hi» en imperatiu: «___-hi!»", ["ves"], "Anar → ves (imperatiu)."),
      f("Corregeix: «Mira-el!»", ["Mira'l"], "Després de vocal: 'l."),
      f("Corregeix: «Digues-me ho.»", ["Digues-m'ho"], "Em + ho = m'ho."),
      f("Corregeix: «Dir-ho li.»", ["Dir-li-ho"], "L'indirecte va primer."),
      f("Corregeix: «Vull-ho dir.»", ["Ho vull dir"], "Davant del primer verb o enganxat a l'infinitiu."),
      f("Corregeix: «No ho diguis-me.»", ["No m'ho diguis"], "Amb negació, davant."),
      t("Substitueix per un pronom, darrere del verb: «Cal dir la veritat.»", ["Cal dir-la"], "Directe femení."),
      t("Substitueix per un pronom: «Dóna'm el llibre.» → amb el", ["Dóna-me'l"], "Em + el = me'l."),
      t("Passa a imperatiu amb pronoms: «Has d'explicar-ho a la Marta.»", ["Explica-li-ho"], "Imperatiu + li + ho."),
      t("Substitueix per un pronom: «Vull comprar dos.» (de pans)", ["Vull comprar-ne dos"], "Comprar + en: -ne."),
      t("Substitueix per un pronom: «Escolta el que et dic.»", ["Escolta-ho"], "Una oració o idea: ho.")
    ],
    dictation: ["Digues-m'ho tot, si us plau.", "Explica-li-ho abans de marxar.", "Vull veure-la demà.", "Dóna-me'l, que ja el porto.", "Pren-ne dos, que n'hi ha prou.", "No me'l diguis, que ja ho sé."]
  }
];

/** Tota la gramàtica a fons (pronoms febles ara; puntuació, accents i formes verbals en lots següents). */
export const GRAMMAR: Basic[] = [...GRAMMAR_PRON, ...GRAMMAR_PRON2];
