import styled from 'styled-components';
import { lighten } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//===============================================================[ STYLE ]
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
//------------------------------------------------------------------------
export const SuggestionContainer = styled.div<StyleProps>`
  font-size: 1.6rem;

  h3 {
    margin-bottom: 1.1rem;

    color: ${({ theme }) => theme.colors.foreground[1]};
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 600;
    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};
  }
`;
