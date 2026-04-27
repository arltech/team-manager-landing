import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminClient } from "@/lib/supabase-admin";
import { DIAGNOSTICS, DIAGNOSTIC_COPY, type Diagnostic } from "@/lib/quiz-types";
import { notifyLeadWebhook } from "@/lib/lead-webhook";

export const runtime = "nodejs";

const leadSchema = z.object({
  quizResponseId: z.string().uuid().optional(),
  whatsapp: z
    .string()
    .min(10)
    .max(20)
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length >= 10 && v.length <= 13, {
      message: "WhatsApp inválido",
    }),
  name: z.string().min(2).max(120),
  networkName: z.string().min(2).max(120),
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

  const { quizResponseId, whatsapp, name, networkName, diagnostic } =
    parsed.data;
  const supabase = getAdminClient();
  const diagnosticBadge =
    DIAGNOSTIC_COPY[diagnostic as Diagnostic]?.badge ?? diagnostic;

  // Dispara webhook de notificação em paralelo (não bloqueia resposta)
  const webhookPromise = notifyLeadWebhook({
    name,
    whatsapp,
    networkName,
    diagnostic,
    diagnosticBadge,
  });

  if (!supabase) {
    console.warn(
      "[quiz/lead] Supabase not configured — accepting lead without persistence",
      { whatsapp, diagnostic, networkName }
    );
    await webhookPromise;
    return NextResponse.json({ ok: true, leadId: null, ephemeral: true });
  }

  const { data: lead, error: insertError } = await supabase
    .from("quiz_leads")
    .insert({
      quiz_response_id: quizResponseId ?? null,
      whatsapp,
      name,
      network_name: networkName,
      diagnostic,
    })
    .select("id")
    .single();

  if (insertError || !lead) {
    console.error("[quiz/lead] insert failed:", insertError);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }

  await webhookPromise;
  return NextResponse.json({ ok: true, leadId: lead.id });
}
