import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: "primary" | "success" | "destructive" | "warning" | "neutral";
  /** Show a leading status dot */
  dot?: boolean;
  /** Leading icon node */
  icon?: React.ReactNode;
  /** Trailing count number */
  count?: number;
  children?: React.ReactNode;
}

/**
 * Status chip used across the CRM pipeline (Quente, Em negociação, Indeciso,
 * Perdido) and filter bars. Soft tonal fill, pill shape, optional dot/icon/count.
 */
export function Badge(props: BadgeProps): React.ReactElement;
