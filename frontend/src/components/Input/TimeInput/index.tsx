import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import NotificationContext from '../../../contexts/NotificationContext';
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container, SuggestionContainer } from './styles';
import IInputProps from '../../../interfaces/IInputProps';
import InputContext from '../../../contexts/InputContext';
//===============================================================[ CLASS ]
class TimeInput extends Input {
  form = FormSingleton.getInstance();

  public getNotification(notification: NotificationManager) {
    return notification.timeToBeatNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.timeToBeatNotification = value;
  }

  public state() {
    return useStorageState<string>(this.name + '-time', '');
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<string>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [time, setTime] = state;
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.time_to_beat = time === '' ? null : parseInt(time);
    }, [time]);
    //--------------------------------------------------------------------
    const handleTime = (input: string) => {
      var numberPattern = /\d+/g;

      input = input.replace(/\D/g, '');

      if (input === '' && time === '0') {
        setTime('');
        return;
      }

      if (input.length > 4) input = '9999';

      input = input.match(numberPattern)?.join('') ?? '0';

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
  Suggestion: FC<IInputProps<string>> = ({ state }) => {
    const color = useContext(ColorContext);
    const [, setTime] = state;
    const timeSuggested = this.form.result?.timeToBeat ?? -1;

    return (
      <SuggestionContainer colorPrimary={color}>
        <h3>{this.name} suggestion</h3>
        <div>
          <div onClick={() => setTime(timeSuggested + '')}>{timeSuggested}</div>
          hours
        </div>
      </SuggestionContainer>
    );
  };
}

export default TimeInput;
