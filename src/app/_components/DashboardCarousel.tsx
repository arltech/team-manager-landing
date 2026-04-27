"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const SLIDES = [
  { src: "/dashboard/slide-1.png", label: "Visão Executiva" },
  { src: "/dashboard/slide-2.png", label: "CRM de Candidatos" },
  { src: "/dashboard/slide-3.png", label: "Operação" },
  { src: "/dashboard/slide-4.png", label: "Métricas" },
];

const INTERVAL_MS = 4200;

export function DashboardCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = SLIDES[index];

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -inset-px bg-gradient-to-b from-white/12 to-transparent rounded-2xl pointer-events-none" />
      <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-3 md:p-4 shadow-2xl">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 mb-3 px-1">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="ml-3 px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-white/40 font-mono">
            app.teammanager.app
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === index ? "w-6 bg-white/70" : "w-1.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide stage */}
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.label}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 92vw, 720px"
                className="object-contain object-top"
                style={{ filter: "blur(1.5px) saturate(1.05)" }}
              />
              {/* Soft top gradient for legibility of label */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/30" />
              {/* Label chip */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-[11px] font-semibold text-white/90 tracking-wide">
                  {current.label}
                </span>
              </div>
              {/* Privacy notice */}
              <div className="absolute bottom-3 right-3 text-[9px] text-white/45 font-mono">
                dados ofuscados · ambiente real
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
