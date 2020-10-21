import React, { FC, useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import { StoreContext } from 'app/App';
import { setTheme } from 'state/actions/appActions';
import { ISettings } from 'state/reducers/appReducer';
import WeatherIcon from './WeatherIcon/WeatherIcon';

const Toggle = styled.div<{ styling: ISettings['theme'] }>`
  --circleSize: 20px;
  --circleMargin: 0.2rem;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    width: 3.5rem;
    height: 1.8rem;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 1rem;
    position: relative;
    border: 1px solid ${(props) => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease;
  }

  // Default
  span {
    border-radius: 50%;
    width: var(--circleSize);
    height: var(--circleSize);
    margin: 0 var(--circleMargin);
    background: ${(props) => props.theme.colors.primary};
    transform: translateX(0);
    transition: 0.4s ease;
  }

  // Dark Mode
  ${(props) =>
    props.styling === 'dark' &&
    css`
      span {
        transform: translateX(
          calc(100% + ((var(--circleSize) / 2) - (var(--circleMargin) / 2)))
        );
      }
    `}
`;

const ToggleSwitch: FC = () => {
  const { dispatch, state } = useContext(StoreContext)!;

  const icons: Record<ISettings['theme'], string> = {
    dark: 'night-clear',
    light: 'day-sunny',
  };

  const handleToggleClick = () => {
    const theme: ISettings['theme'] =
      state.settings.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme, dispatch);
  };

  return (
    <Toggle styling={state.settings.theme}>
      <WeatherIcon
        id={icons[state.settings.theme]}
        size={'1rem'}
        padding={'0 0.6rem 0 0'}
      />
      <label onClick={handleToggleClick}>
        <span></span>
      </label>
    </Toggle>
  );
};

export default ToggleSwitch;
