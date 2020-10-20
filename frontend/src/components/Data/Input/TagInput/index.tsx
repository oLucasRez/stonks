import React, { FC, useContext } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//--------------------------------------------------------------< styles >
import { Container, Tag, AddTag } from './styles';

import { FaPlus, FaPoop as Pog, FaTimesCircle } from 'react-icons/fa';
import ColorContext from '../../../../utils/ColorContext';
//================================================================[ BODY ]
class TagInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);

    return (
      <Container>
        <Tag>
          <FaTimesCircle color={color} />
          <p>RPG</p>
        </Tag>
        <Tag>
          <FaTimesCircle color={color} />
          <p>Shooter</p>
        </Tag>
        <Tag>
          <FaTimesCircle color={color} />
          <p>Platform</p>
        </Tag>
        <Tag>
          <Pog visibility='hidden' />
          <input placeholder='Type something...' />
        </Tag>
        <AddTag>
          <FaPlus color={color} />
        </AddTag>
      </Container>
    );
  };
}

export default TagInput;
