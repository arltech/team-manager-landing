"use client";

import { useState } from "react";

/**
 * Quanto a rede perde por ano em lead que morre sem segundo contato.
 *
 * As premissas sao explicitas na tela DE PROPOSITO: numero de calculadora que
 * o visitante nao consegue auditar vira desconfianca, nao urgencia. O ticket e
 * o contrato medio real da base (15,3 meses a R$ 356 mais taxa de R$ 194), e a
 * conversao de 8% e a que o proprio painel mostra. Os dois campos que mudam a
 * conta ficam na mao de quem le.
 */

const TICKET = 5438; // contrato medio de um aluno, em reais
const SEM_SEGUNDO_CONTATO = 0.3; // fatia dos leads que nunca recebe follow-up
const RECUPERAVEL = 0.5; // do que se resgata, metade e otimismo honesto

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function Calculadora() {
  const [leads, setLeads] = useState(120);
  const [conversao, setConversao] = useState(8);

  const perdidosAno = Math.round(leads * 12 * SEM_SEGUNDO_CONTATO);
  const matriculasPerdidas = (perdidosAno * conversao) / 100;
  const recuperavel = matriculasPerdidas * RECUPERAVEL;
  const receita = Math.round(recuperavel * TICKET);
  const custoAno = 697 * 12;
  const multiplo = receita > 0 ? receita / custoAno : 0;

  return (
    <div className="calc">
      <div className="calc-controles">
        <label className="calc-campo">
          <span className="calc-rotulo">
            Leads que entram por mês, na rede toda
          </span>
          <output className="calc-valor tabular">{leads}</output>
          <input
            type="range"
            min={20}
            max={600}
            step={10}
            value={leads}
            onChange={(e) => setLeads(Number(e.target.value))}
            aria-label="Leads por mês"
          />
        </label>

        <label className="calc-campo">
          <span className="calc-rotulo">Sua conversão de lead em matrícula</span>
          <output className="calc-valor tabular">{conversao}%</output>
          <input
            type="range"
            min={2}
            max={25}
            step={1}
            value={conversao}
            onChange={(e) => setConversao(Number(e.target.value))}
            aria-label="Taxa de conversão"
          />
        </label>
      </div>

      <div className="calc-saida">
        <span className="calc-saida-rotulo">
          Some do seu caixa, por ano, em lead que ninguém retomou
        </span>
        <strong className="calc-saida-numero tabular">{brl(receita)}</strong>
        <p className="calc-saida-nota">
          São {perdidosAno.toLocaleString("pt-BR")} pessoas por ano que pedem
          informação e nunca recebem um segundo contato.{" "}
          {multiplo >= 1 && (
            <>
              O Performance custa {brl(custoAno)} no mesmo período, ou seja,{" "}
              <strong>{multiplo.toFixed(1).replace(".", ",")}x menos</strong> do que está indo embora.
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
            Do que dá para resgatar, contamos{" "}
            <strong>{RECUPERAVEL * 100}%</strong>. Nenhum sistema recupera tudo.
          </li>
        </ul>
      </details>
    </div>
  );
}
