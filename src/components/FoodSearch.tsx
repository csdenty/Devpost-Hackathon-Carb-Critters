import { useState } from 'react';
import { searchFoods } from '../lib/catalog';
import type { Food } from '../lib/types';

export function FoodSearch({ onSelect }: { onSelect: (food: Food) => void }) {
  const [query, setQuery] = useState('');
  const matches = searchFoods(query);
  return <section>
    <label htmlFor="food-query">Food name or brand</label>
    <input id="food-query" type="search" value={query} placeholder="Try Quest or overnight oats" onChange={(event) => setQuery(event.target.value)} />
    <p className="small">Try Quest cookies, Original Oreos, Quaker Apples &amp; Cinnamon, or Oats Overnight Green Apple Cinnamon. Oreos and Oats Overnight are available by name search only.</p>
    <div aria-live="polite">
      {!query.trim() ? <p>Enter a food name to find a match.</p> : matches.length ? <>
        <p className="small">{matches.length} matching food{matches.length === 1 ? '' : 's'}</p>
        <ul className="matches">{matches.map((food) => <li key={food.id}>
          <button className="food-match" onClick={() => onSelect(food)}>
            <strong>{food.brand} {food.name}</strong>
            <span>{food.servingLabel} · {food.carbsPerServing}g total carbs</span>
          </button>
        </li>)}</ul>
      </> : <p>No matches in this demo collection. Try another name, choose another food, or search the internet for its label. Outside information isn’t added automatically.</p>}
    </div>
  </section>;
}
