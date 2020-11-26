/* eslint-disable no-await-in-loop */
import IGDBTheme from '../../calls/IGDBTheme';

import ThemeModel from '../../../models/ThemeModel';

import { ITheme } from '../../../typescript/database/Tables';

class ThemeHelper {
	private call!: IGDBTheme;

	constructor() {
		this.call = new IGDBTheme();
	}

	public async callData(): Promise<void> {
		let data: ITheme[];

		do {
			data = await this.call.call();

			data.forEach(async (theme) => {
				const alreadyExist = await ThemeModel.findByPk(theme.id);

				if (!alreadyExist) {
					await ThemeModel.create(theme)
						.then(() => {
							console.log(`${theme} added to database`);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${theme} on database...`
							);

							console.log(err);
						});
				}
			});
		} while (data.length !== 0);
	}
}

export default ThemeHelper;
