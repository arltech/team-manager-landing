/**
 * Wrapper fino sobre o Meta Pixel (fbq global injetado no layout).
 *
 * ponytail: sem lib externa (react-facebook-pixel). O snippet base mora no
 * layout; aqui só disparamos eventos e geramos o event_id de deduplicação
 * compartilhado entre o pixel (client) e a Conversions API (server).
 *
 * Se o pixel não estiver carregado (env ausente), tudo vira no-op silencioso.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FbqEventOptions = { eventID?: string };

export function trackMeta(
  event: string,
  params?: Record<string, unknown>,
  options?: FbqEventOptions
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, params ?? {}, options);
}

export function trackMetaCustom(
  event: string,
  params?: Record<string, unknown>,
  options?: FbqEventOptions
): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", event, params ?? {}, options);
}

/** event_id único, compartilhado entre pixel e CAPI para o Meta deduplicar. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
}
