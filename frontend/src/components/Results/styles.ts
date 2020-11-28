import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  color: string;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  width: 100%;
  height: 48rem;
  max-width: 42rem;

  background: ${({ theme }) => theme.colors.background[0]};

  h1 {
    color: ${({ color }) => color};
  }
`;
