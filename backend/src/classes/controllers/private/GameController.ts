import GameModel from '../../../models/GameModel';

import { IGame } from '../../../typescript/database/Tables';

class GameController {
	static async store(game: IGame): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameModel.create(game);
			await dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameController;
