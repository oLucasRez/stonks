import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
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
class TextInput extends Input {
  private useEffectStrategy: IUseEffectStrategy;

  constructor(
    name: string,
    description: string,
    useEffectStrategy: IUseEffectStrategy
  ) {
    super(name, description);
    this.useEffectStrategy = useEffectStrategy;
  }

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
    const [text, setText] = useStorageState<string>(this.name + 'text', '');
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.useEffectStrategy.setFormSingleton(text);
    }, [text]);
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
  ChangeLog: FC = () => {
    return <p></p>;
  };
}

export default TextInput;
