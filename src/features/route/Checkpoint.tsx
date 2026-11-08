import { useMemo, useState } from "react";
import { Page, Card, Btn, Pill, Note, Section } from "../../components/ui";
import { ItemQuiz, ResultsList, type ItemResult } from "../../components/ItemQuiz";
import { CHECKPOINTS, UNITS, unitPool, type PracticeItem } from "../../content/units";
import { RULES_BY_UNIT } from "../../content/rules";
import { setState, award } from "../../lib/store";
import { shuffle } from "../../lib/text";
import { go } from "../../lib/router";

export default function Checkpoint({ id }: { id: string }) {
  const cp = CHECKPOINTS.find((c) => c.id === id);
  const items = useMemo<PracticeItem[]>(() => {
    if (!cp) return [];
    const pool = cp.units.flatMap((n) => { const c = UNITS[n - 1]?.content; return c ? [...unitPool(c), ...c.pretest] : []; });
    return shuffle(pool).slice(0, cp.units.length > 3 ? 20 : 15);
  }, [cp]);
  const [res, setRes] = useState<ItemResult[] | null>(null);
  const back = { to: "ruta", label: "Ruta" };
  if (!cp || items.length < 5) return <Page title="Control" back={back}><Note>Aquest control encara no té contingut.</Note></Page>;
  if (!res) {
    return (
      <Page title={cp.title} subtitle={`Unitats ${cp.units.join(", ")} barrejades · sense correcció fins al final`} back={back}>
        <ItemQuiz items={items} live={false} rules={cp.units.flatMap((n) => RULES_BY_UNIT[`u${n}`] ?? [])} title="Pregunta" onFinish={(r) => {
          const score = Math.round((r.filter((x) => x.ok).length / r.length) * 100);
          setState((s) => ({ ...s, checkpoints: { ...s.checkpoints, [cp.id]: { passed: (s.checkpoints[cp.id]?.passed ?? false) || score >= 60, score: Math.max(score, s.checkpoints[cp.id]?.score ?? 0), at: Date.now() } } }));
          if (score >= 60) award("checkpoint", "control");
          setRes(r);
        }} />
      </Page>
    );
  }
  const score = Math.round((res.filter((x) => x.ok).length / res.length) * 100);
  return (
    <Page title={cp.title} back={back}>
      <Card className="pop space-y-3 p-6 text-center">
        <div className="text-[40px]" aria-hidden>{score >= 60 ? "🏆" : "💪"}</div>
        <div className="text-[44px] font-bold tabular">{score} %</div>
        <Pill tone={score >= 60 ? "good" : "warn"}>{score >= 60 ? "Fase desbloquejada · +60 XP" : "Cal un 60 %. Fes una setmana de repàs i torna-hi."}</Pill>
        <div className="flex justify-center gap-2">
          <Btn onClick={() => go("ruta")}>Torna a la ruta</Btn>
          {score < 60 && <Btn variant="soft" onClick={() => go("repas")}>Repassa errors</Btn>}
        </div>
      </Card>
      <Section title="Correcció"><ResultsList results={res} /></Section>
    </Page>
  );
}
