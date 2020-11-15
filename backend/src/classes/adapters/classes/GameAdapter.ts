import GamePriceHelper from '../../helpers/Game/GamePriceHelper';
import GameTimeToBeatHelper from '../../helpers/Game/GameTimeToBeatHelper';

import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';
import { IGame } from '../../../typescript/database/Tables';

class GameAdapter {
	public static async process(
		data: IGameRaw[]
	): Promise<IGame[]> {
		const promises = data.map(async (rawGame) => {
			const pricedGame = await GamePriceHelper.FillGamePrice(
				rawGame
			);

			const finalGame: IGame = await GameTimeToBeatHelper.getInstance().fillTimeToBeats(
				pricedGame
			);

			return finalGame;
		});

		return Promise.all(promises);
	}
}

export default GameAdapter;
