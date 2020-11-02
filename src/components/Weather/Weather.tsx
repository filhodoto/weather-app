import React, { FC, useContext } from 'react';
import styled from 'styled-components/macro';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';
import { roundTo } from 'helpers/helpers';

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
  const {
    timezone,
    place,
    id,
    temperature,
    feedback,
    feelsLike,
  } = state.weather;

  return (
    <Information>
      <p className="information__timezone">{timezone}</p>
      <Heading fontSize={'1.5rem'}>{place}</Heading>
      <WeatherIcon id={id} size="7rem" padding="15px 0" />
      <p className="information__feedback">{feedback}</p>
      <Heading
        fontSize={'2rem'}
        css={`
          margin-top: 15px;
        `}
      >
        {roundTo(temperature, 1)}º
      </Heading>
      <Heading
        fontSize={'0.9rem'}
        css={`
          font-weight: 400;
        `}
      >
        Feels like {roundTo(feelsLike, 1)}º
      </Heading>
    </Information>
  );
};

export default Weather;
