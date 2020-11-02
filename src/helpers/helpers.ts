export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const spaceToDash = (string: string) => string.replace(/\s+/g, '-');

export const roundTo = (value: number, decimalPlace: number) => {
  var multiplier = Math.pow(10, decimalPlace || 0);
  return Math.round(value * multiplier) / multiplier;
};
