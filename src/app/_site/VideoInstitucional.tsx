"use client";

import { useEffect, useRef } from "react";
import { Volume2, X } from "lucide-react";

/**
 * O institucional no lugar do print do hero.
 *
 * Duas fontes de proposito: o loop mudo (720p, sem audio, ~6 MB) toca sozinho
 * no hero, e o completo (1080p com som, ~22 MB) so baixa quando a pessoa pede
 * para ouvir. As legendas estao gravadas no video, entao o loop se entende
 * sem som. Sem poster de proposito: abre direto no video. Com
 * prefers-reduced-motion o loop nao toca e fica o primeiro quadro.
 *
 * "Ouvir" abre um dialog de tela inteira e pede fullscreen do navegador. Sair
 * do fullscreen (Esc) fecha o dialog junto; no iPhone, que nao faz fullscreen
 * de elemento, o dialog ja ocupa a tela e o X fecha.
 */
export function VideoInstitucional() {
  const loop = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  function tocarLoop() {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loop.current?.play().catch(() => {});
    }
  }

  useEffect(tocarLoop, []);

  function abrir() {
    dialog.current?.showModal();
    loop.current?.pause();
    player.current?.play().catch(() => {});
    dialog.current?.requestFullscreen?.().catch(() => {});
  }

  function fechar() {
    player.current?.pause();
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    if (dialog.current?.open) dialog.current.close();
  }

  useEffect(() => {
    const saiuDoFullscreen = () => {
      if (!document.fullscreenElement && dialog.current?.open) fechar();
    };
    document.addEventListener("fullscreenchange", saiuDoFullscreen);
    return () => document.removeEventListener("fullscreenchange", saiuDoFullscreen);
  }, []);

  return (
    <figure className="tm-tela tm-video">
      <div className="tm-video-quadro">
        <video
          ref={loop}
          src="/video/institucional-loop.mp4"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Vídeo institucional do Team Manager, sem som"
        />
        <button type="button" className="btn tm-btn-sm tm-video-ouvir" onClick={abrir}>
          <Volume2 size={18} aria-hidden />
          Ouvir o vídeo
        </button>
      </div>
      <figcaption>
        Telas reais do sistema. Em 3 minutos, do lead na rua ao dinheiro no caixa.
      </figcaption>

      <dialog
        ref={dialog}
        className="tm-video-dialog"
        aria-label="Vídeo institucional do Team Manager"
        onClose={() => {
          player.current?.pause();
          tocarLoop();
        }}
      >
        <button type="button" className="tm-video-fechar" onClick={fechar} aria-label="Fechar o vídeo">
          <X size={24} aria-hidden />
        </button>
        <video
          ref={player}
          src="/video/institucional.mp4"
          controls
          playsInline
          preload="none"
        />
      </dialog>
    </figure>
  );
}
