import React, { FC } from 'react';

const FeedbackMsg: FC<{ className?: string; message: string }> = (
  props
): JSX.Element => {
  return (
    <div className={`${props.className ? props.className : ''}`}>
      {props.message}
    </div>
  );
};

export default FeedbackMsg;
