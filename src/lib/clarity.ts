/**
 * Wrapper fino sobre o Microsoft Clarity (window.clarity injetado no layout).
 *
 * ponytail: sem lib externa (@microsoft/clarity-js). O snippet base mora no
 * layout; aqui só disparamos eventos e tags pra filtrar/buscar sessões no
 * painel do Clarity.
 *
 * Se o Clarity não estiver carregado (env ausente), tudo vira no-op silencioso.
 */

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/** Marca um evento nomeado na sessão (aparece nos filtros do painel). */
export function trackClarityEvent(name: string): void {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("event", name);
}

/** Etiqueta a sessão com um valor buscável (ex.: nome, diagnóstico). */
export function setClarityTag(key: string, value: string): void {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("set", key, value);
}

/** Vincula a sessão a um identificador estável do lead (ex.: WhatsApp). */
export function identifyClarityLead(customId: string, friendlyName?: string): void {
  if (typeof window === "undefined" || !window.clarity) return;
  window.clarity("identify", customId, undefined, undefined, friendlyName);
}
