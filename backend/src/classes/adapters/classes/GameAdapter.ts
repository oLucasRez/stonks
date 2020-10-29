import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

import GamePriceHelper from '../../helpers/Game/GamePriceHelper';
import GameTimeToBeatHelper from '../../helpers/Game/GameTimeToBeatHelper';

class GameAdapter {
	private gameTimeToBeatHelper: GameTimeToBeatHelper;

	private gamePriceHelper: GamePriceHelper;

	constructor() {
		this.gameTimeToBeatHelper = new GameTimeToBeatHelper();
		this.gamePriceHelper = new GamePriceHelper();
	}

	public async process(data: IGameRaw[]): Promise<void> {
		const partialData = await this.gameTimeToBeatHelper.fillTimeToBeats(
			data
		);

		this.gamePriceHelper.fillGamePrices(partialData);
	}
}

export default GameAdapter;
