// Create styles that should be imported to other components here
import { css, keyframes } from 'styled-components';
import { pxToRem } from 'helpers/generic/generic';

// Our App uses grid to get a full height design (alternative to 100vh) but for this
// to work in mobile we need these elements to have height: 100%

// Another option would be to use 100vh but that comes with a known mobile issue:
// https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae

// Another solution for the future could be use react-div-100vh
// https://github.com/mvasin/react-div-100vh
export const FixForFullHeight = css`
  html,
  body,
  #root {
    height: 100%;
    /* overflow: auto; */
  }
`;

export const acessibilityFocus = css`
  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px solid goldenrod;
  }
`;

/* Animations */
export const expanse = keyframes`
    to {
      transform: scale(1.5);
      opacity: 0;
    }
`;

export const float = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(${pxToRem(-8)});
	}
	100% {
		transform: translatey(0px);
	}
}`;

export const scaleFadeOut = keyframes`
	0% {
    transform: scale(1);
    opacity: 1;
	}
	100% {
    transform: scale(0.8);
    opacity: 0;

	}
}`;

export const scaleFadeIn = keyframes`
	0% {
    transform: scale(0.8);
    opacity: 0;
	}
	100% {
    transform: scale(1);
    opacity: 1;
	}
}`;

export const fadeIn = keyframes`
	0% {
    opacity: 0;
	}
	100% {
    opacity: 1;
	}
}`;
