"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CursorSpotlight } from "./CursorSpotlight";
import { DashboardCarousel } from "./DashboardCarousel";

const QUIZ_PATH = "/diagnostico";

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <CursorSpotlight size={680} color="rgba(99, 102, 241, 0.55)" opacity={0.22} />
      <motion.div
        className="max-w-5xl mx-auto px-6 pt-24 pb-24 md:pt-32 md:pb-32 text-center"
        initial="hidden"
        animate="visible"
        variants={heroStagger}
      >
        <motion.div className="mb-7" variants={heroItem}>
          <span className="pill bg-white/10 text-white/85 border border-white/15 backdrop-blur-sm">
            Para redes de escolas e cursos com 2 a 15 unidades
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="text-[28px] sm:text-4xl md:text-[44px] lg:text-5xl font-bold max-w-3xl mx-auto mb-7 leading-[1.12] text-white tracking-tight"
        >
          Você vai parar de ser o único que se importa com a meta de matrícula.{" "}
          <span className="text-white/45">Não porque pediu.</span>{" "}
          <span className="text-white">Porque o sistema criou cultura.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Team Manager é o sistema de operação para redes de escolas e cursos
          que faz o trabalho de cobrar, lembrar, reconhecer e reportar — para
          que você faça o trabalho de crescer a rede.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href={QUIZ_PATH} className="btn-primary text-base">
            Agendar demonstração
            <ArrowRight size={18} />
          </Link>
          <Link href={QUIZ_PATH} className="btn-ghost group">
            Diagnóstico em 2 min
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.div variants={heroItem}>
          <DashboardCarousel />
        </motion.div>
      </motion.div>
    </section>
  );
}
