import PlayerPerspectiveModel from "../../../models/PlayerPerspectiveModel";
import { IPlayerPerspective } from "../../../typescript/database/Tables";
import IGDBPlayerPerspective from "../../calls/IGDBPlayerPerspective";

class PlayerPerspectiveHelper {
  call!: IGDBPlayerPerspective;

  constructor() {
    this.call = new IGDBPlayerPerspective();
  }

  public async callData(): Promise<void> {
    let data: IPlayerPerspective[];
    do {
      data = await this.call.call();
        data.forEach(async gameEngine => {
          const alreadyExist = await PlayerPerspectiveModel.findByPk(gameEngine.id);
          if(!alreadyExist) {
            await PlayerPerspectiveModel.create(gameEngine)
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

export default PlayerPerspectiveHelper;