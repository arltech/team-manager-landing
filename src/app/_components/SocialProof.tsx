import {
  Database,
  ShieldCheck,
  Zap,
  Layers,
  GraduationCap,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { IconBadge } from "./IconBadge";
import { KpiCard } from "./KpiCard";
import { AnimatedNumber } from "./AnimatedNumber";
import { TestimonialCarousel } from "./TestimonialCarousel";

const KPIS = [
  {
    icon: Layers,
    valueNumber: 14,
    valueSuffix: "",
    label: "componentes integrados",
    sub: "CRM + tarefas + rotinas + ranking + IA",
  },
  {
    icon: GraduationCap,
    valueNumber: 4,
    valueSuffix: "",
    label: "segmentos de matrícula",
    sub: "Idiomas, profissional, infantil, ensino regular",
  },
  {
    icon: Clock,
    valueNumber: 72,
    valueSuffix: "h",
    label: "do setup ao primeiro insight",
    sub: "Setup técnico + onboarding incluso",
  },
  {
    icon: CheckCircle2,
    valueNumber: 30,
    valueSuffix: " dias",
    label: "garantia integral",
    sub: "100% devolvido se equipe não usar",
  },
];

const TRUST = [
  {
    icon: Database,
    title: "Cada unidade vê só o que é dela",
    body: "A permissão é na raiz dos dados, não num filtro de tela. Auditável e à prova de erro humano.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoria e LGPD prontas",
    body: "Histórico de acesso por usuário, exportação de dados sob demanda, retenção que você define.",
  },
  {
    icon: Zap,
    title: "2 horas pra estar rodando",
    body: "Templates prontos por segmento de escola: idiomas, profissional, infantil, ensino regular. Sem consultoria de 3 meses.",
  },
];

export function SocialProof() {
  return (
    <section className="section-y bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          pill={
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] animate-pulse" />
              Em produção hoje
            </>
          }
          pillTone="success"
          title={
            <>
              Não é beta. Não é demo.
              <br />
              <span className="text-[var(--muted-foreground)]">
                É operação rodando.
              </span>
            </>
          }
          subtitle="Sistema sólido, dados reais, retorno mensurável nos primeiros 7 dias."
          align="center"
          className="mb-16"
        />

        {/* KPI metrics bar */}
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {KPIS.map((k, i) => (
            <StaggerItem key={i}>
              <KpiCard
                icon={k.icon}
                label={k.label}
                value={
                  <AnimatedNumber value={k.valueNumber} suffix={k.valueSuffix} />
                }
                sub={k.sub}
                variant="light"
              />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Featured testimonial carousel */}
        <Reveal className="mb-20" y={32}>
          <TestimonialCarousel />
        </Reveal>

        {/* Trust stripe */}
        <Stagger className="grid md:grid-cols-3 gap-5">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <StaggerItem
                key={i}
                className="flex gap-4 p-6 rounded-2xl bg-[var(--surface-container-low)] border border-[var(--border)]/40"
              >
                <IconBadge size="sm" tone="primary">
                  <Icon size={18} strokeWidth={2.4} />
                </IconBadge>
                <div>
                  <h3 className="text-sm font-bold mb-1.5 leading-tight text-[var(--foreground)]">
                    {t.title}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
