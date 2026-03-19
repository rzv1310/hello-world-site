export const AUDIT_THRESHOLDS = {
  assets: 16_000_000,
  turnover: 32_000_000,
  employees: 50,
} as const;

export type AuditResult = 'none' | 'required' | 'not_required';

export function calculateAuditRequirement(
  assets: number,
  turnover: number,
  employees: number,
): AuditResult {
  let met = 0;
  if (assets > AUDIT_THRESHOLDS.assets) met++;
  if (turnover > AUDIT_THRESHOLDS.turnover) met++;
  if (employees > AUDIT_THRESHOLDS.employees) met++;

  return met >= 2 ? 'required' : 'not_required';
}
