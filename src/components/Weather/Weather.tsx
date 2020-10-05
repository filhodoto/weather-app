import React, { ChangeEvent, FC, useContext, useEffect } from 'react';
import { StoreContext } from 'app/App';
import './weather.scss';
import { fetchWeather } from 'api/weather';

const Weather: FC = (): JSX.Element => {
  const { state, dispatch } = useContext(StoreContext)!;
  const { timezone, location, icon, temperature, feedback } = state.weather;

  const handleSearchChange = (ev: ChangeEvent<HTMLInputElement>) => {
    console.log(ev.target.value);
  };

  return (
    <main className="information">
      <div className="information__timezone">{timezone}</div>
      <div className="information__location">{location}</div>
      <div className="information__icon">{icon}</div>
      <div className="information__temperature">{temperature}</div>
      <div className="information__feedback">{feedback}</div>
      <input type="text" value="Type Location" onChange={handleSearchChange} />
    </main>
  );
};

export default Weather;
