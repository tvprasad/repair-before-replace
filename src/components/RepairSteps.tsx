import { CheckSquare, Wrench } from "lucide-react";

export function RepairSteps({ steps, materials }: { steps: string[], materials: string[] }) {
  if (!steps?.length && !materials?.length) return null;

  return (
    <div className="bg-surface rounded-3xl shadow-2xl border border-border-subtle p-8 mb-8">
      {materials?.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold flex items-center gap-3 mb-5 text-white">
            <div className="p-2 bg-[#0a0a0a] text-primary-500 rounded-lg border border-border-subtle"><Wrench size={20} /></div> 
            Materials Needed
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {materials.map((m, i) => (
              <li key={i} className="flex items-center gap-3 bg-[#0a0a0a] p-4 rounded-2xl border border-border-subtle text-slate-300 font-medium">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {steps?.length > 0 && (
        <div>
          <h3 className="text-xl font-bold flex items-center gap-3 mb-6 text-white">
            <div className="p-2 bg-[#0a0a0a] text-primary-500 rounded-lg border border-border-subtle"><CheckSquare size={20} /></div>
            Step-by-Step Guide
          </h3>
          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 items-start group">
                <div className="w-10 h-10 rounded-xl bg-[#0a0a0a] text-slate-400 border border-border-subtle font-bold flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                  {i + 1}
                </div>
                <p className="text-slate-300 leading-relaxed pt-1.5 text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
