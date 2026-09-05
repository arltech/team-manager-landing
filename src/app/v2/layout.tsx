import type { Metadata } from "next";
import "./v2.css";

// Rota de PREVIEW da repaginada. Fora do indice ate a direcao ser aprovada e
// promovida para "/". O robots.ts tambem bloqueia /v2.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Team Manager",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v2">
      {/* Archivo Black e a voz da direcao Placar: caixa alta, peso unico, numero
          tabular. A home atual segue em Inter + Manrope enquanto as duas
          versoes coexistem. */}
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
