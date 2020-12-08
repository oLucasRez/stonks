import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IResults from '../../../interfaces/IResults';
import IInputProps from '../../../interfaces/IInputProps';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import NotificationContext from '../../../contexts/NotificationContext';
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import {
  Container,
  MonthContainer,
  DaysContainer,
  SuggestionContainer,
} from './styles';
import getRandomInt from '../../../utils/getRandomInt';
//===============================================================[ CLASS ]
class DateInput extends Input {
  form = FormSingleton.getInstance();
  dayState = useStorageState<number>(this.name + '-day', -1);
  months = [
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

  public getNotification(notification: NotificationManager) {
    return notification.releaseDateNotification ?? false;
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    notification.releaseDateNotification = value;
  }

  public state() {
    return useStorageState<number>(this.name + '-month', 1);
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<number>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [month, setMonth] = state;
    const [day, setDay] = this.dayState;
    //--------------------------------------------------------------------

    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.form.inputs.release_date = day === -1 ? null : month;
    }, [month]);
    //--------------------------------------------------------------------
    const maxMonthDay = (month: number) =>
      month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;
    //--------------------------------------------------------------------
    const getDaysArray = () => {
      var days: number[] = [];
      for (let i = 1; i <= maxMonthDay(month); i++) {
        days.push(i);
      }
      return days;
    };
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <MonthContainer colorPrimary={color}>
          {this.months.map((_month, index) => (
            <li
              key={index}
              className={
                index + 1 === month && day === -1
                  ? 'selected day-not-selected'
                  : index + 1 === month
                  ? 'selected'
                  : ''
              }
              onClick={() => {
                if (day >= maxMonthDay(index + 1)) {
                  setMonth(index + 1);
                  setDay(maxMonthDay(index + 1));
                } else setMonth(index + 1);
              }}
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
  //----------------------------------------------------------------------
  Suggestion: FC<IInputProps<number>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    const [month, setMonth] = state;
    const [day, setDay] = this.dayState;
    const monthSuggested = this.form.result?.releaseDate ?? -1;
    //---------------------------------------------------------< methods >
    const maxMonthDay = (month: number) =>
      month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;
    //----------------------------------------------------------< return >
    if (!this.form.result) return <></>;
    return (
      <SuggestionContainer colorPrimary={color}>
        <h3>{this.name} suggestion</h3>
        <li
          className={
            month === monthSuggested ? 'selected' : 'selected not-selected'
          }
          onClick={() => {
            if (day >= maxMonthDay(monthSuggested)) {
              setMonth(monthSuggested);
              setDay(maxMonthDay(monthSuggested));
              console.log(maxMonthDay(monthSuggested));
            } else setMonth(monthSuggested);
          }}
        >
          {this.months[monthSuggested - 1]}
        </li>
      </SuggestionContainer>
    );
  };
}

export default DateInput;
