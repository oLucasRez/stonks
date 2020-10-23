import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGame } from '../Tables';

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
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
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
				modelName: 'GameModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
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
