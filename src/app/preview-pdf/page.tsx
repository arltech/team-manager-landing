import { notFound } from "next/navigation";
import Image from "next/image";
import { DIAGNOSTIC_COPY, DIAGNOSTICS, type Diagnostic } from "@/lib/quiz-types";

export const metadata = {
  title: "Preview do PDF — Team Manager",
  robots: { index: false, follow: false },
};

const SCORE_LABELS = {
  visibility: "Visibilidade da operação",
  turnover: "Histórico de turnover",
  pressure: "Cultura de cobrança",
  blindClosing: "Fechamento às cegas",
  healthy: "Sinais de maturidade",
} as const;

const SCORE_MAX = {
  visibility: 4,
  turnover: 3,
  pressure: 4,
  blindClosing: 4,
  healthy: 6,
} as const;

const MOCK_SCORES: Record<Diagnostic, Record<keyof typeof SCORE_LABELS, number>> = {
  visibility_compromised: { visibility: 4, turnover: 1, pressure: 2, blindClosing: 3, healthy: 0 },
  turnover_risk: { visibility: 1, turnover: 3, pressure: 2, blindClosing: 1, healthy: 1 },
  pressure_culture: { visibility: 2, turnover: 1, pressure: 3, blindClosing: 1, healthy: 0 },
  blind_closing: { visibility: 2, turnover: 0, pressure: 1, blindClosing: 4, healthy: 1 },
  healthy_operation: { visibility: 0, turnover: 0, pressure: 0, blindClosing: 0, healthy: 6 },
  inconclusive: { visibility: 1, turnover: 1, pressure: 1, blindClosing: 1, healthy: 1 },
};

const MOCK_SIGNALS: Record<Diagnostic, string[]> = {
  visibility_compromised: ["não sabe atendimentos individuais", "descobre meta só após o fechamento"],
  turnover_risk: ["turnover recorrente por reconhecimento"],
  pressure_culture: ["equipe só reporta quando cobrada"],
  blind_closing: ["descobre meta só após o fechamento", "reunião de segunda é recuperação de dados"],
  healthy_operation: ["operação madura em todos os pontos-chave"],
  inconclusive: [],
};

const CONFIDENCE_LABEL = {
  high: "Alta",
  medium: "Média",
  low: "Baixa (zona cinzenta)",
} as const;

type PageProps = {
  searchParams: Promise<{
    diag?: string;
    name?: string;
    network?: string;
    confidence?: string;
  }>;
};

