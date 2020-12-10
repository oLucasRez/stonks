import styled from 'styled-components';
//---------------------------------------------------------------< types >
interface StyleProps {
  color: string;
}
//===============================================================[ STYLE ]
export const Container = styled.div<StyleProps>`
  display: grid;
  grid-template-areas: 'score' 'details' 'image';
  grid-template-rows: 16rem 2fr 4fr;

  background: ${({ theme }) => theme.colors.background[0]};

  .score-container {
    display: grid;
    grid-template-columns: 16rem auto;

    h1 {
      justify-self: center;
      align-self: center;
      cursor: default;

      font-size: 2.4rem;
      color: ${({ color }) => color};

      i {
        font-size: 1.6rem;
        color: ${({ theme }) => theme.colors.foreground[1]};
      }
    }
  }

  .details-container {
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'rating-label rating-bar'
      'follows-label follows-bar';

    label {
      margin-right: 1rem;

      justify-self: right;

      font-size: 1.4rem;
    }

    .top {
      margin-bottom: 0.8rem;
      align-self: flex-end;
    }

    .bot {
      margin-top: 0.8rem;
      align-self: flex-start;
    }

    .bar {
      height: 1.9rem;

      border-radius: 0.95rem;
      background: ${({ theme }) => theme.colors.background[1]};
    }

    .total {
      width: 100%;
    }

    .score {
      min-width: 1.9rem;
      padding-right: 0.8rem;
      font-size: 1rem;
      display: grid;
      justify-content: right;
      align-content: center;

      p {
        transform: translateY(-1.6rem);
      }
    }
  }

  .image-container {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }

  @media (max-width: 425px) {
    height: 50vh;
  }
`;
