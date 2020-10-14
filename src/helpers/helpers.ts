export const getCurrentYear = () => {
  const date = new Date();
  return date.getFullYear();
};

export const spaceToDash = (string: string) => string.replace(/\s+/g, '-');
