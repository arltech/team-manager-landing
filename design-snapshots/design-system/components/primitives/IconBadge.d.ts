import * as React from "react";

export interface IconBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** @default "primary" */
  tone?: "primary" | "success" | "destructive" | "warning" | "accent" | "neutral";
  /** Icon node (e.g. a Lucide icon) */
  children?: React.ReactNode;
}

/**
 * Rounded-square icon tile. Holds one icon in feature cards, KPI tiles and trust
 * rows. sm/md are 7.2–9.6px radius squares; lg uses the larger 16.8px radius.
 */
export function IconBadge(props: IconBadgeProps): React.ReactElement;
