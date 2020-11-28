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
export const SearchBox = styled.input<StyleProps>`
  width: 19.2rem;
  height: 2.2rem;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: none;
  border: none;
  outline: none;

  :focus {
    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.foreground[2]};
  }
`;
//------------------------------------------------------------------------
export const SearchResults = styled.ul<StyleProps>`
  width: fit-content;
  height: auto;
  max-width: 32.4rem;
  max-height: 64rem;
  margin-top: 0.4rem;
  padding: 0.8rem 0.4rem 2.8rem 1.2rem;

  list-style-type: none;
  position: fixed;

  border-radius: 1rem;
  background: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.background[2] : 'none'};
  border: ${({ theme }) =>
    theme.title === 'dark'
      ? 'none'
      : '1px solid ' + theme.colors.background[1]};
  float: inline-end;

  li {
    margin-right: 0.8rem;

    display: inline-block;
    cursor: default;

    font-size: 1.4rem;

    :hover {
      color: ${({ colorPrimary }) => colorPrimary};
      text-decoration: underline;
    }
  }
`;
//------------------------------------------------------------------------
export const Arrows = styled.div<StyleProps>`
  margin: 0 0 -2.6rem -0.8rem;
  padding: 0 0.8rem;

  display: flex;
  justify-content: space-between;

  svg {
    width: 2rem;
    height: 2rem;

    cursor: pointer;

    color: ${({ colorPrimary }) => colorPrimary};

    :hover {
      color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
    }
  }
`;
//------------------------------------------------------------------------
export const Chosen = styled.div<StyleProps>`
  width: fit-content;
  height: 4.2rem;
  padding: 0.8rem;

  display: flex;
  align-items: center;

  background: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.background[2] : 'none'};
  border: ${({ theme }) =>
    theme.title === 'dark'
      ? 'none'
      : '1px solid ' + theme.colors.background[1]};
  border-radius: 2.1rem;

  svg {
    width: 2.6rem;
    height: 2.6rem;

    cursor: pointer;

    color: ${({ colorPrimary }) => colorPrimary};

    :hover {
      color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
    }
  }

  p {
    margin: 0 0.8rem;

    cursor: default;
  }
`;
