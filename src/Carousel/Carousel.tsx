import React, { useState } from 'react';
import { Doc, getBookCover } from '../services/BooksService';
import { getComputedCoverSize } from '../utils/book.util';
import './Carousel.scss';


export function Carousel({ isAutoScroll = true }: CarouselProps): React.ReactElement {
  // TODO (S.Panfilov) wff with img type?
  const [coversList, setCoversList] = useState<ReadonlyArray<any>>([]);

  return (
    <div>Carousel</div>
  )
}

// TODO (S.Panfilov)  whatis the return type for an image?
function getCovers(docs: ReadonlyArray<Doc>): any {
  return docs.forEach(doc => getBookCover(doc, getComputedCoverSize()));
}

export interface CarouselProps {
  booksList: ReadonlyArray<Doc>
  isAutoScroll: boolean
}
