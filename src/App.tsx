import { useCallback, useEffect, useRef, useState } from 'react';
import { BarcodeScanner } from './components/BarcodeScanner';
import { Dinosaur } from './components/Dinosaur';
import { FoodSearch } from './components/FoodSearch';
import { FoodFacts, ServingForm } from './components/ServingForm';
import { Result } from './components/Result';
import { findByBarcode } from './lib/catalog';
import type { Food, FoodResult } from './lib/types';

type Session = { stage: 'greeting' | 'scan' | 'search' | 'exited'; message?: string }
  | { stage: 'servings'; food: Food }
  | { stage: 'result'; food: Food; result: FoodResult; previousResult?: FoodResult };

const titles = { greeting: 'A little check before a bite.', scan: 'Let’s find your food.', search: 'Find a familiar food.', servings: 'Let’s check your portion.', result: 'Here’s your food check.', exited: 'See you next time!' };

export default function App() {
  const [session, setSession] = useState<Session>({ stage: 'greeting' });
  const heading = useRef<HTMLHeadingElement>(null);
  const onCode = useCallback((code: string) => {
    const food = findByBarcode(code);
    setSession(food ? { stage: 'servings', food } : { stage: 'search', message: 'That barcode isn’t in our small food collection yet. Try searching by name.' });
  }, []);
  useEffect(() => { heading.current?.focus(); }, [session]);
  return <main className="app-shell">
    <header className="brand"><span aria-hidden="true">✦</span> Carb Critters <span className="brand-note">a little food curiosity</span></header>
    <article className="card">
      <p className="eyebrow">{session.stage === 'result' ? 'Your portion, made clearer' : 'Meet your food buddy'}</p>
      <h1 ref={heading} tabIndex={-1}>{titles[session.stage]}</h1>
      {session.stage === 'greeting' && <>
        <Dinosaur><p>Hi, I’m Pip, your Carb Critter! Let’s get curious about your food, one serving at a time.</p></Dinosaur>
        <p className="intro">Scan a supported package to explore its carbohydrates and glycemic index.</p>
        <button className="full" onClick={() => setSession({ stage: 'scan' })}>Scan food item</button>
      </>}
      {session.stage === 'scan' && <BarcodeScanner onCode={onCode} onSearch={() => setSession({ stage: 'search' })} />}
      {session.stage === 'search' && <>
        {session.message && <p className="notice" role="status">{session.message}</p>}
        <FoodSearch onSelect={(food) => setSession({ stage: 'servings', food })} />
        <button className="secondary" onClick={() => setSession({ stage: 'scan' })}>Try camera again</button>
      </>}
      {session.stage === 'servings' && <>
        <Dinosaur expression="curious"><p>Found it! Let’s take a closer look. How many servings are you planning to have?</p></Dinosaur>
        <FoodFacts food={session.food} />
        <ServingForm food={session.food} onResult={(result) => setSession({ stage: 'result', food: session.food, result })} />
      </>}
      {session.stage === 'result' && <Result food={session.food} result={session.result} previousResult={session.previousResult}
        onResult={(result) => setSession({ ...session, previousResult: session.result, result })}
        onRepeat={() => setSession({ stage: 'scan' })} onExit={() => setSession({ stage: 'exited' })} />}
      {session.stage === 'exited' && <>
        <Dinosaur expression="waving"><p>That’s our food check! Pip’s waving goodbye for now. Come back whenever you’re curious.</p></Dinosaur>
        <button className="full" onClick={() => setSession({ stage: 'greeting' })}>Restart app</button>
      </>}
    </article>
    <footer>Small steps. A little more understanding.<br /><span>Food education · Small demo collection</span>
      <p className="small">For general education only. Not for medical diagnosis or treatment, insulin dosing, or predicting your personal glucose response.</p>
    </footer>
  </main>;
}
