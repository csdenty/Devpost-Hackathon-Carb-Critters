import type { ReactNode } from 'react';

type Expression = 'friendly' | 'curious' | 'thoughtful' | 'waving';
const artwork: Record<Expression, string> = {
  friendly: '/dinosaur.svg', curious: '/dinosaur-curious.svg',
  thoughtful: '/dinosaur-thoughtful.svg', waving: '/dinosaur-waving.svg',
};

export function Dinosaur({ children, expression = 'friendly', compact = false }: { children: ReactNode; expression?: Expression; compact?: boolean }) {
  return <div className={`dinosaur${compact ? ' dinosaur-compact' : ''}`}>
    <div className="dinosaur-scene" aria-hidden="true">
      <img src={artwork[expression]} width="210" height="224" alt="" />
    </div>
    <div className="speech">{children}</div>
  </div>;
}
