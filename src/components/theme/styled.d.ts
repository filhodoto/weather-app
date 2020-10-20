import { CSSObject, CSSProp, DefaultTheme } from 'styled-components/macro';

// Fix for Typescript issue with css prop
declare module 'react' {
  interface Attributes {
    css?: CSSProp | CSSObject;
  }
}
// Define BaseTheme interface, we define this in this file instead of adding it to 'styled-components' like DefaultTheme
export interface BaseTheme {
  colors: {
    alerts: {
      [success: string]: string;
      [error: string]: string;
      [warning: string]: string;
    };
  };
  fonts: {
    bodyFont: string;
    headingFont: string;
  };
}

// Add style declarartions to 'styled-components' DefaultTheme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      bgGradient: string;
      primary: string;
      secondary: string;
      alerts: BaseTheme['colors']['alerts'];
    };
    fonts: BaseTheme['fonts'];
  }
}
