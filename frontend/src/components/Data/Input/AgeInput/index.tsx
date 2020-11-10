import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

import { Container } from './styles';
//================================================================[ BODY ]
class AgeInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const [age, setAge] = useStorageState<number>(this.name + '-age', 3);

    return (
      <Container colorPrimary={color} age={age}>
        <div className='input'>
          <div className='age'>{age}</div>
          <div className='arrows'>
            <FaCaretUp
              className='up'
              onClick={() => setAge(age + 1 > 18 ? 18 : age + 1)}
            />
            <FaCaretDown
              className='down'
              onClick={() => setAge(age - 1 < 3 ? 3 : age - 1)}
            />
          </div>
        </div>
      </Container>
    );
  };
}

export default AgeInput;
