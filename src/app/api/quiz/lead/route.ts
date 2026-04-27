import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminClient } from "@/lib/supabase-admin";
import { sendEmail, buildDiagnosticEmail } from "@/lib/email";
import { DIAGNOSTICS, type Diagnostic } from "@/lib/quiz-types";
import { generateDiagnosticPdf } from "@/lib/diagnostic-pdf";

export const runtime = "nodejs";

const leadSchema = z.object({
  quizResponseId: z.string().uuid().optional(),
  email: z.string().email().max(200),
  name: z.string().max(120).optional(),
  networkName: z.string().max(120).optional(),
  diagnostic: z.enum(DIAGNOSTICS as [string, ...string[]]),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { quizResponseId, email, name, networkName, diagnostic } = parsed.data;
  const supabase = getAdminClient();

  async function sendDiagnostic(): Promise<boolean> {
    const { subject, html } = buildDiagnosticEmail(
      diagnostic as Diagnostic,
      name
    );
    let pdfAttachment: { filename: string; content: Buffer } | undefined;
    try {
      const pdfBuffer = await generateDiagnosticPdf({
        diagnostic: diagnostic as Diagnostic,
        name,
        networkName,
      });
      pdfAttachment = {
        filename: "diagnostico-team-manager.pdf",
        content: pdfBuffer,
      };
    } catch (pdfError) {
      console.error("[quiz/lead] PDF generation failed (sending without attachment):", pdfError);
    }
    return sendEmail({
      to: email,
      subject,
      html,
      attachments: pdfAttachment ? [pdfAttachment] : undefined,
    });
  }

  // Fallback path: no DB — try email only, never block UI
  if (!supabase) {
    console.warn(
      "[quiz/lead] Supabase not configured — accepting lead without persistence",
      { email, diagnostic, networkName }
    );
    try {
      await sendDiagnostic();
    } catch (emailError) {
      console.error("[quiz/lead] email failed in ephemeral mode:", emailError);
    }
    return NextResponse.json({ ok: true, leadId: null, ephemeral: true });
  }

  const { data: lead, error: insertError } = await supabase
    .from("quiz_leads")
    .insert({
      quiz_response_id: quizResponseId ?? null,
      email,
      name: name ?? null,
      network_name: networkName ?? null,
      diagnostic,
    })
    .select("id")
    .single();

  if (insertError || !lead) {
    console.error("[quiz/lead] insert failed:", insertError);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  try {
    const sent = await sendDiagnostic();
    if (sent) {
      await supabase
        .from("quiz_leads")
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq("id", lead.id);
    }
  } catch (emailError) {
    console.error("[quiz/lead] email failed (lead saved anyway):", emailError);
  }

  return NextResponse.json({ ok: true, leadId: lead.id });
}
