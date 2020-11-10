import styled from 'styled-components';
//================================================================[ BODY ]
export const Container = styled.section`
  display: flex;

  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.foreground[1]};

  input {
    width: 12.4rem;
    height: 5.2rem;
    margin-left: 1.1rem;
    padding: 1.1rem;

    cursor: default;
    display: flex;
    align-items: center;

    font-size: 2.8rem;
    outline: none;
    color: ${({ theme }) => theme.colors.foreground[1]};
    background: ${({ theme }) =>
      theme.title === 'dark'
        ? theme.colors.background[2]
        : theme.colors.background[1]};

    border: none;
    border-radius: 5px;
  }
`;
