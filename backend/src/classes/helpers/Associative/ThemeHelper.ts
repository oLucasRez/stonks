/* eslint-disable no-await-in-loop */
import IGDBTheme from '../../calls/IGDBTheme';

import ThemeModel from '../../../models/ThemeModel';

import { ITheme } from '../../../typescript/database/Tables';

class ThemeHelper {
	call!: IGDBTheme;

	constructor() {
		this.call = new IGDBTheme();
	}

	public async callData(): Promise<void> {
		let data: ITheme[];

		do {
			data = await this.call.call();

			data.forEach(async (gameEngine) => {
				const alreadyExist = await ThemeModel.findByPk(
					gameEngine.id
				);

				if (!alreadyExist) {
					await ThemeModel.create(gameEngine)
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

export default ThemeHelper;
