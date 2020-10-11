import React from "react";
//-----------------------------------------------------------------< poo >
import ITemplateStrategy from "../ITemplateStrategy";
import Data from "../../Data";
//--------------------------------------------------------------< styles >
import { Container } from "./styles";

// import { FaQuestion } from "react-icons/fa";
//================================================================[ BODY ]
class InputStrategy implements ITemplateStrategy {
  templateMethod(context: Data): JSX.Element {
    return (
      <Container>
        <header title={context.description}>
          {context.name}
          {/* <FaQuestion className="question" /> */}
        </header>
        <section>{context.typeStrategy.getBody()}</section>
      </Container>
    );
  }
}

export default InputStrategy;
