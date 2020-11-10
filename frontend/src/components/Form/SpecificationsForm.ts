//-------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
import CheckInput from '../Data/Input/CheckInput';
import GameModeRequestStrategy from '../Data/Input/CheckInput/Strategy/GameModeRequestStrategy';
import PlayerPerspectiveRequestStrategy from '../Data/Input/CheckInput/Strategy/PlayerPerspectiveRequestStrategy';
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
    const gameModes: Input = new CheckInput(
      'Game Modes',
      'Is your game just single player? Or has multiplayer? Is battle royale?',
      new GameModeRequestStrategy()
    );
    const playerPerspectives: Input = new CheckInput(
      'Player Perspectives',
      "Is the player's perspective first person? Third person? Bird view?",
      new PlayerPerspectiveRequestStrategy()
    );
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
      gameModes,
      playerPerspectives,
      // timeToBeat,
      // gameEngine,
    ];
  }
}

export default SpecificationsForm;
