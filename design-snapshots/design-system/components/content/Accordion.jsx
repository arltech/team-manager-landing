import React from "react";

/**
 * Accordion — disclosure row. "card" variant = bordered card (FAQ, value stack);
 * "subtle" = filled surface row. Chevron rotates on open.
 */
export function Accordion({ summary, children, variant = "card", defaultOpen = false, className = "", style = {}, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const card = variant === "card";

  const wrap = card
    ? {
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-2xl)",
        padding: 28,
        boxShadow: "var(--shadow-card)",
        transition: "border-color 200ms ease",
      }
    : {
        background: "var(--surface-container-low)",
        border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
        borderRadius: "var(--radius-2xl)",
      };

  return (
    <div className={className} style={{ ...wrap, ...style }} {...rest}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          all: "unset",
          boxSizing: "border-box",
          cursor: "pointer",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: card ? 0 : "20px 24px",
        }}
      >
        <span style={{ flex: 1, minWidth: 0 }}>{summary}</span>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0, transition: "transform 200ms ease", transform: open ? "rotate(180deg)" : "none" }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div
          style={
            card
              ? { marginTop: 20, paddingTop: 20, borderTop: "1px solid color-mix(in srgb, var(--border) 40%, transparent)" }
              : { padding: "0 24px 24px" }
          }
        >
          {!card ? (
            <div style={{ borderTop: "1px solid color-mix(in srgb, var(--border) 40%, transparent)", paddingTop: 20 }}>{children}</div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
