"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

/**
 * Faixa do Oraculo IA: o degrau acima do Inteligencia (src/lib/planos.ts no
 * repo do app, PLANOS.oraculo).
 *
 * O video e o mesmo da vitrine do Oraculo dentro do app (video-oraculo.tsx),
 * no bucket publico "site" do Supabase: trocar e subir por cima, com o mesmo
 * nome.
 *
 * Igual ao hero: o video roda mudo em loop por tras, e o quadro inteiro e o
 * botao. Clicar em qualquer parte volta para o zero e toca ali mesmo, com som
 * e controles nativos; no fim, volta ao loop mudo. O loop so toca com a faixa
 * na tela (preload="none" ate la), para quem nao rola ate aqui nao baixar nada.
 *
 * ponytail: o loop usa o arquivo cheio (21 MB, com audio); um loop leve de
 * 720p sem audio, como o institucional-loop.mp4 do hero, se o peso pesar.
 */
const VIDEO = "https://mticvezbaxllzbwkeskc.supabase.co/storage/v1/object/public/site/video/treinamentos";

const PONTOS = [
  {
    titulo: "Ao vivo",
    texto: "Cada lead, apresentação e matrícula aparece na hora em que acontece. Com um clique, vira a tela da TV da sala.",
  },
  {
    titulo: "Pergunte",
    texto: "Do último mês, dos três ou dos seis, de todas as unidades ou de uma só. Volta o número, a leitura e o que fazer.",
  },
  {
    titulo: "Insights",
    texto: "Quem vende cliente que fica, por que saem e o que foi combinado na conversa, cobrado no dia certo.",
  },
];

export function Oraculo() {
  const video = useRef<HTMLVideoElement>(null);
  const [comSom, setComSom] = useState(false);

  // Loop mudo so enquanto a faixa aparece; com som, quem manda e o player.
  useEffect(() => {
    const v = video.current;
    if (!v || comSom) return;
    v.muted = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [comSom]);

  function tocarComSom() {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    setComSom(true);
    v.play().catch(() => {
      v.muted = true;
      setComSom(false);
    });
  }

  function voltarAoLoop() {
    if (video.current) video.current.muted = true;
    setComSom(false);
  }

  return (
    <div className="tm-oraculo">
      <div>
        <span className="rotulo tm-oraculo-rotulo">Novo · Oráculo IA</span>
        <h2 className="tm-h2">Pergunte. O Oráculo responde com os seus números.</h2>
        <p className="tm-lead">
          A diretoria escreve como falaria com alguém do time e recebe a
          resposta com os dados do próprio sistema, sempre mostrando de onde
          veio cada número. Nada de palpite.
        </p>
        <ul className="tm-oraculo-pontos">
          {PONTOS.map((p) => (
            <li key={p.titulo}>
              <strong>{p.titulo}</strong>
              <p>{p.texto}</p>
            </li>
          ))}
        </ul>
        <p className="tm-oraculo-nota">Vem no plano Oráculo IA, o degrau acima do Inteligência.</p>
      </div>

      <figure className="tm-tela tm-video">
        <div className="tm-video-quadro">
          <video
            ref={video}
            src={`${VIDEO}/oraculo.mp4`}
            poster={`${VIDEO}/oraculo-capa.jpg`}
            controls={comSom}
            loop={!comSom}
            muted
            onEnded={voltarAoLoop}
            playsInline
            preload="none"
            aria-label="Vídeo de apresentação do Oráculo, sem som até o clique"
          />
          {!comSom && (
            <button type="button" className="tm-video-play" onClick={tocarComSom}>
              <span className="btn tm-video-pilula">
                <Volume2 size={20} aria-hidden />
                Assistir com som
              </span>
            </button>
          )}
        </div>
        <figcaption>Telas do sistema com dados de exemplo. Pouco mais de 2 minutos.</figcaption>
      </figure>
    </div>
  );
}
