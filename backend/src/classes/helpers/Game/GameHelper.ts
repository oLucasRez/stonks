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
import GameGenreModel from '../../../models/GameGenreModel';

class GameHelper {
	rating = [3, 7, 12, 16, 18];

	free = true;

	finished = false;

	call: IGDBGameCall;

	constructor() {
		this.call = new IGDBGameCall();
	}

	async insertGamesIntoDatabase(): Promise<void> {
		/*
			Game Mode
			Game Genre
			Game Keywords
			Game Player Perspective
			Game Theme
		*/
		console.log('Starting database fill');

		const result = await this.call.call();
		const game = await GameAdapter.process(result);
		console.log(game.length);

		const IGDBInstance = await IGDB.getInstance();

		const IGDBApi = await IGDBInstance.getAPI();

		if (game.length === 0) {
			this.finished = true;
			console.log('Finished');
		}

		for (let i = 0; i < game.length; i += 1) {
			const gamePure: IGame = game[i];

			console.log(`Adding ${gamePure.id}`);

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
						const age_id = age_ratings[j];

						const body = `fields category, rating; limit 500; where id = ${age_id};`;

						try {
							const response: AxiosResponse<IAgeRating> = await IGDBApi.post(
								`/age_ratings`,
								body
							);
							if (response) {
								const ageRating: IAgeRating[] = (response.data as unknown) as IAgeRating[];
								idade = this.rating[ageRating[0].rating - 1];
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

			if (game[i].hypes !== null && game[i].hypes !== undefined)
				gamePure.hype = game[i].hypes;

			if (idade !== 0) gamePure.age_rating = idade;

			console.log(gamePure.age_rating);

			try {
				await GameModel.create(gamePure);
			} catch (err) {
				if (GameModel.findByPk(gamePure.id)) {
					console.log(`id ${gamePure.id} already exist`);
				} else {
					console.log(
						`Error on creating game, id: ${gamePure.id}`
					);
					console.log('Skiping this game');
					// eslint-disable-next-line no-continue
					continue;
				}
			}

			// associate all game modes
			if (game[i].game_modes) {
				for (let j = 0; j < game[i].game_modes.length; j += 1) {
					if (game[i].game_modes[j] !== null)
						try {
							await GameGameModeModel.create({
								id_game: game[i].id,
								id_game_mode: game[i].game_modes[j],
							});
						} catch (error) {
							console.log(
								`Error on creating game game mode ${game[i].id}`
							);
							console.log(error);
						}
				}
			}
			// associate all themes
			if (game[i].themes) {
				for (let j = 0; j < game[i].themes.length; j += 1) {
					if (game[i].themes[j] !== null)
						try {
							await GameThemeModel.create({
								id_game: game[i].id,
								id_theme: game[i].themes[j],
							});
						} catch (error) {
							console.log(
								`Error on creating game theme ${game[i].themes[j]}`
							);
							console.log(error);
						}
				}
			}
			// associate all keywords
			if (game[i].keywords) {
				for (let j = 0; j < game[i].keywords.length; j += 1) {
					if (game[i].keywords[j] !== null)
						try {
							await GameKeywordModel.create({
								id_game: game[i].id,
								id_keyword: game[i].keywords[j],
							});
						} catch (error) {
							console.log(
								`Error on creating game keyword ${game[i].keywords[j]}`
							);
							console.log(error);
						}
				}
			}
			// associate all player perspectives
			if (game[i].player_perspectives)
				for (
					let j = 0;
					j < game[i].player_perspectives.length;
					j += 1
				) {
					if (game[i].player_perspectives[j] !== null)
						try {
							await GamePlayerPerspectiveModel.create({
								id_game: game[i].id,
								id_player_perspective:
									game[i].player_perspectives[j],
							});
						} catch (error) {
							console.log(
								`Error on creating game player perspective ${game[i].player_perspectives[j]}`
							);
							console.log(error);
						}
				}
			// associate all genres
			if (game[i].genres)
				for (let j = 0; j < game[i].genres.length; j += 1) {
					if (game[i].genres[j] !== null)
						try {
							await GameGenreModel.create({
								id_game: game[i].id,
								id_genre: game[i].genres[j],
							});
						} catch (error) {
							console.log(
								`Error on creating game genre ${game[i].genres[j]}`
							);
							console.log(error);
						}
				}
		}

		this.free = true;
	}
}

export default GameHelper;
