"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Faixa do Oraculo IA: o degrau acima do Inteligencia (src/lib/planos.ts no
 * repo do app, PLANOS.oraculo).
 *
 * O video e o mesmo da vitrine do Oraculo dentro do app (video-oraculo.tsx),
 * no bucket publico "site" do Supabase: trocar e subir por cima, com o mesmo
 * nome. preload="none" nao baixa os 21 MB de quem so rola a pagina, e a capa
 * segura o quadro 16:9 ate o clique. A capa inteira e o botao (mesma camada do
 * video do hero): clicar em qualquer parte toca ali mesmo, com som, e so entao
 * aparecem os controles nativos.
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
  const [tocando, setTocando] = useState(false);

  function tocar() {
    setTocando(true);
    video.current?.play().catch(() => setTocando(false));
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
            controls={tocando}
            playsInline
            preload="none"
            aria-label="Vídeo de apresentação do Oráculo"
          />
          {!tocando && (
            <button type="button" className="tm-video-play" onClick={tocar}>
              <span className="btn tm-video-pilula">
                <Play size={20} className="tm-video-play-icone" aria-hidden />
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
