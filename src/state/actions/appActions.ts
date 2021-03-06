import { Dispatch } from 'react';
import { IAppState, ISettings, IWeatherState } from 'state/reducers/appReducer';
export const SET_LOADING: string = 'SET_LOADING';
export const SET_LOCATION: string = 'SET_LOCATION';
export const SET_THEME: string = 'SET_THEME';
export const FETCH_WEATHER_SUCCESS: string = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILED: string = 'FETCH_WEATHER_FAILED';

export const setLocation = (
  payload: IAppState['location'],
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: SET_LOCATION,
    payload: payload,
  });
};

export const setLoading = (
  payload: IAppState['loading'],
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: SET_LOADING,
    payload: payload,
  });
};

export const fetchWeaterSucess = (
  payload: {
    response: IWeatherState;
    timezone: IWeatherState['timezone'];
  },
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: FETCH_WEATHER_SUCCESS,
    payload: payload,
  });
};

export const fetchWeaterFailed = (
  payload: IAppState['errorMsg'],
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: FETCH_WEATHER_FAILED,
    payload: payload,
  });
};

export const setTheme = (
  payload: ISettings['theme'],
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: SET_THEME,
    payload: payload,
  });
};
