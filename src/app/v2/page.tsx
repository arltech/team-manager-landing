import Image from "next/image";
import { Calculadora } from "./_parts/Calculadora";
import { Ciclo } from "./_parts/Ciclo";
import { Promessa } from "./_parts/Promessa";
import { Modulos } from "./_parts/Modulos";

/**
 * Repaginada da landing, em preview. O que muda em relacao a "/":
 *
 * 1. A headline diz a CATEGORIA (painel) antes da emocao. A anterior ("Pare de
 *    ser o unico que se importa") nao passava no teste "agora voce pode".
 * 2. Os CTAs deixam de ser seis botoes identicos. O da decisao leva a preco, o
 *    da duvida leva ao diagnostico, e o final diz o que realmente entrega.
 * 3. Os numeros sao de operacao real, nao institucionais.
 * 4. Entram "como funciona" e a calculadora, que a pagina nao tinha.
 */


/**
 * A dor vira PERGUNTA e a resposta mostra o que resolve. Cada resposta cita a
 * capacidade que existe de verdade no sistema, nao uma promessa vaga: e o que
 * separa isto de uma lista de reclamacoes.
 */
const DORES: { p: string; r: string }[] = [
  {
    p: "Você só sabe o resultado do mês quando ele já acabou?",
    r: "O painel fecha sozinho, por unidade e em tempo real. A reunião de segunda vira decisão, não reconstrução.",
  },
  {
    p: "O follow-up depende de alguém lembrar?",
    r: "Prazo vencendo, rotina em aberto e lead parado viram aviso automático para o responsável, no WhatsApp e no e-mail.",
  },
  {
    p: "Cada unidade tem uma planilha, e nenhuma tem a mesma coluna?",
    r: "Uma base só, com filtro por unidade. A diretoria vê o consolidado sem pedir arquivo para ninguém.",
  },
  {
    p: "A ação de rua de sábado trouxe quantos clientes?",
    r: "Cada pessoa leva o próprio QR para a ação. O lead entra já ligado ao evento que o trouxe e a quem captou.",
  },
  {
    p: "Descobre que alguém do time parou só na reunião de sexta?",
    r: "Mapa de Carga e Pulse do Time mostram quem parou e quem está afogado antes de virar problema.",
  },
  {
    p: "O contrato foi impresso, assinado e fotografado?",
    r: "Assinado no celular, com código de 6 dígitos, hash do PDF, IP e horário. A trilha existe se alguém contestar.",
  },
];


/**
 * A tabela nao repete as dores da secao de cima: ela cobre o que a pagina
 * ainda nao tocou. Toda linha aponta para algo que existe no sistema
 * (comissao no Financeiro, grade em course_prices, renovacao com lembrete,
 * fila de resgate, automacao por idade, auditoria de supervisao).
 */
const LEDGER: [string, string, string][] = [
  ["Comissão de quem vendeu", "Calculada na mão no fim do mês", "Sai junto com o fechamento, por pessoa"],
  ["Preço e desconto", "Cada um negocia o que acha", "Tabela por produto, com teto de desconto"],
  ["Renovação de contrato", "Lembra quem lembrar", "Avisa antes de vencer, com o contrato pronto"],
  ["Lead que esfriou", "Só aparece se alguém for procurar", "Entra na fila de resgate sozinho"],
  ["De onde veio cada venda", "Anotada quando alguém lembra", "Amarrada à campanha e à parceria que trouxe"],
  ["O que foi tratado de verdade", "Confia no que cada um contou na reunião", "Trilha por lead: quem fez, o quê e quando"],
];

const PLANOS = [
  {
    nome: "Essencial",
    preco: "397",
    unidades: "1 unidade inclusa",
    promessa: "A operação do funil inteira em um lugar só.",
    itens: [
      "CRM com dono, origem e histórico de cada pessoa",
      "Tarefas, diário de atividades e meta individual",
      "Conversão por etapa, origem e unidade",
      "Ranking e feed: a cobrança vira disputa",
    ],
    destaque: false,
  },
  {
    nome: "Performance",
    preco: "697",
    unidades: "3 unidades inclusas",
    promessa: "Gestão do time com número, não com impressão.",
    itens: [
      "Tudo do Essencial",
      "Quem treinar e quem acelerar, pessoa a pessoa",
      "Fila de resgate de lead parado",
      "Mapa de carga, distribuição e scripts",
    ],
    destaque: true,
  },
  {
    nome: "Inteligência",
    preco: "1.297",
    unidades: "6 unidades inclusas",
    promessa: "A IA acompanha cada tratativa e o dinheiro aparece no fim.",
    itens: [
      "Tudo do Performance",
      "Temperatura, risco e próxima ação em cada ficha",
      "Financeiro, comissão e contrato pelo WhatsApp",
      "Busca de leads e automações de WhatsApp",
    ],
    destaque: false,
  },
];

