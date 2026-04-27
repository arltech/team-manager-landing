import { NextRequest, NextResponse } from "next/server";
import { generateDiagnosticPdf } from "@/lib/diagnostic-pdf";
import { DIAGNOSTICS, type Diagnostic } from "@/lib/quiz-types";

export const runtime = "nodejs";

const MOCK_SCORES: Record<Diagnostic, NonNullable<Parameters<typeof generateDiagnosticPdf>[0]["scores"]>> = {
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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const diag = searchParams.get("diag") ?? "visibility_compromised";
  const name = searchParams.get("name") ?? undefined;
  const networkName = searchParams.get("network") ?? undefined;
  const download = searchParams.get("download") === "1";
  const confidenceParam = searchParams.get("confidence");

  if (!DIAGNOSTICS.includes(diag as Diagnostic)) {
    return NextResponse.json(
      {
        error: "Invalid diagnostic",
        validValues: DIAGNOSTICS,
        usage:
          "Use ?diag=<one of the valid values>. Optional: &name=, &network=, &confidence=high|medium|low, &download=1",
      },
      { status: 400 }
    );
  }

  const diagnostic = diag as Diagnostic;
  const confidence: "high" | "medium" | "low" =
    confidenceParam === "high" || confidenceParam === "medium" || confidenceParam === "low"
      ? confidenceParam
      : diagnostic === "inconclusive"
      ? "low"
      : diagnostic === "healthy_operation"
      ? "high"
      : "medium";

  try {
    const buffer = await generateDiagnosticPdf({
      diagnostic,
      name,
      networkName,
      scores: MOCK_SCORES[diagnostic],
      signals: MOCK_SIGNALS[diagnostic],
      confidence,
    });

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${
          download ? "attachment" : "inline"
        }; filename="diagnostico-${diagnostic}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[pdf-preview] generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF", message: String(error) },
      { status: 500 }
    );
  }
}
