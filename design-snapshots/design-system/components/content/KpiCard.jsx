import React from "react";

/**
 * KpiCard — stat tile. "light" = prominent metric card (social proof / CRM);
 * "dark" = compact card for dark hero/dashboard surfaces.
 */
export function KpiCard({ icon, label, value, sub, delta, variant = "light", className = "", style = {}, ...rest }) {
  const dark = variant === "dark";
  return (
    <div
      className={className}
      style={{
        borderRadius: dark ? "var(--radius-lg)" : "var(--radius-2xl)",
        background: dark
          ? "rgba(255,255,255,0.04)"
          : "linear-gradient(to bottom, var(--surface-container-low), var(--surface-container))",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
        padding: dark ? 14 : 28,
        textAlign: "left",
        transition: "border-color 200ms ease, box-shadow 200ms ease",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: dark ? 8 : 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: dark ? 6 : 8, minWidth: 0 }}>
          <span style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--primary)", display: "inline-flex" }}>{icon}</span>
          <span
            style={{
              fontSize: dark ? 9 : 10,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: dark ? "0.06em" : "0.14em",
              color: dark ? "rgba(255,255,255,0.5)" : "var(--on-surface-variant)",
            }}
          >
            {label}
          </span>
        </div>
        {delta != null && (
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--success)", background: "var(--success-subtle)", padding: "2px 8px", borderRadius: "var(--radius-full)", whiteSpace: "nowrap" }}>
            {delta}
          </span>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          letterSpacing: "-0.025em",
          lineHeight: 1,
          fontSize: dark ? 24 : 38,
          color: dark ? "#fff" : "var(--foreground)",
          marginBottom: dark ? 2 : 8,
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: dark ? 10 : 13, color: dark ? "rgba(255,255,255,0.45)" : "var(--muted-foreground)", lineHeight: 1.5 }}>
          {sub}
        </div>
      )}
    </div>
  );
}
