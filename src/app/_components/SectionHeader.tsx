import type { ComponentProps, ReactNode } from "react";
import { Pill } from "./Pill";
import { Reveal } from "./Reveal";

type Align = "left" | "center";
type PillTone = ComponentProps<typeof Pill>["tone"];

export function SectionHeader({
  pill,
  pillTone = "primary",
  title,
  subtitle,
  align = "left",
  className = "",
  animate = true,
}: {
  pill: ReactNode;
  pillTone?: PillTone;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: Align;
  className?: string;
  /** Wrap inner blocks in Reveal stagger. Disable for above-the-fold sections that animate via parent. */
  animate?: boolean;
}) {
  const alignClasses =
    align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-2xl";

  const PillBlock = (
    <div className="mb-6">
      <Pill tone={pillTone}>{pill}</Pill>
    </div>
  );

  const TitleBlock = (
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl ${
        subtitle ? "mb-6" : "mb-14"
      }`}
    >
      {title}
    </h2>
  );

  const SubtitleBlock = subtitle && (
    <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-14">
      {subtitle}
    </p>
  );

  if (animate) {
    return (
      <div className={`${alignClasses} ${className}`}>
        <Reveal>{PillBlock}</Reveal>
        <Reveal delay={0.05}>{TitleBlock}</Reveal>
        {SubtitleBlock && <Reveal delay={0.1}>{SubtitleBlock}</Reveal>}
      </div>
    );
  }

  return (
    <div className={`${alignClasses} ${className}`}>
      {PillBlock}
      {TitleBlock}
      {SubtitleBlock}
    </div>
  );
}
