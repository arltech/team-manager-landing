"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  Heart,
  PlayCircle,
  Shield,
  Sparkles,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/app/_components/Reveal";
import { AnimatedNumber } from "@/app/_components/AnimatedNumber";
import { Pill } from "@/app/_components/Pill";
import { Accordion } from "@/app/_components/Accordion";
import { Button } from "./_parts/Button";
import { WhatsProof } from "./_parts/WhatsProof";
import { ComparisonTable } from "./_parts/ComparisonTable";
import { FeatureRow, type FeatureRowData } from "./_parts/FeatureRow";

/**
 * Port of design-snapshots/design-system/ui_kits/landing/v2-claridade.html
 * ("Claridade" redesign direction · B-variant). Visual fidelity is the
 * priority — structure, copy, colors and spacing mirror the source 1:1.
 * Every CTA points to /diagnostico (the real quiz) instead of the
 * original's toast() stub.
 */

const navy = "var(--primary)";

const SEGMENTS = ["Idiomas", "Profissionalizantes", "Educação infantil", "Vestibular"];

const PAINS = [
  "Você sabe o resultado do mês só quando o mês acabou.",
  "O follow-up depende do assessor lembrar, e ele esquece.",
  "Segunda de manhã é reconstruir a semana de memória.",
  "Cada unidade tem uma planilha diferente.",
];
const FIXES = [
  "Funil de todas as unidades em tempo real, sem perguntar a ninguém.",
  "O sistema cobra o follow-up candidato a candidato, sozinho.",
  "Tudo já está no painel quando você chega na segunda.",
  "Uma fonte da verdade, com permissão na raiz dos dados.",
];

const TOPCARDS: { icon: LucideIcon; t: string; d: string }[] = [
  {
    icon: Bot,
    t: "Cobrança automática",
    d: "Monitora presença, follow-ups e prazos 24/7. Age antes de você pedir.",
  },
  {
    icon: Heart,
    t: "Reconhecimento via WhatsApp",
    d: "Matrículas e top performers celebrados no grupo, automaticamente.",
  },
  {
    icon: Trophy,
    t: "Ranking & gamificação",
    d: "14 ações, 8 níveis, XP automático e Hall da Fama que move a equipe.",
  },
];

const FEATROWS: FeatureRowData[] = [
  {
    img: "/ds/dashboard/slide-2.png",
    eyebrow: "CRM de candidatos",
    title: "Cada lead com dono, etapa e próximo passo.",
    desc: "Funil de 6 etapas, histórico completo e situações ativas (Quente, Em negociação, Indeciso). Exportação em um clique. Nada mais some entre planilhas.",
    bullets: ["Funil visual por unidade", "Follow-up cobrado pelo sistema", "Conversão lead → matrícula visível"],
  },
  {
    img: "/ds/dashboard/slide-1.png",
    eyebrow: "Visão executiva",
    title: "A operação inteira numa tela só.",
    desc: "Tarefas, candidatos, produção da semana e ranking de equipe, com filtro por unidade. Você para de investigar e começa a decidir.",
    bullets: ["Top 5 do mês + conquistas recentes", "Tarefas atrasadas em destaque", "Filtro Todas as unidades / por unidade"],
  },
];

const NUMS = [
  { to: 14, suffix: "", label: "componentes integrados" },
  { to: 72, suffix: "h", label: "do setup ao 1º insight" },
  { to: 4, suffix: "", label: "segmentos de matrícula" },
  { to: 30, suffix: " dias", label: "de garantia integral" },
];

const PLANS = [
  { name: "Starter", units: "1–2 unidades", users: "Até 15 usuários", hi: "Para começar a sair da planilha", feat: false },
  { name: "Rede", units: "3–6 unidades", users: "Até 30 usuários", hi: "Mais escolhido. Inclui Setup WhatsApp + Diagnóstico Fundador", feat: true },
  { name: "Regional", units: "7–15 unidades", users: "Ilimitado", hi: "ROI dominante para redes que já escalam", feat: false },
];

