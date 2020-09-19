import React from "react";
//---------------------------------------------------------------< pages >
import Main from "./pages/Main/index";
//---------------------------------------------------------------< utils >
import useStorageState from "./utils/useStorageState";
//--------------------------------------------------------------< styles >
import { DefaultTheme, ThemeProvider } from "styled-components";

import dark from "./styles/themes/dark";
import light from "./styles/themes/light";
import GlobalStyles from "./styles/global";
//================================================================[ BODY ]
const App = () => {
  const [theme, setTheme] = useStorageState<DefaultTheme>("theme", dark);

  /// alterna o tema global
  const toggleTheme = () => {
    setTheme(theme.title === "dark" ? light : dark);
  };

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
