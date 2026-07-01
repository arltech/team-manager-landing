/* @ds-bundle: {"format":3,"namespace":"TeamManagerDesignSystem_6cb67c","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"KpiCard","sourcePath":"components/content/KpiCard.jsx"},{"name":"SectionHeader","sourcePath":"components/content/SectionHeader.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Avatar","sourcePath":"components/primitives/Avatar.jsx"},{"name":"Badge","sourcePath":"components/primitives/Badge.jsx"},{"name":"Card","sourcePath":"components/primitives/Card.jsx"},{"name":"IconBadge","sourcePath":"components/primitives/IconBadge.jsx"},{"name":"Pill","sourcePath":"components/primitives/Pill.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"5c7cce97bfdd","components/content/Accordion.jsx":"990ed14f775a","components/content/KpiCard.jsx":"93627f80fe47","components/content/SectionHeader.jsx":"ce9de4d0af57","components/forms/Input.jsx":"c4258aad0c6a","components/primitives/Avatar.jsx":"f3f1bf6870ee","components/primitives/Badge.jsx":"2ec4df08dbeb","components/primitives/Card.jsx":"c247b62d1e83","components/primitives/IconBadge.jsx":"5e8a00206071","components/primitives/Pill.jsx":"e66b817fb539","ui_kits/landing/sections-1.jsx":"0211e1f74e90","ui_kits/landing/sections-2.jsx":"cb577fe77eb9","ui_kits/landing/v2-shared.jsx":"f5509dd68c84","ui_kits/landing/v2-whatsapp.jsx":"d67641eefaa0"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TeamManagerDesignSystem_6cb67c = window.TeamManagerDesignSystem_6cb67c || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — Team Manager's primary action element.
 * Mirrors the landing page's .btn-primary (gradient + lift) and ghost/outline treatments.
 */
function Button({
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
    sm: {
      padding: "9px 16px",
      fontSize: 13,
      radius: "var(--radius-md)",
      gap: 6
    },
    md: {
      padding: "14px 28px",
      fontSize: 15,
      radius: "var(--radius-lg)",
      gap: 8
    },
    lg: {
      padding: "18px 36px",
      fontSize: 17,
      radius: "var(--radius-lg)",
      gap: 10
    }
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
    whiteSpace: "nowrap"
  };
  const variants = {
    primary: {
      background: "linear-gradient(135deg, var(--primary), var(--primary-container))",
      color: "var(--primary-foreground)",
      boxShadow: "var(--shadow-btn)"
    },
    secondary: {
      background: "var(--surface-container)",
      color: "var(--foreground)",
      border: "1px solid var(--border)"
    },
    outline: {
      background: "transparent",
      color: "var(--primary)",
      border: "2px solid var(--primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--foreground)",
      fontWeight: 500
    },
    white: {
      background: "#ffffff",
      color: "var(--primary)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.18)"
    }
  };
  const styles = {
    ...base,
    ...(variants[variant] || variants.primary),
    ...style
  };
  const onEnter = e => {
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
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.transform = "";
    e.currentTarget.style.boxShadow = styles.boxShadow || "";
    e.currentTarget.style.background = variants[variant]?.background || "";
    e.currentTarget.style.color = variants[variant]?.color || "";
    if (variant === "secondary") e.currentTarget.style.borderColor = "var(--border)";
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, icon, children, iconRight);
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: styles,
    className: className,
    disabled: Tag === "button" ? disabled : undefined,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), content);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Accordion — disclosure row. "card" variant = bordered card (FAQ, value stack);
 * "subtle" = filled surface row. Chevron rotates on open.
 */
function Accordion({
  summary,
  children,
  variant = "card",
  defaultOpen = false,
  className = "",
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const card = variant === "card";
  const wrap = card ? {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-2xl)",
    padding: 28,
    boxShadow: "var(--shadow-card)",
    transition: "border-color 200ms ease"
  } : {
    background: "var(--surface-container-low)",
    border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
    borderRadius: "var(--radius-2xl)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      ...wrap,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    "aria-expanded": open,
    style: {
      all: "unset",
      boxSizing: "border-box",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
      padding: card ? 0 : "20px 24px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, summary), /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--primary)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      transition: "transform 200ms ease",
      transform: open ? "rotate(180deg)" : "none"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  }))), open && /*#__PURE__*/React.createElement("div", {
    style: card ? {
      marginTop: 20,
      paddingTop: 20,
      borderTop: "1px solid color-mix(in srgb, var(--border) 40%, transparent)"
    } : {
      padding: "0 24px 24px"
    }
  }, !card ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid color-mix(in srgb, var(--border) 40%, transparent)",
      paddingTop: 20
    }
  }, children) : children));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/KpiCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * KpiCard — stat tile. "light" = prominent metric card (social proof / CRM);
 * "dark" = compact card for dark hero/dashboard surfaces.
 */
