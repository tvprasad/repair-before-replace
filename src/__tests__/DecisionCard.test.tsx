import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DecisionCard } from '../components/DecisionCard';

describe('DecisionCard', () => {
  it('renders correct accent color per recommended_action', () => {
    const mockResult = {
      item_category: "Furniture",
      visible_damage: "Scratch",
      confidence_level: "high" as const,
      safe_to_attempt_at_home: true,
      recommended_action: "patch" as const,
      clarifying_question: null,
      repair_steps: [],
      materials_needed: [],
      impact_band: "low" as const,
      impact_explanation: "Test",
      why_this_is_greener: "Test"
    };

    render(<DecisionCard result={mockResult} />);
    
    expect(screen.getByText('Patch')).toBeInTheDocument();
  });
});
