import { Bot, MessageSquareHeart, Eye, FileCheck, Target } from "lucide-react";
import { Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { IconBadge } from "./IconBadge";

const CARDS = [
  {
    icon: Bot,
    title: "Cobrança que acontece sem você",
    is: "Automação 24/7: monitora presença, follow-ups atrasados e prazos — e age antes de você precisar pedir.",
    eliminates: [
      "A reunião de cobrança",
      "O WhatsApp de \"você viu o lead?\"",
      "O assessor que some porque ninguém percebeu",
    ],
  },
  {
    icon: MessageSquareHeart,
    title: "Cultura de reconhecimento via WhatsApp",
    is: "Matrículas, conquistas e top performers são anunciados automaticamente no grupo da equipe — antes de você saber, já foi celebrado.",
    eliminates: [
      "O assessor que pede demissão porque \"nunca é reconhecido\"",
      "A cultura de pressão que mata engajamento",
    ],
  },
  {
    icon: Eye,
    title: "Visibilidade sem presença",
    is: "Funil, rotinas, tarefas e ranking de cada unidade em tempo real, com filtro por unidade, sem depender de ninguém te mandar nada.",
    eliminates: [
      "A reunião de segunda",
      "O \"deixa eu te mandar o número\" no WhatsApp",
      "O relatório que chega sexta às 18h",
    ],
  },
  {
    icon: FileCheck,
    title: "Operação que se auto-documenta",
    is: "Rotina semanal puxa dados do CRM automaticamente. Quando o assessor cria o candidato no funil, a rotina já sabe. Scripts de vendas gerados por IA a partir do perfil do lead.",
    eliminates: [
      "Dado digitado duas vezes",
      "Reunião de treinamento de script",
      "Assessor que \"não sabia o que falar\"",
    ],
  },
  {
    icon: Target,
    title: "Do primeiro contato à matrícula",
    is: "IA encontra leads em fontes públicas, o sistema distribui pra unidade certa por telefone e cobra follow-up automático candidato a candidato.",
    eliminates: [
      "Candidato que pediu informação e sumiu porque ninguém lembrou",
      "Planilha de captação de matrícula sem dono",
      "Lista de leads da franqueadora que vira pasta de downloads esquecida",
    ],
  },
];

export function Solution() {
  return (
    <section id="solucao" className="section-y bg-[var(--surface-container-low)] scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          pill="A Solução"
          pillTone="primary"
          title="Team Manager foi construído pra isso."
          align="center"
          className="mb-16"
        />

        <Stagger className="grid md:grid-cols-2 gap-8">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            const isLast = i === CARDS.length - 1;
            return (
              <StaggerItem
                key={i}
                className={`card group ${isLast ? "md:col-span-2" : ""}`}
              >
                <IconBadge size="lg" tone="primary" className="mb-7">
                  <Icon size={24} />
                </IconBadge>
                <h3 className="text-xl md:text-2xl mb-5">{c.title}</h3>
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--on-surface-variant)] mb-2 font-bold">
                  O que é
                </div>
                <p className="text-[var(--muted-foreground)] mb-7 leading-relaxed">
                  {c.is}
                </p>
                <div className="text-[10px] uppercase tracking-[0.12em] text-[var(--destructive)]/85 mb-3 font-bold">
                  O que elimina
                </div>
                <ul className="space-y-2">
                  {c.eliminates.map((e, j) => (
                    <li
                      key={j}
                      className="text-sm text-[var(--muted-foreground)] flex gap-3"
                    >
                      <span className="text-[var(--destructive)]/70 font-mono mt-0.5">
                        ×
                      </span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
