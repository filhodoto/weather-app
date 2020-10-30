import React, { FC, useContext } from 'react';
import styled from 'styled-components/macro';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';

const Information = styled.div`
  & > * {
    padding: 2.5px 0;
  }
`;

const Heading = styled.div<{ fontSize: string }>`
  font-family: ${({ theme }) => theme.fonts.headingFont};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 700;
`;

const Weather: FC = (): JSX.Element => {
  const { state } = useContext(StoreContext)!;
  const { timezone, place, id, temperature, feedback } = state.weather;

  return (
    <Information data-testid="weather-information">
      <p className="information__timezone">{timezone}</p>
      <Heading fontSize={'1.5rem'}>{place}</Heading>
      <WeatherIcon id={id} size="7rem" padding="15px 0 40px" />
      <Heading fontSize={'2rem'}>{temperature}º</Heading>
      <p className="information__feedback">{feedback}</p>
    </Information>
  );
};

export default Weather;
