import styled from 'styled-components';
import { lighten } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//================================================================[ BODY ]
export const Container = styled.div`
  width: 100%;
  height: auto;
`;
//------------------------------------------------------------------------
export const Check = styled.div<StyleProps>`
  margin-left: 2.8rem;
  margin-top: 0.8rem;

  display: inline-flex;
  align-items: center;
  cursor: default;

  transform: translate(-2.8rem, -0.8rem);

  svg {
    width: 2.1rem;
    height: 2.1rem;
    margin-right: 0.8rem;

    cursor: pointer;

    color: ${({ colorPrimary }) => colorPrimary};

    :hover {
      color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
    }
  }
`;
