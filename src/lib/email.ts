import { Resend } from "resend";
import { DIAGNOSTIC_COPY, type Diagnostic } from "./quiz-types";

const FROM = process.env.EMAIL_FROM ?? "Team Manager <noreply@teammanager.app>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

interface EmailAttachment {
  filename: string;
  content: Buffer;
}

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}

export async function sendEmail({
  to,
  subject,
  html,
  attachments,
}: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set, skipping:", subject);
    return;
  }
  try {
    await getResend().emails.send({
      from: FROM,
      to,
      subject,
      html,
      attachments: attachments?.map((a) => ({
        filename: a.filename,
        content: a.content,
      })),
    });
  } catch (error) {
    console.error("[email] Failed to send:", error);
    throw error;
  }
}

export function buildDiagnosticEmail(
  diagnostic: Diagnostic,
  name?: string
): { subject: string; html: string } {
  const copy = DIAGNOSTIC_COPY[diagnostic];
  const greeting = name ? `Olá, ${name}.` : "Olá.";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const demoUrl = process.env.NEXT_PUBLIC_DEMO_CALENDLY ?? `${appUrl}/#oferta`;

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1b22;">
      <div style="background: #00288e; padding: 24px; border-radius: 8px 8px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 22px;">Team Manager</h2>
        <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Diagnóstico personalizado para sua rede</p>
      </div>
      <div style="padding: 28px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 14px; color: #525c87; margin: 0 0 16px;">${greeting}</p>
        <div style="background: #f5f1ff; border-left: 4px solid ${copy.accentColor}; padding: 12px 16px; margin: 0 0 20px;">
          <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: ${copy.accentColor}; font-weight: 700;">${copy.badge}</p>
          <h3 style="margin: 6px 0 0; font-size: 18px; color: #1a1b22;">${copy.title}</h3>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #525c87; margin: 0 0 16px;">${copy.emailIntro}</p>
        <p style="font-size: 14px; line-height: 1.6; color: #525c87; margin: 0 0 24px;">${copy.summary}</p>
        <h4 style="margin: 0 0 12px; font-size: 16px;">Plano de ação em 3 passos</h4>
        <ol style="padding-left: 20px; color: #525c87; line-height: 1.7;">
          <li style="margin-bottom: 10px;">${copy.actionSteps[0]}</li>
          <li style="margin-bottom: 10px;">${copy.actionSteps[1]}</li>
          <li style="margin-bottom: 10px;">${copy.actionSteps[2]}</li>
        </ol>
        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 13px; color: #525c87; margin: 0 0 12px;">Quer ver como o Team Manager implanta esse plano em 72 horas?</p>
          <a href="${demoUrl}" style="background: #00288e; color: white; padding: 12px 22px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600;">Agendar demonstração</a>
        </div>
      </div>
      <p style="text-align: center; font-size: 11px; color: #999; margin: 16px 0 0;">Você recebeu este email porque solicitou o resultado do diagnóstico no Team Manager.</p>
    </div>
  `;

  return { subject: copy.emailSubject, html };
}
