import React, { FC, useContext } from 'react';
import styled from 'styled-components/macro';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';
import { charactersToSpace, pxToRem, roundTo } from 'helpers/generic/generic';
import { scaleFadeIn, float } from 'styles/sharedStyles';

const Information = styled.div`
  animation: ${scaleFadeIn} 0.6s ease-in-out;

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
        {charactersToSpace(timezone)}
      </p>
      <Heading fontSize={pxToRem(24)} aria-label='location'>
        {place}
      </Heading>
      <WeatherIcon
        id={id}
        size={pxToRem(115)}
        padding={`${pxToRem(15)} 0 ${pxToRem(25)}`}
        aria-label='weather icon'
        css={`
          animation: ${float} 6s 1s ease-in-out infinite;
        `}
      />
      <p className='information__feedback'>{feedback}</p>
      <Heading
        fontSize={pxToRem(32)}
        css={`
          margin-top: ${pxToRem(15)};
        `}
        aria-label='temperature'
      >
        {roundTo(temperature, 1)}
        <WeatherIcon id='celsius' />
      </Heading>
      <Heading
        fontSize={pxToRem(14)}
        css={`
          font-weight: 400;
        `}
        aria-label='feels like temperature'
      >
        Feels like {roundTo(feelsLike, 1)} <WeatherIcon id='celsius' />
      </Heading>
    </Information>
  );
};

export default Weather;
