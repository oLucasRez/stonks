/* eslint-disable no-await-in-loop */
import { AxiosResponse } from 'axios';
import IGDBGameCall from '../../calls/IGDBGame';
import GameAdapter from '../../adapters/classes/GameAdapter';
import GameModel from '../../../models/GameModel';
import GameGameModeModel from '../../../models/GameGameModeModel';
import GameThemeModel from '../../../models/GameThemeModel';
import GameKeywordModel from '../../../models/GameKeywordModel';
import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';
import IGDB from '../../../services/IGDB';
import {
	IAgeRating,
	IGame,
} from '../../../typescript/database/Tables';

class GameHelper {
	rating = [3, 7, 12, 16, 18];

	async insertGamesIntoDatabase(): Promise<void> {
		/*
			Game Mode
			Game Genre
			Game Keywords
			Game Player Perspective
			Game Theme
		*/

		const call = new IGDBGameCall();

		const result = await call.call();

		const game = await GameAdapter.process(result);

		for (let i = 0; i < game.length; i += 1) {
			const gamePure: IGame = game[i];
			if (game[i].game_engines !== undefined) {
				const { game_engines } = game[i];
				if (
					game_engines !== undefined &&
					game_engines.length > 0
				) {
					// eslint-disable-next-line prefer-destructuring
					gamePure.id_game_engine = game_engines[0];
				}
			}

			let idade = 0;

			if (game[i].age_ratings !== undefined) {
				const { age_ratings } = game[i];
				if (
					age_ratings !== undefined &&
					age_ratings.length > 0
				) {
					for (let j = 0; j < age_ratings.length; j += 1) {
						const IGDBInstance = await IGDB.getInstance();

						const IGDBApi = await IGDBInstance.getAPI();

						const age_id = age_ratings[j];

						const body = `fields category, rating; limit 500; where id = ${age_id};`;

						try {
							const response: AxiosResponse<IAgeRating> = await IGDBApi.post(
								`/age_ratings`,
								body
							);
							if (response) {
								const ageRating: IAgeRating = response.data;
								if (ageRating.category === 1) {
									idade = this.rating[ageRating.rating];
								}
							}
						} catch (error) {
							console.log(
								`[IGDB]: Error on getting age ratings ${age_id}`
							);
							console.log(`[IGDB]: Endpoint request ${body}`);
							console.log(error);
						}
					}
				}
			}

			if (idade !== 0) gamePure.age_rating = idade;

			await GameModel.create(gamePure);

			// associate all game modes
			for (let j = 0; j < game[i].game_modes.length; j += 1) {
				await GameGameModeModel.create({
					id_game: game[i].id,
					id_game_mode: game[i].game_modes[j],
				});
			}
			// associate all themes
			for (let j = 0; j < game[i].themes.length; j += 1) {
				await GameThemeModel.create({
					id_game: game[i].id,
					id_theme: game[i].themes[j],
				});
			}
			// associate all keywords
			for (let j = 0; j < game[i].keywords.length; j += 1) {
				await GameKeywordModel.create({
					id_game: game[i].id,
					id_keyword: game[i].keywords[j],
				});
			}
			// associate all player perspectives
			for (
				let j = 0;
				j < game[i].player_perspectives.length;
				j += 1
			) {
				await GamePlayerPerspectiveModel.create({
					id_game: game[i].id,
					id_player_perspective: game[i].player_perspectives[j],
				});
			}
			// associate all genres
			for (let j = 0; j < game[i].genres.length; j += 1) {
				await GameThemeModel.create({
					id_game: game[i].id,
					id_theme: game[i].themes[j],
				});
			}
		}
	}
}

export default GameHelper;
