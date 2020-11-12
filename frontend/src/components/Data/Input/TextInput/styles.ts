import styled from 'styled-components';
import { shade } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//================================================================[ BODY ]
export const Container = styled.textarea<StyleProps>`
  width: 100%;
  height: 12.2rem;
  margin-left: 1px;
  padding: 0.7rem 1.1rem;

  resize: none;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: ${({ theme }) =>
    theme.title === 'dark' ? theme.colors.background[2] : 'none'};
  border: ${({ theme }) =>
    theme.title === 'dark'
      ? 'none'
      : '2px solid ' + theme.colors.background[1]};
  border-radius: 1rem;
  outline: none;

  :focus {
    box-shadow: 0 0 0 1px ${({ colorPrimary }) => colorPrimary};
  }

  ::placeholder {
    opacity: 0.5;
  }

  ::-webkit-scrollbar {
    width: 1.1rem;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0.55rem;
    background: ${({ theme }) =>
      theme.title === 'dark'
        ? shade(0.2, theme.colors.background[2])
        : theme.colors.background[1]};
    border: none;

    :hover {
      background: ${({ theme }) => shade(0.4, theme.colors.background[2])};
    }
  }
`;
