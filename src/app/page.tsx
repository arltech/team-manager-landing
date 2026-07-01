"use client";

/**
 * Route /a — port of design-snapshots/.../v2-comando.html ("Comando").
 * Dark editorial hero, animated aurora, bento solution grid, dark "ledger"
 * comparison table, WhatsApp proof. Ported 1:1 for visual fidelity; every
 * CTA that called toast() in the source now links to /diagnostico.
 */

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Check,
  Eye,
  FileCheck,
  GraduationCap,
  Heart,
  Shield,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { Reveal } from "./_components/Reveal";
import { AnimatedNumber } from "./_components/AnimatedNumber";
import { Pill } from "./_components/Pill";
import { Accordion } from "./_components/Accordion";
import { Button } from "./_parts/Button";
import { WhatsProof } from "./_parts/WhatsProof";

const NAV = [
  ["O problema", "problema"],
  ["Solução", "solucao"],
  ["Comparar", "comparar"],
  ["Preços", "oferta"],
  ["FAQ", "faq"],
] as const;

const SEGMENTS = [
  "Escolas de idiomas",
  "Cursos profissionalizantes",
  "Educação infantil",
  "Preparatórios / vestibular",
];

const NUMS = [
  { to: 14, suffix: "", label: "componentes num só sistema", sub: "CRM · tarefas · rotinas · ranking · IA" },
  { to: 72, suffix: "h", label: "do setup ao 1º insight", sub: "onboarding incluído" },
  { to: 30, suffix: " dias", label: "de garantia integral", sub: "100% devolvido se a equipe não usar" },
  { to: 100, suffix: "%", label: "da operação visível", sub: "sem precisar perguntar a ninguém" },
];

const FEATURES = [
  { Icon: Bot, t: "Cobrança que acontece sem você", d: "Automação 24/7 monitora presença, follow-ups atrasados e prazos. Age antes de você pedir.", big: true },
  { Icon: Heart, t: "Cultura via WhatsApp", d: "Matrículas e top performers anunciados automaticamente no grupo. Já foi celebrado antes de você saber." },
  { Icon: Eye, t: "Visibilidade sem presença", d: "Funil, rotinas e ranking de cada unidade em tempo real, com filtro por unidade." },
  { Icon: Target, t: "Do 1º contato à matrícula", d: "IA encontra leads em fontes públicas, distribui pra unidade certa e cobra follow-up." },
  { Icon: FileCheck, t: "Operação auto-documentada", d: "A rotina semanal puxa dados do CRM sozinha. Scripts de venda gerados por IA por candidato." },
];

const LEDGER: [string, string, string][] = [
  ["Resultado do mês", "Você só sabe quando o mês acabou", "Em tempo real, por unidade"],
  ["Follow-up", "Depende do assessor lembrar", "Cobrado pelo sistema, automático"],
  ["Reconhecimento", "Ninguém vê quem performou", "Celebrado no grupo, com ranking"],
  ["Reunião de segunda", "Reconstruir a semana de memória", "Já está tudo no painel"],
  ["Dados das unidades", "Uma planilha diferente em cada", "Uma fonte da verdade, auditável"],
];

const PLANS = [
  { name: "Starter", units: "1–2 unidades", users: "Até 15 usuários", hi: "Para começar a sair da planilha", feat: false },
  { name: "Rede", units: "3–6 unidades", users: "Até 30 usuários", hi: "Mais escolhido. Inclui Setup WhatsApp + Diagnóstico Fundador", feat: true },
  { name: "Regional", units: "7–15 unidades", users: "Ilimitado", hi: "ROI dominante para redes que já escalam", feat: false },
];

const FAQS: [string, string][] = [
  ["Minha equipe não vai usar.", "A gamificação resolve adoção: quem aparece no ranking não para de usar, e o sistema tira XP de quem some. Registro em 30s, alerta no WhatsApp. Você não cobra: o sistema cobra."],
  ["É caro, planilha funciona.", "Planilha tem custo de lead perdido. Ticket R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Payback em menos de 9 dias de uso ativo."],
  ["Minha rede é pequena, faz sentido?", "O melhor momento de criar o hábito certo é quando a rede ainda é pequena. Com 2–3 unidades você corrige o processo antes de multiplicar o problema."],
  ["Integram com meu ERP?", "Em vez de integrar, substituímos a operação (CRM + tarefas + rotinas + ranking). Seu ERP financeiro continua sendo financeiro."],
  ["Quanto tempo pra implantar?", "72 horas. Setup técnico em 2h (incluso em Rede e Regional), templates por segmento e suporte dedicado nos primeiros 7 dias."],
];

