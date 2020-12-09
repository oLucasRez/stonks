import styled from 'styled-components';
import { lighten } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
  loaded?: boolean;
}
//===============================================================[ STYLE ]
export const Container = styled.div`
  margin-right: -1.1rem;

  transform: translateY(-1.1rem);

  div {
    margin: 1.1rem 1.1rem 0 0;
  }
`;
//------------------------------------------------------------------------
export const Tag = styled.div<StyleProps>`
  width: fit-content;
  height: 4.2rem;
  padding: 0.8rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: default;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.background[2] : 'none'};
  border: ${({ theme }) =>
    theme.title === 'dark'
      ? 'none'
      : '1px solid ' + theme.colors.background[1]};
  border-radius: 2.1rem;

  :hover {
    background: ${({ theme }) =>
      theme.title === 'dark'
        ? lighten(0.02, theme.colors.background[2])
        : lighten(0.08, theme.colors.background[1])};
  }

  p {
    margin: 0 0.8rem;
  }

  svg {
    width: 2.6rem;
    height: 2.6rem;

    cursor: pointer;

    color: ${({ colorPrimary }) => colorPrimary};

    :hover {
      color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
    }
  }

  input {
    width: 13.6rem;
    margin: 0 0.8rem 0 -1.8rem;

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
  }
`;
//------------------------------------------------------------------------
export const Search = styled.ul<StyleProps>`
  width: fit-content;
  height: auto;
  max-width: 32.4rem;
  max-height: 64rem;
  margin-top: 0.4rem;
  padding: ${({ loaded }) => (loaded ? '0.8rem 0.4rem 2.8rem 1.2rem' : '1rem')};

  list-style-type: none;
  position: fixed;

  border-radius: 1rem;
  color: ${({ theme, loaded, colorPrimary }) =>
    loaded ? theme.colors.foreground[0] : colorPrimary};
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

  i {
    margin-right: 0.8rem;

    color: ${({ theme }) => theme.colors.foreground[2]};
  }
`;
//------------------------------------------------------------------------
export const Arrows = styled.div<StyleProps>`
  margin: 0 0 -2.6rem -0.8rem !important;
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
export const AddTag = styled.div<StyleProps>`
  width: 4.2rem;
  height: 4.2rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: none;
  border-radius: 50%;

  svg {
    width: 2.6rem;
    height: 2.6rem;

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

  .tag {
    width: fit-content;
    height: 4.2rem;
    margin: 0 1.1rem 1.1rem 0;
    padding: 0.8rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: default;

    transition: translate(1.1rem, -1.1rem);
    color: ${({ theme }) => theme.colors.foreground[1]};
    background: ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.background[2] : 'none'};
    border: ${({ theme }) =>
      theme.title === 'dark'
        ? 'none'
        : '1px solid ' + theme.colors.background[1]};
    border-radius: 2.1rem;

    :hover {
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? lighten(0.02, theme.colors.background[2])
          : lighten(0.08, theme.colors.background[1])};
    }

    p {
      margin: 0 0.8rem;
    }

    svg {
      width: 2.6rem;
      height: 2.6rem;

      cursor: pointer;

      color: ${({ colorPrimary }) => colorPrimary};

      :hover {
        color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
      }
    }
  }
`;
