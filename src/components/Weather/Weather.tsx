import React, { FC, useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import { StoreContext } from 'app/App';
import WeatherIcon from 'components/ui/WeatherIcon/WeatherIcon';

const Information = styled.div`
  & > * {
    padding: 2.5px 0;
  }
`;
// TODO:: This is not working, understand why
const IconStyled = styled(WeatherIcon)`
  padding: 5px 0 20px;
  color: gainsboro !important;
  border: 1px solid cadetblue;
`;

const Heading = styled.div<{ fontSize: string }>`
  font-family: ${(props) => props.theme.fonts.headingFont};
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
`;

const Weather: FC = (): JSX.Element => {
  const { state } = useContext(StoreContext)!;
  const { timezone, place, id, temperature, feedback } = state.weather;

  return (
    <Information>
      <div className="information__timezone">{timezone}</div>
      <Heading fontSize={'1.5rem'}>{place}</Heading>
      <IconStyled
        id={id}
        size="10rem"
        css={`
          background: papayawhip;
          color: gainsboro !important;
        `}
      />
      <Heading fontSize={'2rem'}>{temperature}º</Heading>
      <div className="information__feedback">{feedback}</div>
    </Information>
  );
};

export default Weather;
