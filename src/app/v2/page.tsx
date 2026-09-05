import Image from "next/image";
import { FluxoVivo } from "./_parts/FluxoVivo";
import { Calculadora } from "./_parts/Calculadora";

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

const PROVA = [
  { n: "1.784", r: "candidatos no CRM", s: "de uma rede só, hoje" },
  { n: "301", r: "matrículas registradas", s: "com origem e responsável" },
  { n: "6", r: "unidades no mesmo painel", s: "sem planilha paralela" },
  { n: "18", r: "pessoas usando", s: "sem cobrança do gestor" },
];

const DORES = [
  "Você descobre o resultado do mês quando o mês já acabou.",
  "O assessor some por dois dias e isso aparece na reunião de sexta.",
  "Cada unidade tem uma planilha, e nenhuma tem a mesma coluna.",
  "O follow-up depende de alguém lembrar. Ninguém lembra.",
];

const SEMANA = [
  {
    dia: "Segunda",
    t: "A semana começa lida",
    d: "O painel já tem o fechamento da semana anterior por unidade. A reunião deixa de ser reconstrução e vira decisão.",
  },
  {
    dia: "Terça a quinta",
    t: "A cobrança acontece sem você",
    d: "Prazo vencendo, rotina em aberto e lead parado viram aviso no WhatsApp e no e-mail de quem é responsável.",
  },
  {
    dia: "Sexta",
    t: "O placar fecha sozinho",
    d: "Ranking, XP e conquistas do time são publicados no grupo. Quem produziu foi visto sem você precisar comentar.",
  },
];

const LEDGER: [string, string, string][] = [
  ["Resultado do mês", "Você só sabe quando acabou", "Em tempo real, por unidade"],
  ["Follow-up", "Depende do assessor lembrar", "Cobrado pelo sistema"],
  ["Reconhecimento", "Ninguém vê quem performou", "Publicado no grupo, com ranking"],
  ["Reunião de segunda", "Reconstruir a semana de memória", "Já está tudo no painel"],
  ["Dados das unidades", "Uma planilha diferente em cada", "Uma fonte só, auditável"],
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
      "Quem treinar e quem acelerar, por assessor",
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
    "Já tenho um sistema de gestão escolar.",
    "Ele cuida de turma, boletim e financeiro do aluno matriculado. O Team Manager cuida do que acontece antes: o candidato que ainda não é aluno. Os dois convivem, e o seu ERP continua sendo o ERP.",
  ],
  [
    "É caro.",
    "O contrato médio de um aluno na nossa base é de R$ 5.438. O Performance custa R$ 697 por mês. Se o sistema salvar duas matrículas por ano na rede inteira, ele já se pagou com folga.",
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
            <a href="#como">Como funciona</a>
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
            <p className="v2-sobre">Para redes de escolas e cursos, de 1 a 15 unidades</p>
            <h1 className="v2-h1">
              Sua rede inteira em um painel que{" "}
              <span className="mark">cobra a matrícula</span> por você.
            </h1>
            <p className="v2-sub">
              CRM de candidatos, follow-up automático, rotina semanal e ranking do
              time. Um sistema só, no lugar da planilha de cada unidade e do grupo
              de WhatsApp que ninguém lê.
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
          <FluxoVivo />
        </div>
      </section>

      {/* ── PROVA ── */}
      <section className="v2-prova">
        <div className="shell">
          <p className="v2-prova-titulo">
            O que já está rodando numa rede real, agora
          </p>
          <div className="v2-prova-grid">
            {PROVA.map((p) => (
              <div key={p.r} className="v2-prova-item">
                <strong className="tabular">{p.n}</strong>
                <span className="v2-prova-rotulo">{p.r}</span>
                <span className="v2-prova-sub">{p.s}</span>
              </div>
            ))}
          </div>
          <div className="v2-parceiro">
            <span>Parceiro</span>
            <Image
              src="/parceiros/minds-english-school.png"
              alt="Minds English School"
              width={700}
              height={316}
            />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="band rule">
        <div className="shell v2-dores">
          <div>
            <h2 className="v2-h2">
              Você não está gerenciando.
              <br />
              Está investigando.
            </h2>
            <p className="v2-lead">
              Se você precisa perguntar para saber o que aconteceu na semana, o
              problema não é a sua equipe. É a falta de um lugar onde a resposta
              já esteja.
            </p>
          </div>
          <ul className="v2-dores-lista">
            {DORES.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section id="como" className="band rule v2-como">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">A semana da sua rede, sem você puxar</h2>
          <p className="v2-lead v2-centro v2-estreito">
            O produto não é um relatório que alguém precisa montar. Ele é a rotina
            acontecendo, de segunda a sexta.
          </p>
          <div className="v2-semana">
            {SEMANA.map((s) => (
              <article key={s.dia} className="v2-dia">
                <span className="v2-dia-rotulo">{s.dia}</span>
                <h3 className="v2-dia-titulo">{s.t}</h3>
                <p className="v2-dia-texto">{s.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section id="conta" className="band band-dark">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">
            A conta que ninguém faz
          </h2>
          <p className="v2-lead v2-centro v2-estreito v2-lead-claro">
            Lead que pede informação e nunca recebe um segundo contato não aparece
            em relatório nenhum. Ele só some. Mexa nos dois campos e veja o
            tamanho disso na sua rede.
          </p>
          <Calculadora />
        </div>
      </section>

      {/* ── COMPARAÇÃO ── */}
      <section className="band rule">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">O que muda já no primeiro dia</h2>
          <table className="v2-tabela">
            <thead>
              <tr>
                <th />
                <th>Hoje, na planilha</th>
                <th>Com Team Manager</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map(([o, antes, depois]) => (
                <tr key={o}>
                  <th scope="row">{o}</th>
                  <td className="v2-antes">{antes}</td>
                  <td className="v2-depois">{depois}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section id="precos" className="band rule v2-precos">
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
                {p.destaque && <span className="v2-plano-selo">Mais escolhido</span>}
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
      <section id="faq" className="band rule">
        <div className="shell v2-faq-shell">
          <h2 className="v2-h2">As seis que mais aparecem</h2>
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
      <section className="band band-dark v2-final">
        <div className="shell">
          <h2 className="v2-h2 v2-centro">
            Cinco perguntas. Dois minutos.
            <br />
            Sem cadastro.
          </h2>
          <p className="v2-lead v2-centro v2-estreito v2-lead-claro">
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
            className="v2-logo"
          />
          <p>
            © Team Manager · ARLTech · Sistema de operação para redes de escolas e
            cursos
          </p>
        </div>
      </footer>
    </main>
  );
}
