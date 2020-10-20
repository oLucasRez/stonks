import React, { FC } from 'react';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//================================================================[ BODY ]
abstract class Input {
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  public templateMethod() {
    const { Body } = this;

    return (
      <Container>
        <header title={this.description}>{this.name}</header>
        <section>
          <Body />
        </section>
      </Container>
    );
  }

  protected abstract Body: FC;
}

export default Input;
