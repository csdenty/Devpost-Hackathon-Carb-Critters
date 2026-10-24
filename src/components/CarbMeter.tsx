import type { CSSProperties } from 'react';
import { feedback } from '../lib/nutrition';
import type { FoodResult } from '../lib/types';

export function CarbMeter({ result }: { result: FoodResult }) {
  // The picture stops at 75g; the exact total and accessible text never do.
  const level = Math.min(Number(result.totalCarbs), 75) / 75 * 100;
  return <div className="carb-meter">
    <p className="meter-title">Carb-ometer</p>
    <div className="meter-body" role="meter" aria-label="Total carbohydrates"
      aria-valuemin={0} aria-valuemax={75} aria-valuenow={Math.min(Number(result.totalCarbs), 75)}
      aria-valuetext={`${result.totalCarbs} grams. ${feedback[result.band].label}. Demo ranges, not a personal target.`}>
      <div className="thermometer" aria-hidden="true" style={{ '--level': `${level}%` } as CSSProperties}>
        <div className="thermometer-tube"><div className="thermometer-fill" /><div className="thermometer-marker" /></div>
        <div className="thermometer-bulb" />
      </div>
      <div className="meter-ranges" aria-hidden="true">
        <div className={result.band === 'higher' ? 'meter-range active' : 'meter-range'}><span>Higher</span><small>50g or more</small></div>
        <div className={result.band === 'moderate' ? 'meter-range active' : 'meter-range'}><span>Moderate</span><small>25g to under 50g</small></div>
        <div className={result.band === 'lower' ? 'meter-range active' : 'meter-range'}><span>Lower</span><small>Under 25g</small></div>
      </div>
    </div>
    <p className="meter-note">Scale: 0–75g+ · Demo ranges, not personal targets.</p>
  </div>;
}
