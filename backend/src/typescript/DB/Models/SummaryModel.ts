import Sequelize, {
	DataTypes,
	Model,
	Optional,
} from 'sequelize';
import { ISummary } from '../Tables';

type SummaryCreationAttributes = Optional<ISummary, 'id'>;

class SummaryModel extends Model<
	ISummary,
	SummaryCreationAttributes
> {
	public id!: number;

	public token!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				token: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'summarys',
				modelName: 'SummaryModel',
			}
		);
	}

	static associate(database: Sequelize.Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameSummaryModel,
		});
	}
}

export default SummaryModel;
