import React from "react";
//-----------------------------------------------------------------< poo >
import Input from "../index";
//--------------------------------------------------------------< styles >
import { Container } from "./styles";
//================================================================[ BODY ]
class TextInput extends Input {
  getBody(): JSX.Element {
    return <Container placeholder="Type something..."></Container>;
  }
}

export default TextInput;
