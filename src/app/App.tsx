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
import {
  appReducer,
  IAppState,
  appState,
  ILocationCoordenates,
} from 'state/reducers/appReducer';
import { fetchWeather } from 'api/weather';
import { getCurrentLatLong } from 'helpers/location';
import {
  fetchWeaterSucess,
  fetchWeaterFailed,
  setLoading,
  setLocation,
} from 'state/actions/appActions';

// TODO:: 1 - Create autocomplete input for search
// TODO:: 2 - Add a "Get my location" button (probably next to search)
// TODO:: 3 - Style everything with .scss
// TODO:: 4 - Save scss styling in different branch
// TODO:: 5 - Refactor all the styling to use Emotion and styled-components
// TODO:: 6 - Create Theme change with styled.components
// TODO:: 7 - Implemente github pages or netlify on project
// TODO:: 8 - Check how to implement jest testing


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
        lon: position.lon,
      },
      dispatch
    );
  }

  // Update weather details in store and remove loading
  const updateWeatherInStore = async () => {
    const { response, timezone } = await fetchWeather(
      state.location,
      state.settings
    );
    // Handle API response
    // If data returns a code 200 and oneCallResponse we fire success, if not we fire fail
    // TODO:: Fix this, we still get "Cannot read property 'cod' of undefined" which means a response with "cod" is not coming
    response.cod === 200 && timezone
      ? fetchWeaterSucess({ response, timezone }, dispatch)
      : fetchWeaterFailed(response.message, dispatch);

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
