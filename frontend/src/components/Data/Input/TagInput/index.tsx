import React, { FC, useContext, useEffect, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
import removeElement from '../../../../utils/removeElement';
//--------------------------------------------------------------< styles >
import { FaPlus, FaPoop as Pog, FaTimesCircle } from 'react-icons/fa';

import { Container, Tag, Search, AddTag } from './styles';
//---------------------------------------------------------------< types >
import RequestStrategy from '../RequestStrategy';
import TagResponse from './Strategy/TagResponse';
//================================================================[ BODY ]
class TagInput extends Input {
  private requestStrategy: RequestStrategy<TagResponse[]>;

  constructor(
    name: string,
    description: string,
    requestStrategy: RequestStrategy<TagResponse[]>
  ) {
    super(name, description);
    this.requestStrategy = requestStrategy;
  }

  Body: FC = () => {
    const color = useContext(ColorContext);
    const [taggingOnFocus, setTaggingOnFocus] = useState(false);
    const [searchOnFocus, setSearchOnFocus] = useState(false);

    const [myTags, setMyTags] = useStorageState<TagResponse[]>(
      this.name + '-tags',
      []
    );
    const [search, setSearch] = useState<string>('');
    const [allTags, setAllTags] = useState<TagResponse[]>([]);

    useEffect(() => {
      (async () => {
        setAllTags(await this.requestStrategy.request());
      })();
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
              onClick={() => setMyTags(removeElement<TagResponse>(myTags, tag))}
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
