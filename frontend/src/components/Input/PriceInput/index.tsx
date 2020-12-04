import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//===============================================================[ CLASS ]
class PriceInput extends Input {
  form = FormSingleton.getInstance();

  public getNonVisualizedChanges() {
    return this.form.result?.nonVisualizedChanges().subforms[2].price ?? false;
  }

  public setVisualizedChanges() {
    if (this.form.result)
      this.form.result.visualizedChanges.subforms[2].price = false;
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [price, setPrice] = useStorageState<string>(
      this.name + '-price',
      '0.00'
    );
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.price = parseFloat(price);
    }, [price]);
    //--------------------------------------------------------------------
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
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color} limitReached={price === '9999.99'}>
        U$
        <input onChange={(e) => handlePrice(e.target.value)} value={price} />
      </Container>
    );
  };
  //----------------------------------------------------------------------
  ChangeLog: FC = () => {
    return (
      <p>
        We added this <b>price</b> to your game as a suggestion!
      </p>
    );
  };
}

export default PriceInput;
