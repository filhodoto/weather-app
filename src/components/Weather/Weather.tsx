import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import './weather.scss';
import { StoreContext } from 'app/App';

const Weather: FC = (): JSX.Element => {
  const { state, dispatch } = useContext(StoreContext)!;
  const { timezone, location, icon, temperature, feedback } = state.weather;

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
