import { spaceToDash } from 'helpers/helpers';
import { IAppState } from 'state/reducers/appReducer';

export const fetchCities = async (
  search: string,
  lang: IAppState['settings']['lang']
) => {
  // Check if sessionStorage is available
  const sessionStorageAvailable = sessionStorage !== null;

  // Create cache key to use with sessionStorage
  const cacheKey = `${spaceToDash(search).toLowerCase()}-cities`;

  // If we already searched this query with API
  if (sessionStorageAvailable && cacheKey in sessionStorage) {
    // Return cached response in sessionStorage
    // sessionStorage only stores strings, so to store and retriev Arrays
    // we need to JSON.parse the value when we restore it and stringify when we save it
    return JSON.parse(sessionStorage.getItem(cacheKey)!);
  } else {
    const url = `https://places-dsn.algolia.net/1/places/query`;
    const res = await (
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: search,
          aroundLatLngViaIP: false,
          hitsPerPage: 5,
          type: 'city',
          language: lang,
        }),
      })
    ).json();

    // Create new array with only the name of the hits
    const result: string[] = res.hits.reduce(function (
      previousArrayState: string[],
      location: any
    ) {
      // For each location in res.hits return the previous
      // array values + the new location value
      return [...previousArrayState, location.locale_names[0]];
    },
    []);

    // Save values on sessionStorage
    sessionStorageAvailable &&
      sessionStorage.setItem(cacheKey, JSON.stringify(result));

    return result;
  }
};
