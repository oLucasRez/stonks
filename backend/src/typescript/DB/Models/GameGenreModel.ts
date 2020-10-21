import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameGenre } from '../AssociativeTables';

class GameGenreModel extends Model implements IGameGenre {
	public id!: number;

	public id_genre!: number;

	public id_game!: number;
}

GameGenreModel.init(
	{},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_genres',
	}
);

export default GameGenreModel;
