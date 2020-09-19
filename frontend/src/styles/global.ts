import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;

    font-family: "Open Sans", sans-serif;
    font-weight: 600;
  }

  body {
    height: 100vh;
    display: flex;
    justify-content: center;

    font-size: 18px;
    color: ${({ theme }) => theme.colors.foreground[2]};
    background: ${({ theme }) => theme.colors.background[2]};
  }
`;
