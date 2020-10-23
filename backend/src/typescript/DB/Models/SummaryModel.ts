import Sequelize, { Model, Optional } from 'sequelize';
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
				id: Sequelize.NUMBER,
				token: Sequelize.NUMBER,
			},
			{
				sequelize: database,
				timestamps: false,
				freezeTableName: true,
				tableName: 'summarys',
			}
		);
	}

	static associate(models: any): void {
		this.belongsToMany(models.GameModel, {
			through: models.GameSummaryModel,
			sourceKey: 'id_summary',
		});
	}
}

export default SummaryModel;
