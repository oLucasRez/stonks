import GameSummaryModel from '../../models/GameSummaryModel';

import { IGameSummary } from '../../typescript/database/AssociativeTables';

class GameSummaryController {
	static async store(
		gameSummary: IGameSummary
	): Promise<boolean> {
		let saved = false;

		try {
			await GameSummaryModel.create(gameSummary);

			saved = true;
		} catch {
			saved = false;
		}

		return saved;
	}
}

export default GameSummaryController;
