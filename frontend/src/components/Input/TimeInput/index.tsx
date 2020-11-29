import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//===============================================================[ CLASS ]
class TimeInput extends Input {
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const form = FormSingleton.getInstance();
    //--------------------------------------------------------------------
    const [time, setTime] = useStorageState<string>(this.name + '-time', '');
    //---------------------------------------------------------< methods >
    useEffect(() => {
      form.inputs.time_to_beat = time === '' ? undefined : parseFloat(time);
    }, [time]);
    //--------------------------------------------------------------------
    const handleTime = (input: string) => {
      if (input.length > 4) input = '9999';

      setTime(input);
    };
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color} limitReached={time === '9999'}>
        <input
          type='number'
          min='0'
          max='9999'
          value={time}
          onChange={(e) => handleTime(e.target.value)}
        />
        hours
      </Container>
    );
  };
}

export default TimeInput;
