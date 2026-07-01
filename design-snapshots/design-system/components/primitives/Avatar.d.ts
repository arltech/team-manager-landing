import * as React from "react";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL; falls back to initials when absent */
  src?: string;
  /** Full name — used for initials + alt text */
  name?: string;
  /** Pixel diameter. @default 48 */
  size?: number;
  /** Show primary-tinted ring + shadow */
  ring?: boolean;
}

/**
 * Circular avatar with initials fallback. Used in testimonials, the CRM
 * candidate list, and the gamification leaderboard.
 */
export function Avatar(props: AvatarProps): React.ReactElement;
