import { ITEM_CATEGORIES } from "../data/categories";

export function CategoryChips({ selected, onChange }: { selected: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center my-6">
      {ITEM_CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
            selected === cat 
            ? "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)] transform scale-105" 
            : "bg-surface text-slate-300 border-border-subtle hover:border-primary-500 hover:bg-[#0a0a0a] hover:-translate-y-0.5"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