export default async function PreviewPdfPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const diag = (params.diag ?? "visibility_compromised") as Diagnostic;
  if (!DIAGNOSTICS.includes(diag)) notFound();

  const copy = DIAGNOSTIC_COPY[diag];
  const scores = MOCK_SCORES[diag];
  const signals = MOCK_SIGNALS[diag];
  const confidence: keyof typeof CONFIDENCE_LABEL =
    params.confidence === "high" || params.confidence === "medium" || params.confidence === "low"
      ? params.confidence
      : diag === "inconclusive"
      ? "low"
      : diag === "healthy_operation"
      ? "high"
      : "medium";
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[var(--surface-container-low)] min-h-screen py-10 px-4 print:bg-white print:p-0">
      {/* Toolbar — only on screen */}
      <div className="max-w-[820px] mx-auto mb-6 flex items-center justify-between print:hidden">
        <div className="text-xs text-[var(--muted-foreground)] font-mono">
          Preview: <span className="text-[var(--foreground)] font-bold">{diag}</span>
          {params.name && <> · nome: <span className="font-bold">{params.name}</span></>}
          {params.network && <> · rede: <span className="font-bold">{params.network}</span></>}
        </div>
        <div className="flex gap-3">
          <a
            href={`/api/quiz/pdf-preview?diag=${diag}${params.name ? `&name=${params.name}` : ""}${params.network ? `&network=${params.network}` : ""}&confidence=${confidence}`}
            target="_blank"
            className="text-xs font-bold px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface-container)]"
          >
            Ver PDF gerado (react-pdf)
          </a>
          <span className="text-xs text-[var(--muted-foreground)] italic">
            Cmd+P para imprimir
          </span>
        </div>
      </div>

      {/* The "PDF page" sheet */}
      <article
        className="mx-auto bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] print:shadow-none"
        style={{
          width: "min(820px, 100%)",
          color: "#1a1b22",
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div className="p-12 md:p-14 lg:p-16">
          {/* Header */}
          <header className="flex items-end justify-between mb-12 pb-6 border-b border-[#c4c5d5]">
            <div className="flex items-center gap-4">
              <Image
                src="/icon-512.png"
                alt="Team Manager"
                width={120}
                height={120}
                style={{ width: 64, height: 64 }}
                className="rounded-[14px]"
              />
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] font-bold text-[var(--muted-foreground)]">
                  Diagnóstico de operação
                </div>
                <div
                  className="text-[15px] font-extrabold tracking-tight text-[#1e3a8a]"
                  style={{ fontFamily: "Manrope, Inter, sans-serif" }}
                >
                  Rede multi-unidade
                </div>
              </div>
            </div>
            <div className="text-right text-xs text-[var(--muted-foreground)]">
              <div>{today}</div>
              {params.network && (
                <div className="font-bold text-[var(--foreground)] mt-1">{params.network}</div>
              )}
            </div>
          </header>

          {/* Badge + Title */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span
              className="inline-flex items-center text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border"
              style={{
                color: copy.accentColor,
                borderColor: `${copy.accentColor}55`,
                background: `${copy.accentColor}12`,
              }}
            >
              {copy.badge}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1.5 rounded-full bg-[var(--surface-container)] text-[var(--muted-foreground)]">
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: copy.accentColor }}
              />
              Confiança {CONFIDENCE_LABEL[confidence].toLowerCase()}
            </span>
          </div>

          <h1
            className="text-3xl md:text-[34px] font-extrabold leading-[1.15] tracking-tight mb-6 text-[#0a0e27]"
            style={{ fontFamily: "Manrope, Inter, sans-serif" }}
          >
            {copy.title}
          </h1>

          {params.name && (
            <p className="text-sm text-[var(--muted-foreground)] mb-3">
              Olá, <span className="font-bold text-[var(--foreground)]">{params.name}</span>.
            </p>
          )}

          <p className="text-[15px] leading-[1.7] text-[var(--muted-foreground)] mb-12">
            {copy.summary}
          </p>

          {/* Action steps */}
          <section className="mb-10">
            <h2
              className="text-[11px] uppercase tracking-[0.16em] font-bold mb-4 text-[var(--muted-foreground)]"
            >
              Plano de ação em 3 passos
            </h2>
            <ol className="rounded-2xl border border-[#e5e5ee] overflow-hidden">
              {copy.actionSteps.map((step, i) => (
                <li
                  key={i}
                  className={`flex gap-5 p-6 ${
                    i < copy.actionSteps.length - 1 ? "border-b border-[#e5e5ee]" : ""
                  }`}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold leading-none"
                    style={{
                      background: `${copy.accentColor}1a`,
                      color: copy.accentColor,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm md:text-[15px] leading-[1.65] text-[#1a1b22] pt-1">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Scores */}
          <section className="mb-10">
            <h2 className="text-[11px] uppercase tracking-[0.16em] font-bold mb-4 text-[var(--muted-foreground)]">
              Como chegamos a esse diagnóstico
            </h2>
            <div className="rounded-2xl border border-[#e5e5ee] p-7 space-y-3.5">
              {(Object.keys(scores) as Array<keyof typeof scores>).map((k) => {
                const v = scores[k];
                const max = SCORE_MAX[k];
                const pct = (v / max) * 100;
                const isTop = v >= max - 1;
                return (
                  <div key={k} className="flex items-center gap-4">
                    <span className="text-[13px] flex-1 min-w-0 truncate text-[#1a1b22]">
                      {SCORE_LABELS[k]}
                    </span>
                    <div className="w-40 h-2 rounded-full bg-[#eeedf7] overflow-hidden flex-shrink-0">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background: isTop
                            ? `linear-gradient(90deg, ${copy.accentColor}, ${copy.accentColor}dd)`
                            : "linear-gradient(90deg, #9ca3b3, #c4c5d5)",
                        }}
                      />
                    </div>
                    <span className="text-[13px] font-bold tabular-nums text-[#1a1b22] w-12 text-right">
                      {v}/{max}
                    </span>
                  </div>
                );
              })}

              {signals.length > 0 && (
                <div className="pt-4 mt-4 border-t border-[#e5e5ee]">
                  <div className="text-[10px] uppercase tracking-[0.16em] font-bold mb-2.5 text-[var(--muted-foreground)]">
                    Sinais que pesaram
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {signals.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#f4f2fc] text-[#1a1b22] border border-[#e5e5ee]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section
            className="rounded-2xl p-8 mb-12"
            style={{
              background:
                "linear-gradient(135deg, #0a0e27 0%, #1e1b4b 50%, #1e3a8a 100%)",
            }}
          >
            <h3
              className="text-lg font-extrabold mb-2 text-white"
              style={{ fontFamily: "Manrope, Inter, sans-serif" }}
            >
              Próximo passo
            </h3>
            <p className="text-sm text-white/75 leading-[1.65] mb-5">
              Agende uma demonstração ao vivo do Team Manager. Em 45 min mostramos como o sistema
              implanta esse plano nas suas unidades — em até 72h.
            </p>
            <div className="inline-flex items-center gap-2 text-xs px-4 py-2.5 rounded-lg bg-white text-[#1e3a8a] font-bold">
              app.teammanager.app/agendar
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-6 border-t border-[#e5e5ee] flex items-center justify-between text-[10px] text-[var(--muted-foreground)]">
            <span>
              Team Manager · sistema de operação para redes 2-20 unidades
            </span>
            <span>diagnóstico gerado automaticamente</span>
          </footer>
        </div>
      </article>
    </div>
  );
}
