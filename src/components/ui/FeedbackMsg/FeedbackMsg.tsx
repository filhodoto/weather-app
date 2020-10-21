import React, { FC } from 'react';
import styled from 'styled-components/macro';

type MessageInterface = 'error' | 'warning' | 'success';

const StyledMsg = styled.div<{ type: MessageInterface }>`
  color: ${(props) => props.theme.colors.alerts[`${props.type}`]};
`;

const FeedbackMsg: FC<{
  type: MessageInterface;
  message: string;
}> = (props): JSX.Element => {
  return <StyledMsg type={props.type}>{props.message}</StyledMsg>;
};

export default FeedbackMsg;
