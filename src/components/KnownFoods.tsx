import { foods } from '../data/foods';
import type { Food } from '../lib/types';

export function KnownFoods({ onSelect }: { onSelect: (food: Food) => void }) {
  return <section className="known-foods" aria-labelledby="known-foods-heading">
    <h2 id="known-foods-heading">Foods I know</h2>
    <p className="small">No package handy? Pick a food and explore it with Pip.</p>
    <ul className="matches">
      {foods.map((food) => <li key={food.id}>
        <button type="button" className="food-match" onClick={() => onSelect(food)}>
          <span className="food-availability">{food.barcodes.length ? 'Scan supported package or choose here' : 'Choose here or search by name'}</span>
          <strong>{food.brand} {food.name}</strong>
          <span>{food.servingLabel} · {food.carbsPerServing}g total carbs</span>
          <span className="food-select">Explore this food <span aria-hidden="true">→</span></span>
        </button>
      </li>)}
    </ul>
    <p className="small">This is our whole demo collection. Quaker scanning supports the 8-packet box, not an individual packet. Milk and toppings add carbs beyond the oat values shown.</p>
  </section>;
}
