import type { ReactNode } from "react";

type Tone =
  | "primary"
  | "success"
  | "destructive"
  | "warning"
  | "accent"
  | "neutral";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "w-10 h-10 rounded-xl",
  md: "w-12 h-12 rounded-xl",
  lg: "w-14 h-14 rounded-2xl",
};

const TONE_CLASS: Record<Tone, string> = {
  primary: "bg-[var(--primary)]/10 text-[var(--primary)]",
  success: "bg-[var(--success)]/15 text-[var(--success)]",
  destructive: "bg-[var(--destructive)]/10 text-[var(--destructive)]",
  warning: "bg-[var(--warning)]/15 text-[var(--warning)]",
  accent: "bg-[var(--accent)] text-[var(--accent-foreground)]",
  neutral:
    "bg-[var(--surface-container)] text-[var(--on-surface-variant)]",
};

export function IconBadge({
  size = "md",
  tone = "primary",
  className = "",
  children,
}: {
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`flex items-center justify-center flex-shrink-0 ${SIZE_CLASS[size]} ${TONE_CLASS[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
