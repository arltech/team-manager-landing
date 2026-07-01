**Button** — the primary action element; gradient-filled primary that lifts on hover, plus outline/ghost/secondary/white variants. Use for CTAs, form submits, and nav actions.

```jsx
<Button variant="primary" href="/diagnostico" iconRight={<ArrowRight size={18} />}>
  Agendar demonstração
</Button>
<Button variant="outline" fullWidth>Agendar demonstração</Button>
<Button variant="white" size="sm">Demonstração</Button>
```

Variants: `primary` (gradient + glow shadow), `secondary` (muted fill), `outline` (2px primary border, fills on hover), `ghost` (text-only), `white` (white on dark hero). Sizes `sm | md | lg`. Pass `href` to render an anchor.
