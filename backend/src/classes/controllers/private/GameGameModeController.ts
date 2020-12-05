import GameGameModeModel from '../../../models/GameGameModeModel';

import { IGameGameMode } from '../../../typescript/database/AssociativeTables';

class GameGameModeController {
	static async store(
		gameGameMode: IGameGameMode
	): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameGameModeModel.create(gameGameMode);
			await dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameGameModeController;
