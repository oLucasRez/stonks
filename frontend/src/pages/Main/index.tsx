import React, { FC } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../classes/FormSingleton';
//----------------------------------------------------------< interfaces >
import IMainProps from '../../interfaces/IMainProps';
//----------------------------------------------------------< components >
import TemplateForm from '../../components/Form/TemplateForm/index';
import ProfileForm from '../../components/Form/ProfileForm';
import SpecificationsForm from '../../components/Form/SpecificationsForm';
import PublishForm from '../../components/Form/PublishForm';
import Switch from 'react-switch';
import Results from '../../components/Results';
//---------------------------------------------------------------< hooks >
import { useContext, useState } from 'react';
import useStorageState from '../../hooks/useStorageState';
//--------------------------------------------------------------< assets >
import { ReactComponent as Logo } from '../../assets/logo_name.svg';
//--------------------------------------------------------------< styles >
import { ThemeContext } from 'styled-components';
import {
  Container,
  PhraseContainer,
  FormContainer,
  FormAndResultContainer,
  ButtonContainer,
} from './styles';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
//===========================================================[ COMPONENT ]
const Main: FC<IMainProps> = ({ toggleTheme }) => {
  //--------------------------------------------------------< properties >
  const { title, colors } = useContext(ThemeContext);
  //----------------------------------------------------------------------
  const form = FormSingleton.getInstance();
  //----------------------------------------------------------------------
  const [forms] = useState<TemplateForm[]>([
    new ProfileForm(),
    new SpecificationsForm(),
    new PublishForm(),
  ]);
  const [currentForm, setCurrentForm] = useStorageState<number>(
    'current-form',
    0
  );
  const [showingForm, setShowingForm] = useStorageState<boolean>(
    'showing-form',
    false
  );
  //----------------------------------------------------------------------
  const FormTemplateMethod = forms[currentForm].templateMethod;
  //-----------------------------------------------------------< methods >
  const submit = () => {
    if (showingForm) {
      setShowingForm(false);
      form.print();
      // (async () => await form.submit())();
    } else setShowingForm(true);
  };
  //------------------------------------------------------------< return >
  return (
    <Container>
      <Logo className='logo' />
      <PhraseContainer>
        <h1 className='phrase'>im a geme dovoloper</h1>
      </PhraseContainer>
      <Switch
        className='switch'
        onChange={toggleTheme}
        checked={title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={15}
        width={40}
        handleDiameter={25}
        onColor={colors.background[2]}
        onHandleColor={colors.foreground[0]}
        offColor={colors.background[2]}
        offHandleColor={colors.foreground[0]}
      />
      <FormContainer>
        <FormAndResultContainer
          className={showingForm ? 'visible-form' : 'hidden-form'}
          style={{ zIndex: showingForm ? 10 : 0 }}
        >
          <FormTemplateMethod forms={forms} setCurrentForm={setCurrentForm} />
        </FormAndResultContainer>
        <FormAndResultContainer
          className={showingForm ? 'hidden-results' : 'visible-results'}
          style={{ zIndex: showingForm ? 0 : 10 }}
        >
          <Results />
        </FormAndResultContainer>
        <ButtonContainer>
          <button
            className={showingForm ? 'to-results' : 'to-form'}
            onClick={() => submit()}
          >
            {showingForm ? (
              <>
                <p>See results</p>
                <FaArrowRight />
              </>
            ) : (
              <>
                <FaArrowLeft />
                <p>Back to form</p>
              </>
            )}
          </button>
        </ButtonContainer>
        <footer className='description'>
          Want to create a game, but don't know how to develop your idea? Want
          to publish it on <b>Steam</b>, but don't know if your game will be
          successful? <b>Stonks Your Game</b> analyzes the market for
          video-games on Steam and informs you of the true potential of your
          idea, in addition to giving tips for your game to be even more
          successful!
        </footer>
      </FormContainer>
    </Container>
  );
};

export default Main;
