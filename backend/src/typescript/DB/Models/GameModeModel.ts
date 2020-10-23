import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGameMode } from '../Tables';

type GameModeCreationAttributes = Optional<IGameMode, 'id'>;

class GameModeModel extends Model<
	IGameMode,
	GameModeCreationAttributes
> {
	public id!: number;

	public name!: string;

	public slug!: string;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_mode',
				modelName: 'GameModeModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameGameModeModel,
		});
	}
}
export default GameModeModel;
