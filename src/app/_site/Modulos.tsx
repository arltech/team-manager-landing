import {
  Activity, BarChart3, BookOpen, ClipboardList, CreditCard, FileSignature,
  FileText, Flame, Gauge, Gift, Handshake, HeartPulse, History,
  LayoutDashboard, Lightbulb, MapPin, Megaphone, Radar, Search, ShieldAlert,
  ShieldCheck, Sparkles, TrendingUp, Trophy, Users, Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Vitrine de tudo que existe no sistema.
 *
 * Os ICONES sao os mesmos de src/lib/navigation.ts no repo do app, para quem
 * chega pela landing reconhecer o menu depois de entrar.
 *
 * Os NOMES sao os neutros, e nao os rotulos padrao do sistema ("CRM de
 * Candidatos"), porque o produto tem dicionario por tenant
 * (src/lib/terminology.ts): Candidato, Matricula e Curso sao so o default de
 * escola, e cada cliente configura como o negocio dele fala. A vitrine mostra
 * a funcao; o rotulo quem escolhe e quem contrata.
 *
 * A etiqueta de plano sai de src/lib/planos.ts. Sem ela a lista viraria uma
 * promessa de que tudo vem em qualquer degrau.
 */

type Plano = "Essencial" | "Performance" | "Inteligência" | "Avulso";

interface Modulo {
  Icon: LucideIcon;
  nome: string;
  desc: string;
  plano: Plano;
}

const GRUPOS: { titulo: string; itens: Modulo[] }[] = [
  {
    titulo: "O dia a dia",
    itens: [
      { Icon: LayoutDashboard, nome: "Dashboard", desc: "O resultado da rede em uma tela, com filtro por unidade.", plano: "Essencial" },
      { Icon: ClipboardList, nome: "Quadro de Tarefas", desc: "O que cada um tem para fazer, com prazo e cobrança automática.", plano: "Essencial" },
      { Icon: BookOpen, nome: "Diário de Atividades", desc: "O registro do dia de quem atende, sem relatório para montar.", plano: "Essencial" },
      { Icon: BarChart3, nome: "Métricas Diárias", desc: "Número por pessoa e por dia, comparado com a meta individual.", plano: "Essencial" },
    ],
  },
  {
    titulo: "Da captura ao contrato",
    itens: [
      { Icon: Users, nome: "CRM de Leads", desc: "Cada lead com dono, origem, etapa e o histórico inteiro da conversa.", plano: "Essencial" },
      { Icon: MapPin, nome: "Atividades Externas", desc: "Ação de rua com escala, QR por pessoa e cada lead ligado ao evento.", plano: "Inteligência" },
      { Icon: Handshake, nome: "Parcerias", desc: "Quem indica, quanto traz e o que cada parceria rendeu de fato.", plano: "Essencial" },
      { Icon: Search, nome: "Buscar Leads", desc: "Prospecção na web com extração por IA, direto para o CRM.", plano: "Inteligência" },
      { Icon: FileText, nome: "Scripts de Vendas", desc: "O melhor pitch vira padrão, com o uso registrado lead a lead.", plano: "Performance" },
      { Icon: FileSignature, nome: "Contratos", desc: "Emissão em PDF, assinatura pelo celular e trilha de cada etapa.", plano: "Inteligência" },
    ],
  },
  {
    titulo: "Gestão do time",
    itens: [
      { Icon: Gauge, nome: "Desempenho do Time", desc: "Quem treinar e quem acelerar, com a classificação já feita.", plano: "Performance" },
      { Icon: Activity, nome: "Mapa de Carga", desc: "Quem está afogado e quem tem espaço, antes de virar problema.", plano: "Performance" },
      { Icon: HeartPulse, nome: "Pulse do Time", desc: "Como a equipe está reagindo à pressão da semana.", plano: "Performance" },
      { Icon: Megaphone, nome: "Distribuição de Leads", desc: "Rodízio automático, sem lead esperando alguém repassar.", plano: "Performance" },
      { Icon: ShieldCheck, nome: "Auditoria de Supervisão", desc: "O que foi tratado de verdade, para a diretoria conferir.", plano: "Performance" },
      { Icon: ShieldAlert, nome: "Sentinela", desc: "A IA lê cada tratativa e devolve risco e próxima ação.", plano: "Inteligência" },
    ],
  },
  {
    titulo: "O dinheiro",
    itens: [
      { Icon: TrendingUp, nome: "Análise de Vendas", desc: "Conversão por etapa, origem e unidade, e onde o funil vaza.", plano: "Essencial" },
      { Icon: Wallet, nome: "Financeiro", desc: "Receita contratada, previsão, perda em reais e comissão.", plano: "Inteligência" },
      { Icon: CreditCard, nome: "Cobrança", desc: "A entrada do contrato cobrada por PIX ou cartão na mesma tela.", plano: "Avulso" },
      { Icon: Radar, nome: "Estratégia", desc: "Radar de concorrentes e leitura do mercado ao redor da unidade.", plano: "Avulso" },
    ],
  },
  {
    titulo: "Cultura e adoção",
    itens: [
      { Icon: Trophy, nome: "Ranking", desc: "O placar da rede, por pessoa e por unidade, publicado sozinho.", plano: "Essencial" },
      { Icon: Sparkles, nome: "Feed de Conquistas", desc: "O que o time alcançou aparece na hora, para todo mundo.", plano: "Essencial" },
      { Icon: Gift, nome: "Premiações", desc: "Campanha de prêmio com critério publicado e regra clara.", plano: "Essencial" },
      { Icon: History, nome: "Timeline de Prêmios", desc: "O que já foi entregue, para ninguém discutir depois.", plano: "Essencial" },
      { Icon: Flame, nome: "Motivação", desc: "A mensagem que abre o dia, no sistema e no grupo.", plano: "Essencial" },
      { Icon: Lightbulb, nome: "Sugestões de Melhoria", desc: "A ideia do time entra com status, em vez de morrer no corredor.", plano: "Essencial" },
    ],
  },
];

const CLASSE_PLANO: Record<Plano, string> = {
  Essencial: "tm-mod-p1",
  Performance: "tm-mod-p2",
  "Inteligência": "tm-mod-p3",
  Avulso: "tm-mod-av",
};

export function Modulos() {
  return (
    <div className="tm-modulos">
      {GRUPOS.map((g) => (
        <section key={g.titulo} className="tm-mod-grupo">
          <h3 className="tm-mod-grupo-titulo">{g.titulo}</h3>
          <ul className="tm-mod-lista">
            {g.itens.map((m) => (
              <li key={m.nome} className="tm-mod">
                <m.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                <div className="tm-mod-texto">
                  <h4 className="tm-mod-nome">
                    {m.nome}
                    <span className={`tm-mod-plano ${CLASSE_PLANO[m.plano]}`}>
                      {m.plano}
                    </span>
                  </h4>
                  <p className="tm-mod-desc">{m.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
