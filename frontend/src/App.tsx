import React from 'react';
//---------------------------------------------------------------< pages >
import Main from './pages/Main/index';
//----------------------------------------------------------< components >
import { ToastContainer } from 'react-toastify';
//---------------------------------------------------------------< hooks >
import useStorageState from './hooks/useStorageState';
//--------------------------------------------------------------< styles >
import { DefaultTheme, ThemeProvider } from 'styled-components';
import dark from './styles/themes/dark';
import light from './styles/themes/light';
import GlobalStyles from './styles/global';
import 'react-toastify/dist/ReactToastify.css';
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
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
