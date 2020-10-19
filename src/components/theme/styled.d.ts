import { CSSObject, CSSProp, DefaultTheme } from 'styled-components/macro';

// Fix for Typescript issue with css prop
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}

// Add style declarartions to styled-components DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bgGradient: string;
      primaryColor: string;
      secondaryColor: string;
    };
    fonts: {
      bodyFont: string;
      headingFont: string;
    };
  }
}
