import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "px-4 py-[9px] text-[13px] gap-1.5 rounded-[var(--radius-md)]",
  md: "px-7 py-3.5 text-[15px] gap-2 rounded-[var(--radius-lg)]",
  lg: "px-9 py-[18px] text-[17px] gap-2.5 rounded-[var(--radius-lg)]",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-white shadow-[0_8px_24px_rgba(0,40,142,0.18)] hover:shadow-[0_12px_32px_rgba(0,40,142,0.28)] hover:-translate-y-px",
  outline:
    "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
  white:
    "bg-white text-[var(--primary)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:bg-white/95",
  ghost: "text-white/[0.82] hover:text-white font-medium",
};

/**
 * CTA button — visual port of the design-system `TM.Button`. Every instance
 * in the original called `toast()`; here every instance links to the real
 * quiz at /diagnostico (ponytail: no new abstraction beyond what's reused
 * across ~8 call sites in this page).
 */
export function Button({
  href = "/diagnostico",
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconRight,
  className = "",
  children,
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  iconRight?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-semibold whitespace-nowrap transition-all duration-200 ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
    >
      {children}
      {iconRight}
    </Link>
  );
}
