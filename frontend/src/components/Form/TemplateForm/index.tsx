import React, { useContext } from "react";
//----------------------------------------------------------< components >
import { IconType } from "react-icons";

import Data from "../../Data/Data";
//--------------------------------------------------------------< styles >
import { ThemeContext } from "styled-components";

import { Container } from "./styles";
//================================================================[ BODY ]
abstract class TemplateForm {
  protected theme = useContext(ThemeContext);
  public icon = this.getIcon();

  public templateMethod(forms: TemplateForm[], setCurrentForm: Function) {
    const header: JSX.Element[] = [];

    forms.forEach((form, i) => {
      const Icon = form.icon;
      header.push(
        <div
          className={this.icon === Icon ? "main" : "side"}
          key={i}
          onClick={() => setCurrentForm(i)}
        >
          <Icon className="icon" />
          <p className="title">{this.getName()}</p>
        </div>
      );
    });

    return (
      <Container color={this.getColor()}>
        <header>{header.map((tab) => tab)}</header>
        <form>
          <div className="inputs">
            {this.getInputs().map((input, index) => (
              <div key={index}>{input.templateMethod()}</div>
            ))}
          </div>
          <footer />
        </form>
        <button>Go!</button>
      </Container>
    );
  }

  protected abstract getIcon(): IconType;
  protected abstract getColor(): string;
  protected abstract getName(): string;
  protected abstract getInputs(): Data[];
}

export default TemplateForm;
