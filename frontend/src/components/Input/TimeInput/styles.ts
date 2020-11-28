import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
  limitReached: boolean;
}
//===============================================================[ STYLE ]
export const Container = styled.section<StyleProps>`
  display: flex;
  align-items: center;

  font-size: 2.4rem;
  color: ${({ theme }) => theme.colors.foreground[1]};

  input {
    width: 7.8rem;
    height: 5.2rem;
    margin-right: 1.1rem;
    padding-left: 1.2rem;

    cursor: text;
    display: flex;
    align-items: center;
    outline: none;

    font-size: 2.1rem;
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

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;
