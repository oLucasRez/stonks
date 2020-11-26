import IGDB from '../../../services/IGDB';

import { IAgeRating } from '../../../typescript/services/IGDB/IAgeRating';
import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

class GameAgeRatingHelper {
	private static PEGITranslator = [3, 7, 12, 16, 18];

	public static async getPEGIAgeRating(
		game: IGameRaw
	): Promise<number | undefined> {
		const { age_ratings } = game;

		const PEGICategory = 2;

		const IGDBApi = await (await IGDB.getInstance()).getAPI();

		let selectedRating;

		if (!age_ratings || age_ratings?.length === 0) {
			return undefined;
		}

		for (let i = 0; i < age_ratings.length; i += 1) {
			const requestBody = `fields category, rating; limit: 1; where id = ${age_ratings[i]};`;

			const {
				data,
			}: // eslint-disable-next-line no-await-in-loop
			{ data: IAgeRating[] } = await IGDBApi.post(
				'age_ratings',
				requestBody
			);

			if (data[0].category === PEGICategory) {
				selectedRating = this.PEGITranslator[data[0].rating - 1];

				break;
			}
		}

		return selectedRating;
	}
}

export default GameAgeRatingHelper;
