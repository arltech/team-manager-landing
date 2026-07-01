import React from "react";
import { Pill } from "../primitives/Pill.jsx";

/**
 * SectionHeader — eyebrow pill + display title + optional subtitle. Left or
 * center aligned. The standard lead-in for every landing section.
 */
export function SectionHeader({ pill, pillTone = "primary", title, subtitle, align = "left", className = "", style = {}, ...rest }) {
  const center = align === "center";
  return (
    <div
      className={className}
      style={{
        maxWidth: center ? 768 : 640,
        marginLeft: center ? "auto" : undefined,
        marginRight: center ? "auto" : undefined,
        textAlign: center ? "center" : "left",
        ...style,
      }}
      {...rest}
    >
      {pill && (
        <div style={{ marginBottom: 24 }}>
          <Pill tone={pillTone}>{pill}</Pill>
        </div>
      )}
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.12,
          fontSize: "clamp(30px, 4vw, 48px)",
          color: "var(--foreground)",
          marginBottom: subtitle ? 24 : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "var(--muted-foreground)", fontSize: 18, lineHeight: 1.6, margin: 0 }}>{subtitle}</p>
      )}
    </div>
  );
}
