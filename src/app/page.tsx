import Image from "next/image";
import { Calculadora } from "@/app/_site/Calculadora";
import { Ciclo } from "@/app/_site/Ciclo";
import { Promessa } from "@/app/_site/Promessa";
import { Modulos } from "@/app/_site/Modulos";
import { Avisos } from "@/app/_site/Avisos";

/**
 * A home.
 *
 * O argumento e a operacao COMPLETA, do QR na acao de rua ao contrato assinado
 * e ao dinheiro no financeiro. A pagina anterior (git a partir de 8c2b82f)
 * vendia gamificacao e planos por porte, com preco "sob diagnostico".
 *
 * Estilo em ./site.css, escopado em .tm. As fontes da direcao (Archivo Black e
 * Archivo) sao carregadas aqui, e nao no layout raiz, porque /diagnostico e /b
 * seguem em Inter mais Manrope.
 */

/**
 * A dor vira PERGUNTA e a resposta mostra o que resolve. Cada resposta cita a
 * capacidade que existe de verdade no sistema, nao uma promessa vaga: e o que
 * separa isto de uma lista de reclamacoes.
 */
/**
 * WhatsApp comercial: +55 81 98214-9605.
 *
 * O PDF do diagnostico (src/lib/diagnostic-pdf.tsx) trazia este numero SEM o 9
 * do celular, o que provavelmente derrubou todo mundo que clicou ali. Corrigido
 * nos dois lugares no mesmo commit.
 *
 * O texto vai pre-preenchido: quem atende sabe de onde a conversa veio sem
 * perguntar, e quem escreve nao precisa pensar na primeira frase.
 */
const WHATSAPP =
  "https://wa.me/5581982149605?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site do Team Manager e queria falar sobre os planos.",
  );

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

