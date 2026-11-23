// Xifres → paraules en català, perquè la veu no les llegeixi en francès o castellà.
const U = ["zero", "un", "dos", "tres", "quatre", "cinc", "sis", "set", "vuit", "nou", "deu", "onze", "dotze", "tretze", "catorze", "quinze", "setze", "disset", "divuit", "dinou"];
const T = ["", "", "vint", "trenta", "quaranta", "cinquanta", "seixanta", "setanta", "vuitanta", "noranta"];

function below100(n) {
  if (n < 20) return U[n];
  const t = Math.floor(n / 10), u = n % 10;
  if (!u) return T[t];
  return t === 2 ? `vint-i-${U[u]}` : `${T[t]}-${U[u]}`;
}
function below1000(n) {
  if (n < 100) return below100(n);
  const c = Math.floor(n / 100), r = n % 100;
  const head = c === 1 ? "cent" : `${U[c]}-cents`;
  return r ? `${head} ${below100(r)}` : head;
}
export function numToCa(n) {
  if (!Number.isSafeInteger(n) || n < 0 || n >= 1e12) return String(n);
  if (n < 1000) return below1000(n);
  const parts = [];
  const mm = Math.floor(n / 1e6), rest = n % 1e6;
  if (mm) parts.push(mm === 1 ? "un milió" : `${numToCa(mm)} milions`);
  const th = Math.floor(rest / 1000), r = rest % 1000;
  if (th) parts.push(th === 1 ? "mil" : `${below1000(th)} mil`);
  if (r) parts.push(below1000(r));
  return parts.join(" ");
}
/** Substitueix els nombres enters (amb punts de milers) del text per paraules; deixa hores i decimals com estan. */
export function spellNumbers(text) {
  return text
    .replace(/(\d+)([ªºrnt]|è|a)\b/g, (m) => m) // ordinals abreujats: no es toquen
    .replace(/(?<![\d,:.])(\d{1,3}(?:\.\d{3})+|\d+)(?![\d]|[,:]\d|\.\d)/g, (m) => numToCa(Number(m.replace(/\./g, ""))));
}
