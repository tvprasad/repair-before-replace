import { HelpCircle } from "lucide-react";

export function ClarifyQuestion({ question }: { question: string }) {
  return (
    <div className="bg-[#0a0a0a] border border-border-subtle rounded-2xl p-6 my-6 flex gap-4 items-start shadow-sm">
      <div className="bg-surface border border-border-subtle p-2 rounded-full text-primary-500 shrink-0">
        <HelpCircle size={24} />
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">I need a bit more info</h4>
        <p className="text-slate-300">{question}</p>
      </div>
    </div>
  );
}
