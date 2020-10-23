import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { IGameSummary } from '../AssociativeTables';

type GameSummaryCreationAttributes = Optional<
	IGameSummary,
	'id'
>;

class GameSummaryModel extends Model<
	IGameSummary,
	GameSummaryCreationAttributes
> {
	public id!: number;

	public id_summary!: number;

	public id_game!: number;

	public weight!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				id_summary: Sequelize.NUMBER,
				id_game: Sequelize.NUMBER,
				weight: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'game_summarys',
				modelName: 'GameSummaryModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {}
}
export default GameSummaryModel;
