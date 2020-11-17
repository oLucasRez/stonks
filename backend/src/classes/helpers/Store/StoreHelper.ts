import GameAdapter from '../../adapters/classes/GameAdapter';

import GameController from '../../controllers/GameController';
import GameGameModeController from '../../controllers/GameGameModeController';
import GameGenreController from '../../controllers/GameGenreController';
import GameKeywordController from '../../controllers/GameKeywordController';
import GamePlayerPerspectiveController from '../../controllers/GamePlayerPerspectiveController';
import GameThemeController from '../../controllers/GameThemeController';

// TODO
// import GameStoryLineController from '../../controllers/GameStorylineController';
// import GameSummaryController from '../../controllers/GameSummaryController';

import { IGame } from '../../../typescript/database/Tables';
import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

type DatabaseSaveMethod = (item: any) => Promise<boolean>;

class StoreHelper {
	private static async storeNToNTable(
		id: number,
		table_ids: number[],
		storeMethod: DatabaseSaveMethod,
		object_key: string
	): Promise<void> {
		for (let i = 0; i < table_ids.length; i += 1) {
			const saveObject = {};

			saveObject['id_game'] = id;
			saveObject[object_key] = table_ids[i];

			storeMethod(saveObject);
		}
	}

	private static async initiateSubStoreProcesses(
		game: IGameRaw
	) {
		await GameController.store(game as IGame);

		const { id: id_game, game_modes } = game;

		this.storeNToNTable(
			id_game,
			game_modes,
			GameGameModeController.store,
			'id_game_mode'
		);

		const { themes } = game;

		this.storeNToNTable(
			id_game,
			themes,
			GameThemeController.store,
			'id_theme'
		);

		const { keywords } = game;

		this.storeNToNTable(
			id_game,
			keywords,
			GameKeywordController.store,
			'id_keyword'
		);

		const { player_perspectives } = game;

		this.storeNToNTable(
			id_game,
			player_perspectives,
			GamePlayerPerspectiveController.store,
			'id_player_perspective'
		);

		const { genres } = game;

		this.storeNToNTable(
			id_game,
			genres,
			GameGenreController.store,
			'id_genre'
		);
	}

	public static async StoreProcess(
		games: IGameRaw[]
	): Promise<void> {
		const processedGames = await GameAdapter.process(games);

		for (let i = 0; i < games.length; i += 1) {
			const processedGame = processedGames[i];

			this.initiateSubStoreProcesses(processedGame);
		}
	}
}

export default StoreHelper;
