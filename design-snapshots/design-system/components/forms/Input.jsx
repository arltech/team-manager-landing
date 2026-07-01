import React from "react";

/** Input — text field with optional leading icon. Rounded, surface fill, primary focus ring. */
export function Input({ icon, size = "md", className = "", style = {}, wrapperStyle = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const pad = size === "lg" ? "14px 16px" : size === "sm" ? "9px 12px" : "12px 14px";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "var(--surface-container-low)",
        border: `1px solid ${focus ? "var(--primary)" : "var(--border)"}`,
        borderRadius: "var(--radius-lg)",
        padding: pad,
        transition: "border-color 150ms ease, box-shadow 150ms ease",
        boxShadow: focus ? "0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)" : "none",
        ...wrapperStyle,
      }}
    >
      {icon && <span style={{ color: "var(--on-surface-variant)", display: "inline-flex", flexShrink: 0 }}>{icon}</span>}
      <input
        className={className}
        onFocus={(e) => { setFocus(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur?.(e); }}
        style={{
          all: "unset",
          flex: 1,
          minWidth: 0,
          fontFamily: "var(--font-sans)",
          fontSize: 15,
          color: "var(--foreground)",
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}
