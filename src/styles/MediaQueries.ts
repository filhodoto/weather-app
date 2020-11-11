// Defining some media-queries to use in this project
// For now an object with values is enough, but for a bigger project this could be a good option:
// styled-media-query - https://github.com/morajabi/styled-media-query

/* NOTE: Unfortunatly when calling these variables inside styled-componentes we came upon a TypeScript issue
 ** So instead of using media queries as EX1, we have to wrap full line with template literals ${``} like EX2
 ** EX1: @media screen and ${device.min.mobile}
 ** EX2: ${`@media screen and ${device.min.mobile}`}
 **
 ** See issue: https://github.com/microsoft/typescript-styled-plugin/issues/110
 */

interface MediaQuerieSizes {
  mobile: string;
  tablet: string;
  laptop: string;
}

const size: MediaQuerieSizes = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
};

export const device: { min: MediaQuerieSizes; max: MediaQuerieSizes } = {
  min: {
    mobile: `(min-width: ${size.mobile})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
  },
  max: {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
  },
};
