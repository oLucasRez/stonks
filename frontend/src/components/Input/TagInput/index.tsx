import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ITagResponse from '../../../interfaces/ITagResponse';
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
import { ThemeContext } from 'styled-components';
//---------------------------------------------------------------< utils >
import removeElement from '../../../utils/removeElement';
//--------------------------------------------------------------< styles >
import { Container, Tag, Search, Arrows, AddTag } from './styles';
import {
  FaTimesCircle,
  FaPoop as Pog,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaPlus,
} from 'react-icons/fa';
//===============================================================[ CLASS ]
class TagInput extends Input {
  private requestStrategy: IRequestStrategy<ITagResponse[]>;
  private useEffectStrategy: IUseEffectStrategy;

  constructor(
    name: string,
    description: string,
    requestStrategy: IRequestStrategy<ITagResponse[]>,
    useEffectStrategy: IUseEffectStrategy
  ) {
    super(name, description);
    this.requestStrategy = requestStrategy;
    this.useEffectStrategy = useEffectStrategy;
  }

  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [myTags, setMyTags] = useStorageState<ITagResponse[]>(
      this.name + '-tags',
      []
    );
    const [search, setSearch] = useState<string>('');
    const [allTags, setAllTags] = useState<ITagResponse[]>([]);
    const [taggingOnFocus, setTaggingOnFocus] = useState(false);
    const [searchOnFocus, setSearchOnFocus] = useState(false);
    const [page, setPage] = useState<number>(0);
    //--------------------------------------------------------------------
    const maxOptionPerPage = 10;
    //--------------------------------------------------------------------
    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.useEffectStrategy.setFormSingleton(myTags);
    }, [myTags]);
    //--------------------------------------------------------------------
    useEffect(() => {
      setLoaded(false);
      (async () => {
        if (search.length < 1) setAllTags([]);
        else if (search.length === 1) {
          this.requestStrategy
            .request(search)
            .then((response) =>
              setAllTags(response.filter((tag) => !myTagsHas(tag)))
            )
            .catch(() => setError(true))
            .finally(() => setLoaded(true));
        }
        setAllTags(
          allTags.filter((tag) => {
            return (
              tag.name.toUpperCase().includes(search.toUpperCase()) &&
              !myTagsHas(tag)
            );
          })
        );
      })();
    }, [search]);
    //--------------------------------------------------------------------
    const myTagsHas = (tag: ITagResponse) =>
      myTags.some((myTag) => myTag.id === tag.id);
    //----------------------------------------------------------< return >
    if (error) return <> :( </>;
    else
      return (
        <Container>
          {myTags.map((tag) => (
            <Tag key={tag.id} colorPrimary={color}>
              <FaTimesCircle
                onClick={() =>
                  setMyTags(removeElement<ITagResponse>(myTags, tag))
                }
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
              {search.length ? (
                <>
                  <Search colorPrimary={color}>
                    {allTags
                      .slice(
                        maxOptionPerPage * page,
                        maxOptionPerPage * (page + 1)
                      )
                      .map((tag) => (
                        <li
                          key={tag.id}
                          onClick={() => {
                            if (!myTagsHas(tag)) setMyTags([...myTags, tag]);
                            setSearch('');
                            setSearchOnFocus(false);
                          }}
                        >
                          {tag.name}
                        </li>
                      ))}
                    <Arrows colorPrimary={color}>
                      {page > 0 ? (
                        <FaLongArrowAltLeft onClick={() => setPage(page - 1)} />
                      ) : null}
                      {(page + 1) * maxOptionPerPage < allTags.length ? (
                        <FaLongArrowAltRight
                          onClick={() => setPage(page + 1)}
                        />
                      ) : null}
                    </Arrows>
                  </Search>
                </>
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
