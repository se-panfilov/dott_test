import { CoverSize } from '../services/BooksService';
import { isDefined } from './utils';

export enum ViewportSize {
  small = '200',
  medium = '400',
  large = '700'
}

export function getComputedCoverSize(): CoverSize {
  const viewportWidth = (window as any).innerWidth;
  if (!isDefined(viewportWidth) || Number.isNaN(Number.parseFloat(viewportWidth))) {
    throw new Error(`Can't get proper viewport width, the value is: "${viewportWidth}"`);
  }

  if (viewportWidth < ViewportSize.medium) return CoverSize.small;
  if (viewportWidth < ViewportSize.large) return CoverSize.medium;
  return CoverSize.large;
}
