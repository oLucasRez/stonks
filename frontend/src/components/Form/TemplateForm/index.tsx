import React, { useContext } from 'react';
//----------------------------------------------------------< components >
import { IconType } from 'react-icons';

import { ThemeContext } from 'styled-components';
import ColorContext from '../../../utils/ColorContext';
import Input from '../../Data/Input';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
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
          className={this.icon === Icon ? 'main' : 'side'}
          key={i}
          onClick={() => setCurrentForm(i)}
        >
          <Icon className='icon' />
          <p className='title'>{this.getName()}</p>
        </div>
      );
    });

    return (
      <ColorContext.Provider value={this.getColor()}>
        <Container color={this.getColor()}>
          <header>{header.map((tab) => tab)}</header>
          <form>
            <div className='inputs'>
              {this.getInputs().map((input, index) => {
                const { TemplateMethod } = input;
                return (
                  <div key={index}>
                    <TemplateMethod />
                  </div>
                );
              })}
            </div>
            <footer />
          </form>
          <button>Go!</button>
        </Container>
      </ColorContext.Provider>
    );
  }

  protected abstract getIcon(): IconType;

  protected abstract getColor(): string;

  protected abstract getName(): string;

  protected abstract getInputs(): Input[];
}

export default TemplateForm;
