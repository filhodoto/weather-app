import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { renderWithContextAndTheme } from 'helpers/jest-testing';

afterEach(cleanup);

describe('Elements are rendered on first load', () => {
  it('Renders logo, loading and footer', () => {
    const { getByTestId, getByText } = render(renderWithContextAndTheme(App));
    expect(getByTestId(/logo/i)).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });

  // it('Renders Footer', () => {
  //   const { getByTestId } = render(renderWithContextAndTheme(App));
  //   expect(getByTestId('footer')).toBeInTheDocument();
  // });

  // it('Renders Loading on app start', () => {
  //   const { getByText } = render(renderWithContextAndTheme(App));
  //   expect(getByText(/Loading.../i)).toBeInTheDocument();
  // });
});
