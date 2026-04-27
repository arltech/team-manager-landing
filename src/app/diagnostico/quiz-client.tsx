"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "@/app/_components/Logo";
import { Accordion } from "@/app/_components/Accordion";
import {
  QUESTIONS,
  type QuizAnswers,
  type Diagnostic,
  type DiagnosticCopy,
  type DiagnosticEvidence,
} from "@/lib/quiz-types";

type SubmitResult = {
  id: string;
  diagnostic: Diagnostic;
  copy: DiagnosticCopy;
  evidence?: DiagnosticEvidence;
};

export function QuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const totalSteps = QUESTIONS.length;
  const progress = ((step + (result ? 1 : 0)) / (totalSteps + 1)) * 100;

  async function submitQuiz(final: QuizAnswers) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: final }),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = (await res.json()) as SubmitResult;
      setResult(data);
    } catch {
      toast.error("Erro ao processar respostas. Tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  }

  function selectOption(value: string) {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.key]: value } as Partial<QuizAnswers>;
    setAnswers(next);
    // auto-advance with a short delay so the user sees the selected state
    setTimeout(() => {
      if (step < totalSteps - 1) {
        setStep(step + 1);
      } else {
        submitQuiz(next as QuizAnswers);
      }
    }, 380);
  }

  function advance() {
    const q = QUESTIONS[step];
    const current = (answers as Record<string, string | undefined>)[q.key];
    if (!current) return;
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      submitQuiz(answers as QuizAnswers);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  if (result) return <ResultView result={result} />;

  if (submitting) {
    return (
      <div className="hero-gradient min-h-screen flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5">
          <Loader2 size={36} className="animate-spin text-white/85" />
          <p className="text-white/65">Calculando seu diagnóstico…</p>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  const selected = (answers as Record<string, string | undefined>)[q.key];

  return (
    <div className="hero-gradient min-h-screen flex flex-col text-white">
      <header className="px-4 md:px-6 py-5 md:py-6 border-b border-white/[0.08] max-w-2xl w-full mx-auto">
        <div className="flex items-center justify-between mb-4 md:mb-5">
          <Logo size="xl" />
          <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
            <span className="text-white">{step + 1}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/55">{totalSteps}</span>
          </div>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--primary-vibrant)] to-[var(--primary-container)]"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <div className="flex-1 flex items-start md:items-center justify-center px-4 md:px-6 py-8 md:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl w-full"
          >
            <span className="pill bg-white/10 text-white/85 border border-white/15 backdrop-blur-sm mb-5 md:mb-6">
              Pergunta {step + 1}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 leading-snug text-white">
              {q.title}
            </h1>

            <div className="space-y-3 md:space-y-4">
              {q.options.map((opt) => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    disabled={isSelected}
                    className={`w-full text-left px-5 py-5 md:p-6 rounded-2xl border transition-all min-h-[60px] md:min-h-[68px] flex items-center justify-between gap-4 ${
                      isSelected
                        ? "border-[var(--primary-vibrant)] bg-[var(--primary-vibrant)]/15 shadow-[0_4px_20px_rgba(99,102,241,0.25)]"
                        : "border-white/12 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/25 active:bg-white/[0.09] backdrop-blur-sm"
                    }`}
                  >
                    <span className="text-base md:text-lg text-white">
                      {opt.label}
                    </span>
                    {isSelected && (
                      <Check
                        size={20}
                        className="text-[#a5b4fc] flex-shrink-0"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
              <button
                onClick={goBack}
                disabled={step === 0}
                className="text-sm text-white/55 hover:text-white flex items-center gap-1.5 font-medium transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                <ArrowLeft size={14} /> Voltar
              </button>

              <span className="text-xs text-white/45 italic">
                Toque pra avançar
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const SCORE_LABELS = {
  visibility: "Visibilidade da operação",
  turnover: "Histórico de turnover",
  pressure: "Cultura de cobrança",
  blindClosing: "Fechamento às cegas",
  healthy: "Sinais de maturidade",
} as const;

const CONFIDENCE_COPY = {
  high: { label: "Alta confiança", color: "#059669" },
  medium: { label: "Confiança média", color: "#d97706" },
  low: { label: "Zona cinzenta", color: "#6b7280" },
} as const;

function ResultView({ result }: { result: SubmitResult }) {
  const { copy, diagnostic, id, evidence } = result;
  const calendly = process.env.NEXT_PUBLIC_DEMO_CALENDLY ?? "/#oferta";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [networkName, setNetworkName] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Email inválido");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/quiz/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizResponseId: id,
          email,
          name: name || undefined,
          networkName: networkName || undefined,
          diagnostic,
        }),
      });
      if (!res.ok) throw new Error("lead failed");
      setSent(true);
      toast.success("Plano enviado pro seu email.");
    } catch {
      toast.error("Erro ao enviar. Tenta de novo.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen px-6 py-12 md:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Logo size="lg" variant="badge" />
          <Link
            href="/"
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--primary)] flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft size={12} /> Voltar à landing
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div
              className="pill border"
              style={{
                color: copy.accentColor,
                borderColor: `${copy.accentColor}55`,
                background: `${copy.accentColor}15`,
              }}
            >
              {copy.badge}
            </div>
            {evidence && (
              <div
                className="pill border"
                style={{
                  color: CONFIDENCE_COPY[evidence.confidence].color,
                  borderColor: `${CONFIDENCE_COPY[evidence.confidence].color}33`,
                  background: `${CONFIDENCE_COPY[evidence.confidence].color}10`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: CONFIDENCE_COPY[evidence.confidence].color }}
                />
                {CONFIDENCE_COPY[evidence.confidence].label}
              </div>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-7 leading-[1.1] text-[var(--foreground)]">
            {copy.title}
          </h1>

          <p className="text-[var(--muted-foreground)] text-base md:text-lg leading-relaxed mb-12">
            {copy.summary}
          </p>
        </motion.div>

        <motion.div
          className="card mb-10 md:mb-12 !p-6 md:!p-10"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-lg md:text-xl mb-6 md:mb-7">Plano de ação em 3 passos</h2>
          <ol className="space-y-5">
            {copy.actionSteps.map((step, i) => (
              <li key={i} className="flex gap-4 md:gap-5">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${copy.accentColor}25`,
                    color: copy.accentColor,
                  }}
                >
                  {i + 1}
                </span>
                <span className="text-[var(--foreground)]/85 text-sm md:text-base leading-relaxed pt-0.5">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        {evidence && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mb-10 md:mb-12"
          >
            <Accordion
              variant="subtle"
              summary={
                <>
                  <div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--on-surface-variant)] mb-1">
                    Como chegamos a esse diagnóstico
                  </div>
                  <div className="text-sm md:text-base text-[var(--foreground)]/85">
                    Ver os sinais e pontuação por dimensão
                  </div>
                </>
              }
            >
              <div className="space-y-2.5">
                {(Object.keys(evidence.scores) as Array<keyof typeof evidence.scores>).map((k) => {
                  const score = evidence.scores[k];
                  const max = k === "turnover" ? 3 : k === "healthy" ? 6 : 4;
                  const pct = (score / max) * 100;
                  return (
                    <div key={k} className="flex items-center gap-3">
                      <span className="text-xs text-[var(--muted-foreground)] flex-1 min-w-0 truncate">
                        {SCORE_LABELS[k]}
                      </span>
                      <div className="w-24 md:w-32 h-1.5 rounded-full bg-[var(--surface-container)] overflow-hidden flex-shrink-0">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-container)]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-[var(--foreground)] w-10 text-right">
                        {score}/{max}
                      </span>
                    </div>
                  );
                })}
              </div>
              {evidence.signals.length > 0 && (
                <div className="mt-5 pt-5 border-t border-[var(--border)]/40">
                  <div className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--on-surface-variant)] mb-3">
                    Sinais que pesaram
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {evidence.signals.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-full bg-[var(--surface-container)] text-[var(--foreground)]/85 border border-[var(--border)]/50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Accordion>
          </motion.div>
        )}

        {!sent ? (
          <form onSubmit={submitLead} className="card !p-6 md:!p-10 mb-7">
            <h2 className="text-lg md:text-xl mb-3 leading-snug">
              Receba o diagnóstico completo no seu email
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mb-6 md:mb-7 leading-relaxed">
              Versão expandida do plano + PDF anexado para compartilhar com sócios e diretoria.
            </p>
            <div className="space-y-3 md:space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] outline-none focus:border-[var(--primary)] transition-colors text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-base"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome (opcional)"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] outline-none focus:border-[var(--primary)] transition-colors text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-base"
                />
                <input
                  type="text"
                  value={networkName}
                  onChange={(e) => setNetworkName(e.target.value)}
                  placeholder="Nome da rede (opcional)"
                  className="w-full px-4 md:px-5 py-3.5 md:py-4 rounded-xl bg-[var(--surface)] border-2 border-[var(--border)] outline-none focus:border-[var(--primary)] transition-colors text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-base"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full justify-center disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  "Enviar pra mim"
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="card mb-7 !p-6 md:!p-7 border-[var(--success)]/40 bg-[var(--success-subtle)]">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[var(--success)]/15 text-[var(--success)] flex items-center justify-center flex-shrink-0">
                <Check size={20} />
              </div>
              <div>
                <div className="font-bold text-[var(--foreground)] text-sm md:text-base">
                  Enviado pro seu email
                </div>
                <div className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Confere a caixa de entrada (e o spam, por garantia).
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-6">
          <a
            href={calendly}
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-container)] border-b-2 border-[var(--primary)]/30 hover:border-[var(--primary)] pb-1 font-semibold transition-colors"
          >
            Quero ver o Team Manager funcionando
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
