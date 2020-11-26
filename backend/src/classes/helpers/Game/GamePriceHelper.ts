import SteamAPI from '../../../services/micro/SteamApi';
import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

class GamePriceHelper {
	public static async FillGamePrice(
		game: IGameRaw
	): Promise<IGameRaw> {
		if (!game.external_games) {
			return game;
		}

		const steamExternalGame = game.external_games.filter(
			(external_game) => external_game.category === 1
		)[0];

		const steamId = Number.parseInt(steamExternalGame.uid, 10);

		const [price] = await SteamAPI.getGamePrices([steamId]);

		const pricedGame = game;

		pricedGame.price = price;

		return pricedGame;
	}
}

export default GamePriceHelper;
