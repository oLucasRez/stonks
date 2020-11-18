import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  colorPrimary: string;
  selected: boolean;
}
//================================================================[ BODY ]
export const Container = styled.section`
  display: flex;

  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.foreground[1]};

  .age-box + .age-box {
    margin-left: 1.1rem;
  }
`;

export const AgeBox = styled.div<StyleProps>`
  width: 3.6rem;
  height: 3.6rem;
  margin: 0 0.2rem 0.2rem 0;
  transform: translateX(0.1rem);

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: ${({ theme, selected }) =>
    selected ? 'white' : theme.colors.foreground[0]};
  border-radius: 0.4rem;
  background: ${({ colorPrimary, selected }) =>
    selected ? colorPrimary : 'null'};
  border: 1px solid
    ${({ colorPrimary, selected }) => (selected ? 'null' : colorPrimary)};

  :hover {
    width: 3.8rem;
    height: 3.8rem;
    transform: translate(0, -0.1rem);
    margin: 0;
  }
`;
