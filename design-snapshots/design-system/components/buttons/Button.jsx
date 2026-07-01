import React from "react";

/**
 * Button — Team Manager's primary action element.
 * Mirrors the landing page's .btn-primary (gradient + lift) and ghost/outline treatments.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  iconRight,
  disabled = false,
  fullWidth = false,
  className = "",
  style = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: { padding: "9px 16px", fontSize: 13, radius: "var(--radius-md)", gap: 6 },
    md: { padding: "14px 28px", fontSize: 15, radius: "var(--radius-lg)", gap: 8 },
    lg: { padding: "18px 36px", fontSize: 17, radius: "var(--radius-lg)", gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: s.fontSize,
    lineHeight: 1.1,
    padding: s.padding,
    borderRadius: s.radius,
    border: "0",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : undefined,
    transition: "transform 150ms ease, box-shadow 200ms ease, background 150ms ease, color 150ms ease",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, var(--primary), var(--primary-container))",
      color: "var(--primary-foreground)",
      boxShadow: "var(--shadow-btn)",
    },
    secondary: {
      background: "var(--surface-container)",
      color: "var(--foreground)",
      border: "1px solid var(--border)",
    },
    outline: {
      background: "transparent",
      color: "var(--primary)",
      border: "2px solid var(--primary)",
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)",
      fontWeight: 500,
    },
    white: {
      background: "#ffffff",
      color: "var(--primary)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    },
  };

  const styles = { ...base, ...(variants[variant] || variants.primary), ...style };

  const onEnter = (e) => {
    if (disabled) return;
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "var(--shadow-btn-hover)";
    } else if (variant === "outline") {
      e.currentTarget.style.background = "var(--primary)";
      e.currentTarget.style.color = "#fff";
    } else if (variant === "ghost") {
      e.currentTarget.style.color = "var(--primary)";
    } else if (variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--outline)";
    }
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = styles.boxShadow || "";
    e.currentTarget.style.background = variants[variant]?.background || "";
    e.currentTarget.style.color = variants[variant]?.color || "";
    if (variant === "secondary") e.currentTarget.style.borderColor = "var(--border)";
  };

  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  );

  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      style={styles}
      className={className}
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      {...rest}
    >
      {content}
    </Tag>
  );
}
