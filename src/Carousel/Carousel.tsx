import React, { useEffect, useState } from 'react';
import { isDefined } from '../utils/utils';
import './Carousel.scss';
import { CarouselImage } from './CarouselImage/CarouselImage';
import { CarouselNav, CarouselNavDirection } from './CarouselNav/CarouselNav';

export function Carousel({ itemsList, isAutoScroll = true, interval = 5000 }: CarouselProps): React.ReactElement {
  const [currentItemIndex, setCurrentItemIndex] = useState<number>(0);
  const [autoScrollInterval, setAutoScrollInterval] = useState<number | undefined>(undefined);


  // TODO (S.Panfilov) Autoscroll isn't finished: should stop when tab go background
  function startAutoScroll(shouldAutoScroll: boolean, time: number): void {
    if (shouldAutoScroll) {
      if (isDefined(autoScrollInterval)) return;
      const index = setInterval(() => {
        if (itemsList.length > 0 && isAutoScroll) goNext();
        if (!isAutoScroll) stopAutosScroll();
      }, time);
      setAutoScrollInterval(index as any);
    } else {
      stopAutosScroll();
    }
  }

  function stopAutosScroll(): void {
    clearInterval(autoScrollInterval);
  }

  useEffect(() => {
    startAutoScroll(isAutoScroll, interval);
    return stopAutosScroll;
  }, []);

  function goPrev(): void {
    console.info('goPrev');
    const index = currentItemIndex > 0 ? currentItemIndex - 1 : 0;
    setCurrentItemIndex(index);
  }

  function goNext(): void {
    console.info('goNext');
    const val = (currentItemIndex < itemsList.length - 1) ? currentItemIndex + 1 : 0;
    setCurrentItemIndex(val);
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
        {getCarouselImage(itemsList, currentItemIndex)}
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

function getCarouselImage(itemsList: ReadonlyArray<CarouselItem>, currentItemIndex: number = 0): React.ReactElement {
  if (itemsList[currentItemIndex]) {
    return (
      <CarouselImage url={itemsList[currentItemIndex].imgUrl}>
        <div className="carousel__image-title">{itemsList[currentItemIndex].title}</div>
        <div className="carousel__image-subtitle">{itemsList[currentItemIndex].subTitle}</div>
      </CarouselImage>
    );
  }

  return <CarouselImage url="/no-image.jpg"/>;
}

export interface CarouselProps {
  readonly itemsList: ReadonlyArray<CarouselItem>;
  readonly interval?: number;
  readonly isAutoScroll: boolean;
}

export interface CarouselItem {
  readonly title?: string;
  readonly subTitle?: string;
  readonly imgUrl?: string;
}
