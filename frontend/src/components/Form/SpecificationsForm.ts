//-------------------------------------------------------------< classes >
import TemplateForm from './TemplateForm';
import Input from '../Data/Input';
import CheckInput from '../Data/Input/CheckInput';
import TimeInput from '../Data/Input/TimeInput';
import SearchInput from '../Data/Input/SearchInput';
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
    const timeToBeat: Input = new TimeInput(
      'Time to Beat',
      'How long does it take you to beat the game?'
    );
    const gameEngine: Input = new SearchInput(
      'Game Engine',
      'What game engine did you use to make your game?'
    );

    return [gameModes, playerPerspectives, timeToBeat, gameEngine];
  }
}

export default SpecificationsForm;
