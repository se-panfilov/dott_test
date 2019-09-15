import React from 'react';
import './CarouselNav.scss';

export function CarouselNav({ direction, clickFunction }: CarouselNav): React.ReactElement {
  return (
    <button
      type="button"
      className={`carousel-nav -${direction}`}
      onClick={() => clickFunction(CarouselNavDirection[direction])}
    >
      {direction === CarouselNavDirection.right ? <span>&#9654;</span> : <span>&#9664;</span>}
    </button>
  );
}

export interface CarouselNav {
  readonly direction: CarouselNavDirection;
  readonly clickFunction: (direction: CarouselNavDirection) => void;
}

export enum CarouselNavDirection {
  left = 'left',
  right = 'right'
}