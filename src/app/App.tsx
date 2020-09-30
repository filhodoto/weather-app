import React, { FC, Reducer, useEffect, useReducer } from 'react';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Weather from 'components/Weather/Weather';
import './app.scss';
import {
  appReducer,
  IAppState,
  initialAppState,
} from 'state/reducers/appReducer';
import { fetchWeather } from 'api/weather';
import {
  IWeatherState,
  weatherInitialState,
  weatherReducer,
} from 'state/reducers/weatherReducer';

const App: FC = (): JSX.Element => {
  // const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer<Reducer<IAppState, any>>(
    appReducer,
    initialAppState
  );

  const [{}, weatherDispatch] = useReducer<Reducer<IWeatherState, any>>(
    weatherReducer,
    weatherInitialState
  );

  // Get data on
  async function getData() {
    const data = await fetchWeather(3);
    console.log('data ', data);
    await weatherDispatch({
      type: 'FETCH_WEATHER_SUCCESS',
      payload: data,
    });

    await dispatch({
      type: 'SET_LOADING',
      loading: false,
    });
  }

  useEffect(() => {
    // TODO:: Make Weather.tsx listen to this dispatch
    getData();
  }, []);

  return (
    <div className="app">
      <Header />
      {state.loading && <div>Loading...</div>}
      <Weather />
      <Footer />
    </div>
  );
};

export default App;
