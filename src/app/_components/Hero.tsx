"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowRight, TrendingUp, Users, Trophy, CheckCircle2 } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { CursorSpotlight } from "./CursorSpotlight";
import { AnimatedNumber } from "./AnimatedNumber";

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
  const calendly = process.env.NEXT_PUBLIC_DEMO_CALENDLY ?? "#oferta";

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
            Para redes com 2 a 20 unidades
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="text-[28px] sm:text-4xl md:text-[44px] lg:text-5xl font-bold max-w-3xl mx-auto mb-7 leading-[1.12] text-white tracking-tight"
        >
          Você vai parar de ser o único que se importa com a meta.{" "}
          <span className="text-white/45">Não porque pediu.</span>{" "}
          <span className="text-white">Porque o sistema criou cultura.</span>
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="text-base md:text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Team Manager é o sistema de operação de redes multi-unidade que faz o
          trabalho de cobrar, lembrar, reconhecer e reportar — para que você faça
          o trabalho de crescer.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href={calendly} className="btn-primary text-base">
            Quero ver uma demonstração
            <ArrowRight size={18} />
          </a>
          <Link href="/diagnostico" className="btn-ghost group">
            Diagnóstico em 2 min
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.div variants={heroItem}>
          <DashboardPreview />
        </motion.div>
      </motion.div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute -inset-px bg-gradient-to-b from-white/12 to-transparent rounded-2xl pointer-events-none" />
      <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 p-4 md:p-5 shadow-2xl">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="ml-3 px-2.5 py-1 rounded-md bg-white/5 text-[10px] text-white/40 font-mono">
            app.teammanager.app
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 mb-3">
          <KpiCard variant="dark" icon={Users} label="Candidatos" value={<AnimatedNumber value={142} />} sub="+18 sem" iconColor="#a8b8ff" />
          <KpiCard variant="dark" icon={CheckCircle2} label="Matrículas" value={<AnimatedNumber value={34} />} sub="+12 sem" iconColor="#7ce0b8" />
          <KpiCard variant="dark" icon={TrendingUp} label="Conversão" value={<AnimatedNumber value={24} suffix="%" />} sub="+9 pp" iconColor="#ffb88a" />
          <KpiCard variant="dark" icon={Trophy} label="Top" value="Aline" sub="2.140 XP" iconColor="#e7afff" />
        </div>

        <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-3 md:p-4">
          <div className="flex items-center justify-between mb-2.5">
            <div className="text-[10px] text-white/55 uppercase tracking-wider font-bold">
              Funil — esta semana
            </div>
            <div className="text-[10px] text-white/35 font-mono">3 unidades</div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            <FunnelStage label="Ativos" pct={100} count={142} />
            <FunnelStage label="Agend." pct={68} count={97} />
            <FunnelStage label="Compar." pct={45} count={64} />
            <FunnelStage label="Matric." pct={24} count={34} />
            <FunnelStage label="Perdid." pct={12} count={17} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FunnelStage({
  label,
  pct,
  count,
}: {
  label: string;
  pct: number;
  count: number;
}) {
  return (
    <div className="text-left">
      <div className="text-[9px] text-white/55 uppercase tracking-wider mb-1.5 font-bold">
        {label}
      </div>
      <div className="h-1.5 rounded-full bg-white/8 mb-1.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/15"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="text-xs text-white/75 font-mono tabular-nums">{count}</div>
    </div>
  );
}
