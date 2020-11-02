import React, { FC, useContext, useEffect, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input, { BodyProps } from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
import removeElement from '../../../../utils/removeElement';
//--------------------------------------------------------------< styles >
import { FaPlus, FaPoop as Pog, FaTimesCircle } from 'react-icons/fa';

import { Container, Tag, Search, AddTag } from './styles';
//================================================================[ BODY ]
class TagInput extends Input {
  Body: FC<BodyProps> = ({ name }) => {
    const color = useContext(ColorContext);
    const [taggingOnFocus, setTaggingOnFocus] = useState(false);
    const [searchOnFocus, setSearchOnFocus] = useState(false);

    const [myTags, setMyTags] = useStorageState<string[]>(name + '-tags', []);
    const [search, setSearch] = useState<string>('');
    const [allTags, setAllTags] = useState<string[]>([]);

    useEffect(() => {
      setAllTags(['RPG', 'Shooter', 'Platform']);
    }, []);

    const searchOptions = () =>
      search === ''
        ? []
        : allTags.filter(
            (tag) =>
              tag.toUpperCase().includes(search.toUpperCase()) &&
              !myTags.includes(tag)
          );

    return (
      <Container>
        {myTags.map((tag) => (
          <Tag key={tag} colorPrimary={color}>
            <FaTimesCircle
              onClick={() => setMyTags(removeElement<string>(myTags, tag))}
            />
            <p>{tag}</p>
          </Tag>
        ))}
        {taggingOnFocus || (searchOnFocus && search) ? (
          <>
            <Tag colorPrimary={color} onBlur={() => setTaggingOnFocus(false)}>
              <Pog visibility='hidden' />
              <input
                placeholder='Type something...'
                onChange={(e) => setSearch(e.target.value)}
              />
            </Tag>
            {searchOptions().length ? (
              <Search colorPrimary={color}>
                {searchOptions().map((tag) => (
                  <li
                    key={tag}
                    onClick={() => {
                      setMyTags([...myTags, tag]);
                      setSearch('');
                      setSearchOnFocus(false);
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </Search>
            ) : null}
          </>
        ) : (
          <AddTag
            colorPrimary={color}
            onClick={() => {
              setTaggingOnFocus(true);
              setSearchOnFocus(true);
            }}
          >
            <FaPlus />
          </AddTag>
        )}
      </Container>
    );
  };
}

export default TagInput;
