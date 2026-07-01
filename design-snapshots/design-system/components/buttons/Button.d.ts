import * as React from "react";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Renders an <a> instead of <button> when set */
  href?: string;
  /** Leading icon node (e.g. a Lucide <i> or svg) */
  icon?: React.ReactNode;
  /** Trailing icon node */
  iconRight?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action button. Gradient fill + lift on the primary variant; outline,
 * ghost, secondary and white-on-dark variants for hero/CTA contexts.
 *
 * @startingPoint section="Buttons" subtitle="Gradient primary + variants" viewport="700x180"
 */
export function Button(props: ButtonProps): React.ReactElement;
