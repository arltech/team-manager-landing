/**
 * O placar da semana. E o argumento central da direcao escolhida: o ranking
 * responde a primeira objecao do FAQ ("minha equipe nao vai usar") mostrando,
 * em vez de prometendo. Por isso ele ocupa uma secao inteira e em faixa clara,
 * o unico respiro claro da pagina.
 *
 * Nomes e numeros sao de EXEMPLO, nao dados de cliente: a base real nao vai
 * para a vitrine. Escolhidos para parecer um placar de meio de mes.
 */

const LINHAS = [
  { pos: 1, nome: "Juliana Tozer", unidade: "Boa Viagem", xp: "1.240" },
  { pos: 2, nome: "Samuel Santiago", unidade: "Madalena", xp: "980" },
  { pos: 3, nome: "Camila Oliveira", unidade: "Piedade", xp: "870" },
  { pos: 4, nome: "João Marcos", unidade: "Boa Viagem", xp: "640" },
];

export function Placar() {
  return (
    <div className="v2-placar-lista">
      {LINHAS.map((l) => (
        <div key={l.nome} className={`v2-linha${l.pos === 1 ? " v2-linha-1" : ""}`}>
          <span className="num v2-pos">{l.pos}</span>
          <span>
            <span className="v2-nome">{l.nome}</span>
            <span className="v2-unidade"> · {l.unidade}</span>
          </span>
          <span className="num v2-xp">{l.xp} xp</span>
        </div>
      ))}
    </div>
  );
}
