import GameStorylineModel from '../../models/GameStorylineModel';

import { IGameStoryline } from '../../typescript/database/AssociativeTables';

class GameStorylineController {
	static async store(
		gameStoryline: IGameStoryline
	): Promise<boolean> {
		let saved = false;

		try {
			await GameStorylineModel.create(gameStoryline);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameStorylineController;
