// Bleed.tsx
import React from 'react';

function Bleed({ children }: { children: React.ReactNode }) {
  return (
    <div data-slot="bleed" className="relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen">
      {children}
    </div>
  );
}

export default Bleed;