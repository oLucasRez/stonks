import GenreModel from "../../../models/GenreModel";
import { IGenre } from "../../../typescript/database/Tables";
import IGDBGenres from "../../calls/IGDBGenres";

class GameGenreHelper {
  genreCall!: IGDBGenres;

  constructor() {
    this.genreCall = new IGDBGenres();
  }

  public async callData(): Promise<void> {
    let data: IGenre[];
    do {
      data = await this.genreCall.call();
        data.forEach(async gameEngine => {
          const alreadyExist = await GenreModel.findByPk(gameEngine.id);
          if(!alreadyExist) {
            await GenreModel.create(gameEngine)
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

export default GameGenreHelper;