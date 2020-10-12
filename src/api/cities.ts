import { IAppState } from 'state/reducers/appReducer';

export const fetchCities = async (
  search: string,
  lang: IAppState['settings']['lang']
) => {
  console.log('search city is ', search);
  const url = `https://places-dsn.algolia.net/1/places/query`;
  const res = await (
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        query: search,
        // hitsPerPage: 5,
        // type: 'city',
        language: lang,
      }),
    })
  ).json();
  console.log(res);
  const result: string[] = [];
  res.hits.forEach((location: any) => result.push(location.locale_names[0]));
  console.log(result);
  return result;
};
