import { describe, expect, it } from 'vitest';
import { foods } from '../data/foods';
import { calculate } from './nutrition';

const fixture = (carbs: string) => ({ ...foods[0], carbsPerServing: carbs });

describe('sourced serving calculations', () => {
  it('multiplies total carbs and preserves GI unchanged', () => {
    const gi = { value: 42, source: { title: 'Synthetic test only', evidencePath: 'fixture', checkedOn: '2026-10-23' }, matchNotes: 'Synthetic test only' };
    expect(calculate({ ...fixture('20'), gi }, '2')).toEqual({ ok: true, result: { servings: 2, totalCarbs: '40', band: 'moderate', gi } });
  });
  it('calculates the confirmed cookie while keeping missing GI unavailable', () => {
    expect(calculate(foods[0], '2')).toEqual({ ok: true, result: { servings: 2, totalCarbs: '38', band: 'moderate', gi: null } });
  });
  it.each(['', ' ', '0', '-1', '+2', '1.5', '1e2', 'two', 'Infinity', '9007199254740992', ' 2', '2 '])('rejects invalid serving input %j', (raw) => {
    expect(calculate(fixture('20'), raw).ok).toBe(false);
  });
  it.each([['24', 'lower'], ['25', 'moderate'], ['49', 'moderate'], ['49.5', 'moderate'], ['50', 'higher']])('classifies %sg before formatting', (carbs, band) => {
    const result = calculate(fixture(carbs), '1');
    expect(result.ok && result.result.band).toBe(band);
  });
  it('uses exact decimal arithmetic for repeated servings', () => {
    const result = calculate(fixture('0.1'), '3');
    expect(result.ok && result.result.totalCarbs).toBe('0.3');
    const nearBoundary = calculate(fixture('16.5'), '3');
    expect(nearBoundary.ok && nearBoundary.result.band).toBe('moderate');
  });
  it('rejects unrepresentable totals and invalid source values', () => {
    expect(calculate(fixture('19'), String(Number.MAX_SAFE_INTEGER)).ok).toBe(false);
    expect(calculate(fixture('NaN'), '1').ok).toBe(false);
  });
  it('keeps a zero-carb food at zero', () => {
    const result = calculate(fixture('0.00'), '2');
    expect(result.ok && result.result.totalCarbs).toBe('0');
  });
});
