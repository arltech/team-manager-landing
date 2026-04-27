"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  role: string;
  context: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Antes eu ligava toda segunda perguntando &lsquo;cadê as matrículas da unidade?&rsquo;. Agora a unidade me liga na sexta dizendo &lsquo;fechei a meta&rsquo;.",
    role: "Diretor de rede",
    context: "3 unidades · Escola de idiomas · Piloto Team Manager",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=192&h=192&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "Em 6 semanas parei de cobrar follow-up. O sistema cobra sozinho. Eu olho o que importa: por que a unidade A matricula 30% mais que a B.",
    role: "Sócia-fundadora",
    context: "5 unidades · Cursos profissionalizantes · Piloto Team Manager",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=192&h=192&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "Pela primeira vez sei quais consultoras fizeram follow-up de cada candidato sem precisar abrir 4 planilhas. O ranking aparece sexta de manhã.",
    role: "Coordenador comercial",
    context: "4 unidades · Preparatório vestibular · Piloto Team Manager",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=192&h=192&fit=crop&crop=faces&auto=format&q=80",
  },
  {
    quote:
      "A equipe começou a competir entre si pelo ranking de matrícula. Não precisei criar bonificação extra — o jogo já estava no sistema.",
    role: "Gestora de unidades",
    context: "6 unidades · Educação infantil · Piloto Team Manager",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=192&h=192&fit=crop&crop=faces&auto=format&q=80",
  },
];

const INTERVAL_MS = 8500;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
    }
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const current = TESTIMONIALS[index];

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -inset-px bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-[var(--primary)]/10 rounded-3xl pointer-events-none" />
      <div className="relative card !p-10 md:!p-14 bg-gradient-to-br from-[var(--card)] to-[var(--surface-container-low)] overflow-hidden">
        <Quote
          className="absolute top-8 right-8 text-[var(--primary)]/15"
          size={64}
          strokeWidth={1.5}
          aria-hidden
        />

        <div className="relative min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xl md:text-2xl lg:text-[28px] leading-snug font-semibold text-[var(--foreground)] mb-8 max-w-3xl"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${current.quote}&rdquo;` }}
              />
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/15 shadow-[0_4px_12px_rgba(30,58,138,0.18)] flex-shrink-0">
                  <Image
                    src={current.avatar}
                    alt=""
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-[var(--foreground)] text-sm">
                    {current.role}
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">
                    {current.context}
                  </div>
                  <div className="text-[10px] text-[var(--muted-foreground)]/70 mt-1 italic">
                    Identidade preservada a pedido do cliente · imagem ilustrativa
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex items-center gap-2 mt-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-[var(--primary)]"
                  : "w-1.5 bg-[var(--border)] hover:bg-[var(--muted-foreground)]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
