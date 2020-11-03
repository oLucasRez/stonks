import React, { Dispatch, FC, useContext, useEffect, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input, { BodyProps } from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
import removeElement from '../../../../utils/removeElement';
//--------------------------------------------------------------< styles >
import { FaPlus, FaPoop as Pog, FaTimesCircle } from 'react-icons/fa';

import { Container, Tag, Search, AddTag } from './styles';
//---------------------------------------------------------------< types >
interface TagReq {
  id: number;
  name: string;
}
//================================================================[ BODY ]
class TagInput extends Input {
  private reqStrategy: (setAllTags: Dispatch<TagReq[]>) => void;

  constructor(
    name: string,
    description: string,
    reqStrategy: (setAllTags: Dispatch<TagReq[]>) => void
  ) {
    super(name, description);
    this.description = description;
    this.reqStrategy = reqStrategy;
  }
  Body: FC<BodyProps> = ({ name }) => {
    const color = useContext(ColorContext);
    const [taggingOnFocus, setTaggingOnFocus] = useState(false);
    const [searchOnFocus, setSearchOnFocus] = useState(false);

    const [myTags, setMyTags] = useStorageState<TagReq[]>(name + '-tags', []);
    const [search, setSearch] = useState<string>('');
    const [allTags, setAllTags] = useState<TagReq[]>([]);

    useEffect(() => {
      this.reqStrategy(setAllTags);
    }, []);

    const searchOptions = () =>
      search.length < 3
        ? []
        : allTags.filter(
            (tag) =>
              tag.name.toUpperCase().includes(search.toUpperCase()) &&
              !myTags.includes(tag)
          );

    return (
      <Container>
        {myTags.map((tag) => (
          <Tag key={tag.id} colorPrimary={color}>
            <FaTimesCircle
              onClick={() => setMyTags(removeElement<TagReq>(myTags, tag))}
            />
            <p>{tag.name}</p>
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
                    key={tag.id}
                    onClick={() => {
                      setMyTags([...myTags, tag]);
                      setSearch('');
                      setSearchOnFocus(false);
                    }}
                  >
                    {tag.name}
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
