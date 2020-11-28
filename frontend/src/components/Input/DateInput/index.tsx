import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
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
    const [day, setDay] = useStorageState<number>(this.name + '-day', 1);
    const [choosing, setChoosing] = useState({ month: false, day: false });
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
    //----------------------------------------------------------< return >
    return (
      <Container colorPrimary={color}>
        <div className='month-select'>
          {/* <input list='months' />
          <datalist id='months'>
            <option value='Jan' />
            <option value='Feb' />
            <option value='Mar' />
          </datalist> */}
          {choosing.month ? (
            <ul>
              {months.map((month, index) => (
                <li
                  className='options'
                  key={index}
                  onClick={() => {
                    setMonth(index + 1);
                    setChoosing({ ...choosing, month: false });
                  }}
                >
                  {month}
                </li>
              ))}
            </ul>
          ) : (
            <div
              className='current'
              onClick={() => setChoosing({ ...choosing, month: true })}
            >
              {months[month - 1]}
            </div>
          )}
        </div>
        <div className='day-select'>
          <div className='day'>{day > maxMonthDay() ? maxMonthDay() : day}</div>
          <div className='arrows'>
            <FaCaretUp
              className='up'
              onClick={() =>
                setDay(day + 1 > maxMonthDay() ? maxMonthDay() : day + 1)
              }
            />
            <FaCaretDown
              className='down'
              onClick={() => setDay(day > 1 ? day - 1 : 1)}
            />
          </div>
        </div>
      </Container>
    );
  };
}

export default DateInput;
