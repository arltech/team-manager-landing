import type { ReactNode } from "react";

type Tone =
  | "primary"
  | "success"
  | "destructive"
  | "accent"
  | "muted"
  | "dark-glass";

const TONE_CLASS: Record<Tone, string> = {
  primary:
    "bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/15",
  success:
    "bg-[var(--success-subtle)] text-[var(--success)] border border-[var(--success)]/20",
  destructive:
    "bg-[var(--destructive)]/10 text-[var(--destructive)] border border-[var(--destructive)]/20",
  accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
  muted:
    "bg-[var(--surface-container)] text-[var(--on-surface-variant)] border border-[var(--border)]",
  "dark-glass":
    "bg-white/10 text-white/85 border border-white/15 backdrop-blur-sm",
};

export function Pill({
  tone = "muted",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={`pill ${TONE_CLASS[tone]} ${className}`}>{children}</span>
  );
}
