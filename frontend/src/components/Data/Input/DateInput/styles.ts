import styled from 'styled-components';
import { lighten } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//================================================================[ BODY ]
export const Container = styled.section<StyleProps>`
  display: flex;

  .month-select,
  .day-select {
    width: 7.8rem;
    height: 5.2rem;
    margin-right: 1.8rem;

    cursor: default;
    display: flex;
    align-items: center;

    font-size: 2.1rem;
    outline: none;
    color: ${({ theme }) => theme.colors.foreground[1]};
    background: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.background[2]
        : theme.colors.background[1]};
    border: none;
    border-radius: 5px;
  }

  .month-select {
    .current {
      width: 7.8rem;
      height: 5.2rem;
      padding-left: 1.6rem;

      display: flex;
      align-items: center;
    }

    ul {
      width: 7.8rem;
      height: auto;
      padding: 1rem 1.6rem;

      list-style-type: none;
      position: absolute;

      border-radius: 1rem;
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? theme.colors.background[2]
          : theme.colors.background[0]};
      border: ${({ theme }) =>
        theme.title === 'dark'
          ? 'none'
          : '2px solid ' + theme.colors.background[1]};

      li {
        cursor: default;
        font-size: 1.6rem;

        :hover {
          color: ${({ colorPrimary }) => colorPrimary};
          text-decoration: underline;
        }
      }
    }
  }

  .day-select {
    padding-left: 1.6rem;

    .up {
      transform: translateY(-1rem);
    }
    .down {
      transform: translateY(1rem);
    }

    svg {
      width: 2.8rem;
      height: 2.8rem;
      margin-left: 2.8rem;

      position: absolute;

      color: ${({ colorPrimary }) => colorPrimary};

      :hover {
        color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
      }
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`;
