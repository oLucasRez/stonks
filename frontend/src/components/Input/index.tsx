import React, { FC } from 'react';
//----------------------------------------------------------< components >
import Alarm from '../Alarm';
//---------------------------------------------------------------< hooks >
import { useContext, useState } from 'react';
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
    const { Body, ChangeLog } = this;
    const color = useContext(ColorContext);
    const [showSuggestion, setShowSuggestion] = useState(false);
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <header>
          <label title={this.description}>{this.name}</label>
          {this.getNonVisualizedChanges() && !showSuggestion ? (
            <Alarm
              className='alarm'
              onClick={() => {
                setShowSuggestion(!showSuggestion);
                this.setVisualizedChanges();
              }}
            />
          ) : null}
        </header>
        <section>
          <Body />
        </section>
        {showSuggestion ? (
          <aside>
            <ChangeLog />
          </aside>
        ) : null}
      </Container>
    );
  };
  //----------------------------------------------------------------------
  protected abstract Body: FC;

  protected abstract getNonVisualizedChanges(): boolean;

  protected abstract setVisualizedChanges(): void;

  protected abstract ChangeLog: FC;
}

export default Input;