const PROBLEMS = [
  "Você sabe o resultado do mês só quando o mês acabou.",
  "Assessor some por dois dias e você descobre na reunião de sexta.",
  "Segunda de manhã é reconstruir a semana de memória, com números errados.",
  "Cada unidade tem uma planilha diferente. Nenhuma tem a mesma coluna.",
  "O follow-up depende de o assessor lembrar. O assessor esquece. O lead some.",
  "Seu melhor assessor pediu demissão porque nunca foi reconhecido.",
];

function Eyebrow({ children, tone = "#9bb0ff" }: { children: ReactNode; tone?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase"
      style={{ color: tone }}
    >
      <span className="w-5 h-px bg-current opacity-60" />
      {children}
    </span>
  );
}

/** Blurred animated blob field. Same `.aurora`/`span` markup as the source. */
function Aurora({
  blobs,
  style,
}: {
  blobs: { top?: string; bottom?: string; left?: string; right?: string; w: number; h: number; bg: string; delay?: string }[];
  style?: React.CSSProperties;
}) {
  return (
    <div className="aurora" style={style}>
      {blobs.map((b, i) => (
        <span
          key={i}
          style={{
            top: b.top,
            bottom: b.bottom,
            left: b.left,
            right: b.right,
            width: b.w,
            height: b.h,
            background: b.bg,
            animationDelay: b.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function ComandoPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* keyframes + decorative utility classes, scoped to this route by styled-jsx */}
      <style jsx global>{`
        .aurora {
          position: absolute;
          inset: -20% -10% auto -10%;
          height: 130%;
          pointer-events: none;
          z-index: 0;
        }
        .aurora span {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.55;
          animation: a-drift 18s ease-in-out infinite;
        }
        @keyframes a-drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 30px) scale(1.15); }
        }
        .gridlines {
          background-image: linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .floatcard {
          animation: a-bob 6s ease-in-out infinite;
        }
        @keyframes a-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora span, .floatcard { animation: none; }
        }
      `}</style>

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#070a1c]/80 backdrop-blur-md border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-7 h-[76px] flex items-center justify-between gap-6">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="h-12 w-auto"
            style={{ filter: "drop-shadow(0 2px 10px rgba(99,102,241,.3))" }}
            priority
          />
          <nav className="hidden md:flex gap-8">
            {NAV.map(([label, hash]) => (
              <a key={hash} href={`#${hash}`} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </nav>
          <Button variant="white" size="sm">
            Fazer diagnóstico grátis
          </Button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-[150px] pb-[90px] bg-[linear-gradient(180deg,#070a1c_0%,#0d1130_55%,#141a44_100%)]">
        <Aurora
          blobs={[
            { top: "4%", left: "8%", w: 480, h: 480, bg: "rgba(99,102,241,.5)" },
            { top: "30%", right: "4%", w: 420, h: 420, bg: "rgba(59,130,246,.4)", delay: "-6s" },
            { bottom: "-8%", left: "38%", w: 380, h: 380, bg: "rgba(244,114,182,.22)", delay: "-11s" },
          ]}
        />
        <div
          className="gridlines absolute inset-0 z-0"
          style={{ maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 30%, transparent 75%)" }}
        />
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 grid grid-cols-1 md:grid-cols-[1.05fr_.95fr] gap-14 items-center">
          <div>
            <Reveal>
              <div className="mb-6">
                <Pill tone="dark-glass" className="whitespace-nowrap">
                  Para redes de 1 a 15 unidades
                </Pill>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-[var(--font-heading)] font-extrabold tracking-[-0.03em] leading-[1.04] text-[40px] md:text-[clamp(40px,5vw,62px)] mb-6 text-balance text-white">
                Pare de ser o único
                <br />
                que se importa com
                <br />
                <span className="bg-[linear-gradient(120deg,#a5b8ff,#6366f1_60%,#3b82f6)] bg-clip-text text-transparent">
                  a meta de matrícula.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-[19px] text-white/75 leading-relaxed max-w-[520px] mb-3.5">
                CRM de candidatos, follow-up automático, ranking de equipe e rotinas
                semanais, num só sistema que{" "}
                <strong className="text-white font-bold">
                  cobra, lembra, reconhece e reporta por você.
                </strong>
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3.5 my-7 mb-5.5">
                <Button variant="primary" iconRight={<ArrowRight size={18} />}>
                  Fazer diagnóstico grátis
                </Button>
                <Button variant="ghost" iconRight={<ArrowRight size={16} />}>
                  Diagnóstico em 2 min
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="flex items-center gap-2.5 text-[13px] text-white/55">
                <Shield size={15} className="text-[#34d399]" />
                Garantia de 30 dias · Setup em 72h · Sem fidelidade
              </div>
            </Reveal>
          </div>

          {/* floating product preview */}
          <Reveal delay={0.18} y={36}>
            <div className="relative">
              <div className="rounded-[20px] overflow-hidden border border-white/[0.12] shadow-[0_40px_90px_rgba(0,0,0,0.6)] bg-[#0a0e27]">
                <Image
                  src="/ds/dashboard/slide-1.png"
                  alt="Painel Team Manager"
                  width={3064}
                  height={1766}
                  className="w-full block"
                  priority
                />
              </div>
              <div className="floatcard absolute -top-[22px] -right-[18px] bg-[#0d1130]/90 backdrop-blur-md border border-white/[0.12] rounded-2xl px-[18px] py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[3]">
                <div className="text-[11px] text-white/55 uppercase tracking-[0.1em] font-bold">Conversão</div>
                <div className="font-[var(--font-heading)] font-extrabold text-[26px] text-white leading-none">
                  <AnimatedNumber value={8} suffix="%" />
                </div>
              </div>
              <div
                className="floatcard absolute -bottom-5 -left-[22px] bg-[#0d1130]/90 backdrop-blur-md border border-[#34d399]/30 rounded-2xl px-[18px] py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[3]"
                style={{ animationDelay: "-3s" }}
              >
                <div className="text-[11px] text-[#34d399] uppercase tracking-[0.1em] font-bold whitespace-nowrap">
                  Matrículas · mês
                </div>
                <div className="font-[var(--font-heading)] font-extrabold text-[26px] text-white leading-none">
                  +<AnimatedNumber value={29} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* segments strip */}
        <div className="relative z-[2] max-w-[1200px] mx-auto px-7 mt-[72px]">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.14em] uppercase text-white/40 mb-4 text-center">
              Operando hoje em redes de
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {SEGMENTS.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 px-4 py-[9px] rounded-full border border-white/[0.12] bg-white/[0.04] text-sm font-semibold text-white/80"
                >
                  <GraduationCap size={15} className="text-[#9bb0ff]" />
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section id="problema" className="bg-[#fbf8ff] text-[#1a1b22] py-28 scroll-mt-20">
        <div className="max-w-[980px] mx-auto px-7">
          <Reveal className="mb-4.5">
            <Eyebrow tone="#dc2626">O problema</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] leading-[1.1] mb-3">
              Você não está gerenciando. <span className="text-[#dc2626]">Está investigando.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-[var(--muted-foreground)] max-w-[640px] mb-12 leading-relaxed">
              Se você precisa perguntar pra saber o que aconteceu na semana, o problema
              não é a sua equipe. É a falta de um sistema.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            {PROBLEMS.map((t, i) => (
              <Reveal key={t} delay={(i % 2) * 0.06}>
                <div className="flex gap-4 p-[22px_24px] rounded-[18px] bg-white border border-[var(--border)] h-full box-border">
                  <X size={20} strokeWidth={2.4} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
                  <span className="text-base leading-relaxed">{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NÚMEROS band ── */}
      <section
        className="relative overflow-hidden py-[84px]"
        style={{ background: "linear-gradient(135deg,var(--hero-from),var(--hero-to))" }}
      >
        <div className="gridlines absolute inset-0 opacity-50" />
        <div className="relative max-w-[1100px] mx-auto px-7 grid grid-cols-2 md:grid-cols-4 gap-7">
          {NUMS.map((n, i) => (
            <Reveal key={n.label} delay={i * 0.08}>
              <div className="text-left">
                <div className="font-[var(--font-heading)] font-extrabold text-[clamp(36px,4.5vw,54px)] leading-none bg-[linear-gradient(120deg,#fff,#a5b8ff)] bg-clip-text text-transparent">
                  <AnimatedNumber value={n.to} suffix={n.suffix} />
                </div>
                <div className="text-sm font-bold text-white mt-2.5">{n.label}</div>
                <div className="text-[12.5px] text-white/55 mt-1 leading-relaxed">{n.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SOLUTION (bento) ── */}
      <section id="solucao" className="bg-[#f4f2fc] text-[#1a1b22] py-28 scroll-mt-20">
        <div className="max-w-[1180px] mx-auto px-7">
          <Reveal className="text-center mb-4.5">
            <Eyebrow>A solução</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-[54px]">
              Team Manager foi construído pra isso.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 0.06} className={f.big ? "md:col-span-2" : ""}>
                <div
                  className={`bg-white border border-[var(--border)] rounded-[22px] p-[30px] h-full box-border shadow-[var(--shadow-card)] flex ${
                    f.big ? "flex-row items-center gap-7" : "flex-col items-stretch"
                  }`}
                >
                  <div className={f.big ? "flex-shrink-0" : ""}>
                    <span
                      className={`inline-flex items-center justify-center w-[54px] h-[54px] rounded-2xl bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)] ${
                        f.big ? "" : "mb-[22px]"
                      }`}
                    >
                      <f.Icon size={26} />
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-[var(--font-heading)] font-bold tracking-[-0.02em] mb-2.5 ${f.big ? "text-[26px]" : "text-xl"}`}>
                      {f.t}
                    </h3>
                    <p className="text-[15px] text-[var(--muted-foreground)] leading-relaxed m-0">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ledger ── */}
      <section id="comparar" className="relative overflow-hidden bg-[#0a0e27] text-[#f5f5fa] py-28 scroll-mt-20">
        <Aurora
          style={{ height: "100%", inset: "auto -10% -30% -10%" }}
          blobs={[{ bottom: "-20%", left: "30%", w: 520, h: 520, bg: "rgba(99,102,241,.3)" }]}
        />
        <div className="relative max-w-[1000px] mx-auto px-7">
          <Reveal className="text-center mb-4.5">
            <Eyebrow tone="#9bb0ff">Antes e depois</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-[54px]">
              O que muda no dia 1.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] rounded-[22px] overflow-hidden border border-white/10">
            <div className="hidden md:block px-6 py-[22px] bg-white/[0.03] font-bold text-[13px] uppercase tracking-[0.1em] text-white/50">
              &nbsp;
            </div>
            <div className="px-6 py-[22px] bg-[rgba(220,38,38,0.08)] font-bold text-[#fca5a5] flex items-center gap-2">
              <X size={16} />
              Hoje (planilha + WhatsApp)
            </div>
            <div className="px-6 py-[22px] bg-[rgba(52,211,153,0.1)] font-bold text-[#6ee7b7] flex items-center gap-2">
              <Sparkles size={16} />
              Com Team Manager
            </div>
            {LEDGER.map((row) => (
              <div key={row[0]} className="contents">
                <div className="px-6 py-5 border-t border-white/[0.07] font-semibold text-[15px]">{row[0]}</div>
                <div className="px-6 py-5 border-t border-white/[0.07] text-[14.5px] text-white/60 bg-[rgba(220,38,38,0.04)]">
                  {row[1]}
                </div>
                <div className="px-6 py-5 border-t border-white/[0.07] text-[14.5px] text-white bg-[rgba(52,211,153,0.05)] flex gap-2.5">
                  <Check size={17} strokeWidth={2.6} className="text-[#34d399] flex-shrink-0 mt-0.5" />
                  {row[2]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section className="bg-[#fbf8ff] text-[#1a1b22] py-[100px]">
        <div className="max-w-[880px] mx-auto px-7">
          <Reveal>
            <div className="bg-white border border-[var(--border)] rounded-[26px] p-12 md:p-[52px_48px] shadow-[var(--shadow-card)] relative">
              <p className="font-[var(--font-heading)] font-bold text-[clamp(22px,2.8vw,30px)] leading-[1.3] tracking-[-0.02em] mb-7">
                &ldquo;Antes eu ligava toda segunda perguntando &lsquo;cadê as matrículas?&rsquo;. Hoje eu só
                abro o Team Manager e{" "}
                <span className="text-[var(--primary)]">já sei de tudo, sem ligar pra ninguém.</span>&rdquo;
              </p>
              <div className="flex items-center gap-3.5">
                <Image
                  src="/testimonial-avatar.jpg"
                  alt=""
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                  style={{ boxShadow: "0 0 0 2px color-mix(in srgb,var(--primary) 15%,transparent)" }}
                />
                <div>
                  <div className="font-bold text-sm">Rodrigo Ferreira · Gerente Comercial</div>
                  <div className="text-[13px] text-[var(--muted-foreground)]">
                    3 unidades · Escola de idiomas · Piloto Team Manager
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WhatsProof />

      {/* ── OFFER ── */}
      <section id="oferta" className="bg-[#f4f2fc] text-[#1a1b22] py-28 scroll-mt-20">
        <div className="max-w-[1140px] mx-auto px-7">
          <Reveal className="text-center mb-4.5">
            <Eyebrow>A oferta</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] text-center mb-3">
              Você paga por um sistema. Recebe a operação inteira.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-center text-[var(--muted-foreground)] text-[17px] max-w-[600px] mx-auto mb-[76px] leading-relaxed">
              Equivalente de mercado: R$ 12.390/mês.{" "}
              <strong className="text-[#1a1b22]">Seu investimento sai no diagnóstico gratuito.</strong>
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.07}>
                <div
                  className={`relative bg-white rounded-[24px] p-9 ${
                    p.feat
                      ? "border-2 border-[var(--primary)] shadow-[var(--shadow-glow-primary)] md:scale-[1.03]"
                      : "border border-[var(--border)] shadow-[var(--shadow-card)]"
                  }`}
                >
                  {p.feat && (
                    <div className="absolute -top-[13px] left-1/2 -translate-x-1/2">
                      <Pill tone="primary" className="!bg-[var(--primary)] !text-white !border-0">
                        <Sparkles size={13} fill="currentColor" strokeWidth={0} /> Recomendado
                      </Pill>
                    </div>
                  )}
                  <h3 className="font-[var(--font-heading)] font-extrabold text-[28px] mb-1.5">{p.name}</h3>
                  <div className="text-[13.5px] text-[var(--muted-foreground)]">{p.units}</div>
                  <div className="text-[13.5px] text-[var(--muted-foreground)] mb-[26px]">{p.users}</div>
                  <div className="font-[var(--font-heading)] font-extrabold text-[26px]">Sob diagnóstico</div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 mb-6 leading-relaxed">
                    Definido pelo porte da sua rede, no diagnóstico gratuito.
                  </p>
                  <p className="text-sm text-[#1a1b22]/[0.82] leading-relaxed mb-[26px] min-h-[62px]">{p.hi}</p>
                  <Button variant={p.feat ? "primary" : "outline"} fullWidth>
                    Fazer diagnóstico grátis
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="max-w-[760px] mx-auto mt-10">
            <div className="flex gap-5 items-start p-9 rounded-[22px] border border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[var(--success-subtle)]">
              <span className="inline-flex items-center justify-center w-[54px] h-[54px] rounded-[18px] bg-[color-mix(in_srgb,var(--success)_15%,transparent)] text-[var(--success)] flex-shrink-0">
                <Shield size={24} />
              </span>
              <div>
                <h3 className="font-[var(--font-heading)] font-bold text-xl mb-2.5">Garantia de 30 dias</h3>
                <p className="text-[#1a1b22]/85 leading-relaxed m-0">
                  Se em 30 dias você não conseguir ver o funil de todas as unidades sem
                  perguntar a ninguém, devolvemos 100%, sem perguntas.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#fbf8ff] text-[#1a1b22] py-28 scroll-mt-20">
        <div className="max-w-[760px] mx-auto px-7">
          <Reveal className="mb-4.5">
            <Eyebrow tone="#757684">Perguntas frequentes</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(28px,3.5vw,42px)] mb-10">
              As 5 que mais aparecem.
            </h2>
          </Reveal>
          <div className="flex flex-col gap-3.5">
            {FAQS.map(([q, a], i) => (
              <Reveal key={q} delay={i * 0.04}>
                <Accordion variant="card" summary={<span className="font-bold text-[17px]">{q}</span>}>
                  <p className="text-[var(--muted-foreground)] leading-relaxed m-0 text-[15px]">{a}</p>
                </Accordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section
        className="relative overflow-hidden text-[#f5f5fa] py-[120px]"
        style={{ background: "linear-gradient(135deg,var(--hero-from),var(--hero-to))" }}
      >
        <Aurora blobs={[{ top: "10%", left: "40%", w: 520, h: 520, bg: "rgba(99,102,241,.35)" }]} />
        <div className="relative max-w-[760px] mx-auto px-7 text-center">
          <Reveal>
            <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(32px,4.5vw,52px)] leading-[1.1] mb-7">
              Não é uma escolha de software.
              <br />
              <span className="text-white/50">É sobre o tipo de gestor que você quer ser.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg text-white/[0.78] max-w-[560px] mx-auto mb-9 leading-relaxed">
              Seja o gestor que não precisa cobrar porque o sistema cobra. Que não
              precisa investigar porque já sabe.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <Button variant="primary" size="lg" iconRight={<ArrowRight size={18} />}>
              Ativar o Team Manager · garantia de 30 dias
            </Button>
            <p className="mt-6 text-[13.5px] text-white/55 flex items-center justify-center gap-2">
              <Shield size={14} /> Devolução integral em 30 dias. Sem perguntas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#070a1c] text-white/50 py-11">
        <div className="max-w-[1200px] mx-auto px-7 flex justify-between items-center flex-wrap gap-4">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="h-9 w-auto opacity-85"
          />
          <span className="text-[13px]">
            © Team Manager · ARLTech · Sistema de operação para redes de escolas e cursos
          </span>
        </div>
      </footer>
    </div>
  );
}
