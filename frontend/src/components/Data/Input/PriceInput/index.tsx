import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../contexts/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//================================================================[ BODY ]
class DateInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const [price, setPrice] = useStorageState<string>(
      this.name + '-price',
      '0.00'
    );

    const handlePrice = (input: string) => {
      var numberPattern = /\d+/g;

      let newPrice = input.match(numberPattern)?.join('') ?? '0';
      while (newPrice[0] === '0') {
        newPrice = newPrice.substring(1, newPrice.length);
      }
      while (newPrice.length < 3) newPrice = '0' + newPrice;
      newPrice =
        newPrice.substring(0, newPrice.length - 2) +
        '.' +
        newPrice.substring(newPrice.length - 2, newPrice.length);

      if (newPrice.length > 7) newPrice = '9999.99';

      setPrice(newPrice);
    };

    return (
      <Container colorPrimary={color} limitReached={price === '9999.99'}>
        U$
        <input onChange={(e) => handlePrice(e.target.value)} value={price} />
      </Container>
    );
  };
}

export default DateInput;
