/**
 * Meta Conversions API (CAPI): envia o evento Lead server-side, espelhando o
 * disparo client-side do pixel. Usa o MESMO event_id para o Meta deduplicar
 * entre pixel e CAPI (senão a conversão conta dobrado).
 *
 * Configure com NEXT_PUBLIC_META_PIXEL_ID + META_CAPI_ACCESS_TOKEN.
 * Sem elas, vira no-op silencioso (degradação graciosa, igual ao webhook).
 *
 * Dados de PII (telefone, nome) vão hasheados em SHA-256, conforme exige a
 * Meta. IP e user agent vão crus (a Meta pede assim).
 */

import { createHash } from "crypto";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v21.0";

function sha256(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

type CapiLead = {
  eventId: string;
  whatsapp: string; // dígitos puros, ex. 11999998888
  name?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
};

export async function sendLeadCapi(lead: CapiLead): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn("[meta-capi] PIXEL_ID/ACCESS_TOKEN ausentes — pulando CAPI");
    return;
  }

  // Telefone com DDI 55 (Brasil) antes de hashear, formato E.164 sem '+'.
  const phone = lead.whatsapp.startsWith("55")
    ? lead.whatsapp
    : `55${lead.whatsapp}`;

  const userData: Record<string, unknown> = { ph: [sha256(phone)] };
  if (lead.name) {
    const parts = lead.name.trim().toLowerCase().split(/\s+/);
    userData.fn = [sha256(parts[0])];
    if (parts.length > 1) userData.ln = [sha256(parts[parts.length - 1])];
  }
  if (lead.clientIp) userData.client_ip_address = lead.clientIp;
  if (lead.userAgent) userData.client_user_agent = lead.userAgent;
  if (lead.fbp) userData.fbp = lead.fbp;
  if (lead.fbc) userData.fbc = lead.fbc;

  const body = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.eventSourceUrl,
        user_data: userData,
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      console.error(
        "[meta-capi] non-2xx:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (err) {
    console.error("[meta-capi] failed:", err);
  }
}
