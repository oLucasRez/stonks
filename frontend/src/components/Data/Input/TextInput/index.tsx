import React, { FC } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//================================================================[ BODY ]
class TextInput extends Input {
  Body: FC = () => {
    return <Container placeholder='Type something...'></Container>;
  };
}

export default TextInput;
