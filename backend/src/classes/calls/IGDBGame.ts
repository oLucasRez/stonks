import { AxiosError, AxiosResponse } from 'axios';

import IGDBCall from '../abstract/IGDBCall';

import CSVReader from '../../services/CSVReader';
import SteamAPI from '../../services/SteamApi';

import { IGame } from '../../typescript/database/Tables';
import { IIGDBRequestBody } from '../../typescript/services/IGDB/RequestBody';
import { ITimeToBeat } from '../../typescript/services/CSVReader/ITimeToBeat';
import {
	IExternalGames,
	IGameRaw,
} from '../../typescript/services/IGDB/IGameRaw';
import CallHandler from '../chain/CallHandler';
import SteamPriceDelay from '../chain/SteamPriceDelay';

export default class IGDBGame extends IGDBCall<IGame[]> {
	protected idLowerLimit: number;

	protected idHigherLimit: number;

	protected idStep: number;

	protected onlySteam: boolean;

	protected identifier: string;

	private time_to_beat!: Map<string, string>;

	constructor() {
		super();

		this.identifier = 'games';

		this.idLowerLimit = 0;
		this.idHigherLimit = 10;

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

	private getExternalGameSteamUid(
		external_games: IExternalGames[]
	): string {
		const { uid } = external_games.filter(
			(external_game) => external_game.category === 1
		)[0];

		return uid;
	}

	private async fillGamePrice(
		game: IGameRaw,
		steamAPI: SteamAPI
	): Promise<IGame> {
		let uid = '';

		if (game.external_games) {
			uid = this.getExternalGameSteamUid(game.external_games);
		}

		let finalGame = game;

		delete finalGame.external_games;

		finalGame = finalGame as IGame;

		if (uid) {
			finalGame.price = await steamAPI.getGamePrice(uid);
		}
		console.log(finalGame.price);
		return finalGame;
	}

	private onGameFetched(callhandler: CallHandler<IGame>): void {
		console.log('all game prices fetched, listing prices');
		callhandler.objs.map((game) => {
			return console.log(game);
		});
	}

	private async fillGamePrices(data: IGameRaw[]): Promise<void> {
		/* IGame[] */
		const steamAPIInstance = SteamAPI.getInstance();

		const callHandler: CallHandler<IGame> = new CallHandler();

		callHandler.onFinish = (obj) => this.onGameFetched(obj);

		data.map((game): void => {
			return callHandler.addCall(
				new SteamPriceDelay(
					() => this.fillGamePrice(game, steamAPIInstance),
					game,
					steamAPIInstance
				)
			);
		});

		callHandler.nextCall();

		// callHandler.start();

		// while (callHandler.finished) {
		// 	console.log('getting more calls');
		// 	callHandler.nextCall();
		// }

		// callHandler.nextCall
		// const toWaitPromises = Promise.all(promises);

		// return toWaitPromises;S
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
		response: AxiosResponse<IGame[]>
	): Promise<IGame[]> {
		const { data } = response;

		const rawData = data as IGameRaw[];

		const pricedData = await this.fillGamePrices(rawData);

		// should send pricedData to fillTimeBeats
		// const finalData = await this.fillTimeToBeats(data);

		return pricedData;
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
