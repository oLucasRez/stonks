import React, { FC, HTMLProps } from 'react';
//----------------------------------------------------------< components >
import ProgressCircle from './ProgressCircle';
//--------------------------------------------------------------< styles >
import { mix } from 'polished';
import { Container } from './styles';
//================================================================[ BODY ]
const Results: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  const progress = 0.84;
  const color =
    progress < 1 / 4
      ? mix(progress * 4, '#d66e2d', '#d62d2d')
      : progress < 2 / 4
      ? mix((progress - 1 / 4) * 4, '#ded228', '#d66e2d')
      : progress < 3 / 4
      ? mix((progress - 2 / 4) * 4, '#25b858', '#ded228')
      : mix((progress - 3 / 4) * 4, '#26a69f', '#25b858');

  return (
    <Container className={className} color={color}>
      <ProgressCircle progress={progress} color={color} />
      <h1>Great!</h1>
    </Container>
  );
};

export default Results;
