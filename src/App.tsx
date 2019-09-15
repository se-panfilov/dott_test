import React, { useState } from 'react';
import './App.scss';
import { Carousel, CarouselItem } from './Carousel/Carousel';
import { SearchBar } from './SearchBar/SearchBar';
import { Doc, getBookCover, searchBook } from './services/BooksService';
import { getComputedCoverSize } from './utils/book.util';

function App(): React.ReactElement {
  const [booksList, setBooksList] = useState<ReadonlyArray<Doc>>([]);
  const [carouselItemsList, setCarouselItemsList] = useState<ReadonlyArray<CarouselItem>>([]);
  const coverSize = getComputedCoverSize();

  function handleOnSearch(searchValue: string): void {
    // TODO (S.Panfilov) take care about requests order
    searchBook(searchValue).then(({ docs }) => {
      setBooksList(docs);

      const result = docs
        .map(async (doc) => ({ title: doc.title, subTitle: 'dssd', img: await getBookCover(doc, coverSize) }));


      Promise.all(result).then(resolved => {
        // TODO (S.Panfilov) wtf, some of those requests never resolves?
        console.info('11111');
        console.log(resolved);
        setCarouselItemsList(resolved);
      }).catch(err => {
        console.log('some', err);
      });


    });
  }

  return (
    <div className="App">
      <Carousel itemsList={carouselItemsList} isAutoScroll={isAutoScroll()} onSelect={onItemSelect}/>
      <SearchBar placeholder="search" title="title" onSearch={handleOnSearch}/>
    </div>
  );
}

function onItemSelect(item: CarouselItem): void {
  alert(`Selected item: ${item.title}`);
}


function isAutoScroll(): boolean {
  // TODO (S.Panfilov) should return false if tab in background
  return true;
}

export default App;
