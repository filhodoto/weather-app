import React, {
  FC,
  Reducer,
  useEffect,
  useReducer,
  createContext,
  Dispatch,
  useState,
} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/globalStyles';
import { themeController } from 'theme/theme';
import { Helmet } from 'react-helmet';
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
import Loading from 'components/ui/Loading/Loading';
import FeedbackMsg from 'components/ui/FeedbackMsg/FeedbackMsg';
import { device } from 'styles/MediaQueries';

// Define store context
export const StoreContext = createContext<{
  state: IAppState;
  dispatch: Dispatch<any>;
} | null>(null);

const AppWrapper = styled.div`
  height: 100%;
  overflow: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  text-align: center;

  color: ${(props) => props.theme.colors.primary};
  background-image: ${(props) => props.theme.colors.bgGradient};

  * {
    box-sizing: border-box;
  }

  & > * {
    width: 100%;
    padding: 20px;

    // Wrapping full line ${``} beacuse of this TS issue:
    // https://github.com/microsoft/typescript-styled-plugin/issues/110
    ${`@media screen and ${device.min.tablet}`} {
      padding: 10px;
    }
  }

  a {
    color: inherit;
    text-decoration: inherit;
    display: contents;
  }

  input {
    &:focus {
      outline: none;
    }
  }
`;

const MainWrapper = styled.main`
  place-items: center;
  display: grid;
`;

// Update location in store
export async function updateLocationInStore(dispatch: Dispatch<any>) {
  const response: ILocationCoordenates | string = await getCurrentLatLong();

  // If response is an error
  if (typeof response === 'string') {
    // Sent the fail message to state
    fetchWeaterFailed(response, dispatch);

    // Remove Loading
    setLoading(false, dispatch);
  } else {
    // Set location in state
    setLocation(
      {
        lat: response.lat,
        lon: response.lon,
      },
      dispatch
    );
  }
}

const App: FC = (): JSX.Element => {
  const [state, dispatch] = useReducer<Reducer<IAppState, Dispatch<any>>>(
    appReducer,
    appState
  );

  const [fetchedGeoLocation, setfetchedGeoLocation] = useState(false);

  // Update weather details in store and remove loading
  const updateWeatherInStore = async () => {
    const { response, timezone } = await fetchWeather(
      state.location,
      state.settings
    );
    // Handle API response
    // If data returns a code 200 and oneCallResponse we fire success, if not we fire fail
    (await response.cod) === 200 && timezone
      ? fetchWeaterSucess({ response, timezone }, dispatch)
      : fetchWeaterFailed(response.message, dispatch);

    // Remove Loading
    setLoading(false, dispatch);
  };

  // Update location data when app first renders
  useEffect(() => {
    if (navigator.geolocation && state.location === '' && !fetchedGeoLocation) {
      updateLocationInStore(dispatch);

      // Prevent infinite loop when geolocation fails and stateLocation doesn't change
      setfetchedGeoLocation(true);
    }
  }, [state.location, fetchedGeoLocation]);

  // Update weather in store when location changes
  useEffect(() => {
    if (state.location === '') {
      return;
    }
    updateWeatherInStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.location]);

  // Update themeProvicer when we change settings theme
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.settings.theme]);

  return (
    <ThemeProvider theme={themeController[state.settings.theme]!}>
      <AppWrapper>
        <Helmet>
          <meta charSet='utf-8' />
          <meta
            name='description'
            content='Weather app to check current weather in any location'
          />
          <html lang={state.settings.lang} />
        </Helmet>
        <StoreContext.Provider value={{ state, dispatch }}>
          <Header />
          <MainWrapper>
            {state.loading ? (
              <Loading />
            ) : state.errorMsg ? (
              <FeedbackMsg type='error' message={state.errorMsg} />
            ) : (
              <Weather />
            )}
          </MainWrapper>
          <Footer />
        </StoreContext.Provider>
      </AppWrapper>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
