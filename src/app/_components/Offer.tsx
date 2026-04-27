import { Shield, Sparkles, ChevronDown } from "lucide-react";

const VALUE_STACK_CORE = [
  ["Painel multi-unidade com permissão por unidade na raiz", "R$ 18.000 base"],
  ["CRM com funil de 6 etapas, histórico e exportação", "R$ 812/mês"],
  ["Follow-up automático + lembretes por candidato", "R$ 870/mês"],
  ["Quadro de tarefas com responsáveis, prazos e lembretes", "R$ 570/mês"],
  ["Rotinas semanais que puxam dados do CRM sozinhas", "R$ 600/mês"],
  ["Análise de funil com comparação semana a semana", "R$ 800/mês"],
  ["Busca de leads com IA (Google + Maps)", "R$ 1.400/mês"],
];

const VALUE_STACK_DIFF = [
  ["Gamificação: 14 ações pontuáveis, 8 níveis, conquistas", "R$ 1.450/mês"],
  ["Automação no WhatsApp: bot de respostas + 6 eventos celebrados", "R$ 900/mês"],
  ["Gerador de scripts de venda com IA, por candidato", "R$ 600/mês"],
  ["Desconto automático de XP por inatividade", "Sem equivalente"],
  ["10 automações prontas (sem Zapier, sem configuração)", "R$ 770/mês"],
  ["Feed da equipe + ranking + Hall da Fama", "R$ 350/mês"],
  ["Frase motivacional diária por IA", "R$ 80/mês"],
];

const PLANS = [
  {
    name: "Starter",
    units: "1-3 unidades",
    users: "Até 15 usuários",
    price: 697,
    annual: 6274,
    featured: false,
    highlight: "Para começar a sair da planilha",
  },
  {
    name: "Rede",
    units: "4-10 unidades",
    users: "Até 40 usuários",
    price: 1397,
    annual: 12574,
    featured: true,
    highlight: "Mais escolhido — inclui Setup WhatsApp + Diagnóstico Fundador",
  },
  {
    name: "Regional",
    units: "11-20 unidades",
    users: "Ilimitado",
    price: 2497,
    annual: null,
    featured: false,
    highlight: "ROI dominante para redes que já escalam",
  },
];

const DIAGNOSTIC_SLOTS_AVAILABLE = 20;

export function Offer() {
  const calendly = process.env.NEXT_PUBLIC_DEMO_CALENDLY ?? "#";

  return (
    <section
      id="oferta"
      className="section-y bg-[var(--surface-container-low)] scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6">
            <span className="pill bg-[var(--accent)] text-[var(--accent-foreground)]">
              A Oferta
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
            Você paga por um sistema. Recebe a operação inteira.
          </h2>
          <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed">
            Equivalente de mercado: R$ 10.102/mês.
            <br className="hidden md:block" />
            <span className="text-[var(--foreground)] font-bold">
              Você paga a partir de R$ 697/mês.
            </span>
          </p>
        </div>

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
                  ou R$ {p.annual.toLocaleString("pt-BR")}/ano (2 meses grátis)
                </div>
              ) : (
                <div className="text-xs text-[var(--muted-foreground)] mb-8">
                  Negociação anual sob demanda
                </div>
              )}
              <p className="text-sm text-[var(--foreground)]/80 mb-8 leading-relaxed">
                {p.highlight}
              </p>
              <a
                href={calendly}
                className={
                  p.featured
                    ? "btn-primary w-full justify-center"
                    : "inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 rounded-xl border-2 border-[var(--primary)] text-[var(--primary)] font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
                }
              >
                Agendar demonstração
              </a>
            </div>
          ))}
        </div>

        {/* Value stack agora colapsado — Rams + Nielsen P0 fix */}
        <details className="card !p-7 max-w-3xl mx-auto mb-12 group cursor-pointer">
          <summary className="flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
            <div>
              <div className="text-xs uppercase tracking-[0.12em] font-bold text-[var(--on-surface-variant)] mb-1">
                Por que vale isso?
              </div>
              <div className="font-bold text-[var(--foreground)]">
                Os 14 componentes que somam R$ 10.102/mês de mercado
              </div>
            </div>
            <ChevronDown
              size={20}
              className="text-[var(--primary)] transition-transform group-open:rotate-180 flex-shrink-0"
            />
          </summary>

          <div className="mt-7 pt-7 border-t border-[var(--border)]/40">
            <h3 className="text-xs uppercase tracking-[0.12em] font-bold mb-4 text-[var(--on-surface-variant)]">
              Core
            </h3>
            <div className="space-y-2">
              {VALUE_STACK_CORE.map(([item, price], i) => (
                <div
                  key={i}
                  className="flex justify-between items-start gap-4 py-2.5 border-b border-[var(--border)]/30 last:border-0"
                >
                  <span className="text-sm text-[var(--foreground)]/85">{item}</span>
                  <span className="text-sm text-[var(--foreground)] font-bold whitespace-nowrap">
                    {price}
                  </span>
                </div>
              ))}
            </div>
            <h3 className="text-xs uppercase tracking-[0.12em] font-bold mb-4 mt-8 text-[var(--on-surface-variant)]">
              Diferenciais
            </h3>
            <div className="space-y-2">
              {VALUE_STACK_DIFF.map(([item, price], i) => (
                <div
                  key={i}
                  className="flex justify-between items-start gap-4 py-2.5 border-b border-[var(--border)]/30 last:border-0"
                >
                  <span className="text-sm text-[var(--foreground)]/85">{item}</span>
                  <span className="text-sm text-[var(--foreground)] font-bold whitespace-nowrap">
                    {price}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-7 pt-5 border-t-2 border-[var(--primary)]/20 flex justify-between items-baseline">
              <span className="text-sm text-[var(--muted-foreground)]">Total stack</span>
              <span className="text-2xl md:text-3xl font-extrabold text-[var(--primary)]">
                R$ 10.102/mês
              </span>
            </div>
          </div>
        </details>

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
