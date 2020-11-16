import IGDBGameCall from '../../calls/IGDBGame';
import GameAdapter from '../../adapters/classes/GameAdapter';
import GameModel from '../../../models/GameModel';
import GameGameModeModel from '../../../models/GameGameModeModel';
import GameThemeModel from '../../../models/GameThemeModel';
import GameKeywordModel from '../../../models/GameKeywordModel';
import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';
import { IGame } from '../../../typescript/database/Tables';

class GameHelper {
	async insertGamesIntoDatabase(): Promise<void> {
		/*
		Game Mode
		Game Genre
		Game Keywords
		Game Player Perspective
		Game Theme
		*/

		const call = new IGDBGameCall();

		const result = await call.call();

		const game = await GameAdapter.process(result);

		for (let i = 0; i < game.length; i += 1) {
			const gamePure: IGame = game[i];
			GameModel.create(gamePure);
			console.log(game[i].game_modes);
			// associate all game modes
			for (let j = 0; j < game[i].game_modes.length; j += 1) {
				GameGameModeModel.create({
					id_game: game[i].id,
					id_game_mode: game[i].game_modes[j],
				});
			}
			// associate all themes
			for (let j = 0; j < game[i].themes.length; j += 1) {
				GameThemeModel.create({
					id_game: game[i].id,
					id_theme: game[i].themes[j],
				});
			}
			// associate all keywords
			for (let j = 0; j < game[i].keywords.length; j += 1) {
				GameKeywordModel.create({
					id_game: game[i].id,
					id_keyword: game[i].keywords[j],
				});
			}
			// associate all player perspectives
			for (
				let j = 0;
				j < game[i].player_perspectives.length;
				j += 1
			) {
				GamePlayerPerspectiveModel.create({
					id_game: game[i].id,
					id_player_perspective: game[i].player_perspectives[j],
				});
			}
			// associate all genres
			for (let j = 0; j < game[i].genres.length; j += 1) {
				GameThemeModel.create({
					id_game: game[i].id,
					id_theme: game[i].themes[j],
				});
			}
		}
	}
}

export default GameHelper;
