import GameGameModeModel from '../../models/GameGameModeModel';

import { IGameGameMode } from '../../typescript/database/AssociativeTables';

class GameGameModeController {
	static async store(
		gameGameMode: IGameGameMode
	): Promise<boolean> {
		let saved = false;

		try {
			await GameGameModeModel.create(gameGameMode);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameGameModeController;
