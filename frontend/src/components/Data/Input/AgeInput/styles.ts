import styled from 'styled-components';
import { lighten, mix } from 'polished';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
  age: number;
}
//================================================================[ BODY ]
export const Container = styled.section<StyleProps>`
  display: flex;

  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.foreground[1]};

  .input {
    width: 7.8rem;
    height: 5.2rem;
    margin-right: 1.8rem;
    padding-left: 1.2rem;

    cursor: default;
    display: flex;
    align-items: center;

    font-size: 2.1rem;
    outline: none;
    color: ${({ theme }) => theme.colors.foreground[1]};
    background: ${({ theme }) =>
      theme.title === 'dark' ? theme.colors.background[2] : 'none'};
    border: 2px solid
      ${({ age }) =>
        age < 10
          ? mix((age - 3) / 7, '#3fd157', '#46b1db')
          : age < 14
          ? mix((age - 10) / 4, '#e0d841', '#3fd157')
          : mix((age - 14) / 4, '#f04d4d', '#e0d841')};
    border-radius: 5px;

    .age {
      width: 1.2rem;
    }

    .arrows {
      margin-left: 1.8rem;

      display: flex;
      flex-direction: column;

      svg {
        width: 2.8rem;
        height: 2.8rem;

        color: ${({ colorPrimary }) => colorPrimary};

        :hover {
          color: ${({ colorPrimary }) => lighten(0.2, colorPrimary)};
        }
      }

      .up {
        transform: translateY(0.4rem);
      }

      .down {
        transform: translateY(-0.4rem);
      }
    }
  }
`;
