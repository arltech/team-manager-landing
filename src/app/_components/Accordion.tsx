import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Variant = "card" | "subtle";

const VARIANT_WRAPPER: Record<Variant, string> = {
  card: "group card cursor-pointer !p-7 hover:border-[var(--primary)]/40 transition-colors",
  subtle:
    "group cursor-pointer rounded-2xl bg-[var(--surface-container-low)] border border-[var(--border)]/60",
};

const VARIANT_SUMMARY: Record<Variant, string> = {
  card: "list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4",
  subtle:
    "list-none [&::-webkit-details-marker]:hidden flex items-center justify-between gap-4 p-5 md:p-6",
};

const VARIANT_BODY: Record<Variant, string> = {
  card: "mt-5 pt-5 border-t border-[var(--border)]/40",
  subtle: "px-5 md:px-6 pb-6 md:pb-7 pt-0",
};

export function Accordion({
  summary,
  children,
  variant = "card",
  defaultOpen = false,
  className = "",
}: {
  summary: ReactNode;
  children: ReactNode;
  variant?: Variant;
  defaultOpen?: boolean;
  className?: string;
}) {
  return (
    <details
      open={defaultOpen}
      className={`${VARIANT_WRAPPER[variant]} ${className}`}
    >
      <summary className={VARIANT_SUMMARY[variant]}>
        <div className="flex-1 min-w-0">{summary}</div>
        <ChevronDown
          size={variant === "subtle" ? 18 : 20}
          className="text-[var(--primary)] transition-transform group-open:rotate-180 flex-shrink-0"
        />
      </summary>
      <div className={VARIANT_BODY[variant]}>
        {variant === "subtle" ? (
          <div className="border-t border-[var(--border)]/40 pt-5">{children}</div>
        ) : (
          children
        )}
      </div>
    </details>
  );
}
