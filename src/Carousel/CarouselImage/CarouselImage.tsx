import React from 'react';
import './CarouselImage.scss';

export function CarouselImage({ url, children }: CarouselImageProps): React.ReactElement {
  const styles = { backgroundImage: url ? `url(${url})` : 'none' };
  return (
    <div className="carousel-image" style={styles}>
      <div className="carousel-image__content">{children}</div>
    </div>
  );
}

export interface CarouselImageProps {
  readonly url: string | undefined;
  readonly children?: ReadonlyArray<React.ReactElement>;
}