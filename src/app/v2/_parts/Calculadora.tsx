"use client";

import { useState } from "react";

/**
 * Quanto a rede perde por ano em lead que morre sem segundo contato.
 *
 * As premissas ficam a vista DE PROPOSITO: numero que o visitante nao consegue
 * auditar vira desconfianca, nao urgencia.
 *
 * Duas coisas que a primeira versao errava e que valem o comentario:
 *
 * 1. Ela comparava SEMPRE com o Performance, mesmo quando o porte informado
 *    era de quem usaria o Essencial. O plano agora acompanha as unidades.
 * 2. Ela aplicava a conversao dos leads TRABALHADOS aos leads que ninguem
 *    trabalhou. Quem some sem resposta converte menos, nao igual: por isso o
 *    corte de 50% existe e agora esta explicado com essa palavra na tela.
 */

const TICKET = 5438; // contrato medio de um aluno, em reais
const SEM_SEGUNDO_CONTATO = 0.3; // fatia dos leads que nunca recebe follow-up
const RECUPERAVEL = 0.5; // metade do que se resgataria, porque lead frio converte menos

const PLANOS = [
  { nome: "Essencial", mensal: 397, ate: 1 },
  { nome: "Performance", mensal: 697, ate: 3 },
  { nome: "Inteligência", mensal: 1297, ate: 6 },
] as const;

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Calculadora() {
  const [leads, setLeads] = useState(120);
  const [conversao, setConversao] = useState(8);
  const [unidades, setUnidades] = useState(3);

  const perdidosAno = Math.round(leads * 12 * SEM_SEGUNDO_CONTATO);
  const matriculasPerdidas = (perdidosAno * conversao) / 100;
  const receita = Math.round(matriculasPerdidas * RECUPERAVEL * TICKET);

  // O plano comparado e o que cobre o numero de unidades informado, nao um fixo.
  const plano = PLANOS.find((p) => unidades <= p.ate) ?? PLANOS[PLANOS.length - 1];
  const custoAno = plano.mensal * 12;
  const multiplo = receita / custoAno;

  return (
    <div className="calc">
      <div className="calc-controles">
        <label className="calc-campo">
          <span className="calc-rotulo">Leads que entram por mês, na rede toda</span>
          <output className="calc-valor num">{leads}</output>
          <input
            type="range" min={20} max={600} step={10} value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            aria-label="Leads por mês"
          />
        </label>

        <label className="calc-campo">
          <span className="calc-rotulo">Sua conversão de lead em matrícula</span>
          <output className="calc-valor num">{conversao}%</output>
          <input
            type="range" min={2} max={25} step={1} value={conversao}
            onChange={(e) => setConversao(Number(e.target.value))}
            aria-label="Taxa de conversão"
          />
        </label>

        <label className="calc-campo">
          <span className="calc-rotulo">Quantas unidades a sua rede tem</span>
          <output className="calc-valor num">{unidades}</output>
          <input
            type="range" min={1} max={15} step={1} value={unidades}
            onChange={(e) => setUnidades(Number(e.target.value))}
            aria-label="Número de unidades"
          />
        </label>
      </div>

      <div className="calc-saida">
        <span className="calc-saida-rotulo">
          Some do seu caixa, por ano, em lead que ninguém retomou
        </span>
        <strong className="calc-saida-numero num">{brl(receita)}</strong>
        <p className="calc-saida-nota">
          São {perdidosAno.toLocaleString("pt-BR")} pessoas por ano que pedem
          informação e nunca recebem um segundo contato.{" "}
          {multiplo >= 1 ? (
            <>
              O {plano.nome}, que cobre {plano.ate}{" "}
              {plano.ate === 1 ? "unidade" : "unidades"}, custa {brl(custoAno)} no
              mesmo período: <strong>{multiplo.toFixed(1).replace(".", ",")}x menos</strong>{" "}
              do que está indo embora.
            </>
          ) : (
            <>
              Nesse volume o {plano.nome} ainda custa mais do que a perda. Vale
              conversar antes de contratar.
            </>
          )}
        </p>
      </div>

      <details className="calc-premissas">
        <summary>De onde saem esses números</summary>
        <ul>
          <li>
            Contrato médio de um aluno: <strong>{brl(TICKET)}</strong>. É a média
            real da base em produção, 15,3 meses a R$ 356 mais taxa de R$ 194.
          </li>
          <li>
            Fatia de leads que nunca recebe segundo contato:{" "}
            <strong>{SEM_SEGUNDO_CONTATO * 100}%</strong>. É a premissa mais
            discutível da conta e por isso está aqui, à vista.
          </li>
          <li>
            Do que dá para resgatar, contamos apenas{" "}
            <strong>{RECUPERAVEL * 100}%</strong>. Lead que ficou sem resposta
            converte menos que o lead trabalhado, então aplicar a sua conversão
            cheia a ele exageraria o resultado.
          </li>
          <li>
            O plano comparado é o que cobre o número de unidades que você
            informou, não o mais caro.
          </li>
        </ul>
      </details>
    </div>
  );
}
