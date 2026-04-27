import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";
import { Accordion } from "./Accordion";
import { SectionHeader } from "./SectionHeader";

type StackItem = { item: string; price: string; ref: string };

const VALUE_STACK_CORE: StackItem[] = [
  {
    item: "Painel multi-unidade com permissão por unidade na raiz",
    price: "R$ 1.500/mês",
    ref: "Salesforce Multi-Org (rateio)",
  },
  {
    item: "CRM com funil de 6 etapas, histórico e exportação",
    price: "R$ 950/mês",
    ref: "Pipedrive Pro · 10 vendedores",
  },
  {
    item: "Follow-up automático + lembretes por candidato",
    price: "R$ 1.100/mês",
    ref: "Lemlist / Reply.io",
  },
  {
    item: "Quadro de tarefas (até 30 usuários)",
    price: "R$ 870/mês",
    ref: "Asana Business · 30 usuários",
  },
  {
    item: "Rotinas semanais que puxam dados do CRM sozinhas",
    price: "R$ 400/mês",
    ref: "Zapier Pro + Make",
  },
  {
    item: "Análise de funil com comparação semana a semana",
    price: "R$ 800/mês",
    ref: "Looker Studio Pro / Power BI",
  },
  {
    item: "Busca de leads com IA em fontes públicas",
    price: "R$ 1.400/mês",
    ref: "Apollo + Phantombuster",
  },
];

const VALUE_STACK_DIFF: StackItem[] = [
  {
    item: "Gamificação completa: 14 ações + 8 níveis + ranking + Hall da Fama + XP automático",
    price: "R$ 1.800/mês",
    ref: "Bunchball / Kazoo",
  },
  {
    item: "Automação WhatsApp interna: lembretes e 6 eventos celebrados",
    price: "R$ 700/mês",
    ref: "Z-API + desenvolvimento custom",
  },
  {
    item: "Gerador de scripts de venda com IA, por candidato",
    price: "R$ 600/mês",
    ref: "OpenAI API + dev",
  },
  {
    item: "10 automações prontas (sem Zapier, sem configuração)",
    price: "R$ 770/mês",
    ref: "Zapier + n8n self-hosted",
  },
  {
    item: "Setup técnico + onboarding (consultor implementador)",
    price: "R$ 1.500/mês",
    ref: "Consultoria · amortizado em 12 meses",
  },
];

const PLANS = [
  {
    name: "Starter",
    units: "1-2 unidades",
    users: "Até 15 usuários",
    price: 897,
    annual: 8073,
    featured: false,
    highlight: "Para começar a sair da planilha",
  },
  {
    name: "Rede",
    units: "3-6 unidades",
    users: "Até 30 usuários",
    price: 1797,
    annual: 16173,
    featured: true,
    highlight:
      "Mais escolhido — inclui Setup WhatsApp interno (lembretes e ranking, não chatbot) + Diagnóstico Fundador",
  },
  {
    name: "Regional",
    units: "7-15 unidades",
    users: "Ilimitado",
    price: 3197,
    annual: null,
    featured: false,
    highlight: "ROI dominante para redes que já escalam",
  },
];

const DIAGNOSTIC_SLOTS_AVAILABLE = 20;

