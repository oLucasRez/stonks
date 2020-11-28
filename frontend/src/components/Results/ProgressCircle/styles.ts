import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  color: string;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  width: 16rem;
  height: 16rem;

  div {
    width: 16rem;
    height: 16rem;

    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    cursor: default;

    font-size: 3.6rem;
  }

  svg {
    display: block;

    .circle {
      stroke: ${({ theme }) => theme.colors.background[2]};
      stroke-width: 1rem;
      fill: ${({ theme }) => theme.colors.background[1]};
    }

    .progress {
      stroke: ${({ color }) => color};
      stroke-width: 1rem;
      fill: none;
      stroke-linecap: round;
    }
  }
`;
