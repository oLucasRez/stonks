import React, { FC, useContext } from 'react';
//----------------------------------------------------------< components >
import { IconType } from 'react-icons';

import { ThemeContext } from 'styled-components';
import ColorContext from '../../../contexts/ColorContext';
import Input from '../../Data/Input';
//--------------------------------------------------------------< styles >
import { Container, Header, Form } from './styles';
//---------------------------------------------------------------< types >
interface TemplateMethodProps {
  forms: TemplateForm[];
  setCurrentForm: Function;
}
//================================================================[ BODY ]
abstract class TemplateForm {
  protected theme = useContext(ThemeContext);

  public icon = this.getIcon();

  public templateMethod: FC<TemplateMethodProps> = ({
    forms,
    setCurrentForm,
  }) => {
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
        <Container>
          <Header color={this.getColor()}>{header.map((tab) => tab)}</Header>
          <Form color={this.getColor()}>
            <div className='inputs'>
              {this.getInputs().map((input, index) => {
                const { TemplateMethod } = input;
                return (
                  <div key={index} className='input-cell'>
                    <TemplateMethod />
                  </div>
                );
              })}
            </div>
            <footer />
          </Form>
        </Container>
      </ColorContext.Provider>
    );
  };

  protected abstract getIcon(): IconType;

  protected abstract getColor(): string;

  protected abstract getName(): string;

  protected abstract getInputs(): Input[];
}

export default TemplateForm;
