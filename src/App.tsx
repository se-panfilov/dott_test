import React, { useEffect, useState } from 'react';
import './App.scss';
import { Carousel, CarouselItem } from './Carousel/Carousel';
import { SearchBar } from './SearchBar/SearchBar';
import { Doc, getBookCover, searchBook } from './services/BooksService';
import { setOnTabActiveCallBack, setOnTabInActiveCallBack, stopWebPageStateDetect } from './services/BrowserService';
import { getComputedCoverSize } from './utils/book.util';

function App(): React.ReactElement {
  const [booksList, setBooksList] = useState<ReadonlyArray<Doc>>([]);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const [carouselItemsList, setCarouselItemsList] = useState<ReadonlyArray<CarouselItem>>([]);
  const coverSize = getComputedCoverSize();

  useEffect(() => {
    setOnTabActiveCallBack(() => setIsAutoScroll(true));
    setOnTabInActiveCallBack(() => setIsAutoScroll(false));

    return stopWebPageStateDetect;
  }, []);

  function handleOnSearch(searchValue: string): void {
    // TODO (S.Panfilov) take care about requests order
    searchBook(searchValue).then(({ docs }) => {
      // TODO (S.Panfilov) let's use few docs for debug
      const tempList: ReadonlyArray<Doc> = [docs[0]];

      setBooksList(tempList);

      const result = tempList
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
      <Carousel itemsList={carouselItemsList} isAutoScroll={isAutoScroll} onSelect={onItemSelect}/>
      <SearchBar placeholder="search" title="title" onSearch={handleOnSearch}/>
    </div>
  );
}

function onItemSelect(item: CarouselItem): void {
  alert(`Selected item: ${item.title}`);
}

export default App;
