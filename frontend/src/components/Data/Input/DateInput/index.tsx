import React, { FC, useContext, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input, { BodyProps } from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

import { Container } from './styles';
//================================================================[ BODY ]
class DateInput extends Input {
  Body: FC<BodyProps> = ({ name }) => {
    const color = useContext(ColorContext);

    const [month, setMonth] = useStorageState<number>(name + '-month', 1);
    const [day, setDay] = useStorageState<number>(name + '-day', 1);
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
    const [choosing, setChoosing] = useState({ month: false, day: false });

    const maxMonthDay = () =>
      month === 2 ? 29 : [4, 6, 9, 11].includes(month) ? 30 : 31;

    return (
      <Container colorPrimary={color}>
        <div className='month-select'>
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
          <div>{day > maxMonthDay() ? maxMonthDay() : day}</div>
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
      </Container>
    );
  };
}

export default DateInput;
