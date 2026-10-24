import { foods } from '../data/foods';
import type { Food } from './types';

export function normalizeBarcode(raw: string): string {
  const code = raw.trim();
  return /^0\d{12}$/.test(code) ? code.slice(1) : code;
}

export function findByBarcode(raw: string, catalog: Food[] = foods): Food | undefined {
  const code = normalizeBarcode(raw);
  if (!/^\d{12,13}$/.test(code)) return undefined;
  return catalog.find((food) => food.barcodes.some((barcode) => normalizeBarcode(barcode) === code));
}

export function searchFoods(raw: string, catalog: Food[] = foods): Food[] {
  const query = raw.trim().toLowerCase();
  if (!query) return [];
  const words = query.split(/\s+/);
  return catalog.filter((food) => {
    const text = [food.name, food.brand, ...food.aliases].join(' ').toLowerCase();
    return words.every((word) => text.includes(word));
  });
}
