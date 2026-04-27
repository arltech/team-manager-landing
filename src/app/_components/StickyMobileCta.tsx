import Link from "next/link";

export function StickyMobileCta() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)]">
      <Link
        href="/diagnostico"
        className="btn-primary w-full !p-3.5 text-sm justify-center"
      >
        Agendar demonstração
      </Link>
    </div>
  );
}
