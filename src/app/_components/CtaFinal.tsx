import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";

export function CtaFinal() {
  return (
    <section className="section-y hero-gradient">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl mb-12 leading-[1.12]">
          Você vai sair daqui do mesmo jeito.{" "}
          <span className="text-white/40">Ou não.</span>
        </h2>

        <div className="space-y-6 text-base md:text-lg text-white/80 mb-14 leading-relaxed">
          <p>
            Você pode continuar gerenciando pelo WhatsApp, reconstruindo números
            às segundas e esperando que o assessor lembre do follow-up.
          </p>
          <p>
            Ou você pode ser o gestor que não precisa cobrar porque o sistema
            cobra. Que não precisa celebrar porque o grupo já celebrou. Que não
            precisa investigar porque já sabe.
          </p>
          <p className="text-white text-xl md:text-2xl font-bold pt-6">
            Não é uma escolha de software.
            <br />
            É uma escolha sobre o tipo de gestor que você quer ser.
          </p>
        </div>

        <Link
          href="/diagnostico"
          className="btn-primary text-base md:text-lg px-10 py-5"
        >
          Ativar o Team Manager — garantia de 30 dias
          <ArrowRight size={18} />
        </Link>

        <p className="mt-8 text-sm text-white/55 flex items-center justify-center gap-2 max-w-md mx-auto">
          <Shield size={14} className="flex-shrink-0" />
          Se em 30 dias você não enxergar diferença no follow-up de candidatos
          e na visibilidade de matrícula da rede, devolução integral. Sem
          perguntas.
        </p>
      </div>
    </section>
  );
}
