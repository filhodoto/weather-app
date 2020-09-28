import React from 'react';

const Information = (): JSX.Element => {
  return (
    <main className="information">
      <div className="information__timezone">Timezone</div>
      <div className="information__icon">Icon</div>
      <div className="information__temperature">temperature</div>
      <div className="information__feedback">feedback</div>
    </main>
  );
};

export default Information;
