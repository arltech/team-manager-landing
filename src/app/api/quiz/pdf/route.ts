import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateDiagnosticPdf } from "@/lib/diagnostic-pdf";
import { DIAGNOSTICS, type Diagnostic } from "@/lib/quiz-types";

export const runtime = "nodejs";

const pdfSchema = z.object({
  diagnostic: z.enum(DIAGNOSTICS as [string, ...string[]]),
  name: z.string().max(120).optional(),
  networkName: z.string().max(120).optional(),
  scores: z
    .object({
      visibility: z.number(),
      turnover: z.number(),
      pressure: z.number(),
      blindClosing: z.number(),
      healthy: z.number(),
    })
    .optional(),
  signals: z.array(z.string()).max(10).optional(),
  confidence: z.enum(["high", "medium", "low"]).optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = pdfSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { diagnostic, name, networkName, scores, signals, confidence } =
    parsed.data;

  try {
    const buffer = await generateDiagnosticPdf({
      diagnostic: diagnostic as Diagnostic,
      name,
      networkName,
      scores,
      signals,
      confidence,
    });

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="diagnostico-team-manager.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[quiz/pdf] generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
