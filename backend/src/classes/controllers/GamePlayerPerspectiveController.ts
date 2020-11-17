import GamePlayerPerspectiveModel from '../../models/GamePlayerPerspectiveModel';

import { IGamePlayerPerspective } from '../../typescript/database/AssociativeTables';

class GamePlayerPerspectiveController {
	static async store(
		gamePlayerPerspective: IGamePlayerPerspective
	): Promise<boolean> {
		let saved = false;

		try {
			await GamePlayerPerspectiveModel.create(
				gamePlayerPerspective
			);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GamePlayerPerspectiveController;
