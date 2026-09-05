import { MessageSquare, Users, Bell, Bot } from "lucide-react";

/**
 * O que o sistema manda, para quem e quando.
 *
 * Tudo aqui existe: os horarios sao os dos crons em vercel.json e no pg_cron
 * (board-pulse 18h BRT, board-digest e top-performer segunda 8h, coach duas
 * vezes por dia util), e os eventos 1:1 sao as chaves de
 * lib/botconversa/eventos-keys.ts. Horario declarado e o tipo de detalhe que
 * o visitante consegue cobrar depois, entao ele so entra se for verdade.
 */

const CANAIS = [
  {
    Icon: Users,
    para: "No grupo da diretoria",
    resumo: "Quem lidera a rede não precisa abrir o sistema para saber como foi o dia.",
    itens: [
      ["Todo dia às 18h", "O pulso da rede: o que entrou, o que fechou e o que travou."],
      ["Segunda de manhã", "O fechamento da semana, unidade por unidade."],
      ["Quando quiser", "Pergunte no próprio grupo: como está a unidade X, quem está parado, quantas vendas no mês."],
    ],
    destaque: true,
  },
  {
    Icon: MessageSquare,
    para: "No grupo do time",
    resumo: "O reconhecimento acontece na hora, sem depender de alguém lembrar de elogiar.",
    itens: [
      ["Na hora", "Contrato fechado vira anúncio no grupo, com o nome de quem fechou."],
      ["Segunda de manhã", "O destaque da semana, com o placar de todo mundo."],
      ["Todo dia", "A mensagem que abre o dia e o lembrete de quem ainda não preencheu a rotina."],
    ],
  },
  {
    Icon: Bell,
    para: "Para cada pessoa",
    resumo: "O aviso chega em quem tem que agir, não num mural que ninguém lê.",
    itens: [
      ["Antes de vencer", "Prazo de tarefa, rotina em aberto e contrato perto do fim."],
      ["Quando acontece", "Lead novo distribuído para você, lead seu parado tempo demais."],
      ["Depois do fato", "Contrato assinado pelo cliente, com o comprovante anexado."],
    ],
  },
];

export function Avisos() {
  return (
    <>
      <div className="tm-canais">
        {CANAIS.map((c) => (
          <article key={c.para} className={`tm-canal${c.destaque ? " tm-canal-destaque" : ""}`}>
            <c.Icon size={24} strokeWidth={1.75} aria-hidden="true" />
            <h3 className="tm-canal-para">{c.para}</h3>
            <p className="tm-canal-resumo">{c.resumo}</p>
            <ul className="tm-canal-lista">
              {c.itens.map(([quando, oque]) => (
                <li key={oque}>
                  <span className="tm-canal-quando">{quando}</span>
                  <span className="tm-canal-oque">{oque}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="tm-ia">
        <Bot size={26} strokeWidth={1.75} aria-hidden="true" />
        <div>
          <h3 className="tm-ia-titulo">E três agentes trabalhando por baixo</h3>
          <p className="tm-ia-texto">
            Um lê cada conversa do funil e devolve temperatura, risco e a próxima
            ação, sem ninguém preencher campo. Outro fecha a semana com uma nota
            por pessoa, visível só para quem lidera. O terceiro responde no grupo
            da diretoria, em português, a partir do retrato da rede daquele
            momento. Quando não tem o dado, ele diz que não tem.
          </p>
        </div>
      </div>
    </>
  );
}
