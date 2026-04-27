export const Q1_OPTIONS = ["realtime", "partial", "ask", "no_idea"] as const;
export const Q2_OPTIONS = ["standard", "some", "when_pressed", "never"] as const;
export const Q3_OPTIONS = ["daily", "mid_month", "closing", "after"] as const;
export const Q4_OPTIONS = ["never", "once", "few_times", "frequent"] as const;
export const Q5_OPTIONS = ["productive", "half", "mostly", "only_way"] as const;

export type Q1 = (typeof Q1_OPTIONS)[number];
export type Q2 = (typeof Q2_OPTIONS)[number];
export type Q3 = (typeof Q3_OPTIONS)[number];
export type Q4 = (typeof Q4_OPTIONS)[number];
export type Q5 = (typeof Q5_OPTIONS)[number];

export interface QuizAnswers {
  q1: Q1;
  q2: Q2;
  q3: Q3;
  q4: Q4;
  q5: Q5;
}

export type Diagnostic =
  | "visibility_compromised"
  | "turnover_risk"
  | "pressure_culture"
  | "blind_closing"
  | "healthy_operation"
  | "inconclusive";

export const DIAGNOSTICS: Diagnostic[] = [
  "visibility_compromised",
  "turnover_risk",
  "pressure_culture",
  "blind_closing",
  "healthy_operation",
  "inconclusive",
];

export interface DiagnosticEvidence {
  scores: {
    visibility: number;
    turnover: number;
    pressure: number;
    blindClosing: number;
    healthy: number;
  };
  topDelta: number;
  confidence: "high" | "medium" | "low";
  /** Brief contextual reason — used in copy to justify the answer */
  signals: string[];
}

export interface DiagnosticResult {
  diagnostic: Diagnostic;
  evidence: DiagnosticEvidence;
}

export function computeDiagnostic(a: QuizAnswers): Diagnostic {
  return computeDiagnosticDetailed(a).diagnostic;
}

