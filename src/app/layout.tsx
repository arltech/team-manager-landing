import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import Script from "next/script";
import "./globals.css";

// Na landing esta variavel significa a URL DELA MESMA, nao a do app (o sistema
// mora em app.teammanager.tech). O fallback e o dominio atual: quando faltava a
// env, canonical, OpenGraph e sitemap apontavam todos para o endereco antigo.
const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://www.teammanager.tech";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const SITE_NAME = "Team Manager";
const TITLE =
  "Team Manager: sistema de operação para redes de escolas e cursos";
const DESCRIPTION =
  "CRM de candidatos, follow-up automático, ranking de equipe e rotinas semanais para redes de escolas e cursos de 1 a 15 unidades. Pare de cobrar matrícula: o sistema cobra por você.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Team Manager",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "sistema gestão escola idiomas",
    "CRM de matrículas",
    "gestão de rede de cursos",
    "follow-up de candidatos escola",
    "ranking de equipe comercial educação",
    "software para escola de cursos",
    "Team Manager",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    // Dois tokens: o primeiro verifica a propriedade antiga (teammanager.arltech.emp.br),
    // o segundo verifica https://www.teammanager.tech/ no Search Console.
    google: [
      "mOPSwdt7gy7bknScqwK5YMbp5K6xEfUEplU9dZe-8Os",
      "4tb5HAo1r8aQlXUMIlBwqs5T3_ErwXwg39-OAd12-Iw",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e27" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/ds/logo-mark.png`,
    },
    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      url: SITE_URL,
      // Preco de tabela dos tres degraus. Mesma fonte da secao de planos em
      // page.tsx; mudou la, muda aqui, senao o rich result mente.
      offers: [
        { nome: "Essencial", preco: "397" },
        { nome: "Performance", preco: "697" },
        { nome: "Inteligência", preco: "1297" },
      ].map(({ nome, preco }) => ({
        "@type": "Offer",
        name: `Team Manager ${nome}`,
        price: preco,
        priceCurrency: "BRL",
        url: `${SITE_URL}/#oferta`,
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: preco,
          priceCurrency: "BRL",
          referenceQuantity: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      })),
      audience: {
        "@type": "Audience",
        audienceType: "Redes de escolas e cursos com 1 a 15 unidades",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body suppressHydrationWarning>
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
        {CLARITY_ID && (
          <Script id="ms-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
