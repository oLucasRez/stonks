import { AxiosError, AxiosResponse } from 'axios';

import IGDBCall from '../abstract/IGDBCall';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';
import { IGameRaw } from '../../typescript/services/IGDB/IGameRaw';

export default class IGDBGame extends IGDBCall<IGameRaw[]> {
	public idLowerLimit: number;

	public idHigherLimit: number;

	protected idStep: number;

	protected onlySteam: boolean;

	protected identifier: string;

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
				'first_release_date',
				'external_games.category',
				'external_games.uid',
			],
			limit: 500,
		};
	}

	protected async handleResponse(
		response: AxiosResponse<IGameRaw[]>
	): Promise<IGameRaw[]> {
		const { data } = response;

		return data;
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
