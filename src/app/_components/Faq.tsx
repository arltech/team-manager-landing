import { Accordion } from "./Accordion";
import { SectionHeader } from "./SectionHeader";

const FAQS = [
  {
    q: "Minha equipe não vai usar.",
    a: "Você está certo: a maioria dos sistemas falha por isso. Team Manager foi projetado ao contrário — ele se encaixa no fluxo que a supervisora já tem. Alerta no WhatsApp, registro em 30 segundos, segue o dia. Além disso, a gamificação resolve adoção: a supervisora que aparece no ranking depois de matricular 3 alunos não para de usar. E o sistema tira XP automaticamente de quem some por dias úteis. Você não precisa cobrar — o sistema cobra.",
  },
  {
    q: "É caro, planilha funciona.",
    a: "Planilha não tem custo de assinatura. Tem custo de lead perdido. Escola média recebe 30 leads/mês. Taxa sem follow-up sistematizado: 15-20%. Com: 30-40%. Ticket médio R$ 500 × 3 unidades × 15 pontos extras = R$ 6.750/mês recuperados. Plano Rede custa R$ 1.797. ROI líquido no mês 1: R$ 4.953. Payback em menos de 9 dias de uso ativo.",
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
    a: "72 horas. Setup técnico em 2 horas (incluso nos planos Rede e Regional). Vídeo de onboarding pronto pra mandar no WhatsApp do time. Templates por segmento pré-configurados: idiomas, profissionalizantes, infantil, ensino regular. Suporte dedicado nos primeiros 7 dias. Não é \"3 meses de implantação consultiva\".",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-y bg-[var(--surface)] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeader
          pill="Perguntas frequentes"
          pillTone="muted"
          title="As 5 que mais aparecem."
          align="left"
        />

        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <Accordion
              key={i}
              variant="card"
              summary={
                <span className="text-base md:text-lg font-bold text-[var(--foreground)]">
                  {f.q}
                </span>
              }
            >
              <p className="text-[var(--muted-foreground)] leading-relaxed text-sm md:text-base">
                {f.a}
              </p>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
