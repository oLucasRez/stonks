import Sequelize, { Model } from 'sequelize';
import { ISummary } from '../Tables';

class SummaryModel extends Model implements ISummary {
	public id!: number;

	public token!: number;

	static initialize(database: Sequelize.Sequelize): void {
		this.init(
			{
				id: Sequelize.NUMBER,
				name: Sequelize.STRING,
				slug: Sequelize.STRING,
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
