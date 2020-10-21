import React, { FC } from 'react';
// eslint-disable-next-line
import { css } from 'styled-components/macro';
import 'styles/weather-icons.min.css';

import { IWeatherState } from 'state/reducers/appReducer';

const WeatherIcon: FC<{
  id: IWeatherState['id'] | string;
  size: string;
  padding?: string;
}> = ({ id, size, padding }): JSX.Element => {
  // define className depeding if we're using the icon with the openWeather codes or
  // directly by using the weather-icons original classes (when we wanna use a icon that doesn't have a openWeather code)
  // https://erikflowers.github.io/weather-icons/
  const icon = typeof id === 'string' ? `wi-${id}` : `wi-owm-${id}`;

  return (
    <i
      className={`wi ${icon}`}
      css={`
        font-size: ${size};
        padding: ${`${padding ? padding : '0'} !important`};
      `}
    />
  );
};

export default WeatherIcon;
