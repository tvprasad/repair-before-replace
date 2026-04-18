import { CheckCircle, AlertTriangle, XCircle, Hammer, Info } from "lucide-react";
import type { AssessmentResult } from "../types/assessment";

export function DecisionCard({ result }: { result: AssessmentResult }) {
  const isSafe = result.safe_to_attempt_at_home;
  
  const getActionColor = (action: string) => {
    switch (action) {
      case "repair": return "text-success-600 bg-success-50 border-success-200";
      case "patch": return "text-warning-600 bg-warning-50 border-warning-200";
      case "replace_responsibly": return "text-danger-600 bg-danger-50 border-danger-200";
      default: return "text-slate-600 bg-slate-50 border-slate-200";
    }
  };

  const actionLabels = {
    repair: "Repair",
    patch: "Patch",
    replace_responsibly: "Replace Responsibly"
  };

  const actionText = actionLabels[result.recommended_action as keyof typeof actionLabels] || result.recommended_action;

  return (
    <div className="bg-surface rounded-3xl shadow-2xl border border-border-subtle overflow-hidden mb-8 transform transition-all hover:shadow-primary-500/10">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#0a0a0a] text-slate-300 mb-3 uppercase tracking-wider border border-border-subtle">
              {result.item_category}
            </span>
            <h2 className="text-3xl font-bold text-white">Assessment</h2>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-500 block mb-1">Confidence</span>
            <span className={`inline-flex items-center gap-1 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider
              ${result.confidence_level === 'high' ? 'bg-success-100 text-success-700' : 
                result.confidence_level === 'moderate' ? 'bg-warning-100 text-warning-700' : 
                'bg-danger-100 text-danger-700'}`}>
              {result.confidence_level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#0a0a0a] rounded-2xl p-6 border border-border-subtle">
            <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
              <Info size={16} /> Visible Damage
            </h4>
            <p className="text-slate-300 leading-relaxed">{result.visible_damage}</p>
          </div>
          
          <div className={`rounded-2xl p-6 border ${isSafe ? 'bg-success-50 border-success-200' : 'bg-danger-50 border-danger-200'}`}>
            <h4 className={`text-xs font-bold mb-3 uppercase tracking-wider flex items-center gap-2 ${isSafe ? 'text-success-500' : 'text-danger-500'}`}>
              {isSafe ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
              Safety Check
            </h4>
            <p className={`leading-relaxed ${isSafe ? 'text-success-600' : 'text-danger-600'}`}>
              {isSafe ? "Safe to attempt at home. Proceed with standard precautions." : "Not safe to attempt at home. Professional help recommended."}
            </p>
          </div>
        </div>

        <div className={`rounded-2xl p-6 border flex items-center gap-6 ${getActionColor(result.recommended_action)}`}>
          <div className="bg-[#0a0a0a] p-4 rounded-full shadow-sm border border-border-subtle">
            {result.recommended_action === "repair" ? <Hammer size={32} /> : 
             result.recommended_action === "patch" ? <CheckCircle size={32} /> : 
             <XCircle size={32} />}
          </div>
          <div>
            <h4 className="text-xs font-bold opacity-70 uppercase tracking-wider mb-1">Recommended Action</h4>
            <span className="text-3xl font-extrabold tracking-tight">{actionText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
