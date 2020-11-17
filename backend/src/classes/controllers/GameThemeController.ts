import GameThemeModel from '../../models/GameThemeModel';

import { IGameTheme } from '../../typescript/database/AssociativeTables';

class GameThemeController {
	static async store(gameTheme: IGameTheme): Promise<boolean> {
		let saved = false;

		try {
			await GameThemeModel.create(gameTheme);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameThemeController;
