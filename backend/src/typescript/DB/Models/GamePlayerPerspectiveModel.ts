import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGamePlayerPerspective } from '../AssociativeTables';

type GamePlayerPerspectiveCreationAttributes = Optional<
	IGamePlayerPerspective,
	'id'
>;

class GamePlayerPerspectiveModel extends Model<
	IGamePlayerPerspective,
	GamePlayerPerspectiveCreationAttributes
> {
	public id!: number;

	public id_player_perspective!: number;

	public id_game!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_player_perspective: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_player_perspectives',
				modelName: 'GamePlayerPerspectiveModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}
export default GamePlayerPerspectiveModel;
