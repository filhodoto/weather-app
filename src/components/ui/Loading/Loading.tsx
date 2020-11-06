import { pxToRem } from 'helpers/generic/generic';
import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { expanse } from 'styles/sharedStyles';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  font-family: ${(props) => props.theme.fonts.headingFont};

  font-size: ${pxToRem(13)};
  position: relative;
  z-index: 1;
`;

export const Loader = styled.span`
  position: absolute;
  height: ${pxToRem(100)};
  width: ${pxToRem(100)};
  background: ${(props) => props.theme.colors.secondary};
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.colors.primary};
  opacity: 1;
  animation: ${expanse} 800ms linear infinite;
`;

const Loading: FC = () => {
  return (
    <Container>
      <Text>Searching</Text>
      <Loader />
    </Container>
  );
};

export default Loading;
