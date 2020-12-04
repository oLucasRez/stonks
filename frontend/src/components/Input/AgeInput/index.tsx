import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import useStorageState from '../../../hooks/useStorageState';
import { useEffect } from 'react';
//--------------------------------------------------------------< styles >
import { Container, AgeBox } from './styles';
//===============================================================[ CLASS ]
class AgeInput extends Input {
  form = FormSingleton.getInstance();

  public getNonVisualizedChanges() {
    return false; // todo...
  }

  public setVisualizedChanges() {
    // todo...
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const [age, setAge] = useStorageState<number>(this.name + '-age', -1);
    //--------------------------------------------------------------------
    const ageBoxes = [
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
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.age_rating = age === -1 ? undefined : age;
    }, [age]);
    //----------------------------------------------------------< return >
    return (
      <Container>
        {ageBoxes.map((ageBox, index) => (
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
  //----------------------------------------------------------------------
  ChangeLog: FC = () => {
    return <p></p>;
  };
}

export default AgeInput;
