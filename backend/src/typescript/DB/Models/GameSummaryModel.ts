import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameSummary } from '../AssociativeTables';

class GameSummaryModel extends Model implements IGameSummary {
	public id!: number;

	public id_game!: number;

	public id_summary!: number;

	public weight!: number;
}

GameSummaryModel.init(
	{
		weight: Sequelize.NUMBER,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_summarys',
	}
);

export default GameSummaryModel;
