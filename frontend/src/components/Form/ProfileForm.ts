//-------------------------------------------------------------< classes >
import GenresStrategies from '../../classes/Strategies/GenresStrategies';
import ThemesStrategies from '../../classes/Strategies/ThemesStrategies';
//----------------------------------------------------------< components >
import TemplateForm from './TemplateForm';
import Input from '../Input';
import TagInput from '../Input/TagInput';
//--------------------------------------------------------------< styles >
import { FaFeatherAlt } from 'react-icons/fa';
//===============================================================[ CLASS ]
class ProfileForm extends TemplateForm {
  //-----------------------------------------------------------< methods >
  protected getIcon() {
    return FaFeatherAlt;
  }
  //----------------------------------------------------------------------
  protected getColor() {
    return this.theme.colors.primary[0];
  }
  //----------------------------------------------------------------------
  protected getName() {
    return 'Profile';
  }
  //----------------------------------------------------------------------
  protected getInputs(): Input[] {
    const genres: Input = new TagInput(
      'Genres',
      'What are the genders of your game? RPG? Shooter? Platform?',
      new GenresStrategies()
    );
    const themes: Input = new TagInput(
      'Themes',
      'What are the themes of your game? Action? Comedy? Fantasy?',
      new ThemesStrategies()
    );

    return [genres, themes];
  }
}

export default ProfileForm;
