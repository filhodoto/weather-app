import React, { FC } from 'react';
// eslint-disable-next-line
import { css } from 'styled-components/macro';
import 'styles/weather-icons.min.css';

import { IWeatherState } from 'state/reducers/appReducer';

const WeatherIcon: FC<{
  id: IWeatherState['id'];
  size: string;
  padding?: string;
}> = ({ id, size, padding }): JSX.Element => {
  return (
    <i
      className={`wi wi-owm-${id}`}
      css={`
        font-size: ${size};
        padding: ${`${padding ? padding : '50px 0 20px'} !important`};
      `}
    />
  );
};

export default WeatherIcon;
