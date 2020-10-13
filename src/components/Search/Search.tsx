import React, { ChangeEvent, FC, useContext, useState } from 'react';
import './search.scss';
import { setLocation } from 'state/actions/appActions';
import { StoreContext, updateLocationInStore } from 'app/App';
import { fetchCities } from 'api/cities';
import { DebounceInput } from 'react-debounce-input';

// Import svg elements in a basic way from an image file
import { ReactComponent as LocationIconSvg } from 'assets/icons/location-icon.svg';
import { spaceToDash } from 'helpers/helpers';

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
    // If search input is not empty
    if (ev.target.value.trim() !== '') {
      populateLocationOptions(ev.target.value);
    }

    // If search input is empty, clean state
    if(ev.target.value.trim() === '') cleanState();

    // Set search value
    setSearchValue(ev.target.value);
  };

  const handleOptionClick = (city: string) => {
    // Clean state 
    cleanState();

    // Set app location
    setLocation(city, dispatch);
  };

  const handleLocationClick = async () => {
    // Set app location
    await updateLocationInStore(dispatch);
    
    // Clean state 
    cleanState();
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
    <div className={`search search--${locationOptions.length > 0 ? 'open':'closed'}`} >
      <div className="search__input-wrapper">
        <DebounceInput 
          className="search__input"
          debounceTimeout={200}
          type="text" 
          placeholder="Search for location"
          value={searchValue}
          onChange={ev => handleSearchChange(ev)}
          onKeyDown={ev => handleKeyDown(ev)}/>
        <LocationIconSvg className="search__location-icon" onClick={handleLocationClick}/>
      </div>
      <ul className="search__options-wrapper">{locationOptions.map((item:string, index) => {
        // Create a key for items
        const key = `${spaceToDash(item).toLowerCase()}-${index}`;

        return (<li className="search__option" key={key} onClick={()=>handleOptionClick(item)}>{item}</li>)
      })}</ul>
    </div>
  );
};

export default Search;
