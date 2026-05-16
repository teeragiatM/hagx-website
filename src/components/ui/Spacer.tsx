import React from 'react';

interface SpacerProps {
  h?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
  w?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
}

export const Spacer = ({ h = 16, w }: SpacerProps) => (
  <div
    className="spacer"
    aria-hidden="true"
    style={
      { 
        '--height': h ? `${h}px` : undefined,
        '--width': w ? `${w}px` : undefined
      } as React.CSSProperties
    }
  />
);