import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';
import GameNLPHelper from '../../helpers/Game/GameNLPHelper';
import GamePriceHelper from '../../helpers/Game/GamePriceHelper';
import GameTimeToBeatHelper from '../../helpers/Game/GameTimeToBeatHelper';

class GameAdapter {
	private gameTimeToBeatHelper: GameTimeToBeatHelper;

	private gamePriceHelper: GamePriceHelper;

	private gameNLPHelper: GameNLPHelper;

	constructor() {
		this.gameTimeToBeatHelper = new GameTimeToBeatHelper();
		this.gamePriceHelper = new GamePriceHelper();
		this.gameNLPHelper = GameNLPHelper;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async process(data: IGameRaw[]): Promise<void> {
		// TODO process
	}
}

export default GameAdapter;
