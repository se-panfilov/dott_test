import React, { useState } from 'react';
import './Carousel.scss';
import { CarouselImage } from './CarouselImage/CarouselImage';
import { CarouselNav, CarouselNavDirection } from './CarouselNav/CarouselNav';

export function Carousel({ itemsList, isAutoScroll = true, interval = 5000 }: CarouselProps): React.ReactElement {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);

  function goPrev(): void {
    console.info('goPrev');
    const index = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
    setCurrentItemIndex(index);
  }

  function goNext(): void {
    console.info('goNext');
    // TODO (S.Panfilov) what about max number? I guess we should startover, or... make another request?
    setCurrentItemIndex(currentItemIndex + 1);
  }

  return (
    <div className="carousel">
      <div className="carousel__nav -left">
        <CarouselNav
          direction={CarouselNavDirection.left}
          clickFunction={goPrev}
        />
      </div>

      <div className="carousel__image">
        <CarouselImage url={getImageUrl(itemsList, currentItemIndex)}/>
      </div>

      <div className="carousel__nav -right">
        <CarouselNav
          direction={CarouselNavDirection.right}
          clickFunction={goNext}
        />
      </div>
    </div>
  );
}

function getImageUrl(list: ReadonlyArray<CarouselItem>, index: number): string | undefined {
  // if (!isDefined(list) || list.length === 0) return undefined;
  // const item = list[index];
  // if (!isDefined(item)) throw new Error(`Cannot find carousel item with index "${index}" in list of "${list.length}"`);
  // return item.imgUrl;
  // TODO (S.Panfilov)  debug
  return 'http://covers.openlibrary.org/b/isbn/9780385533225-L.jpg';
}

export interface CarouselProps {
  itemsList: ReadonlyArray<CarouselItem>;
  interval?: number;
  isAutoScroll: boolean;
}

export interface CarouselItem {
  title?: string;
  subTitle?: string;
  imgUrl?: string;
}
