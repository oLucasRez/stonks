import GameKeywordModel from '../../models/GameKeywordModel';

import { IGameKeyword } from '../../typescript/database/AssociativeTables';

class GameKeywordController {
	static async store(
		gameKeyword: IGameKeyword
	): Promise<boolean> {
		let saved = false;

		try {
			if (
				await GameKeywordModel.findByPk(gameKeyword.id_keyword)
			) {
				const dbRef = await GameKeywordModel.create(gameKeyword);
				dbRef.save();
				saved = true;
			} else {
				saved = false;
			}
		} catch (err) {
			saved = false;

			console.log(`Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameKeywordController;
