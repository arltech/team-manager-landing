import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Card de compartilhamento (WhatsApp, LinkedIn, X). Antes era um PNG quadrado
 * de 512x512 com so a logo: no feed ele aparecia cortado nas laterais ou como
 * miniatura, porque o formato esperado e 1200x630.
 *
 * Gerado por codigo, e nao por imagem: assim o texto acompanha a copy da home
 * sem alguem ter que reexportar arte quando a frase mudar.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Team Manager: sistema de operação para redes de escolas e cursos";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/ds/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #070a1c 0%, #141a44 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* A marca ja traz o nome embaixo do simbolo: repetir "Team Manager" ao
            lado dela duplicaria o wordmark. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={125} height={110} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Pare de ser o único que se importa com a meta de matrícula.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 820,
            }}
          >
            CRM de candidatos, follow-up automático e ranking de equipe para
            redes de escolas e cursos.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <span style={{ display: "flex" }}>www.teammanager.tech</span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.25)" }}>·</span>
          <span style={{ display: "flex" }}>Garantia de 30 dias</span>
        </div>
      </div>
    ),
    size,
  );
}
