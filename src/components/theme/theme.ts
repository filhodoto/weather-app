import { DefaultTheme } from 'styled-components';
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
            to bottom,
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
    bgGradient: `linear-gradient(
        to bottom,
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

    primary: '#fff',
    secondary: '#cacaca',
    alerts: { ...lightTheme.colors.alerts },
  },
  fonts: { ...lightTheme.fonts },
};

export const theme = {
  light: { ...lightTheme },
  dark: { ...darkTheme },
};
