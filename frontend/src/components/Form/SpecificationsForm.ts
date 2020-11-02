//-------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
// import CheckStrategy from "../Data/TypeStrategy/CheckStrategy";
// import TimeStrategy from "../Data/TypeStrategy/TimeStrategy";
// import SelectStrategy from "../Data/TypeStrategy/SelectStrategy";
//--------------------------------------------------------------< styles >
import { FaFileAlt } from 'react-icons/fa';

//================================================================[ BODY ]
class SpecificationsForm extends TemplateForm {
  protected getIcon() {
    return FaFileAlt;
  }

  protected getColor() {
    return this.theme.colors.primary[1];
  }

  protected getName() {
    return 'Specifications';
  }

  protected getInputs(): Input[] {
    // const gameModes: Input = new Input(
    //   "Game Modes",
    //   "Is your game just single player? Or has multiplayer? Is battle royale?",
    //   new InputStrategy(),
    //   new CheckStrategy()
    // );
    // const playerPerspectives: Input = new Input(
    //   "Player Perspectives",
    //   "Is the player's perspective first person? Third person? Bird view?",
    //   new InputStrategy(),
    //   new CheckStrategy()
    // );
    // const timeToBeat: Input = new Input(
    //   "Time to Beat",
    //   "How long does it take you to beat the game?",
    //   new InputStrategy(),
    //   new TimeStrategy()
    // );
    // const gameEngine: Input = new Input(
    //   "Game Engine",
    //   "What game engine did you use to make your game?",
    //   new InputStrategy(),
    //   new SelectStrategy()
    // );

    return [
      // gameModes,
      // playerPerspectives,
      // timeToBeat,
      // gameEngine,
    ];
  }
}

export default SpecificationsForm;
