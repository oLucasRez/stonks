import React, { FC } from 'react';
//---------------------------------------------------------------< hooks >
import { useContext } from 'react';
//------------------------------------------------------------< contexts >
import ColorContext from '../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
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
    const { Body } = this;
    const color = useContext(ColorContext);
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <label title={this.description}>{this.name}</label>
        <section>
          <Body />
        </section>
      </Container>
    );
  };
  //----------------------------------------------------------------------
  protected abstract Body: FC;
}

export default Input;
