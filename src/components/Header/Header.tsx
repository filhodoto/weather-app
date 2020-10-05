import Search from 'components/Search/Search';
import React from 'react';
import './header.scss';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <div>Weather App</div>
      <Search />
    </header>
  );
};

export default Header;
