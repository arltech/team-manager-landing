import * as React from "react";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon node */
  icon?: React.ReactNode;
  /** Uppercase label */
  label: string;
  /** Big metric value (number, string, or animated node) */
  value: React.ReactNode;
  /** Supporting caption below the value */
  sub?: React.ReactNode;
  /** Trend delta chip, e.g. "+363" (rendered green) */
  delta?: React.ReactNode;
  /** "light" prominent metric card, or "dark" compact tile. @default "light" */
  variant?: "light" | "dark";
}

/**
 * Stat / KPI tile. The light variant is the prominent metric card (social proof,
 * CRM header); the dark variant is the compact tile for dark dashboard surfaces.
 */
export function KpiCard(props: KpiCardProps): React.ReactElement;
