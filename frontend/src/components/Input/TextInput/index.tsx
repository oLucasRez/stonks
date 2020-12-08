import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//===============================================================[ CLASS ]
class TextInput extends Input {
  public getNotification(notification: NotificationManager) {
    return false; // todo...
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    // todo...
  }

  public isEmpty() {
    return false;
  }

  public state() {
    return useStorageState<string>(this.name + 'text', '');
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [text, setText] = useStorageState<string>(this.name + 'text', '');
    //----------------------------------------------------------< return >
    return (
      <Container
        colorPrimary={color}
        placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></Container>
    );
  };
  //----------------------------------------------------------------------
  Suggestion: FC = () => {
    return <p></p>;
  };
}

export default TextInput;
