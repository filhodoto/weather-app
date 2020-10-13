import {
  IAppState,
  ILocationCoordenates,
  IWeatherState,
} from 'state/reducers/appReducer';

const APIKey: string = 'b1ef52becbe7113f7cda50d29fd6ce86';
const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/weather';
const BASE_URL_ONE_CALL: string =
  'https://api.openweathermap.org/data/2.5/onecall';

// Cache used so we don't repeat the oneCall API fetch
const oneCallcache: {
  [key: string]: string;
} = {};

export const fetchWeather = async (
  location: IAppState['location'],
  settings: IAppState['settings']
) => {
  const url: string = await setFetchUrl(location, settings);
  const response: any = await fetchCurrentWeatherData(url);
  // If call fails, return error message
  if (response.cod !== 200) {
    return await { response };
  }

  // If we already make this call, get value from cache
  if (oneCallcache[response.name]) {
    const timezone = oneCallcache[response.name];
    return { response, timezone };
  } else {
    // If it's the first time this place is searched,,
    // get the timezone response latitude and longitude and oneCall API
    const {
      timezone,
    }: { [key: string]: IWeatherState['timezone'] } = await fetchOneCallData(
      response.coord
    );

    // Cache response so we don't have to do this call again
    oneCallcache[response.name] = timezone;
    return { response, timezone };
  }
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
