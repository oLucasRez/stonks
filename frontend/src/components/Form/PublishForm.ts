//-------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
import TagInput from '../Data/Input/TagInput';
import DateInput from '../Data/Input/DateInput';
// import SelectStrategy from "../Data/TypeStrategy/SelectStrategy";
//--------------------------------------------------------------< styles >
import { FaGlobeAmericas } from 'react-icons/fa';
//================================================================[ BODY ]
class PublishForm extends TemplateForm {
  protected getIcon() {
    return FaGlobeAmericas;
  }

  protected getColor() {
    return this.theme.colors.primary[2];
  }

  protected getName() {
    return 'Publish';
  }

  protected getInputs(): Input[] {
    const platforms: Input = new TagInput(
      'Platforms',
      'Where can we play your game? On Xbox One? PlayStation 4? PC?'
    );
    // const ageRating: Input = new Input(
    //   "Age Rating",
    //   "Is your game for all ages? Is it for adults only?",
    //   new InputStrategy(),
    //   new SelectStrategy()
    // );
    // const price: Input = new PriceInput(
    //   "Price",
    //   "todo..."
    // );
    const releaseDate: Input = new DateInput(
      'Release Date',
      'When do you intend to launch your game?'
    );

    return [
      platforms,
      // ageRating,
      releaseDate,
    ];
  }
}

export default PublishForm;
