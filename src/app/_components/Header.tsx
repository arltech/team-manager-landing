"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { href: "#problema", label: "O Problema" },
  { href: "#solucao", label: "Solução" },
  { href: "#oferta", label: "Preços" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e27]/80 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between gap-6">
        <Logo size="xl" />

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/diagnostico"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg bg-white text-[var(--primary)] hover:bg-white/95 shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition-all"
        >
          Demonstração
        </Link>

        {/* Mobile: just CTA, sticky bottom bar handles the rest */}
        <Link
          href="/diagnostico"
          className="md:hidden text-sm font-semibold px-3.5 py-2 rounded-lg text-white border border-white/30 hover:bg-white/10 transition-colors"
        >
          Diagnóstico
        </Link>
      </div>
    </header>
  );
}
