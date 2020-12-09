import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import ITagResponse from '../../../interfaces/ITagResponse';
import IStrategies from '../../../interfaces/IStrategies';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
import Loading from 'react-loading';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
import NotificationContext from '../../../contexts/NotificationContext';
//---------------------------------------------------------------< utils >
import removeElement from '../../../utils/removeElement';
//--------------------------------------------------------------< styles >
import {
  Container,
  Tag,
  Search,
  Arrows,
  AddTag,
  SuggestionContainer,
} from './styles';
import {
  FaTimesCircle,
  FaPoop as Pog,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaPlus,
  FaPlusCircle,
} from 'react-icons/fa';
import IInputProps from '../../../interfaces/IInputProps';
//===============================================================[ CLASS ]
class TagInput extends Input {
  private strategies: IStrategies<ITagResponse[]>;

  constructor(
    name: string,
    description: string,
    strategies: IStrategies<ITagResponse[]>
  ) {
    super(name, description);
    this.strategies = strategies;
  }

  public getNotification(notification: NotificationManager) {
    return this.strategies.notificationStrategy.getNotification(notification);
  }

  public setNotification(notification: NotificationManager, value: boolean) {
    this.strategies.notificationStrategy.setNotification(notification, value);
  }

  public state() {
    return useStorageState<ITagResponse[]>(this.name + '-tags', []);
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<ITagResponse[]>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    //--------------------------------------------------------------------
    const [myTags, setMyTags] = state;
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
      this.strategies.useEffectStrategy.setFormSingleton(myTags);
    }, [myTags]);
    //--------------------------------------------------------------------
    useEffect(() => {
      setLoaded(false);
      (async () => {
        if (search.length < 1) setAllTags([]);
        else {
          this.strategies.requestStrategy
            .request()
            .then((response) => {
              setAllTags(
                response.filter((tag) => {
                  return (
                    tag.name.toUpperCase().includes(search.toUpperCase()) &&
                    !myTagsHas(tag)
                  );
                })
              );
            })
            .catch(() => setError(true))
            .finally(() => setLoaded(true));
        }
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
                <Search colorPrimary={color} loaded={loaded}>
                  {loaded ? (
                    allTags.length ? (
                      <>
                        {allTags
                          .slice(
                            maxOptionPerPage * page,
                            maxOptionPerPage * (page + 1)
                          )
                          .map((tag) => (
                            <li
                              key={tag.id}
                              onClick={() => {
                                if (!myTagsHas(tag))
                                  setMyTags([...myTags, tag]);
                                setSearch('');
                                setSearchOnFocus(false);
                              }}
                            >
                              {tag.name}
                            </li>
                          ))}
                        <Arrows colorPrimary={color}>
                          {page > 0 ? (
                            <FaLongArrowAltLeft
                              onClick={() => setPage(page - 1)}
                            />
                          ) : null}
                          {(page + 1) * maxOptionPerPage < allTags.length ? (
                            <FaLongArrowAltRight
                              onClick={() => setPage(page + 1)}
                            />
                          ) : null}
                        </Arrows>
                      </>
                    ) : (
                      <i>no results</i>
                    )
                  ) : (
                    <Loading
                      className='loading'
                      type={'spin'}
                      color={color}
                      height={'1.5em'}
                      width={'1.5em'}
                    />
                  )}
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
  //----------------------------------------------------------------------
  Suggestion: FC<IInputProps<ITagResponse[]>> = ({ state }) => {
    const color = useContext(ColorContext);
    const [tags, setTags] = state;
    const tagsSuggested: string[] = this.strategies.result();

    const handleClick = async (tagSuggested: string) => {
      this.strategies.requestStrategy.request().then((response) => {
        if (tags.filter((tag) => tag.name === tagSuggested).length > 0) return;
        setTags([
          ...tags,
          response.filter((tag) => tag.name === tagSuggested)[0],
        ]);
      });
    };

    return (
      <SuggestionContainer colorPrimary={color}>
        <h3>{this.name} suggestion</h3>
        {tagsSuggested.map((tag, index) => (
          <div className='tag' key={index}>
            <FaPlusCircle onClick={() => handleClick(tag)} />
            <p>{tag}</p>
          </div>
        ))}
      </SuggestionContainer>
    );
  };
}

export default TagInput;
