import { DefaultTheme } from 'styled-components/macro';
import { BaseTheme } from './styled';

// Define baseTheme for definitions that will be shared between themes
export const baseTheme: BaseTheme = {
  colors: {
    alerts: {
      success: '#228B22',
      error: '#B22222',
      warning: '#FF8C00',
    },
  },
  fonts: {
    bodyFont: 'Abel',
    headingFont: 'Nunito',
  },
};

export const lightTheme: DefaultTheme = {
  colors: {
    bgGradient: `linear-gradient(
            to top,
            #9dddf6,
            #89d4f4,
            #74cbf2,
            #5dc1f0,
            #43b8ef,
            #35b1ea,
            #24aae4,
            #03a3df,
            #079dd5,
            #0b96cb,
            #0f90c2,
            #128ab8
          )`,
    primary: '#f5f7fa',
    secondary: '#35a2ca',
    alerts: {
      success: '#228B22',
      error: '#B22222',
      warning: '#FF8C00',
    },
  },
  fonts: {
    bodyFont: 'Abel',
    headingFont: 'Nunito',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    bgGradient: `linear-gradient(to bottom, #1f3a4f, #1d3c53, #1b3e57, #193f5c, #174160, #124260, #0c4260, #044360, #00435b, #004256, #054250, #0c414b)`,
    primary: '#fff',
    secondary: '#00435b',
    alerts: { ...lightTheme.colors.alerts },
  },
  fonts: { ...lightTheme.fonts },
};

// Use Record so we can use typed maps and prevent error:
// "An index signature parameter type cannot be a union type. Consider using a mapped object type instead.ts(1337)"
// http://www.rickcarlino.com/2017/02/27/real-world-use-case-for-typescript-record-types.html

// NOTE:: Using something like below, however didn't manage to remove a typescropt error whene using
// themeController[`${state.settings.theme}`] instead of themeController['dark']. However because we're typing
// state.settings.theme with specific strings 'light' | 'dark' we can type the Record here with just "string"

// Example of more specific typing that returned issue - themeController: Partial<Record<ISettings['theme'], DefaultTheme>>;

export const themeController: Record<string, DefaultTheme> = {
  light: lightTheme,
  dark: darkTheme,
};
