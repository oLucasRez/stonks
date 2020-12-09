import { lighten, shade } from 'polished';
import styled from 'styled-components';
//---------------------------------------------------------------< utils >
import getRandomInt from '../../utils/getRandomInt';
//===============================================================[ STYLE ]
export const Container = styled.div`
  width: 75vw;
  height: 100%;

  display: grid;
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: 200px auto;
  grid-template-areas: 'left-header middle-header switch' 'body body body';

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
    width: 100%;
  }

  @media (max-width: 425px) {
    .logo {
      margin-left: 2rem;
    }

    .switch {
      margin-right: 2rem;
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
    font-family: 'Comic Sans MS';
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
  padding: 2rem 4rem;

  grid-area: body;
  display: grid;
  grid-template-rows: 56vh 7rem auto;
  grid-template-areas: 'form' 'button' 'footer';
  flex-direction: column;
  justify-items: center;

  @media (max-width: 425px) {
    padding: 2rem 1rem;
  }

  .hidden-form {
    @keyframes form-end {
      0% {
        opacity: 1;
      }
      100% {
        transform: translateX(-50%) scaleX(0);
      }
    }

    grid-area: form;
    z-index: 10;

    animation-name: form-end;
    display: grid;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    opacity: 0;
    position: static;
  }

  .visible-form {
    @keyframes form-start {
      0% {
        transform: translateX(-50%) scaleX(0);
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    grid-area: form;
    z-index: 20;

    animation-name: form-start;
    display: grid;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    position: static;
  }

  .hidden-results {
    width: 100%;
    height: 46rem;
    max-width: 42rem;

    @keyframes results-end {
      0% {
        opacity: 1;
      }
      100% {
        transform: translateX(50%) scaleX(0);
      }
    }

    grid-area: form;
    z-index: 10;

    animation-name: results-end;
    display: grid;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    opacity: 0;
    position: static;
  }

  .visible-results {
    @keyframes results-start {
      0% {
        transform: translateX(50%) scaleX(0);
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    grid-area: form;
    z-index: 20;

    animation-name: results-start;
    display: grid;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    position: static;
  }

  .description {
    align-self: flex-end;
    text-align: center;
    font-size: 1.2rem;
    color: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.foreground[1]
        : theme.colors.foreground[2]};

    b {
      font-size: 1.4rem;
      color: ${({ theme }) =>
        theme.title === 'dark'
          ? theme.colors.foreground[0]
          : theme.colors.foreground[1]};
    }
  }
`;
//------------------------------------------------------------------------
export const FormAndResultContainer = styled.div`
  width: 100%;
  height: 46rem;
  max-width: 42rem;

  display: grid;
`;
//------------------------------------------------------------------------
export const ButtonContainer = styled.div`
  width: 100%;
  height: 7rem;
  max-width: 42rem;

  grid-area: button;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-template-areas: 'to-form to-results';

  button {
    width: 100%;

    display: grid;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    cursor: pointer;

    font-size: 1.8rem;
    font-weight: bold;
    border: 0;
    color: white;

    p {
      justify-self: center;
      align-self: center;
    }

    svg,
    .loading {
      align-self: center;
    }

    :focus {
      outline: none;
    }

    :hover {
      transition: 0.1s;

      svg {
        transition: 0.1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-duration: 0.4s;
        animation-timing-function: ease;
      }
    }

    .alarm {
      position: fixed;
    }
  }

  @keyframes to-form-animation {
    0% {
      transform: translateX(100%);
      background: ${({ theme }) => theme.colors.green};
      border-radius: 1rem 3.5rem 3.5rem 1rem;
    }
  }

  .to-form {
    grid-area: to-form;
    grid-template-columns: 4rem auto;

    animation-name: to-form-animation;
    border-radius: 3.5rem 1rem 1rem 3.5rem;
    background: ${({ theme }) => theme.colors.foreground[2]};

    svg {
      justify-self: flex-end;
    }

    @keyframes arrow-form {
      100% {
        transform: translateX(-0.3rem);
      }
    }

    :hover {
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? shade(0.1, theme.colors.foreground[2])
          : lighten(0.1, theme.colors.foreground[2])};

      svg {
        animation-name: arrow-form;
      }
    }
  }

  @keyframes to-results-animation {
    0% {
      transform: translateX(-100%);
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? shade(0.1, theme.colors.foreground[2])
          : lighten(0.1, theme.colors.foreground[2])};
      border-radius: 3.5rem 1rem 1rem 3.5rem;
    }
  }

  .to-results {
    grid-area: to-results;
    grid-template-columns: auto 4rem;

    animation-name: to-results-animation;
    border-radius: 1rem 3.5rem 3.5rem 1rem;
    background: ${({ theme }) => theme.colors.green};

    svg {
      justify-self: flex-start;
    }

    @keyframes arrow-results {
      100% {
        transform: translateX(0.3rem);
      }
    }

    :hover {
      background: ${({ theme }) => shade(0.1, theme.colors.green)};

      svg {
        animation-name: arrow-results;
      }
    }
  }
`;
