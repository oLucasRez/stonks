import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.textarea`
  width: 100%;
  height: 12.2rem;
  padding: 0.7rem 1.1rem;

  resize: none;

  color: ${({ theme }) => theme.colors.foreground[1]};
  background: ${({ theme }) =>
    theme.title === "dark"
      ? theme.colors.background[2]
      : theme.colors.background[1]};
  border: none;
  border-radius: 1rem;
  outline: none;

  ::placeholder {
    opacity: 0.5;
  }

  ::-webkit-scrollbar {
    width: 1.5rem;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid
      ${({ theme }) =>
        theme.title === "dark"
          ? theme.colors.background[2]
          : theme.colors.background[1]};
    border-radius: 0.55rem;
    background: ${({ theme }) =>
      theme.title === "dark"
        ? theme.colors.background[1]
        : theme.colors.background[0]};

    :hover {
      background: ${({ theme }) => shade(0.2, theme.colors.background[2])};
    }
  }
`;
