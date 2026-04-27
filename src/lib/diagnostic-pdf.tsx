import {
  Document,
  Image,
  Link,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import path from "node:path";
import fs from "node:fs";
import { DIAGNOSTIC_COPY, type Diagnostic } from "./quiz-types";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://teammanager.app";

// Logo carregado uma vez no boot do server
let LOGO_DATA_URL: string | null = null;
try {
  const buf = fs.readFileSync(
    path.join(process.cwd(), "public/icon-512.png")
  );
  LOGO_DATA_URL = `data:image/png;base64,${buf.toString("base64")}`;
} catch {
  LOGO_DATA_URL = null;
}

const COLORS = {
  bg: "#fbf8ff",
  card: "#ffffff",
  border: "#d8d9e6",
  borderSoft: "#eeedf7",
  ink: "#1a1b22",
  inkSoft: "#444653",
  inkMuted: "#757684",
  primary: "#1e3a8a",
  primaryTint: "#eeedf7",
  trackBg: "#eef0fa",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLORS.bg,
    paddingTop: 28,
    paddingBottom: 24,
    paddingLeft: 40,
    paddingRight: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.ink,
    lineHeight: 1.45,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottom: `1pt solid ${COLORS.border}`,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 7,
  },
  brand: {
    fontSize: 13,
    fontWeight: 700,
    color: COLORS.primary,
    letterSpacing: 0.4,
  },
  brandTag: {
    fontSize: 8.5,
    color: COLORS.inkMuted,
    marginTop: 1,
  },
  date: { fontSize: 9, color: COLORS.inkMuted },

  // Personalization
  forLine: {
    fontSize: 9,
    color: COLORS.inkMuted,
    marginBottom: 14,
    letterSpacing: 0.4,
  },
  forLineBold: { color: COLORS.ink, fontWeight: 700 },

  // Hero
  badge: {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1.2,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 9,
    lineHeight: 1.18,
  },
  summary: {
    fontSize: 10,
    color: COLORS.inkSoft,
    lineHeight: 1.5,
    marginBottom: 14,
  },

  // Section titles
  sectionTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLORS.ink,
    marginBottom: 6,
    letterSpacing: 0.2,
  },

  // Card
  card: {
    backgroundColor: COLORS.card,
    border: `1pt solid ${COLORS.border}`,
    borderRadius: 8,
    padding: 13,
    marginBottom: 11,
  },

  // Plan steps
  step: {
    flexDirection: "row",
    marginBottom: 7,
    alignItems: "flex-start",
  },
  stepLast: { marginBottom: 0 },
  stepNum: {
    width: 18,
    height: 18,
    borderRadius: 9,
    fontSize: 9,
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 1.95,
    marginRight: 10,
    color: "#ffffff",
    flexShrink: 0,
    backgroundColor: COLORS.primary,
  },
  stepText: {
    flex: 1,
    color: COLORS.inkSoft,
    fontSize: 9.5,
    lineHeight: 1.5,
    paddingTop: 1,
  },

  // Score row (with bar)
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  scoreLabel: {
    fontSize: 9,
    color: COLORS.inkSoft,
    width: 128,
  },
  scoreTrack: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.trackBg,
    borderRadius: 3,
    marginRight: 12,
    overflow: "hidden",
  },
  scoreFill: { height: 6, borderRadius: 3 },
  scoreValue: {
    fontSize: 9.5,
    fontWeight: 700,
    color: COLORS.ink,
    width: 32,
    textAlign: "right",
  },
  scoreQual: {
    fontSize: 8.5,
    color: COLORS.inkMuted,
    width: 50,
    textAlign: "right",
    marginLeft: 6,
  },

  // Confidence + signals row
  metaDivider: {
    height: 1,
    backgroundColor: COLORS.borderSoft,
    marginTop: 10,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
  },
  metaLabel: { color: COLORS.inkMuted },
  metaValue: { color: COLORS.ink, fontWeight: 700 },
  signalsLabel: {
    fontSize: 8.5,
    color: COLORS.inkMuted,
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 1.5,
  },

  // CTA box
  ctaBox: {
    marginTop: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 14,
  },
  ctaTitle: {
    fontSize: 11.5,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 9,
    color: "#c7d2fe",
    lineHeight: 1.45,
    marginBottom: 11,
  },
  ctaButtons: {
    flexDirection: "row",
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: "#22c55e",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 7,
    textDecoration: "none",
    textAlign: "center",
    flexGrow: 1,
  },
  btnGhost: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
    paddingTop: 9,
    paddingBottom: 9,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 7,
    border: "1pt solid #ffffff",
    textDecoration: "none",
    textAlign: "center",
    flexGrow: 1,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 14,
    left: 40,
    right: 40,
    fontSize: 7.5,
    color: COLORS.inkMuted,
    textAlign: "center",
  },
});

export interface DiagnosticPdfData {
  diagnostic: Diagnostic;
  name?: string;
  networkName?: string;
  scores?: {
    visibility: number;
    turnover: number;
    pressure: number;
    blindClosing: number;
    healthy: number;
  };
  confidence?: "high" | "medium" | "low";
  signals?: string[];
}

const SCORE_META: Record<
  keyof NonNullable<DiagnosticPdfData["scores"]>,
  { label: string; max: number }
> = {
  visibility: { label: "Visibilidade da operação", max: 4 },
  blindClosing: { label: "Fechamento às cegas", max: 4 },
  pressure: { label: "Cultura de cobrança", max: 3 },
  turnover: { label: "Histórico de turnover", max: 3 },
  healthy: { label: "Sinais de maturidade", max: 6 },
};

