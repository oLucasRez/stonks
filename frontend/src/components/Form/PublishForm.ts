//-------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
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
      // ageRating,
      // price,
      releaseDate,
    ];
  }
}

export default PublishForm;
