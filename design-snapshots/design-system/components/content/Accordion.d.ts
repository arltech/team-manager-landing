import * as React from "react";

export interface AccordionProps {
  /** Always-visible summary row content */
  summary: React.ReactNode;
  /** Body revealed when open */
  children: React.ReactNode;
  /** "card" bordered card or "subtle" filled row. @default "card" */
  variant?: "card" | "subtle";
  /** Open on mount */
  defaultOpen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Disclosure row with a rotating chevron. Card variant powers the FAQ list and
 * the collapsible value-stack table; subtle variant for inline disclosures.
 */
export function Accordion(props: AccordionProps): React.ReactElement;
