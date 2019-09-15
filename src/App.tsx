import React, { useEffect, useState } from 'react';
import './App.scss';
import { Carousel, CarouselItem } from './Carousel/Carousel';
import { SearchBar } from './SearchBar/SearchBar';
import { Doc, getUrlCover, searchBook } from './services/BooksService';
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
      setBooksList(docs);
      setCarouselItemsList(docs.map(doc => ({ title: doc.title, subTitle: 'todo', imgUrl: getUrlCover(doc, coverSize) })));
    });
  }

  return (
    <div className="App">
      <Carousel itemsList={carouselItemsList} isAutoScroll={isAutoScroll}/>
      <SearchBar title="Book name, author, etc." onSearch={handleOnSearch}/>
    </div>
  );
}

export default App;
