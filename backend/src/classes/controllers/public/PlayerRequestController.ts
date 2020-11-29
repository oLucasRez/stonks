import { Request, Response } from 'express';

import Controller from '../../abstract/Controller';

import GameModel from '../../../models/GameModel';
import GameGenreModel from '../../../models/GameGenreModel';
import GameKeywordModel from '../../../models/GameKeywordModel';
import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';
import GameThemeModel from '../../../models/GameThemeModel';

import IUserInput from '../../../typescript/frontend/IUserInput';

class PlayerRequestController extends Controller<any> {
	public indexUrl = '/player-inputs';

	public async index(
		_: Request,
		response: Response
	): Promise<Response<any[]>> {
		return response.status(404);
	}

	public readUrl = '/player-input/:id';

	public async read(
		_: Request,
		response: Response
	): Promise<Response<any>> {
		return response.status(404);
	}

	private async saveInformationOnDatabase(
		playerInput: IUserInput
	) {
		const {
			age_rating,
			game_engine,
			price,
			release_date,
			time_to_beat,
		} = playerInput;

		let formatedReleaseDate;

		if (release_date?.day && release_date.month) {
			formatedReleaseDate = new Date(
				`2000-${release_date?.month}-${release_date?.day}`
			);
		}

		const { id: userGameId } = await GameModel.create({
			first_release_date: formatedReleaseDate,
			age_rating,
			price,
			time_to_beat,
			id_game_engine: game_engine,
			is_user: true,
		});

		const {
			genres,
			keywords,
			player_perspectives,
			themes,
		} = playerInput;

		const genrePromises = genres?.map(async (genreId) => {
			await GameGenreModel.create({
				id_game: userGameId,
				id_genre: genreId,
			});
		});

		const keywordPromises = keywords?.map(async (keywordId) => {
			await GameKeywordModel.create({
				id_game: userGameId,
				id_keyword: keywordId,
			});
		});

		const playerPerspectivePromises = player_perspectives?.map(
			async (playerPerspectiveId) => {
				await GamePlayerPerspectiveModel.create({
					id_player_perspective: playerPerspectiveId,
					id_game: userGameId,
				});
			}
		);

		const themePromises = themes?.map(async (themeId) => {
			await GameThemeModel.create({
				id_theme: themeId,
				id_game: userGameId,
			});
		});

		return {
			id: userGameId,
			genre: genrePromises,
			keyword: keywordPromises,
			playerPerspective: playerPerspectivePromises,
			theme: themePromises,
		};
	}

	public storeUrl = '/player-input';

	public async store(
		request: Request<unknown, unknown, IUserInput>,
		response: Response
	): Promise<Response<any>> {
		const userInput = request.body;

		const idAndPromises = await this.saveInformationOnDatabase(
			userInput
		);

		// await promises + send it to R

		return response.send({ id: idAndPromises.id });
	}

	public updateUrl = '/player-input/:id';

	public async update(
		_: Request,
		response: Response
	): Promise<Response<any>> {
		return response.status(404);
	}

	public deleteUrl = '/player-input/:id';

	public async delete(
		_: Request,
		response: Response
	): Promise<Response> {
		return response.status(404);
	}
}

export default new PlayerRequestController();
