import React, { FC, useContext } from 'react';
import styled from 'styled-components/macro';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';
import { pxToRem, roundTo } from 'helpers/generic/generic';

const Information = styled.div`
  & > * {
    padding: ${pxToRem(2.5)} 0;
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
    <Information aria-label='weather information'>
      <p className='information__timezone' aria-label='timezone'>
        {timezone}
      </p>
      <Heading fontSize={pxToRem(24)} aria-label='location'>
        {place}
      </Heading>
      <WeatherIcon
        id={id}
        size={pxToRem(115)}
        padding={`${pxToRem(15)} 0 ${pxToRem(25)}`}
        aria-label='weather icon'
      />
      <p className='information__feedback'>{feedback}</p>
      <Heading
        fontSize={pxToRem(32)}
        css={`
          margin-top: ${pxToRem(15)};
        `}
        aria-label='temperature'
      >
        {roundTo(temperature, 1)}º
      </Heading>
      <Heading
        fontSize={pxToRem(14)}
        css={`
          font-weight: 400;
        `}
        aria-label='feels like temperature'
      >
        Feels like {roundTo(feelsLike, 1)}º
      </Heading>
    </Information>
  );
};

export default Weather;
