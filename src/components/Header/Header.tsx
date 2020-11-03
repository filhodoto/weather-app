import React from 'react';
import styled from 'styled-components/macro';
import Search from 'components/Search/Search';
import ToggleSwitch from 'components/ui/ToggleSwitch';
import { device } from 'styles/MediaQueries';

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  flex-flow: column;

  // Wrapping full line ${``} beacuse of this TS issue:
  // https://github.com/microsoft/typescript-styled-plugin/issues/110
  ${`@media screen and ${device.min.mobile}`} {
    flex-direction: row;
  }
`;

const LeftSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  // Wrapping full line ${``} beacuse of this TS issue:
  // https://github.com/microsoft/typescript-styled-plugin/issues/110
  ${`@media screen and ${device.min.mobile}`} {
    width: auto;
    margin-bottom: 0;
    min-width: 220px;
  }
`;

const Logo = styled.h1`
  font-family: ${(props) => props.theme.fonts.headingFont};
`;

const ThemeSwitch = styled(ToggleSwitch)`
  ${`@media ${device.min.mobile} and ${device.max.tablet} `} {
    margin-top: 40px;
    position: absolute;
    top: 0;
  }
`;

const Header = (): JSX.Element => {
  return (
    <HeaderStyled>
      <LeftSection>
        <Logo data-testid='logo' aria-label='app logo'>
          Weather App
        </Logo>
        <ThemeSwitch />
      </LeftSection>
      <Search />
    </HeaderStyled>
  );
};

export default Header;
