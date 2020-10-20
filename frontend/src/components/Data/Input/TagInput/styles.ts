import styled from 'styled-components';

export const Container = styled.div`
  margin-right: -1.1rem;

  transform: translateY(-1.1rem);

  div {
    margin: 1.1rem 1.1rem 0 0;

    cursor: pointer;
  }

  svg {
    width: 2.6rem;
    height: 2.6rem;
  }
`;

export const Tag = styled.div`
  width: fit-content;
  height: 4.2rem;
  padding: 0.8rem;

  /* font-size: 16px; */

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: ${({ theme }) =>
    theme.title === 'dark'
      ? theme.colors.background[2]
      : theme.colors.background[1]};
  border-radius: 2.1rem;

  p {
    margin: 0 0.8rem;
  }

  input {
    width: 13.6rem;
    margin: 0 0.8rem 0 -1.8rem;

    color: ${({ theme }) => theme.colors.foreground[1]};
    background: none;
    border: none;
    outline: none;

    :focus {
      border-bottom: 1px solid yellow;
    }

    ::placeholder {
      color: ${({ theme }) => theme.colors.foreground[2]};
    }
  }
`;

export const AddTag = styled.div`
  width: 4.2rem;
  height: 4.2rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: none;
  border-radius: 50%;
`;
