import { IAppState, ILocationCoordenates } from 'state/reducers/appReducer';

const APIKey: string = 'b1ef52becbe7113f7cda50d29fd6ce86';
const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_URL_ONE_CALL: string =
  'https://api.openweathermap.org/data/2.5/onecall';

export const fetchWeather = async (
  location: IAppState['location'],
  settings: IAppState['settings']
) => {
  const url = await setFetchUrl(location, settings);
  const response = await fetchCurrentWeatherData(url);

  // If the first call was successfull we use the oneCall type of API
  // to get the timezone based on the first api response latitude and longitude

  // TODO:: Find a way to not repeat this call everytime, save the results in an array
  // or something and check if lat+lon where already fetch, if so the response should be in the array
  if (response.cod === 200) {
    const oneCallResponse = await fetchOneCallData(response.coord);
    return { response, oneCallResponse };
  }

  return { response };
};

// Fetch weather information from Current weather data
// https://openweathermap.org/current
const fetchCurrentWeatherData = (url: string) => {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
};

// Fetch weather information from One Call Api, we use this one to get the timezone name
// https://openweathermap.org/api/one-call-api
const fetchOneCallData = (coordinates: ILocationCoordenates) => {
  return fetch(
    `${BASE_URL_ONE_CALL}?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly,daily,alerts&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });
};

const setFetchUrl = (
  location: IAppState['location'],
  settings: IAppState['settings']
) => {
  const request =
    typeof location === 'string'
      ? `q=${location}`
      : `lat=${location.lat}&lon=${location.lon}`;

  return `${BASE_URL}?${request}&units=${settings.units}&lang=${settings.lang}&appid=${APIKey}`;
};
