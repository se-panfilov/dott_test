import { isDefined } from '../utils/utils';

const requestConfig: RequestInit = { mode: 'cors' };

export function searchBook(searchText: string, page: number = 1): Promise<SearchResult> {
  return fetch(`http://openlibrary.org/search.json?q=${encodeURIComponent(searchText)}&page=${page}`, requestConfig)
    .then(response => response.json())
    .catch(e => {
      throw new Error(`Can't get proper book's search request for search text: "${searchText}", the reason is: "${e}"`);
    });
}

export function getUrlCover(doc: Doc, size: CoverSize): string | undefined {
  const url = 'https://covers.openlibrary.org/b/';
  const sizeStr = `-${size}.jpg`;

  const bookId = getBookId(doc);
  if (!isDefined(bookId)) return undefined;
  return url + bookId + sizeStr;
}

function getBookId(doc: Doc): string | number | undefined {
  if (isDefined(doc.isbn) && doc.isbn.length > 0) return `isbn/${doc.isbn[0]}`;
  else if (isDefined(doc.cover_edition_key) && doc.cover_edition_key.length > 0) return `olid/${doc.cover_edition_key}`;
  else if (isDefined(doc.cover_i)) return `id/${doc.cover_i}`;

  // TODO (S.Panfilov) no book ID found
  console.log('no cover so far');

  return undefined;
}

export enum CoverSize {
  small = 'S',
  medium = 'M',
  large = 'L'
}

export interface SearchResult {
  start: number;
  num_found: number;
  docs: ReadonlyArray<Doc>;
}

export interface Doc {
  cover_i: number;
  has_fulltext: boolean;
  edition_count: number;
  title: string;
  author_name: ReadonlyArray<string>;
  first_publish_year: number;
  key: string;
  ia: ReadonlyArray<string>;
  author_key: ReadonlyArray<string>;
  public_scan_b?: boolean;
  cover_edition_key?: string;
  ebook_count_i?: number;
  edition_key?: ReadonlyArray<string>;
  id_goodreads?: ReadonlyArray<string>;
  isbn?: ReadonlyArray<string>;
  language?: ReadonlyArray<string>;
  last_modified_i?: number;
  publish_date?: ReadonlyArray<string>;
  publish_year?: ReadonlyArray<number>;
  publisher?: ReadonlyArray<string>;
  seed?: ReadonlyArray<string>;
  text?: ReadonlyArray<string>;
  title_suggest?: string;
  type?: string;
}