const FAQS: [string, string][] = [
  ["Minha equipe não vai usar.", "A gamificação resolve adoção: quem aparece no ranking não para de usar, e o sistema tira XP de quem some. Registro em 30s. Você não cobra: o sistema cobra."],
  ["É caro, planilha funciona.", "Planilha tem custo de lead perdido. Ticket R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Payback em menos de 9 dias."],
  ["Minha rede é pequena, faz sentido?", "O melhor momento de criar o hábito certo é quando a rede ainda é pequena. Com 2–3 unidades você corrige o processo antes de multiplicar o problema."],
  ["Integram com meu ERP?", "Em vez de integrar, substituímos a operação (CRM + tarefas + rotinas + ranking). Seu ERP financeiro continua financeiro."],
  ["Quanto tempo pra implantar?", "72 horas. Setup técnico em 2h (incluso em Rede e Regional), templates por segmento e suporte dedicado nos primeiros 7 dias."],
];

function Eyebrow({ children, c }: { children: string; c?: string }) {
  return (
    <span
      style={{ color: c || navy }}
      className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[0.12em] uppercase"
    >
      {children}
    </span>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mode, setMode] = useState<"sem" | "com">("sem");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const rows = mode === "sem" ? PAINS : FIXES;

  return (
    <div className="b-page">
      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(251,248,255,.85)] backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-7 h-[74px] flex items-center justify-between gap-6">
          <Link href="/" className="inline-flex items-center gap-[11px]">
            <Image src="/ds/icon-badge.png" alt="Team Manager" width={38} height={38} className="h-[38px] w-[38px] rounded-[11px]" />
            <span style={{ color: navy }} className="font-[var(--font-heading)] font-extrabold text-lg tracking-[-0.02em]">
              Team Manager
            </span>
          </Link>
          <nav className="topnav hidden md:flex gap-[30px]">
            {[
              ["O problema", "problema"],
              ["Solução", "solucao"],
              ["Comparar", "comparar"],
              ["Preços", "oferta"],
              ["FAQ", "faq"],
            ].map(([l, h]) => (
              <a key={h} href={`#${h}`} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <Button variant="primary" size="sm">
            Agendar demonstração
          </Button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-[140px] pb-20">
        <div
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% -5%, rgba(99,102,241,.14), transparent 60%)" }}
          className="absolute inset-0"
        />
        <div
          style={{ maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, #000, transparent 70%)" }}
          className="dot-bg absolute inset-0 opacity-50"
        />
        <div className="relative max-w-[880px] mx-auto px-7 text-center">
          <Reveal>
            <div className="mb-[22px]">
              <Pill tone="primary" className="whitespace-nowrap">
                Para redes de 1 a 15 unidades
              </Pill>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h1
              className="hero-h1b font-[var(--font-heading)] font-extrabold tracking-[-0.03em] leading-[1.06] text-[clamp(38px,5.2vw,58px)] mb-[22px]"
            >
              A operação da sua rede,
              <br />
              <span style={{ color: navy }}>visível numa tela só.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="text-[19px] text-[var(--muted-foreground)] leading-relaxed max-w-[600px] mx-auto mb-[30px]">
              CRM de candidatos, follow-up automático, ranking de equipe e rotinas semanais. O Team Manager{" "}
              <strong className="text-[#1a1b22]">cobra, lembra e reporta por você</strong>. Você cresce a rede.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap justify-center gap-3.5 mb-[18px]">
              <Button variant="primary" iconRight={<ArrowRight size={18} />}>
                Agendar demonstração
              </Button>
              <Button variant="secondary" icon={<PlayCircle size={16} />}>
                Ver diagnóstico de 2 min
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="text-[13.5px] text-[var(--muted-foreground)] inline-flex items-center gap-2">
              <Shield size={15} className="text-[var(--success)]" />
              Garantia de 30 dias · Setup em 72h · Sem fidelidade
            </div>
          </Reveal>
        </div>

        {/* browser-framed product shot */}
        <Reveal delay={0.16} y={36} className="relative max-w-[1080px] mx-auto mt-14 px-7">
          <div className="relative">
            <div className="winframe rounded-2xl overflow-hidden bg-white">
              <div className="h-[38px] bg-[#f4f2fc] border-b border-[var(--border)] flex items-center gap-2 px-4">
                <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57]" />
                <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e]" />
                <span className="w-[11px] h-[11px] rounded-full bg-[#28c840]" />
                <span className="ml-3.5 text-xs text-[var(--muted-foreground)] bg-white border border-[var(--border)] rounded-[7px] px-3.5 py-[3px]">
                  app.teammanager.com
                </span>
              </div>
              <div className="relative w-full aspect-[3064/1766]">
                <Image src="/ds/dashboard/slide-1.png" alt="Painel Team Manager" fill sizes="(max-width: 1080px) 100vw, 1080px" className="object-cover object-top" priority />
              </div>
            </div>
            <div
              style={{ boxShadow: "0 18px 40px rgba(30,58,138,.18)" }}
              className="floatchip absolute top-[60px] -right-2.5 bg-white rounded-[14px] px-4 py-3 border border-[var(--border)]"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
                <span className="text-[11.5px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.08em]">Conversão</span>
              </div>
              <div style={{ color: navy }} className="font-[var(--font-heading)] font-extrabold text-2xl mt-0.5">
                <AnimatedNumber value={8} suffix="%" />
              </div>
            </div>
            <div
              style={{ animationDelay: "-3s", background: navy, boxShadow: "0 18px 40px rgba(30,58,138,.35)" }}
              className="floatchip absolute bottom-10 -left-3 text-white rounded-[14px] px-4 py-3"
            >
              <div className="text-[11.5px] font-bold opacity-70 uppercase tracking-[0.08em]">Matrículas · mês</div>
              <div className="font-[var(--font-heading)] font-extrabold text-2xl mt-0.5">
                +<AnimatedNumber value={29} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* trust strip */}
        <div className="relative max-w-[1000px] mx-auto mt-[60px] px-7 text-center">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.14em] uppercase text-[var(--on-surface-variant)] mb-4 inline-flex items-center gap-2">
              <span className="w-[7px] h-[7px] rounded-full bg-[var(--success)]" />
              Em produção hoje em redes de
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SEGMENTS.map((s) => (
                <span key={s} className="px-4 py-2 rounded-full bg-white border border-[var(--border)] text-sm font-semibold text-[var(--foreground)]">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM (before/after toggle) ── */}
      <section id="problema" className="bg-white py-28 border-t border-[var(--border)] scroll-mt-20">
        <div className="max-w-[880px] mx-auto px-7 text-center">
          <Reveal>
            <div className="mb-4">
              <Eyebrow c="#dc2626">O problema</Eyebrow>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] mb-3.5">
              Se você precisa perguntar, está investigando.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-[var(--muted-foreground)] max-w-[580px] mx-auto mb-9 leading-relaxed">
              Veja o que muda quando a operação para de morar em planilhas e grupos de WhatsApp.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="inline-flex p-[5px] rounded-full bg-[var(--surface-container)] border border-[var(--border)] mb-9">
              {(
                [
                  ["sem", "Sem sistema"],
                  ["com", "Com Team Manager"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setMode(k)}
                  style={{
                    background: mode === k ? (k === "com" ? "var(--primary)" : "#1a1b22") : "transparent",
                    color: mode === k ? "#fff" : "var(--muted-foreground)",
                  }}
                  className="border-0 cursor-pointer px-[22px] py-2.5 rounded-full text-[14.5px] font-bold transition-all"
                >
                  {l}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            {rows.map((t, i) => {
              const bad = mode === "sem";
              return (
                <div
                  key={mode + i}
                  style={{
                    borderColor: bad ? "color-mix(in srgb,var(--destructive) 22%,transparent)" : "color-mix(in srgb,var(--success) 30%,transparent)",
                    background: bad ? "color-mix(in srgb,var(--destructive) 4%,transparent)" : "var(--success-subtle)",
                    animation: "b-fadeup .4s ease both",
                    animationDelay: `${i * 60}ms`,
                  }}
                  className="flex gap-3.5 px-6 py-[22px] rounded-[18px] border"
                >
                  {bad ? (
                    <X size={20} strokeWidth={2.5} className="text-[var(--destructive)] mt-0.5" />
                  ) : (
                    <Check size={20} strokeWidth={2.5} className="text-[var(--success)] mt-0.5" />
                  )}
                  <span className="text-[15.5px] leading-relaxed">{t}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SOLUTION: 3 cards + alternating rows ── */}
      <section id="solucao" className="bg-[#fbf8ff] py-28 scroll-mt-20">
        <div className="max-w-[1140px] mx-auto px-7">
          <Reveal className="text-center mb-4">
            <Eyebrow>A solução</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-[50px]">
              Um sistema. A operação inteira.
            </h2>
          </Reveal>
          <div className="cols3 grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
            {TOPCARDS.map((c, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-white border border-[var(--border)] rounded-[22px] p-[30px] h-full box-border shadow-[var(--shadow-card)]">
                  <span className="inline-flex items-center justify-center w-[52px] h-[52px] rounded-[15px] bg-[var(--primary)]/10 text-[var(--primary)] mb-5">
                    <c.icon size={25} />
                  </span>
                  <h3 className="font-[var(--font-heading)] font-bold text-xl tracking-[-0.02em] mb-2.5">{c.t}</h3>
                  <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed m-0">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col gap-[72px]">
            {FEATROWS.map((f, i) => (
              <FeatureRow key={i} f={f} reversed={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON table ── */}
      <section id="comparar" className="bg-white py-28 border-t border-[var(--border)] scroll-mt-20">
        <div className="max-w-[920px] mx-auto px-7">
          <Reveal className="text-center mb-4">
            <Eyebrow>Comparar</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-[50px]">
              Planilha + WhatsApp vs. Team Manager.
            </h2>
          </Reveal>
          <Reveal>
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* ── NÚMEROS ── */}
      <section className="bg-[#fbf8ff] py-[90px]">
        <div className="nums4 max-w-[1040px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4 gap-5">
          {NUMS.map((n, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="bg-white border border-[var(--border)] rounded-2xl px-[26px] py-7 text-center shadow-[var(--shadow-card)]">
                <div style={{ color: navy }} className="font-[var(--font-heading)] font-extrabold text-[clamp(32px,4vw,44px)] leading-none">
                  <AnimatedNumber value={n.to} suffix={n.suffix} />
                </div>
                <div className="text-[13.5px] text-[var(--muted-foreground)] mt-2.5 leading-snug">{n.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="bg-white py-25 border-t border-[var(--border)]">
        <div className="max-w-[840px] mx-auto px-7 text-center">
          <Reveal>
            <p className="font-[var(--font-heading)] font-bold text-[clamp(24px,3.2vw,34px)] leading-[1.3] tracking-[-0.02em] mb-7">
              &ldquo;Em 6 semanas parei de cobrar follow-up. O sistema cobra sozinho. Eu olho o que importa:{" "}
              <span style={{ color: navy }}>por que a unidade A matricula 30% mais que a B.</span>&rdquo;
            </p>
            <div className="inline-flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-full bg-[var(--surface-container)] inline-flex items-center justify-center font-[var(--font-heading)] font-bold text-[var(--on-surface-variant)]">
                SF
              </span>
              <div className="text-left">
                <div className="font-bold text-sm">Sócia-fundadora</div>
                <div className="text-[13px] text-[var(--muted-foreground)]">5 unidades · Cursos profissionalizantes</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsProof />

      {/* ── OFFER ── */}
      <section id="oferta" className="bg-[#fbf8ff] py-28 scroll-mt-20">
        <div className="max-w-[1140px] mx-auto px-7">
          <Reveal className="text-center mb-4">
            <Eyebrow>A oferta</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-3">
              Você paga por um sistema. Recebe a operação inteira.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-center text-[var(--muted-foreground)] text-[17px] max-w-[600px] mx-auto mb-[50px] leading-relaxed">
              Equivalente de mercado: R$ 12.390/mês. <strong className="text-[#1a1b22]">Seu investimento sai no diagnóstico gratuito.</strong>
            </p>
          </Reveal>
          <div className="plans3 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  style={{ boxShadow: p.feat ? "var(--shadow-glow-primary)" : "var(--shadow-card)" }}
                  className={`relative bg-white rounded-[24px] p-9 ${p.feat ? "border-2 border-[var(--primary)]" : "border border-[var(--border)]"}`}
                >
                  {p.feat && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Pill tone="primary" className="!bg-[var(--primary)] !text-white !border-0">
                        <Sparkles size={13} fill="currentColor" strokeWidth={0} /> Recomendado
                      </Pill>
                    </div>
                  )}
                  <h3 className="font-[var(--font-heading)] font-extrabold text-[28px] mb-1.5">{p.name}</h3>
                  <div className="text-[13.5px] text-[var(--muted-foreground)]">{p.units}</div>
                  <div className="text-[13.5px] text-[var(--muted-foreground)] mb-6">{p.users}</div>
                  <div className="font-[var(--font-heading)] font-extrabold text-[26px]">Sob diagnóstico</div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 mb-6 leading-relaxed">
                    Definido pelo porte da sua rede, no diagnóstico gratuito.
                  </p>
                  <p className="text-sm text-[#1a1b22]/[0.82] leading-relaxed mb-[26px] min-h-[62px]">{p.hi}</p>
                  <Button variant={p.feat ? "primary" : "outline"} fullWidth>
                    Agendar demonstração
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="max-w-[760px] mx-auto mt-10">
            <div className="flex gap-5 items-start p-9 rounded-[22px] border border-[var(--success)]/40 bg-[var(--success-subtle)]">
              <span className="inline-flex items-center justify-center w-[54px] h-[54px] rounded-[18px] bg-[var(--success)]/15 text-[var(--success)] flex-shrink-0">
                <Shield size={24} />
              </span>
              <div>
                <h3 className="font-[var(--font-heading)] font-bold text-xl mb-2.5">Garantia de 30 dias</h3>
                <p className="text-[#1a1b22]/85 leading-relaxed m-0">
                  Se em 30 dias você não conseguir ver o funil de todas as unidades sem perguntar a ninguém, devolvemos 100%, sem perguntas.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-white py-28 border-t border-[var(--border)] scroll-mt-20">
        <div className="max-w-[760px] mx-auto px-7">
          <Reveal className="text-center mb-4">
            <Eyebrow c="#757684">Perguntas frequentes</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(28px,3.5vw,42px)] text-center mb-10">
              As 5 que mais aparecem.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {FAQS.map(([q, a], i) => (
              <Reveal key={i} delay={i * 0.04}>
                <Accordion variant="card" summary={<span className="font-bold text-[17px]">{q}</span>}>
                  <p className="text-[var(--muted-foreground)] leading-relaxed m-0 text-[15px]">{a}</p>
                </Accordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA card ── */}
      <section className="bg-[#fbf8ff] pt-10 pb-[110px]">
        <div className="max-w-[1040px] mx-auto px-7">
          <Reveal>
            <div className="hero-gradient relative overflow-hidden rounded-[32px] px-12 py-[72px] text-center">
              <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,48px)] leading-[1.1] mb-5 text-white">
                Seja o gestor que não precisa cobrar.
              </h2>
              <p className="text-lg text-white/78 max-w-[540px] mx-auto mb-8 leading-relaxed">
                O sistema cobra. O grupo celebra. Você decide. Comece pelo diagnóstico gratuito de 2 minutos.
              </p>
              <Button variant="white" size="lg" iconRight={<ArrowRight size={18} />}>
                Agendar demonstração
              </Button>
              <p className="mt-[22px] text-[13.5px] text-white/60 flex items-center justify-center gap-2">
                <Shield size={14} />
                Garantia integral de 30 dias. Sem perguntas.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-[var(--border)] py-10">
        <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center flex-wrap gap-4">
          <span className="inline-flex items-center gap-2.5">
            <Image src="/ds/icon-badge.png" alt="" width={30} height={30} className="h-[30px] w-[30px] rounded-[9px]" />
            <span style={{ color: navy }} className="font-[var(--font-heading)] font-extrabold text-[15px]">
              Team Manager
            </span>
          </span>
          <span className="text-[13px] text-[var(--muted-foreground)]">
            © Team Manager · ARLTech · Sistema de operação para redes de escolas e cursos
          </span>
        </div>
      </footer>

      <style jsx global>{`
        .b-page ::selection {
          background: rgba(99, 102, 241, 0.2);
        }
        .b-page .dot-bg {
          background-image: radial-gradient(circle, rgba(30, 58, 138, 0.08) 1px, transparent 1px);
          background-size: 22px 22px;
        }
        .b-page .winframe {
          box-shadow: 0 40px 100px -20px rgba(30, 58, 138, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.04);
        }
        .b-page .floatchip {
          animation: b-bob 6s ease-in-out infinite;
        }
        @keyframes b-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-9px);
          }
        }
        @keyframes b-fadeup {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .b-page .floatchip {
            animation: none;
          }
        }
        @media (max-width: 900px) {
          .b-page .feat-row {
            grid-template-columns: 1fr !important;
          }
          .b-page .feat-row.rev > .feat-img {
            order: -1;
          }
          .b-page .cmp-table {
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
}
