import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';

import { IGamePlayerPerspective } from '../../../typescript/database/AssociativeTables';

class GamePlayerPerspectiveController {
	static async store(
		gamePlayerPerspective: IGamePlayerPerspective
	): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GamePlayerPerspectiveModel.create(
				gamePlayerPerspective
			);

			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GamePlayerPerspectiveController;
