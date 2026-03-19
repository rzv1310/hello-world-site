import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { calculateAuditRequirement } from '@/data/calculator';
import AuditCalculator from '../AuditCalculator';

// --- Unit tests for pure calculateAuditRequirement() ---

describe('calculateAuditRequirement', () => {
  // All 3 criteria met → required
  it('returns required when all 3 criteria are met', () => {
    expect(calculateAuditRequirement(20_000_000, 40_000_000, 60)).toBe('required');
  });

  // 2-criteria combinations → required
  it('returns required when assets and turnover exceed thresholds', () => {
    expect(calculateAuditRequirement(20_000_000, 40_000_000, 10)).toBe('required');
  });

  it('returns required when assets and employees exceed thresholds', () => {
    expect(calculateAuditRequirement(20_000_000, 1_000_000, 60)).toBe('required');
  });

  it('returns required when turnover and employees exceed thresholds', () => {
    expect(calculateAuditRequirement(1_000_000, 40_000_000, 60)).toBe('required');
  });

  // 1-criterion combinations → not_required
  it('returns not_required when only assets exceed threshold', () => {
    expect(calculateAuditRequirement(20_000_000, 1_000_000, 10)).toBe('not_required');
  });

  it('returns not_required when only turnover exceeds threshold', () => {
    expect(calculateAuditRequirement(1_000_000, 40_000_000, 10)).toBe('not_required');
  });

  it('returns not_required when only employees exceed threshold', () => {
    expect(calculateAuditRequirement(1_000_000, 1_000_000, 60)).toBe('not_required');
  });

  // No criteria → not_required
  it('returns not_required when no criteria are met', () => {
    expect(calculateAuditRequirement(1_000_000, 1_000_000, 10)).toBe('not_required');
  });

  // Edge: exactly at threshold (>) → not_required
  it('returns not_required when values are exactly at thresholds', () => {
    expect(calculateAuditRequirement(16_000_000, 32_000_000, 50)).toBe('not_required');
  });

  // Edge: just above threshold → required (need 2)
  it('returns required when two values are just above thresholds', () => {
    expect(calculateAuditRequirement(16_000_001, 32_000_001, 50)).toBe('required');
  });

  // Edge: zeros
  it('returns not_required for all zeros', () => {
    expect(calculateAuditRequirement(0, 0, 0)).toBe('not_required');
  });

  // Edge: negatives
  it('returns not_required for negative values', () => {
    expect(calculateAuditRequirement(-1, -1, -1)).toBe('not_required');
  });
});

// --- Integration tests ---

const renderCalculator = () =>
  render(
    <HelmetProvider>
      <BrowserRouter>
        <AuditCalculator />
      </BrowserRouter>
    </HelmetProvider>
  );

describe('AuditCalculator component', () => {
  it('renders the calculator form', () => {
    renderCalculator();
    expect(screen.getByText('Calculator Eligibilitate Audit')).toBeInTheDocument();
    expect(screen.getByText('Calculează Rezultatul')).toBeInTheDocument();
  });

  it('shows required result when 2+ criteria met', async () => {
    const user = userEvent.setup();
    renderCalculator();

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '20000000');
    await user.type(inputs[1], '40000000');
    await user.type(inputs[2], '60');

    await user.click(screen.getByText('Calculează Rezultatul'));

    expect(screen.getByText('Obligație de audit statutar detectată')).toBeInTheDocument();
  });

  it('shows not required result when fewer than 2 criteria met', async () => {
    const user = userEvent.setup();
    renderCalculator();

    const inputs = screen.getAllByRole('textbox');
    await user.type(inputs[0], '1000000');
    await user.type(inputs[1], '1000000');
    await user.type(inputs[2], '10');

    await user.click(screen.getByText('Calculează Rezultatul'));

    expect(screen.getByText('Nu aveți obligație legală (probabil)')).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    renderCalculator();

    await user.click(screen.getByText('Calculează Rezultatul'));

    const errorMessages = screen.getAllByText('Câmpul este obligatoriu');
    expect(errorMessages).toHaveLength(3);
  });

  it('keeps only digits when mixed characters are entered', async () => {
    const user = userEvent.setup();
    renderCalculator();

    const [assetsInput] = screen.getAllByRole('textbox');
    await user.type(assetsInput, '12ab34');

    expect(assetsInput).toHaveValue('1.234');
  });

  it('formats assets and turnover with thousands separators while typing', async () => {
    const user = userEvent.setup();
    renderCalculator();

    const [assetsInput, turnoverInput, employeesInput] = screen.getAllByRole('textbox');

    await user.type(assetsInput, '18000000');
    await user.type(turnoverInput, '35000000');
    await user.type(employeesInput, '55');

    expect(assetsInput).toHaveValue('18.000.000');
    expect(turnoverInput).toHaveValue('35.000.000');
    expect(employeesInput).toHaveValue('55');
  });
});
