import React, { FC } from 'react';

const Loading: FC<{ className?: string }> = (props) => {
  return (
    <div className={`${props.className ? props.className : ''} loading`}>
      Loading...
    </div>
  );
};

export default Loading;
