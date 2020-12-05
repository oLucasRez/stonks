import GameGenreModel from '../../../models/GameGenreModel';

import { IGameGenre } from '../../../typescript/database/AssociativeTables';

class GameGenreController {
	static async store(gameGenre: IGameGenre): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameGenreModel.create(gameGenre);
			await dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameGenreController;
