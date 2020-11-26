import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
}
//================================================================[ BODY ]
export const Container = styled.div<StyleProps>`
  width: 100%;

  display: grid;
  grid-template-rows: 3.3rem auto;

  label {
    margin-bottom: 1.1rem;

    color: ${({ theme }) => theme.colors.foreground[1]};
    border-bottom: 1px solid ${({ colorPrimary }) => colorPrimary};

    cursor: default;

    svg {
      margin-right: 5px;

      color: ${({ theme }) => theme.colors.primary[0]};
    }
  }

  section {
    height: fit-content;
    margin-bottom: 2.5rem;

    background: none;
  }
`;
