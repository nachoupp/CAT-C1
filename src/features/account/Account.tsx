import { useState, type FormEvent } from "react";
import { Page, Card, Btn, Note, Section } from "../../components/ui";
import { supabase } from "../../lib/supabase";
import { useSync, syncNow } from "../../lib/sync";
import { go } from "../../lib/router";
import { toast } from "../../lib/toast";

const input = "w-full rounded-xl bg-bg px-3.5 py-3 text-[16px]";
const redirect = () => `${location.origin}${location.pathname}`;

/** Targeta de compte per al Perfil. */
export function AccountCard() {
  const { status, email, lastSync } = useSync();
  if (status === "off") {
    return <Card className="p-4 text-[14px] text-muted">Els comptes encara no estan activats en aquest servidor. El progrés es desa en aquest dispositiu.</Card>;
  }
  if (!email) {
    return (
      <Card className="space-y-2 p-4">
        <div className="font-semibold">Desa el progrés al núvol</div>
        <p className="text-[14px] text-muted">Crea un compte amb el teu correu i continua des de qualsevol dispositiu sense perdre res.</p>
        <div className="flex gap-2"><Btn onClick={() => go("compte")}>Entra o crea un compte</Btn></div>
      </Card>
    );
  }
  const label = { syncing: "Sincronitzant…", synced: lastSync ? `Sincronitzat a les ${new Date(lastSync).toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit" })}` : "Sincronitzat", error: "Error de sincronització", "signed-out": "", off: "" }[status];
  return (
    <Card className="space-y-2 p-4">
      <div className="font-semibold">{email}</div>
      <div className={`text-[14px] ${status === "error" ? "text-bad" : "text-muted"}`}>{label}</div>
      <div className="flex flex-wrap gap-2">
        <Btn variant="soft" onClick={() => void syncNow()}>Sincronitza ara</Btn>
        <Btn variant="soft" onClick={async () => { await supabase?.auth.signOut(); toast("Sessió tancada"); }}>Tanca la sessió</Btn>
      </div>
    </Card>
  );
}

type Mode = "login" | "signup" | "reset";

export default function Account() {
  const { email: current } = useSync();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const back = { to: "perfil", label: "Perfil" };

  if (!supabase) return <Page title="Compte" back={back}><Note>Els comptes no estan configurats en aquest servidor.</Note></Page>;
  if (current) return <Page title="Compte" back={back}><Card className="p-4">Has entrat com a <b>{current}</b>. El progrés es desa automàticament.</Card><div className="mt-4"><Btn onClick={() => go("ruta")}>Torna a la ruta</Btn></div></Page>;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true); setMsg(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        toast("Benvinguda de nou"); go("perfil");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password: pass, options: { emailRedirectTo: redirect() } });
        if (error) throw error;
        if (data.session) { toast("Compte creat"); go("perfil"); }
        else setMsg("T'hem enviat un correu per confirmar el compte. Obre l'enllaç i tornaràs aquí amb la sessió iniciada.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect() });
        if (error) throw error;
        setMsg("Si el correu està registrat, rebràs un enllaç per crear una contrasenya nova.");
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : "";
      setMsg(/invalid login/i.test(m) ? "El correu o la contrasenya no són correctes." : /already registered/i.test(m) ? "Aquest correu ja té compte. Entra-hi o recupera la contrasenya." : /password/i.test(m) ? "La contrasenya ha de tenir almenys 6 caràcters." : "No s'ha pogut completar. Revisa la connexió i torna-ho a provar.");
    } finally { setBusy(false); }
  };

  const title = { login: "Entra", signup: "Crea un compte", reset: "Recupera la contrasenya" }[mode];
  return (
    <Page title={title} subtitle="El progrés es desa al núvol i el tens a tots els dispositius." back={back}>
      <form onSubmit={submit}>
        <Card className="space-y-3 p-4">
          <label className="block text-[14px] font-medium" htmlFor="acc-email">Correu electrònic</label>
          <input id="acc-email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
          {mode !== "reset" && (
            <>
              <label className="block text-[14px] font-medium" htmlFor="acc-pass">Contrasenya</label>
              <input id="acc-pass" type="password" required minLength={6} autoComplete={mode === "signup" ? "new-password" : "current-password"} value={pass} onChange={(e) => setPass(e.target.value)} className={input} />
            </>
          )}
          <Btn type="submit" block disabled={busy}>{busy ? "Un moment…" : mode === "login" ? "Entra" : mode === "signup" ? "Crea el compte" : "Envia'm l'enllaç"}</Btn>
          {msg && <div className="rounded-xl bg-accent/10 p-3 text-[14.5px]">{msg}</div>}
        </Card>
      </form>
      <Section title="Altres opcions">
        <Card className="space-y-2 p-4 text-[15px]">
          {mode !== "login" && <button type="button" className="block font-medium text-accent" onClick={() => { setMode("login"); setMsg(null); }}>Ja tinc compte: entra</button>}
          {mode !== "signup" && <button type="button" className="block font-medium text-accent" onClick={() => { setMode("signup"); setMsg(null); }}>No tinc compte: crea'n un</button>}
          {mode !== "reset" && <button type="button" className="block font-medium text-accent" onClick={() => { setMode("reset"); setMsg(null); }}>He oblidat la contrasenya</button>}
        </Card>
      </Section>
      <Note>Quan entris per primera vegada, el progrés que ja tens en aquest dispositiu s'afegirà al teu compte.</Note>
    </Page>
  );
}

export function NewPassword() {
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: pass });
    setBusy(false);
    if (error) toast("No s'ha pogut canviar. Torna a demanar l'enllaç."); else { toast("Contrasenya actualitzada"); go("perfil"); }
  };
  return (
    <Page title="Contrasenya nova" back={{ to: "perfil", label: "Perfil" }}>
      <form onSubmit={save}>
        <Card className="space-y-3 p-4">
          <label className="block text-[14px] font-medium" htmlFor="new-pass">Escriu la contrasenya nova</label>
          <input id="new-pass" type="password" required minLength={6} autoComplete="new-password" value={pass} onChange={(e) => setPass(e.target.value)} className={input} />
          <Btn type="submit" block disabled={busy}>{busy ? "Desant…" : "Desa la contrasenya"}</Btn>
        </Card>
      </form>
    </Page>
  );
}
