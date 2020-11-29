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
import { Container, MonthContainer, DaysContainer } from './styles';
//===============================================================[ CLASS ]
class DateInput extends Input {
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const form = FormSingleton.getInstance();
    //--------------------------------------------------------------------
    const [month, setMonth] = useStorageState<number>(this.name + '-month', 1);
    const [day, setDay] = useStorageState<number>(this.name + '-day', -1);
    //--------------------------------------------------------------------
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    //---------------------------------------------------------< methods >
    useEffect(() => {
      form.inputs.release_date = {
        day,
        month,
      };
    }, [day, month]);
    //--------------------------------------------------------------------
    const maxMonthDay = () =>
      month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;
    //--------------------------------------------------------------------
    const getDaysArray = () => {
      var days: number[] = [];
      for (let i = 1; i <= maxMonthDay(); i++) {
        days.push(i);
      }
      return days;
    };
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <MonthContainer colorPrimary={color}>
          {months.map((_month, index) => (
            <li
              key={index}
              className={
                index + 1 === month && day === -1
                  ? 'selected day-not-selected'
                  : index + 1 === month
                  ? 'selected'
                  : ''
              }
              onClick={() => setMonth(index + 1)}
            >
              {_month}
            </li>
          ))}
        </MonthContainer>
        <DaysContainer colorPrimary={color}>
          {getDaysArray().map((_day) => (
            <li
              key={_day}
              className={_day === day ? 'selected' : ''}
              onClick={() => (_day === day ? setDay(-1) : setDay(_day))}
            >
              {_day}
            </li>
          ))}
        </DaysContainer>
      </Container>
    );
  };
}

export default DateInput;
