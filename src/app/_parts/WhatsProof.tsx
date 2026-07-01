"use client";

import { Reveal } from "../_components/Reveal";

const THREADS = [
  {
    role: "Consultora de matrículas",
    time: "5:16",
    msgs: [
      "Ganhei mais tempo, matrícula recuperada e mais organização.",
      "Mesmo sem preencher todos os dias, ajuda 100%. Tudo dentro de uma plataforma só, isso não tem preço!",
    ],
  },
  {
    role: "Coordenação comercial",
    time: "5:42",
    msgs: [
      "O Team Manager foi muito assertivo, pensado de fato para o nosso formato de trabalho. A direção consegue saber o que estamos fazendo mesmo sem nos ver, por conta do diário do dia.",
      "Enfim, parabéns! É o sistema mais completo que já usei.",
    ],
  },
  {
    role: "Consultor de vendas",
    time: "5:30",
    msgs: [
      "Criou uma rotina de trabalho que antes não existia. Principalmente o quadro de atividades: consigo deixar o que preciso fazer no dia, na semana e no mês, e ter controle disso.",
    ],
  },
  {
    role: "Equipe comercial",
    time: "5:07",
    msgs: [
      "Mais organização e visualização rápida dos contatos e agendamentos. Dá pra registrar características do lead que poderiam ser esquecidas, tudo na observação.",
    ],
  },
];

const AVA = ["#0ea5e9", "#a855f7", "#f59e0b", "#10b981"];

function Ticks() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="flex-shrink-0">
      <path d="M1 5.5 4 8.5 9.5 2.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 5.5 9 8.5 14.5 2.5" stroke="#53bdeb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Person() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6Z" />
    </svg>
  );
}

function Thread({ t, i }: { t: (typeof THREADS)[number]; i: number }) {
  return (
    <div className="rounded-[22px] overflow-hidden border border-white/10 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.5)] bg-[#0b141a] flex flex-col w-full">
      {/* header */}
      <div className="flex items-center gap-3 px-[18px] py-3.5 bg-[#1f2c33] border-b border-black/30">
        <span
          className="w-10 h-10 rounded-full flex-shrink-0 inline-flex items-center justify-center"
          style={{ background: AVA[i % AVA.length] }}
        >
          <Person />
        </span>
        <div className="min-w-0">
          <div className="text-[#e9edef] font-semibold text-[15px]">{t.role}</div>
          <div className="text-[#8696a0] text-[12.5px]">Cliente Team Manager</div>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8696a0" strokeWidth="2" className="ml-auto flex-shrink-0">
          <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      {/* chat area */}
      <div className="relative flex-1 px-4 py-5 bg-[#0b141a]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1.5px), radial-gradient(circle at 70% 60%, #fff 1px, transparent 1.5px), radial-gradient(circle at 45% 85%, #fff 1px, transparent 1.5px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative flex flex-col gap-2">
          {t.msgs.map((m, j) => {
            const last = j === t.msgs.length - 1;
            return (
              <div
                key={j}
                className="max-w-[92%] bg-[#202c33] rounded-xl text-[#e9edef] text-[14.5px] leading-relaxed px-3 pt-[9px] pb-[7px]"
                style={{ borderTopLeftRadius: j === 0 ? 3 : 12 }}
              >
                {m}
                {last && (
                  <span className="flex items-center justify-end gap-1 mt-[3px]">
                    <span className="text-[11px] text-[#8696a0]">{t.time} PM</span>
                    <Ticks />
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

/**
 * "Provas reais no WhatsApp" — anonymized chat-bubble testimonials. Names,
 * photos and phone numbers are intentionally omitted (privacy).
 */
export function WhatsProof() {
  return (
    <section
      id="provas"
      className="relative overflow-hidden text-[#f5f5fa] py-28"
      style={{ background: "linear-gradient(180deg,#0a0e27,#0d1130)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(37,211,102,.10), transparent 60%)",
        }}
      />
      <div className="relative max-w-[1100px] mx-auto px-7">
        <Reveal className="text-center mb-4">
          <span className="inline-flex items-center gap-[9px] text-xs font-bold tracking-[0.14em] uppercase text-[#25d366]">
            <span className="w-2 h-2 rounded-full bg-[#25d366]" />
            Provas reais no WhatsApp
          </span>
        </Reveal>
        <Reveal className="text-center">
          <h2 className="font-[var(--font-heading)] font-extrabold tracking-[-0.025em] text-[clamp(30px,4vw,46px)] mb-3">
            O que a equipe respondeu, sem filtro.
          </h2>
        </Reveal>
        <Reveal className="text-center">
          <p className="text-white/60 text-[17px] max-w-[560px] mx-auto mb-[54px] leading-relaxed">
            Mensagens reais de quem usa o Team Manager no dia a dia. Nomes, fotos e
            telefones omitidos por privacidade.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px] items-start">
          {THREADS.map((t, i) => (
            <Reveal key={t.role} delay={(i % 2) * 0.08} className="flex">
              <Thread t={t} i={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
