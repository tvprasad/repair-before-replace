import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, History as HistoryIcon } from "lucide-react";
import { getRepairHistory } from "../services/backboard";
import type { RepairMemory } from "../types/assessment";
import { MemoryPanel } from "../components/MemoryPanel";
import { useRepairUser } from "../hooks/useRepairUser";
import { AppHeader } from "../components/AppHeader";
import { Footer } from "../components/Footer";

export function History() {
  const { sub, isAuthenticated, isLoading } = useRepairUser();
  const navigate = useNavigate();
  const [memories, setMemories] = useState<RepairMemory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
      return;
    }
    if (isAuthenticated && sub) {
      getRepairHistory(sub).then(data => {
        setMemories(data);
        setLoading(false);
      });
    }
  }, [isAuthenticated, isLoading, sub, navigate]);

  if (isLoading || loading) {
    return (
      <div role="status" aria-label="Loading repair history" className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="animate-spin motion-reduce:animate-none text-primary-600" size={48} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4 sm:px-6 font-sans text-slate-100">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <AppHeader backLabel="Back to Home" backTo="/" />

        <div className="bg-surface rounded-3xl p-8 sm:p-10 shadow-2xl border border-border-subtle">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-3 tracking-tight">
            <HistoryIcon className="text-primary-500" size={32} /> Your Repair Journey
          </h2>
          <p className="text-slate-400 mb-8 text-lg">A look back at all the items you've assessed and repaired.</p>

          {memories.length > 0 ? (
            <MemoryPanel memories={memories} />
          ) : (
            <div className="text-center py-16 bg-[#0a0a0a] rounded-3xl border border-border-subtle border-dashed">
              <HistoryIcon size={48} className="mx-auto text-slate-600 mb-4" />
              <p className="text-slate-300 font-medium text-lg">No repair history found yet.</p>
              <p className="text-slate-500 mt-2">Start by assessing your first item.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
