export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const spaceToDash = (string: string) => string.replace(/\s+/g, '-');

export const arrayNotEmpty = (arr: any[]) =>
  typeof arr != 'undefined' && arr != null && arr.length > 0;
