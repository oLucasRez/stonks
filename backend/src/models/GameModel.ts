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

	public first_release_date!: number;

	public is_user!: boolean;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
					autoIncrement: true,
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
				first_release_date: DataTypes.DATEONLY,
				is_user: DataTypes.BOOLEAN,
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
		this.belongsToMany(database.models.TokenModel, {
			through: database.models.GameTokenModel,
			foreignKey: 'id_game',
		});
		this.belongsToMany(database.models.ThemeModel, {
			through: database.models.GameThemeModel,
			foreignKey: 'id_game',
		});
		this.belongsToMany(database.models.PlayerPerspectiveModel, {
			through: database.models.GamePlayerPerspectiveModel,
			foreignKey: 'id_game',
		});
		this.belongsToMany(database.models.GenreModel, {
			through: database.models.GameGenreModel,
			foreignKey: 'id_game',
		});
		this.belongsToMany(database.models.KeywordModel, {
			through: database.models.GameKeywordModel,
			foreignKey: 'id_game',
		});
		this.belongsToMany(database.models.GameModeModel, {
			through: database.models.GameGameModeModel,
			foreignKey: 'id_game',
		});
	}
}
export default GameModel;
