---
name: team-manager-design
description: Use this skill to generate well-branded interfaces and assets for Team Manager, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference
- **Brand:** Team Manager — PT-BR B2B SaaS operating system for networks of schools/courses (ARLTech).
- **Tokens:** `styles.css` is the global entry; it `@import`s `tokens/*`. Link it and use CSS custom properties (`--primary`, `--surface-container`, `--radius-2xl`, etc).
- **Color:** Yale blue `#1e3a8a` primary, `#3b82f6` gradient pair, `#6366f1` indigo accent, warm off-white `#fbf8ff` bg, navy hero gradient. Light theme primary; `.dark` for app surfaces.
- **Type:** Manrope (headings, tight tracking) + Inter (body). Loaded from Google Fonts CDN.
- **Components:** `_ds_bundle.js` exposes `window.TeamManagerDesignSystem_6cb67c` — Button, Pill, Badge, IconBadge, Avatar, Card, SectionHeader, KpiCard, Accordion, Input. See each `components/*/*.prompt.md`.
- **Icons:** Lucide, 2px rounded stroke. No emoji.
- **Voice:** Brazilian Portuguese, second-person ("você"), direct-response sales — confront then resolve, concrete numbers, short sentences.

See `readme.md` for the full content + visual foundations and the UI-kit recreation.
