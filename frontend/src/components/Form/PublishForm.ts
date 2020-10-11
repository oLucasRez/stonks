//-------------------------------------------------------------< classes >
import TemplateForm from "./TemplateForm";
import Data from "../Data/Data";
import InputStrategy from "../Data/TemplateStrategy/InputStrategy";
import TagStrategy from "../Data/TypeStrategy/TagStrategy";
import SelectStrategy from "../Data/TypeStrategy/SelectStrategy";
import DateStrategy from "../Data/TypeStrategy/DateStrategy";
//--------------------------------------------------------------< styles >
import { FaGlobeAmericas } from "react-icons/fa";
//================================================================[ BODY ]
class PublishForm extends TemplateForm {
  protected getIcon() {
    return FaGlobeAmericas;
  }

  protected getColor() {
    return this.theme.colors.primary[2];
  }

  protected getName() {
    return "Publish";
  }

  protected getInputs(): Data[] {
    const platforms: Data = new Data(
      "Platforms",
      "Where can we play your game? On Xbox One? PlayStation 4? PC?",
      new InputStrategy(),
      new TagStrategy()
    );
    const ageRating: Data = new Data(
      "Age Rating",
      "Is your game for all ages? Is it for adults only?",
      new InputStrategy(),
      new SelectStrategy()
    );
    const stores: Data = new Data(
      "Stores and References",
      "On which sites and platforms will your game be advertised and quoted?",
      new InputStrategy(),
      new TagStrategy()
    );
    const releaseDate: Data = new Data(
      "Release Date",
      "When do you intend to launch your game?",
      new InputStrategy(),
      new DateStrategy()
    );

    return [platforms, ageRating, stores, releaseDate];
  }
}

export default PublishForm;
