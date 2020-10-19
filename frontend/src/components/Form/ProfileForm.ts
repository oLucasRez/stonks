// -------------------------------------------------------------< classes >
import { FaFeatherAlt } from "react-icons/fa";
import TemplateForm from "./TemplateForm";
import Input from "../Data/Input";
// import TagStrategy from '../Data/TypeStrategy/TagStrategy';
// import TextStrategy from '../Data/Input/TextInput';
// --------------------------------------------------------------< styles >
import TextInput from "../Data/Input/TextInput";
//= ===============================================================[ BODY ]
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

  protected getInputs(): Input[] {
    // const genre: Input = new TagInput(
    //   "Genre",
    //   "What are the genders of your game? RPG? Shooter? Platform?"
    // );
    // const themes: Input = new TagInput(
    //   "Themes",
    //   "What are the themes of your game? Action? Comedy? Fantasy?"
    // );
    // const keywords: Input = new TagInput(
    //   "Keywords",
    //   "list some keywords regards to your game"
    // );
    const storyline: Input = new TextInput(
      "Storyline",
      "Tell us a little of the your game story"
    );
    const summary: Input = new TextInput(
      "Summary",
      "Write here a brief description of your game"
    );

    return [storyline, summary];
  }
}

export default ProfileForm;
