import * as React from "react";

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default "muted" */
  tone?: "primary" | "success" | "destructive" | "accent" | "muted" | "dark-glass" | "solid-primary";
  children?: React.ReactNode;
}

/**
 * Uppercase eyebrow/tag pill. Sits above section titles ("O PROBLEMA", "A OFERTA")
 * and doubles as the featured-plan "Recomendado" badge.
 */
export function Pill(props: PillProps): React.ReactElement;
