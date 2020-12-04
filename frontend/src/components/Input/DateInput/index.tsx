import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IResults from '../../../interfaces/IResults';
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
import getRandomInt from '../../../utils/getRandomInt';
//===============================================================[ CLASS ]
class DateInput extends Input {
  form = FormSingleton.getInstance();

  public getNonVisualizedChanges() {
    return (
      this.form.result?.visualizedChanges.subforms[2].releaseDate ??
      this.form.result?.nonVisualizedChanges().subforms[2].releaseDate ??
      false
    );
  }

  public setVisualizedChanges() {
    if (this.form.result)
      this.form.result.visualizedChanges.subforms[2].releaseDate = false;
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
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
      if (this.getNonVisualizedChanges() && day == -1) {
        const releaseDateSuggestions = this.form.result?.getReleaseDates();

        if (releaseDateSuggestions) {
          const randomReleaseDate =
            releaseDateSuggestions[
              getRandomInt(0, releaseDateSuggestions.length)
            ];

          const randomMonth = parseFloat(randomReleaseDate.substring(0, 2));
          const randomDay = parseFloat(randomReleaseDate.substring(3));
          setMonth(randomMonth);
          setDay(randomDay);
        }
      }
    }, []);
    //--------------------------------------------------------------------
    useEffect(() => {
      this.form.inputs.release_date = {
        day,
        month,
      };
    }, [day, month]);
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
  ChangeLog: FC = () => {
    return (
      <p>
        We added this <b>release date</b> to your game as a suggestion!
      </p>
    );
  };
}

export default DateInput;
