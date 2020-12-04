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
  form = FormSingleton.getInstance();

  public getNonVisualizedChanges() {
    return false; // todo...
  }

  public setVisualizedChanges() {
    // todo
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [time, setTime] = useStorageState<string>(this.name + '-time', '');
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.time_to_beat =
        time === '' ? undefined : parseFloat(time) * 3600;
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
  //----------------------------------------------------------------------
  ChangeLog: FC = () => {
    return <p></p>;
  };
}

export default TimeInput;