export function Offer() {
  return (
    <section
      id="oferta"
      className="section-y bg-[var(--surface-container-low)] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          pill="A Oferta"
          pillTone="accent"
          title="Você paga por um sistema. Recebe a operação inteira."
          subtitle={
            <>
              Equivalente de mercado: R$ 12.390/mês.
              <br className="hidden md:block" />
              <span className="text-[var(--foreground)] font-bold">
                Você paga a partir de R$ 897/mês.
              </span>
            </>
          }
          align="center"
          className="mb-16"
        />



        {/* Pricing first — Nielsen P0 fix */}
        <div className="grid md:grid-cols-3 gap-7 mb-14">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`card relative !p-10 ${
                p.featured
                  ? "scale-100 md:scale-105 border-[var(--primary)] !border-2 shadow-[var(--shadow-glow-primary)]"
                  : ""
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 pill bg-[var(--primary)] text-white border-0">
                  <Sparkles size={12} /> Recomendado
                </div>
              )}
              <h3 className="text-2xl md:text-3xl mb-2">{p.name}</h3>
              <div className="text-sm text-[var(--muted-foreground)]">{p.units}</div>
              <div className="text-sm text-[var(--muted-foreground)] mb-8">
                {p.users}
              </div>
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)]">
                  R$ {p.price}
                </span>
                <span className="text-[var(--muted-foreground)] ml-1">/mês</span>
              </div>
              {p.annual ? (
                <div className="text-xs text-[var(--muted-foreground)] mb-8">
                  ou R$ {p.annual.toLocaleString("pt-BR")}/ano (3 meses grátis)
                </div>
              ) : (
                <div className="text-xs text-[var(--muted-foreground)] mb-8">
                  Negociação anual sob demanda
                </div>
              )}
              <p className="text-sm text-[var(--foreground)]/80 mb-8 leading-relaxed">
                {p.highlight}
              </p>
              <Link
                href="/diagnostico"
                className={
                  p.featured
                    ? "btn-primary w-full justify-center"
                    : "inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
                }
              >
                Agendar demonstração
              </Link>
            </div>
          ))}
        </div>

        {/* Value stack — Rams + Nielsen P0 fix */}
        <Accordion
          variant="card"
          className="max-w-3xl mx-auto mb-12"
          summary={
            <>
              <div className="text-xs uppercase tracking-[0.12em] font-bold text-[var(--on-surface-variant)] mb-1">
                Por que vale isso?
              </div>
              <div className="font-bold text-[var(--foreground)]">
                Os 12 componentes que somam R$ 12.390/mês de mercado
              </div>
            </>
          }
        >
          <h3 className="text-xs uppercase tracking-[0.12em] font-bold mb-4 text-[var(--on-surface-variant)]">
            Core
          </h3>
          <StackTable items={VALUE_STACK_CORE} />
          <h3 className="text-xs uppercase tracking-[0.12em] font-bold mb-4 mt-8 text-[var(--on-surface-variant)]">
            Diferenciais
          </h3>
          <StackTable items={VALUE_STACK_DIFF} />
          <div className="mt-7 pt-5 border-t-2 border-[var(--primary)]/20 flex justify-between items-baseline">
            <span className="text-sm text-[var(--muted-foreground)]">Total stack</span>
            <span className="text-2xl md:text-3xl font-extrabold text-[var(--primary)]">
              R$ 12.390/mês
            </span>
          </div>
        </Accordion>

        {/* Garantia */}
        <div className="card max-w-3xl mx-auto !p-10 border-[var(--success)]/40 bg-[var(--success-subtle)]">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center flex-shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-xl mb-3">Garantia em 2 camadas</h3>
              <p className="text-[var(--foreground)]/85 leading-relaxed mb-4">
                Se em <strong>30 dias</strong> sua equipe não estiver usando
                ativamente — devolvemos 100%, sem perguntas.
              </p>
              <p className="text-[var(--foreground)]/85 leading-relaxed">
                E se em <strong>60 dias de uso ativo</strong> o número de
                candidatos com follow-up registrado não aumentar — trabalhamos
                com você de graça até resolver.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--muted-foreground)]">
            <span className="font-mono font-bold text-[var(--tertiary)]">
              {DIAGNOSTIC_SLOTS_AVAILABLE} de 20
            </span>{" "}
            slots disponíveis para Diagnóstico de Funil ao Vivo com o fundador
            (R$ 2.000) — incluso para os primeiros 20 contratos.
          </p>
        </div>
      </div>
    </section>
  );
}

function StackTable({ items }: { items: StackItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((row, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] md:items-center gap-1 md:gap-6 py-3 border-b border-[var(--border)]/30 last:border-0"
        >
          <span className="text-sm text-[var(--foreground)]/85 leading-snug">
            {row.item}
          </span>
          <span className="text-[11px] text-[var(--muted-foreground)] italic md:text-right md:whitespace-nowrap">
            ref. {row.ref}
          </span>
          <span className="text-sm text-[var(--foreground)] font-bold whitespace-nowrap md:min-w-[110px] md:text-right">
            {row.price}
          </span>
        </div>
      ))}
    </div>
  );
}
