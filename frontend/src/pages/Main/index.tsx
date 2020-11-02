import React, { FC, useContext } from 'react';
//-------------------------------------------------------------< classes >
import TemplateForm from '../../components/Form/TemplateForm/index';
import ProfileForm from '../../components/Form/ProfileForm';
import SpecificationsForm from '../../components/Form/SpecificationsForm';
import PublishForm from '../../components/Form/PublishForm';
//----------------------------------------------------------< components >
import Switch from 'react-switch';
//---------------------------------------------------------------< utils >
import useStorageState from '../../utils/useStorageState';
//--------------------------------------------------------------< assets >
import { ReactComponent as Logo } from '../../assets/logo_name.svg';
//--------------------------------------------------------------< styles >
import { ThemeContext } from 'styled-components';

import { Container, PhraseContainer, FormContainer } from './styles';
//---------------------------------------------------------------< types >
interface Props {
  toggleTheme(): void;
}
//================================================================[ BODY ]
const Main: FC<Props> = ({ toggleTheme }) => {
  const { title, colors } = useContext(ThemeContext);
  const forms: TemplateForm[] = [
    new ProfileForm(),
    new SpecificationsForm(),
    new PublishForm(),
  ];
  const [currentForm, setCurrentForm] = useStorageState<number>(
    'current-form',
    0
  );

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
        {forms[currentForm].templateMethod(forms, setCurrentForm)}
      </FormContainer>
    </Container>
  );
};

export default Main;
