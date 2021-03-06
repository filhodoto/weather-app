import React, { ChangeEvent, FC, useContext, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/macro';
import { setLocation } from 'state/actions/appActions';
import { StoreContext, updateLocationInStore } from 'app/App';
import { fetchCities } from 'api/cities';
import { DebounceInput, DebounceInputProps } from 'react-debounce-input';
import sizeMe from 'react-sizeme';

// Import svg elements in a basic way from an image file
import { ReactComponent as LocationIconSvg } from 'assets/icons/location-icon.svg';
import { pxToRem, spaceToDash } from 'helpers/generic/generic';
import { device } from 'styles/MediaQueries';
import { acessibilityFocus } from 'styles/sharedStyles';
import useOnclickOutside from 'react-cool-onclickoutside';

const InputPadding: string = `${pxToRem(9.5)} ${pxToRem(16)}`;
const InputBorderRadius: string = `${pxToRem(5)}`;

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  border: none;
  font-size: medium;

  // Wrapping full line ${``} beacuse of this TS issue:
  // https://github.com/microsoft/typescript-styled-plugin/issues/110
  ${`@media screen and ${device.min.mobile}`} {
    min-width: ${pxToRem(220)};
    width: auto;
  }

  * {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const SearchInputWrapper = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  padding: ${InputPadding};
  border-radius: ${InputBorderRadius};
  width: 100%;
  background: ${(props) => props.theme.colors.primary};

  ${(props) =>
    props.open &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}
`;

const Input = styled(DebounceInput)<DebounceInputProps<{}, {}>>`
  flex: 1;
  padding-right: ${pxToRem(10)};
  border: none;
  background: none;
  font-family: ${(props) => props.theme.fonts.bodyFont};
  font-size: medium;

  &::placeholder {
    opacity: 0.6;
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const OptionsContainer = styled.ul<{ marginTop: string }>`
  text-align: left;
  position: absolute;
  width: 100%;
  top: ${(props) => props.marginTop}; ;
`;

const LocationOption = styled.li`
  padding: ${InputPadding};
  cursor: pointer;
  text-decoration: none;
  display: block;
  background-color: ${(props) => props.theme.colors.primary};
  border-bottom: 1px ${(props) => props.theme.colors.secondary} solid;
  transition: all 0.2s;

  &:first-child {
    border-top: 1px ${(props) => props.theme.colors.secondary} solid;
  }

  &:last-child {
    border-bottom-left-radius: ${InputBorderRadius};
    border-bottom-right-radius: ${InputBorderRadius};
    border-bottom: 0;
  }

  &:hover {
    opacity: 1;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.secondary};
  }
`;

// TODO:: Maybe create a declaration file for 'react-sizeme' npm package
interface IReactSizeMe {
  width: number;
  height: number;
  position: number;
}

const Search: FC<{ size: IReactSizeMe }> = (props): JSX.Element => {
  const { dispatch, state } = useContext(StoreContext)!;
  const [searchValue, setSearchValue] = useState<string>('');
  const [locationOptions, setlocationOptions] = useState<string[]>([]);

  // Reference to add an action when we click outisde the element with this reference
  const clickOustideRef = useOnclickOutside(() => {
    // If location list is open, clean list (which will remove it)
    if (locationOptions.length > 0) {
      // Clean options
      setlocationOptions([]);
    }
  });

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
          type='text'
          placeholder='Search for location'
          value={searchValue}
          debounceTimeout={800}
          onChange={(ev: ChangeEvent): void => handleSearchChange(ev)}
          onKeyDown={(
            ev: React.KeyboardEvent<HTMLInputElement>
          ): Promise<void> => handleKeyDown(ev)}
        />

        <LocationIconSvg
          onClick={handleLocationClick}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') handleLocationClick();
          }}
          aria-label='Get current weather'
          tabIndex={0}
          css={`
            cursor: pointer;
            fill: ${({ theme }: { [key: string]: DefaultTheme }) =>
              theme.colors.secondary};
            ${acessibilityFocus}
          `}
        />
      </SearchInputWrapper>
      <OptionsContainer
        marginTop={`${pxToRem(props.size.height)}`}
        data-testid='options-container'
        aria-label='locations list'
        ref={clickOustideRef}
      >
        {locationOptions.map((item: string, index) => {
          // Create a key for items
          const key = `${spaceToDash(item).toLowerCase()}-${index}`;
          return (
            <LocationOption
              data-testid='options-item'
              aria-label='location option'
              key={key}
              onClick={() => handleOptionClick(item)}
            >
              {item}
            </LocationOption>
          );
        })}
      </OptionsContainer>
    </SearchWrapper>
  );
};

export default sizeMe({ monitorHeight: true })(Search);
