# Team Manager — Landing Pública

Site de vendas + quiz-diagnóstico do produto **Team Manager**.

Projeto independente do app SaaS (que vive em `minds-team-manager`).

---

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind 4 (PostCSS)
- Supabase (quiz responses + leads)
- Resend (email transacional pós-quiz)
- Lucide React (ícones)
- Motion (animações leves)
- Sonner (toasts)
- Zod (validação)

---

## Setup

1. **Dependências:**
   ```bash
   npm install
   ```

2. **Variáveis de ambiente:**
   ```bash
   cp .env.example .env.local
   # editar com as keys reais
   ```

3. **Migration Supabase:**
   ```bash
   # rodar o SQL em supabase/migrations/001_quiz_tables.sql
   # via Supabase Studio OR supabase CLI
   ```

4. **Dev:**
   ```bash
   npm run dev
   # → http://localhost:3000
   ```

---

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing pública (hero, problema, solução, oferta, FAQ, CTA) |
| `/vendas` | Redirect → `/` (canônico SEO/ads) |
| `/diagnostico` | Quiz 5 perguntas com resultado imediato |
| `POST /api/quiz/submit` | Salva resposta + retorna diagnóstico |
| `POST /api/quiz/lead` | Captura email + dispara Resend |

---

## Deploy

Vercel sugerido. Domínio próprio (a definir — `teammanager.app`?).

---

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        — root layout (fontes, dark mode)
│   ├── page.tsx          — landing (importa seções de _components/)
│   ├── globals.css       — design tokens M3-light
│   ├── _components/      — sub-componentes da landing
│   ├── diagnostico/
│   │   ├── page.tsx
│   │   └── quiz-client.tsx
│   └── api/quiz/
│       ├── submit/route.ts
│       └── lead/route.ts
└── lib/
    ├── quiz-types.ts     — tipos + algoritmo + copy diagnósticos
    ├── email.ts          — helper Resend
    └── supabase-admin.ts — client service-role
```

---

## TODO antes do deploy

- [ ] Setar `NEXT_PUBLIC_DEMO_CALENDLY` (link Calendly do founder)
- [ ] Verificar domínio Resend (DNS) pra usar `noreply@teammanager.app`
- [ ] Revisar copy do case Minds (slide com placeholder — aguardando aprovação Felipe)
- [ ] Fechar pricing (3 tiers atuais: 697 / 1397 / 2497)
- [ ] Apontar domínio próprio no Vercel
- [ ] Configurar GA4 / Meta Pixel (não incluído nesta versão)
