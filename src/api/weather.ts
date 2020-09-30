const APIKey: string = 'b1ef52becbe7113f7cda50d29fd6ce86';
const BASE_URL: string = 'https://api.openweathermap.org/data/2.5/';

//TODO:: prepare this to receive either city string or lat, lng object
export const fetchWeather = async (location: any) => {
  const url = setFetchUrl(location);

  const result = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
      return error;
    });

  return result;
};

export const setFetchUrl = (location: any) => {
  if (typeof location === 'string') {
    return `${BASE_URL}weather?q=${location}&appid=${APIKey}`;
  } else {
    // TODO:: Remove default lat and long and use information sent by props
    const lat = 33.441792;
    const lon = -94.037689;
    return `${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  }
};
