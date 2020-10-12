import React, { ChangeEvent, FC, useContext, useState } from 'react';
import './search.scss';
import { setLocation } from 'state/actions/appActions';
import { StoreContext } from 'app/App';
import { fetchCities } from 'api/cities';
import { DebounceInput } from 'react-debounce-input';

const Search: FC = (): JSX.Element => {
  const { dispatch, state } = useContext(StoreContext)!;
  const [searchValue, setSearchValue] = useState<string>('');
  const [locationOptions, setlocationOptions] = useState<string[]>([]);

  const populateLocationOptions = async (searchQuery: string) => {
    const options: any = await fetchCities(searchQuery, state['settings']['lang']);
    setlocationOptions(options);
  }

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();
    if (ev.target.value.trim() !== '') {
      populateLocationOptions(ev.target.value);
    }
    setSearchValue(ev.target.value);

  };

  const handleOptionClick = (city: string) => {
    // Clean state 
    cleanState();

    // Set app location
    setLocation(city, dispatch);
  };

  const cleanState = () => {
    // Clean options
    setlocationOptions([]);
    
    // Clean search input value
    setSearchValue('');

  }

  const handleKeyDown = async (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' && searchValue.trim() !== '') {
      await setLocation(searchValue, dispatch);
      
      // Clean state 
      cleanState();
    }
  };

  return (
    <div className="search">
      <DebounceInput 
      className="search__input"
      debounceTimeout={100}
      type="text" 
      placeholder="Search for location"
      value={searchValue}
      onChange={ev => handleSearchChange(ev)}
      onKeyDown={ev => handleKeyDown(ev)}/>
      <ul className="search__options">{locationOptions.map((item:string, index) => {
        const key = `${item.toLowerCase().replace(' ', '-')}-${index}`;
        console.log(key);
        return (<li className="search__item" key={key} onClick={()=>handleOptionClick(item)}>{item}</li>)
      })}</ul>
    </div>
  );
};

export default Search;
