import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminClient } from "@/lib/supabase-admin";
import { DIAGNOSTICS, DIAGNOSTIC_COPY, type Diagnostic } from "@/lib/quiz-types";
import { notifyLeadWebhook } from "@/lib/lead-webhook";
import { sendLeadCapi } from "@/lib/meta-capi";

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
  eventId: z.string().max(100).optional(),
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

  const { quizResponseId, whatsapp, name, networkName, diagnostic, eventId } =
    parsed.data;
  const supabase = getAdminClient();
  const diagnosticBadge =
    DIAGNOSTIC_COPY[diagnostic as Diagnostic]?.badge ?? diagnostic;

  // Dispara webhook + CAPI em paralelo (nenhum bloqueia a resposta ao usuário)
  const webhookPromise = notifyLeadWebhook({
    name,
    whatsapp,
    networkName,
    diagnostic,
    diagnosticBadge,
  });
  const capiPromise = eventId
    ? sendLeadCapi({
        eventId,
        whatsapp,
        name,
        eventSourceUrl: request.headers.get("referer") ?? undefined,
        clientIp: request.headers
          .get("x-forwarded-for")
          ?.split(",")[0]
          ?.trim(),
        userAgent: request.headers.get("user-agent") ?? undefined,
        fbp: request.cookies.get("_fbp")?.value,
        fbc: request.cookies.get("_fbc")?.value,
      })
    : Promise.resolve();

  if (!supabase) {
    console.warn(
      "[quiz/lead] Supabase not configured — accepting lead without persistence",
      { whatsapp, diagnostic, networkName }
    );
    await Promise.all([webhookPromise, capiPromise]);
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
    // Banco fora não pode perder o lead: o webhook (n8n) e o CAPI já foram
    // disparados. Aguarda, confirma sucesso e segue, em vez de 500.
    console.error(
      "[quiz/lead] insert failed, webhook/CAPI still fired:",
      insertError
    );
    await Promise.all([webhookPromise, capiPromise]);
    return NextResponse.json({ ok: true, leadId: null, ephemeral: true });
  }

  await Promise.all([webhookPromise, capiPromise]);
  return NextResponse.json({ ok: true, leadId: lead.id });
}
