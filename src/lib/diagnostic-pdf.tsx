import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import { DIAGNOSTIC_COPY, type Diagnostic } from "./quiz-types";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fbf8ff",
    padding: 56,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1a1b22",
    lineHeight: 1.55,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
    paddingBottom: 16,
    borderBottom: "1pt solid #c4c5d5",
  },
  brand: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e3a8a",
    letterSpacing: 0.4,
  },
  brandTag: {
    fontSize: 9,
    color: "#525c87",
    marginTop: 2,
  },
  date: {
    fontSize: 9,
    color: "#757684",
  },
  badge: {
    backgroundColor: "#eeedf7",
    color: "#1e3a8a",
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 999,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1a1b22",
    marginBottom: 16,
    lineHeight: 1.18,
  },
  summary: {
    fontSize: 11,
    color: "#444653",
    lineHeight: 1.65,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#1a1b22",
    marginTop: 16,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1pt solid #c4c5d5",
    borderRadius: 10,
    padding: 22,
    marginBottom: 18,
  },
  step: {
    flexDirection: "row",
    marginBottom: 12,
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    fontSize: 10,
    fontWeight: 700,
    textAlign: "center",
    lineHeight: 1.85,
    marginRight: 12,
    color: "#ffffff",
  },
  stepText: {
    flex: 1,
    color: "#444653",
    fontSize: 10.5,
    lineHeight: 1.6,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1pt solid #eeedf7",
  },
  scoreLabel: {
    fontSize: 10,
    color: "#444653",
  },
  scoreValue: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1a1b22",
  },
  ctaBox: {
    marginTop: 22,
    backgroundColor: "#1e3a8a",
    borderRadius: 10,
    padding: 22,
  },
  ctaTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 4,
  },
  ctaText: {
    fontSize: 10,
    color: "#c7d2fe",
    lineHeight: 1.55,
  },
  footer: {
    position: "absolute",
    bottom: 32,
    left: 56,
    right: 56,
    fontSize: 8,
    color: "#757684",
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

const SCORE_LABELS: Record<keyof NonNullable<DiagnosticPdfData["scores"]>, string> = {
  visibility: "Visibilidade da operação",
  turnover: "Histórico de turnover",
  pressure: "Cultura de cobrança",
  blindClosing: "Fechamento às cegas",
  healthy: "Sinais de maturidade",
};

const CONFIDENCE_LABEL: Record<"high" | "medium" | "low", string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa (zona cinzenta)",
};

function DiagnosticDocument({ data }: { data: DiagnosticPdfData }) {
  const copy = DIAGNOSTIC_COPY[data.diagnostic];
  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Document
      title={`Diagnóstico Team Manager — ${copy.badge}`}
      author="Team Manager"
      subject="Diagnóstico de operação multi-unidade"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>TEAM MANAGER</Text>
            <Text style={styles.brandTag}>
              Diagnóstico de operação · multi-unidade
            </Text>
          </View>
          <Text style={styles.date}>{today}</Text>
        </View>

        <Text style={styles.badge}>{copy.badge.toUpperCase()}</Text>
        <Text style={styles.title}>{copy.title}</Text>
        <Text style={styles.summary}>{copy.summary}</Text>

        <Text style={styles.sectionTitle}>Plano de ação em 3 passos</Text>
        <View style={styles.card}>
          {copy.actionSteps.map((step, i) => (
            <View key={i} style={styles.step}>
              <Text
                style={[styles.stepNum, { backgroundColor: copy.accentColor }]}
              >
                {i + 1}
              </Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {data.scores && (
          <>
            <Text style={styles.sectionTitle}>Como chegamos a esse diagnóstico</Text>
            <View style={styles.card}>
              {(Object.keys(data.scores) as Array<keyof typeof data.scores>).map(
                (k) => (
                  <View key={k} style={styles.scoreRow}>
                    <Text style={styles.scoreLabel}>{SCORE_LABELS[k]}</Text>
                    <Text style={styles.scoreValue}>{data.scores![k]} pts</Text>
                  </View>
                )
              )}
              {data.confidence && (
                <View style={[styles.scoreRow, { borderBottom: "none", marginTop: 6 }]}>
                  <Text style={styles.scoreLabel}>Confiança da avaliação</Text>
                  <Text style={styles.scoreValue}>
                    {CONFIDENCE_LABEL[data.confidence]}
                  </Text>
                </View>
              )}
              {data.signals && data.signals.length > 0 && (
                <Text
                  style={{
                    fontSize: 9,
                    color: "#757684",
                    marginTop: 12,
                    fontStyle: "italic",
                  }}
                >
                  Sinais identificados: {data.signals.join(" · ")}
                </Text>
              )}
            </View>
          </>
        )}

        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>Próximo passo</Text>
          <Text style={styles.ctaText}>
            Agende uma demonstração ao vivo do Team Manager. Em 45 min mostramos
            como o sistema implanta esse plano nas suas unidades — em até 72h.
          </Text>
        </View>

        <Text style={styles.footer}>
          Team Manager · sistema de operação para redes 2-20 unidades · diagnóstico gerado automaticamente
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
