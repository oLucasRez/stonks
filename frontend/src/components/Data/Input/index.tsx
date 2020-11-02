import React, { FC, useContext } from 'react';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../utils/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//---------------------------------------------------------------< types >
export interface BodyProps {
  name: string;
}
//================================================================[ BODY ]
abstract class Input {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public TemplateMethod: FC = () => {
    const { Body } = this;
    const color = useContext(ColorContext);

    return (
      <Container colorPrimary={color}>
        <label title={this.description}>{this.name}</label>
        <section>
          <Body name={this.name} />
        </section>
      </Container>
    );
  };

  protected abstract Body: FC<BodyProps>;
}

export default Input;
