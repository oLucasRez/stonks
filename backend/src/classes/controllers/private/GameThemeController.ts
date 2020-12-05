import GameThemeModel from '../../../models/GameThemeModel';

import { IGameTheme } from '../../../typescript/database/AssociativeTables';

class GameThemeController {
	static async store(gameTheme: IGameTheme): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameThemeModel.create(gameTheme);

			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`[POSTGRESQL]: Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameThemeController;
