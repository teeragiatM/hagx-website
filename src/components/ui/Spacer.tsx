import React from 'react';

interface SpacerProps {
  h?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
  w?: 4 | 8 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 64 | 80 | 96;
}

export const Spacer = ({ h = 16, w }: SpacerProps) => (
  <div
    className="ui-spacer mt-[calc(var(--height,0px)-1px)] ml-[calc(var(--width,0px)-1px)] block h-px min-h-px w-px min-w-px select-none"
    aria-hidden="true"
    style={
      {
        '--height': h ? `${h}px` : undefined,
        '--width': w ? `${w}px` : undefined,
      } as React.CSSProperties
    }
  />
);