export function computeDiagnosticDetailed(a: QuizAnswers): DiagnosticResult {
  // q1 — knowledge of individual activity (max 2)
  const v_q1 = ["ask", "no_idea"].includes(a.q1) ? 2 : a.q1 === "partial" ? 1 : 0;
  // q3 — visibility of unit performance (max 2)
  const v_q3 = a.q3 === "after" ? 2 : a.q3 === "closing" ? 1 : 0;
  const visibilityScore = v_q1 + v_q3;

  // q4 — turnover history (max 3, but capped to 2 below to avoid dominance)
  const turnoverScore =
    a.q4 === "frequent" ? 3 : a.q4 === "few_times" ? 2 : a.q4 === "once" ? 1 : 0;

  // q2 — proactive reporting (max 2) + turnover pull-in (max 1)
  const p_q2 = ["when_pressed", "never"].includes(a.q2) ? 2 : a.q2 === "some" ? 1 : 0;
  const pressureScore = p_q2 + (turnoverScore >= 1 ? 1 : 0);

  // q3 + q5 — late discovery + recovery meeting
  const b_q3 = a.q3 === "after" ? 2 : 0;
  const b_q5 = ["mostly", "only_way"].includes(a.q5) ? 2 : a.q5 === "half" ? 1 : 0;
  const blindClosingScore = b_q3 + b_q5;

  // healthy signals
  const h_q1 = a.q1 === "realtime" ? 2 : 0;
  const h_q3 = ["daily", "mid_month"].includes(a.q3) ? 2 : 0;
  const h_q5 = a.q5 === "productive" ? 2 : 0;
  const healthyScore = h_q1 + h_q3 + h_q5;

  const signals: string[] = [];
  if (v_q1 === 2) signals.push("não sabe atendimentos individuais");
  if (v_q3 === 2) signals.push("descobre meta só após o fechamento");
  if (turnoverScore >= 2) signals.push("turnover recorrente por reconhecimento");
  if (p_q2 === 2) signals.push("equipe só reporta quando cobrada");
  if (b_q5 === 2) signals.push("reunião de segunda é recuperação de dados");
  if (h_q1 === 2 && h_q3 === 2 && h_q5 === 2) signals.push("operação madura em todos os pontos-chave");

  // Healthy operation needs strong, broad signals AND no turnover history
  if (healthyScore >= 5 && turnoverScore === 0) {
    return {
      diagnostic: "healthy_operation",
      evidence: {
        scores: {
          visibility: visibilityScore,
          turnover: turnoverScore,
          pressure: pressureScore,
          blindClosing: blindClosingScore,
          healthy: healthyScore,
        },
        topDelta: healthyScore,
        confidence: "high",
        signals,
      },
    };
  }

  const scores: Array<{ d: Exclude<Diagnostic, "healthy_operation" | "inconclusive">; s: number }> = [
    { d: "visibility_compromised", s: visibilityScore },
    { d: "turnover_risk", s: turnoverScore },
    { d: "pressure_culture", s: pressureScore },
    { d: "blind_closing", s: blindClosingScore },
  ];

  scores.sort((x, y) => y.s - x.s);
  const top = scores[0];
  const second = scores[1];
  const topDelta = top.s - second.s;

  // Inconclusive: no real signal OR top score is too close to runner-up
  // (means multiple dimensions are weakly affected; better to invite a conversation)
  const isInconclusive = top.s < 3 || (top.s < 4 && topDelta < 1);

  if (isInconclusive) {
    return {
      diagnostic: "inconclusive",
      evidence: {
        scores: {
          visibility: visibilityScore,
          turnover: turnoverScore,
          pressure: pressureScore,
          blindClosing: blindClosingScore,
          healthy: healthyScore,
        },
        topDelta,
        confidence: "low",
        signals,
      },
    };
  }

  const confidence: DiagnosticEvidence["confidence"] =
    topDelta >= 2 ? "high" : "medium";

  return {
    diagnostic: top.d,
    evidence: {
      scores: {
        visibility: visibilityScore,
        turnover: turnoverScore,
        pressure: pressureScore,
        blindClosing: blindClosingScore,
        healthy: healthyScore,
      },
      topDelta,
      confidence,
      signals,
    },
  };
}

export interface DiagnosticCopy {
  badge: string;
  title: string;
  summary: string;
  actionSteps: [string, string, string];
  emailSubject: string;
  emailIntro: string;
  accentColor: string;
}

