import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Card de compartilhamento (WhatsApp, LinkedIn, X). Antes era um PNG quadrado
 * de 512x512 com so a logo: no feed ele aparecia cortado nas laterais ou como
 * miniatura, porque o formato esperado e 1200x630.
 *
 * Gerado por codigo, e nao por imagem: assim o texto acompanha a copy da home
 * sem alguem ter que reexportar arte quando a frase mudar. O titulo e o TITLE
 * do layout.tsx (o mesmo da aba e do Google) e a faixa de baixo sao os cinco
 * elos de _site/Ciclo.tsx: mudou la, muda aqui.
 *
 * Mesma linguagem da pagina (site.css): Archivo Black em caixa alta, Archivo
 * no corpo, fundo tinta e bloco de canto de 4px. O gerador nao enxerga o
 * Google Fonts do layout, entao as fontes moram em app/fonts.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Team Manager: do primeiro contato ao contrato assinado, a operação comercial da rede em um sistema";

// Paleta de site.css, nao inventada aqui.
const TINTA = "#070b24";
const TINTA_2 = "#0f1440";
const TEXTO_FRACO = "rgba(255,255,255,0.44)";
const LINHA_FORTE = "rgba(255,255,255,0.22)";
const ACENTO = "#9db2ff";

const ELOS = ["Captura", "Tratativa", "Fechamento", "Time", "Dinheiro"];

const fonte = (arquivo: string) => readFile(join(process.cwd(), "src/app/fonts", arquivo));

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/ds/logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const [display, forte] = await Promise.all([
    fonte("archivo-black.ttf"),
    fonte("archivo-700.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          backgroundColor: TINTA,
          backgroundImage: `radial-gradient(1000px 600px at 90% 0%, ${TINTA_2} 0%, rgba(15,20,64,0) 70%)`,
          color: "#ffffff",
          fontFamily: "Archivo",
          fontWeight: 700,
        }}
      >
        {/* A marca ja traz o nome embaixo do simbolo: repetir "Team Manager" ao
            lado dela duplicaria o wordmark. */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={91} height={80} />
          <div style={{ display: "flex", fontSize: 17, letterSpacing: 2.7, color: TEXTO_FRACO }}>
            WWW.TEAMMANAGER.TECH
          </div>
        </div>

        {/* Quebra escrita a mao: em caixa alta a Archivo Black e larga, e
            deixar o Satori quebrar sozinho deixava palavra orfa. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Archivo Black",
            fontWeight: 400,
            fontSize: 76,
            lineHeight: 0.98,
            letterSpacing: -1.5,
          }}
        >
          <div style={{ display: "flex" }}>DO PRIMEIRO CONTATO</div>
          <div style={{ display: "flex" }}>AO CONTRATO</div>
          <div style={{ display: "flex" }}>ASSINADO.</div>
        </div>

        {/* Os cinco elos: o argumento da pagina e a volta inteira, nao um pedaco */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {ELOS.map((elo, i) => (
            <div key={elo} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderRadius: 4,
                  border: `1px solid ${LINHA_FORTE}`,
                  background: i === ELOS.length - 1 ? "#ffffff" : "transparent",
                  color: i === ELOS.length - 1 ? TINTA : "#ffffff",
                  fontSize: 19,
                  letterSpacing: 1.5,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Archivo Black",
                    fontWeight: 400,
                    color: i === ELOS.length - 1 ? TINTA : ACENTO,
                  }}
                >
                  {`0${i + 1}`}
                </div>
                {elo.toUpperCase()}
              </div>
              {i < ELOS.length - 1 && (
                <div style={{ display: "flex", fontSize: 22, color: TEXTO_FRACO }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo Black", data: display, weight: 400, style: "normal" },
        { name: "Archivo", data: forte, weight: 700, style: "normal" },
      ],
    },
  );
}
