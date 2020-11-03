// -------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
import TagInput from '../Data/Input/TagInput';
import TextInput from '../Data/Input/TextInput';
//-------------------------------------------------------------< services >
import backend from '../../services/backend';
// --------------------------------------------------------------< styles >
import { FaFeatherAlt } from 'react-icons/fa';
//= ===============================================================[ BODY ]
class ProfileForm extends TemplateForm {
  protected getIcon() {
    return FaFeatherAlt;
  }

  protected getColor() {
    return this.theme.colors.primary[0];
  }

  protected getName() {
    return 'Profile';
  }

  protected getInputs(): Input[] {
    const genres: Input = new TagInput(
      'Genre',
      'What are the genders of your game? RPG? Shooter? Platform?',
      (setAllTags) => {
        backend.get('genres').then((res) => {
          setAllTags(res.data);
        });
      }
    );
    const themes: Input = new TagInput(
      'Themes',
      'What are the themes of your game? Action? Comedy? Fantasy?',
      (setAllTags) => {
        backend.get('themes').then((res) => {
          setAllTags(res.data);
        });
      }
    );
    const keywords: Input = new TagInput(
      'Keywords',
      'list some keywords regards to your game',
      (setAllTags) => {
        backend.get('keywords', { params: { page: 0 } }).then((res) => {
          setAllTags(res.data);
        });
      }
    );
    const storyline: Input = new TextInput(
      'Storyline',
      'Tell us a little of the your game story'
    );
    const summary: Input = new TextInput(
      'Summary',
      'Write here a brief description of your game'
    );

    return [genres, themes, keywords, storyline, summary];
  }
}

export default ProfileForm;
