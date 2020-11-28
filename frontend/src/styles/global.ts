import { createGlobalStyle } from 'styled-components';
//===============================================================[ STYLE ]
export default createGlobalStyle`
  :root {
    font-size: 66.66%;
  }

  @media(max-width: 425px) {
    :root {
      font-size: 50%;
    }
  }

  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  html, body, #root {
    height: 100vh;
  }

  body {
    display: flex;
    justify-content: center;

    color: ${({ theme }) => theme.colors.foreground[0]};
    background: ${({ theme }) => theme.colors.background[1]};
  }

  body, input, button, textarea, select {
    font-size: 1.6rem;
    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
