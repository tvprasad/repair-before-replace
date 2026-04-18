import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ImpactBand } from '../components/ImpactBand';

describe('ImpactBand', () => {
  it('renders correct label per impact_band value', () => {
    render(<ImpactBand type="low" explanation="Low impact" greener="Saves trees" />);
    
    // Low corresponds to "Likely low replacement impact"
    expect(screen.getByText(/Likely low replacement impact/i)).toBeInTheDocument();
  });
});
