/* eslint-disable no-await-in-loop */
import GameAdapter from '../../adapters/classes/GameAdapter';

import GameTokenController from '../../controllers/private/GameTokenController';

import { IGameRaw } from '../../../typescript/services/IGDB/IGameRaw';

import TokenModel from '../../../models/TokenModel';
import { ITokenRaw } from '../../../typescript/services/GCP/ITokenRaw';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DatabaseSaveMethod = (item: any) => Promise<boolean>;

class StoreHelper {
	private static async storeNToNTable(
		id: number,
		table_ids: number[],
		storeMethod: DatabaseSaveMethod,
		object_key: string
	): Promise<void> {
		if (!table_ids) {
			return;
		}

		for (let i = 0; i < table_ids.length; i += 1) {
			const saveObject: Record<string, unknown> = {};

			saveObject.id_game = id;
			saveObject[object_key] = table_ids[i];

			storeMethod(saveObject).then((isSaved) => {
				if (isSaved) {
					console.log(
						`[POSTGRESQL]: SAVED ['id_game', ${object_key}]`
					);
				}
			});
		}
	}

	private static async storeNLPProducts(
		id_game: number,
		tokens: ITokenRaw[],
		type: 'summary' | 'storyline',
		storeMethod: DatabaseSaveMethod
	) {
		for (let i = 0; i < tokens.length; i += 1) {
			const { token, weight, type: tokenType } = tokens[i];

			const alreadyExist = await TokenModel.findOne({
				where: {
					token,
					type: tokenType,
				},
			});

			let tokenDbRef: TokenModel;

			if (!alreadyExist) {
				const dbRef = await TokenModel.create({
					token,
					type: tokenType,
				});

				await dbRef.save();

				tokenDbRef = dbRef;

				console.log(`[POSTGRESQL]: New token ${token} saved`);
			} else {
				tokenDbRef = alreadyExist;
			}

			storeMethod({
				id_game,
				id_token: tokenDbRef.id,
				weight,
				type,
			}).then((result) => {
				if (result) {
					console.log(
						'[POSTGRESQL]: Token + Association saved!'
					);
				}
			});
		}
	}

	private static async initiateSubStoreProcesses(
		game: IGameRaw
	) {
		// const isGameSaved = await GameController.store(
		// 	game as IGame
		// );

		if (game.summaryTokens && game.id) {
			await this.storeNLPProducts(
				game.id,
				game.summaryTokens,
				'summary',
				GameTokenController.store
			);
		}

		if (game.storylineTokens && game.id) {
			await this.storeNLPProducts(
				game.id,
				game.storylineTokens,
				'storyline',
				GameTokenController.store
			);
		}

		// if (isGameSaved) {
		// 	console.log(`[POSTGRESQL]: Game ${game.name} saved`);
		// }

		// const { id: id_game, game_modes } = game;

		// this.storeNToNTable(
		// 	id_game,
		// 	game_modes,
		// 	GameGameModeController.store,
		// 	'id_game_mode'
		// );

		// const { themes } = game;

		// this.storeNToNTable(
		// 	id_game,
		// 	themes,
		// 	GameThemeController.store,
		// 	'id_theme'
		// );

		// const { keywords } = game;

		// this.storeNToNTable(
		// 	id_game,
		// 	keywords,
		// 	GameKeywordController.store,
		// 	'id_keyword'
		// );

		// const { player_perspectives } = game;

		// this.storeNToNTable(
		// 	id_game,
		// 	player_perspectives,
		// 	GamePlayerPerspectiveController.store,
		// 	'id_player_perspective'
		// );

		// const { genres } = game;

		// this.storeNToNTable(
		// 	id_game,
		// 	genres,
		// 	GameGenreController.store,
		// 	'id_genre'
		// );
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
