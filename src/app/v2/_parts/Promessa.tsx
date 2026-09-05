"use client";

import { useEffect, useState } from "react";

/**
 * A headline rotaciona entre as pontas que o produto liga. Todas seguem a
 * mesma forma ("De X ao Y") de proposito: e a forma que carrega o argumento da
 * pagina, que o sistema cobre a volta inteira e nao um pedaco.
 *
 * A primeira frase e a que o crawler e o leitor sem JS enxergam, entao ela e a
 * mais completa. Com prefers-reduced-motion a rotacao nao roda: fica a
 * primeira, parada.
 */

const FRASES = [
  ["Do QR na rua", "ao contrato assinado."],
  ["Do lead parado", "à venda fechada."],
  ["Da planilha por unidade", "a um painel só."],
  ["Do follow-up esquecido", "à cobrança automática."],
  ["Do achismo de sexta", "ao número de terça."],
] as const;

export function Promessa() {
  const [i, setI] = useState(0);

  // Quem pede movimento reduzido nao quer o DESLIZE, e nao perder o conteudo:
  // a troca continua, mais devagar, e o CSS tira a animacao. Congelar na
  // primeira frase escondia quatro argumentos de quem tem a opcao ligada.
  useEffect(() => {
    const suave = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setInterval(
      () => setI((n) => (n + 1) % FRASES.length),
      suave ? 5200 : 3400,
    );
    return () => clearInterval(t);
  }, []);

  const [antes, depois] = FRASES[i];

  return (
    <h1 className="v2-h1 v2-promessa">
      {/* key força o remount a cada troca, que é o que dispara a animação. */}
      <span key={i} className="v2-promessa-frase">
        {antes}{" "}
        <br />
        {depois}
      </span>
    </h1>
  );
}