const SCORE_ORDER: Array<keyof typeof SCORE_META> = [
  "visibility",
  "blindClosing",
  "pressure",
  "turnover",
  "healthy",
];

const CONFIDENCE_LABEL: Record<"high" | "medium" | "low", string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa (zona cinzenta)",
};

function qualitativeLabel(score: number, max: number, isHealthy: boolean) {
  const ratio = score / max;
  if (isHealthy) {
    if (ratio >= 0.8) return "Forte";
    if (ratio >= 0.5) return "Médio";
    return "Fraco";
  }
  if (ratio >= 0.7) return "Alto";
  if (ratio >= 0.4) return "Médio";
  return "Baixo";
}

function ScoreBar({
  label,
  score,
  max,
  accent,
  isHealthy,
}: {
  label: string;
  score: number;
  max: number;
  accent: string;
  isHealthy: boolean;
}) {
  const pct = Math.max(0, Math.min(1, score / max));
  return (
    <View style={styles.scoreRow}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <View style={styles.scoreTrack}>
        <View
          style={[
            styles.scoreFill,
            { width: `${pct * 100}%`, backgroundColor: accent },
          ]}
        />
      </View>
      <Text style={styles.scoreValue}>
        {score}/{max}
      </Text>
      <Text style={styles.scoreQual}>
        {qualitativeLabel(score, max, isHealthy)}
      </Text>
    </View>
  );
}

function DiagnosticDocument({ data }: { data: DiagnosticPdfData }) {
  const copy = DIAGNOSTIC_COPY[data.diagnostic];
  const accent = copy.accentColor || COLORS.primary;
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const personLine = [data.name, data.networkName].filter(Boolean).join(" · ");

  return (
    <Document
      title={`Diagnóstico Team Manager — ${copy.badge}`}
      author="Team Manager"
      subject="Diagnóstico de operação para redes de escolas e cursos"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerLeft}>
            {LOGO_DATA_URL && (
              <Image src={LOGO_DATA_URL} style={styles.logo} />
            )}
            <View>
              <Text style={styles.brand}>TEAM MANAGER</Text>
              <Text style={styles.brandTag}>
                Diagnóstico de operação · rede de escolas e cursos
              </Text>
            </View>
          </View>
          <Text style={styles.date}>{today}</Text>
        </View>

        {/* Personalization */}
        {personLine && (
          <Text style={styles.forLine}>
            PARA <Text style={styles.forLineBold}>{personLine}</Text>
          </Text>
        )}

        {/* Hero */}
        <Text
          style={[
            styles.badge,
            { backgroundColor: `${accent}1F`, color: accent },
          ]}
        >
          {copy.badge.toUpperCase()}
        </Text>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.summary}>{copy.summary}</Text>

        {/* Plan */}
        <Text style={styles.sectionTitle}>Plano de ação em 3 passos</Text>
        <View style={styles.card}>
          {copy.actionSteps.map((step, i) => {
            const isLast = i === copy.actionSteps.length - 1;
            return (
              <View
                key={i}
                style={isLast ? [styles.step, styles.stepLast] : styles.step}
                wrap={false}
              >
                <Text style={styles.stepNum}>{i + 1}</Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            );
          })}
        </View>

        {/* Scores */}
        {data.scores && (
          <>
            <Text style={styles.sectionTitle}>
              Como chegamos a esse diagnóstico
            </Text>
            <View style={styles.card} wrap={false}>
              {SCORE_ORDER.map((k) => (
                <ScoreBar
                  key={k}
                  label={SCORE_META[k].label}
                  score={data.scores![k]}
                  max={SCORE_META[k].max}
                  accent={k === "healthy" ? "#22a06a" : accent}
                  isHealthy={k === "healthy"}
                />
              ))}

              {data.confidence && (
                <>
                  <View style={styles.metaDivider} />
                  <View style={styles.metaRow}>
                    <Text style={styles.metaLabel}>Confiança da avaliação</Text>
                    <Text style={styles.metaValue}>
                      {CONFIDENCE_LABEL[data.confidence]}
                    </Text>
                  </View>
                </>
              )}

              {data.signals && data.signals.length > 0 && (
                <Text style={styles.signalsLabel}>
                  Sinais identificados: {data.signals.join(" · ")}
                </Text>
              )}
            </View>
          </>
        )}

        {/* CTA */}
        <View style={styles.ctaBox} wrap={false}>
          <Text style={styles.ctaTitle}>Próximo passo</Text>
          <Text style={styles.ctaText}>
            Quer adiantar? Chama direto no WhatsApp ou conhece o sistema no
            site. Nossa equipe responde em até 1 hora útil.
          </Text>
          <View style={styles.ctaButtons}>
            <Link
              src="https://wa.me/558182149605"
              style={styles.btnPrimary}
            >
              Falar no WhatsApp
            </Link>
            <Link src={SITE_URL} style={styles.btnGhost}>
              Conhecer o site
            </Link>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          Team Manager · sistema de operação para redes de escolas e cursos ·
          diagnóstico gerado automaticamente
        </Text>
      </Page>
    </Document>
  );
}

export async function generateDiagnosticPdf(
  data: DiagnosticPdfData
): Promise<Buffer> {
  return renderToBuffer(<DiagnosticDocument data={data} />);
}
