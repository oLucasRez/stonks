/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import IGDBKeyword from '../../calls/IGDBKeyword';

import KeywordModel from '../../../models/KeywordModel';

import { IKeyword } from '../../../typescript/database/Tables';

class KeywordHelper {
	private call!: IGDBKeyword;

	constructor() {
		this.call = new IGDBKeyword();
	}

	public async callData(): Promise<void> {
		let data: IKeyword[];

		do {
			data = await this.call.call();

			for (let i = 0; i < data.length; i += 1) {
				const keyword = data[i];

				const alreadyExist = await KeywordModel.findByPk(
					keyword.id
				);

				if (!alreadyExist) {
					KeywordModel.create(keyword)
						.then(() => {
							console.log(`${keyword} added to database`);
						})
						.catch((err) => {
							console.log(
								`Error on saving ${keyword} on database...`
							);

							console.log(err);
						});
				}
			}
		} while (data.length !== 0);
	}
}

export default KeywordHelper;
