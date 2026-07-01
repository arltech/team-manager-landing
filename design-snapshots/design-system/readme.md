# Team Manager — Design System

Design system for **Team Manager**, a B2B SaaS *sistema de operação* (operating system) for
**networks of schools and courses** ("redes de escolas e cursos") with 2–15 units, by
[ARLTech](https://github.com/arltech). Team Manager unifies a candidate CRM, automated follow-up,
weekly routines, team gamification (XP, levels, ranking, Hall of Fame) and AI lead-finding — so the
owner stops being "the only one who cares about the enrollment target."

This system was reverse-engineered from the public **sales landing page** codebase. The product app
itself (dashboard, CRM, gamification) is shown through real in-app screenshots used by the landing.

## Source materials
- **GitHub:** [`arltech/team-manager-landing`](https://github.com/arltech/team-manager-landing) — Next.js 16 + React 19 + Tailwind 4 sales landing + quiz. Design tokens lifted verbatim from `src/app/globals.css`; components mirror `src/app/_components/*`.
  - The companion product SaaS lives in a separate repo (`minds-team-manager`, not provided here). Explore the landing repo further to build richer Team Manager designs.
- **Imported assets:** logo (silver mark + navy badge), 4 real product dashboard screenshots, a testimonial avatar — all in `assets/`.

> Fonts note: **Inter** and **Manrope** are loaded from the Google Fonts CDN (`tokens/fonts.css`),
> matching the product's `next/font` setup. No binaries are self-hosted — swap to local `@font-face`
> if you need offline rendering.

---

## Content fundamentals

The copy is **Brazilian Portuguese (PT-BR), informal, second-person ("você")**, and unmistakably
**direct-response / sales** in register — confrontational then resolving.

- **Voice:** confronts the reader with a painful truth, then offers relief. *"Se você precisa perguntar pra saber o que aconteceu, você não está gerenciando. Está investigando."*
- **Person:** always "você" (the school-network owner/manager). Never "we/our product does X" framed corporately — it's "o sistema cobra por você" (the system collects *for you*).
- **Sentences:** short, punchy, often fragments for rhythm. *"Não é beta. Não é demo. É operação rodando."*
- **Casing:** sentence case for body; **UPPERCASE micro-eyebrows** with wide letter-spacing ("A SOLUÇÃO", "O QUE ELIMINA"). Headlines use tight negative tracking, never all-caps.
- **Numbers are concrete and load-bearing:** "R$ 12.390/mês", "72 horas", "ROI líquido no mês 1: R$ 4.953", "30 leads/mês". Specificity = credibility.
- **Emphasis:** a muted/greyed span inside a headline sets up a contrast, then a full-color span lands the point ("Não porque pediu. Porque o sistema criou cultura.").
- **No emoji.** Tone is professional-but-human; persuasion comes from precision, not decoration.
- **Recurring frames:** the cost of inaction ("uma matrícula perdida custa mais que o plano"), the manager-as-investigator, "cultura" over "cobrança", "visibilidade sem presença".

---

## Visual foundations

A **Material-3-inspired light theme** with a confident **Yale-blue → indigo** brand and **deep-navy
gradient** hero/CTA moments. Calm, trustworthy, slightly premium SaaS.

- **Color:** Primary is Yale blue `#1e3a8a`, paired with a brighter `#3b82f6` (gradient buttons) and an indigo `#6366f1` accent (glows, cursor spotlight). Backgrounds are a warm off-white `#fbf8ff` with an M3 surface ramp (`#f4f2fc → #eeedf7 → #e8e7f1`). Text is near-black indigo `#1a1b22`. Status: success `#059669`, destructive `#dc2626`, warning `#d97706`, each with a 10–15% "subtle" fill. A full **dark theme** (`.dark`) powers the product app surfaces.
- **Type:** **Manrope** (700/800, tracking `-0.025em`, leading 1.12) for all headings; **Inter** (400–700, 1.6 leading) for body/UI. Fixed display scale 28/36/44/56px; micro labels at 9/10/11px with 0.08–0.14em tracking, uppercase.
- **Backgrounds:** the signature **hero gradient** is a layered radial composite — indigo top-left, a faint warm-pink flare bottom-right, blue bottom-center, over a `135deg` navy→indigo linear base. Light sections alternate `--surface` and `--surface-container-low`. No photographic backgrounds; product screenshots carry the imagery.
- **Cards:** white, **1px `#c4c5d5` border**, **21.6px radius** (`--radius-2xl`, the signature), soft low shadow that lifts to a slightly larger shadow + `--outline` border on hover. Featured cards swap to a **2px primary border + primary glow** (`--shadow-glow-primary`) and scale ~1.04.
- **Corner radii:** chips 7.2px, buttons/inputs 9.6–12px, icon tiles 16.8px, cards 21.6px, pills fully round (999px).
- **Shadows:** intentionally soft and low-spread (`0 1px 3px / 0 4px 6px`). Buttons carry a colored shadow `0 8px 24px rgb(0 40 142 / .18)` that deepens on hover. Glow shadows are reserved for featured/primary emphasis.
- **Buttons:** primary = `135deg` gradient (primary→container) + colored shadow + **−1px translateY lift** on hover; outline = 2px primary border that fills on hover; ghost = text-only, colors to primary; white = solid white on dark hero.
- **Animation:** restrained and premium. Entrance reveals use `opacity + translateY(28px)` with the easing `cubic-bezier(0.22, 1, 0.36, 1)` and staggered children (~0.12s). Testimonials cross-fade on an 8.5s loop. Hovers are 150–200ms. Respects `prefers-reduced-motion`. No bounces, no infinite decorative loops on content.
- **Hover/press:** hover = lift + shadow deepen (buttons), border brighten + shadow (cards), color shift (links/ghost). Press = `translateY(0)` (settle back). Focus = 2px primary outline, 3px offset (white outline on dark surfaces).
- **Transparency & blur:** glass pills on the hero (`rgba(255,255,255,0.10)` + `backdrop-blur`); the sticky header gains `bg-#0a0e27/80 + backdrop-blur` once scrolled. Tonal fills use ~10–15% alpha of the base color (via `color-mix`).
- **Pills/eyebrows:** fully-rounded, 11px, 700, uppercase, 0.08em tracking, tonal fill + matching 15–20% border.
- **Layout:** centered max-widths (`max-w-3xl/4xl/5xl/6xl`), generous section rhythm (`--section-y` 7rem → 9rem ≥768px), 24px horizontal gutters. Header is `position:fixed`. Mobile gets a sticky bottom CTA bar.
- **Imagery vibe:** real product screenshots (cool navy UI on light), testimonial photos kept faces-only and labelled "imagem ilustrativa". No illustration set; the people-as-team logo mark is the lone brand illustration.

---

## Iconography

- **Lucide** (`lucide-react` in the product) is the icon system — clean, **2px stroke, rounded
  line caps**, no fill. In this design system the icons are reproduced as inline SVG with Lucide
  path data (stroke `currentColor`, width 2–2.4). When building, prefer Lucide via
  [CDN](https://unpkg.com/lucide@latest) or `lucide-react`; match the rounded 2px stroke.
- Icons live inside **`IconBadge`** tiles (tonal rounded squares) in feature cards, KPIs and trust
  rows, or inline in buttons (e.g. trailing `ArrowRight`).
- **No emoji** in product UI or marketing copy. The "×" used in Solution "O que elimina" lists is a
  typographic glyph in monospace, not an icon.
- Common icons seen: `ArrowRight, Shield, Sparkles, Bot, Eye, Target, FileCheck, MessageSquareHeart,
  Database, ShieldCheck, Zap, Layers, GraduationCap, Clock, CheckCircle2, Quote, ChevronDown`.
- **Logo:** `assets/logo-mark.png` (silver three-people "team" mark + TEAM MANAGER wordmark, for
  dark backgrounds — apply a drop-shadow, or a CSS hue-rotate filter for light backgrounds) and
  `assets/icon-badge.png` (self-contained navy rounded badge, for light backgrounds / app icon).

---

## Index / manifest

**Root**
- `styles.css` — global entry (link this one file). `@import`s everything below.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shadows.css`, `base.css` (signature utility classes: `.hero-gradient`, `.btn-primary`, `.card`, `.pill`, `.section-y`).
- `assets/` — `logo-mark.png`, `icon-badge.png`, `testimonial-avatar.jpg`, `dashboard/slide-{1..4}.png`.
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `SKILL.md` — Agent-Skill manifest for downloadable use.

**Components** (`window.TeamManagerDesignSystem_6cb67c.<Name>`)
- `components/buttons/` — **Button** (primary/secondary/outline/ghost/white · sm/md/lg).
- `components/primitives/` — **Pill, Badge, IconBadge, Avatar, Card**.
- `components/content/` — **SectionHeader, KpiCard, Accordion**.
- `components/forms/` — **Input**.

**UI kits**
- `ui_kits/landing/` — full sales landing-page recreation (`index.html` + section JSX).

**Starting points:** Button (Buttons), Card (Surfaces), the landing page (Pages).
