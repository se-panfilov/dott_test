import React, { useState } from 'react';
import { isDefined } from '../utils/utils';
import './SearchBar.scss';

export function SearchBar({ title = 'Input your text', isEmitOnStopTyping = true, minLength = 2, onSearch }: SearchBarProps): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>('');
  const [dueTimeout, setDueTimeout] = useState<number | undefined>(undefined);

  function emitSearchValue(value: string): void {
    setSearchValue(value);
    if (isDefined(dueTimeout)) clearTimeout(dueTimeout);

    if (isDefined(value) && value.length < minLength) return;

    if (isEmitOnStopTyping) {
      const timeout = setTimeout(() => onSearch(value), 300);
      // TODO (S.Panfilov) wtf with this type?
      setDueTimeout(timeout as any);
    } else {
      onSearch(value);
    }

  }

  return (
    <label className="search-bar">
      <span className="search-bar__title">{title}</span>
      <input
        className="search-bar__input"
        type="search"
        placeholder={title}
        value={searchValue}
        onChange={({ target }) => emitSearchValue(target ? target.value : '')}
      />
    </label>
  );
}


export interface SearchBarProps {
  title?: string;
  isEmitOnStopTyping?: boolean; // TODO (S.Panfilov)  doesn't work
  minLength?: 2;
  onSearch: (searchValue: string) => any;
}
