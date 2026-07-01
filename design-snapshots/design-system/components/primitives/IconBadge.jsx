import React from "react";

const SIZES = {
  sm: { box: 40, radius: "var(--radius-md)" },
  md: { box: 48, radius: "var(--radius-md)" },
  lg: { box: 56, radius: "var(--radius-xl)" },
};

const TONES = {
  primary: { background: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)" },
  success: { background: "color-mix(in srgb, var(--success) 15%, transparent)", color: "var(--success)" },
  destructive: { background: "color-mix(in srgb, var(--destructive) 10%, transparent)", color: "var(--destructive)" },
  warning: { background: "color-mix(in srgb, var(--warning) 15%, transparent)", color: "var(--warning)" },
  accent: { background: "var(--accent)", color: "var(--accent-foreground)" },
  neutral: { background: "var(--surface-container)", color: "var(--on-surface-variant)" },
};

/**
 * IconBadge — rounded square tile holding a single icon. Used in feature cards,
 * KPI tiles and trust stripes.
 */
export function IconBadge({ size = "md", tone = "primary", className = "", style = {}, children, ...rest }) {
  const s = SIZES[size] || SIZES.md;
  const t = TONES[tone] || TONES.primary;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        width: s.box,
        height: s.box,
        borderRadius: s.radius,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
