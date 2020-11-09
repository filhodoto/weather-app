import { pxToRem } from 'helpers/generic/generic';
import React, { FC } from 'react';
import { IAppState } from 'state/reducers/appReducer';
import styled from 'styled-components/macro';
import { scaleFadeIn } from 'styles/sharedStyles';

type MessageInterface = 'error' | 'warning' | 'success';

const StyledMsg = styled.p<{ type: MessageInterface }>`
  color: ${(props) => props.theme.colors.primary};
  padding: ${pxToRem(10)} ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  border: 1px solid;
  animation: ${scaleFadeIn} 0.6s ease-in-out;
`;

const FeedbackMsg: FC<{
  type: MessageInterface;
  message: IAppState['errorMsg'];
}> = (props): JSX.Element => {
  return <StyledMsg type={props.type}>{props.message}</StyledMsg>;
};

export default FeedbackMsg;
