import { IAppState } from 'state/reducers/appReducer';

export const fetchCities = async (
  search: string,
  lang: IAppState['settings']['lang']
) => {
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

  const result: string[] = [];

  // Populate new array with only the name of the hits
  res.hits.forEach((location: any) => result.push(location.locale_names[0]));

  return result;
};
