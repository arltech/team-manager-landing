import React from "react";

const TONES = {
  primary: { background: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)", border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)" },
  success: { background: "var(--success-subtle)", color: "var(--success)", border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)" },
  destructive: { background: "color-mix(in srgb, var(--destructive) 10%, transparent)", color: "var(--destructive)", border: "1px solid color-mix(in srgb, var(--destructive) 20%, transparent)" },
  accent: { background: "var(--accent)", color: "var(--accent-foreground)", border: "1px solid transparent" },
  muted: { background: "var(--surface-container)", color: "var(--on-surface-variant)", border: "1px solid var(--border)" },
  "dark-glass": { background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(4px)" },
  "solid-primary": { background: "var(--primary)", color: "#fff", border: "1px solid transparent" },
};

/**
 * Pill — uppercase eyebrow / tag. Used above section titles and as "Recomendado" badges.
 */
export function Pill({ tone = "muted", className = "", style = {}, children, ...rest }) {
  const t = TONES[tone] || TONES.muted;
  return (
    <span
      className={`pill ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11,
        fontWeight: 700,
        padding: "6px 12px",
        borderRadius: "var(--radius-full)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        lineHeight: 1.2,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
