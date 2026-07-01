import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Featured plan / highlighted card: primary border + glow shadow */
  featured?: boolean;
  /** Enable hover border+shadow lift. @default true */
  hover?: boolean;
  /** Padding in px. @default 32 */
  padding?: number;
  children?: React.ReactNode;
}

/**
 * The signature content surface — white, soft 1px border, 21.6px radius, low
 * card shadow that lifts on hover. Used for plans, feature cards, FAQ rows.
 *
 * @startingPoint section="Surfaces" subtitle="Signature card surface" viewport="700x220"
 */
export function Card(props: CardProps): React.ReactElement;