function KpiCard({
  icon,
  label,
  value,
  sub,
  delta,
  variant = "light",
  className = "",
  style = {},
  ...rest
}) {
  const dark = variant === "dark";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      borderRadius: dark ? "var(--radius-lg)" : "var(--radius-2xl)",
      background: dark ? "rgba(255,255,255,0.04)" : "linear-gradient(to bottom, var(--surface-container-low), var(--surface-container))",
      border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
      padding: dark ? 14 : 28,
      textAlign: "left",
      transition: "border-color 200ms ease, box-shadow 200ms ease",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
      marginBottom: dark ? 8 : 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: dark ? 6 : 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: dark ? "rgba(255,255,255,0.7)" : "var(--primary)",
      display: "inline-flex"
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: dark ? 9 : 10,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: dark ? "0.06em" : "0.14em",
      color: dark ? "rgba(255,255,255,0.5)" : "var(--on-surface-variant)"
    }
  }, label)), delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--success)",
      background: "var(--success-subtle)",
      padding: "2px 8px",
      borderRadius: "var(--radius-full)",
      whiteSpace: "nowrap"
    }
  }, delta)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1,
      fontSize: dark ? 24 : 38,
      color: dark ? "#fff" : "var(--foreground)",
      marginBottom: dark ? 2 : 8
    }
  }, value), sub && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: dark ? 10 : 13,
      color: dark ? "rgba(255,255,255,0.45)" : "var(--muted-foreground)",
      lineHeight: 1.5
    }
  }, sub));
}
Object.assign(__ds_scope, { KpiCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/KpiCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Input — text field with optional leading icon. Rounded, surface fill, primary focus ring. */
function Input({
  icon,
  size = "md",
  className = "",
  style = {},
  wrapperStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const pad = size === "lg" ? "14px 16px" : size === "sm" ? "9px 12px" : "12px 14px";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: "var(--surface-container-low)",
      border: `1px solid ${focus ? "var(--primary)" : "var(--border)"}`,
      borderRadius: "var(--radius-lg)",
      padding: pad,
      transition: "border-color 150ms ease, box-shadow 150ms ease",
      boxShadow: focus ? "0 0 0 3px color-mix(in srgb, var(--primary) 12%, transparent)" : "none",
      ...wrapperStyle
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--on-surface-variant)",
      display: "inline-flex",
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    className: className,
    onFocus: e => {
      setFocus(true);
      rest.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur?.(e);
    },
    style: {
      all: "unset",
      flex: 1,
      minWidth: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--foreground)",
      ...style
    }
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Avatar — circular user image with initials fallback + optional ring. */
function Avatar({
  src,
  name = "",
  size = 48,
  ring = false,
  className = "",
  style = {},
  ...rest
}) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const ringStyle = ring ? {
    boxShadow: "0 0 0 2px color-mix(in srgb, var(--primary) 15%, transparent), 0 4px 12px rgba(30,58,138,0.18)"
  } : {};
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
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
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  primary: {
    background: "color-mix(in srgb, var(--primary) 10%, transparent)",
    color: "var(--primary)"
  },
  success: {
    background: "color-mix(in srgb, var(--success) 12%, transparent)",
    color: "var(--success)"
  },
  destructive: {
    background: "color-mix(in srgb, var(--destructive) 10%, transparent)",
    color: "var(--destructive)"
  },
  warning: {
    background: "color-mix(in srgb, var(--warning) 12%, transparent)",
    color: "var(--warning)"
  },
  neutral: {
    background: "var(--surface-container)",
    color: "var(--on-surface-variant)"
  }
};

/**
 * Badge — status chip used in the CRM (Quente, Em negociação, Indeciso, Perdido).
 * Rounded-full, soft tonal fill, optional leading dot or icon.
 */
function Badge({
  tone = "neutral",
  dot = false,
  icon,
  count,
  className = "",
  style = {},
  children,
  ...rest
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 13,
      fontWeight: 600,
      padding: "6px 13px",
      borderRadius: "var(--radius-full)",
      lineHeight: 1.2,
      ...t,
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "currentColor",
      flexShrink: 0
    }
  }), icon, children, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      opacity: 0.85
    }
  }, count));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Badge.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the signature surface: white, 1px border, 21.6px radius, soft shadow,
 * border + shadow lift on hover. featured adds a primary border + glow.
 */
function Card({
  featured = false,
  hover = true,
  padding = 32,
  className = "",
  style = {},
  children,
  ...rest
}) {
  const [over, setOver] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    onMouseEnter: () => setOver(true),
    onMouseLeave: () => setOver(false),
    style: {
      background: "var(--card)",
      border: featured ? "2px solid var(--primary)" : "1px solid var(--border)",
      borderColor: !featured && hover && over ? "var(--outline)" : undefined,
      borderRadius: "var(--radius-2xl)",
      padding,
      boxShadow: featured ? "var(--shadow-glow-primary)" : hover && over ? "var(--shadow-card-hover)" : "var(--shadow-card)",
      transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
      position: "relative",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Card.jsx", error: String((e && e.message) || e) }); }

// components/primitives/IconBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    box: 40,
    radius: "var(--radius-md)"
  },
  md: {
    box: 48,
    radius: "var(--radius-md)"
  },
  lg: {
    box: 56,
    radius: "var(--radius-xl)"
  }
};
const TONES = {
  primary: {
    background: "color-mix(in srgb, var(--primary) 10%, transparent)",
    color: "var(--primary)"
  },
  success: {
    background: "color-mix(in srgb, var(--success) 15%, transparent)",
    color: "var(--success)"
  },
  destructive: {
    background: "color-mix(in srgb, var(--destructive) 10%, transparent)",
    color: "var(--destructive)"
  },
  warning: {
    background: "color-mix(in srgb, var(--warning) 15%, transparent)",
    color: "var(--warning)"
  },
  accent: {
    background: "var(--accent)",
    color: "var(--accent-foreground)"
  },
  neutral: {
    background: "var(--surface-container)",
    color: "var(--on-surface-variant)"
  }
};

/**
 * IconBadge — rounded square tile holding a single icon. Used in feature cards,
 * KPI tiles and trust stripes.
 */
function IconBadge({
  size = "md",
  tone = "primary",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const t = TONES[tone] || TONES.primary;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: s.box,
      height: s.box,
      borderRadius: s.radius,
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/IconBadge.jsx", error: String((e && e.message) || e) }); }

// components/primitives/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  primary: {
    background: "color-mix(in srgb, var(--primary) 10%, transparent)",
    color: "var(--primary)",
    border: "1px solid color-mix(in srgb, var(--primary) 15%, transparent)"
  },
  success: {
    background: "var(--success-subtle)",
    color: "var(--success)",
    border: "1px solid color-mix(in srgb, var(--success) 20%, transparent)"
  },
  destructive: {
    background: "color-mix(in srgb, var(--destructive) 10%, transparent)",
    color: "var(--destructive)",
    border: "1px solid color-mix(in srgb, var(--destructive) 20%, transparent)"
  },
  accent: {
    background: "var(--accent)",
    color: "var(--accent-foreground)",
    border: "1px solid transparent"
  },
  muted: {
    background: "var(--surface-container)",
    color: "var(--on-surface-variant)",
    border: "1px solid var(--border)"
  },
  "dark-glass": {
    background: "rgba(255,255,255,0.10)",
    color: "rgba(255,255,255,0.85)",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(4px)"
  },
  "solid-primary": {
    background: "var(--primary)",
    color: "#fff",
    border: "1px solid transparent"
  }
};

/**
 * Pill — uppercase eyebrow / tag. Used above section titles and as "Recomendado" badges.
 */
