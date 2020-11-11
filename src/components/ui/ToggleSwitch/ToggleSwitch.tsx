import React, { FC, useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import { StoreContext } from 'app/App';
import { setTheme } from 'state/actions/appActions';
import { ISettings } from 'state/reducers/appReducer';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { acessibilityFocus } from 'styles/sharedStyles';
import { pxToRem } from 'helpers/generic/generic';

export const Toggle = styled.div<{ styling: ISettings['theme'] }>`
  --circleSize: ${pxToRem(20)};
  --circleMargin: ${pxToRem(3)};
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    width: ${pxToRem(55)};
    height: ${pxToRem(28)};
    padding: 0;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: 1rem;
    position: relative;
    border: 1px solid ${(props) => props.theme.colors.primary};
    cursor: pointer;
    transition: all 0.3s ease;
    ${acessibilityFocus}
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
    display: flex;
    align-items: center;
    justify-content: center;
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

// Note:: When using a component with "styled(component)" we need to let the styled component use a className
export const ToggleIcon = styled(WeatherIcon)`
  color: ${(props) => props.theme.colors.secondary};
`;

// Note:: When using a component with "styled(component)" we need to let the styled component use a className
const ToggleSwitch: FC<{ className?: string }> = ({ className }) => {
  const { dispatch, state } = useContext(StoreContext)!;

  const icons: Record<ISettings['theme'], string> = {
    dark: 'moon-waxing-crescent-5',
    light: 'day-sunny',
  };

  const handleToggleClick = () => {
    switchTheme();
  };

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (ev.key === 'Enter') {
      switchTheme();
    }
  };

  const switchTheme = () => {
    const theme: ISettings['theme'] =
      state.settings.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme, dispatch);
  };

  return (
    <Toggle styling={state.settings.theme} className={className}>
      <button
        onClick={handleToggleClick}
        onKeyPress={handleKeyPress}
        aria-label='switch theme'
        tabIndex={0}
      >
        <span>
          <ToggleIcon id={icons[state.settings.theme]} size={pxToRem(14)} />
        </span>
      </button>
    </Toggle>
  );
};

export default ToggleSwitch;
