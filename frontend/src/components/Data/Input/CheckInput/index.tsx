import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
//-----------------------------------------------------------------< poo >
import Input from '../index';
import RequestStrategy from '../RequestStrategy';
//---------------------------------------------------------------< utils >
import ColorContext from '../../../../utils/ColorContext';
import useStorageState from '../../../../utils/useStorageState';
//--------------------------------------------------------------< styles >
import { ThemeContext } from 'styled-components';
import ContentLoader from 'styled-content-loader';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';

import { Container, Check } from './styles';
//---------------------------------------------------------------< types >
import CheckResponse from './Strategy/CheckResponse';
//================================================================[ BODY ]
class CheckInput extends Input {
  private requestStrategy: RequestStrategy<CheckResponse[]>;

  constructor(
    name: string,
    description: string,
    requestStrategy: RequestStrategy<CheckResponse[]>
  ) {
    super(name, description);
    this.requestStrategy = requestStrategy;
  }

  Body: FC = () => {
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    const [checks, setChecks] = useStorageState<boolean[]>(
      this.name + '-checked',
      []
    );
    const [checkResponse, setCheckResponse] = useStorageState<CheckResponse[]>(
      this.name + '-check-response',
      []
    );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        if (!checkResponse.length)
          this.requestStrategy.request().then((response) => {
            const newChecks = [];
            for (var i = 0; i < response.length; i++) newChecks.push(false);
            setCheckResponse(response);
            setChecks(newChecks);
          });

        setLoaded(true);
      })();
    }, []);

    const checking = (index: number) => {
      const newChecks = [...checks];
      newChecks[index] = !newChecks[index];
      setChecks(newChecks);
    };

    if (loaded)
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
}

export default CheckInput;
