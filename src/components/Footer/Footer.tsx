import { getCurrentYear } from 'helpers/helpers';
import React from 'react';
import './footer.scss';

const Footer = (): JSX.Element => {
  return (
    <footer className="footer">
      created by Gonçalo Ramalho {getCurrentYear()}
    </footer>
  );
};

export default Footer;
