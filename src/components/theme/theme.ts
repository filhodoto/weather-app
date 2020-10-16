import { DefaultTheme } from 'styled-components';

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
    primaryColor: '#f5f7fa',
    secondaryColor: '#35a2ca',
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

    primaryColor: '#fff',
    secondaryColor: '#cacaca',
  },
  fonts: { ...lightTheme.fonts },
};

export const theme = {
  light: { ...lightTheme },
  dark: { ...darkTheme },
};
