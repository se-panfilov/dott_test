import React, { useState } from 'react';
import { CarouselImage } from '../CarouselImage/CarouselImage';
import { Doc, getBookCover } from '../services/BooksService';
import { getComputedCoverSize } from '../utils/book.util';
import './Carousel.scss';


export function Carousel({ isAutoScroll = true, interval = 5000, onSelect }: CarouselProps): React.ReactElement {
  // TODO (S.Panfilov) wff with img type?
  const [imgList, setImgList] = useState<ReadonlyArray<any>>([]);

  return (
    <div className="carousel">
      Carousel
      <CarouselImage url={imgUrl}/>
    </div>
  );
}

// TODO (S.Panfilov)  whatis the return type for an image?
function getCovers(docs: ReadonlyArray<Doc>): any {
  return docs.forEach(doc => getBookCover(doc, getComputedCoverSize()));
}

export interface CarouselProps {
  booksList: ReadonlyArray<Doc>;
  interval?: number;
  onSelect: (item: Doc) => any;
  isAutoScroll: boolean;
}
