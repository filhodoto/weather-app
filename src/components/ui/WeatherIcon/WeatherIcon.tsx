import React, { FC } from 'react';
import styled from 'styled-components/macro';

import { IWeatherState } from 'state/reducers/appReducer';
import 'styles/weather-icons.min.css';

export const Icon = styled.i<{ size: string }>`
  font-size: ${(props) => props.size};
`;

const WeatherIcon: FC<{ id: IWeatherState['id']; size: string }> = ({
  id,
  size,
}): JSX.Element => {
  return <Icon className={`wi wi-owm-${id}`} size={size} />;
};

export default WeatherIcon;
