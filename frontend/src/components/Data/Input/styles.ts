import styled from 'styled-components';

interface StyleProps {
  colorPrimary: string;
}

export const Container = styled.div<StyleProps>`
  width: 21.7em;

  display: grid;
  grid-template-rows: 3.3rem auto;

  label {
    margin-bottom: 1.1rem;

    /* display: grid;
    grid-template-columns: 1.7rem auto 1.7rem;
    align-content: flex-start; */

    color: ${({ theme }) => theme.colors.foreground[1]};
    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};

    cursor: default;

    svg {
      margin-right: 5px;

      color: ${({ theme }) => theme.colors.primary[0]};
    }

    /* .question {
      width: 1.1rem;
      height: 1.1rem;
      justify-self: right;
    } */
  }

  section {
    height: fit-content;
    margin-bottom: 2.5rem;

    background: none;

    /* animation: 0.2s ease-out 0s 1 slide; */
  }

  /* @keyframes slide {
    0% {
      transform: translateY(-1rem);
    }
    100% {
      transform: translateY(0);
    }
  } */
`;
