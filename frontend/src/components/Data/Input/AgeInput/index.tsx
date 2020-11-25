import React, { FC } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { AgeBox, Container } from './styles';
//================================================================[ BODY ]
class AgeInput extends Input {
  Body: FC = () => {
    const [age, setAge] = useStorageState<number>(this.name + '-age', 3);
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
        color: '#E10119',
      },
    ];

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
}

export default AgeInput;
