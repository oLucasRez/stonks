import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
//================================================================[ BODY ]
class TimeInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const [time, setTime] = useStorageState<number>(this.name + '-time', 0);

    return (
      <Container colorPrimary={color}>
        {/* <div className='input'> */}
        <input
          type='number'
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value))}
        />
        {/* </div> */}
        hours
      </Container>
    );
  };
}

export default TimeInput;
