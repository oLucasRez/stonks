//----------------------------------------------------------< components >
import TemplateForm from './TemplateForm';
import Input from '../Input';
import AgeInput from '../Input/AgeInput';
import PriceInput from '../Input/PriceInput';
import DateInput from '../Input/DateInput';
//--------------------------------------------------------------< styles >
import { FaGlobeAmericas } from 'react-icons/fa';
//===============================================================[ CLASS ]
class PublishForm extends TemplateForm {
  //-----------------------------------------------------------< methods >
  protected getIcon() {
    return FaGlobeAmericas;
  }
  //----------------------------------------------------------------------
  protected getColor() {
    return this.theme.colors.primary[2];
  }
  //----------------------------------------------------------------------
  protected getName() {
    return 'Publish';
  }
  //----------------------------------------------------------------------
  protected getInputs(): Input[] {
    const ageRating: Input = new AgeInput(
      'Age Rating',
      'Is your game for all ages? Is it for adults ' +
        'only? (PEGI classification system)'
    );

    const price: Input = new PriceInput(
      'Price',
      'How much will your game cost?'
    );
    const releaseDate: Input = new DateInput(
      'Release Date',
      'When do you intend to launch your game?'
    );

    return [ageRating, price, releaseDate];
  }
}

export default PublishForm;
