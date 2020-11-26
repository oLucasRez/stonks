import DatabaseConnection from './DatabaseConnection';

import ThemeModel from '../../../models/ThemeModel';
import GameEngineModel from '../../../models/GameEngineModel';
import GameGameModeModel from '../../../models/GameGameModeModel';
import GameGenreModel from '../../../models/GameGenreModel';
import GameModeModel from '../../../models/GameModeModel';
import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';
import GameTokenModel from '../../../models/GameTokenModel';
import GameThemeModel from '../../../models/GameThemeModel';
import GenreModel from '../../../models/GenreModel';
import KeywordModel from '../../../models/KeywordModel';
import PlayerPerspectiveModel from '../../../models/PlayerPerspectiveModel';
import GameModel from '../../../models/GameModel';
import GameKeywordModel from '../../../models/GameKeywordModel';
import TokenModel from '../../../models/TokenModel';

class DatabaseInitializer {
	models = [
		GameModel,
		GameEngineModel,
		GenreModel,
		KeywordModel,
		PlayerPerspectiveModel,
		ThemeModel,
		TokenModel,
		GameGameModeModel,
		GameGenreModel,
		GameModeModel,
		GamePlayerPerspectiveModel,
		GameTokenModel,
		GameThemeModel,
		GameKeywordModel,
	];

	public InitDatabase(): void {
		this.models = this.models.map((model) => {
			model.initialize(DatabaseConnection.connectionSequelize);
			return model;
		});

		this.models.map((model) =>
			model.associate(DatabaseConnection.connectionSequelize)
		);
	}
}

export default DatabaseInitializer;
