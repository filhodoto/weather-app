import { getCurrentYear } from 'helpers/generic/generic';
import React from 'react';
import styled from 'styled-components/macro';

const FooterStyled = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: small;
  height: 50px;
`;

const Footer = (): JSX.Element => {
  return (
    <FooterStyled data-testid='footer'>
      created by{' '}
      <a
        href='http://goncaloramalho.com'
        target='blank_'
        aria-label='author page link'
      >
        {' '}
        Gonçalo Ramalho
      </a>{' '}
      {getCurrentYear()}
    </FooterStyled>
  );
};

export default Footer;
