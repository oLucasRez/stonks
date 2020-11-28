//-------------------------------------------------------------< classes >
import PlayerPerspectiveRequestStrategy from '../../classes/PlayerPerspectiveRequestStrategy';
import PlayerPerspectiveUseEffectStrategy from '../../classes/PlayerPerspectiveUseEffectStrategy';
import GameModeRequestStrategy from '../../classes/GameModeRequestStrategy';
import GameModeUseEffectStrategy from '../../classes/GameModeUseEffectStrategy';
//----------------------------------------------------------< components >
import TemplateForm from './TemplateForm';
import Input from '../Input';
import SearchInput from '../Input/SearchInput';
import TimeInput from '../Input/TimeInput';
import CheckInput from '../Input/CheckInput';
//--------------------------------------------------------------< styles >
import { FaFileAlt } from 'react-icons/fa';
//===============================================================[ CLASS ]
class SpecificationsForm extends TemplateForm {
  //-----------------------------------------------------------< methods >
  protected getIcon() {
    return FaFileAlt;
  }
  //----------------------------------------------------------------------
  protected getColor() {
    return this.theme.colors.primary[1];
  }
  //----------------------------------------------------------------------
  protected getName() {
    return 'Specifications';
  }
  //----------------------------------------------------------------------
  protected getInputs(): Input[] {
    const gameEngine: Input = new SearchInput(
      'Game Engine',
      'What game engine did you use to make your game?'
    );
    const timeToBeat: Input = new TimeInput(
      'Time to Beat',
      'How long does it take you to beat the game?'
    );
    const playerPerspectives: Input = new CheckInput(
      'Player Perspectives',
      "Is the player's perspective first person? Third person? Bird view?",
      new PlayerPerspectiveRequestStrategy(),
      new PlayerPerspectiveUseEffectStrategy()
    );
    const gameModes: Input = new CheckInput(
      'Game Modes',
      'Is your game just single player? Or has multiplayer? Is battle royale?',
      new GameModeRequestStrategy(),
      new GameModeUseEffectStrategy()
    );

    return [gameEngine, timeToBeat, playerPerspectives, gameModes];
  }
}

export default SpecificationsForm;
