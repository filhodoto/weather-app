import React, { FC } from 'react';
import { IWeatherState } from 'state/reducers/appReducer';
import './weather-icon.scss';

const WeatherIcon: FC<{ className: string; id: IWeatherState['id'] }> = ({
  className,
  id,
}): JSX.Element => {
  return <i className={`${className} wi wi-owm-${id}`}></i>;
};

export default WeatherIcon;
