import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Information from 'components/Information/Information';
import React from 'react';
import './app.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <Information />
      <Footer />
    </div>
  );
};

export default App;
