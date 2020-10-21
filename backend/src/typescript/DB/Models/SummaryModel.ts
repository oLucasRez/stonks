import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { ISummary } from '../Tables';

class SummaryModel extends Model implements ISummary {
	public id!: number;

	public token!: number;
}

SummaryModel.init(
	{
		token: Sequelize.NUMBER,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'summarys',
	}
);

export default SummaryModel;
