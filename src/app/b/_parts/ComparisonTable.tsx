import { Check, Sparkles, X } from "lucide-react";

const CMP: [string, string, string][] = [
  ["Visibilidade do resultado", "No fim do mês", "Em tempo real"],
  ["Follow-up de candidatos", "Manual, esquecível", "Automático, cobrado"],
  ["Reconhecimento da equipe", "Inexistente", "Celebrado no grupo + ranking"],
  ["Fonte da verdade", "Planilhas soltas", "Um sistema, permissão na raiz"],
  ["Tempo de implantação", "Não tem", "72 horas"],
  ["Scripts de venda", "Cada um inventa o seu", "Gerados por IA por candidato"],
];

export function ComparisonTable() {
  return (
    <div className="cmp-table border border-[var(--border)] rounded-[20px] overflow-hidden text-[15px]">
      <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-[var(--surface-container-low)] border-b border-[var(--border)]">
        <div className="px-[22px] py-[18px] font-bold text-[var(--on-surface-variant)] text-[13px] uppercase tracking-[0.08em]">
          Recurso
        </div>
        <div className="px-[22px] py-[18px] font-bold text-[var(--muted-foreground)] flex items-center gap-2">
          <X size={15} /> Planilha + Zap
        </div>
        <div className="px-[22px] py-[18px] font-extrabold text-[var(--primary)] bg-[var(--primary)]/[0.06] flex items-center gap-2">
          <Sparkles size={15} fill="currentColor" strokeWidth={0} /> Team Manager
        </div>
      </div>
      {CMP.map((r, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1.3fr_1fr_1fr] ${i < CMP.length - 1 ? "border-b border-[var(--border)]/60" : ""}`}
        >
          <div className="px-[22px] py-[18px] font-semibold">{r[0]}</div>
          <div className="px-[22px] py-[18px] text-[var(--muted-foreground)]">{r[1]}</div>
          <div className="px-[22px] py-[18px] bg-[var(--primary)]/[0.05] flex gap-2.5 font-semibold">
            <Check size={17} strokeWidth={2.6} className="text-[var(--success)] flex-shrink-0 mt-px" />
            {r[2]}
          </div>
        </div>
      ))}
    </div>
  );
}
