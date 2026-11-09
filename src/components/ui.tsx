import type { ReactNode, ButtonHTMLAttributes } from "react";
import { useWake } from "../lib/wakelock";
import { go } from "../lib/router";

export function Page({ title, subtitle, back, children }: { title: string; subtitle?: ReactNode; back?: { to: string; label: string; onClick?: () => void }; children: ReactNode }) {
  return (
    <main className="mx-auto max-w-[680px] px-4 pt-5 pb-28">
      <div className="flex min-h-[28px] items-center justify-between gap-2">
        {back ? <button onClick={back.onClick ?? (() => go(back.to))} className="text-accent font-medium">‹ {back.label}</button> : <span />}
        <WakeToggle />
      </div>
      <h1 className="mt-2 text-[32px] font-bold tracking-tight text-balance">{title}</h1>
      {subtitle && <p className="mt-0.5 mb-5 text-[15px] text-muted">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </main>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mx-1 mb-2 text-[13px] font-semibold uppercase tracking-wider text-muted">{title}</h2>
      {children}
    </section>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-2xl bg-card ${className}`}>{children}</div>;
}

export function List({ children }: { children: ReactNode }) {
  return <Card className="divide-y divide-line">{children}</Card>;
}

export function Row({ title, detail, left, right, onClick, to, chevron }: {
  title: ReactNode; detail?: ReactNode; left?: ReactNode; right?: ReactNode; onClick?: () => void; to?: string; chevron?: boolean;
}) {
  const inner = (
    <>
      {left}
      <div className="min-w-0 flex-1">
        <div className="font-medium">{title}</div>
        {detail && <div className="text-[13.5px] text-muted">{detail}</div>}
      </div>
      {right}
      {(chevron ?? !!(to || onClick)) && <span className="text-xl leading-none text-muted" aria-hidden>›</span>}
    </>
  );
  const cls = "flex w-full min-h-[52px] items-center gap-3 px-4 py-3 text-left";
  if (to || onClick) return <button className={cls} onClick={onClick ?? (() => go(to!))}>{inner}</button>;
  return <div className={cls}>{inner}</div>;
}

type Variant = "primary" | "soft" | "good" | "bad";
export function Btn({ variant = "primary", block, className = "", ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; block?: boolean }) {
  const v: Record<Variant, string> = {
    primary: "bg-accent text-white",
    soft: "bg-accent/10 text-accent",
    good: "bg-good text-white",
    bad: "bg-bad text-white"
  };
  return <button {...p} className={`rounded-xl px-4 py-3 font-semibold transition-opacity disabled:opacity-40 ${v[variant]} ${block ? "w-full" : ""} ${className}`} />;
}

type Tone = "accent" | "good" | "warn" | "bad" | "muted";
export function Pill({ tone = "accent", children }: { tone?: Tone; children: ReactNode }) {
  const t: Record<Tone, string> = {
    accent: "bg-accent/10 text-accent", good: "bg-good/15 text-good", warn: "bg-warn/15 text-warn", bad: "bg-bad/10 text-bad", muted: "bg-line text-muted"
  };
  return <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold tabular ${t[tone]}`}>{children}</span>;
}

export function Bar({ value, tone = "accent" }: { value: number; tone?: "accent" | "good" | "warn" }) {
  const c = { accent: "bg-accent", good: "bg-good", warn: "bg-warn" }[tone];
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <i className={`block h-full rounded-full transition-[width] duration-300 ${c}`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Check({ on, onClick, label }: { on: boolean; onClick?: () => void; label: string }) {
  return (
    <button onClick={onClick} aria-label={label} aria-pressed={on}
      className={`grid size-6 flex-none place-items-center rounded-full border-[1.5px] ${on ? "border-good bg-good" : "border-muted"}`}>
      {on && <span className="mb-0.5 block h-[11px] w-1.5 rotate-45 border-b-2 border-r-2 border-white" />}
    </button>
  );
}

export function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <Card className="p-4">
      <div className="text-[38px] font-bold leading-none tracking-tight tabular">{value}</div>
      <div className="mt-1.5 text-[13px] text-muted">{label}</div>
    </Card>
  );
}

export function Segmented<T extends string>({ value, options, onChange }: { value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div className="flex gap-0.5 rounded-[10px] bg-line p-0.5" role="group">
      {options.map((o) => (
        <button key={o.value} onClick={() => onChange(o.value)}
          className={`flex-1 rounded-lg py-1.5 text-sm font-medium ${o.value === value ? "bg-card shadow-sm" : ""}`}>{o.label}</button>
      ))}
    </div>
  );
}

export type IconTone = "accent" | "good" | "warn" | "bad" | "fg" | "comp" | "sist" | "escr" | "oral" | "gold";
export function Icon({ children, tone = "accent" }: { children: ReactNode; tone?: IconTone }) {
  const c = { accent: "bg-accent", good: "bg-good", warn: "bg-warn", bad: "bg-bad", fg: "bg-fg text-bg", comp: "bg-comp", sist: "bg-sist", escr: "bg-escr", oral: "bg-oral", gold: "bg-gold" }[tone];
  return <div className={`grid size-8 flex-none place-items-center rounded-lg text-sm font-bold text-white ${c}`}>{children}</div>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="mx-1 mt-3 text-[13.5px] text-muted">{children}</p>;
}

export function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener" className="font-medium text-accent">{children}</a>;
}

/** Botó per mantenir la pantalla encesa mentre estudies (només si el navegador ho permet). */
export function WakeToggle() {
  const w = useWake();
  if (!w.supported) return null;
  return (
    <button onClick={w.toggle} aria-pressed={w.on} title={w.on ? "La pantalla no s'apagarà" : "Mantén la pantalla encesa"}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold transition ${w.on ? "bg-warn/20 text-warn" : "bg-card text-muted"}`}>
      <span aria-hidden>{w.on ? "☀" : "☾"}</span>{w.on ? "Pantalla encesa" : "Pantalla"}
    </button>
  );
}
