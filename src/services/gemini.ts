import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { Schema } from "@google/generative-ai";
import type { AssessmentResult } from "../types/assessment";
import { searchRepairHistory } from './backboard';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

const assessmentSchema: Schema = {
  type: SchemaType.OBJECT,
  properties: {
    item_category: { type: SchemaType.STRING },
    visible_damage: { type: SchemaType.STRING },
    confidence_level: { type: SchemaType.STRING, format: "enum", enum: ["high", "moderate", "low"] },
    safe_to_attempt_at_home: { type: SchemaType.BOOLEAN },
    recommended_action: { type: SchemaType.STRING, nullable: true, format: "enum", enum: ["repair", "patch", "replace_responsibly"] },
    clarifying_question: { type: SchemaType.STRING, nullable: true },
    repair_steps: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    materials_needed: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    impact_band: { type: SchemaType.STRING, format: "enum", enum: ["low", "moderate", "high"] },
    impact_explanation: { type: SchemaType.STRING },
    why_this_is_greener: { type: SchemaType.STRING },
    why_this_recommendation: { type: SchemaType.STRING, nullable: true },
  },
  required: [
    "item_category",
    "visible_damage",
    "confidence_level",
    "safe_to_attempt_at_home",
    "repair_steps",
    "materials_needed",
    "impact_band",
    "impact_explanation",
    "why_this_is_greener"
  ],
};

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: assessmentSchema,
  },
});

export async function analyzeDamage(
  imageBase64: string,
  mimeType: string,
  category: string,
  userId: string
): Promise<AssessmentResult> {
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined");
  }

  const priorHistory = await searchRepairHistory(userId, category, 5);

  const prompt = `You are a household repair assessment assistant.
Respond ONLY with valid JSON matching the provided schema.
Do not add commentary outside the JSON.

User has categorized this item as: ${category}
Scope boundary: You can only analyze Furniture, Clothing & Textiles, and Cosmetic Appliance Damage.
If the item is outside scope (not furniture, clothing/textiles, or cosmetic appliance damage), set recommended_action to null and set visible_damage to 'Item outside supported categories.'
Ask at most one clarifying_question. If none needed, set to null.

Analyze the provided image to assess damage.

Prior repair attempts for this user: ${JSON.stringify(priorHistory)}

If prior history is relevant, populate 'why_this_recommendation' with 1-2 sentences explaining why this path was chosen, explicitly referencing the prior history.
Examples:
- "A similar heat-mark treatment worked for you before without abrasives, so this starts with low-intervention restoration."
- "Your previous glue-only patch failed after washing, so this recommendation uses hand stitching instead."
- "You've had success with wood glue and no power tools — the same approach applies here."
If no prior history is relevant, set why_this_recommendation to null.`;

  const imagePart = {
    inlineData: {
      data: imageBase64,
      mimeType,
    },
  };

  let result;
  try {
    result = await model.generateContent([prompt, imagePart]);
  } catch (err: any) {
    const msg: string = err?.message ?? "";
    if (msg.includes("429") || msg.includes("quota")) {
      throw new Error("QUOTA_EXCEEDED");
    }
    throw new Error("GEMINI_UNAVAILABLE");
  }

  const responseText = result.response.text();
  try {
    return JSON.parse(responseText) as AssessmentResult;
  } catch {
    throw new Error("GEMINI_PARSE_ERROR");
  }
}
