//-------------------------------------------------------------< classes >
import TemplateForm from "./TemplateForm";
import Data from "../Data/Data";
import InputStrategy from "../Data/TemplateStrategy/InputStrategy";
import TagStrategy from "../Data/TypeStrategy/TagStrategy";
import TextStrategy from "../Data/TypeStrategy/TextStrategy";
//--------------------------------------------------------------< styles >
import { FaFeatherAlt } from "react-icons/fa";
//================================================================[ BODY ]
class ProfileForm extends TemplateForm {
  protected getIcon() {
    return FaFeatherAlt;
  }

  protected getColor() {
    return this.theme.colors.primary[0];
  }

  protected getName() {
    return "Profile";
  }

  protected getInputs(): Data[] {
    const genre: Data = new Data(
      "Genre",
      "What are the genders of your game? RPG? Shooter? Platform?",
      new InputStrategy(),
      new TagStrategy()
    );
    const themes: Data = new Data(
      "Themes",
      "What are the themes of your game? Action? Comedy? Fantasy?",
      new InputStrategy(),
      new TagStrategy()
    );
    const keywords: Data = new Data(
      "Keywords",
      "list some keywords regards to your game",
      new InputStrategy(),
      new TagStrategy()
    );
    const storyline: Data = new Data(
      "Storyline",
      "Tell us a little of the your game story",
      new InputStrategy(),
      new TextStrategy()
    );
    const summary: Data = new Data(
      "Summary",
      "Write here a brief description of your game",
      new InputStrategy(),
      new TextStrategy()
    );

    return [genre, themes, keywords, storyline, summary];
  }
}

export default ProfileForm;
