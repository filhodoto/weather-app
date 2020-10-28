import React, { FC } from 'react';
import { themeController } from 'theme/theme';
import { StoreContext } from 'app/App';
import { ThemeProvider } from 'styled-components';
import { appState } from 'state/reducers/appReducer';

// Render function with Theme and Context (used for jest testing)
export const renderWithContextAndTheme = (TestComponent: any): JSX.Element => {
  const state = appState;
  const dispatch = () => {};
  return (
    <ThemeProvider theme={themeController['light']!}>
      <StoreContext.Provider value={{ state, dispatch }}>
        <TestComponent />
      </StoreContext.Provider>
    </ThemeProvider>
  );
};
