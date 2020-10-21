import Search from 'components/Search/Search';
import ToggleSwitch from 'components/ui/ToggleSwitch';
import React from 'react';
import styled from 'styled-components/macro';

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  flex-flow: column;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

const LeftSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;

  @media screen and (min-width: 480px) {
    width: auto;
    margin-bottom: 0;
    min-width: 220px;
  }
`;

const Logo = styled.div`
  font-family: ${(props) => props.theme.fonts.headingFont};
`;

const Header = (): JSX.Element => {
  return (
    <HeaderStyled>
      <LeftSection>
        <Logo>Weather App</Logo>
        <ToggleSwitch />
      </LeftSection>
      <Search />
    </HeaderStyled>
  );
};

export default Header;
