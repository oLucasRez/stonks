import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//================================================================[ BODY ]
class TimeInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const [time, setTime] = useStorageState<string>(this.name + '-time', '0');

    const handleTime = (input: string) => {
      if (input.length > 4) input = '9999';

      setTime(input);
    };

    return (
      <Container colorPrimary={color} limitReached={time === '9999'}>
        <input
          type='number'
          value={time}
          onChange={(e) => handleTime(e.target.value)}
        />
        hours
      </Container>
    );
  };
}

export default TimeInput;
