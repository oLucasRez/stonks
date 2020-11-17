import { lighten, opacify, shade } from 'polished';
import styled from 'styled-components';
//---------------------------------------------------------------< utils >
import getRandomInt from '../../utils/getRandomInt';
//================================================================[ BODY ]
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
  flex-direction: column;
  justify-items: center;

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

  .buttons {
    width: 100%;
    height: 7rem;
    max-width: 42rem;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;

    button {
      width: 100%;

      display: grid;

      font-size: 1.8rem;
      font-weight: bold;
      border: 0;
      color: white;

      p {
        justify-self: center;
        align-self: center;
      }

      :enabled {
        opacity: 1;
        cursor: pointer;
      }

      :focus {
        outline: none;
      }
    }

    .back-to-form {
      grid-template-columns: 4rem auto;

      border-radius: 3.5rem 1rem 1rem 3.5rem;
      background: ${({ theme }) => theme.colors.foreground[2]};
      opacity: 0.3;

      svg {
        justify-self: flex-end;
        align-self: center;
      }

      @keyframes arrow-form {
        0% {
          transform: translateX(0rem);
        }
        100% {
          transform: translateX(-0.3rem);
        }
      }

      :enabled {
        :hover {
          transition: 0.1s;
          background: ${({ theme }) =>
            theme.title === 'dark'
              ? shade(0.1, theme.colors.foreground[2])
              : lighten(0.1, theme.colors.foreground[2])};

          svg {
            transition: 0.1s;
            animation-name: arrow-form;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-duration: 0.4s;
            animation-timing-function: ease;
          }
        }
      }
    }

    .see-results {
      grid-template-columns: auto 4rem;

      border-radius: 1rem 3.5rem 3.5rem 1rem;
      background: ${({ theme }) => theme.colors.green};
      opacity: 0.3;

      svg {
        justify-self: flex-start;
        align-self: center;
      }

      @keyframes arrow-results {
        0% {
          transform: translateX(0rem);
        }
        100% {
          transform: translateX(0.3rem);
        }
      }

      :enabled {
        :hover {
          transition: 0.1s;
          background: ${({ theme }) => shade(0.1, theme.colors.green)};

          svg {
            transition: 0.1s;
            animation-name: arrow-results;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-duration: 0.4s;
            animation-timing-function: ease;
          }
        }
      }
    }
  }
`;
