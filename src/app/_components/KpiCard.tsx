import type { ComponentType, ReactNode } from "react";

type Variant = "dark" | "light";

type IconType = ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }>;

const VARIANT_WRAPPER: Record<Variant, string> = {
  dark: "rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 md:p-3.5 text-left",
  light:
    "rounded-2xl bg-gradient-to-b from-[var(--surface-container-low)] to-[var(--surface-container)] border border-[var(--border)]/60 p-6 md:p-7 transition-all hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-card-hover)]",
};

const VARIANT_LABEL: Record<Variant, string> = {
  dark: "text-[9px] text-white/50 uppercase tracking-wider font-bold",
  light:
    "text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--on-surface-variant)]",
};

const VARIANT_VALUE: Record<Variant, string> = {
  dark: "text-lg md:text-2xl font-extrabold text-white mb-0.5 leading-none",
  light:
    "text-3xl md:text-4xl font-extrabold text-[var(--foreground)] mb-2 leading-none tracking-tight",
};

const VARIANT_SUB: Record<Variant, string> = {
  dark: "text-[10px] text-white/45 mt-1",
  light: "text-xs text-[var(--muted-foreground)] leading-relaxed",
};

/**
 * KPI card — works on both dark (hero preview) and light (social proof) backgrounds.
 *
 * - `variant="dark"`: compact dashboard-style card (4-up grid in hero)
 * - `variant="light"`: prominent stat card (4-up grid in social proof)
 */
export function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  iconColor,
  variant = "light",
  className = "",
}: {
  icon: IconType;
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  iconColor?: string;
  variant?: Variant;
  className?: string;
}) {
  const labelGap = variant === "dark" ? "gap-1.5 mb-2" : "gap-2 mb-4";
  const labelColor =
    variant === "dark" && iconColor ? { color: iconColor } : undefined;

  return (
    <div className={`${VARIANT_WRAPPER[variant]} ${className}`}>
      <div className={`flex items-center ${labelGap}`}>
        <Icon
          size={variant === "dark" ? 12 : 16}
          strokeWidth={variant === "dark" ? 2 : 2.4}
          style={
            variant === "dark"
              ? { color: iconColor ?? "currentColor" }
              : undefined
          }
          className={variant === "light" ? "text-[var(--primary)]" : undefined}
        />
        <span className={VARIANT_LABEL[variant]} style={labelColor}>
          {label}
        </span>
      </div>
      <div
        className={VARIANT_VALUE[variant]}
        style={
          variant === "light"
            ? { fontFamily: "var(--font-heading)" }
            : undefined
        }
      >
        {value}
      </div>
      {sub && <div className={VARIANT_SUB[variant]}>{sub}</div>}
    </div>
  );
}
