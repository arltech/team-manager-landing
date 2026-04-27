import type { Metadata } from "next";
import { QuizClient } from "./quiz-client";

export const metadata: Metadata = {
  title: "Diagnóstico — Team Manager",
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
