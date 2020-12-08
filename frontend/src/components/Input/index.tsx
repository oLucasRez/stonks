import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import IInputProps from '../../interfaces/IInputProps';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Alarm from '../Alarm';
//---------------------------------------------------------------< hooks >
import { useContext, useState } from 'react';
//------------------------------------------------------------< contexts >
import ColorContext from '../../contexts/ColorContext';
import NotificationContext from '../../contexts/NotificationContext';
//--------------------------------------------------------------< styles >
import { Container, Aside } from './styles';
//---------------------------------------------------------------< types >
import State from '../../types/State';
//===============================================================[ CLASS ]
abstract class Input {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
  //=========================================================[ COMPONENT ]
  public TemplateMethod: FC = () => {
    //------------------------------------------------------< properties >
    const { Body, Suggestion } = this;
    const color = useContext(ColorContext);
    const notification = useContext(NotificationContext);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const state = this.state();
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <header>
          <label title={this.description}>{this.name}</label>
          {notification &&
          this.getNotification(notification) &&
          !showSuggestion ? (
            <Alarm className='alarm' onClick={() => setShowSuggestion(true)} />
          ) : null}
        </header>
        <section>
          <Body state={state} />
        </section>
        {showSuggestion ? (
          <Aside
            colorPrimary={color}
            onMouseLeave={() => setShowSuggestion(false)}
          >
            <Suggestion state={state} />
          </Aside>
        ) : null}
      </Container>
    );
  };
  //----------------------------------------------------------------------
  protected abstract Body: FC<IInputProps<any>>;

  protected abstract getNotification(
    notification: NotificationManager
  ): boolean;

  protected abstract setNotification(
    notification: NotificationManager,
    value: boolean
  ): void;

  protected abstract Suggestion: FC<IInputProps<any>>;

  protected abstract state(): State<any>;
}

export default Input;
