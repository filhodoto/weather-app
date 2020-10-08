import {
  FETCH_WEATHER_FAILED,
  FETCH_WEATHER_SUCCESS,
  SET_LOADING,
  SET_LOCATION,
} from 'state/actions/appActions';

export interface IWeatherState {
  timezone: any;
  place: string;
  temperature: number;
  feelsLike: number;
  id: number | null;
  feedback: string;
}
export interface ILocationCoordenates {
  lat: number;
  lon: number;
}

export interface IOneCallResponse {
  lat: ILocationCoordenates['lat'];
  lon: ILocationCoordenates['lon'];
  timezone: string;
  timezone_offset: number;
}

export interface IAppState {
  loading: boolean;
  location: ILocationCoordenates | string;
  weather: IWeatherState;
  errorMsg: string | null;
  settings: ISettings;
}

interface ISettings {
  units: 'metric' | 'imperial';
  lang: 'en' | 'pt';
}

const weatherState: IWeatherState = {
  timezone: '',
  place: '',
  temperature: 0,
  feelsLike: 0,
  id: null,
  feedback: '',
};

export const appState: IAppState = {
  loading: true,
  location: '',
  weather: weatherState,
  errorMsg: null,
  settings: {
    units: 'metric',
    lang: 'en',
  },
};

export const appReducer = (state: IAppState, action: any): any => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case FETCH_WEATHER_SUCCESS:
      const weatherData = action.payload.response;
      const oneCallData = action.payload.oneCallResponse;

      return {
        ...state,
        weather: {
          timezone: oneCallData.timezone,
          place: weatherData.name,
          id: weatherData.weather[0].id,
          temperature: weatherData.main.temp,
          feelsLike: weatherData.main.feels_like,
          feedback: weatherData.weather[0].description,
        },
        errorMsg: null,
      };

    case FETCH_WEATHER_FAILED:
      return {
        ...state,
        errorMsg: action.payload,
      };

    default:
      console.log('OTHER ACTION TYPE');
      break;
  }
};
