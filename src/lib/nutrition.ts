import type { CarbBand, Food, FoodResult } from './types';

export const feedback: Record<CarbBand, { label: string; message: string }> = {
  lower: {
    label: 'Lower carb amount',
    message: 'Nice, you checked! This portion is on the lower end of the Carb-ometer. Now you know a little more about your snack!',
  },
  moderate: {
    label: 'Moderate carb amount',
    message: 'Here’s the scoop! Your portion lands in the middle of the Carb-ometer. Want to explore? There may be lower-carb options, too.',
  },
  higher: {
    label: 'Higher carb amount',
    message: 'Thanks for checking with me! This portion is toward the top of the Carb-ometer. You could try a different snack with fewer carbs.',
  },
};

export type Calculation = { ok: true; result: FoodResult } | { ok: false; error: string };

export function portionChangeMessage(previous: FoodResult | undefined, current: FoodResult): string | undefined {
  if (!previous || previous.servings === current.servings) return undefined;
  const servingLabel = (count: number) => `${count} serving${count === 1 ? '' : 's'}`;
  return `From ${previous.totalCarbs}g to ${current.totalCarbs}g: ${servingLabel(previous.servings)} to ${servingLabel(current.servings)}. Now you can see how the portion changes the carbs!`;
}

export function feedbackFor(food: Food, result: FoodResult): { label: string; message: string } {
  const copy = feedback[result.band];
  if (result.band === 'higher' && result.servings > 1) {
    const singleServing = calculate(food, '1');
    if (singleServing.ok && singleServing.result.band !== 'higher') {
      return { ...copy, message: 'Thanks for checking with me! These servings put your portion toward the top of the Carb-ometer. You could try a smaller portion of this snack, or explore a different snack with fewer carbs.' };
    }
  }
  return copy;
}

export function calculate(food: Food, raw: string): Calculation {
  if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw)) || Number(raw) < 1) {
    return { ok: false, error: 'Enter a positive whole number of servings, such as 1 or 2.' };
  }
  // Scale the written label precision to integer units before multiplying.
  if (!/^\d+(\.\d+)?$/.test(food.carbsPerServing)) {
    return { ok: false, error: 'This food’s carbohydrate information is unavailable. Please choose another food.' };
  }
  const [whole, fraction = ''] = food.carbsPerServing.split('.');
  const scale = 10n ** BigInt(fraction.length);
  const totalUnits = BigInt(whole + fraction) * BigInt(raw);
  if (totalUnits > BigInt(Number.MAX_SAFE_INTEGER)) {
    return { ok: false, error: 'That amount is too large to calculate reliably. Enter fewer servings.' };
  }
  const remainder = (totalUnits % scale).toString().padStart(fraction.length, '0').replace(/0+$/, '');
  const totalCarbs = `${totalUnits / scale}${remainder ? `.${remainder}` : ''}`;
  const band: CarbBand = totalUnits < 25n * scale ? 'lower' : totalUnits < 50n * scale ? 'moderate' : 'higher';
  return { ok: true, result: { servings: Number(raw), totalCarbs, band, gi: food.gi } };
}
