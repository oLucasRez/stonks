import GameSummaryModel from '../../models/GameSummaryModel';

import { IGameSummary } from '../../typescript/database/AssociativeTables';

class GameSummaryController {
	static async store(
		gameSummary: IGameSummary
	): Promise<boolean> {
		let saved = false;

		try {
			const dbRef = await GameSummaryModel.create(gameSummary);

			dbRef.save();

			saved = true;
		} catch (err) {
			saved = false;

			console.log(`Error on saving: ${err}`);
		}

		return saved;
	}
}

export default GameSummaryController;
