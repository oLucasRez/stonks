/* eslint-disable no-await-in-loop */
import IGDBGameEngine from '../../calls/IGDBGameEngine';

import GameEngineModel from '../../../models/GameEngineModel';

import { IGameEngine } from '../../../typescript/database/Tables';

class GameEngineHelper {
	private gameEngineCall!: IGDBGameEngine;

	constructor() {
		this.gameEngineCall = new IGDBGameEngine();
	}

	public async callData(): Promise<void> {
		let data: IGameEngine[];

		do {
			data = await this.gameEngineCall.call();

			data.forEach(async (gameEngine) => {
				const alreadyExist = await GameEngineModel.findByPk(
					gameEngine.id
				);

				if (!alreadyExist) {
					await GameEngineModel.create(gameEngine)
						.then(() => {
							console.log(`${gameEngine} added to database`);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${gameEngine} on database...`
							);

							console.log(err);
						});
				}
			});
		} while (data.length !== 0);
	}
}

export default GameEngineHelper;
