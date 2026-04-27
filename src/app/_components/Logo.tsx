import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * "transparent" → silver artwork on dark backgrounds (a-logo.png direct).
   * "onLight"     → same artwork inverted via CSS filter for light backgrounds.
   * "badge"       → navy rounded badge with the artwork inside (icon-512.png).
   *                 Use on light backgrounds where you want a self-contained logo
   *                 with crisp colors instead of a CSS filter approximation.
   */
  variant?: "transparent" | "onLight" | "badge";
  /** @deprecated Use variant="onLight" instead. */
  onLight?: boolean;
};

const HEIGHT = {
  sm: 36,
  md: 48,
  lg: 60,
  xl: 76,
} as const;

const ASPECT = 575 / 507;

export function Logo({
  href = "/",
  size = "md",
  variant,
  onLight,
}: LogoProps) {
  const resolvedVariant: NonNullable<LogoProps["variant"]> =
    variant ?? (onLight ? "onLight" : "transparent");
  const h = HEIGHT[size];

  if (resolvedVariant === "badge") {
    return (
      <Link
        href={href}
        className="inline-flex items-center group"
        aria-label="Team Manager — Página inicial"
      >
        <Image
          src="/icon-512.png"
          alt="Team Manager"
          width={h * 2}
          height={h * 2}
          priority
          style={{ width: h, height: h }}
          className="rounded-[14px] transition-transform group-hover:scale-105"
        />
      </Link>
    );
  }

  const w = Math.round(h * ASPECT);
  return (
    <Link
      href={href}
      className="inline-flex items-center group"
      aria-label="Team Manager — Página inicial"
    >
      <Image
        src="/a-logo.png"
        alt="Team Manager"
        width={w * 2}
        height={h * 2}
        priority
        style={{
          width: w,
          height: h,
          filter:
            resolvedVariant === "onLight"
              ? "brightness(0) saturate(100%) invert(15%) sepia(80%) saturate(2200%) hue-rotate(225deg) brightness(0.8) contrast(1.1)"
              : "drop-shadow(0 2px 10px rgba(99, 102, 241, 0.25))",
        }}
        className="transition-transform group-hover:scale-105"
      />
    </Link>
  );
}
