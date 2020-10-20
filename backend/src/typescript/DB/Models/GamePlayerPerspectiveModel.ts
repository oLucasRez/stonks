import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGamePlayerPerspective } from '../AssociativeTables';

class GamePlayerPerspectiveModel
	extends Model
	implements IGamePlayerPerspective {
	public id!: number;

	public id_player_perspective!: number;

	public id_game!: number;
}

GamePlayerPerspectiveModel.init(
	{},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_player_perspective',
	}
);

export default GamePlayerPerspectiveModel;
