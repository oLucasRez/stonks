import {
	Sequelize,
	DataTypes,
	Model,
	Optional,
} from 'sequelize';

import { ISummary } from '../typescript/database/Tables';

type SummaryCreationAttributes = Optional<ISummary, 'id'>;

class SummaryModel extends Model<
	ISummary,
	SummaryCreationAttributes
> {
	public id!: number;

	public token!: number;

	static initialize(database: Sequelize): void {
		this.init(
			{
				id: {
					type: DataTypes.INTEGER,
					primaryKey: true,
				},
				token: DataTypes.NUMBER,
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

	static associate(database: Sequelize): void {
		this.belongsToMany(database.models.GameModel, {
			through: database.models.GameSummaryModel,
		});
	}
}

export default SummaryModel;
