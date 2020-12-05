import GameTokenModel from '../../../models/GameTokenModel';

import { IGameToken } from '../../../typescript/database/AssociativeTables';

class GameTokenController {
	static async store(gameToken: IGameToken): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameTokenModel.create(gameToken);

			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameTokenController;
