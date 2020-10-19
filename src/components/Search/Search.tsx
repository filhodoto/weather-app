import React, { ChangeEvent, FC, useContext, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/macro';
import { setLocation } from 'state/actions/appActions';
import { StoreContext, updateLocationInStore } from 'app/App';
import { fetchCities } from 'api/cities';
import { DebounceInput } from 'react-debounce-input';

// Import svg elements in a basic way from an image file
import { ReactComponent as LocationIconSvg } from 'assets/icons/location-icon.svg';
import { spaceToDash } from 'helpers/helpers';

const basePadding: string = '0.6rem 1rem';
const borderRadius: string = '5px;';

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: none;
  font-size: medium;
  width: 100%;

  @media screen and (min-width: 480px) {
    position: absolute;
    top: 10px;
    right: 10px;
    min-width: 220px;
    width: auto;
  }

  * {
    color: ${(props) => props.theme.colors.secondaryColor};
  }

  /* locationOptions.length > 0 */
`;

const SearchInputWrapper = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  padding: ${basePadding};
  border-radius: ${borderRadius};
  width: 100%;
  background: ${(props) => props.theme.colors.primaryColor};

  ${(props) =>
    props.open &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Input = styled(DebounceInput)`
  flex: 1;
  padding-right: 10px;
  border: none;
  background: none;
  font-family: ${(props) => props.theme.fonts.bodyFont};
  font-size: medium;

  &::placeholder {
    opacity: 0.8;
    color: ${(props) => props.theme.colors.secondaryColor};
  }
`;

const LocationOption = styled.li`
  padding: ${basePadding};
  cursor: pointer;
  text-decoration: none;
  display: block;
  background-color: ${(props) => props.theme.colors.primaryColor};
  border-bottom: 1px ${(props) => props.theme.colors.secondaryColor} solid;
  transition: all 0.2s;

  &:first-child {
    border-top: 1px ${(props) => props.theme.colors.secondaryColor} solid;
  }

  &:last-child {
    border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
    border-bottom: 0;
  }

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.primaryColor};
    background-color: ${(props) => props.theme.colors.secondaryColor};
  }
`;

const Search: FC = (): JSX.Element => {
  const { dispatch, state } = useContext(StoreContext)!;
  const [searchValue, setSearchValue] = useState<string>('');
  const [locationOptions, setlocationOptions] = useState<string[]>([]);

  const populateLocationOptions = async (searchQuery: string) => {
    // Get cities from API
    const options: string[] = await fetchCities(
      searchQuery,
      state['settings']['lang']
    );
    // Set options in state
    setlocationOptions(options);
  };

  const handleSearchChange = (ev: ChangeEvent<any>) => {
    ev.preventDefault();
    // If search input is not empty
    if (ev.target.value.trim() !== '') {
      populateLocationOptions(ev.target.value.toLowerCase());
    }

    // If search input is empty, clean state
    if (ev.target.value.trim() === '') cleanState();

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
  };

  const handleKeyDown = async (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === 'Enter' && searchValue.trim() !== '') {
      await setLocation(searchValue, dispatch);

      // Clean state
      cleanState();
    }
  };

  return (
    <SearchWrapper>
      <SearchInputWrapper open={locationOptions.length > 0}>
        <Input
          type="text"
          placeholder="Search for location"
          value={searchValue}
          onChange={(ev: ChangeEvent): void => handleSearchChange(ev)}
          onKeyDown={(
            ev: React.KeyboardEvent<HTMLInputElement>
          ): Promise<void> => handleKeyDown(ev)}
        />
        <LocationIconSvg
          onClick={handleLocationClick}
          css={`
            cursor: pointer;
            fill: ${({ theme }: { [key: string]: DefaultTheme }) =>
              theme.colors.secondaryColor};
          `}
        />
      </SearchInputWrapper>
      <ul className="search__options-wrapper" css="text-align: left;">
        {locationOptions.map((item: string, index) => {
          // Create a key for items
          const key = `${spaceToDash(item).toLowerCase()}-${index}`;

          return (
            <LocationOption key={key} onClick={() => handleOptionClick(item)}>
              {item}
            </LocationOption>
          );
        })}
      </ul>
    </SearchWrapper>
  );
};

export default Search;
