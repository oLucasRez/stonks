import GameKeywordModel from '../../../models/GameKeywordModel';

import { IGameKeyword } from '../../../typescript/database/AssociativeTables';

class GameKeywordController {
	static async store(
		gameKeyword: IGameKeyword
	): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameKeywordModel.create(gameKeyword);
			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameKeywordController;
