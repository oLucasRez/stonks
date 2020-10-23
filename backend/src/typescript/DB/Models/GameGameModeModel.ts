import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGameGameMode } from '../AssociativeTables';

type GameGameModeCreationAttributes = Optional<
	IGameGameMode,
	'id'
>;

class GameGameModeModel extends Model<
	IGameGameMode,
	GameGameModeCreationAttributes
> {
	public id!: number;

	public id_game_mode!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_game_mode: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_mode_game',
				modelName: 'GameGameModeModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}

export default GameGameModeModel;
