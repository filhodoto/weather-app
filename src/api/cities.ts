import { arrayNotEmpty, spaceToDash } from 'helpers/generic/generic';
import { IAppState } from 'state/reducers/appReducer';

type LocaleMap = {
  [code: string]: string[];
};
interface Location {
  locale_names: string[] | LocaleMap;
}

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
    // https://community.algolia.com/places/api-clients.html#rest-api
    return JSON.parse(sessionStorage.getItem(cacheKey)!);
  } else {
    const url = `https://places-dsn.algolia.net/1/places/query`;
    const res = await (
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          query: search,
          aroundLatLngViaIP: false,
          hitsPerPage: 8,
          type: 'city',
          language: lang,
        }),
      })
    ).json();

    // If result isn't empty
    if (arrayNotEmpty(res.hits)) {
      // Create new array with only the name of the hits
      const result: string[] = res.hits.reduce(
        (previousArrayState: string[], location: Location) => {
          // For each location in res.hits return the previous
          // array values + the new location value.
          // Define location name, sometimes API doesn't send locale, when that happens th response is an object, instead of a value
          // So we need to check for several possibilities.
          // 1 - check for location.name
          // 2 - check if there's a an english version
          // 3 - check if there's a default

          let locationName: string = '';

          if (Array.isArray(location.locale_names)) {
            locationName = location.locale_names[0];
          } else if (location.locale_names.en) {
            locationName = location.locale_names.en[0];
          } else {
            locationName = location.locale_names.default[0];
          }

          return [...previousArrayState, locationName];
        },
        []
      );

      // Save values on sessionStorage
      sessionStorageAvailable &&
        sessionStorage.setItem(cacheKey, JSON.stringify(result));

      // Return array with city names
      return result;
    }

    // Save values on sessionStorage
    sessionStorageAvailable &&
      sessionStorage.setItem(cacheKey, JSON.stringify(res.hits));
    // Return empry array
    return res.hits;
  }
};
