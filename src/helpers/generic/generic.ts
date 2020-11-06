export const getCurrentYear = (date = new Date()): number => date.getFullYear();

export const spaceToDash = (string: string): string =>
  string.replace(/\s+/g, '-');

export const arrayNotEmpty = (arr: any[]): boolean =>
  typeof arr != 'undefined' && arr != null && arr.length > 0;

export const roundTo = (value: number, decimalPlace: number): number => {
  var multiplier = Math.pow(10, decimalPlace || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const pxToRem = (x: number): string => `${x / 16}rem`;
