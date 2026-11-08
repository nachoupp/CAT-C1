/** Corrector ortogràfic i gramatical gratuït (api.languagetool.org). Màx. 20 peticions/min. */
export interface LtMatch {
  message: string;
  offset: number;
  length: number;
  replacements: { value: string }[];
  rule: { id: string; category?: { name: string } };
}

export async function checkText(text: string, language = "ca-ES"): Promise<LtMatch[]> {
  const res = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    body: new URLSearchParams({ text, language })
  });
  if (!res.ok) throw new Error("languagetool " + res.status);
  const data = (await res.json()) as { matches?: LtMatch[] };
  return data.matches ?? [];
}

/** Aplica una substitució i desplaça la resta d'errors. */
export function applyFix(text: string, matches: LtMatch[], index: number, value: string): { text: string; matches: LtMatch[] } {
  const m = matches[index];
  const next = text.slice(0, m.offset) + value + text.slice(m.offset + m.length);
  const delta = value.length - m.length;
  const rest = matches.filter((_, i) => i !== index).map((x) => (x.offset > m.offset ? { ...x, offset: x.offset + delta } : x));
  return { text: next, matches: rest };
}
