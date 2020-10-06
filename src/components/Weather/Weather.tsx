import React, { FC, useContext } from 'react';
import './weather.scss';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';

const Weather: FC = (): JSX.Element => {
  const { state } = useContext(StoreContext)!;
  const { timezone, place, id, temperature, feedback } = state.weather;

  return (
    <main className="information">
      <div className="information__timezone">{timezone}</div>
      <div className="information__place">{place}</div>
      <WeatherIcon className="information__icon" id={id} />
      <div className="information__temperature">{temperature}</div>
      <div className="information__feedback">{feedback}</div>
    </main>
  );
};

export default Weather;
