import sequelize from 'sequelize';
import Sequelize, { Model, Optional } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGame } from '../Tables';
import GameGameModeModel from './GameGameModeModel';
import GameGenreModel from './GameGenreModel';
import GameKeywordModel from './GameKeyword';
import GameModeModel from './GameModeModel';
import GamePlayerPerspectiveModel from './GamePlayerPerspectiveModel';
import GameStorylineModel from './GameStorylineModel';
import GameSummaryModel from './GameSummaryModel';
import GameThemeModel from './GameThemeModel';
import GenreModel from './GenreModel';
import KeywordModel from './KeywordModel';
import PlayerPerspectiveModel from './PlayerPerspectiveModel';
import StorylineModel from './StorylineModel';
import SummaryModel from './SummaryModel';
import ThemeModel from './ThemeModel';

class GameModel extends Model implements IGame {
	public id!: number;
	public id_game_engine!: number;
	public age_rating!: number;
	public time_to_beat!: number;
	public follows!: number;
	public hype!: number;
	public total_rating!: number;
	public total_rating_count!: number;
	public price!: number;
	public name!: string;
	public slug!: string;
	public release_date!: Date;
}

GameModel.init(
	{
		age_rating: Sequelize.NUMBER,
		time_to_beat: Sequelize.NUMBER,
		follows: Sequelize.NUMBER,
		hype: Sequelize.NUMBER,
		total_rating: Sequelize.NUMBER,
		total_rating_count: Sequelize.NUMBER,
		price: Sequelize.NUMBER,
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
		release_date: Sequelize.DATE,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game',
	}
);

type GameCreationAttributes = Optional<IGame, 'id'>;

class GameModel extends Model<IGame, GameCreationAttributes> {
	public id!: number;
	public id_game_engine!: number;
	public age_rating!: number;
	public time_to_beat!: number;
	public follows!: number;
	public hype!: number;
	public total_rating!: number;
	public total_rating_count!: number;
	public price!: number;
	public name!: string;
	public slug!: string;
	public release_date!: Date;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				id_game_engine: Sequelize.NUMBER,
				age_rating: Sequelize.NUMBER,
				time_to_beat: Sequelize.NUMBER,
				follows: Sequelize.NUMBER,
				hype: Sequelize.NUMBER,
				total_rating: Sequelize.NUMBER,
				total_rating_count: Sequelize.NUMBER,
				price: Sequelize.NUMBER,
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
				release_date: Sequelize.DATE,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.SummaryModel, {
			through: models.GameSummaryModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.ThemeModel, {
			through: models.GameThemeModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.StorylineModel, {
			through: models.GameStorylineModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.PlayerPerspectiveModel, {
			through: models.GamePlayerPerspectiveModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.GenreModel, {
			through: models.GameGenreModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.KeywordModel, {
			through: models.GameKeywordModel,
			sourceKey: 'id_game',
		});
		this.belongsToMany(models.GameModel, {
			through: models.GameGameModeModel,
			sourceKey: 'id_game',
		});
	}
}
export default GameModel;