export const DIAGNOSTIC_COPY: Record<Diagnostic, DiagnosticCopy> = {
  visibility_compromised: {
    badge: "Visibilidade comprometida",
    title: "Sua rede opera em loop fechado de informação",
    summary:
      "Você descobre o que aconteceu na semana só na reunião de segunda — e geralmente os números chegam errados ou incompletos. A consequência: decisões são tomadas tarde demais, sempre reativas. Quem ganha são as unidades que sabem se vender. Quem perde são as que precisariam de intervenção.",
    actionSteps: [
      "Centralize candidatos, tarefas e rotinas semanais em uma única plataforma — sem planilha paralela.",
      "Substitua a reunião de segunda por dashboard em tempo real: o que deveria ser puxado já chega antes da pauta.",
      "Configure alertas automáticos para tarefas vencendo e candidatos sem follow-up — nada depende da memória do gestor.",
    ],
    emailSubject: "Seu diagnóstico: Visibilidade comprometida — plano em 3 passos",
    emailIntro:
      "Você marcou que descobre o resultado da rede tarde demais. Esse é o diagnóstico mais comum entre gestores de redes de escolas e cursos — e o de maior impacto financeiro.",
    accentColor: "#ef4444",
  },
  turnover_risk: {
    badge: "Risco de turnover comercial",
    title: "Seu time vende sem se sentir visto",
    summary:
      "Você já perdeu vendedor — e sabe que reconhecimento estruturado teria mudado o jogo. O problema não é meta; é cultura de visibilidade. Time que matricula e ninguém celebra começa a procurar lugar onde a entrega seja notada. E quando sai, leva pipeline junto.",
    actionSteps: [
      "Implante celebração automática no WhatsApp da equipe a cada matrícula — antes do gestor ficar sabendo, o grupo já reconheceu.",
      "Configure ranking mensal e Hall da Fama dos últimos 6 meses — visibilidade que persiste, não só pico de mês.",
      "Use gamificação ligada à ação real (matrícula, follow-up, rotina preenchida) — XP que reflete comportamento, não vaidade.",
    ],
    emailSubject: "Seu diagnóstico: Risco de turnover — como blindar seu time",
    emailIntro:
      "Você marcou que já perdeu vendedor por falta de reconhecimento. Esse diagnóstico é o que mais custa caro a longo prazo — porque a cada saída, vai 6 meses de pipeline.",
    accentColor: "#f59e0b",
  },
  pressure_culture: {
    badge: "Cultura de cobrança",
    title: "Sua equipe só produz quando você pressiona",
    summary:
      "Time que só faz o necessário quando você cobra é time que não internalizou meta. O que falta não é talento — é sistema que crie accountability sem você precisar estar presente. Hoje, você é a única engrenagem ativa. Se sair de férias 1 semana, a operação para.",
    actionSteps: [
      "Ative penalidade automática de inatividade — XP que diminui sozinho quando assessor some por dias úteis. Cobrança vira sistemática, não personalizada.",
      "Estabeleça rotina semanal com fechamento sexta 23:59 — quem não preencher entra como pendência visível para todos.",
      "Configure relatório semanal automático com top performers — celebra quem produz e expõe quem some, sem você precisar comentar.",
    ],
    emailSubject: "Seu diagnóstico: Cultura de cobrança — como sair do meio",
    emailIntro:
      "Você marcou que time só produz sob pressão. Isso é cultura, não pessoa — e cultura se muda com sistema, não com sermão.",
    accentColor: "#d946ef",
  },
  blind_closing: {
    badge: "Fechamento às cegas",
    title: "Você descobre o resultado quando o mês acabou",
    summary:
      "Você espera fechar o mês para saber se a meta bateu. A reunião de segunda é só recuperação de informação. Decisões só acontecem quando já não dá mais para mudar o resultado — e a próxima semana começa igualzinha. Você gerencia o passado, não o presente.",
    actionSteps: [
      "Ative analytics de funil em tempo real — conversão stage-to-stage, comparação mensal, breakdown por unidade.",
      "Substitua reunião de segunda por leitura prévia do painel — chegue na reunião com decisão, não com pergunta.",
      "Configure relatório semanal automático para diretoria toda segunda 8h BRT — sem precisar montar manualmente.",
    ],
    emailSubject: "Seu diagnóstico: Fechamento às cegas — como ver o mês antes de acabar",
    emailIntro:
      "Você marcou que descobre o resultado só no fechamento. Isso significa que sua janela de intervenção é zero — e a margem de erro é total.",
    accentColor: "#06b6d4",
  },
  inconclusive: {
    badge: "Diagnóstico em zona cinzenta",
    title: "Sua operação tem sinais misturados — vale uma conversa",
    summary:
      "Suas respostas indicam que sua rede não tem um único gargalo dominante: alguns pontos funcionam, outros precisam de ajuste. Isso é comum em redes em transição (3-7 unidades) — onde processos informais começam a falhar mas a operação ainda não quebrou. Um diagnóstico ao vivo de 30 min com o fundador identifica onde está o gargalo real, baseado nos seus números, não num quiz.",
    actionSteps: [
      "Agende um diagnóstico ao vivo de 30 min — gratuito para os primeiros 20 contratos. Trazemos perguntas específicas pro seu segmento.",
      "Antes da conversa, anote: quantos candidatos entraram no último mês, quantos viraram matrícula, e quantos sumiram sem ninguém perceber.",
      "Compare hoje vs há 6 meses — se a equipe cresceu mais que os processos, esse é o seu ponto crítico.",
    ],
    emailSubject: "Seu diagnóstico: zona cinzenta — vamos olhar de perto",
    emailIntro:
      "Suas respostas não apontaram um único gargalo crítico — o que é normal e tratável. Nesses casos, conversa direta vale mais que diagnóstico padronizado.",
    accentColor: "#94a3b8",
  },
  healthy_operation: {
    badge: "Operação saudável",
    title: "Sua rede já roda com visibilidade — raro e admirável",
    summary:
      "Você é minoria. A maioria das redes de escolas e cursos vive de planilha desatualizada e reunião reconstruindo a semana. Se sua operação está saudável, vale aprofundar o que já funciona — e reforçar nos pontos onde a cultura ainda pode regredir quando a rede crescer.",
    actionSteps: [
      "Documente o que funciona — quando crescer para 8+ unidades, processo informal vira gargalo.",
      "Indique outras redes do seu segmento que ainda estão na planilha — você ganha network e nós ganhamos clientes que precisam.",
      "Considere o Team Manager para escalar visibilidade — o que você faz hoje no detalhe, o sistema mantém quando a rede triplicar.",
    ],
    emailSubject: "Seu diagnóstico: Operação saudável — vamos aprofundar",
    emailIntro:
      "Sua rede está em condição rara. Maioria dos diagnósticos que rodamos retorna problema crítico — o seu retornou maturidade.",
    accentColor: "#22d3a4",
  },
};

