import styled from "styled-components";
//---------------------------------------------------------------< utils >
import getRandomInt from "../../utils/getRandomInt";
//================================================================[ BODY ]
export const Container = styled.div`
  width: 75vw;
  height: 100%;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-template-rows: 200px auto;
  grid-template-areas: "left-header middle-header middle-header switch" "form form result result";

  background: ${({ theme }) => theme.colors.background[0]};

  .logo {
    height: 60%;

    grid-area: middle-header;
    align-self: center;
    justify-self: center;

    fill: ${({ theme }) => theme.colors.foreground[0]};
  }

  .switch {
    margin-right: 5rem;

    grid-area: switch;
    align-self: center;
    justify-self: right;
  }

  @media (max-width: 1720px) {
    .logo {
      height: 7vw;
    }
  }

  @media (max-width: 1080px) {
    grid-template-rows: 10rem auto;

    .logo {
      height: 60%;
      grid-area: left-header;
      margin-left: 5rem;

      align-self: center;
      justify-self: left;
    }

    .switch {
      margin-top: 5%;
    }
  }

  @media (max-width: 720px) {
    width: 100vw;
  }

  @media (max-width: 420px) {
    .logo {
      width: 50vw;
      height: auto;
      margin-left: 10vw;
    }

    .switch {
      margin-right: 10vw;
    }
  }
`;
//------------------------------------------------------------------------
export const PhraseContainer = styled.div`
  width: 40.2rem;
  height: 75%;

  grid-area: middle-header;
  align-self: center;
  justify-self: center;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;

  .phrase {
    text-align: center;

    font-size: 1.8rem;
    font-family: "Comic Sans MS";
    color: ${({ theme }) => theme.colors.primary[getRandomInt(0, 3)]};
    -webkit-animation: phrase-animation 1.5s infinite;
    -moz-animation: phrase-animation 1.5s infinite;
    -o-animation: phrase-animation 1.5s infinite;
    animation: phrase-animation 1.5s infinite;
  }

  @-webkit-keyframes phrase-animation {
    0%,
    100% {
      transform: rotate(-15deg) scale(1, 1);
    }
    50% {
      transform: rotate(-15deg) scale(1.05, 1.05);
    }
  }
  @-moz-keyframes phrase-animation {
    0%,
    100% {
      transform: rotate(-15deg) scale(1, 1);
    }
    50% {
      transform: rotate(-15deg) scale(1.05, 1.05);
    }
  }
  @-o-keyframes phrase-animation {
    0%,
    100% {
      transform: rotate(-15deg) scale(1, 1);
    }
    50% {
      transform: rotate(-15deg) scale(1.05, 1.05);
    }
  }
  @keyframes phrase-animation {
    0%,
    100% {
      transform: rotate(-15deg) scale(1, 1);
    }
    50% {
      transform: rotate(-15deg) scale(1.05, 1.05);
    }
  }

  @media (max-width: 1720px) {
    width: 25.2vw;
    height: 8.5vw;

    .phrase {
      font-size: 1.1vw;
    }
  }

  @media (max-width: 1080px) {
    .phrase {
      display: none;
    }
  }
`;
//------------------------------------------------------------------------
export const FormContainer = styled.div`
  margin: 2rem 2rem 0 0;

  grid-area: form;
  display: flex;
  justify-content: flex-end;
`;
