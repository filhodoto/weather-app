import { getCurrentYear } from 'helpers/helpers';
import React from 'react';
import './footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      created by{' '}
      <a href="http://goncaloramalho.com" target="blank_">
        {' '}
        Gonçalo Ramalho
      </a>{' '}
      {getCurrentYear()}
    </footer>
  );
};

export default Footer;
