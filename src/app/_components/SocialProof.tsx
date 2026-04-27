import Image from "next/image";
import {
  Quote,
  Database,
  ShieldCheck,
  Zap,
  Layers,
  Building2,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { IconBadge } from "./IconBadge";
import { KpiCard } from "./KpiCard";

const KPIS = [
  {
    icon: Layers,
    value: "14",
    label: "componentes integrados",
    sub: "CRM + tarefas + rotinas + ranking + IA",
  },
  {
    icon: Building2,
    value: "5+",
    label: "verticais cobertas",
    sub: "Educação, saúde, imobiliário, fitness, beleza",
  },
  {
    icon: Clock,
    value: "72h",
    label: "do setup ao primeiro insight",
    sub: "Setup técnico + onboarding incluso",
  },
  {
    icon: CheckCircle2,
    value: "30 dias",
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
    body: "Templates prontos por segmento. Sem consultoria de 3 meses, sem manual de 80 páginas.",
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
                value={k.value}
                sub={k.sub}
                variant="light"
              />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Featured testimonial */}
        <Reveal className="relative max-w-4xl mx-auto mb-20" y={32}>
          <div className="absolute -inset-px bg-gradient-to-br from-[var(--primary)]/15 via-transparent to-[var(--primary)]/10 rounded-3xl pointer-events-none" />
          <div className="relative card !p-10 md:!p-14 bg-gradient-to-br from-[var(--card)] to-[var(--surface-container-low)]">
            <Quote
              className="absolute top-8 right-8 text-[var(--primary)]/15"
              size={64}
              strokeWidth={1.5}
              aria-hidden
            />
            <p className="text-xl md:text-2xl lg:text-[28px] leading-snug font-semibold text-[var(--foreground)] mb-8 max-w-3xl">
              &quot;Pela primeira vez, o assessor ligou pra perguntar o que
              tinha acontecido. O gestor não precisou ligar pra cobrar.&quot;
            </p>
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--primary)]/15 shadow-[0_4px_12px_rgba(30,58,138,0.18)] flex-shrink-0">
                <Image
                  src="/testimonial-avatar.jpg"
                  alt=""
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-[var(--foreground)] text-sm">
                  Gestor de rede
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  3 unidades · Educação · Piloto Team Manager
                </div>
                <div className="text-[10px] text-[var(--muted-foreground)]/70 mt-1 italic">
                  Identidade preservada a pedido do cliente · imagem ilustrativa
                </div>
              </div>
            </div>
          </div>
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
