import React from 'react';
import { render, cleanup, screen } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

describe('Elements are rendered on first load', () => {
  it('Renders logo text', () => {
    const { getByText } = render(<App />);
    expect(getByText(/weather app/i)).toBeInTheDocument();
  });

  it('Renders Footer', () => {
    const { getByText } = render(<App />);
    expect(getByText(/created by/i)).toBeInTheDocument();
  });

  it('Renders Loading', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Loading.../i)).toBeInTheDocument();
  });
});

//TODO:: Passar o Context para poder criar o Search e todos os outros components

// describe('Snapshot testing', () => {
//   test('should take App snapshot', () => {
//     const { asFragment } = render(<App />);
//     expect(asFragment(<App />)).toMatchSnapshot();
//   });
// });
