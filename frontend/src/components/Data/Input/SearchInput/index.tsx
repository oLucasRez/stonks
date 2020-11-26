import React, { FC, useContext, useEffect, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
//------------------------------------------------------------< services >
import backend from '../../../../services/backend';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../contexts/ColorContext';
//--------------------------------------------------------------< styles >
import { ThemeContext } from 'styled-components';
import {
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
  FaTimes,
} from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';

import { Container, SearchBox, SearchResults, Arrows, Chosen } from './styles';
//---------------------------------------------------------------< types >
interface SearchResponse {
  id: number;
  name: string;
}
//================================================================[ BODY ]
class SearchInput extends Input {
  Body: FC = () => {
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    const [options, setOptions] = useState<SearchResponse[]>([]);
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const [chosen, setChosen] = useState<SearchResponse>();
    const [isChoosing, setIsChoosing] = useState<boolean>(false);

    const maxOptionPerPage = 10;
    // const [options, setOptions] = useStorageState<SearchResponse[]>(
    //   this.name + '-select',
    //   []
    // );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        const { data } = await backend.get<SearchResponse[]>('game-engines');
        console.log(data);
        setOptions(data);
        // setOptions([
        //   { id: 0, name: 'Ronin' },
        //   { id: 1, name: 'Unity 5' },
        //   { id: 2, name: 'Firebird Engine' },
        //   { id: 3, name: 'Duplicate 669' },
        //   { id: 4, name: 'Unity 2017' },
        // ]);
        setLoaded(true);
      })();
    }, []);

    const searchOptions = () =>
      search.length < 1
        ? []
        : options.filter((option) =>
            option.name.toUpperCase().includes(search.toUpperCase())
          );
    if (loaded)
      return (
        <Container>
          {isChoosing || !chosen ? (
            <>
              <SearchBox
                colorPrimary={color}
                placeholder='Type something...'
                onChange={(e) => {
                  setPage(0);
                  setSearch(e.target.value);
                }}
              />
              {searchOptions().length ? (
                <>
                  <SearchResults colorPrimary={color}>
                    {searchOptions()
                      .slice(
                        maxOptionPerPage * page,
                        maxOptionPerPage * (page + 1)
                      )
                      .map((option) => (
                        <li
                          key={option.id}
                          onClick={() => {
                            setChosen(option);
                            setSearch('');
                            setIsChoosing(false);
                          }}
                        >
                          {option.name}
                        </li>
                      ))}
                    <Arrows colorPrimary={color}>
                      {page > 0 ? (
                        <FaLongArrowAltLeft onClick={() => setPage(page - 1)} />
                      ) : null}
                      {(page + 1) * maxOptionPerPage <
                      searchOptions().length ? (
                        <FaLongArrowAltRight
                          onClick={() => setPage(page + 1)}
                        />
                      ) : null}
                    </Arrows>
                  </SearchResults>
                </>
              ) : null}
            </>
          ) : (
            <Chosen colorPrimary={color}>
              <FaTimes
                onClick={() => {
                  setChosen(undefined);
                  setIsChoosing(true);
                }}
              />
              <p>{chosen?.name}</p>
            </Chosen>
          )}
        </Container>
      );
    else
      return (
        <ContentLoader
          backgroundColor={background[2]}
          foregroundColor={foreground[2]}
          isLoading={true}
        >
          <p>... im loading ...</p>
        </ContentLoader>
      );
  };
}

export default SearchInput;
