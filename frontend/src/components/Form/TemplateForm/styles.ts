import styled from 'styled-components';
import { shade, lighten } from 'polished';
//===============================================================[ STYLE ]
export const Container = styled.div`
  .side {
    display: flex;

    font-size: 0.1px;

    .icon {
      width: 3.2rem;
      height: 3.2rem;

      opacity: 0.5;
      color: ${({ theme }) => theme.colors.foreground[1]};
    }

    :hover {
      transform: translateY(-3px);
      animation-timing-function: ease;
      transition: 0.2s;

      .icon {
        color: ${({ theme }) => lighten(0.1, theme.colors.foreground[1])};
      }
    }
  }
`;
//------------------------------------------------------------------------
export const Header = styled.header`
  display: flex;
  align-items: center;

  .alert {
    margin: 0 -1.4rem;
    transform: translate(1.4rem, -3.6rem);
    z-index: 20;
  }

  .main,
  .side {
    height: 8.2rem;
    padding: 0 1.6rem 1rem;

    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .main + .side,
  .side + .main,
  .alert + div {
    margin-left: 0.8rem;
  }

  .main {
    width: fit-content;
    z-index: 10;

    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 1.6rem;

    border: 2px solid ${({ theme }) => theme.colors.background[1]};
    border-bottom: 0;
    border-radius: 1rem 1rem 0 0;
    background: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.background[1]
        : theme.colors.background[0]};

    .icon {
      width: 3.2rem;
      height: 3.2rem;

      color: ${({ color }) => color};
    }

    .title {
      font-size: 1.8rem;
      color: ${({ color }) => color};
    }

    :hover {
      background: ${({ theme }) =>
        shade(
          0.02,
          theme.title === 'dark'
            ? theme.colors.background[1]
            : theme.colors.background[0]
        )};
      transform: translateY(-3px);
      animation-timing-function: ease;
      transition: 0.2s;
    }
  }
`;
//------------------------------------------------------------------------
export const Form = styled.form`
  height: 44vh;
  padding: 2.5rem;
  margin-top: -1rem;

  display: grid;

  border: 2px solid ${({ theme }) => theme.colors.background[1]};
  border-radius: 1rem;
  background: ${({ theme }) =>
    theme.title === 'dark'
      ? theme.colors.background[1]
      : theme.colors.background[0]};

  .inputs {
    height: 100%;
    margin-right: -2.5rem;
    padding-right: 2.5rem;

    display: grid;
    overflow-x: hidden;
    overflow-y: scroll;

    .input-cell {
      margin-right: -1.6rem;
    }

    span {
      height: 7rem;
    }

    ::-webkit-scrollbar {
      width: 1.6rem;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 0.8rem;
      background: ${({ theme }) => theme.colors.background[2]};

      :hover {
        background: ${({ theme }) => shade(0.2, theme.colors.background[2])};
      }
    }
  }

  footer {
    width: 100%;
    height: 0.7rem;
    margin-bottom: -2.5rem;

    border-radius: 0.7rem 0.7rem 0 0;
    justify-self: center;
    align-self: flex-end;

    background: ${({ color }) => color};
  }
`;
