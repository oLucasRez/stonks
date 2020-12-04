import React, { FC, HTMLProps, useContext } from 'react';
//------------------------------------------------------------< contexts >
import { ThemeContext } from 'styled-components';
//--------------------------------------------------------------< styles >
import { Container } from './styles';
//---------------------------------------------------------------< types >
interface AlarmProps extends HTMLProps<HTMLDivElement> {
  size?: number;
  color?: string;
  pulse?: boolean;
}
//===========================================================[ COMPONENT ]
const Alarm: FC<AlarmProps> = ({ className, onClick, size, color, pulse }) => {
  //--------------------------------------------------------< properties >
  const { title } = useContext(ThemeContext);
  //------------------------------------------------------------< return >
  return (
    <Container
      className={className}
      onClick={onClick}
      size={size ?? 2}
      colorPrimary={color ?? (title === 'dark' ? '#27b6d7' : '#ff4533')}
      pulse={pulse ?? false}
    >
      <div className='pulse'>
        <div className='circle' />
      </div>
    </Container>
  );
};

export default Alarm;
