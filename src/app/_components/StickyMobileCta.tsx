import Link from "next/link";

export function StickyMobileCta() {
  const calendly = process.env.NEXT_PUBLIC_DEMO_CALENDLY ?? "#oferta";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-[var(--card)]/95 backdrop-blur-md border-t border-[var(--border)]">
      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/diagnostico"
          className="flex items-center justify-center text-sm font-bold text-[var(--primary)] px-3 py-3.5 rounded-xl border-2 border-[var(--primary)] hover:bg-[var(--primary)]/5"
        >
          Diagnóstico 2min
        </Link>
        <a href={calendly} className="btn-primary !p-3.5 text-sm justify-center">
          Demonstração
        </a>
      </div>
    </div>
  );
}
