export type ImpactBandType = "low" | "moderate" | "high";

export const IMPACT_BANDS: Record<ImpactBandType, { label: string; colorClass: string; iconColor: string }> = {
  low: {
    label: "Likely low replacement impact",
    colorClass: "bg-emerald-950/40 text-emerald-300 border-emerald-800",
    iconColor: "text-emerald-400"
  },
  moderate: {
    label: "Moderate waste avoided by repair",
    colorClass: "bg-amber-950/40 text-amber-300 border-amber-800",
    iconColor: "text-amber-400"
  },
  high: {
    label: "High waste avoided if repaired successfully",
    colorClass: "bg-indigo-950/40 text-indigo-300 border-indigo-800",
    iconColor: "text-indigo-400"
  }
};
