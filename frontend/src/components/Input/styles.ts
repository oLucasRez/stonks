import { shade } from 'polished';
import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  width: 100%;

  display: grid;
  grid-template-rows: 3.3rem auto;

  header {
    margin-bottom: 1.1rem;

    display: flex;
    justify-content: space-between;

    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};

    label {
      color: ${({ theme }) => theme.colors.foreground[1]};

      cursor: default;

      svg {
        margin-right: 5px;

        color: ${({ theme }) => theme.colors.primary[0]};
      }
    }

    .alarm {
      cursor: pointer;
    }
  }

  section {
    height: fit-content;
    margin-bottom: 2.5rem;

    background: none;
  }
`;

export const Aside = styled.aside<StyleProps>`
  max-width: 28rem;
  padding: 1rem;

  display: grid;
  position: fixed;

  background: ${({ theme }) =>
    theme.title === 'dark'
      ? theme.colors.background[1]
      : theme.colors.background[0]};
  border-radius: 1rem;
  border-bottom: 2px solid ${({ colorPrimary }) => colorPrimary};
  box-shadow: 0.5rem 0.5rem 0.8rem #00000055;
  font-size: 1.2rem;
  transform: translateX(37rem);
  animation-name: suggestion;
  animation-duration: 0.2s;
  animation-timing-function: ease;

  b {
    color: ${({ colorPrimary }) => colorPrimary};
    font-size: 1.6rem;
  }

  :hover {
    border: 1px solid ${({ colorPrimary }) => colorPrimary};
    border-bottom: 2px solid ${({ colorPrimary }) => colorPrimary};
  }

  @keyframes suggestion {
    0% {
      transform: translateX(37rem) translate(-50%, -50%) scale(0, 0);
    }
    10% {
      transform: translateX(37rem) translate(0, 0) scale(1, 1);
    }
  }

  @media (max-width: 1028px) {
    transform: translateX(37rem) translate(-120%, 2.4rem);

    @keyframes suggestion {
      0% {
        transform: translateX(37rem) translate(-120%, 2.4rem)
          translate(50%, -50%) scale(0, 0);
      }
      10% {
        transform: translateX(37rem) translate(-120%, 2.4rem) translate(0, 0)
          scale(1, 1);
      }
    }
  }
`;
