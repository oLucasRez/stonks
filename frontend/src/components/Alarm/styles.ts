import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  size: number;
  colorPrimary: string;
  pulse: boolean;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  width: ${({ size }) => size}rem;
  height: ${({ size }) => size}rem;

  display: grid;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background[0]};

  .pulse {
    display: grid;
    justify-content: center;
    align-content: center;

    border-radius: 50%;

    animation-name: ${({ pulse }) => (pulse ? 'pulse-animation' : 'none')};
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
  }

  @keyframes pulse-animation {
    0% {
      width: ${({ size }) => size / 2}rem;
      height: ${({ size }) => size / 2}rem;
      border: 3px solid ${({ colorPrimary }) => colorPrimary + 'FF'};
    }
    50% {
      width: ${({ size }) => size / 2}rem;
      height: ${({ size }) => size / 2}rem;
      border: 3px solid ${({ colorPrimary }) => colorPrimary + 'FF'};
    }
    100% {
      width: ${({ size }) => size}rem;
      height: ${({ size }) => size}rem;
      border: 1px solid ${({ colorPrimary }) => colorPrimary + '00'};
    }
  }

  .circle {
    width: ${({ size }) => size / 2}rem;
    height: ${({ size }) => size / 2}rem;

    background: ${({ colorPrimary }) => colorPrimary};
    border-radius: 50%;
  }
`;
//------------------------------------------------------------------------
