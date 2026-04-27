import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const PAINS = [
  { text: "Você sabe o resultado do mês só quando o mês acabou.", emphasis: true },
  { text: "Tem assessor que some por dois dias e você descobre na reunião de sexta.", emphasis: true },
  { text: "Seu time não tem problema com meta — tem problema com ser visto. E esse assessor saiu mês passado.", emphasis: false },
  { text: "Você passa segunda de manhã reconstruindo o que aconteceu na semana — de memória, com números errados.", emphasis: true },
  { text: "Cada unidade tem uma planilha diferente. Nenhuma tem a mesma coluna.", emphasis: false },
  { text: "O follow-up depende de o assessor lembrar. O assessor esquece. O lead some.", emphasis: false },
];

export function Problem() {
  return (
    <section id="problema" className="section-y bg-[var(--surface)] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          pill="O Problema"
          pillTone="destructive"
          title="Reconhece algum desses?"
          align="left"
        />

        <Stagger>
          <ul className="space-y-7">
            {PAINS.map((p, i) => (
              <StaggerItem
                key={i}
                as="li"
                className={`flex gap-5 text-lg md:text-xl leading-relaxed ${
                  p.emphasis ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]"
                }`}
              >
                <span
                  className={`flex-shrink-0 mt-1 w-7 h-7 rounded-full text-xs flex items-center justify-center font-bold ${
                    p.emphasis
                      ? "bg-[var(--destructive)]/10 text-[var(--destructive)]"
                      : "bg-[var(--surface-container)] text-[var(--on-surface-variant)]"
                  }`}
                >
                  {i + 1}
                </span>
                <span>{p.text}</span>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-20 p-10 md:p-12 rounded-3xl border border-[var(--destructive)]/15 bg-[var(--destructive)]/[0.04]">
            <p className="text-xl md:text-3xl font-bold leading-snug text-[var(--foreground)]">
              Se você precisa <span className="italic">perguntar</span> pra saber o
              que aconteceu, você não está gerenciando.{" "}
              <span className="text-[var(--destructive)]">Está investigando.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
