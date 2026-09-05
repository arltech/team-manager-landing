/**
 * Os cinco elos da operacao, na ordem em que o dinheiro anda. Cada item cita
 * uma capacidade que existe no sistema, com o detalhe que a torna verificavel
 * (validade do QR, codigo de 6 digitos, hash do PDF). Detalhe concreto e o que
 * separa isto de uma lista de recursos generica.
 */

const ELOS = [
  {
    n: "01",
    nome: "Captura",
    titulo: "A ação de rua vira número",
    texto:
      "Cada pessoa da equipe leva o próprio QR para a panfletagem, o evento ou o ponto fixo. Quem escaneia entra no CRM já com dono, unidade e a ação que o trouxe. O código aceita cadastro até dois dias depois.",
    prova: "Atividades Externas",
  },
  {
    n: "02",
    nome: "Tratativa",
    titulo: "A IA lê cada conversa e diz o próximo passo",
    texto:
      "Temperatura, risco e próxima ação em toda ficha, sem ninguém preencher campo. Lead parado há 30 dias ou com follow-up vencido cai na fila de resgate, na ordem de quem ainda dá para fechar.",
    prova: "Sentinela e Fila de Resgate",
  },
  {
    n: "03",
    nome: "Fechamento",
    titulo: "Contrato assinado no celular, com prova",
    texto:
      "Emissão em PDF a partir do modelo do seu contrato, link válido por 7 dias e código de 6 dígitos para assinar. Fica gravado o hash do documento, o IP e o horário: se alguém contestar depois, a trilha existe.",
    prova: "Contratos",
  },
  {
    n: "04",
    nome: "Time",
    titulo: "Quem fechou é visto na hora",
    texto:
      "O fechamento é anunciado no grupo do WhatsApp automaticamente e entra no ranking da semana. A cobrança deixa de ser sua e vira disputa entre unidades.",
    prova: "Gamificação e avisos",
  },
  {
    n: "05",
    nome: "Dinheiro",
    titulo: "A receita aparece sem planilha",
    texto:
      "Receita contratada, previsão do pipeline, perda em reais e comissão por pessoa do time. A entrada do contrato pode ser cobrada por PIX ou cartão na mesma tela.",
    prova: "Financeiro e Cobrança",
  },
];

export function Ciclo() {
  return (
    <ol className="tm-ciclo">
      {ELOS.map((e) => (
        <li key={e.n} className="tm-elo">
          <div className="tm-elo-topo">
            <span className="num tm-elo-n">{e.n}</span>
            <span className="rotulo tm-elo-nome">{e.nome}</span>
          </div>
          <h3 className="tm-elo-titulo">{e.titulo}</h3>
          <p className="tm-elo-texto">{e.texto}</p>
          <span className="tm-elo-prova">{e.prova}</span>
        </li>
      ))}
      {/* Sexto slot da grade de tres colunas: cinco elos deixariam um buraco.
          Em vez de esticar um card, o espaco vira o arremate do argumento. */}
      <li className="tm-elo tm-elo-fecho">
        <h3 className="tm-elo-fecho-titulo">É a volta inteira</h3>
        <p className="tm-elo-fecho-texto">
          Nenhum outro sistema do setor cobre os cinco. O que existe hoje é um
          pedaço em cada lugar, e o buraco entre eles é onde a venda some.
        </p>
        <a href="/diagnostico" className="btn btn-primary tm-elo-fecho-btn">
          Ver onde a sua rede perde
        </a>
      </li>
    </ol>
  );
}
