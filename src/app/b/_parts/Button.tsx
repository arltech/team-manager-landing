"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Port of TM.Button (design-system bundle) → Next/Link, scoped to /b.
 * Every CTA in this page routes to /diagnostico (the real quiz).
 */
type Variant = "primary" | "secondary" | "outline" | "white";
type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[13px] gap-1.5 rounded-[var(--radius-md)]",
  md: "px-7 py-3.5 text-[15px] gap-2 rounded-[var(--radius-lg)]",
  lg: "px-9 py-[18px] text-[17px] gap-2.5 rounded-[var(--radius-lg)]",
};

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-[var(--primary)] to-[var(--primary-container)] text-[var(--primary-foreground)] shadow-[0_8px_24px_rgba(0,40,142,0.18)] hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(0,40,142,0.28)]",
  secondary:
    "bg-[var(--surface-container)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--outline)]",
  outline:
    "bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
  white:
    "bg-white text-[var(--primary)] shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:-translate-y-px",
};

export function Button({
  variant = "primary",
  size = "md",
  href = "/diagnostico",
  icon,
  iconRight,
  fullWidth = false,
  className = "",
  children,
}: {
  variant?: Variant;
  size?: Size;
  href?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center font-semibold leading-none whitespace-nowrap transition-all duration-150 ${SIZE_CLASS[size]} ${VARIANT_CLASS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}
