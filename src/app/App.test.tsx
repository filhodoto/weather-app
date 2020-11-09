import { render, cleanup } from '@testing-library/react';
import App from './App';
import { renderWithContextAndTheme } from 'helpers/jest-testing';

afterEach(cleanup);

describe('Elements are rendered on first load', () => {
  it('Renders logo, loading and footer', () => {
    const { getByTestId } = render(renderWithContextAndTheme(App));
    expect(getByTestId(/logo/i)).toBeInTheDocument();
    expect(getByTestId(/footer/i)).toBeInTheDocument();
    expect(getByTestId(/loader/i)).toBeInTheDocument();
  });
});