const FAQ: [string, string][] = [
  [
    "Minha equipe não vai usar.",
    "É a objeção mais comum e a que o produto foi desenhado para resolver. Registro leva 30 segundos, o ranking expõe quem produz e o XP cai sozinho para quem some. Você para de cobrar porque o sistema cobra.",
  ],
  [
    "Meu negócio não é escola. Serve?",
    "Serve. O vocabulário do sistema é configurável: o que aqui chamamos de lead, contrato e produto recebe o nome que a sua operação usa, e só o rótulo muda. O que não muda é o funil: alguém pede informação, alguém precisa dar retorno, alguém fecha e alguém recebe.",
  ],
  [
    "Já tenho um ERP de gestão.",
    "Ele cuida de quem já é cliente: cadastro, financeiro, operação do dia. O Team Manager cuida do que acontece antes disso, de quem ainda é lead. Os dois convivem, e o seu ERP continua sendo o ERP.",
  ],
  [
    "É caro.",
    "O contrato médio de um cliente na nossa base é de R$ 5.438. O Performance custa R$ 697 por mês. Se o sistema salvar duas matrículas por ano na rede inteira, ele já se pagou com folga.",
  ],
  [
    "Minha rede é pequena, faz sentido?",
    "O melhor momento de acertar o processo é antes de multiplicá-lo. Com duas ou três unidades você corrige o hábito; com dez, você corrige dez vezes.",
  ],
  [
    "E se eu tiver mais unidades que o plano inclui?",
    "Cada plano já vem com um número de unidades. Acima disso entra unidade avulsa por um valor fixo, sem trocar de degrau. O limite operacional é de 15 usuários por unidade.",
  ],
  [
    "Quanto tempo leva para implantar?",
    "72 horas. Setup técnico em duas horas, templates prontos por segmento e acompanhamento nos primeiros sete dias.",
  ],
];

