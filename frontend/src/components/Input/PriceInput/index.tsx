import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container, SuggestionContainer } from './styles';
import IInputProps from '../../../interfaces/IInputProps';
//===============================================================[ CLASS ]
class PriceInput extends Input {
  form = FormSingleton.getInstance();

  public getNotification(notification: NotificationManager) {
    return notification?.priceNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    if (notification) notification.priceNotification = value;
  }

  public state() {
    return useStorageState<string>(this.name + '-price', '0.00');
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<string>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [price, setPrice] = state;
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.price = price === '' ? null : parseFloat(price);
    }, [price]);
    //--------------------------------------------------------------------
    const handlePrice = (input: string) => {
      var numberPattern = /\d+/g;

      if (price === '0.00' && input.length < 4) {
        setPrice('');
      } else {
        let newPrice = input.match(numberPattern)?.join('') ?? '0';

        while (newPrice[0] === '0')
          newPrice = newPrice.substring(1, newPrice.length);

        while (newPrice.length < 3) newPrice = '0' + newPrice;
        newPrice =
          newPrice.substring(0, newPrice.length - 2) +
          '.' +
          newPrice.substring(newPrice.length - 2, newPrice.length);

        if (newPrice.length > 7) newPrice = '9999.99';

        setPrice(newPrice);
      }
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
  Suggestion: FC<IInputProps<string>> = ({ state }) => {
    const color = useContext(ColorContext);
    const [, setPrice] = state;
    const priceSuggested = this.form.result?.price ?? '';

    return (
      <SuggestionContainer colorPrimary={color}>
        <h3>{this.name} suggestion</h3>
        <div className='price'>
          U$
          <div onClick={() => setPrice(priceSuggested)}>{priceSuggested}</div>
        </div>
      </SuggestionContainer>
    );
  };
}

export default PriceInput;
