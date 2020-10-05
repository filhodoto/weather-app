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
    fetchWeaterSucess(data, dispatch);
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
        {state.loading ? <div>Loading...</div> : <Weather />}
        <Footer />
      </StoreContext.Provider>
    </div>
  );
};

export default App;