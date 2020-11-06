import { arrayNotEmpty, getCurrentYear, pxToRem, spaceToDash } from './generic';

it('Should return current year', () => {
  expect(getCurrentYear(new Date(2018, 11))).toBe(2018);
});

it('Should turn string spaces into dash', () => {
  expect(spaceToDash('spider man')).toBe('spider-man');
  expect(spaceToDash('x   men')).toBe('x-men');
});

it('Should tell if array is empty', () => {
  expect(arrayNotEmpty(['ddd', 2])).toBeTruthy();
  expect(arrayNotEmpty([])).toBeFalsy();
});

it('Should convert px to rem', () => {
  expect(pxToRem(10)).toBe('0.625rem');
});
