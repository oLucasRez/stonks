import { IOperationDelay } from '../../typescript/helpers/ICallDelay';

import SteamAPI from '../../services/SteamApi';
import { IGame } from '../../typescript/database/Tables';
import { IGameRaw } from '../../typescript/services/IGDB/IGameRaw';

class SteamPriceDelay implements IOperationDelay<IGame> {
	operation: () => Promise<void>;

	delay: number;

	objectResult!: IGame;

	constructor(
		steamCall: (
			game: IGameRaw,
			steamAPI: SteamAPI
		) => Promise<IGame>,
		game: IGameRaw,
		steamAPI: SteamAPI
	) {
		this.delay = 667;

		this.operation = async () => {
			this.objectResult = await steamCall(game, steamAPI);
		};
	}
}

export default SteamPriceDelay;
