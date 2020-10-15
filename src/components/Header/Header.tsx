import Search from 'components/Search/Search';
import React from 'react';
import './header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div className="header__logo">Weather App</div>
      <Search />
    </header>
  );
};

export default Header;
