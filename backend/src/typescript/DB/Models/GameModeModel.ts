import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameMode } from '../Tables';

class GameModeModel extends Model implements IGameMode {
	public id!: number;

	public name!: string;

	public slug!: string;
}

GameModeModel.init(
	{
		name: Sequelize.STRING,
		slug: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_mode',
	}
);

export default GameModeModel;
