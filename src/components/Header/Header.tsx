import Search from 'components/Search/Search';
import ToggleSwitch from 'components/ui/ToggleSwitch';
import React from 'react';
import styled from 'styled-components/macro';

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
`;

const Logo = styled.div`
  display: none;

  @media screen and (min-width: 480px) {
    display: block;
  }
`;

const Header = (): JSX.Element => {
  return (
    <HeaderStyled>
      <Logo>Weather App</Logo>
      <ToggleSwitch />
      {/* TODO:: Organize HTML and CSS better to align toggle with search, this is an hotfix */}
      <div>
        <Search />
      </div>
    </HeaderStyled>
  );
};

export default Header;
