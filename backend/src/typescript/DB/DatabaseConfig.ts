import SummaryModel from './Models/SummaryModel';
import ThemeModel from './Models/ThemeModel';
import database from '../../services/DB/Connection';
import GameEngineModel from './Models/GameEngineModel';
import GameGameModeModel from './Models/GameGameModeModel';
import GameGenreModel from './Models/GameGenreModel';
import GameModeModel from './Models/GameModeModel';
import GamePlayerPerspectiveModel from './Models/GamePlayerPerspectiveModel';
import GameStorylineModel from './Models/GameStorylineModel';
import GameSummaryModel from './Models/GameSummaryModel';
import GameThemeModel from './Models/GameThemeModel';
import GenreModel from './Models/GenreModel';
import KeywordModel from './Models/KeywordModel';
import PlayerPerspectiveModel from './Models/PlayerPerspectiveModel';
import StorylineModel from './Models/StorylineModel';
import GameModel from './Models/GameModel';
import GameKeywordModel from './Models/GameKeyword';

class DatabaseConfig {
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
			model.initialize(database.connectionSequelize);
			return model;
		});

		this.models.map((model) =>
			model.associate(database.connectionSequelize)
		);
	}
}

export default DatabaseConfig;
