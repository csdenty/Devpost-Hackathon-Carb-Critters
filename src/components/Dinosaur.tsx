import type { ReactNode } from 'react';

export function Dinosaur({ children }: { children: ReactNode }) {
  return <div className="dinosaur">
    <img src="/dinosaur.svg" width="130" height="140" alt="" />
    <div className="speech">{children}</div>
  </div>;
}
