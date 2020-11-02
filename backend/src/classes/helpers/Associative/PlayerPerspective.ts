/* eslint-disable no-await-in-loop */
import IGDBPlayerPerspective from '../../calls/IGDBPlayerPerspective';

import PlayerPerspectiveModel from '../../../models/PlayerPerspectiveModel';

import { IPlayerPerspective } from '../../../typescript/database/Tables';

class PlayerPerspectiveHelper {
	private call!: IGDBPlayerPerspective;

	constructor() {
		this.call = new IGDBPlayerPerspective();
	}

	public async callData(): Promise<void> {
		let data: IPlayerPerspective[];

		do {
			data = await this.call.call();

			data.forEach(async (playerPerspective) => {
				const alreadyExist = await PlayerPerspectiveModel.findByPk(
					playerPerspective.id
				);

				if (!alreadyExist) {
					await PlayerPerspectiveModel.create(playerPerspective)
						.then(() => {
							console.log(
								`${playerPerspective} added to database`
							);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${playerPerspective} on database...`
							);

							console.log(err);
						});
				}
			});
		} while (data.length !== 0);
	}
}

export default PlayerPerspectiveHelper;
