import React from "react";

/**
 * Card — the signature surface: white, 1px border, 21.6px radius, soft shadow,
 * border + shadow lift on hover. featured adds a primary border + glow.
 */
export function Card({ featured = false, hover = true, padding = 32, className = "", style = {}, children, ...rest }) {
  const [over, setOver] = React.useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
      style={{
        background: "var(--card)",
        border: featured ? "2px solid var(--primary)" : "1px solid var(--border)",
        borderColor: !featured && hover && over ? "var(--outline)" : undefined,
        borderRadius: "var(--radius-2xl)",
        padding,
        boxShadow: featured
          ? "var(--shadow-glow-primary)"
          : hover && over
          ? "var(--shadow-card-hover)"
          : "var(--shadow-card)",
        transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
