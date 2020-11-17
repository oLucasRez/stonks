import GameStorylineModel from '../../models/GameStorylineModel';

import { IGameStoryline } from '../../typescript/database/AssociativeTables';

class GameStorylineController {
	static async store(
		gameStoryline: IGameStoryline
	): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameStorylineModel.create(
				gameStoryline
			);

			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameStorylineController;
