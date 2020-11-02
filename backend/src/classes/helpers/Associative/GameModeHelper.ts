import GameModeModel from "../../../models/GameModeModel";
import { IGameMode } from "../../../typescript/database/Tables";
import IGDBGameMode from "../../calls/IGDBGameMode";

class GameModeHelper {
  call!: IGDBGameMode;

  constructor() {
    this.call = new IGDBGameMode();
  }

  public async callData(): Promise<void> {
    let data: IGameMode[];
    do {
      data = await this.call.call();
        data.forEach(async gameEngine => {
          const alreadyExist = await GameModeModel.findByPk(gameEngine.id);
          if(!alreadyExist) {
            await GameModeModel.create(gameEngine)
            .then((_) => {
              console.log(`${gameEngine} added to database`);
            })
            .catch((err) => {
              console.log(`Error on saving ${gameEngine} on database...`);
              console.log(err);
            });
          } 
      });
    } while(data.length !== 0);
  }
}

export default GameModeHelper;