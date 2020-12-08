import React, { FC } from 'react';
//----------------------------------------------------------< interfaces >
import IStrategies from '../../../interfaces/IStrategies';
import ICheckResponse from '../../../interfaces/ICheckResponse';
//-------------------------------------------------------------< classes >
import NotificationManager from '../../../classes/NotificationManager';
//----------------------------------------------------------< components >
import Input from '../index';
//---------------------------------------------------------------< hooks >
import { useContext, useState, useEffect } from 'react';
import useStorageState from '../../../hooks/useStorageState';
//------------------------------------------------------------< contexts >
import ColorContext from '../../../contexts/ColorContext';
import { ThemeContext } from 'styled-components';
//--------------------------------------------------------------< styles >
import { Container, Check, SuggestionContainer } from './styles';
import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import ContentLoader from 'styled-content-loader';
import IInputProps from '../../../interfaces/IInputProps';
//===============================================================[ CLASS ]
class CheckInput extends Input {
  private strategies: IStrategies<ICheckResponse[]>;

  constructor(
    name: string,
    description: string,
    strategies: IStrategies<ICheckResponse[]>
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
    return useStorageState<boolean[]>(this.name + '-checked', []);
  }
  //=========================================================[ COMPONENT ]
  Body: FC<IInputProps<boolean[]>> = ({ state }) => {
    //------------------------------------------------------< properties >
    const color = useContext(ColorContext);
    const { background, foreground } = useContext(ThemeContext).colors;
    //--------------------------------------------------------------------
    const [checkResponse, setCheckResponse] = useStorageState<ICheckResponse[]>(
      this.name + '-check-response',
      []
    );
    const [checks, setChecks] = state;
    //--------------------------------------------------------------------
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    //---------------------------------------------------------< methods >
    useEffect(() => {
      this.strategies.requestStrategy
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
      this.strategies.useEffectStrategy.setFormSingleton({
        checks,
        checkResponse,
      });
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
  Suggestion: FC<IInputProps<boolean[]>> = ({ state }) => {
    const color = useContext(ColorContext);
    const result: string[] = this.strategies.result();
    const [checks, setChecks] = state;
    const [checkResponse, setCheckResponse] = useStorageState<ICheckResponse[]>(
      this.name + '-check-response',
      []
    );

    useEffect(() => {
      this.strategies.requestStrategy.request().then((response) => {
        if (!checkResponse.length) {
          const newChecks = [];
          for (var i = 0; i < response.length; i++) newChecks.push(false);
          setCheckResponse(response);
          setChecks(newChecks);
        }
      });
    }, []);

    const checking = (index: number) => {
      const newChecks = [...checks];
      const newCheckIndex = checkResponse.findIndex(
        (check) => check.name === result[index]
      );
      newChecks[newCheckIndex] = !newChecks[newCheckIndex];
      setChecks(newChecks);
    };

    return (
      <SuggestionContainer colorPrimary={color}>
        <h3>{this.name} suggestion</h3>
        {result
          ? checkResponse.map((check, index) =>
              result.includes(check.name) ? (
                <Check key={index} colorPrimary={color}>
                  <div
                    onClick={() =>
                      checking(
                        result.findIndex((value) => value === check.name)
                      )
                    }
                  >
                    {checks[index] ? <FaCheckSquare /> : <FaRegSquare />}
                  </div>
                  {check.name}
                </Check>
              ) : null
            )
          : null}
      </SuggestionContainer>
    );
  };
}

export default CheckInput;
