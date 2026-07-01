import Image from "next/image";
import { Check } from "lucide-react";
import { Reveal } from "@/app/_components/Reveal";

type FeatureRowData = {
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
};

const navy = "var(--primary)";

export function FeatureRow({ f, reversed }: { f: FeatureRowData; reversed: boolean }) {
  return (
    <Reveal delay={0.04}>
      <div
        className={`feat-row grid gap-12 items-center ${reversed ? "rev" : ""}`}
        style={{ gridTemplateColumns: reversed ? "1fr 1.05fr" : "1.05fr 1fr" }}
      >
        <div style={{ order: reversed ? 2 : 1 }}>
          <span
            style={{ color: navy }}
            className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[0.12em] uppercase"
          >
            {f.eyebrow}
          </span>
          <h3 className="font-[var(--font-heading)] font-extrabold text-[clamp(24px,3vw,34px)] tracking-[-0.025em] my-3.5 leading-[1.15]">
            {f.title}
          </h3>
          <p className="text-[16.5px] text-[var(--muted-foreground)] leading-relaxed mb-5">{f.desc}</p>
          <ul className="list-none p-0 m-0 flex flex-col gap-3">
            {f.bullets.map((b, j) => (
              <li key={j} className="flex gap-3 text-[15.5px]">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--success)]/[0.14] text-[var(--success)] inline-flex items-center justify-center">
                  <Check size={14} strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="feat-img" style={{ order: reversed ? 1 : 2 }}>
          <div className="winframe rounded-2xl overflow-hidden border border-[var(--border)] bg-white relative aspect-[16/9.2]">
            <Image src={f.img} alt={f.eyebrow} fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover object-top" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export type { FeatureRowData };
