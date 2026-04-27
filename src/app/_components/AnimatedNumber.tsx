"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

type AnimatedNumberProps = {
  /** Final numeric value. */
  value: number;
  /** Animation duration in seconds. Default 1.4. */
  duration?: number;
  /** Optional prefix (e.g. "R$ "). */
  prefix?: string;
  /** Optional suffix (e.g. "%", "+", "h", " dias"). */
  suffix?: string;
  /** Number of decimals. Default 0. */
  decimals?: number;
  /** Apply pt-BR thousand separator. Default true. */
  format?: boolean;
  className?: string;
};

/**
 * Number that animates from 0 to `value` once it enters the viewport.
 * Falls back to the final value when reduced-motion is preferred.
 */
export function AnimatedNumber({
  value,
  duration = 1.4,
  prefix = "",
  suffix = "",
  decimals = 0,
  format = true,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setDisplay(value);
        return;
      }
    }
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  const rendered = format
    ? display.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : display.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {rendered}
      {suffix}
    </span>
  );
}
