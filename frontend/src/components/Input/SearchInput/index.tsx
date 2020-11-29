import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../../classes/FormSingleton';
//----------------------------------------------------------< interfaces >
import ISearchResponse from '../../../interfaces/ISearchResponse';
//----------------------------------------------------------< components >
import Input from '../index';
//------------------------------------------------------------< services >
import backend from '../../../services/backend';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
import { ThemeContext } from 'styled-components';
//--------------------------------------------------------------< styles >
import { Container, SearchBox, SearchResults, Arrows, Chosen } from './styles';
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaTimes,
} from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';
//===============================================================[ CLASS ]
class SearchInput extends Input {
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    //--------------------------------------------------------------------
    const form = FormSingleton.getInstance();
    //--------------------------------------------------------------------
    const [chosen, setChosen] = useStorageState<ISearchResponse>(
      this.name + '-search',
      { id: -1, name: '' }
    );
    const [search, setSearch] = useState<string>('');
    const [options, setOptions] = useState<ISearchResponse[]>([]);
    const [isChoosing, setIsChoosing] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    //--------------------------------------------------------------------
    const maxOptionPerPage = 10;
    //--------------------------------------------------------------------
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    //---------------------------------------------------------< methods >
    useEffect(() => {
      backend
        .get<ISearchResponse[]>('game-engines')
        .then(({ data }) => setOptions(data))
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    }, []);
    //--------------------------------------------------------------------
    useEffect(() => {
      form.inputs.game_engine = chosen?.id;
    }, [chosen]);
    //--------------------------------------------------------------------
    const searchOptions = () =>
      search.length < 1
        ? []
        : options.filter((option) =>
            option.name.toUpperCase().includes(search.toUpperCase())
          );
    //----------------------------------------------------------< return >
    if (loaded)
      if (error) return <> :( </>;
      else
        return (
          <Container>
            {isChoosing || chosen.id === -1 ? (
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
                          <FaLongArrowAltLeft
                            onClick={() => setPage(page - 1)}
                          />
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
                    setChosen({ id: -1, name: '' });
                    setIsChoosing(true);
                  }}
                />
                <p>{chosen.name}</p>
              </Chosen>
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

export default SearchInput;
