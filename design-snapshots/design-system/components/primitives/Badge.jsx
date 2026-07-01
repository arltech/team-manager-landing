import React from "react";

const TONES = {
  primary: { background: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)" },
  success: { background: "color-mix(in srgb, var(--success) 12%, transparent)", color: "var(--success)" },
  destructive: { background: "color-mix(in srgb, var(--destructive) 10%, transparent)", color: "var(--destructive)" },
  warning: { background: "color-mix(in srgb, var(--warning) 12%, transparent)", color: "var(--warning)" },
  neutral: { background: "var(--surface-container)", color: "var(--on-surface-variant)" },
};

/**
 * Badge — status chip used in the CRM (Quente, Em negociação, Indeciso, Perdido).
 * Rounded-full, soft tonal fill, optional leading dot or icon.
 */
export function Badge({ tone = "neutral", dot = false, icon, count, className = "", style = {}, children, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        fontWeight: 600,
        padding: "6px 13px",
        borderRadius: "var(--radius-full)",
        lineHeight: 1.2,
        ...t,
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
      )}
      {icon}
      {children}
      {count != null && (
        <span style={{ fontWeight: 700, opacity: 0.85 }}>{count}</span>
      )}
    </span>
  );
}
