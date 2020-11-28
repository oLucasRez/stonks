import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IProgressCircleProps from '../../../interfaces/IProgressCircleProps';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//===========================================================[ COMPONENT ]
const ProgressCircle: FC<IProgressCircleProps> = ({ progress, color }) => {
  //--------------------------------------------------------< properties >
  const [endX, endY] = (() => {
    const arc = -2 * Math.PI * progress;
    let x = 45 * Math.sin(arc) + 45;
    let y = 45 * Math.cos(arc) + 45;
    return [x, y];
  })();
  //------------------------------------------------------------< return >
  return (
    <Container color={color}>
      <div>{(progress * 10).toFixed(1)}</div>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
        <circle className='circle' cx='50' cy='50' r='45' />
        <path
          className='progress'
          d={
            'M 50 95 A 45 45 0 ' +
            (progress < 0.5 ? 0 : 1) +
            ' 1 ' +
            (endX + 5) +
            ' ' +
            (endY + 5)
          }
        />
      </svg>
    </Container>
  );
};

export default ProgressCircle;
