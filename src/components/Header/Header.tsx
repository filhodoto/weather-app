import Search from 'components/Search/Search';
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
      <Search />
    </HeaderStyled>
  );
};

export default Header;
