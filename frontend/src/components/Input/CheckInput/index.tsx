import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IRequestStrategy from '../../../interfaces/IRequestStrategy';
import ICheckResponse from '../../../interfaces/ICheckResponse';
import IUseEffectStrategy from '../../../interfaces/IUseEffectStrategy';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
import { ThemeContext } from 'styled-components';
//--------------------------------------------------------------< styles >
import { Container, Check } from './styles';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';
//===============================================================[ CLASS ]
class CheckInput extends Input {
  private requestStrategy: IRequestStrategy<ICheckResponse[]>;
  private useEffectStrategy: IUseEffectStrategy;

  constructor(
    name: string,
    description: string,
    requestStrategy: IRequestStrategy<ICheckResponse[]>,
    useEffectStrategy: IUseEffectStrategy
  ) {
    super(name, description);
    this.requestStrategy = requestStrategy;
    this.useEffectStrategy = useEffectStrategy;
  }

  public getNonVisualizedChanges() {
    return false; // todo...
  }

  public setVisualizedChanges() {
    // todo...
  }
  //=========================================================[ COMPONENT ]
  Body: FC = () => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    //--------------------------------------------------------------------
    const [checkResponse, setCheckResponse] = useStorageState<ICheckResponse[]>(
      this.name + '-check-response',
      []
    );
    const [checks, setChecks] = useStorageState<boolean[]>(
      this.name + '-checked',
      []
    );
    //--------------------------------------------------------------------
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.requestStrategy
        .request()
        .then((response) => {
          if (!checkResponse.length) {
            const newChecks = [];
            for (var i = 0; i < response.length; i++) newChecks.push(false);
            setCheckResponse(response);
            setChecks(newChecks);
          }
        })
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    }, []);
    //--------------------------------------------------------------------
    useEffect(() => {
      this.useEffectStrategy.setFormSingleton({ checks, checkResponse });
    }, [checks]);
    //--------------------------------------------------------------------
    const checking = (index: number) => {
      const newChecks = [...checks];
      newChecks[index] = !newChecks[index];
      setChecks(newChecks);
    };
    //----------------------------------------------------------< return >
    if (loaded)
      if (error) return <> :( </>;
      else
        return (
          <Container>
            {checkResponse.map((check, index) => (
              <Check key={index} colorPrimary={color}>
                <div onClick={() => checking(index)}>
                  {checks[index] ? <FaCheckSquare /> : <FaRegSquare />}
                </div>
                {check.name}
              </Check>
            ))}
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
  //----------------------------------------------------------------------
  ChangeLog: FC = () => {
    return <p></p>;
  };
}

export default CheckInput;
