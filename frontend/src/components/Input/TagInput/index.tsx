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
import { Container, Tag, Search, AddTag } from './styles';
import { FaTimesCircle, FaPoop as Pog, FaPlus } from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';
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
    const { background, foreground } = useContext(ThemeContext).colors;
    //--------------------------------------------------------------------
    const [myTags, setMyTags] = useStorageState<ITagResponse[]>(
      this.name + '-tags',
      []
    );
    const [search, setSearch] = useState<string>('');
    const [allTags, setAllTags] = useState<ITagResponse[]>([]);
    const [taggingOnFocus, setTaggingOnFocus] = useState(false);
    const [searchOnFocus, setSearchOnFocus] = useState(false);
    //--------------------------------------------------------------------
    const [loaded, setLoaded] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.requestStrategy
        .request()
        .then((response) => setAllTags(response))
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    }, []);
    //--------------------------------------------------------------------
    useEffect(() => {
      this.useEffectStrategy.setFormSingleton(myTags);
    }, [myTags]);
    //--------------------------------------------------------------------
    const searchOptions = () => {
      if (search.length < 2) return [];
      else if (search.length === 2) {
        const options: ITagResponse[] = [];

        this.requestStrategy
          .request(search)
          .then((response) => {
            options.push(...response);
          })
          .catch(() => setError(true));
        return options;
      } else
        return allTags.filter(
          (tag) =>
            tag.name.toUpperCase().includes(search.toUpperCase()) &&
            !myTags.includes(tag)
        );
    };
    //----------------------------------------------------------< return >
    if (loaded)
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
                <Tag
                  colorPrimary={color}
                  onBlur={() => setTaggingOnFocus(false)}
                >
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
    else
      return (
        <ContentLoader
          backgroundColor={background[0]}
          foregroundColor={foreground[2]}
          isLoading={true}
        >
          <p>... im loading ...</p>
        </ContentLoader>
      );
  };
}

export default TagInput;
