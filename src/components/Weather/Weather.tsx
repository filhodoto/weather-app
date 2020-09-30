import React, { FC, Reducer, useReducer } from 'react';
import {
  IWeatherState,
  weatherReducer,
  weatherInitialState,
} from 'state/reducers/weatherReducer';
import './weather.scss';

const Weather: FC = (): JSX.Element => {
  const [state] = useReducer<Reducer<IWeatherState, {}>>(
    weatherReducer,
    weatherInitialState
  );

  const { timezone, location, icon, temperature, feedback } = state;

  return (
    <main className="information">
      <div className="information__timezone">{timezone}</div>
      <div className="information__location">{location}</div>
      <div className="information__icon">{icon}</div>
      <div className="information__temperature">{temperature}</div>
      <div className="information__feedback">{feedback}</div>
    </main>
  );
};

export default Weather;
