import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash, randomUUID } from "crypto";
import { getAdminClient } from "@/lib/supabase-admin";
import {
  Q1_OPTIONS,
  Q2_OPTIONS,
  Q3_OPTIONS,
  Q4_OPTIONS,
  Q5_OPTIONS,
  computeDiagnosticDetailed,
  DIAGNOSTIC_COPY,
} from "@/lib/quiz-types";

const submitSchema = z.object({
  answers: z.object({
    q1: z.enum(Q1_OPTIONS),
    q2: z.enum(Q2_OPTIONS),
    q3: z.enum(Q3_OPTIONS),
    q4: z.enum(Q4_OPTIONS),
    q5: z.enum(Q5_OPTIONS),
  }),
  networkSize: z.string().max(50).optional(),
  vertical: z.string().max(50).optional(),
  utm: z
    .object({
      source: z.string().max(100).optional(),
      medium: z.string().max(100).optional(),
      campaign: z.string().max(100).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { answers, networkSize, vertical, utm } = parsed.data;
  const { diagnostic, evidence } = computeDiagnosticDetailed(answers);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = ip
    ? createHash("sha256").update(ip).digest("hex").slice(0, 32)
    : null;

  const supabase = getAdminClient();

  if (!supabase) {
    console.warn(
      "[quiz/submit] Supabase not configured — returning ephemeral diagnostic without persistence"
    );
    return NextResponse.json({
      id: randomUUID(),
      diagnostic,
      copy: DIAGNOSTIC_COPY[diagnostic],
      evidence,
      ephemeral: true,
    });
  }

  const { data, error } = await supabase
    .from("quiz_responses")
    .insert({
      q1_visibility: answers.q1,
      q2_team_reports: answers.q2,
      q3_units_below_target: answers.q3,
      q4_lost_seller: answers.q4,
      q5_monday_meeting: answers.q5,
      diagnostic,
      network_size: networkSize ?? null,
      vertical: vertical ?? null,
      user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      utm_source: utm?.source ?? null,
      utm_medium: utm?.medium ?? null,
      utm_campaign: utm?.campaign ?? null,
      ip_hash: ipHash,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("[quiz/submit] insert failed:", error);
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
  }

  return NextResponse.json({
    id: data.id,
    diagnostic,
    copy: DIAGNOSTIC_COPY[diagnostic],
    evidence,
  });
}
