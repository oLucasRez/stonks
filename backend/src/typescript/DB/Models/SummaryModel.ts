import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { ISummary } from '../Tables';
import GameModel from './GameModel';
import GameSummaryModel from './GameSummaryModel';

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
SummaryModel.belongsToMany(GameModel, {
	through: GameSummaryModel,
	sourceKey: 'id_summary',
});
export default SummaryModel;
