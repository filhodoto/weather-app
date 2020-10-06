import { ILocationCoordenates } from 'helpers/location';
import {
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

const weatherState: IWeatherState = {
  timezone: '',
  place: '',
  temperature: 0,
  feelsLike: 0,
  id: null,
  feedback: '',
};

export interface IAppState {
  loading: boolean;
  location: ILocationCoordenates | string;
  weather: IWeatherState;
}

export const appState: IAppState = {
  loading: true,
  location: '',
  weather: weatherState,
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
      const data = action.payload;
      return {
        ...state,
        weather: {
          timezone: data.timezone,
          place: data.name,
          id: data.weather[0].id,
          temperature: data.main.temp,
          feelsLike: data.main.feels_like,
          feedback: data.weather[0].description,
        },
      };

    default:
      console.log('OTHER ACTION TYPE');
      break;
  }
};
