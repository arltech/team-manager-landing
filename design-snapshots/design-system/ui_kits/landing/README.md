# Team Manager — Landing UI Kit

A high-fidelity recreation of the **Team Manager sales landing page** (`/`), built from the real
product source (`arltech/team-manager-landing`, `src/app/_components/*`). It composes the
design-system primitives from `_ds_bundle.js` rather than re-implementing them.

## Files
- `index.html` — mounts the full single-page sales flow (also a "Pages" starting point).
- `sections-1.jsx` — Header, Hero (+ dashboard carousel), Problem, Solution. Inline Lucide-path icons.
- `sections-2.jsx` — SocialProof (KPIs + rotating testimonial + trust stripe), Offer (3 plans + value-stack accordion + guarantee), Faq, CtaFinal.

## Sections (top → bottom)
1. **Header** — transparent over the hero; logo + nav + white CTA.
2. **Hero** — navy gradient, glass eyebrow pill, big Manrope headline, dual CTA, auto-rotating dashboard screenshot carousel.
3. **Problem** — numbered pain list (emphasis rows in destructive red) + a framed punch-line.
4. **Solution** — 5 feature cards ("O que é" / "O que elimina"), last spans full width.
5. **SocialProof** — 4 KPI cards, rotating testimonial card, 3-up trust stripe.
6. **Offer** — 3 pricing cards (Rede featured + glow), collapsible value-stack, 30-day guarantee card.
7. **Faq** — 5 accordion rows.
8. **CtaFinal** — second navy gradient block, closing argument + CTA.

## Notes
- All CTAs fire a demo toast (the real page routes to `/diagnostico`, a 5-question quiz).
- Components pulled from the bundle: `Button, Pill, Card, IconBadge, KpiCard, SectionHeader, Accordion, Avatar`.
- Each `.jsx` is wrapped in an IIFE and registers its sections on `window.TMLanding` so the multiple
  in-browser-Babel scripts don't collide in global scope.
- Dashboard screenshots live in `assets/dashboard/` (real product app captures).
