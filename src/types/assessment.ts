export interface AssessmentResult {
  item_category: string;
  visible_damage: string;
  confidence_level: "high" | "moderate" | "low";
  safe_to_attempt_at_home: boolean;
  recommended_action: "repair" | "patch" | "replace_responsibly";
  clarifying_question: string | null;
  repair_steps: string[];
  materials_needed: string[];
  impact_band: "low" | "moderate" | "high";
  impact_explanation: string;
  why_this_is_greener: string;
  why_this_recommendation?: string;
}

export interface RepairMemory {
  item_id?: string;
  item_category: string;
  photo_description: string;
  decision: "repair" | "patch" | "replace_responsibly";
  user_preferences: string[];
  outcome: "success" | "failed" | "pending";
  attempt_date: string;
  notes: string;
}
