export type Source = {
  title: string;
  url?: string;
  evidencePath?: string;
  checkedOn: string;
};

export type Food = {
  id: string;
  name: string;
  brand?: string;
  aliases: string[];
  barcodes: string[];
  servingLabel: string;
  carbsPerServing: string;
  nutritionSource: Source;
  gi: null | { value: number; source: Source; matchNotes: string };
};

export type CarbBand = 'lower' | 'moderate' | 'higher';
export type FoodResult = {
  servings: number;
  totalCarbs: string;
  band: CarbBand;
  gi: Food['gi'];
};
