import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { foods } from '../data/foods';
import { findByBarcode, normalizeBarcode, searchFoods } from './catalog';

describe('catalog lookup and evidence', () => {
  it('matches the confirmed UPC and equivalent EAN-13', () => {
    expect(findByBarcode('888849005994')).toBe(foods[0]);
    expect(findByBarcode('0888849005994')).toBe(foods[0]);
    expect(findByBarcode('8884900599')).toBeUndefined();
    expect(findByBarcode('888849006090')).toBeUndefined();
  });
  it('does not strip unrelated zeros or equate distinct codes', () => {
    expect(normalizeBarcode('0012345678901')).toBe('012345678901');
    expect(normalizeBarcode('000123')).toBe('000123');
    expect(findByBarcode('1888849005994')).toBeUndefined();
  });
  it('searches name, brand, and aliases ignoring case and surrounding spaces', () => {
    expect(searchFoods('  QUEST chocolate  ')).toEqual([foods[0]]);
    expect(searchFoods('cookies')).toEqual([foods[0]]);
    expect(searchFoods('oats')).toEqual([]);
    expect(searchFoods('   ')).toEqual([]);
  });
  it('requires evidence and unique valid barcodes for every published food', () => {
    expect(foods.length).toBeGreaterThan(0);
    expect(new Set(foods.map((food) => food.id)).size).toBe(foods.length);
    const codes: string[] = [];
    for (const food of foods) {
      expect(food.name && food.servingLabel).toBeTruthy();
      expect(food.carbsPerServing).toMatch(/^\d+(\.\d+)?$/);
      expect(food.nutritionSource.checkedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(food.nutritionSource.url || food.nutritionSource.evidencePath).toBeTruthy();
      if (food.nutritionSource.evidencePath) expect(existsSync(food.nutritionSource.evidencePath)).toBe(true);
      for (const barcode of food.barcodes) {
        expect(barcode).toMatch(/^\d{12,13}$/);
        const digits = [...barcode].map(Number).reverse();
        const sum = digits.reduce((total, digit, index) => total + digit * (index % 2 ? 3 : 1), 0);
        expect(sum % 10).toBe(0);
        codes.push(normalizeBarcode(barcode));
      }
      if (food.gi) {
        expect(Number.isFinite(food.gi.value) && food.gi.value >= 0).toBe(true);
        expect(food.gi.source.url || food.gi.source.evidencePath).toBeTruthy();
        expect(food.gi.matchNotes.trim()).not.toBe('');
      }
    }
    expect(new Set(codes).size).toBe(codes.length);
  });
});
