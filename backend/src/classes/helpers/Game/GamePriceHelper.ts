import SteamAPI from '../../../services/SteamApi';

import CallHandler from '../../chain/CallHandler';
import SteamPriceDelay from '../../chain/SteamPriceDelay';

import { IGame } from '../../../typescript/database/Tables';
import {
	IExternalGames,
	IGameRaw,
} from '../../../typescript/services/IGDB/IGameRaw';

class GamePriceHelper {
	private onGameFetched(callhandler: CallHandler<IGame>): void {
		console.log('all game prices fetched, listing prices');

		const games = callhandler.objs.map((game) => {
			return console.log(`${game.name}: R$ ${game.price}`);
		});

		// Retorna ao observador.
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

		return finalGame;
	}

	/**
	 * Fill the provided IGameRaw with it's correponded prices.
	 * @param data The data obtained on a IGDB Api call for games.
	 */
	public async fillGamePrices(data: IGameRaw[]): Promise<void> {
		const steamAPIInstance = SteamAPI.getInstance();

		const callHandler: CallHandler<IGame> = new CallHandler();

		callHandler.onFinish = (obj) => this.onGameFetched(obj);

		data.forEach((game): void => {
			const steamCall = new SteamPriceDelay(
				async () => this.fillGamePrice(game, steamAPIInstance),
				game,
				steamAPIInstance
			);

			callHandler.addCall(steamCall);
		});

		callHandler.nextCall();
	}
}

export default GamePriceHelper;
