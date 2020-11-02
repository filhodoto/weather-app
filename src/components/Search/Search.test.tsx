import { render, cleanup, screen, act } from '@testing-library/react';
import { fetchCities } from 'api/cities';
import { renderWithContextAndTheme } from 'helpers/jest-testing';
import userEvent from '@testing-library/user-event';
import Search from './Search';

// Clean tests after each test
afterEach(cleanup);

describe('Search DOM tests', () => {
  it('Input search should be empty', async () => {
    render(renderWithContextAndTheme(Search));
    const input = await screen.findByPlaceholderText(/Search for location/i);

    expect(input).toHaveValue('');
  });
});

describe('Search API Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Should return a city name when receing 3 types of location data', async () => {
    // Mock the API call we use in fetchCities and give it a dummy response that would equal a query in real API call
    fetchMock.mockResponseOnce(
      JSON.stringify({
        hits: [
          { locale_names: ['Porto'] },
          {
            locale_names: {
              default: ['Lisbon', 'Lisboa'],
              ru: ['Туркмения'],
            },
          },
          {
            locale_names: {
              en: ['Asansol'],
              ja: ['アサンソル'],
              ru: ['Асансол'],
            },
          },
        ],
      })
    );
    // Fetch cities with query "mockvalue" (could be anything), here we are not using fetch but jest-fetch-mock
    const cities = await fetchCities('mockvalue', 'en');

    // Expect cities to be the same result we would have in our mockResponse
    expect(cities).toStrictEqual(['Porto', 'Lisbon', 'Asansol']);
  });

  it('Should return and empty array if there is no city with query name ', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        hits: [],
      })
    );

    // Fetch cities with query "pq" (could be anything), here we are not using fetch but jest-fetch-mock
    const cities = await fetchCities('nocitywiththisquery', 'en');

    // Expect cities to be the same result we would have in our mockResponse
    expect(cities).toEqual(expect.arrayContaining([]));
  });

  it('Should show city options when user query is successfull', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        hits: [{ locale_names: ['Lisbon'] }],
      })
    );

    render(renderWithContextAndTheme(Search));

    // Find search input
    const input = await screen.findByPlaceholderText(/Search for location/i);

    // When testing, code that causes React state updates should be wrapped into act
    act(() => {
      // Type query in search input
      userEvent.type(input, 'Lisbon');
    });

    // Find new list item element created by successfull query
    const listItem = await screen.findByTestId(/options-item/i);

    expect(listItem).toBeInTheDocument();
  });

  it('Should NOT show city options if query is not successfull', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        hits: [],
      })
    );

    render(renderWithContextAndTheme(Search));

    // Find search input
    const input = await screen.findByPlaceholderText(/Search for location/i);

    // When testing, code that causes React state updates should be wrapped into act
    act(() => {
      // Type query in search input
      userEvent.type(input, 'nocitywiththisquery');
    });

    // Expect element to not be in document
    expect(screen.getByTestId(/options-container/i)).toBeEmptyDOMElement();
  });
});
