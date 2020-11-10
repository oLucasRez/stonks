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
    const [checkeds, setCheckeds] = useStorageState<CheckResponse[]>(
      this.name + '-checked',
      []
    );
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      (async () => {
        const a: CheckResponse = {
          id: 1,
          name: 'a',
          slug: 'a',
          checked: false,
        };
        const newCheckeds: CheckResponse[] = [a, a, a];
        // (await this.requestStrategy.request()).forEach((newChecked) => {
        //   const index = checkeds.indexOf(newChecked);
        //   if (index === -1) newCheckeds.push(newChecked);
        //   else newCheckeds.push(checkeds[index]);
        // });
        setCheckeds(newCheckeds);
        setLoaded(true);
      })();
    }, []);

    const checking = (index: number, value: boolean) => {
      // console.log(checkeds);
      checkeds[index].checked = value;
      setCheckeds(checkeds);
      console.log(checkeds[index]);
    };

    const allChecks = (checked: CheckResponse, index: number) => {
      return checked.checked ? (
        (() => {
          console.log('c');
          return (
            <div
              onClick={() => {
                checkeds[index].checked = false;
                setCheckeds(checkeds);
              }}
            >
              <FaCheckSquare />
            </div>
          );
        })()
      ) : (
        <div onClick={() => checking(index, true)}>
          <FaRegSquare />
        </div>
      );
    };

    if (loaded)
      return (
        <Container>
          {checkeds.map((checked, index) => (
            <Check key={index} colorPrimary={color}>
              {console.log(checked.checked)}
              {allChecks(checked, index)}
              {checked.name}
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