export default function Home() {
  return (
    <div className="tm">
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main>
      {/* ── HEADER ── */}
      <header className="tm-header">
        <div className="shell tm-header-in">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="tm-logo"
            priority
          />
          <nav className="tm-nav">
            <a href="#ciclo">O ciclo</a>
            <a href="#modulos">Módulos</a>
            <a href="#avisos">Avisos</a>
            <a href="#conta">A conta</a>
            <a href="#precos">Preços</a>
            <a href="#faq">Dúvidas</a>
          </nav>
          <div className="tm-header-acoes">
            <a
              href={WHATSAPP}
              className="tm-entrar tm-zap"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a href="https://app.teammanager.tech" className="tm-entrar">
              Entrar
            </a>
            <a href="#precos" className="btn btn-primary tm-btn-sm">
              Ver planos
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="tm-hero">
        <div className="shell tm-hero-grid">
          <div>
            <Promessa />
            <p className="tm-sub">
              A operação comercial inteira da sua rede em um sistema: captura na
              rua, CRM, cobrança automática do follow-up, contrato assinado no
              celular e a receita no fim. Sem planilha em cada unidade.
            </p>
            <div className="tm-hero-ctas">
              <a href="/diagnostico" className="btn btn-primary">
                Fazer o diagnóstico da minha rede
              </a>
              <a href="#precos" className="btn btn-ghost">
                Ver planos e preços
              </a>
            </div>
            <p className="tm-hero-nota">
              Diagnóstico leva 2 minutos e não pede cadastro. Garantia de 30 dias.
              Setup em 72 horas.
            </p>
          </div>
          {/* Tela real do produto, nao uma simulacao desenhada. Escolhida entre
              os prints disponiveis por ser a unica que mostra o funil inteiro
              SEM nome ou rosto de pessoa: o painel executivo traz o ranking com
              o time da rede identificado. */}
          <figure className="tm-tela">
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
      <section className="band tm-dores-band">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">
            Alguma dessas é a sua segunda-feira?
          </h2>
          <p className="tm-lead tm-centro tm-estreito">
            Se você precisa perguntar para saber o que aconteceu na semana, o
            problema não é a sua equipe. É que a resposta não mora em lugar
            nenhum.
          </p>
          <ul className="tm-dores-lista">
            {DORES.map((d) => (
              <li key={d.p} className="tm-dor">
                <p className="tm-dor-p">{d.p}</p>
                <p className="tm-dor-r">
                  <span aria-hidden="true" className="tm-dor-check" />
                  {d.r}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PARCEIRO ── */}
      <section className="tm-parceiro-band">
        <div className="shell tm-parceiro">
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
          <h2 className="tm-h2 tm-centro">Os cinco elos que ninguém liga</h2>
          <p className="tm-lead tm-centro tm-estreito">
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
          <h2 className="tm-h2 tm-centro">Tudo o que entra junto</h2>
          <p className="tm-lead tm-centro tm-estreito">
            Não é um CRM com puxadinho. São 26 telas que já conversam entre si,
            e a etiqueta diz em qual plano cada uma entra.
          </p>
          <Modulos />
          <p className="tm-mod-nota">
            O sistema fala a língua do seu negócio: lead, matrícula, curso e
            aluno são apenas o vocabulário padrão. Cada cliente troca esses
            nomes na configuração, sem que nada mude por baixo.
          </p>
        </div>
      </section>

      {/* ── AVISOS ── */}
      <section id="avisos" className="band band-claro">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">O sistema fala, você não precisa</h2>
          <p className="tm-lead tm-centro tm-estreito">
            Nada disso depende de alguém abrir uma tela. O aviso vai atrás da
            pessoa, no WhatsApp que ela já usa o dia inteiro.
          </p>
          <Avisos />
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section id="conta" className="band band-claro tm-conta-band">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">
            A conta que ninguém faz
          </h2>
          <p className="tm-lead tm-centro tm-estreito">
            Lead que pede informação e nunca recebe um segundo contato não aparece
            em relatório nenhum. Ele só some. Ajuste os controles com os números da
            sua operação e veja o tamanho disso.
          </p>
          <Calculadora />
        </div>
      </section>

      {/* ── COMPARAÇÃO ── */}
      <section className="band">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">E o que ninguém te conta que dá trabalho</h2>
          <p className="tm-lead tm-centro tm-estreito">
            As dores acima são as que doem na hora. Estas são as que corroem a
            margem devagar, e são as que nenhuma planilha resolve.
          </p>
          <table className="tm-tabela">
            <thead>
              <tr>
                <th />
                <th>Hoje, na planilha</th>
                <th className="tm-col-depois">Com Team Manager</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map(([o, antes, depois]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td className="tm-antes">{antes}</td>
                  <td className="tm-depois">
                    <span aria-hidden="true" className="tm-depois-check" />
                    {depois}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section id="precos" className="band tm-precos">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">Você paga por unidade, não por pessoa</h2>
          <p className="tm-lead tm-centro tm-estreito">
            Um CRM cobrado por assento custaria mais de R$ 2.300 por mês para uma
            equipe de 18 pessoas, e entregaria só o funil. Aqui a equipe inteira
            entra no preço da unidade.
          </p>
          <div className="tm-planos">
            {PLANOS.map((p) => (
              <article
                key={p.nome}
                className={`tm-plano${p.destaque ? " tm-plano-destaque" : ""}`}
              >
                <span
                  className={`tm-plano-selo${p.destaque ? "" : " tm-plano-selo-vazio"}`}
                  aria-hidden={!p.destaque}
                >
                  Mais escolhido
                </span>
                <h3 className="tm-plano-nome">{p.nome}</h3>
                <p className="tm-plano-promessa">{p.promessa}</p>
                <p className="tm-plano-preco">
                  <span>R$</span>
                  <strong className="tabular">{p.preco}</strong>
                  <span>/mês</span>
                </p>
                <p className="tm-plano-unidades">{p.unidades} · 20% off no anual</p>
                <ul className="tm-plano-itens">
                  {p.itens.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <a
                  href="/diagnostico"
                  className={`btn ${p.destaque ? "btn-primary" : "btn-ghost"} tm-plano-btn`}
                >
                  Começar pelo diagnóstico
                </a>
              </article>
            ))}
          </div>
          <p className="tm-fale">
            Prefere falar com uma pessoa antes?{" "}
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              Chame no WhatsApp
            </a>{" "}
            e a gente responde em até uma hora útil, em horário comercial.
          </p>
          <p className="tm-precos-nota">
            Precisa de mais unidades do que o plano inclui? Entra unidade avulsa
            por valor fixo, sem trocar de degrau. Até 15 usuários por unidade.
          </p>
          <div className="tm-garantia">
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
        <div className="shell tm-faq-shell">
          <h2 className="tm-h2">As sete que mais aparecem</h2>
          <div className="tm-faq">
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
      <section className="band tm-final">
        <div className="shell">
          <h2 className="tm-h2 tm-centro">
            Cinco perguntas. Dois minutos.
            <br />
            Sem cadastro.
          </h2>
          <p className="tm-lead tm-centro tm-estreito">
            O diagnóstico devolve onde a sua rede está perdendo visibilidade e um
            plano de ação em três passos. Se fizer sentido, a gente conversa
            depois disso.
          </p>
          <div className="tm-final-cta">
            <a href="/diagnostico" className="btn btn-primary">
              Fazer o diagnóstico agora
            </a>
            <a
              href={WHATSAPP}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ou falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="tm-rodape">
        <div className="shell tm-rodape-in">
          <Image
            src="/ds/logo-mark.png"
            alt="Team Manager"
            width={575}
            height={507}
            className="tm-logo tm-logo-rodape"
          />
          <p>
            © Team Manager · ARLTech · Sistema de operação para redes com várias
            unidades
          </p>
        </div>
      </footer>
    </main>
    </div>
  );
}
