/** Sincronització del progrés amb Supabase (taula progress, una fila per usuari). */
import { useSyncExternalStore } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { getState, setState, subscribe } from "./store";
import { mergeStates } from "./merge";
import { go } from "./router";

export type SyncStatus = "off" | "signed-out" | "syncing" | "synced" | "error";
let status: SyncStatus = supabase ? "signed-out" : "off";
let session: Session | null = null;
let lastSync: number | null = null;
const ls = new Set<() => void>();
let snapshot: { status: SyncStatus; email: string | null; lastSync: number | null } = { status, email: null, lastSync };
const refresh = () => { snapshot = { status, email: session?.user.email ?? null, lastSync }; ls.forEach((l) => l()); };
const set = (s: SyncStatus) => { status = s; };

export function useSync(): { status: SyncStatus; email: string | null; lastSync: number | null } {
  return useSyncExternalStore((l) => { ls.add(l); return () => ls.delete(l); }, () => snapshot, () => snapshot);
}

let timer: ReturnType<typeof setTimeout> | undefined;
let unsub: (() => void) | null = null;

async function pull(): Promise<void> {
  if (!supabase || !session) return;
  set("syncing"); refresh();
  const { data, error } = await supabase.from("progress").select("state").eq("user_id", session.user.id).maybeSingle();
  if (error) { set("error"); refresh(); return; }
  if (data?.state) setState((s) => mergeStates(s, data.state), { silent: true });
  await push();
}

async function push(): Promise<void> {
  if (!supabase || !session) return;
  set("syncing"); refresh();
  const { error } = await supabase.from("progress").upsert({ user_id: session.user.id, state: getState(), updated_at: new Date().toISOString() });
  if (error) set("error"); else { lastSync = Date.now(); set("synced"); }
  refresh();
}

function onSession(s: Session | null): void {
  const changedUser = s?.user.id !== session?.user.id;
  session = s;
  if (!s) { unsub?.(); unsub = null; set(supabase ? "signed-out" : "off"); refresh(); return; }
  if (changedUser) {
    void pull();
    unsub?.();
    unsub = subscribe(() => { clearTimeout(timer); timer = setTimeout(() => void push(), 2500); });
  }
  refresh();
}

/** S'executa una vegada en arrencar l'app. */
export function initSync(): void {
  if (!supabase) return;
  void supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => onSession(data.session));
  supabase.auth.onAuthStateChange((event: string, s: Session | null) => {
    onSession(s);
    if (event === "PASSWORD_RECOVERY") go("nova-contrasenya");
  });
  window.addEventListener("online", () => void push());
}

export const syncNow = () => push();
