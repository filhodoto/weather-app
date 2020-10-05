import { ILocationCoordenates } from 'helpers/location';
import {
  FETCH_WEATHER_SUCCESS,
  SET_LOADING,
  SET_LOCATION,
} from 'state/actions/appActions';

export interface IWeatherState {
  timezone: any;
  location: string;
  temperature: number;
  icon: any;
  feedback: string;
  loading: boolean;
}

const weatherState: IWeatherState = {
  timezone: '',
  location: '',
  temperature: 0,
  icon: null,
  feedback: '',
  loading: true,
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
          location: data.name,
          icon: data.weather[0].icon,
          temperature: data.main.temp,
          feedback: data.main.temp,
        },
      };

    default:
      console.log('OTHER ACTION TYPE');
      break;
  }
};
