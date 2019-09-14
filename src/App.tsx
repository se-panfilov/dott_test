import React, { useState } from 'react';
import './App.scss';
import { Carousel } from './Carousel/Carousel';
import { SearchBar } from './SearchBar/SearchBar';
import { Doc, getBookCover, searchBook } from './services/BooksService';
import { getComputedCoverSize } from './utils/book.util';

function App(): React.ReactElement {
  const [booksList, setBooksList] = useState<ReadonlyArray<Doc>>([]);

  return (
    <div className='App'>
      <Carousel isAutoScroll={isAutoScroll()} booksList={booksList}/>
      <SearchBar placeholder='search' title='title' onSearch={handleOnSearch}/>
    </div>
  );
}

function handleOnSearch(searchValue: string): void {
  // TODO (S.Panfilov)  take care about requests order
  searchBook(searchValue).then(result => {
    console.info(result);
    return result.docs.forEach(doc => getBookCover(doc, getComputedCoverSize()));
  });

  console.info(searchValue);
}

function isAutoScroll(): boolean {
  // TODO (S.Panfilov) should return false if tab in background
  return true;
}

export default App;
