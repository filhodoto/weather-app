import { render, cleanup } from '@testing-library/react';
import Search from './Search';
import { renderWithContextAndTheme } from 'helpers/jest-testing';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

describe('Search component tests', () => {
  it('Input search should be empty', async () => {
    const { findByPlaceholderText } = await render(
      renderWithContextAndTheme(Search)
    );
    const input = await findByPlaceholderText(/Search for location/i);

    await expect(input).toHaveValue('');
  });

  it('Input search value change should show location options', async () => {
    const { findByPlaceholderText } = await render(
      renderWithContextAndTheme(Search)
    );
    const input = await findByPlaceholderText(/Search for location/i);
    await userEvent.type(input, 'Lis');

    await expect(input).toHaveValue('Lis');
  });
});
