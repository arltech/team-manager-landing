---
slug: team-manager-landing
nome: Team Manager
nicho: SaaS de gestão para redes de escolas e cursos (positioning conforme commit e469e12 "feat(positioning): niche to redes de escolas e cursos")
cidade: TODO
status: ativo
desde: 2026-04-26
---

# Team Manager (Landing Pública)

## Oferta e preços

- Site de vendas + quiz-diagnóstico do produto Team Manager (README.md).
- Pricing citado no README, seção "TODO antes do deploy": 3 tiers atuais, 697 / 1397 / 2497 (ainda não fechado, conforme o próprio TODO do repo: "Fechar pricing").
- Modelo de preço: "sob diagnóstico" (commit 985d77f "feat(offer): preco sob diagnostico, garantia por resultado, remove escassez falsa").

## Brand voice

- TODO (nenhum guia de voz/brand encontrado no repo, só copy embutida no código)

Assets: design-snapshots/ (presente no diretório do projeto)

## Links

- Site: TODO (README menciona domínio próprio "a definir, teammanager.app?" e .env.example usa EMAIL_FROM com noreply@teammanager.app)
- Instagram: TODO
- Gestor de anúncios: Meta Ads (Pixel + Conversions API/CAPI configurados, ver .env.example e commit e469e12 "feat(tracking): Meta Pixel + CAPI com dedup no funil do quiz")
- GSC/GMN: Google Search Console (meta tag de verificação adicionada, commit 1df5d69 "chore(seo): adiciona meta tag de verificação do Google Search Console")

## Credenciais

- `.env.local` presente no diretório (não versionado); referência de variáveis em `.env.example`
- Variáveis usadas (nomes, sem valores): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, EMAIL_FROM, NEXT_PUBLIC_DEMO_CALENDLY, NEXT_PUBLIC_APP_URL, WAHA_API_URL, WAHA_API_KEY, WAHA_SESSION, LEAD_WEBHOOK_URL, NEXT_PUBLIC_META_PIXEL_ID, META_CAPI_ACCESS_TOKEN, NEXT_PUBLIC_CLARITY_ID
- Deploy: pasta `.vercel/` presente (projeto linkado à Vercel)

## Histórico de trabalhos

- 2026-04-26: commit inicial, "landing + diagnóstico quiz + PDF" (7d54cf7)
- 2026-04-26: fix de migration do Supabase, constraint do quiz (2b502b5)
- 2026-04-26: extração de atoms e tokens de design system a partir de auditoria de Brad Frost (73ff42b)
- Sem data exata (entre commits acima e os de 2026-06/07): efeitos de UI (cursor spotlight, count-up KPIs, confete), reposicionamento de nicho ("redes de escolas e cursos"), bump de pricing e value stack, captura de lead via WhatsApp + webhook + PDF, tracking de Meta Pixel + CAPI, A/B test de home, gate de diagnóstico com validação de WhatsApp via WAHA, oferta "preço sob diagnóstico" com garantia por resultado
- 2026-06-30: CTA de diagnóstico + depoimento com nome, foto e nova citação (b90bb72)
- 2026-07-01: SEO (sitemap, robots.txt, JSON-LD, llms.txt, correção de domínio), meta tag Google Search Console, integração Microsoft Clarity com eventos de analytics do quiz (667499b, 1df5d69, f726c7b, 8c2b82f)

## Notas operacionais

- Este diretório é a landing page pública do mesmo produto/cliente de `~/arltech/clientes/team-manager/` (sistema Team Manager usado pela Minds Idiomas). Confirmado pelo próprio README.md: "Site de vendas + quiz-diagnóstico do produto Team Manager. Projeto independente do app SaaS (que vive em `minds-team-manager`)".
- README cita um case da Minds usado como depoimento na landing, com placeholder de copy "aguardando aprovação Felipe" (TODO antes do deploy, ainda pendente na última leitura).
- TODOs em aberto listados no próprio README: setar NEXT_PUBLIC_DEMO_CALENDLY, verificar domínio Resend (DNS) para noreply@teammanager.app, revisar copy do case Minds, fechar pricing definitivo, apontar domínio próprio no Vercel, configurar GA4/Meta Pixel adicional.
- Stack: Next.js 16 (App Router) + React 19 + TypeScript, Tailwind 4, Supabase (quiz responses + leads), Resend (email transacional), Lucide React, Motion, Sonner, Zod (README.md).
- Repositório remoto: github.com/arltech/team-manager-landing (git remote origin).
