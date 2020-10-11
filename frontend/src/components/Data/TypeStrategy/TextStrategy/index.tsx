import React from "react";
//-----------------------------------------------------------------< poo >
import ITypeStrategy from "../ITypeStrategy";
//--------------------------------------------------------------< styles >
import { Container } from "./styles";
//================================================================[ BODY ]
class TextStrategy implements ITypeStrategy {
  getBody(): JSX.Element {
    return <Container placeholder="Type something..."></Container>;
  }
}

export default TextStrategy;
