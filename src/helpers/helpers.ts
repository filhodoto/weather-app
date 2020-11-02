export const getCurrentYear = (date = new Date()): number => date.getFullYear();

export const spaceToDash = (string: string): string =>
  string.replace(/\s+/g, '-');

export const arrayNotEmpty = (arr: any[]): boolean =>
  typeof arr != 'undefined' && arr != null && arr.length > 0;
