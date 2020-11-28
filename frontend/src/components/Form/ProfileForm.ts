//-------------------------------------------------------------< classes >
import GenreRequestStrategy from '../../classes/GenreRequestStrategy';
import GenreUseEffectStrategy from '../../classes/GenreUseEffectStrategy';
import ThemeRequestStrategy from '../../classes/ThemeRequestStrategy';
import ThemeUseEffectStrategy from '../../classes/ThemeUseEffectStrategy';
import KeywordRequestStrategy from '../../classes/KeywordRequestStrategy';
import KeywordUseEffectStrategy from '../../classes/KeywordUseEffectStrategy';
import StorylineUseEffectStrategy from '../../classes/StorylineUseEffectStrategy';
import SummaryUseEffectStrategy from '../../classes/SummaryUseEffectStrategy';
//----------------------------------------------------------< components >
import TemplateForm from './TemplateForm';
import Input from '../Input';
import TagInput from '../Input/TagInput';
import TextInput from '../Input/TextInput';
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
      new GenreRequestStrategy(),
      new GenreUseEffectStrategy()
    );
    const themes: Input = new TagInput(
      'Themes',
      'What are the themes of your game? Action? Comedy? Fantasy?',
      new ThemeRequestStrategy(),
      new ThemeUseEffectStrategy()
    );
    const keywords: Input = new TagInput(
      'Keywords',
      'list some keywords regards to your game',
      new KeywordRequestStrategy(),
      new KeywordUseEffectStrategy()
    );
    const storyline: Input = new TextInput(
      'Storyline',
      'Tell us a little of the your game story',
      new StorylineUseEffectStrategy()
    );
    const summary: Input = new TextInput(
      'Summary',
      'Write here a brief description of your game',
      new SummaryUseEffectStrategy()
    );

    return [genres, themes, keywords, storyline, summary];
  }
}

export default ProfileForm;
