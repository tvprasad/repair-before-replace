import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeDamage } from '../services/gemini';

vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: class {
      getGenerativeModel() {
        return {
          generateContent: vi.fn().mockResolvedValue({
            response: {
              text: () => JSON.stringify({
                item_category: "Furniture",
                visible_damage: "Scratch on surface",
                confidence_level: "high",
                safe_to_attempt_at_home: true,
                recommended_action: "repair",
                clarifying_question: null,
                repair_steps: ["Step 1"],
                materials_needed: ["Wood filler"],
                impact_band: "low",
                impact_explanation: "Low impact",
                why_this_is_greener: "Saves wood"
              })
            }
          })
        };
      }
    },
    SchemaType: { OBJECT: 'OBJECT', STRING: 'STRING', BOOLEAN: 'BOOLEAN', ARRAY: 'ARRAY' }
  };
});

vi.mock('../services/backboard', () => ({
  searchRepairHistory: vi.fn().mockResolvedValue([])
}));

describe('analyzeDamage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a valid AssessmentResult matching the schema', async () => {
    const result = await analyzeDamage('base64', 'image/jpeg', 'Furniture', 'user123');
    
    expect(result).toHaveProperty('item_category', 'Furniture');
    expect(result).toHaveProperty('visible_damage');
    expect(result).toHaveProperty('confidence_level', 'high');
    expect(result).toHaveProperty('safe_to_attempt_at_home', true);
    expect(result).toHaveProperty('recommended_action', 'repair');
    expect(result).toHaveProperty('clarifying_question', null);
    expect(result).toHaveProperty('repair_steps');
    expect(result.repair_steps).toBeInstanceOf(Array);
    expect(result).toHaveProperty('materials_needed');
    expect(result.materials_needed).toBeInstanceOf(Array);
    expect(result).toHaveProperty('impact_band', 'low');
    expect(result).toHaveProperty('impact_explanation');
    expect(result).toHaveProperty('why_this_is_greener');
  });
});
