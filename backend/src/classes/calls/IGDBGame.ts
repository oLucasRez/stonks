import { AxiosError, AxiosResponse } from 'axios';

import IGDBCall from '../abstract/IGDBCall';

import CSVReader from '../../services/CSVReader';

import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';
import { ITimeToBeat } from '../../typescript/services/CSVReader/ITimeToBeat';
import { IGame } from '../../typescript/database/Tables';

export default class IGDBGame extends IGDBCall<IGame[]> {
	idLowerLimit: number;

	idHigherLimit: number;

	idStep: number;

	onlySteam: boolean;

	identifier: string;

	time_to_beat!: Map<string, string>;

	constructor() {
		super();

		this.identifier = 'games';

		this.idLowerLimit = 0;
		this.idHigherLimit = 499;

		this.onlySteam = true;

		this.idStep = this.idHigherLimit - this.idLowerLimit + 1;
	}

	private async createTimeToBeatMap(): Promise<void> {
		if (!this.time_to_beat) {
			this.time_to_beat = new Map<string, string>();
		}

		const result = await CSVReader.readCSV<ITimeToBeat>(
			'time_to_beats'
		);

		result.map(({ id_game, time_to_beat }) =>
			this.time_to_beat.set(id_game.toString(), time_to_beat)
		);
	}

	private async fillTimeToBeats(
		data: IGame[]
	): Promise<IGame[]> {
		const newData = data;

		if (!this.time_to_beat) {
			await this.createTimeToBeatMap();
		}

		for (let i = 0; i < newData.length; i += 1) {
			const game_id = newData[i].id.toString();

			if (this.time_to_beat.has(game_id)) {
				const time_to_beat = this.time_to_beat.get(
					game_id
				) as string;

				newData[i].time_to_beat = parseInt(time_to_beat, 10);
			}
		}

		return newData;
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

	protected async handleResponse(
		response: AxiosResponse<IGame[]>
	): Promise<IGame[]> {
		const { data } = response;

		// TODO add prices from SteamAPI

		const finalData = await this.fillTimeToBeats(data);

		return finalData;
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
