import { Dispatch } from 'react';
import { IAppState } from 'state/reducers/appReducer';
export const SET_LOADING: string = 'SET_LOADING';
export const SET_LOCATION: string = 'SET_LOCATION';
export const FETCH_WEATHER_SUCCESS: string = 'FETCH_WEATHER_SUCCESS';

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
  payload: IAppState['weather'],
  dispatch: Dispatch<any>
) => {
  dispatch({
    type: FETCH_WEATHER_SUCCESS,
    payload: payload,
  });
};