function Pill({
  tone = "muted",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const t = TONES[tone] || TONES.muted;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: `pill ${className}`,
    style: {
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
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/primitives/Pill.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionHeader — eyebrow pill + display title + optional subtitle. Left or
 * center aligned. The standard lead-in for every landing section.
 */
function SectionHeader({
  pill,
  pillTone = "primary",
  title,
  subtitle,
  align = "left",
  className = "",
  style = {},
  ...rest
}) {
  const center = align === "center";
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    style: {
      maxWidth: center ? 768 : 640,
      marginLeft: center ? "auto" : undefined,
      marginRight: center ? "auto" : undefined,
      textAlign: center ? "center" : "left",
      ...style
    }
  }, rest), pill && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    tone: pillTone
  }, pill)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-heading)",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      lineHeight: 1.12,
      fontSize: "clamp(30px, 4vw, 48px)",
      color: "var(--foreground)",
      marginBottom: subtitle ? 24 : 0
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--muted-foreground)",
      fontSize: 18,
      lineHeight: 1.6,
      margin: 0
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/sections-1.jsx
try { (() => {
/* Team Manager — Landing page sections (UI kit).
   Recreates the real sales page (src/app/_components/*) using the design-system
   primitives from the bundle. Exports each section to window for index.html. */

(function () {
  const TM = window.TeamManagerDesignSystem_6cb67c;
  const {
    Button,
    Pill,
    Card,
    IconBadge,
    KpiCard,
    SectionHeader,
    Accordion,
    Avatar
  } = TM;

  /* ── Inline icon helper (Lucide paths, stroke 2) ── */
  function Icon({
    d,
    size = 24,
    fill = "none",
    sw = 2,
    children
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: fill,
      stroke: "currentColor",
      strokeWidth: sw,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        display: "inline-block",
        flexShrink: 0
      }
    }, children || /*#__PURE__*/React.createElement("path", {
      d: d
    }));
  }
  const Arrow = p => /*#__PURE__*/React.createElement(Icon, {
    size: p.size || 18
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 5 7 7-7 7"
  })));
  const Shield = p => /*#__PURE__*/React.createElement(Icon, {
    size: p.size || 24
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }));
  const Spark = p => /*#__PURE__*/React.createElement(Icon, {
    size: p.size || 14,
    fill: "currentColor",
    sw: 0
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2 6.5L20.5 10.5 14 12.5 12 19l-2-6.5L3.5 10.5 10 8.5z"
  }));
  const Bot = () => /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M12 8V4H8"
  }), /*#__PURE__*/React.createElement("rect", {
    width: "16",
    height: "12",
    x: "4",
    y: "8",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 14h2M20 14h2M15 13v2M9 13v2"
  })));
  const Heart = () => /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M7.5 3C5 3 3 5 3 7.5c0 5 7 9 9 11 2-2 9-6 9-11C21 5 19 3 16.5 3c-1.5 0-3 1-4.5 2.5C10.5 4 9 3 7.5 3z"
  })));
  const Eye = () => /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })));
  const FileCheck = () => /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 2v6h6M9 15l2 2 4-4"
  })));
  const Target = () => /*#__PURE__*/React.createElement(Icon, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "2"
  })));
  const Layers = () => /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "m12 2 9 5-9 5-9-5 9-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m3 12 9 5 9-5M3 17l9 5 9-5"
  })));
  const Cap = () => /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M22 10 12 5 2 10l10 5 10-5Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"
  })));
  const Clock = () => /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 6v6l4 2"
  })));
  const Check = () => /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })));
  const Quote = () => /*#__PURE__*/React.createElement(Icon, {
    size: 64,
    sw: 1.5
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.5C2 21 2 21 3 21z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2-2-2h-4c-1.25 0-2 .75-2 2v8c0 1.25.75 2 2 2h.5c1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.5C14 21 14 21 15 21z"
  })));
  const Db = () => /*#__PURE__*/React.createElement(Icon, {
    size: 18,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ellipse", {
    cx: "12",
    cy: "5",
    rx: "9",
    ry: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 12c0 1.66 4 3 9 3s9-1.34 9-3"
  })));
  const ShieldCheck = () => /*#__PURE__*/React.createElement(Icon, {
    size: 18,
    sw: 2.4
  }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })));
  const Zap = () => /*#__PURE__*/React.createElement(Icon, {
    size: 18,
    sw: 2.4
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
  }));
  window.TMIcons = {
    Arrow,
    Shield,
    Spark
  };

  /* ─────────────────────────  HEADER  ───────────────────────── */
  function Header({
    onCta
  }) {
    const NAV = [["O Problema", "problema"], ["Solução", "solucao"], ["Preços", "oferta"], ["FAQ", "faq"]];
    return /*#__PURE__*/React.createElement("header", {
      className: "tm-header",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1152,
        margin: "0 auto",
        padding: "0 24px",
        height: 88,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.png",
      alt: "Team Manager",
      style: {
        height: 60,
        filter: "drop-shadow(0 2px 10px rgba(99,102,241,0.25))"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 28
      }
    }, NAV.map(([label, id]) => /*#__PURE__*/React.createElement("a", {
      key: id,
      href: "#" + id,
      style: {
        fontSize: 14,
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)"
      }
    }, label))), /*#__PURE__*/React.createElement(Button, {
      variant: "white",
      size: "sm",
      onClick: onCta
    }, "Demonstra\xE7\xE3o")));
  }

  /* ─────────────────────────  HERO  ───────────────────────── */
  function Hero({
    onCta,
    slide,
    setSlide
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "hero-gradient",
      style: {
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1024,
        margin: "0 auto",
        padding: "160px 24px 128px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 28
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      tone: "dark-glass"
    }, "Para redes de escolas e cursos com 2 a 15 unidades")), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.12,
        fontSize: "clamp(28px,5vw,52px)",
        maxWidth: 760,
        margin: "0 auto 28px",
        color: "#fff"
      }
    }, "Voc\xEA vai parar de ser o \xFAnico que se importa com a meta de matr\xEDcula.", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "rgba(255,255,255,0.45)"
      }
    }, "N\xE3o porque pediu."), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#fff"
      }
    }, "Porque o sistema criou cultura.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        color: "rgba(255,255,255,0.75)",
        maxWidth: 576,
        margin: "0 auto 40px",
        lineHeight: 1.6
      }
    }, "Team Manager \xE9 o sistema de opera\xE7\xE3o para redes de escolas e cursos que faz o trabalho de cobrar, lembrar, reconhecer e reportar \u2014 para que voc\xEA fa\xE7a o trabalho de crescer a rede."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        marginBottom: 64
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconRight: /*#__PURE__*/React.createElement(Arrow, null),
      onClick: onCta
    }, "Agendar demonstra\xE7\xE3o"), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconRight: /*#__PURE__*/React.createElement(Arrow, {
        size: 16
      }),
      onClick: onCta
    }, "Diagn\xF3stico em 2 min")), /*#__PURE__*/React.createElement(DashboardCarousel, {
      slide: slide,
      setSlide: setSlide
    })));
  }
  function DashboardCarousel({
    slide,
    setSlide
  }) {
    const slides = [1, 2, 3, 4];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 920,
        margin: "0 auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: "var(--radius-2xl)",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        background: "#0a0e27"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `../../assets/dashboard/slide-${slide}.png`,
      alt: "Team Manager dashboard",
      style: {
        width: "100%",
        display: "block"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center",
        gap: 8,
        marginTop: 18
      }
    }, slides.map(s => /*#__PURE__*/React.createElement("button", {
      key: s,
      onClick: () => setSlide(s),
      "aria-label": `Slide ${s}`,
      style: {
        height: 4,
        borderRadius: 999,
        border: 0,
        cursor: "pointer",
        transition: "all .2s",
        width: s === slide ? 32 : 6,
        background: s === slide ? "#fff" : "rgba(255,255,255,0.3)"
      }
    }))));
  }

  /* ─────────────────────────  PROBLEM  ───────────────────────── */
  const PAINS = [["Você sabe o resultado do mês só quando o mês acabou.", true], ["Tem assessor que some por dois dias e você descobre na reunião de sexta.", true], ["Seu time não tem problema com meta — tem problema com ser visto.", false], ["Você passa segunda de manhã reconstruindo a semana — de memória, com números errados.", true], ["Cada unidade tem uma planilha diferente. Nenhuma tem a mesma coluna.", false], ["O follow-up depende de o assessor lembrar. O assessor esquece. O lead some.", false]];
  function Problem() {
    return /*#__PURE__*/React.createElement("section", {
      id: "problema",
      className: "section-y",
      style: {
        background: "var(--surface)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 896,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      pill: "O Problema",
      pillTone: "destructive",
      title: "Reconhece algum desses?",
      align: "left"
    }), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: "40px 0 0",
        display: "flex",
        flexDirection: "column",
        gap: 28
      }
    }, PAINS.map(([t, emph], i) => /*#__PURE__*/React.createElement("li", {
      key: i,
      style: {
        display: "flex",
        gap: 20,
        fontSize: 20,
        lineHeight: 1.5,
        color: emph ? "var(--foreground)" : "var(--muted-foreground)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        marginTop: 4,
        width: 28,
        height: 28,
        borderRadius: "50%",
        fontSize: 12,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: emph ? "color-mix(in srgb,var(--destructive) 10%,transparent)" : "var(--surface-container)",
        color: emph ? "var(--destructive)" : "var(--on-surface-variant)"
      }
    }, i + 1), /*#__PURE__*/React.createElement("span", null, t)))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 80,
        padding: "48px",
        borderRadius: 24,
        border: "1px solid color-mix(in srgb,var(--destructive) 15%,transparent)",
        background: "color-mix(in srgb,var(--destructive) 4%,transparent)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 1.3,
        color: "var(--foreground)",
        margin: 0,
        fontFamily: "var(--font-heading)"
      }
    }, "Se voc\xEA precisa ", /*#__PURE__*/React.createElement("em", null, "perguntar"), " pra saber o que aconteceu, voc\xEA n\xE3o est\xE1 gerenciando. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--destructive)"
      }
    }, "Est\xE1 investigando.")))));
  }

  /* ─────────────────────────  SOLUTION  ───────────────────────── */
  const CARDS = [{
    icon: /*#__PURE__*/React.createElement(Bot, null),
    title: "Cobrança que acontece sem você",
    is: "Automação 24/7: monitora presença, follow-ups atrasados e prazos — e age antes de você precisar pedir.",
    el: ["A reunião de cobrança", "O WhatsApp de \"você viu o lead?\"", "O assessor que some porque ninguém percebeu"]
  }, {
    icon: /*#__PURE__*/React.createElement(Heart, null),
    title: "Cultura de reconhecimento via WhatsApp",
    is: "Matrículas e top performers são anunciados automaticamente no grupo da equipe — antes de você saber, já foi celebrado.",
    el: ["O assessor que pede demissão por \"nunca ser reconhecido\"", "A cultura de pressão que mata engajamento"]
  }, {
    icon: /*#__PURE__*/React.createElement(Eye, null),
    title: "Visibilidade sem presença",
    is: "Funil, rotinas, tarefas e ranking de cada unidade em tempo real, com filtro por unidade, sem depender de ninguém te mandar nada.",
    el: ["A reunião de segunda", "O \"deixa eu te mandar o número\"", "O relatório que chega sexta às 18h"]
  }, {
    icon: /*#__PURE__*/React.createElement(FileCheck, null),
    title: "Operação que se auto-documenta",
    is: "Rotina semanal puxa dados do CRM automaticamente. Scripts de vendas gerados por IA a partir do perfil do lead.",
    el: ["Dado digitado duas vezes", "Reunião de treinamento de script", "Assessor que \"não sabia o que falar\""]
  }, {
    icon: /*#__PURE__*/React.createElement(Target, null),
    title: "Do primeiro contato à matrícula",
    is: "IA encontra leads em fontes públicas, o sistema distribui pra unidade certa e cobra follow-up candidato a candidato.",
    el: ["Candidato que pediu informação e sumiu", "Planilha de captação sem dono", "Lista da franqueadora que vira pasta esquecida"]
  }];
  function Solution() {
    return /*#__PURE__*/React.createElement("section", {
      id: "solucao",
      className: "section-y",
      style: {
        background: "var(--surface-container-low)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1152,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement(SectionHeader, {
      pill: "A Solu\xE7\xE3o",
      pillTone: "primary",
      title: "Team Manager foi constru\xEDdo pra isso.",
      align: "center",
      style: {
        marginBottom: 64
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 32
      }
    }, CARDS.map((c, i) => /*#__PURE__*/React.createElement(Card, {
      key: i,
      style: i === CARDS.length - 1 ? {
        gridColumn: "1 / -1"
      } : {}
    }, /*#__PURE__*/React.createElement(IconBadge, {
      size: "lg",
      tone: "primary",
      style: {
        marginBottom: 28
      }
    }, c.icon), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 24,
        marginBottom: 20,
        color: "var(--foreground)"
      }
    }, c.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "var(--on-surface-variant)",
        marginBottom: 8
      }
    }, "O que \xE9"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        marginBottom: 28,
        lineHeight: 1.6
      }
    }, c.is), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        color: "color-mix(in srgb,var(--destructive) 85%,transparent)",
        marginBottom: 12
      }
    }, "O que elimina"), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, c.el.map((e, j) => /*#__PURE__*/React.createElement("li", {
      key: j,
      style: {
        fontSize: 14,
        color: "var(--muted-foreground)",
        display: "flex",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "color-mix(in srgb,var(--destructive) 70%,transparent)",
        fontFamily: "monospace",
        marginTop: 2
      }
    }, "\xD7"), /*#__PURE__*/React.createElement("span", null, e)))))))));
  }
  window.TMLanding = {
    Header,
    Hero,
    Problem,
    Solution,
    icons: {
      Arrow,
      Shield,
      Spark,
      Layers,
      Cap,
      Clock,
      Check,
      Quote,
      Db,
      ShieldCheck,
      Zap
    }
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/sections-1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/sections-2.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Team Manager — Landing sections part 2: SocialProof, Offer, Faq, CtaFinal. */

(function () {
  const TM2 = window.TeamManagerDesignSystem_6cb67c;
  const {
    Button: Btn,
    Pill: Pl,
    Card: Cd,
    IconBadge: IB,
    KpiCard: KC,
    SectionHeader: SH,
    Accordion: Ac,
    Avatar: Av
  } = TM2;
  const {
    Arrow,
    Shield,
    Spark,
    Layers,
    Cap,
    Clock,
    Check,
    Quote,
    Db,
    ShieldCheck,
    Zap
  } = window.TMLanding.icons;

  /* ─────────────────────────  SOCIAL PROOF  ───────────────────────── */
  const KPIS = [{
    icon: /*#__PURE__*/React.createElement(Layers, null),
    value: "14",
    label: "componentes integrados",
    sub: "CRM + tarefas + rotinas + ranking + IA"
  }, {
    icon: /*#__PURE__*/React.createElement(Cap, null),
    value: "4",
    label: "segmentos de matrícula",
    sub: "Idiomas, profissional, infantil, regular"
  }, {
    icon: /*#__PURE__*/React.createElement(Clock, null),
    value: "72h",
    label: "do setup ao 1º insight",
    sub: "Setup técnico + onboarding incluso"
  }, {
    icon: /*#__PURE__*/React.createElement(Check, null),
    value: "30 dias",
    label: "garantia integral",
    sub: "100% devolvido se equipe não usar"
  }];
  const TESTIMONIALS = [{
    quote: "Antes eu ligava toda segunda perguntando 'cadê as matrículas da unidade?'. Agora a unidade me liga na sexta dizendo 'fechei a meta'.",
    role: "Diretor de rede",
    context: "3 unidades · Escola de idiomas · Piloto Team Manager"
  }, {
    quote: "Em 6 semanas parei de cobrar follow-up. O sistema cobra sozinho. Eu olho o que importa: por que a unidade A matricula 30% mais que a B.",
    role: "Sócia-fundadora",
    context: "5 unidades · Cursos profissionalizantes · Piloto Team Manager"
  }, {
    quote: "Pela primeira vez sei quais consultoras fizeram follow-up de cada candidato sem abrir 4 planilhas. O ranking aparece sexta de manhã.",
    role: "Coordenador comercial",
    context: "4 unidades · Preparatório vestibular · Piloto Team Manager"
  }];
  const TRUST = [{
    icon: /*#__PURE__*/React.createElement(Db, null),
    title: "Cada unidade vê só o que é dela",
    body: "A permissão é na raiz dos dados, não num filtro de tela. Auditável e à prova de erro humano."
  }, {
    icon: /*#__PURE__*/React.createElement(ShieldCheck, null),
    title: "Auditoria e LGPD prontas",
    body: "Histórico de acesso por usuário, exportação sob demanda, retenção que você define."
  }, {
    icon: /*#__PURE__*/React.createElement(Zap, null),
    title: "2 horas pra estar rodando",
    body: "Templates prontos por segmento de escola. Sem consultoria de 3 meses."
  }];
  function SocialProof() {
    const [ti, setTi] = React.useState(0);
    React.useEffect(() => {
      const id = setInterval(() => setTi(i => (i + 1) % TESTIMONIALS.length), 7000);
      return () => clearInterval(id);
    }, []);
    const t = TESTIMONIALS[ti];
    return /*#__PURE__*/React.createElement("section", {
      className: "section-y",
      style: {
        background: "var(--surface)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1152,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement(SH, {
      align: "center",
      style: {
        marginBottom: 64
      },
      pill: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--success)"
        }
      }), "Em produ\xE7\xE3o hoje"),
      pillTone: "success",
      title: /*#__PURE__*/React.createElement(React.Fragment, null, "N\xE3o \xE9 beta. N\xE3o \xE9 demo.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--muted-foreground)"
        }
      }, "\xC9 opera\xE7\xE3o rodando.")),
      subtitle: "Sistema s\xF3lido, dados reais, retorno mensur\xE1vel nos primeiros 7 dias."
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 24,
        marginBottom: 80
      }
    }, KPIS.map((k, i) => /*#__PURE__*/React.createElement(KC, _extends({
      key: i
    }, k)))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: 896,
        margin: "0 auto 80px"
      }
    }, /*#__PURE__*/React.createElement(Cd, {
      hover: false,
      padding: 56,
      style: {
        background: "linear-gradient(135deg, var(--card), var(--surface-container-low))",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: 32,
        right: 32,
        color: "color-mix(in srgb,var(--primary) 15%,transparent)"
      }
    }, /*#__PURE__*/React.createElement(Quote, null)), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 26,
        fontWeight: 600,
        lineHeight: 1.35,
        color: "var(--foreground)",
        margin: "0 0 32px",
        maxWidth: 640
      }
    }, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Av, {
      name: t.role,
      ring: true
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 14,
        color: "var(--foreground)"
      }
    }, t.role), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)"
      }
    }, t.context))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginTop: 24
      }
    }, TESTIMONIALS.map((_, i) => /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setTi(i),
      "aria-label": `Depoimento ${i + 1}`,
      style: {
        height: 4,
        borderRadius: 999,
        border: 0,
        cursor: "pointer",
        transition: "all .2s",
        width: i === ti ? 32 : 6,
        background: i === ti ? "var(--primary)" : "var(--border)"
      }
    }))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 20
      }
    }, TRUST.map((tr, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 16,
        padding: 24,
        borderRadius: 16,
        background: "var(--surface-container-low)",
        border: "1px solid color-mix(in srgb,var(--border) 40%,transparent)"
      }
    }, /*#__PURE__*/React.createElement(IB, {
      size: "sm",
      tone: "primary"
    }, tr.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        margin: "0 0 6px",
        color: "var(--foreground)",
        lineHeight: 1.2
      }
    }, tr.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)",
        lineHeight: 1.6,
        margin: 0
      }
    }, tr.body)))))));
  }

  /* ─────────────────────────  OFFER  ───────────────────────── */
  const PLANS = [{
    name: "Starter",
    units: "1-2 unidades",
    users: "Até 15 usuários",
    featured: false,
    highlight: "Para começar a sair da planilha"
  }, {
    name: "Rede",
    units: "3-6 unidades",
    users: "Até 30 usuários",
    featured: true,
    highlight: "Mais escolhido — inclui Setup WhatsApp interno + Diagnóstico Fundador"
  }, {
    name: "Regional",
    units: "7-15 unidades",
    users: "Ilimitado",
    featured: false,
    highlight: "ROI dominante para redes que já escalam"
  }];
  const STACK = [["Painel multi-unidade com permissão na raiz", "R$ 1.500/mês"], ["CRM com funil de 6 etapas, histórico e exportação", "R$ 950/mês"], ["Follow-up automático + lembretes por candidato", "R$ 1.100/mês"], ["Gamificação: 14 ações + 8 níveis + ranking + XP", "R$ 1.800/mês"], ["Automação WhatsApp interna", "R$ 700/mês"], ["Gerador de scripts de venda com IA", "R$ 600/mês"]];
  function Offer({
    onCta
  }) {
    return /*#__PURE__*/React.createElement("section", {
      id: "oferta",
      className: "section-y",
      style: {
        background: "var(--surface-container-low)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1152,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement(SH, {
      align: "center",
      pill: "A Oferta",
      pillTone: "accent",
      style: {
        marginBottom: 64
      },
      title: "Voc\xEA paga por um sistema. Recebe a opera\xE7\xE3o inteira.",
      subtitle: /*#__PURE__*/React.createElement(React.Fragment, null, "Equivalente de mercado: R$ 12.390/m\xEAs. ", /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--foreground)",
          fontWeight: 700
        }
      }, "Seu investimento sai no diagn\xF3stico gratuito."))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 28,
        marginBottom: 56,
        alignItems: "start"
      }
    }, PLANS.map(p => /*#__PURE__*/React.createElement(Cd, {
      key: p.name,
      featured: p.featured,
      padding: 40,
      style: p.featured ? {
        transform: "scale(1.04)"
      } : {}
    }, p.featured && /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        top: -14,
        left: "50%",
        transform: "translateX(-50%)"
      }
    }, /*#__PURE__*/React.createElement(Pl, {
      tone: "solid-primary"
    }, /*#__PURE__*/React.createElement(Spark, null), " Recomendado")), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 30,
        marginBottom: 8,
        color: "var(--foreground)"
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, p.units), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: "var(--muted-foreground)",
        marginBottom: 32
      }
    }, p.users), /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 32
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        fontWeight: 800,
        color: "var(--foreground)",
        fontFamily: "var(--font-heading)"
      }
    }, "Sob diagn\xF3stico"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        color: "var(--muted-foreground)",
        margin: "6px 0 0",
        lineHeight: 1.5
      }
    }, "Investimento definido pelo porte da sua rede, no diagn\xF3stico gratuito.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        color: "color-mix(in srgb,var(--foreground) 80%,transparent)",
        marginBottom: 32,
        lineHeight: 1.6
      }
    }, p.highlight), /*#__PURE__*/React.createElement(Btn, {
      variant: p.featured ? "primary" : "outline",
      fullWidth: true,
      onClick: onCta
    }, "Agendar demonstra\xE7\xE3o")))), /*#__PURE__*/React.createElement(Ac, {
      variant: "card",
      className: "",
      style: {
        maxWidth: 768,
        margin: "0 auto 48px"
      },
      summary: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          fontWeight: 700,
          color: "var(--on-surface-variant)",
          marginBottom: 4
        }
      }, "Por que vale isso?"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          color: "var(--foreground)"
        }
      }, "Os 12 componentes que somam R$ 12.390/m\xEAs de mercado"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, STACK.map(([item, price], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        justifyContent: "space-between",
        gap: 24,
        padding: "12px 0",
        borderBottom: "1px solid color-mix(in srgb,var(--border) 30%,transparent)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "color-mix(in srgb,var(--foreground) 85%,transparent)"
      }
    }, item), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: "var(--foreground)",
        whiteSpace: "nowrap"
      }
    }, price))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        paddingTop: 20,
        borderTop: "2px solid color-mix(in srgb,var(--primary) 20%,transparent)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--muted-foreground)"
      }
    }, "Total stack"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        fontWeight: 800,
        color: "var(--primary)",
        fontFamily: "var(--font-heading)"
      }
    }, "R$ 12.390/m\xEAs")))), /*#__PURE__*/React.createElement(Cd, {
      hover: false,
      padding: 40,
      style: {
        maxWidth: 768,
        margin: "0 auto",
        border: "1px solid color-mix(in srgb,var(--success) 40%,transparent)",
        background: "var(--success-subtle)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 20,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement(IB, {
      size: "lg",
      tone: "success"
    }, /*#__PURE__*/React.createElement(Shield, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: 20,
        margin: "0 0 12px",
        color: "var(--foreground)"
      }
    }, "Garantia de 30 dias"), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "color-mix(in srgb,var(--foreground) 85%,transparent)",
        lineHeight: 1.6,
        margin: 0
      }
    }, "Se em ", /*#__PURE__*/React.createElement("strong", null, "30 dias"), " voc\xEA n\xE3o conseguir ver o funil de todas as unidades sem precisar perguntar a ningu\xE9m, devolvemos 100%, sem perguntas."))))));
  }

  /* ─────────────────────────  FAQ  ───────────────────────── */
  const FAQS = [["Minha equipe não vai usar.", "Você está certo: a maioria dos sistemas falha por isso. Team Manager se encaixa no fluxo que a supervisora já tem. Alerta no WhatsApp, registro em 30 segundos. A gamificação resolve adoção — e o sistema tira XP de quem some. Você não cobra: o sistema cobra."], ["É caro, planilha funciona.", "Planilha não tem custo de assinatura. Tem custo de lead perdido. Ticket médio R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Plano Rede custa R$ 1.797. ROI líquido no mês 1: R$ 4.953."], ["Minha rede é pequena, faz sentido?", "O melhor momento de implantar não é quando a rede está grande — é quando ainda é pequena o suficiente pra criar o hábito certo. Com 2-3 unidades você corrige o processo."], ["Vocês integram com meu ERP atual?", "Em vez de integrar, substituímos. Team Manager assume a operação inteira (CRM + tarefas + rotinas + ranking) — seu ERP financeiro continua sendo financeiro."], ["Quanto tempo leva pra implantar?", "72 horas. Setup técnico em 2 horas (incluso nos planos Rede e Regional). Templates por segmento pré-configurados. Suporte dedicado nos primeiros 7 dias."]];
  function Faq() {
    return /*#__PURE__*/React.createElement("section", {
      id: "faq",
      className: "section-y",
      style: {
        background: "var(--surface)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 768,
        margin: "0 auto",
        padding: "0 24px"
      }
    }, /*#__PURE__*/React.createElement(SH, {
      pill: "Perguntas frequentes",
      pillTone: "muted",
      title: "As 5 que mais aparecem.",
      align: "left"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        marginTop: 40
      }
    }, FAQS.map(([q, a], i) => /*#__PURE__*/React.createElement(Ac, {
      key: i,
      variant: "card",
      summary: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 18,
          fontWeight: 700,
          color: "var(--foreground)"
        }
      }, q)
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: "var(--muted-foreground)",
        lineHeight: 1.6,
        margin: 0,
        fontSize: 15
      }
    }, a))))));
  }

  /* ─────────────────────────  CTA FINAL  ───────────────────────── */
  function CtaFinal({
    onCta
  }) {
    return /*#__PURE__*/React.createElement("section", {
      className: "section-y hero-gradient"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 768,
        margin: "0 auto",
        padding: "0 24px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.12,
        fontSize: "clamp(30px,4.5vw,48px)",
        margin: "0 0 48px",
        color: "#fff"
      }
    }, "Voc\xEA vai sair daqui do mesmo jeito. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "rgba(255,255,255,0.4)"
      }
    }, "Ou n\xE3o.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        fontSize: 18,
        color: "rgba(255,255,255,0.8)",
        marginBottom: 56,
        lineHeight: 1.6
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Voc\xEA pode continuar gerenciando pelo WhatsApp, reconstruindo n\xFAmeros \xE0s segundas e esperando que o assessor lembre do follow-up."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0
      }
    }, "Ou pode ser o gestor que n\xE3o precisa cobrar porque o sistema cobra. Que n\xE3o precisa celebrar porque o grupo j\xE1 celebrou. Que n\xE3o precisa investigar porque j\xE1 sabe."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: "#fff",
        fontSize: 24,
        fontWeight: 700,
        paddingTop: 24,
        margin: 0,
        fontFamily: "var(--font-heading)"
      }
    }, "N\xE3o \xE9 uma escolha de software.", /*#__PURE__*/React.createElement("br", null), "\xC9 uma escolha sobre o tipo de gestor que voc\xEA quer ser.")), /*#__PURE__*/React.createElement(Btn, {
      variant: "primary",
      size: "lg",
      iconRight: /*#__PURE__*/React.createElement(Arrow, null),
      onClick: onCta
    }, "Ativar o Team Manager \u2014 garantia de 30 dias"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 32,
        fontSize: 14,
        color: "rgba(255,255,255,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        maxWidth: 448,
        marginLeft: "auto",
        marginRight: "auto"
      }
    }, /*#__PURE__*/React.createElement(Shield, {
      size: 14
    }), " Se em 30 dias voc\xEA n\xE3o enxergar diferen\xE7a, devolu\xE7\xE3o integral. Sem perguntas.")));
  }
  Object.assign(window.TMLanding, {
    SocialProof,
    Offer,
    Faq,
    CtaFinal
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/sections-2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/v2-shared.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Team Manager v2 — shared helpers for the redesign directions.
   Registers window.TMv2 { Icon, ic, Reveal, CountUp, useReveal }. */
(function () {
  const {
    useState,
    useEffect,
    useRef
  } = React;

  /* Inline Lucide-path icon (stroke 2, rounded). */
  function Icon({
    size = 24,
    sw = 2,
    fill = "none",
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: fill,
      stroke: "currentColor",
      strokeWidth: sw,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: {
        display: "inline-block",
        flexShrink: 0,
        ...style
      }
    }, children);
  }
  const ic = {
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 5 7 7-7 7"
    })),
    check: /*#__PURE__*/React.createElement("path", {
      d: "M20 6 9 17l-5-5"
    }),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M18 6 6 18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m6 6 12 12"
    })),
    shield: /*#__PURE__*/React.createElement("path", {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
    }),
    spark: /*#__PURE__*/React.createElement("path", {
      d: "M12 2l2 6.5L20.5 10.5 14 12.5 12 19l-2-6.5L3.5 10.5 10 8.5z"
    }),
    bot: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M12 8V4H8"
    }), /*#__PURE__*/React.createElement("rect", {
      width: "16",
      height: "12",
      x: "4",
      y: "8",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2 14h2M20 14h2M15 13v2M9 13v2"
    })),
    heart: /*#__PURE__*/React.createElement("path", {
      d: "M7.5 3C5 3 3 5 3 7.5c0 5 7 9 9 11 2-2 9-6 9-11C21 5 19 3 16.5 3c-1.5 0-3 1-4.5 2.5C10.5 4 9 3 7.5 3z"
    }),
    eye: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    file: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6M9 15l2 2 4-4"
    })),
    target: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "6"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    })),
    layers: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "m12 2 9 5-9 5-9-5 9-5Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m3 12 9 5 9-5M3 17l9 5 9-5"
    })),
    cap: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M22 10 12 5 2 10l10 5 10-5Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 6v6l4 2"
    })),
    bolt: /*#__PURE__*/React.createElement("path", {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
    }),
    db: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "12",
      cy: "5",
      rx: "9",
      ry: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 12c0 1.66 4 3 9 3s9-1.34 9-3"
    })),
    users: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.87"
    })),
    trophy: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 22h16"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18 2H6v7a6 6 0 0 0 12 0V2Z"
    })),
    msg: /*#__PURE__*/React.createElement("path", {
      d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z"
    }),
    play: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "10 8 16 12 10 16 10 8"
    })),
    sun: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"
    }))
  };

  /* Scroll-reveal: returns [ref, shown].
     Uses a scroll-position check (IntersectionObserver is unreliable in some
     sandboxed preview iframes). Reveals when the element's top crosses ~92% of
     the viewport; reduced-motion reveals immediately. */
  function useReveal() {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(true);
        return;
      }
      const el = ref.current;
      if (!el) return;
      let done = false,
        raf = 0;
      const check = () => {
        if (done || !ref.current) return;
        const top = ref.current.getBoundingClientRect().top;
        if (top < (window.innerHeight || 800) * 0.92) {
          done = true;
          setShown(true);
          cleanup();
        }
      };
      const onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(check);
      };
      function cleanup() {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      }
      window.addEventListener("scroll", onScroll, {
        passive: true
      });
      window.addEventListener("resize", onScroll);
      // initial checks across a few frames so above-the-fold items reveal on load
      check();
      raf = requestAnimationFrame(check);
      const t = setTimeout(check, 120);
      return () => {
        cleanup();
        clearTimeout(t);
      };
    }, []);
    return [ref, shown];
  }

  /* Reveal wrapper — fades up children when scrolled into view. */
  function Reveal({
    as = "div",
    delay = 0,
    y = 24,
    className = "",
    style = {},
    children,
    ...rest
  }) {
    const [ref, shown] = useReveal();
    const Tag = as;
    return /*#__PURE__*/React.createElement(Tag, _extends({
      ref: ref,
      className: className,
      style: {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style
      }
    }, rest), children);
  }

  /* CountUp — animates a number when scrolled into view. */
  function CountUp({
    to,
    suffix = "",
    prefix = "",
    dur = 1400,
    decimals = 0
  }) {
    const [ref, shown] = useReveal();
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!shown) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        setVal(to);
        return;
      }
      let raf, start;
      const step = t => {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [shown]);
    const shown_ = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("pt-BR");
    return /*#__PURE__*/React.createElement("span", {
      ref: ref
    }, prefix, shown_, suffix);
  }
  window.TMv2 = {
    Icon,
    ic,
    useReveal,
    Reveal,
    CountUp
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/v2-shared.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/v2-whatsapp.jsx
try { (() => {
/* Team Manager v2 — "Provas reais no WhatsApp" section.
   Recreates the real WhatsApp feedback messages as clean, fully-anonymized chat
   bubbles: no names, no photos, no phone numbers, no company name. Quotes are the
   clients' real words (lightly trimmed). Exposes window.TMWhats.WhatsProof. */
(function () {
  const R = React;
  const THREADS = [{
    role: "Consultora de matrículas",
    time: "5:16",
    msgs: ["Ganhei mais tempo, matrícula recuperada e mais organização.", "Mesmo sem preencher todos os dias, ajuda 100%. Tudo dentro de uma plataforma só, isso não tem preço!"]
  }, {
    role: "Coordenação comercial",
    time: "5:42",
    msgs: ["O Team Manager foi muito assertivo, pensado de fato para o nosso formato de trabalho. A direção consegue saber o que estamos fazendo mesmo sem nos ver, por conta do diário do dia.", "Enfim, parabéns! É o sistema mais completo que já usei."]
  }, {
    role: "Consultor de vendas",
    time: "5:30",
    msgs: ["Criou uma rotina de trabalho que antes não existia. Principalmente o quadro de atividades: consigo deixar o que preciso fazer no dia, na semana e no mês, e ter controle disso."]
  }, {
    role: "Equipe comercial",
    time: "5:07",
    msgs: ["Mais organização e visualização rápida dos contatos e agendamentos. Dá pra registrar características do lead que poderiam ser esquecidas, tudo na observação."]
  }];
  const AVA = ["#0ea5e9", "#a855f7", "#f59e0b", "#10b981"];
  function Ticks() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "11",
      viewBox: "0 0 16 11",
      fill: "none",
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M1 5.5 4 8.5 9.5 2.5",
      stroke: "#53bdeb",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 5.5 9 8.5 14.5 2.5",
      stroke: "#53bdeb",
      strokeWidth: "1.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }));
  }
  function Person() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "#fff"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "3.6"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6Z"
    }));
  }
  function Thread({
    t,
    i
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 24px 60px -18px rgba(0,0,0,.5)",
        background: "#0b141a",
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        background: "#1f2c33",
        borderBottom: "1px solid rgba(0,0,0,.3)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        flexShrink: 0,
        background: AVA[i % AVA.length],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement(Person, null)), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#e9edef",
        fontWeight: 600,
        fontSize: 15
      }
    }, t.role), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "#8696a0",
        fontSize: 12.5
      }
    }, "Cliente Team Manager")), /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "20",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "#8696a0",
      strokeWidth: "2",
      style: {
        marginLeft: "auto",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("path", {
      d: "M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1,
        padding: "20px 16px",
        background: "#0b141a"
      }
    }, /*#__PURE__*/React.createElement("div", {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        opacity: .04,
        backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, #fff 1px, transparent 1.5px), radial-gradient(circle at 45% 85%, #fff 1px, transparent 1.5px)",
        backgroundSize: "60px 60px"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, t.msgs.map((m, j) => {
      const last = j === t.msgs.length - 1;
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        style: {
          maxWidth: "92%",
          background: "#202c33",
          borderRadius: 12,
          borderTopLeftRadius: j === 0 ? 3 : 12,
          padding: "9px 12px 7px",
          color: "#e9edef",
          fontSize: 14.5,
          lineHeight: 1.5
        }
      }, m, last && /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 4,
          marginTop: 3
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          color: "#8696a0"
        }
      }, t.time, " PM"), /*#__PURE__*/React.createElement(Ticks, null)));
    }))));
  }
  function WhatsProof() {
    const {
      Reveal
    } = window.TMv2 || {};
    const Wrap = Reveal || (({
      children,
      style
    }) => R.createElement("div", {
      style
    }, children));
    return /*#__PURE__*/React.createElement("section", {
      id: "provas",
      style: {
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#0a0e27,#0d1130)",
        color: "#f5f5fa",
        padding: "112px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,211,102,.10), transparent 60%)"
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 28px"
      }
    }, /*#__PURE__*/React.createElement(Wrap, {
      style: {
        textAlign: "center",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: ".14em",
        textTransform: "uppercase",
        color: "#25d366"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: "#25d366"
      }
    }), "Provas reais no WhatsApp")), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: "var(--font-heading)",
        fontWeight: 800,
        letterSpacing: "-.025em",
        fontSize: "clamp(30px,4vw,46px)",
        margin: "0 0 12px"
      }
    }, "O que a equipe respondeu, sem filtro.")), /*#__PURE__*/React.createElement(Wrap, {
      style: {
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: "rgba(255,255,255,.6)",
        fontSize: 17,
        maxWidth: 560,
        margin: "0 auto 54px",
        lineHeight: 1.6
      }
    }, "Mensagens reais de quem usa o Team Manager no dia a dia. Nomes, fotos e telefones omitidos por privacidade.")), /*#__PURE__*/React.createElement("div", {
      className: "whats-grid",
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gap: 22,
        alignItems: "start"
      }
    }, THREADS.map((t, i) => /*#__PURE__*/React.createElement(Wrap, {
      key: i,
      delay: i % 2 * 0.08,
      style: {
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Thread, {
      t: t,
      i: i
    }))))), /*#__PURE__*/React.createElement("style", null, `@media (max-width:900px){ #provas .whats-grid{ grid-template-columns:1fr !important; } }`));
  }
  window.TMWhats = {
    WhatsProof
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/v2-whatsapp.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.KpiCard = __ds_scope.KpiCard;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconBadge = __ds_scope.IconBadge;

__ds_ns.Pill = __ds_scope.Pill;

})();
