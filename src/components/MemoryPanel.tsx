import { Clock, History, Sparkles } from "lucide-react";
import type { RepairMemory } from "../types/assessment";

function dedupeAndRank(memories: RepairMemory[], currentCategory?: string): {
  entries: RepairMemory[];
  highlightIndex: number;
} {
  // Drop all "pending / Initial assessment" entries — they are auto-generated noise
  const meaningful = memories.filter(
    (m) => !(m.outcome === "pending" && m.notes === "Initial assessment")
  );

  // Dedupe by content fingerprint — keep only the most recent of each identical entry
  // (handles seed script run multiple times or duplicate Backboard records)
  const fingerprints = new Map<string, RepairMemory>();
  for (const m of meaningful) {
    const key = `${m.item_category}|${m.decision}|${m.outcome}|${(m.notes ?? "").slice(0, 60)}`;
    const existing = fingerprints.get(key);
    if (!existing || new Date(m.attempt_date) > new Date(existing.attempt_date)) {
      fingerprints.set(key, m);
    }
  }

  const deduped = Array.from(fingerprints.values());

  // Sort: same category first, then date descending
  const sorted = [...deduped].sort((a, b) => {
    const aMatch = currentCategory && a.item_category === currentCategory ? -1 : 0;
    const bMatch = currentCategory && b.item_category === currentCategory ? -1 : 0;
    if (aMatch !== bMatch) return aMatch - bMatch;
    return new Date(b.attempt_date).getTime() - new Date(a.attempt_date).getTime();
  });

  const entries = sorted.slice(0, 5);

  // Highlight the first non-pending same-category entry — most likely referenced by Gemini
  const highlightIndex = entries.findIndex(
    (m) => m.outcome !== "pending" && (!currentCategory || m.item_category === currentCategory)
  );

  return { entries, highlightIndex };
}

export function MemoryPanel({
  memories,
  currentCategory,
}: {
  memories: RepairMemory[];
  currentCategory?: string;
}) {
  if (!memories?.length) return null;

  const { entries, highlightIndex } = dedupeAndRank(memories, currentCategory);
  if (!entries.length) return null;

  return (
    <div className="bg-[#0a0a0a] rounded-3xl p-8 border border-border-subtle mt-10 mb-6 shadow-inner">
      <h3 className="text-xl font-bold flex items-center gap-2 text-white mb-6">
        <History className="text-primary-500" /> Past Repair History
      </h3>
      <div className="space-y-4">
        {entries.map((m, i) => (
          <div
            key={i}
            className={`bg-surface p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-transform hover:-translate-y-0.5 ${
              i === highlightIndex
                ? "border-amber-700/60 shadow-amber-900/20"
                : "border-border-subtle"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-400 bg-primary-900/20 px-2.5 py-1 rounded-md border border-primary-900/50">
                  {m.item_category}
                </span>
                {i === highlightIndex && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-900/20 px-2.5 py-1 rounded-md border border-amber-800/50 flex items-center gap-1">
                    <Sparkles size={10} /> Used in recommendation
                  </span>
                )}
              </div>
              <p className="font-bold text-white text-base">
                <span className="capitalize">{m.decision.replace("_", " ")}</span>
                {" · "}
                <span
                  className={
                    m.outcome === "success"
                      ? "text-green-400"
                      : m.outcome === "failed"
                      ? "text-red-400"
                      : "text-amber-400"
                  }
                >
                  {m.outcome}
                </span>
              </p>
              {m.notes && m.notes !== "Initial assessment" && (
                <p className="text-sm text-slate-400 mt-1.5">{m.notes}</p>
              )}
              {m.user_preferences?.length > 0 && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {m.user_preferences.map((pref, j) => (
                    <span
                      key={j}
                      className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5 shrink-0 bg-[#0a0a0a] px-3 py-1.5 rounded-lg border border-border-subtle">
              <Clock size={14} /> {new Date(m.attempt_date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
