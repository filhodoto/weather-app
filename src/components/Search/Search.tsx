import React, { ChangeEvent, FC, useContext, useState } from 'react';
import './search.scss';
import { setLocation } from 'state/actions/appActions';
import { StoreContext } from 'app/App';

const Search: FC = (): JSX.Element => {
  const { dispatch } = useContext(StoreContext)!;
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    setSearchValue(ev.target.value);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' && searchValue.trim() !== '') {
      setLocation(searchValue, dispatch);
    }
  };

  return (
    <input
      type="text"
      placeholder="Search for location"
      value={searchValue}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Search;
