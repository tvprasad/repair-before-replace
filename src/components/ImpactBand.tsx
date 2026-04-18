import { IMPACT_BANDS } from "../data/impactBands";
import type { ImpactBandType } from "../data/impactBands";
import { Leaf } from "lucide-react";

export function ImpactBand({ type, explanation, greener }: { type: ImpactBandType, explanation: string, greener: string }) {
  const band = IMPACT_BANDS[type] || IMPACT_BANDS.moderate;
  
  return (
    <div className={`rounded-3xl p-8 border ${band.colorClass} shadow-sm my-8`}>
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-[#0a0a0a] p-3 rounded-full shadow-sm border border-border-subtle">
          <Leaf className={band.iconColor} size={28} />
        </div>
        <h3 className="font-bold text-xl text-white">{band.label}</h3>
      </div>
      <p className="opacity-90 mb-5 text-lg leading-relaxed text-slate-300">{explanation}</p>
      <div className="bg-[#0a0a0a] rounded-2xl p-5 text-sm font-medium border border-border-subtle shadow-inner">
        <strong className="block mb-1 opacity-70 uppercase tracking-wider text-xs text-slate-400">Why this is greener</strong>
        <span className="text-base text-slate-200">{greener}</span>
      </div>
    </div>
  );
}
