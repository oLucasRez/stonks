import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

class GameGameEngineHelper {
	public static selectGameEngine(
		game: IGameRaw
	): number | undefined {
		const { game_engines } = game;

		if (!game_engines) {
			return undefined;
		}

		return game_engines[0];
	}
}

export default GameGameEngineHelper;
