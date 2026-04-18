import { Lightbulb } from "lucide-react";

export function WhyThisRecommendation({ reason }: { reason: string }) {
  return (
    <div className="bg-[#141414] border border-amber-800/50 rounded-2xl p-5 my-6 flex gap-4 items-start">
      <div className="bg-amber-950/50 p-2 rounded-full shrink-0 mt-0.5">
        <Lightbulb className="text-amber-400" size={18} />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
          Why this recommendation
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">{reason}</p>
      </div>
    </div>
  );
}
