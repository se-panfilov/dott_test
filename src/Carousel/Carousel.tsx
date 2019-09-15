import React, { useState } from 'react';
import { isDefined } from '../utils/utils';
import './Carousel.scss';
import { CarouselImage } from './CarouselImage/CarouselImage';
import { CarouselNav, CarouselNavDirection } from './CarouselNav/CarouselNav';

export function Carousel({ itemsList, isAutoScroll = true, interval = 5000, onSelect }: CarouselProps): React.ReactElement {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  function goPrev(): void {
    const index = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
    setCurrentItemIndex(index);
  }

  function goNext(): void {
    // TODO (S.Panfilov) what about max number?
    setCurrentItemIndex(currentItemIndex + 1);
  }

  return (
    <div className="carousel">
      <CarouselNav
        direction={CarouselNavDirection.left}
        clickFunction={goPrev}
        glyph="&#9664;"
      />

      <CarouselImage url={getImageUrl(itemsList, currentItemIndex)}/>

      <CarouselNav
        direction={CarouselNavDirection.right}
        clickFunction={goNext}
        glyph="&#9654;"
      />
    </div>
  );
}

function getImageUrl(list: ReadonlyArray<CarouselItem>, index: number): string | undefined {
  if (!isDefined(list) || list.length === 0) return undefined;
  const item = list[index];
  if (!isDefined(item)) throw new Error(`Cannot find carousel item with index "${index}" in list of "${list.length}"`);
  return item.img;
}

export interface CarouselProps {
  itemsList: ReadonlyArray<CarouselItem>;
  interval?: number;
  onSelect: (item: CarouselItem) => void;
  isAutoScroll: boolean;
}

export interface CarouselItem {
  title?: string;
  subTitle?: string;
  img?: string;
}
