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
  direction: CarouselNavDirection;
  clickFunction: (...rest: any) => any;
  glyph: string;
}

export enum CarouselNavDirection {
  left = 'left',
  right = 'right'
}