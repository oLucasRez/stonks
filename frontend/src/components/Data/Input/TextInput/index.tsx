import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../contexts/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//================================================================[ BODY ]
class TextInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const [text, setText] = useStorageState<string>(this.name + 'text', '');
    return (
      <Container
        colorPrimary={color}
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></Container>
    );
  };
}

export default TextInput;
