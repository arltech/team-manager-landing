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
      {/* As fontes da direcao nova vivem so aqui: a home atual continua em
          Inter + Manrope enquanto as duas versoes coexistem. */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Public+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      {children}
    </div>
  );
}
