import React, {
  FC,
  Reducer,
  useEffect,
  useReducer,
  createContext,
  Dispatch,
} from 'react';
import './app.scss';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Weather from 'components/Weather/Weather';
import { appReducer, IAppState, appState } from 'state/reducers/appReducer';
import { fetchWeather } from 'api/weather';
import { getCurrentLatLong, ILocationCoordenates } from 'helpers/location';
import {
  fetchWeaterSucess,
  fetchWeaterFailed,
  setLoading,
  setLocation,
} from 'state/actions/appActions';

// Define store context
export const StoreContext = createContext<{
  state: IAppState;
  dispatch: Dispatch<any>;
} | null>(null);

const App: FC = (): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<IAppState, any>>(
    appReducer,
    appState
  );

  // Update the location in store
  async function updateLocationInStore() {
    const position: ILocationCoordenates = await getCurrentLatLong();
    setLocation(
      {
        lat: position.lat,
        long: position.long,
      },
      dispatch
    );
  }

  // Update weather details in store and remove loading
  const updateWeatherInStore = async () => {
    const data = await fetchWeather(state.location);
    // Handle API response
    // If data returns a code that it's not 200 it means it had an error
    data.cod !== 200
      ? fetchWeaterFailed(data.message, dispatch)
      : fetchWeaterSucess(data, dispatch);

    // Remove Loading
    setLoading(false, dispatch);
  };

  // Update location data when app first renders
  useEffect(() => {
    if (navigator.geolocation && state.location === '') {
      updateLocationInStore();
    }
  });

  // Update weather in store when location changes
  useEffect(() => {
    if (state.location === '') {
      return;
    }
    updateWeatherInStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.location]);

  return (
    <div className="app">
      <StoreContext.Provider value={{ state, dispatch }}>
        <Header />
        {state.loading ? (
          <div>Loading...</div>
        ) : state.errorMsg ? (
          <div className="error-msg">{state.errorMsg}</div>
        ) : (
          <Weather />
        )}
        <Footer />
      </StoreContext.Provider>
    </div>
  );
};

export default App;
