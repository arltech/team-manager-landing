/**
 * Notifica um webhook externo quando um lead novo é capturado.
 *
 * Configure com a env var `LEAD_WEBHOOK_URL`. Compatível com:
 *  - Discord (webhook URL termina em /webhooks/{id}/{token})
 *  - Slack (webhook URL contém hooks.slack.com)
 *  - Genérico (Make, Zapier, n8n, endpoint custom) — recebe o JSON cru
 *
 * Falhas são logadas mas NUNCA bloqueiam a captura do lead.
 */

type LeadPayload = {
  name: string;
  whatsapp: string; // já em dígitos puros, ex. 11999998888
  networkName: string;
  diagnostic: string;
  diagnosticBadge: string;
};

function formatWhatsappDisplay(digits: string): string {
  // 11 dígitos: (11) 99999-9999 · 10 dígitos: (11) 9999-9999
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return digits;
}

function buildMessage(p: LeadPayload): string {
  const phoneDisplay = formatWhatsappDisplay(p.whatsapp);
  const wppLink = `https://wa.me/55${p.whatsapp}`;
  return [
    `🎯 *Novo lead — Team Manager*`,
    ``,
    `*Nome:* ${p.name}`,
    `*Rede:* ${p.networkName}`,
    `*WhatsApp:* ${phoneDisplay}`,
    `*Conversar agora:* ${wppLink}`,
    ``,
    `*Diagnóstico:* ${p.diagnosticBadge}`,
  ].join("\n");
}

export async function notifyLeadWebhook(payload: LeadPayload): Promise<void> {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead-webhook] LEAD_WEBHOOK_URL not set — skipping");
    return;
  }

  const message = buildMessage(payload);
  const isDiscord = url.includes("discord.com/api/webhooks");
  const isSlack = url.includes("hooks.slack.com");

  // Body adaptado por destino
  let body: string;
  let headers: Record<string, string> = { "Content-Type": "application/json" };

  if (isDiscord) {
    body = JSON.stringify({
      content: message,
      username: "Team Manager",
    });
  } else if (isSlack) {
    body = JSON.stringify({ text: message });
  } else {
    // Genérico (Make / Zapier / n8n / Telegram bot via relay / endpoint custom)
    body = JSON.stringify({
      text: message,
      lead: payload,
      whatsappLink: `https://wa.me/55${payload.whatsapp}`,
    });
  }

  try {
    const res = await fetch(url, { method: "POST", headers, body });
    if (!res.ok) {
      console.error(
        "[lead-webhook] non-2xx response:",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (err) {
    console.error("[lead-webhook] failed:", err);
  }
}
