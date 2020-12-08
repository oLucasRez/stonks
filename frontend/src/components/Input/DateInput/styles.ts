import styled from 'styled-components';
import { lighten } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  width: 100%;
`;
//------------------------------------------------------------------------
export const MonthContainer = styled.ul<StyleProps>`
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;

  li {
    margin: 0.1rem 0;

    cursor: pointer;

    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.foreground[1]};
  }

  .selected {
    padding: 0.2rem 1rem;

    border-radius: 1.2rem;
    font-size: 1.6rem;
    background: ${({ colorPrimary }) => colorPrimary};
    color: white;

    :hover {
      background: ${({ colorPrimary }) => lighten(0.1, colorPrimary)};
    }
  }

  .day-not-selected {
    margin: 0;

    border-radius: 1.4rem;
    border: 1px solid ${({ colorPrimary }) => colorPrimary};
    background: none;
    color: ${({ theme }) =>
      theme.title === 'dark' ? 'white' : theme.colors.foreground[0]};

    :hover {
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? lighten(0.1, theme.colors.background[0])
          : lighten(0.1, theme.colors.background[2])};
    }
  }
`;
//------------------------------------------------------------------------
export const DaysContainer = styled.ul<StyleProps>`
  width: 100%;
  margin-top: 0.8rem;

  li {
    width: 4rem;
    height: 4rem;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-size: 1.6rem;
    background: ${({ theme }) => theme.colors.background[2]};

    :hover {
      background: ${({ theme }) => lighten(0.1, theme.colors.background[2])};
    }
  }

  .selected {
    background: ${({ colorPrimary }) => colorPrimary};
    color: white;

    :hover {
      background: ${({ colorPrimary }) => lighten(0.1, colorPrimary)};
    }
  }
`;
//------------------------------------------------------------------------
export const SuggestionContainer = styled.div<StyleProps>`
  font-size: 2.2rem;

  h3 {
    margin-bottom: 1.1rem;

    color: ${({ theme }) => theme.colors.foreground[1]};
    font-size: 1.4rem;
    font-style: italic;
    font-weight: 600;
    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};
  }

  li {
    margin: 0.1rem 0;
    width: 5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    list-style-type: none;

    font-size: 1.3rem;
    color: ${({ theme }) => theme.colors.foreground[1]};
  }

  .selected {
    padding: 0.2rem 1rem;

    border-radius: 1.2rem;
    font-size: 1.6rem;
    background: ${({ colorPrimary }) => colorPrimary};
    color: white;

    :hover {
      background: ${({ colorPrimary }) => lighten(0.1, colorPrimary)};
    }
  }

  .not-selected {
    margin: 0;

    border-radius: 1.4rem;
    border: 1px solid ${({ colorPrimary }) => colorPrimary};
    background: none;
    color: ${({ theme }) =>
      theme.title === 'dark' ? 'white' : theme.colors.foreground[0]};

    :hover {
      background: ${({ theme }) =>
        theme.title === 'dark'
          ? lighten(0.1, theme.colors.background[0])
          : lighten(0.1, theme.colors.background[2])};
    }
  }
`;
