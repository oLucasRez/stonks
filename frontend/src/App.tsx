import React from 'react';
//---------------------------------------------------------------< pages >
import Main from './pages/Main/index';
//---------------------------------------------------------------< hooks >
import useStorageState from './hooks/useStorageState';
//--------------------------------------------------------------< styles >
import { DefaultTheme, ThemeProvider } from 'styled-components';
import dark from './styles/themes/dark';
import light from './styles/themes/light';
import GlobalStyles from './styles/global';
//=================================================================[ APP ]
const App = () => {
  //--------------------------------------------------------< properties >
  const [theme, setTheme] = useStorageState<DefaultTheme>('theme', dark);
  //-----------------------------------------------------------< methods >
  const toggleTheme = () => {
    setTheme(theme.title === 'dark' ? light : dark);
  };
  //------------------------------------------------------------< return >
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Main toggleTheme={toggleTheme} />
      </ThemeProvider>
    </>
  );
};

export default App;
