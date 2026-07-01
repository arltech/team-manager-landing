/* Team Manager v2 — "Provas reais no WhatsApp" section.
   Recreates the real WhatsApp feedback messages as clean, fully-anonymized chat
   bubbles: no names, no photos, no phone numbers, no company name. Quotes are the
   clients' real words (lightly trimmed). Exposes window.TMWhats.WhatsProof. */
(function () {
  const R = React;

  const THREADS = [
    {
      role: "Consultora de matrículas", time: "5:16",
      msgs: [
        "Ganhei mais tempo, matrícula recuperada e mais organização.",
        "Mesmo sem preencher todos os dias, ajuda 100%. Tudo dentro de uma plataforma só, isso não tem preço!",
      ],
    },
    {
      role: "Coordenação comercial", time: "5:42",
      msgs: [
        "O Team Manager foi muito assertivo, pensado de fato para o nosso formato de trabalho. A direção consegue saber o que estamos fazendo mesmo sem nos ver, por conta do diário do dia.",
        "Enfim, parabéns! É o sistema mais completo que já usei.",
      ],
    },
    {
      role: "Consultor de vendas", time: "5:30",
      msgs: [
        "Criou uma rotina de trabalho que antes não existia. Principalmente o quadro de atividades: consigo deixar o que preciso fazer no dia, na semana e no mês, e ter controle disso.",
      ],
    },
    {
      role: "Equipe comercial", time: "5:07",
      msgs: [
        "Mais organização e visualização rápida dos contatos e agendamentos. Dá pra registrar características do lead que poderiam ser esquecidas, tudo na observação.",
      ],
    },
  ];

  const AVA = ["#0ea5e9", "#a855f7", "#f59e0b", "#10b981"];

  function Ticks() {
    return (
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" style={{ flexShrink: 0 }}>
        <path d="M1 5.5 4 8.5 9.5 2.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 5.5 9 8.5 14.5 2.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  function Person() {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6Z"/></svg>
    );
  }

  function Thread({ t, i }) {
    return (
      <div style={{
        borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,.1)",
        boxShadow: "0 24px 60px -18px rgba(0,0,0,.5)", background: "#0b141a", display: "flex", flexDirection: "column",
      }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "#1f2c33", borderBottom: "1px solid rgba(0,0,0,.3)" }}>
          <span style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0, background: AVA[i % AVA.length], display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Person/></span>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: "#e9edef", fontWeight: 600, fontSize: 15 }}>{t.role}</div>
            <div style={{ color: "#8696a0", fontSize: 12.5 }}>Cliente Team Manager</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2" style={{ marginLeft: "auto", flexShrink: 0 }}><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        {/* chat area */}
        <div style={{ position: "relative", flex: 1, padding: "20px 16px", background: "#0b141a" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, #fff 1px, transparent 1.5px), radial-gradient(circle at 45% 85%, #fff 1px, transparent 1.5px)", backgroundSize: "60px 60px" }} />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8 }}>
            {t.msgs.map((m, j) => {
              const last = j === t.msgs.length - 1;
              return (
                <div key={j} style={{ maxWidth: "92%", background: "#202c33", borderRadius: 12, borderTopLeftRadius: j === 0 ? 3 : 12, padding: "9px 12px 7px", color: "#e9edef", fontSize: 14.5, lineHeight: 1.5 }}>
                  {m}
                  {last && (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: "#8696a0" }}>{t.time} PM</span><Ticks/>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function WhatsProof() {
    const { Reveal } = window.TMv2 || {};
    const Wrap = Reveal || (({ children, style }) => R.createElement("div", { style }, children));
    return (
      <section id="provas" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg,#0a0e27,#0d1130)", color: "#f5f5fa", padding: "112px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,211,102,.10), transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
          <Wrap style={{ textAlign: "center", marginBottom: 16 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#25d366" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#25d366" }} />Provas reais no WhatsApp
            </span>
          </Wrap>
          <Wrap style={{ textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "-.025em", fontSize: "clamp(30px,4vw,46px)", margin: "0 0 12px" }}>O que a equipe respondeu, sem filtro.</h2>
          </Wrap>
          <Wrap style={{ textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,.6)", fontSize: 17, maxWidth: 560, margin: "0 auto 54px", lineHeight: 1.6 }}>Mensagens reais de quem usa o Team Manager no dia a dia. Nomes, fotos e telefones omitidos por privacidade.</p>
          </Wrap>
          <div className="whats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 22, alignItems: "start" }}>
            {THREADS.map((t, i) => (
              <Wrap key={i} delay={(i % 2) * 0.08} style={{ display: "flex" }}>
                <Thread t={t} i={i} />
              </Wrap>
            ))}
          </div>
        </div>
        <style>{`@media (max-width:900px){ #provas .whats-grid{ grid-template-columns:1fr !important; } }`}</style>
      </section>
    );
  }

  window.TMWhats = { WhatsProof };
})();
