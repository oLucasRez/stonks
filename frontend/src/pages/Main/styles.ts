import styled from "styled-components";

export const Container = styled.div`
  width: 75vw;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 200px auto;
  grid-template-areas: "header header" "form result";

  background: ${({ theme }) => theme.colors.background[1]};

  .logo {
    width: 50%;

    grid-area: header;
    align-self: center;
    justify-self: center;

    fill: ${({ theme }) => theme.colors.foreground[0]};
  }

  .switch {
    margin-right: 5%;

    grid-area: header;
    align-self: center;
    justify-self: right;
  }

  @media (max-width: 1080px) {
    grid-template-rows: 60px auto;

    .logo {
      width: auto;
      height: 75%;
      margin: 5% 0 0 5%;

      justify-self: left;
    }

    .switch {
      margin-top: 5%;
    }
  }

  @media (max-width: 720px) {
    width: 100vw;
  }
`;
