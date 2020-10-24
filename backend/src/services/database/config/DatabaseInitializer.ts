import DatabaseConnection from './DatabaseConnection';

import SummaryModel from '../../../models/SummaryModel';
import ThemeModel from '../../../models/ThemeModel';
import GameEngineModel from '../../../models/GameEngineModel';
import GameGameModeModel from '../../../models/GameGameModeModel';
import GameGenreModel from '../../../models/GameGenreModel';
import GameModeModel from '../../../models/GameModeModel';
import GamePlayerPerspectiveModel from '../../../models/GamePlayerPerspectiveModel';
import GameStorylineModel from '../../../models/GameStorylineModel';
import GameSummaryModel from '../../../models/GameSummaryModel';
import GameThemeModel from '../../../models/GameThemeModel';
import GenreModel from '../../../models/GenreModel';
import KeywordModel from '../../../models/KeywordModel';
import PlayerPerspectiveModel from '../../../models/PlayerPerspectiveModel';
import StorylineModel from '../../../models/StorylineModel';
import GameModel from '../../../models/GameModel';
import GameKeywordModel from '../../../models/GameKeywordModel';

class DatabaseInitializer {
	models = [
		GameModel,
		GameEngineModel,
		GameGameModeModel,
		GameGenreModel,
		GameModeModel,
		GamePlayerPerspectiveModel,
		GameStorylineModel,
		GameSummaryModel,
		GameThemeModel,
		GameKeywordModel,
		GenreModel,
		KeywordModel,
		PlayerPerspectiveModel,
		StorylineModel,
		ThemeModel,
		SummaryModel,
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