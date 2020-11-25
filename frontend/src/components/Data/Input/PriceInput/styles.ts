import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
  limitReached: boolean;
}
//================================================================[ BODY ]
export const Container = styled.section<StyleProps>`
  display: flex;

  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.foreground[1]};

  input {
    width: 12.8rem;
    height: 5.2rem;
    margin-left: 1.1rem;
    padding: 1.1rem;

    cursor: text;
    display: flex;
    align-items: center;

    font-size: 2.8rem;
    outline: none;
    color: ${({ theme, limitReached }) =>
      limitReached ? theme.colors.red : theme.colors.foreground[1]};
    background: ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.background[2] : 'none'};
    border: ${({ theme }) =>
      theme.title === 'dark'
        ? 'none'
        : '2px solid ' + theme.colors.background[1]};
    border-radius: 5px;

    :focus {
      border: 1px solid ${({ colorPrimary }) => colorPrimary};
    }
  }
`;
