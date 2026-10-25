import { feedbackFor, portionChangeMessage } from '../lib/nutrition';
import type { Food, FoodResult } from '../lib/types';
import { Dinosaur } from './Dinosaur';
import { FoodFacts, ServingForm } from './ServingForm';
import { CarbMeter } from './CarbMeter';

export function Result({ food, result, previousResult, onResult, onRepeat, onExit }: {
  food: Food; result: FoodResult; previousResult?: FoodResult; onResult: (result: FoodResult) => void; onRepeat: () => void; onExit: () => void;
}) {
  const copy = feedbackFor(food, result);
  const changeMessage = portionChangeMessage(previousResult, result);
  return <>
    <Dinosaur expression="thoughtful">
      {changeMessage && <p className="portion-change" role="status">{changeMessage}</p>}
      <p>{copy.message}</p>
    </Dinosaur>
    <div className="total" aria-live="polite" aria-atomic="true">
      <span>Total carbohydrates</span>
      <p><strong>{result.totalCarbs}</strong><span> g</span></p>
      <span>for {result.servings} serving{result.servings === 1 ? '' : 's'} · {food.servingLabel} per serving</span>
      <CarbMeter result={result} />
    </div>
    <p className="small">These demo bands are general food education, not personal carb targets. GI describes a food; it does not predict your individual glucose response.</p>
    <FoodFacts food={food} />
    <ServingForm food={food} initial={String(result.servings)} onResult={onResult} />
    <div className="actions"><button onClick={onRepeat}>Scan another food</button><button className="secondary" onClick={onExit}>Exit</button></div>
  </>;
}
