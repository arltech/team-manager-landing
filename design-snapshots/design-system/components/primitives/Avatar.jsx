import React from "react";

/** Avatar — circular user image with initials fallback + optional ring. */
export function Avatar({ src, name = "", size = 48, ring = false, className = "", style = {}, ...rest }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const ringStyle = ring
    ? { boxShadow: "0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent), 0 4px 12px rgba(30,58,138,0.18)" }
    : {};

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        background: "var(--surface-container)",
        color: "var(--on-surface-variant)",
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        fontSize: Math.round(size * 0.36),
        ...ringStyle,
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials || "?"
      )}
    </span>
  );
}
