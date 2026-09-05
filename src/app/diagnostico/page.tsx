import type { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  // Sem isto a pagina herda o canonical "/" do layout e se declara copia da home.
  alternates: { canonical: "/diagnostico" },
  title: "Diagnóstico gratuito da operação da sua rede",
  description:
    "Descubra em 2 minutos onde sua rede está perdendo visibilidade. 5 perguntas, resultado imediato, sem cadastro.",
};

export default function DiagnosticoPage() {
  return (
    <main className="min-h-screen bg-[var(--surface)]">
      <QuizClient />
    </main>
  );
}
