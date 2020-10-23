import { AxiosError, AxiosResponse } from 'axios';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';

import IGDBCall from '../abstract/IGDBCall';

import { IGame } from '../../typescript/DB/Tables';
import GameModel from '../../typescript/DB/Models/GameModel';

export default class IGDBGame extends IGDBCall {
	idLowerLimit: number;

	idHigherLimit: number;

	idStep: number;

	onlySteam: boolean;

	identifier: string;

	constructor() {
		super();

		this.identifier = 'games';

		this.idLowerLimit = 0;
		this.idHigherLimit = 499;

		this.onlySteam = true;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	protected requestBody(): IIGDBRequestBody {
		return {
			fields: [
				'name',
				'slug',
				'storyline',
				'summary',
				'age_ratings',
				'game_modes',
				'game_engines',
				'multiplayer_modes',
				'player_perspectives',
				'total_rating',
				'total_rating_count',
				'keywords',
				'follows',
				'genres',
				'themes',
				'hypes',
				'release_dates',
			],
			limit: 500,
		};
	}

	protected handleResponse(
		response: AxiosResponse<IGame[]>
	): string[] {
		const { data } = response;

		// TODO get price from steam

		// TODO get time_to_beat csv

		const ids = data.map((game: IGame) => {
			return game.id.toString();
		});

		console.log(data[1]);

		const game: GameModel = new GameModel(data[1]);

		console.log(game);

		return ids;
	}

	protected handleRequestException(
		_error: AxiosError,
		_body: IIGDBRequestBody,
		bodyString: string,
		identifier: string
	): void {
		console.log(
			`[IGDB]: Error ocurred on request on endpoint "${identifier}" with body: ${bodyString}`
		);
	}
}
