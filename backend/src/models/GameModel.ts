import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { IGame } from '../typescript/database/Tables';

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

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_game_engine: DataTypes.NUMBER,
				age_rating: DataTypes.NUMBER,
				time_to_beat: DataTypes.NUMBER,
				follows: DataTypes.NUMBER,
				hype: {
					type: DataTypes.NUMBER,
					allowNull: true,
				},
				total_rating: DataTypes.NUMBER,
				total_rating_count: DataTypes.NUMBER,
				price: DataTypes.NUMBER,
				name: DataTypes.STRING,
				slug: DataTypes.STRING,
				release_date: DataTypes.DATE,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game',
				modelName: 'GameModel',
			}
		);
	}

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.SummaryModel, {
			through: database.models.GameSummaryModel,
		});
		this.belongsToMany(database.models.ThemeModel, {
			through: database.models.GameThemeModel,
		});
		this.belongsToMany(database.models.StorylineModel, {
			through: database.models.GameStorylineModel,
		});
		this.belongsToMany(database.models.PlayerPerspectiveModel, {
			through: database.models.GamePlayerPerspectiveModel,
		});
		this.belongsToMany(database.models.GenreModel, {
			through: database.models.GameGenreModel,
		});
		this.belongsToMany(database.models.KeywordModel, {
			through: database.models.GameKeywordModel,
		});
		this.belongsToMany(database.models.GameModeModel, {
			through: database.models.GameGameModeModel,
		});
	}
}
export default GameModel;
