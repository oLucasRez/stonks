import React from "react";
import ITypeStrategy from "../TypeStrategy/ITypeStrategy";
//--------------------------------------------------------------< styles >
import { Container } from "./styles";
//================================================================[ BODY ]
abstract class Input {
  public name: string;
  public description: string;

  constructor(
    name: string,
    description: string,
  ) {
    this.name = name;
    this.description = description;
  }

  public templateMethod() {
    return (
          <Container>
            <header title={this.description}>
              {this.name}
            </header>
            <section>{this.getBody()}</section>
          </Container>
    );
  }

  protected abstract getBody(): JSX.Element;
}

export default Input;
