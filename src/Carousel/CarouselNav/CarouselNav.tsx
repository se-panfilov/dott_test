import React from 'react';

export function CarouselNav({ direction, clickFunction, glyph }: CarouselNav): React.ReactElement {
  return (
    <div
      className={`slide-arrow ${direction}`}
      onClick={clickFunction}
    >
      {glyph}
    </div>
  );
}

export interface CarouselNav {
  direction: NavDirection;
  clickFunction: (...rest: any) => any;
  glyph: string;
}

export enum NavDirection {
  left = 'left',
  right = 'right'
}