import SteamAPI from '../../services/SteamApi';
import { IGame } from '../../typescript/database/Tables';
import { IGameRaw } from '../../typescript/services/IGDB/IGameRaw';
import CallDelay from './CallDelay';

class SteamPriceDelay implements CallDelay<IGame> {
	call: () => void;

	delay: number;

	obj!: IGame;

	constructor(
		steamCall: (
			game: IGameRaw,
			steamAPI: SteamAPI
		) => Promise<IGame>,
		game: IGameRaw,
		steamAPI: SteamAPI
	) {
		this.delay = 1200;
		this.call = async () => {
			this.obj = await steamCall(game, steamAPI);
		};
	}
}

export default SteamPriceDelay;
