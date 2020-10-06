import { ILocationCoordenates } from 'helpers/location';

const APIKey: string = 'b1ef52becbe7113f7cda50d29fd6ce86';
const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeather = async (location: ILocationCoordenates | string) => {
  console.log('Fetch weather ');
  const url = await setFetchUrl(location);
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });

  return result;
};

const setFetchUrl = (location: ILocationCoordenates | string) => {
  if (typeof location === 'string') {
    return `${BASE_URL}weather?q=${location}&appid=${APIKey}`;
  } else {
    return `${BASE_URL}weather?lat=${location.lat}&lon=${location.long}&appid=${APIKey}`;
  }
};
