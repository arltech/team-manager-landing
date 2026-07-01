import "server-only";

/**
 * Confirma se um número tem WhatsApp ativo via WAHA (mesma stack usada no
 * Team Manager SaaS). ponytail: se WAHA_API_URL/KEY não estiverem
 * configurados ou a chamada falhar, retorna null (checagem inconclusiva) em
 * vez de bloquear o lead — a validação de formato já cobre o mínimo.
 */
export async function checkWhatsappExists(
  digitsBR: string
): Promise<boolean | null> {
  const url = process.env.WAHA_API_URL;
  const key = process.env.WAHA_API_KEY;
  const session = process.env.WAHA_SESSION ?? "default";
  if (!url || !key) return null;

  const phone = `55${digitsBR}`;
  try {
    const res = await fetch(
      `${url.replace(/\/+$/, "")}/api/contacts/check-exists?phone=${phone}&session=${session}`,
      { headers: { "X-Api-Key": key }, signal: AbortSignal.timeout(8_000) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { numberExists?: boolean };
    return data.numberExists ?? null;
  } catch (err) {
    console.error("[waha-check] failed:", err);
    return null;
  }
}
