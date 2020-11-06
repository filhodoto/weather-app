import { pxToRem } from 'helpers/generic/generic';
import React, { FC } from 'react';
import { IAppState } from 'state/reducers/appReducer';
import styled from 'styled-components/macro';

type MessageInterface = 'error' | 'warning' | 'success';

const StyledMsg = styled.p<{ type: MessageInterface }>`
  color: ${(props) => props.theme.colors.primary};
  padding: ${pxToRem(10)} ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  border: 1px solid;
`;

const FeedbackMsg: FC<{
  type: MessageInterface;
  message: IAppState['errorMsg'];
}> = (props): JSX.Element => {
  return <StyledMsg type={props.type}>{props.message}</StyledMsg>;
};

export default FeedbackMsg;
