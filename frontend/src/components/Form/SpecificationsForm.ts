//-------------------------------------------------------------< classes >
import TemplateForm from "./TemplateForm";
import Data from "../Data/Data";
import InputStrategy from "../Data/TemplateStrategy/InputStrategy";
import CheckStrategy from "../Data/TypeStrategy/CheckStrategy";
import TimeStrategy from "../Data/TypeStrategy/TimeStrategy";
import SelectStrategy from "../Data/TypeStrategy/SelectStrategy";
//--------------------------------------------------------------< styles >
import { FaFileAlt } from "react-icons/fa";

//================================================================[ BODY ]
class SpecificationsForm extends TemplateForm {
  protected getIcon() {
    return FaFileAlt;
  }

  protected getColor() {
    return this.theme.colors.primary[1];
  }

  protected getName() {
    return "Specifications";
  }

  protected getInputs(): Data[] {
    const gameModes: Data = new Data(
      "Game Modes",
      "Is your game just single player? Or has multiplayer? Is battle royale?",
      new InputStrategy(),
      new CheckStrategy()
    );
    const multiplayerModes: Data = new Data(
      "Multiplayer Modes",
      "It seems your game have multiplayer... but, what he have in this multiplayer? Offline Co-op? Co-op Campaign?",
      new InputStrategy(),
      new CheckStrategy()
    );
    const playerPerspectives: Data = new Data(
      "Player Perspectives",
      "Is the player's perspective first person? Third person? Bird view?",
      new InputStrategy(),
      new CheckStrategy()
    );
    const timeToBeat: Data = new Data(
      "Time to Beat",
      "How long does it take you to beat the game?",
      new InputStrategy(),
      new TimeStrategy()
    );
    const gameEngine: Data = new Data(
      "Game Engine",
      "What game engine did you use to make your game?",
      new InputStrategy(),
      new SelectStrategy()
    );

    return [
      gameModes,
      multiplayerModes,
      playerPerspectives,
      timeToBeat,
      gameEngine,
    ];
  }
}

export default SpecificationsForm;
