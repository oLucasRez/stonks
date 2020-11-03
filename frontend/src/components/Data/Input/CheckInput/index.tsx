import React, { FC } from 'react';
//-----------------------------------------------------------------< poo >
import Input, { BodyProps } from '../index';
//--------------------------------------------------------------< styles >
import { Container, Check } from './styles';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
//================================================================[ BODY ]
class CheckInput extends Input {
  Body: FC<BodyProps> = () => {
    return (
      <Container>
        <Check></Check>
      </Container>
    );
  };
}

export default CheckInput;
