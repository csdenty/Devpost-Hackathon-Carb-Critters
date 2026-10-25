import { useState } from 'react';
import { calculate } from '../lib/nutrition';
import type { Food, FoodResult } from '../lib/types';

export function FoodFacts({ food }: { food: Food }) {
  return <section className="food-facts" aria-label="Food information">
    <p className="eyebrow">{food.brand}</p>
    <h2>{food.name}</h2>
    {food.preparationNote && <p className="notice">{food.preparationNote}</p>}
    <dl>
      <div><dt>Serving size</dt><dd>{food.servingLabel}</dd></div>
      <div><dt>Total carbs per serving</dt><dd>{food.carbsPerServing}g</dd></div>
      <div><dt>Glycemic index (GI)</dt><dd>{food.gi ? food.gi.value : 'GI unavailable'}</dd></div>
    </dl>
    <p className="small">Nutrition source: <a href={food.nutritionSource.url}>{food.nutritionSource.title}</a></p>
    {food.gi && <p className="small">GI source: <a href={food.gi.source.url}>{food.gi.source.title}</a>. {food.gi.matchNotes}</p>}
  </section>;
}

export function ServingForm({ food, initial = '', onResult }: { food: Food; initial?: string; onResult: (result: FoodResult) => void }) {
  const [raw, setRaw] = useState(initial);
  const [error, setError] = useState('');
  return <form noValidate onSubmit={(event) => {
    event.preventDefault();
    const outcome = calculate(food, raw);
    if (!outcome.ok) { setError(outcome.error); return; }
    setError('');
    onResult(outcome.result);
  }}>
    <label htmlFor="servings">How many servings will you have?</label>
    <p id="serving-help" className="small">Use a positive whole number. One serving is {food.servingLabel.toLowerCase()}.</p>
    <div className="serving-entry">
      <input id="servings" type="text" inputMode="numeric" value={raw} onChange={(event) => setRaw(event.target.value)} aria-invalid={!!error} aria-describedby={`serving-help${error ? ' serving-error' : ''}`} autoComplete="off" />
      <button type="submit">{initial ? 'Update result' : 'Check my carbs'}</button>
    </div>
    {error && <p id="serving-error" className="error" role="alert">{error}</p>}
  </form>;
}
