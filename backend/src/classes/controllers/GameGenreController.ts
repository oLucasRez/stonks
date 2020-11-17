import GameGenreModel from '../../models/GameGenreModel';

import { IGameGenre } from '../../typescript/database/AssociativeTables';

class GameGenreController {
	static async store(gameGenre: IGameGenre): Promise<boolean> {
		let saved = false;

		try {
			await GameGenreModel.create(gameGenre);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameGenreController;
