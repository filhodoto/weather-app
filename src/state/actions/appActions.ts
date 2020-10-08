import { Dispatch } from 'react';
import { IAppState, IOneCallResponse } from 'state/reducers/appReducer';
export const SET_LOADING: string = 'SET_LOADING';
export const SET_LOCATION: string = 'SET_LOCATION';
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
    response: IAppState['weather'];
    oneCallResponse: IOneCallResponse;
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
