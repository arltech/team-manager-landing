"use client";

import { useEffect } from "react";
import { trackMeta } from "@/lib/meta-pixel";

const UTM_KEY = "utm";

/**
 * Medição que vale para o site todo: guarda a UTM da primeira página (o quiz
 * mora em outra rota e a query some na navegação) e avisa o Meta quando
 * alguém clica num link de WhatsApp.
 */
export function Tracking() {
  useEffect(() => {
    if (location.search.includes("utm_")) {
      try {
        sessionStorage.setItem(UTM_KEY, location.search);
      } catch {
        // aba privada ou storage bloqueado: o quiz ainda lê a query da própria URL
      }
    }
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('a[href*="wa.me"]')) {
        trackMeta("Contact");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

/** UTM da sessão no formato que /api/quiz/submit aceita. */
export function readUtm() {
  let qs = location.search;
  try {
    qs = sessionStorage.getItem(UTM_KEY) ?? qs;
  } catch {
    // segue com a query da URL
  }
  const p = new URLSearchParams(qs);
  const pick = (k: string) => p.get(k)?.slice(0, 100) || undefined;
  const utm = {
    source: pick("utm_source"),
    medium: pick("utm_medium"),
    campaign: pick("utm_campaign"),
  };
  return utm.source || utm.medium || utm.campaign ? utm : undefined;
}
