"use client";

import { useEffect, useRef } from "react";

type CursorSpotlightProps = {
  /** Diameter of the spotlight in px. Default 600. */
  size?: number;
  /** Spotlight color (any valid CSS color). Default a soft indigo. */
  color?: string;
  /** Opacity of the spotlight layer. Default 0.18. */
  opacity?: number;
  /** Blend mode applied to the layer over its parent. Default "screen". */
  blend?: React.CSSProperties["mixBlendMode"];
};

/**
 * Soft cursor-following light. Renders inside the parent element and tracks
 * mouse position relative to it. Disables itself on touch devices and when
 * `prefers-reduced-motion` is set.
 */
export function CursorSpotlight({
  size = 600,
  color = "rgba(99, 102, 241, 0.5)",
  opacity = 0.18,
  blend = "screen",
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
      const coarse = window.matchMedia("(pointer: coarse)");
      if (reduced.matches || coarse.matches) {
        el.style.display = "none";
        return;
      }
    }

    function onEnter() {
      if (el) el.style.opacity = String(opacity);
    }
    function onLeave() {
      if (el) el.style.opacity = "0";
    }
    function onMove(e: MouseEvent) {
      if (!el || !parent) return;
      const rect = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }

    parent.addEventListener("mouseenter", onEnter);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("mousemove", onMove);
    return () => {
      parent.removeEventListener("mouseenter", onEnter);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("mousemove", onMove);
    };
  }, [opacity]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      style={{
        opacity: 0,
        background: `radial-gradient(${size}px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 55%)`,
        mixBlendMode: blend,
      }}
    />
  );
}
