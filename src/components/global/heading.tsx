import { ReactNode } from 'react';

export const Heading = ({ children }: { children: ReactNode }) => (
  <h2 className="font-bold text-xl">{children}</h2>
);
