/* Team Manager v2 — shared helpers for the redesign directions.
   Registers window.TMv2 { Icon, ic, Reveal, CountUp, useReveal }. */
(function () {
  const { useState, useEffect, useRef } = React;

  /* Inline Lucide-path icon (stroke 2, rounded). */
  function Icon({ size = 24, sw = 2, fill = "none", children, style }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
        strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
        style={{ display: "inline-block", flexShrink: 0, ...style }}>
        {children}
      </svg>
    );
  }
  const ic = {
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    check: <path d="M20 6 9 17l-5-5"/>,
    x: <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>,
    shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>,
    spark: <path d="M12 2l2 6.5L20.5 10.5 14 12.5 12 19l-2-6.5L3.5 10.5 10 8.5z"/>,
    bot: <><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2M20 14h2M15 13v2M9 13v2"/></>,
    heart: <path d="M7.5 3C5 3 3 5 3 7.5c0 5 7 9 9 11 2-2 9-6 9-11C21 5 19 3 16.5 3c-1.5 0-3 1-4.5 2.5C10.5 4 9 3 7.5 3z"/>,
    eye: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    cap: <><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
    bolt: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>,
    db: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></>,
    trophy: <><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></>,
    msg: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>,
    play: <><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></>,
  };

  /* Scroll-reveal: returns [ref, shown].
     Uses a scroll-position check (IntersectionObserver is unreliable in some
     sandboxed preview iframes). Reveals when the element's top crosses ~92% of
     the viewport; reduced-motion reveals immediately. */
  function useReveal() {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
      const el = ref.current;
      if (!el) return;
      let done = false, raf = 0;
      const check = () => {
        if (done || !ref.current) return;
        const top = ref.current.getBoundingClientRect().top;
        if (top < (window.innerHeight || 800) * 0.92) { done = true; setShown(true); cleanup(); }
      };
      const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(check); };
      function cleanup() {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      // initial checks across a few frames so above-the-fold items reveal on load
      check();
      raf = requestAnimationFrame(check);
      const t = setTimeout(check, 120);
      return () => { cleanup(); clearTimeout(t); };
    }, []);
    return [ref, shown];
  }

  /* Reveal wrapper — fades up children when scrolled into view. */
  function Reveal({ as = "div", delay = 0, y = 24, className = "", style = {}, children, ...rest }) {
    const [ref, shown] = useReveal();
    const Tag = as;
    return (
      <Tag ref={ref} className={className} style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
        ...style,
      }} {...rest}>{children}</Tag>
    );
  }

  /* CountUp — animates a number when scrolled into view. */
  function CountUp({ to, suffix = "", prefix = "", dur = 1400, decimals = 0 }) {
    const [ref, shown] = useReveal();
    const [val, setVal] = useState(0);
    useEffect(() => {
      if (!shown) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { setVal(to); return; }
      let raf, start;
      const step = (t) => {
        if (!start) start = t;
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
      return () => cancelAnimationFrame(raf);
    }, [shown]);
    const shown_ = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("pt-BR");
    return <span ref={ref}>{prefix}{shown_}{suffix}</span>;
  }

  window.TMv2 = { Icon, ic, useReveal, Reveal, CountUp };
})();
