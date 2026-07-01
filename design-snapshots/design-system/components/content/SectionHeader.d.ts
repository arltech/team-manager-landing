import * as React from "react";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow content rendered inside a Pill */
  pill?: React.ReactNode;
  /** @default "primary" */
  pillTone?: "primary" | "success" | "destructive" | "accent" | "muted";
  /** Display title (string or rich node) */
  title: React.ReactNode;
  /** Optional supporting paragraph */
  subtitle?: React.ReactNode;
  /** @default "left" */
  align?: "left" | "center";
}

/**
 * Section lead-in: eyebrow pill + Manrope display title + optional subtitle.
 * The consistent header for every landing-page section.
 */
export function SectionHeader(props: SectionHeaderProps): React.ReactElement;
