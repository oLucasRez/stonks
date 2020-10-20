import React from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//--------------------------------------------------------------< styles >
import { Container, Tag, Tagging, AddTag } from './styles';

import { FaPlus, FaPoop as Pog, FaTimesCircle } from 'react-icons/fa';
//================================================================[ BODY ]
class TagInput extends Input {
  getBody(): JSX.Element {
    return (
      <Container>
        <Tag>
          <FaTimesCircle />
          <p>RPG</p>
        </Tag>
        <Tag>
          <FaTimesCircle />
          <p>Shooter</p>
        </Tag>
        <Tag>
          <FaTimesCircle />
          <p>Platform</p>
        </Tag>
        <Tag>
          <Pog visibility='hidden' />
          <input placeholder='Type something...' />
        </Tag>
        <AddTag>
          <FaPlus />
        </AddTag>
      </Container>
    );
  }
}

export default TagInput;
