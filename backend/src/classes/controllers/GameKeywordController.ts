import GameKeywordModel from '../../models/GameKeywordModel';

import { IGameKeyword } from '../../typescript/database/AssociativeTables';

class GameKeywordController {
	static async store(
		gameKeyword: IGameKeyword
	): Promise<boolean> {
		let saved = false;

		try {
			await GameKeywordModel.create(gameKeyword);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameKeywordController;
