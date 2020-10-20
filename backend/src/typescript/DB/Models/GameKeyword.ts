import Sequelize, { Model } from 'sequelize';
import database from '../../../services/DB/Connection';
import { IGameKeyword } from '../AssociativeTables';

class GameKeywordModel extends Model implements IGameKeyword {
	public id!: number;

	public id_keyword!: number;

	public id_game!: number;
}

GameKeywordModel.init(
	{},
	{
		sequelize: database.connectionSequelize,
		timestamps: false,
		freezeTableName: true,
		tableName: 'game_keywordM',
	}
);

export default GameKeywordModel;
