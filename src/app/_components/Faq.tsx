import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Minha equipe não vai usar.",
    a: "Você está certo: a maioria dos sistemas falha por isso. Team Manager foi projetado ao contrário — ele se encaixa no fluxo que a supervisora já tem. Alerta no WhatsApp, registro em 30 segundos, segue o dia. Além disso, a gamificação resolve adoção: a supervisora que aparece no ranking depois de matricular 3 alunos não para de usar. E o sistema tira XP automaticamente de quem some por dias úteis. Você não precisa cobrar — o sistema cobra.",
  },
  {
    q: "É caro, planilha funciona.",
    a: "Planilha não tem custo de assinatura. Tem custo de lead perdido. Escola média recebe 30 leads/mês. Taxa sem follow-up sistematizado: 15-20%. Com: 30-40%. Ticket médio R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Plano Rede custa R$ 1.397. ROI líquido no mês 1: R$ 5.353. Payback em menos de 7 dias de uso ativo.",
  },
  {
    q: "Minha rede é pequena, faz sentido?",
    a: "O melhor momento pra implantar sistema de operação não é quando a rede está grande — é quando ainda é pequena o suficiente pra criar o hábito certo. Com 2-3 unidades você corrige o processo. Com 10 unidades, corrige 10 culturas diferentes de planilha.",
  },
  {
    q: "Vocês integram com meu ERP atual?",
    a: "Em vez de integrar, substituímos. Quando a tentativa é sincronizar dois sistemas, o que sobra é manutenção dupla e fonte da verdade ambígua. Team Manager assume a operação inteira (CRM + tarefas + rotinas + ranking) — seu ERP financeiro continua sendo financeiro.",
  },
  {
    q: "Quanto tempo leva pra implantar?",
    a: "72 horas. Setup técnico em 2 horas (incluso nos planos Rede e Regional). Vídeo de onboarding pronto pra mandar no WhatsApp do time. Templates por vertical pré-configurados (educação, saúde, imobiliário). Suporte dedicado nos primeiros 7 dias. Não é \"3 meses de implantação consultiva\".",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-y bg-[var(--surface)] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <span className="pill bg-[var(--surface-container)] text-[var(--on-surface-variant)] border border-[var(--border)]">
            Perguntas frequentes
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-14">
          As 5 que mais aparecem.
        </h2>

        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <details
              key={i}
              className="group card cursor-pointer !p-7 hover:border-[var(--primary)]/40 transition-colors"
            >
              <summary className="flex items-center justify-between gap-4 list-none [&::-webkit-details-marker]:hidden">
                <span className="text-base md:text-lg font-bold text-[var(--foreground)]">
                  {f.q}
                </span>
                <ChevronDown
                  size={20}
                  className="text-[var(--primary)] transition-transform group-open:rotate-180 flex-shrink-0"
                />
              </summary>
              <p className="text-[var(--muted-foreground)] leading-relaxed mt-5 pt-5 border-t border-[var(--border)]/40 text-sm md:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
