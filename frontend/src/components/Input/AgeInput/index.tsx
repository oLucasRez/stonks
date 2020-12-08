import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
//----------------------------------------------------------< interfaces >
import IInputProps from '../../../interfaces/IInputProps';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import useStorageState from '../../../hooks/useStorageState';
import { useEffect } from 'react';
//------------------------------------------------------------< contexts >
import NotificationContext from '../../../contexts/NotificationContext';
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container, AgeBox, SuggestionContainer } from './styles';
//===============================================================[ CLASS ]
class AgeInput extends Input {
  form = FormSingleton.getInstance();
  ageBoxes = [
    {
      number: 3,
      color: '#A4C300',
    },
    {
      number: 7,
      color: '#A4C300',
    },
    {
      number: 12,
      color: '#F4A200',
    },
    {
      number: 16,
      color: '#F4A200',
    },
    {
      number: 18,
      color: '#d32b3c',
    },
  ];

  public getNotification(notification: NotificationManager) {
    return notification.ageRatingNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.ageRatingNotification = value;
  }

  public state() {
    return useStorageState<number>(this.name + '-age', -1);
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<number>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const [age, setAge] = state;
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.age_rating = age === -1 ? null : age;
    }, [age]);
    //----------------------------------------------------------< return >
    return (
      <Container>
        {this.ageBoxes.map((ageBox, index) => (
          <AgeBox
            onClick={() => setAge(age === ageBox.number ? -1 : ageBox.number)}
            selected={age === ageBox.number}
            colorPrimary={ageBox.color}
            className='age-box'
            key={index}
          >
            {ageBox.number}
          </AgeBox>
        ))}
      </Container>
    );
  };
  //=========================================================[ COMPONENT ]
  Suggestion: FC<IInputProps<number>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const [age, setAge] = state;
    const colorPrimary = useContext(ColorContext);
    const ageSuggested = this.form.result?.ageRating ?? -1;
    const color =
      this.ageBoxes.find((ageBox) => ageBox.number === ageSuggested)?.color ??
      '#fff';
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.age_rating = age === -1 ? null : age;
    }, [age]);
    //----------------------------------------------------------< return >
    if (!this.form.result) return <></>;
    return (
      <SuggestionContainer colorPrimary={colorPrimary}>
        <h3>{this.name} suggestion</h3>
        <AgeBox
          onClick={() => setAge(ageSuggested)}
          selected={age === ageSuggested}
          colorPrimary={color}
        >
          {ageSuggested}
        </AgeBox>
      </SuggestionContainer>
    );
  };
}

export default AgeInput;
