/* eslint-disable no-await-in-loop */
import IGDBGameMode from '../../calls/IGDBGameMode';

import GameModeModel from '../../../models/GameModeModel';

import { IGameMode } from '../../../typescript/database/Tables';

class GameModeHelper {
	private call!: IGDBGameMode;

	constructor() {
		this.call = new IGDBGameMode();
	}

	public async callData(): Promise<void> {
		let data: IGameMode[];

		do {
			data = await this.call.call();

			data.forEach(async (gameMode) => {
				const alreadyExist = await GameModeModel.findByPk(
					gameMode.id
				);

				if (!alreadyExist) {
					await GameModeModel.create(gameMode)
						.then(() => {
							console.log(`${gameMode} added to database`);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${gameMode} on database...`
							);

							console.log(err);
						});
				}
			});
		} while (data.length !== 0);
	}
}

export default GameModeHelper;
