import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameGameMode } from '../AssociativeTables';

class GameGameModeModel extends Model implements IGameGameMode {
	public id!: number;

	public id_game_mode!: number;

	public id_game!: number;
}

GameGameModeModel.init(
	{},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_game_mode',
	}
);

export default GameGameModeModel;
