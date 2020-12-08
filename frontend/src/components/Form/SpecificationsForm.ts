//-------------------------------------------------------------< classes >
import PlayerPerspectivesStrategies from '../../classes/Strategies/PlayerPerspectivesStrategies';
import GameModesStrategies from '../../classes/Strategies/GameModesStrategies';
//----------------------------------------------------------< components >
import TemplateForm from './TemplateForm';
import Input from '../Input';
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
    const timeToBeat: Input = new TimeInput(
      'Time to Beat',
      'How long does it take you to beat the game?'
    );
    const playerPerspectives: Input = new CheckInput(
      'Player Perspectives',
      "Is the player's perspective first person? Third person? Bird view?",
      new PlayerPerspectivesStrategies()
    );
    const gameModes: Input = new CheckInput(
      'Game Modes',
      'Is your game just single player? Or has multiplayer? Is battle royale?',
      new GameModesStrategies()
    );

    return [timeToBeat, playerPerspectives, gameModes];
  }
}

export default SpecificationsForm;
