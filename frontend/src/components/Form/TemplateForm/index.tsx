import React, { FC, Fragment } from 'react';
//----------------------------------------------------------< interfaces >
import ITemplateMethodProps from '../../../interfaces/ITemplateMethodProps';
//----------------------------------------------------------< components >
import Alert from '../../Alarm';
import Input from '../../Input';
//---------------------------------------------------------------< hooks >
import { useContext } from 'react';
//------------------------------------------------------------< contexts >
import { ThemeContext } from 'styled-components';
import NotificationContext from '../../../contexts/NotificationContext';
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container, Header, Form } from './styles';
//---------------------------------------------------------------< types >
import { IconType } from 'react-icons';
//===============================================================[ CLASS ]
abstract class TemplateForm {
  protected theme = useContext(ThemeContext);

  public icon = this.getIcon();
  //=========================================================[ COMPONENT ]
  public templateMethod: FC<ITemplateMethodProps> = ({
    forms,
    setCurrentForm,
  }) => {
    //------------------------------------------------------< properties >
    const header: JSX.Element[] = [];
    //---------------------------------------------------------< methods >
    const notification = useContext(NotificationContext);
    const notifications = notification
      ? [
          notification.profileNotification(),
          notification.specificationsNotification(),
          notification.publishNotification(),
        ]
      : [false, false, false];
    //--------------------------------------------------------------------
    forms.forEach((form, i) => {
      const Icon = form.icon;
      header.push(
        <Fragment key={i}>
          {notifications[i] ? <Alert className='alert' pulse={true} /> : null}
          <div
            className={this.icon === Icon ? 'main' : 'side'}
            key={i}
            onClick={() => setCurrentForm(i)}
          >
            <Icon className='icon' />
            <p className='title'>{this.getName()}</p>
          </div>
        </Fragment>
      );
    });
    //----------------------------------------------------------< return >
    return (
      <ColorContext.Provider value={this.getColor()}>
        <Container>
          <Header color={this.getColor()}>{header.map((tab) => tab)}</Header>
          <Form color={this.getColor()}>
            <div className='inputs'>
              {this.getInputs().map((input, index) => {
                const { TemplateMethod } = input;
                return (
                  <div
                    key={index}
                    style={{ zIndex: 20 - index }}
                    className='input-cell'
                  >
                    <TemplateMethod />
                  </div>
                );
              })}
              <span />
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
