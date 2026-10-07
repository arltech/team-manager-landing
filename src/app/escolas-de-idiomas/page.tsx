import type { Metadata } from "next";
import { Landing, type Texto } from "@/app/_site/Landing";

/**
 * Variante da home para dono e gestor comercial de escola de idiomas. E o
 * destino dos anuncios desse publico: mesma estrutura e mesmos fatos da home,
 * com o texto falando com quem tem uma escola ou varias.
 *
 * Duas regras deste texto: nao promete integracao com sistema de franqueadora
 * nem com sistema academico (o Team Manager roda ao lado), e nao cita marca de
 * terceiro.
 */

const TITULO = "Team Manager para escolas de idiomas: do lead à matrícula";
const DESCRICAO =
  "CRM e gestão comercial para escolas de idiomas: cada lead com responsável e próximo passo, aviso quando o retorno vence. Diagnóstico em 2 minutos.";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRICAO,
  alternates: { canonical: "/escolas-de-idiomas" },
  openGraph: { title: TITULO, description: DESCRICAO, url: "/escolas-de-idiomas" },
  twitter: { title: TITULO, description: DESCRICAO },
};

const IDIOMAS: Partial<Texto> = {
  chapeu: "Para escolas de idiomas",
  frases: [
    ["Do lead que pediu preço", "à matrícula assinada."],
    ["Do QR na ação de rua", "ao contrato assinado."],
    ["Do lead que esfriou", "à fila de resgate."],
    ["Do retorno esquecido", "ao aviso automático."],
    ["Do achismo na reunião", "ao número na tela."],
  ],
  sub: "Seu sistema cuida de quem já é aluno. Quem ainda é lead fica na planilha, e é lá que a matrícula para. O Team Manager dá responsável e próximo passo a cada contato e avisa quando o retorno vence. Roda no navegador, ao lado do que você já usa.",
  ctaHero: "Fazer o diagnóstico da minha escola",
  // O quiz pede nome e WhatsApp para mostrar o resultado: "sem cadastro" seria
  // promessa quebrada no fim do funil.
  nota: "Diagnóstico em 2 minutos, sem criar conta. Garantia de 30 dias. Setup em 72 horas.",
  doresTitulo: "Quantas matrículas dormem na planilha?",
  doresLead:
    "Se você precisa perguntar ao time para saber quantos leads pediram informação e quantos viraram aluno, o problema não é a equipe. É que a resposta não mora em lugar nenhum.",
  dores: [
    {
      p: "O retorno ao lead que pediu informação depende de alguém lembrar?",
      r: "Prazo vencendo e lead parado viram aviso automático para o responsável, no WhatsApp e no e-mail.",
    },
    {
      p: "Aula experimental feita e o lead sumiu. Quem vai atrás?",
      r: "Lead que esfriou entra sozinho na fila de resgate, e o aviso vai para quem cuida dele. Ninguém precisa lembrar de procurar.",
    },
    {
      p: "Para fechar o mês, você junta a planilha de cada consultor?",
      r: "Uma base só, com responsável e próximo passo em cada lead. O painel fecha sozinho, e a direção não pede arquivo para ninguém.",
    },
    {
      p: "A ação de rua de sábado trouxe quantos alunos?",
      r: "Cada pessoa leva o próprio QR para a ação. O lead entra já ligado ao evento que o trouxe e a quem captou.",
    },
    {
      p: "Só na reunião de sexta você descobre que alguém do time parou?",
      r: "O sistema mostra quem parou e quem está sobrecarregado antes de virar problema.",
    },
    {
      p: "A matrícula foi impressa, assinada e fotografada?",
      r: "Assinada no celular, com código de 6 dígitos e registro do documento, do aparelho e do horário. A prova existe se alguém contestar.",
    },
  ],
  cicloLead:
    "A captura vive num formulário, o funil numa planilha, o contrato num documento solto e a comissão numa terceira aba. Aqui é uma coisa só, do lead à matrícula, e cada elo passa o bastão sozinho.",
  modNota:
    "O sistema já fala a língua da escola: lead, matrícula, curso e aluno. Ele cuida do comercial, do lead à matrícula, e o financeiro daqui é o da venda: receita contratada e comissão. Aluno, turma e financeiro acadêmico seguem no sistema que você já usa.",
  // A home compara com "equipe de 18 pessoas", acima do limite de 15 usuarios
  // por unidade que a propria pagina anuncia. Aqui a conta sai.
  precosLead:
    "Em CRM cobrado por pessoa, cada contratação aumenta a mensalidade. Aqui o preço é da escola: até 15 usuários por unidade, sem pagar por assento.",
  unidadesIniciais: 1,
  garantia:
    "Se em 30 dias você não conseguir ver o funil da sua escola, ou de todas as suas escolas, sem perguntar a ninguém, devolvemos tudo. Sem perguntas.",
  faq: [
    [
      "Já uso um sistema na escola. Vou ter dois?",
      "Vai, cada um no seu papel. O sistema da escola cuida de quem já é aluno: turma, aula, financeiro acadêmico. O Team Manager cuida de quem ainda é lead, até a matrícula. Ele roda no navegador e não se conecta ao outro: quando o lead fecha, você cadastra o aluno no sistema da escola como já faz hoje.",
    ],
    [
      "Minha franqueadora tem sistema próprio. Posso usar?",
      "Pode. O Team Manager não substitui o sistema da franqueadora, não se conecta a ele e não mexe nos dados de lá: cuida só do comercial, do lead à matrícula, no navegador. Se o seu contrato de franquia tiver regra sobre ferramentas, a garantia de 30 dias dá tempo de conferir.",
    ],
    [
      "Tenho uma escola só. Faz sentido?",
      // Fila de resgate, contrato e QR nao estao no Essencial (etiquetas em
      // Modulos.tsx): a resposta diz em qual plano cada um entra.
      "Faz. Uma escola também perde lead sem retorno e matrícula sem responsável. O Essencial, R$ 397 por mês, cobre 1 unidade com CRM, tarefas, metas, ranking e avisos de prazo. Fila de resgate entra no Performance; contrato no celular e QR de ação de rua, no Inteligência. A garantia de 30 dias vale em qualquer plano.",
    ],
    [
      "Minha equipe não vai usar.",
      "É a objeção mais comum e a que o produto foi desenhado para resolver. Registro leva 30 segundos, o ranking mostra quem produz e a pontuação cai sozinha para quem para de registrar. Você para de cobrar porque o sistema cobra.",
    ],
    [
      "É caro.",
      // 12 x 397 = 4.764, abaixo dos 5.438. So fecha no Essencial e so para
      // escola com matricula nessa faixa: o texto nao afirma mais que isso.
      "O contrato médio de matrícula na nossa base é de R$ 5.438, e o Essencial custa R$ 397 por mês, R$ 4.764 no ano. Se o valor de uma matrícula na sua escola for parecido, uma única matrícula que não se perde já cobre os doze meses.",
    ],
    [
      "Quanto tempo leva para implantar?",
      "72 horas. Configuração técnica em duas horas, modelos prontos e acompanhamento nos primeiros sete dias.",
    ],
    [
      "E se eu tiver mais de uma escola?",
      "Cada plano já vem com um número de unidades: 1 no Essencial, 3 no Performance, 6 no Inteligência. Acima disso, cada unidade a mais tem um valor fixo, sem mudar de plano. Chame no WhatsApp que a gente passa o valor. O limite é de 15 usuários por unidade.",
    ],
  ],
  finalTitulo: ["Cinco perguntas.", "Dois minutos."],
  finalLead:
    "O diagnóstico mostra quanto da sua operação comercial você enxerga hoje sem perguntar ao time e devolve um plano de ação em três passos. Se fizer sentido, a gente conversa depois.",
  rodape: "Sistema comercial para escolas de idiomas",
  whatsapp:
    "Olá, vim pelo site do Team Manager para escolas de idiomas e queria falar sobre os planos.",
};

export default function EscolasDeIdiomas() {
  return <Landing t={IDIOMAS} />;
}
