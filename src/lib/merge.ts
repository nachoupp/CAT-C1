/** Fusió de progrés entre dispositius: no es perd res de cap dels dos. */
import type { AppState } from "./types";
import { migrate } from "./store";

const byKey = <T>(a: T[], b: T[], key: (x: T) => string | number): T[] => {
  const m = new Map<string | number, T>();
  for (const x of [...b, ...a]) m.set(key(x), x);
  return [...m.values()];
};

export function mergeStates(localRaw: AppState, remoteRaw: unknown): AppState {
  const local = migrate(localRaw), remote = migrate(remoteRaw);
  const newer = (local.updatedAt ?? 0) >= (remote.updatedAt ?? 0) ? local : remote;
  const older = newer === local ? remote : local;

  const log: AppState["log"] = { ...older.log };
  for (const [d, v] of Object.entries(newer.log)) log[d] = { ...(log[d] ?? {}), ...v };

  const units: AppState["units"] = { ...older.units };
  for (const [id, u] of Object.entries(newer.units)) {
    const o = units[id];
    units[id] = o ? { ...o, ...u, steps: { ...o.steps, ...u.steps }, passed: o.passed || u.passed, examScore: Math.max(o.examScore ?? 0, u.examScore ?? 0) || undefined, rewritten: o.rewritten || u.rewritten } : u;
  }
  const checkpoints: AppState["checkpoints"] = { ...older.checkpoints };
  for (const [id, c] of Object.entries(newer.checkpoints)) {
    const o = checkpoints[id];
    checkpoints[id] = o ? { passed: o.passed || c.passed, score: Math.max(o.score, c.score), at: Math.max(o.at, c.at) } : c;
  }
  const cards = { ...older.cards };
  for (const [id, c] of Object.entries(newer.cards)) { const o = cards[id]; cards[id] = !o || c.seen >= o.seen ? c : o; }
  const notebook = byKey(newer.notebook, older.notebook, (x) => x.id).map((x) => {
    const o = older.notebook.find((y) => y.id === x.id), n = newer.notebook.find((y) => y.id === x.id);
    if (!o || !n) return x;
    return { ...n, count: Math.max(o.count, n.count), card: n.card.seen >= o.card.seen ? n.card : o.card };
  });

  return {
    ...newer,
    log, units, checkpoints, cards, notebook,
    xp: byKey(newer.xp, older.xp, (x) => `${x.at}-${x.kind}`).sort((a, b) => a.at - b.at),
    quizzes: byKey(newer.quizzes, older.quizzes, (x) => x.at).sort((a, b) => a.at - b.at),
    writings: byKey(newer.writings, older.writings, (x) => x.at).sort((a, b) => a.at - b.at),
    speaking: byKey(newer.speaking, older.speaking, (x) => x.at).sort((a, b) => a.at - b.at),
    mocks: byKey(newer.mocks, older.mocks, (x) => x.at).sort((a, b) => a.at - b.at),
    audios: { ...older.audios, ...newer.audios },
    lessons: { ...older.lessons, ...newer.lessons },
    drafts: { ...older.drafts, ...newer.drafts },
    officialKeys: { ...older.officialKeys, ...newer.officialKeys },
    games: {
      match: [older.games.match, newer.games.match].filter((x): x is number => x !== undefined).sort((a, b) => a - b)[0],
      barb: Math.max(older.games.barb ?? 0, newer.games.barb ?? 0) || undefined
    },
    settings: { ...older.settings, ...newer.settings },
    updatedAt: Math.max(local.updatedAt ?? 0, remote.updatedAt ?? 0)
  };
}
