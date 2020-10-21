import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameEngine } from '../Tables';

class GameEngineModel extends Model implements IGameEngine {
	public id!: number;

	public name!: string;
}

GameEngineModel.init(
	{
		name: Sequelize.STRING,
	},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_engines',
	}
);

export default GameEngineModel;