export default function V2Page() {
  return (
    <main>
      {/* ── HEADER ── */}
      <header className="v2-header">
        <div className="shell v2-header-in">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="v2-logo"
            priority
          />
          <nav className="v2-nav">
            <a href="#ciclo">O ciclo</a>
            <a href="#modulos">Módulos</a>
            <a href="#conta">A conta</a>
            <a href="#precos">Preços</a>
            <a href="#faq">Dúvidas</a>
          </nav>
          <div className="v2-header-acoes">
            <a href="https://app.teammanager.tech" className="v2-entrar">
              Entrar
            </a>
            <a href="#precos" className="btn btn-primary v2-btn-sm">
              Ver planos
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="v2-hero">
        <div className="shell v2-hero-grid">
          <div>
            <Promessa />
            <p className="v2-sub">
              A operação comercial inteira da sua rede em um sistema: captura na
              rua, CRM, cobrança automática do follow-up, contrato assinado no
              celular e a receita no fim. Sem planilha em cada unidade.
            </p>
            <div className="v2-hero-ctas">
              <a href="/diagnostico" className="btn btn-primary">
                Fazer o diagnóstico da minha rede
              </a>
              <a href="#precos" className="btn btn-ghost">
                Ver planos e preços
              </a>
            </div>
            <p className="v2-hero-nota">
              Diagnóstico leva 2 minutos e não pede cadastro. Garantia de 30 dias.
              Setup em 72 horas.
            </p>
          </div>
          {/* Tela real do produto, nao uma simulacao desenhada. Escolhida entre
              os prints disponiveis por ser a unica que mostra o funil inteiro
              SEM nome ou rosto de pessoa: o painel executivo traz o ranking com
              o time da rede identificado. */}
          <figure className="v2-tela">
            <Image
              src="/dashboard/slide-2.png"
              alt="Tela do Team Manager: 363 leads novos no mês, 29 fechamentos, 8% de conversão e o funil com 356 contatos ativos"
              width={3022}
              height={1560}
              priority
              sizes="(max-width: 1020px) 100vw, 52vw"
            />
            <figcaption>
              Tela real do sistema. O funil da rede inteira, com filtro por
              unidade.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="band v2-dores-band">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">
            Alguma dessas é a sua segunda-feira?
          </h2>
          <p className="v2-lead v2-centro v2-estreito">
            Se você precisa perguntar para saber o que aconteceu na semana, o
            problema não é a sua equipe. É que a resposta não mora em lugar
            nenhum.
          </p>
          <ul className="v2-dores-lista">
            {DORES.map((d) => (
              <li key={d.p} className="v2-dor">
                <p className="v2-dor-p">{d.p}</p>
                <p className="v2-dor-r">
                  <span aria-hidden="true" className="v2-dor-check" />
                  {d.r}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PARCEIRO ── */}
      <section className="v2-parceiro-band">
        <div className="shell v2-parceiro">
          <span className="rotulo">Parceiro</span>
          <Image
            src="/parceiros/minds-english-school.png"
            alt="Minds English School"
            width={700}
            height={316}
          />
        </div>
      </section>

      {/* ── CICLO ── */}
      <section id="ciclo" className="band band-claro">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">Os cinco elos que ninguém liga</h2>
          <p className="v2-lead v2-centro v2-estreito">
            A captura vive num formulário, o funil numa planilha, o contrato no
            Word e a comissão numa terceira aba. Aqui é uma coisa só, e cada elo
            passa o bastão para o seguinte sozinho.
          </p>
          <Ciclo />
        </div>
      </section>

      {/* ── MÓDULOS ── */}
      <section id="modulos" className="band">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">Tudo o que entra junto</h2>
          <p className="v2-lead v2-centro v2-estreito">
            Não é um CRM com puxadinho. São 26 telas que já conversam entre si,
            e a etiqueta diz em qual plano cada uma entra.
          </p>
          <Modulos />
          <p className="v2-mod-nota">
            O sistema fala a língua do seu negócio: lead, matrícula, curso e
            aluno são apenas o vocabulário padrão. Cada cliente troca esses
            nomes na configuração, sem que nada mude por baixo.
          </p>
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section id="conta" className="band band-claro">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">
            A conta que ninguém faz
          </h2>
          <p className="v2-lead v2-centro v2-estreito">
            Lead que pede informação e nunca recebe um segundo contato não aparece
            em relatório nenhum. Ele só some. Mexa nos dois campos e veja o
            tamanho disso na sua rede.
          </p>
          <Calculadora />
        </div>
      </section>

      {/* ── COMPARAÇÃO ── */}
      <section className="band">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">E o que ninguém te conta que dá trabalho</h2>
          <p className="v2-lead v2-centro v2-estreito">
            As dores acima são as que doem na hora. Estas são as que corroem a
            margem devagar, e são as que nenhuma planilha resolve.
          </p>
          <table className="v2-tabela">
            <thead>
              <tr>
                <th />
                <th>Hoje, na planilha</th>
                <th className="v2-col-depois">Com Team Manager</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map(([o, antes, depois]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td className="v2-antes">{antes}</td>
                  <td className="v2-depois">
                    <span aria-hidden="true" className="v2-depois-check" />
                    {depois}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section id="precos" className="band v2-precos">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">Você paga por unidade, não por pessoa</h2>
          <p className="v2-lead v2-centro v2-estreito">
            Um CRM cobrado por assento custaria mais de R$ 2.300 por mês para uma
            equipe de 18 pessoas, e entregaria só o funil. Aqui a equipe inteira
            entra no preço da unidade.
          </p>
          <div className="v2-planos">
            {PLANOS.map((p) => (
              <article
                key={p.nome}
                className={`v2-plano${p.destaque ? " v2-plano-destaque" : ""}`}
              >
                <span
                  className={`v2-plano-selo${p.destaque ? "" : " v2-plano-selo-vazio"}`}
                  aria-hidden={!p.destaque}
                >
                  Mais escolhido
                </span>
                <h3 className="v2-plano-nome">{p.nome}</h3>
                <p className="v2-plano-promessa">{p.promessa}</p>
                <p className="v2-plano-preco">
                  <span>R$</span>
                  <strong className="tabular">{p.preco}</strong>
                  <span>/mês</span>
                </p>
                <p className="v2-plano-unidades">{p.unidades} · 20% off no anual</p>
                <ul className="v2-plano-itens">
                  {p.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a
                  href="/diagnostico"
                  className={`btn ${p.destaque ? "btn-primary" : "btn-ghost"} v2-plano-btn`}
                >
                  Começar pelo diagnóstico
                </a>
              </article>
            ))}
          </div>
          <p className="v2-precos-nota">
            Precisa de mais unidades do que o plano inclui? Entra unidade avulsa
            por valor fixo, sem trocar de degrau. Até 15 usuários por unidade.
          </p>
          <div className="v2-garantia">
            <h3>Garantia de 30 dias</h3>
            <p>
              Se em 30 dias você não conseguir ver o funil de todas as unidades sem
              perguntar a ninguém, devolvemos tudo. Sem perguntas.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="band">
        <div className="shell v2-faq-shell">
          <h2 className="v2-h2">As sete que mais aparecem</h2>
          <div className="v2-faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="band v2-final">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">
            Cinco perguntas. Dois minutos.
            <br />
            Sem cadastro.
          </h2>
          <p className="v2-lead v2-centro v2-estreito">
            O diagnóstico devolve onde a sua rede está perdendo visibilidade e um
            plano de ação em três passos. Se fizer sentido, a gente conversa
            depois disso.
          </p>
          <div className="v2-final-cta">
            <a href="/diagnostico" className="btn btn-primary">
              Fazer o diagnóstico agora
            </a>
            <a href="#precos" className="btn btn-ghost">
              Antes, ver os planos
            </a>
          </div>
        </div>
      </section>

      <footer className="v2-rodape">
        <div className="shell v2-rodape-in">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="v2-logo v2-logo-rodape"
          />
          <p>
            © Team Manager · ARLTech · Sistema de operação para redes com várias
            unidades
          </p>
        </div>
      </footer>
    </main>
  );
}
