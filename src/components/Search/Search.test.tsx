import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Search from './Search';
import { StoreContext } from 'app/App';

afterEach(cleanup);

describe('Search component tests', () => {
  it(' teste somar só porque sim', () => {
    expect(1 + 1).toBe(2);
  });

  it('Test snapshot Search', async () => {
    const { findByPlaceholderText } = await render(<Search />);
    const input = await findByPlaceholderText(/Search for location/i);
    await expect(input).toHaveValue('');
  });
});