export const QUESTIONS = [
  {
    key: "q1" as const,
    title: "Você sabe exatamente quantos candidatos cada consultor atendeu essa semana?",
    options: [
      { value: "realtime" as Q1, label: "Sim, em tempo real" },
      { value: "partial" as Q1, label: "Sei de alguns" },
      { value: "ask" as Q1, label: "Tenho que perguntar" },
      { value: "no_idea" as Q1, label: "Não sei" },
    ],
  },
  {
    key: "q2" as const,
    title: "Seu time preenche algum relatório sem você pedir?",
    options: [
      { value: "standard" as Q2, label: "Sim, padronizado" },
      { value: "some" as Q2, label: "Alguns preenchem" },
      { value: "when_pressed" as Q2, label: "Só quando cobro" },
      { value: "never" as Q2, label: "Nunca" },
    ],
  },
  {
    key: "q3" as const,
    title: "Você consegue ver quais unidades estão abaixo da meta antes do fechamento do mês?",
    options: [
      { value: "daily" as Q3, label: "Sim, acompanho diariamente" },
      { value: "mid_month" as Q3, label: "No meio do mês" },
      { value: "closing" as Q3, label: "Só no fechamento" },
      { value: "after" as Q3, label: "Descubro depois" },
    ],
  },
  {
    key: "q4" as const,
    title: "Quando foi a última vez que perdeu um bom vendedor que saiu porque não se sentia reconhecido?",
    options: [
      { value: "never" as Q4, label: "Nunca aconteceu" },
      { value: "once" as Q4, label: "Já aconteceu uma vez" },
      { value: "few_times" as Q4, label: "Já aconteceu algumas vezes" },
      { value: "frequent" as Q4, label: "Acontece com frequência" },
    ],
  },
  {
    key: "q5" as const,
    title: "Sua reunião de segunda-feira é produtiva ou é recuperação de informação?",
    options: [
      { value: "productive" as Q5, label: "Produtiva, já sei tudo" },
      { value: "half" as Q5, label: "Metade recuperação" },
      { value: "mostly" as Q5, label: "Maior parte recuperação" },
      { value: "only_way" as Q5, label: "É a única forma de saber" },
    ],
  },
] as const;
