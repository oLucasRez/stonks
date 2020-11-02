/* eslint-disable no-await-in-loop */
import IGDBKeyword from '../../calls/IGDBKeyword';

import KeywordModel from '../../../models/KeywordModel';

import { IKeyword } from '../../../typescript/database/Tables';

class KeywordHelper {
	call!: IGDBKeyword;

	constructor() {
		this.call = new IGDBKeyword();
	}

	public async callData(): Promise<void> {
		let data: IKeyword[];

		do {
			data = await this.call.call();

			data.forEach(async (keyword) => {
				const alreadyExist = await KeywordModel.findByPk(
					keyword.id
				);

				if (!alreadyExist) {
					await KeywordModel.create(keyword)
						.then(() => {
							console.log(`${keyword} added to database`);
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

export default KeywordHelper;
