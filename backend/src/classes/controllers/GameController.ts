import GameModel from '../../models/GameModel';

import { IGame } from '../../typescript/database/Tables';

class GameController {
	static async store(game: IGame): Promise<boolean> {
		let saved = false;

		try {
			await GameModel.create(game);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameController;
