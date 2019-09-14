import React from 'react';
import './CarouselImage.scss';

export function CarouselImage({ url }: CarouselImageProps): React.ReactElement {
  const styles = { backgroundImage: url ? `url(${url})` : 'none' };


  return (
    <div className="carousel" style={styles}>
      sdds
    </div>
  );
}

export interface CarouselImageProps {
  readonly url: string | undefined;
}