import type { ReactNode } from 'react';

export function Dinosaur({ children }: { children: ReactNode }) {
  return <div className="dinosaur">
    <div className="dinosaur-scene" aria-hidden="true">
      <img src="/dinosaur.svg" width="210" height="224" alt="" />
    </div>
    <div className="speech">{children}</div>
  </div>;
}
