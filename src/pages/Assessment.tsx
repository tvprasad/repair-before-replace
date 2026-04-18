import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useRepairUser } from "../hooks/useRepairUser";
import { AppHeader } from "../components/AppHeader";
import type { AssessmentResult, RepairMemory } from "../types/assessment";
import { analyzeDamage } from "../services/gemini";
import { addRepairMemory, getRepairHistory } from "../services/backboard";
import { ClarifyQuestion } from "../components/ClarifyQuestion";
import { DecisionCard } from "../components/DecisionCard";
import { ImpactBand } from "../components/ImpactBand";
import { RepairSteps } from "../components/RepairSteps";
import { MemoryPanel } from "../components/MemoryPanel";
import { WhyThisRecommendation } from "../components/WhyThisRecommendation";
import { Footer } from "../components/Footer";

export function Assessment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { sub, isAuthenticated } = useRepairUser();
  
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");
  const [priorMemories, setPriorMemories] = useState<RepairMemory[]>([]);

  useEffect(() => {
    if (!state?.imageBase64 || !state?.category) {
      navigate("/");
      return;
    }

    const runAssessment = async () => {
      try {
        const history = await getRepairHistory(sub);
        setPriorMemories(history);

        const assessment = await analyzeDamage(
          state.imageBase64, 
          state.mimeType, 
          state.category, 
          sub
        );
        
        setResult(assessment);

        // Save to Backboard if no clarifying question and we have a decision
        if (isAuthenticated && sub && !assessment.clarifying_question) {
          await addRepairMemory(sub, {
            item_category: state.category,
            photo_description: assessment.visible_damage,
            decision: assessment.recommended_action,
            user_preferences: [], 
            outcome: "pending",
            attempt_date: new Date().toISOString(),
            notes: "Initial assessment"
          });
        }
      } catch (err: any) {
        setError(err.message || "Failed to analyze image");
      } finally {
        setLoading(false);
      }
    };

    runAssessment();
  }, [state, navigate, isAuthenticated, sub]);

  if (loading) {
    return (
      <div
        role="status"
        aria-label="Analyzing damage, please wait"
        className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-[100px] animate-pulse motion-reduce:animate-none" aria-hidden="true"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center mb-8" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary-500 animate-[spin_1.5s_linear_infinite] motion-reduce:animate-none"></div>
            <div className="absolute inset-2 rounded-full border-r-2 border-primary-400 animate-[spin_2s_linear_infinite_reverse] motion-reduce:animate-none"></div>
            <div className="absolute inset-4 rounded-full border-b-2 border-primary-300 animate-[spin_3s_linear_infinite] motion-reduce:animate-none"></div>
            <Loader2 className="text-primary-500 animate-pulse motion-reduce:animate-none" size={32} />
          </div>

          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">Analyzing damage...</h2>
          <div className="flex gap-3 items-center text-slate-300 font-medium bg-[#141414] px-6 py-3 rounded-full border border-border-subtle shadow-[0_0_20px_rgba(139,92,246,0.1)]">
            <span className="relative flex h-3 w-3" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75 motion-reduce:animate-none"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"></span>
            </span>
            Checking safety &amp; circularity impact
          </div>
        </div>
      </div>
    );
  }

  if (error || !result) {
    const isQuota = error === "QUOTA_EXCEEDED";
    const headline = isQuota ? "Assessment limit reached" : "Assessment unavailable";
    const detail = isQuota
      ? "The free analysis quota has been reached. Please try again in a minute or two."
      : "Something went wrong analyzing your photo. Please try again with a clearer image.";

    return (
      <div className="min-h-screen bg-[#0a0a0a] py-10 px-4 sm:px-6 font-sans text-slate-100">
        <div className="max-w-3xl mx-auto">
          <AppHeader backLabel="Start Over" backTo="/" />
          <div className="flex items-center justify-center mt-16">
            <div className="bg-surface p-10 rounded-3xl shadow-xl border border-border-subtle text-center max-w-md animate-fade-in-up">
              <p className="text-white font-bold mb-3 text-xl">{headline}</p>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">{detail}</p>
              <button onClick={() => navigate("/")} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4 sm:px-6 font-sans text-slate-100">
      <div className="max-w-3xl mx-auto animate-fade-in-up">
        <AppHeader backLabel="Start Over" backTo="/" />

        {result.clarifying_question ? (
          <div className="bg-surface p-8 rounded-3xl shadow-xl border border-border-subtle">
            <ClarifyQuestion question={result.clarifying_question} />
            <button onClick={() => navigate("/")} className="bg-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-700 w-full sm:w-auto shadow-md shadow-primary-500/20">
              Provide more info / New photo
            </button>
          </div>
        ) : (
          <>
            <DecisionCard result={result} />
            {result.why_this_recommendation && (
              <WhyThisRecommendation reason={result.why_this_recommendation} />
            )}
            <ImpactBand
              type={result.impact_band}
              explanation={result.impact_explanation}
              greener={result.why_this_is_greener}
            />
            <RepairSteps steps={result.repair_steps} materials={result.materials_needed} />
            <MemoryPanel memories={priorMemories} currentCategory={state?.category} />
          </>
        )}
        <Footer />
      </div>
    </div>
  );
}
