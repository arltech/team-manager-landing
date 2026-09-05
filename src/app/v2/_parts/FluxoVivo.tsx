"use client";

import { useEffect, useRef, useState } from "react";

/**
 * O mecanismo do produto acontecendo, no lugar do print estatico que o hero
 * usava. Quatro passos, cada um o que o sistema faz SOZINHO depois que um lead
 * entra. E a unica ousadia visual da pagina: tudo em volta fica quieto.
 *
 * ponytail: setInterval com indice, sem lib de timeline. Se um dia precisar de
 * scrub ou pausa no hover, ai sim entra o motion que ja esta no projeto.
 */

const PASSOS = [
  {
    hora: "09:12",
    ator: "Entrada",
    titulo: "Chega um lead pelo formulário",
    detalhe: "Mariana, inglês para viagem, unidade Boa Viagem.",
  },
  {
    hora: "09:12",
    ator: "Distribuição",
    titulo: "Cai no colo de quem está livre",
    detalhe: "Rodízio automático. Ninguém precisa repassar no grupo.",
  },
  {
    hora: "11:40",
    ator: "Sentinela",
    titulo: "A IA lê a tratativa e classifica",
    detalhe: "Quente. Próxima ação: confirmar a aula experimental hoje.",
  },
  {
    hora: "17:03",
    ator: "WhatsApp",
    titulo: "A matrícula é anunciada no grupo",
    detalhe: "O time celebrou antes de você abrir o sistema.",
  },
];

export function FluxoVivo() {
  const [ativo, setAtivo] = useState(0);
  const [rodando, setRodando] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!rodando) return;
    timer.current = setInterval(
      () => setAtivo((i) => (i + 1) % PASSOS.length),
      2600,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [rodando]);

  return (
    <div
      className="fluxo"
      onMouseEnter={() => setRodando(false)}
      onMouseLeave={() => setRodando(true)}
    >
      <div className="fluxo-topo">
        <span className="fluxo-dia">Uma terça-feira qualquer</span>
        <span className="fluxo-selo">
          <i /> ao vivo
        </span>
      </div>

      <ol className="fluxo-lista">
        {PASSOS.map((p, i) => {
          const estado = i === ativo ? "ativo" : i < ativo ? "feito" : "espera";
          return (
            <li key={p.titulo} className={`fluxo-item ${estado}`}>
              <button
                type="button"
                onClick={() => {
                  setAtivo(i);
                  setRodando(false);
                }}
                aria-current={i === ativo}
              >
                <span className="fluxo-hora tabular">{p.hora}</span>
                <span className="fluxo-corpo">
                  <span className="fluxo-ator">{p.ator}</span>
                  <span className="fluxo-titulo">{p.titulo}</span>
                  <span className="fluxo-detalhe">{p.detalhe}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="fluxo-rodape">
        Nada nessa lista precisou de alguém para lembrar.
      </p>
    </div>
  );
}
