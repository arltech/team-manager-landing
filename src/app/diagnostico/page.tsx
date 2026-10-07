import type { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  // Sem isto a pagina herda o canonical "/" do layout e se declara copia da home.
  alternates: { canonical: "/diagnostico" },
  title: "Diagnóstico gratuito da sua operação comercial",
  description:
    "Descubra em 2 minutos quanto da sua operação comercial você enxerga sem perguntar ao time. 5 perguntas e um plano de ação em três passos.",
};

export default function DiagnosticoPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <QuizClient />
    </main>
  );
}
